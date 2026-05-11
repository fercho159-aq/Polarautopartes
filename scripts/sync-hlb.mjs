#!/usr/bin/env node
/**
 * sync-hlb.mjs
 *
 * Sincroniza el catálogo de bombas de agua HLB con la tabla maestra
 * scripts/data/hlb-compat.tsv y las imágenes en
 * public/IMAGENES BOMBAS DE AGUA HLB/.
 *
 * Para cada SKU de la línea HLB:
 *   1. Si el SKU está en la TSV: se asegura de que TODAS las aplicaciones
 *      listadas existan como filas en public/products.csv. Las que ya están
 *      se respetan; las que faltan se añaden.
 *   2. Detecta la imagen correcta (.jpg, .png, .webp, .jpeg) y la corrige
 *      en TODAS las filas existentes del SKU.
 *   3. Asigna 'characteristics' desde la TSV cuando esté presente y
 *      faltante en la fila del CSV.
 *
 * Correcciones puntuales:
 *   - HLB-10017 (typo): sus filas se reasignan a HLB-1017.
 *   - " " (espacio) en imageUrl: se normaliza.
 *
 * Las filas existentes de otras líneas (HLRC, HLTA, etc.) no se tocan.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..');
const CSV_PATH = path.join(REPO_ROOT, 'public/products.csv');
const TSV_PATH = path.join(__dirname, 'data/hlb-compat.tsv');
const IMG_DIR = path.join(REPO_ROOT, 'public/IMAGENES BOMBAS DE AGUA HLB');
const IMG_URL_PREFIX = '/IMAGENES BOMBAS DE AGUA HLB/';

const HEADERS = [
  'id', 'name', 'brand', 'line', 'description', 'sku', 'price',
  'imageUrl', 'oem', 'specifications', 'characteristics',
  'applications_brand', 'applications_model', 'applications_motor', 'applications_years',
];

// ─── CSV parsing (compatible con el formato de Polar) ────────────────────
function parseCsv(text) {
  const lines = text.split(/\r?\n/).filter(l => l.length > 0);
  return lines.map(line => {
    const out = [];
    let cur = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (inQuotes) {
        if (ch === '"' && line[i + 1] === '"') { cur += '"'; i++; }
        else if (ch === '"') inQuotes = false;
        else cur += ch;
      } else {
        if (ch === ',') { out.push(cur); cur = ''; }
        else if (ch === '"') inQuotes = true;
        else cur += ch;
      }
    }
    out.push(cur);
    return out;
  });
}

function escapeCsv(v) {
  if (v == null) return '';
  const s = String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

// ─── Imágenes ────────────────────────────────────────────────────────────
function buildImageIndex() {
  const idx = new Map();
  for (const f of fs.readdirSync(IMG_DIR)) {
    const m = f.match(/^(HLB-\d+)\.(jpg|jpeg|png|webp)$/i);
    if (m) idx.set(m[1].toUpperCase(), f);
  }
  return idx;
}

// ─── TSV maestra ─────────────────────────────────────────────────────────
function parseTsv(text) {
  const lines = text.split(/\r?\n/).filter(l => l.length > 0);
  const headers = lines[0].split('\t');
  return lines.slice(1).map(line => {
    const cols = line.split('\t');
    const row = {};
    headers.forEach((h, i) => { row[h] = (cols[i] ?? '').trim(); });
    return row;
  });
}

// ─── Lógica principal ────────────────────────────────────────────────────
function rowKey(brand, model, motor, years) {
  return [brand, model, motor, years].map(s => (s ?? '').trim().toLowerCase()).join('|');
}

function main() {
  // CSV existente
  const csvText = fs.readFileSync(CSV_PATH, 'utf8').replace(/^﻿/, '');
  const csvRows = parseCsv(csvText);
  const headerRow = csvRows[0];
  if (headerRow.join(',') !== HEADERS.join(',')) {
    console.error('✗ El header de products.csv no coincide con el esperado.');
    console.error('  Esperado:', HEADERS.join(','));
    console.error('  Actual:  ', headerRow.join(','));
    process.exit(1);
  }
  const dataRows = csvRows.slice(1).map(r => {
    const obj = {};
    HEADERS.forEach((h, i) => { obj[h] = r[i] ?? ''; });
    return obj;
  });

  // Imágenes
  const imageIdx = buildImageIndex();
  console.log('Imágenes indexadas:', imageIdx.size);

  // TSV
  const tsvRows = parseTsv(fs.readFileSync(TSV_PATH, 'utf8'));
  const tsvBySku = new Map();
  for (const r of tsvRows) {
    if (!r.sku) continue;
    const sku = r.sku.toUpperCase().trim();
    if (!tsvBySku.has(sku)) tsvBySku.set(sku, []);
    tsvBySku.get(sku).push({
      brand: r.brand?.trim() ?? '',
      model: r.model?.trim() ?? '',
      motor: r.motor?.trim() ?? '',
      years: r.years?.trim() ?? '',
      characteristic: r.characteristic?.trim() ?? '',
    });
  }
  console.log('SKUs HLB en TSV:', tsvBySku.size);

  // ── 1a. Trim id/sku para todas las filas HLB (resuelve "HLB-1147 ") ─
  let trimmed = 0;
  for (const row of dataRows) {
    const idTrim = row.id?.trim() ?? '';
    const skuTrim = row.sku?.trim() ?? '';
    if (idTrim.startsWith('HLB-')) {
      if (row.id !== idTrim) { row.id = idTrim; trimmed++; }
      if (row.sku !== skuTrim) { row.sku = skuTrim; trimmed++; }
    }
  }
  console.log('Espacios sobrantes en id/sku corregidos:', trimmed);

  // ── 1b. Arreglar typo HLB-10017 → HLB-1017 ──────────────────────────
  let typoFixed = 0;
  for (const row of dataRows) {
    if (row.id === 'HLB-10017') {
      row.id = 'HLB-1017';
      row.sku = 'HLB-1017';
      typoFixed++;
    }
  }
  console.log('Filas HLB-10017 corregidas a HLB-1017:', typoFixed);

  // ── 2. Construir índice del CSV por SKU para mergeo ─────────────────
  const csvBySku = new Map(); // sku -> { rows: [...], keys: Set }
  for (const row of dataRows) {
    if (!row.id || !row.id.startsWith('HLB-')) continue;
    const sku = row.id.toUpperCase().trim();
    if (!csvBySku.has(sku)) csvBySku.set(sku, { rows: [], keys: new Set() });
    const entry = csvBySku.get(sku);
    entry.rows.push(row);
    entry.keys.add(rowKey(row.applications_brand, row.applications_model, row.applications_motor, row.applications_years));
  }
  console.log('SKUs HLB en CSV (antes del merge):', csvBySku.size);

  // ── 3. Por cada SKU de la TSV, asegurar aplicaciones e imagen ───────
  let addedRows = 0;
  let updatedImages = 0;
  let updatedCharacteristics = 0;
  let createdSkus = 0;

  for (const [sku, apps] of tsvBySku) {
    const imgFile = imageIdx.get(sku);
    const imageUrl = imgFile ? IMG_URL_PREFIX + imgFile : '';

    let entry = csvBySku.get(sku);
    if (!entry) {
      entry = { rows: [], keys: new Set() };
      csvBySku.set(sku, entry);
      createdSkus++;
    }

    for (const app of apps) {
      const key = rowKey(app.brand, app.model, app.motor, app.years);
      if (entry.keys.has(key)) {
        // Aplicación existente: completar characteristic si está vacía en CSV y hay en TSV
        if (app.characteristic) {
          const existing = entry.rows.find(r => rowKey(r.applications_brand, r.applications_model, r.applications_motor, r.applications_years) === key);
          if (existing && !existing.characteristics) {
            existing.characteristics = app.characteristic;
            updatedCharacteristics++;
          }
        }
        continue;
      }
      // Aplicación nueva: la creamos
      const newRow = {
        id: sku,
        name: 'Bomba de agua',
        brand: 'POLAR',
        line: '',
        description: 'BOMBA DE AGUA',
        sku: sku,
        price: 'Cotizar',
        imageUrl: imageUrl,
        oem: '',
        specifications: '',
        characteristics: app.characteristic,
        applications_brand: app.brand,
        applications_model: app.model,
        applications_motor: app.motor,
        applications_years: app.years,
      };
      dataRows.push(newRow);
      entry.rows.push(newRow);
      entry.keys.add(key);
      addedRows++;
    }

    // Normalizar imagen en TODAS las filas del SKU
    if (imageUrl) {
      for (const row of entry.rows) {
        if (row.imageUrl !== imageUrl) {
          row.imageUrl = imageUrl;
          updatedImages++;
        }
      }
    }
  }

  // ── 4a. Limpiar imageUrl con espacios ───────────────────────────────
  let fixedSpaces = 0;
  for (const row of dataRows) {
    if (!row.id || !row.id.startsWith('HLB-')) continue;
    if (row.imageUrl && row.imageUrl.includes(' .')) {
      row.imageUrl = row.imageUrl.replace(' .', '.');
      fixedSpaces++;
    }
  }

  // ── 4b. Vaciar imageUrl que apuntan a archivos HLB inexistentes ─────
  // Construye un Set con todos los nombres de archivo HLB que existen,
  // y limpia las URL que referencien archivos faltantes.
  const existingFiles = new Set(fs.readdirSync(IMG_DIR));
  let clearedBroken = 0;
  for (const row of dataRows) {
    if (!row.id || !row.id.startsWith('HLB-')) continue;
    if (!row.imageUrl) continue;
    const m = row.imageUrl.match(/^\/IMAGENES BOMBAS DE AGUA HLB\/(.+)$/);
    if (!m) continue;
    if (!existingFiles.has(m[1])) {
      row.imageUrl = '';
      clearedBroken++;
    }
  }
  console.log('imageUrl rotas vaciadas:', clearedBroken);

  console.log('SKUs nuevos creados:', createdSkus);
  console.log('Filas de aplicación nuevas:', addedRows);
  console.log('imageUrl normalizadas:', updatedImages);
  console.log('characteristics completadas:', updatedCharacteristics);
  console.log('Espacios en imageUrl corregidos:', fixedSpaces);

  // ── 5. Reordenar: filas no-HLB en orden original; filas HLB ordenadas ─
  const nonHlbRows = [];
  const hlbRowsBySku = new Map();
  for (const row of dataRows) {
    if (row.id && row.id.startsWith('HLB-')) {
      if (!hlbRowsBySku.has(row.id)) hlbRowsBySku.set(row.id, []);
      hlbRowsBySku.get(row.id).push(row);
    } else {
      nonHlbRows.push(row);
    }
  }
  const sortedHlbSkus = [...hlbRowsBySku.keys()].sort((a, b) => {
    const na = parseInt(a.replace('HLB-', ''), 10);
    const nb = parseInt(b.replace('HLB-', ''), 10);
    return na - nb;
  });
  const finalHlbRows = [];
  for (const sku of sortedHlbSkus) finalHlbRows.push(...hlbRowsBySku.get(sku));
  const finalRows = [...finalHlbRows, ...nonHlbRows];

  // ── 6. Escribir CSV ────────────────────────────────────────────────
  const out = [HEADERS, ...finalRows.map(r => HEADERS.map(h => r[h] ?? ''))]
    .map(row => row.map(escapeCsv).join(','))
    .join('\n') + '\n';
  fs.writeFileSync(CSV_PATH, '﻿' + out, 'utf8');

  console.log('\n✓ products.csv actualizado');
  console.log('  Total filas:', finalRows.length);
  console.log('  Filas HLB:', finalHlbRows.length);
  console.log('  SKUs HLB únicos:', sortedHlbSkus.length);
}

main();
