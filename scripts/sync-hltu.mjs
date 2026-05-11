#!/usr/bin/env node
/**
 * sync-hltu.mjs
 *
 * Sincroniza el catálogo de tubos de enfriamiento HLTU con la tabla
 * scripts/data/hltu-compat.tsv y las imágenes en
 * public/IMAGENES TUBOS DE ENFRIAMIENTO/.
 *
 * Misma lógica que sync-hlb.mjs adaptada para la línea HLTU.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..');
const CSV_PATH = path.join(REPO_ROOT, 'public/products.csv');
const TSV_PATH = path.join(__dirname, 'data/hltu-compat.tsv');
const IMG_DIR = path.join(REPO_ROOT, 'public/IMAGENES TUBOS DE ENFRIAMIENTO');
const IMG_URL_PREFIX = '/IMAGENES TUBOS DE ENFRIAMIENTO/';
const SKU_PREFIX = 'HLTU-';
const PRODUCT_NAME = 'Tubo de enfriamiento';
const PRODUCT_DESC = 'TUBO DE AGUA';

const HEADERS = [
  'id', 'name', 'brand', 'line', 'description', 'sku', 'price',
  'imageUrl', 'oem', 'specifications', 'characteristics',
  'applications_brand', 'applications_model', 'applications_motor', 'applications_years',
];

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

function buildImageIndex() {
  const idx = new Map();
  for (const f of fs.readdirSync(IMG_DIR)) {
    const m = f.match(/^(HLTU-\d+)\.(jpg|jpeg|png|webp)$/i);
    if (m) idx.set(m[1].toUpperCase(), f);
  }
  return idx;
}

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

function rowKey(brand, model, motor, years) {
  return [brand, model, motor, years].map(s => (s ?? '').trim().toLowerCase()).join('|');
}

function main() {
  const csvText = fs.readFileSync(CSV_PATH, 'utf8').replace(/^﻿/, '');
  const csvRows = parseCsv(csvText);
  const headerRow = csvRows[0];
  if (headerRow.join(',') !== HEADERS.join(',')) {
    console.error('✗ El header de products.csv no coincide con el esperado.');
    process.exit(1);
  }
  const dataRows = csvRows.slice(1).map(r => {
    const obj = {};
    HEADERS.forEach((h, i) => { obj[h] = r[i] ?? ''; });
    return obj;
  });

  const imageIdx = buildImageIndex();
  console.log('Imágenes HLTU indexadas:', imageIdx.size);

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
  console.log('SKUs HLTU en TSV:', tsvBySku.size);

  // Trim espacios sobrantes en id/sku para filas HLTU
  let trimmed = 0;
  for (const row of dataRows) {
    const idTrim = row.id?.trim() ?? '';
    const skuTrim = row.sku?.trim() ?? '';
    if (idTrim.startsWith(SKU_PREFIX)) {
      if (row.id !== idTrim) { row.id = idTrim; trimmed++; }
      if (row.sku !== skuTrim) { row.sku = skuTrim; trimmed++; }
    }
  }
  console.log('Espacios sobrantes en id/sku corregidos:', trimmed);

  // Índice del CSV por SKU
  const csvBySku = new Map();
  for (const row of dataRows) {
    if (!row.id || !row.id.startsWith(SKU_PREFIX)) continue;
    const sku = row.id.toUpperCase().trim();
    if (!csvBySku.has(sku)) csvBySku.set(sku, { rows: [], keys: new Set() });
    const entry = csvBySku.get(sku);
    entry.rows.push(row);
    entry.keys.add(rowKey(row.applications_brand, row.applications_model, row.applications_motor, row.applications_years));
  }
  console.log('SKUs HLTU en CSV (antes del merge):', csvBySku.size);

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
        if (app.characteristic) {
          const existing = entry.rows.find(r => rowKey(r.applications_brand, r.applications_model, r.applications_motor, r.applications_years) === key);
          if (existing && !existing.characteristics) {
            existing.characteristics = app.characteristic;
            updatedCharacteristics++;
          }
        }
        continue;
      }
      const newRow = {
        id: sku,
        name: PRODUCT_NAME,
        brand: 'POLAR',
        line: '',
        description: PRODUCT_DESC,
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

    if (imageUrl) {
      for (const row of entry.rows) {
        if (row.imageUrl !== imageUrl) {
          row.imageUrl = imageUrl;
          updatedImages++;
        }
      }
    }
  }

  // Vaciar imageUrl rotas
  const existingFiles = new Set(fs.readdirSync(IMG_DIR));
  let clearedBroken = 0;
  for (const row of dataRows) {
    if (!row.id || !row.id.startsWith(SKU_PREFIX)) continue;
    if (!row.imageUrl) continue;
    const m = row.imageUrl.match(/^\/IMAGENES TUBOS DE ENFRIAMIENTO\/(.+)$/);
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

  // Reordenar: cada línea ordenada por número de SKU dentro de su línea,
  // preservando el orden general por línea (HLB primero, luego HLRC, HLTA, HLTU)
  const byLine = new Map();
  const lineOrder = [];
  for (const row of dataRows) {
    const id = row.id ?? '';
    const m = id.match(/^([A-Z]+)-(\d+)$/);
    const linePrefix = m ? m[1] : (id.split('-')[0] || '_');
    if (!byLine.has(linePrefix)) {
      byLine.set(linePrefix, new Map());
      lineOrder.push(linePrefix);
    }
    const lineMap = byLine.get(linePrefix);
    if (!lineMap.has(id)) lineMap.set(id, []);
    lineMap.get(id).push(row);
  }

  const finalRows = [];
  for (const linePrefix of lineOrder) {
    const lineMap = byLine.get(linePrefix);
    const skus = [...lineMap.keys()].sort((a, b) => {
      const na = parseInt(a.split('-')[1] ?? '0', 10);
      const nb = parseInt(b.split('-')[1] ?? '0', 10);
      if (Number.isNaN(na) || Number.isNaN(nb)) return a.localeCompare(b);
      return na - nb;
    });
    for (const sku of skus) finalRows.push(...lineMap.get(sku));
  }

  const out = [HEADERS, ...finalRows.map(r => HEADERS.map(h => r[h] ?? ''))]
    .map(row => row.map(escapeCsv).join(','))
    .join('\n') + '\n';
  fs.writeFileSync(CSV_PATH, '﻿' + out, 'utf8');

  console.log('\n✓ products.csv actualizado');
  console.log('  Total filas:', finalRows.length);
  const hltuRows = finalRows.filter(r => r.id?.startsWith(SKU_PREFIX));
  const hltuSkus = new Set(hltuRows.map(r => r.id));
  console.log('  Filas HLTU:', hltuRows.length);
  console.log('  SKUs HLTU únicos:', hltuSkus.size);
}

main();
