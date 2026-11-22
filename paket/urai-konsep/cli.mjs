#!/usr/bin/env node
// Pemakaian: node paket/urai-konsep/cli.mjs <KONSEP.md> [konsep.json]
//            node paket/urai-konsep/cli.mjs --semua      (semua proyek/<slug>/KONSEP.md, menulis konsep.json di sebelahnya)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { uraiKonsep, ringkas } from './index.mjs';

const AKAR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const arg = process.argv.slice(2);

function satu(masuk, keluar, diam = false) {
  const hasil = uraiKonsep(fs.readFileSync(masuk, 'utf8'), { sumber: path.basename(masuk) });
  if (keluar) fs.writeFileSync(keluar, JSON.stringify(hasil, null, 2) + '\n');
  if (!diam) {
    if (keluar) console.log(`Ditulis: ${keluar}`);
    ringkas(hasil).forEach((b) => console.log(b));
  }
  return hasil;
}

if (arg[0] === '--semua') {
  let gagal = 0;
  for (const slug of fs.readdirSync(path.join(AKAR, 'proyek')).sort()) {
    const md = path.join(AKAR, 'proyek', slug, 'KONSEP.md');
    if (!fs.existsSync(md)) continue;
    try {
      const h = satu(md, arg.includes('--tulis') ? path.join(AKAR, 'proyek', slug, 'konsep.json') : null, true);
      const m = h.validasi.masalah.length;
      if (m) gagal++;
      console.log(`${m ? 'MASALAH' : 'ok     '} ${slug}: ${h.adegan.length} adegan, ${h.validasi.masalah.length} masalah, ${h.validasi.peringatan.length} peringatan`);
    } catch (e) {
      gagal++;
      console.log(`GALAT   ${slug}: ${e.message}`);
    }
  }
  process.exit(gagal ? 1 : 0);
} else {
  const h = satu(arg[0] || 'KONSEP.md', arg[1] || null);
  process.exit(h.validasi.masalah.length ? 1 : 0);
}
