#!/usr/bin/env node
/**
 * merge-products.mjs
 *
 * Fusiona uno o más CSVs nuevos (por ej. de FILTROS, RADIADORES,
 * CONDENSADORES, SOPORTES) dentro de public/products.csv preservando los
 * productos existentes y añadiendo los nuevos. Se mantiene el header y se
 * deduplican por la combinación (id + applications_brand + applications_model
 * + applications_motor + applications_years).
 *
 * Uso:
 *   node scripts/merge-products.mjs ./public/incoming/filtros.csv ./public/incoming/radiadores.csv
 *
 * El archivo entrante debe tener exactamente las mismas columnas que
 * public/products.csv (id,name,brand,line,description,sku,price,imageUrl,oem,
 * specifications,characteristics,applications_brand,applications_model,
 * applications_motor,applications_years).
 */
import fs from 'node:fs';
import path from 'node:path';

const TARGET = path.resolve('public/products.csv');
const inputs = process.argv.slice(2);

if (inputs.length === 0) {
  console.error('Uso: node scripts/merge-products.mjs <csv1> [csv2 ...]');
  process.exit(1);
}

function parseCsv(text) {
  // Parser simple compatible con valores entre comillas (sin saltos de línea
  // dentro de campos). Suficiente para los CSVs de Polar.
  const lines = text.split(/\r?\n/).filter(l => l.trim().length);
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

function rowKey(row, headers) {
  const idx = (h) => headers.indexOf(h);
  return [
    row[idx('id')],
    row[idx('applications_brand')],
    row[idx('applications_model')],
    row[idx('applications_motor')],
    row[idx('applications_years')],
  ].join('|');
}

const targetText = fs.readFileSync(TARGET, 'utf8').replace(/^﻿/, '');
const targetRows = parseCsv(targetText);
const headers = targetRows[0];
const data = targetRows.slice(1);

const seen = new Set(data.map(r => rowKey(r, headers)));
let added = 0;

for (const file of inputs) {
  const txt = fs.readFileSync(file, 'utf8').replace(/^﻿/, '');
  const rows = parseCsv(txt);
  const incHeaders = rows[0];

  // Verifica que las columnas coincidan
  for (const h of headers) {
    if (!incHeaders.includes(h)) {
      console.error(`✗ El archivo ${file} no tiene la columna requerida "${h}".`);
      process.exit(2);
    }
  }

  for (const r of rows.slice(1)) {
    // reordena columnas en caso de orden distinto
    const aligned = headers.map(h => r[incHeaders.indexOf(h)] ?? '');
    const k = rowKey(aligned, headers);
    if (seen.has(k)) continue;
    seen.add(k);
    data.push(aligned);
    added++;
  }
  console.log(`✓ Procesado ${file}`);
}

const escape = (v) => {
  if (v == null) return '';
  const s = String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

const out = [headers, ...data].map(r => r.map(escape).join(',')).join('\n') + '\n';
fs.writeFileSync(TARGET, '﻿' + out, 'utf8');

console.log(`\nProductos añadidos: ${added}`);
console.log(`Total ahora: ${data.length} filas en public/products.csv`);
