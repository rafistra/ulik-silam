#!/usr/bin/env node
// Alat persiapan aset untuk proyek baru (hasilnya ditulis ke $ASET_DIR/proyek/<slug>/):
//   node paket/video/alat.mjs potong <slug> [babak...]   potong rekaman babak ElevenLabs menjadi narasi/potongan/adegan-NN.wav
//   node paket/video/alat.mjs peta-dasar <slug>          data peta dasar (Natural Earth) untuk adegan peta animasi
//   node paket/video/alat.mjs peta-warna <slug>          palet peta dari ilustrasi adegan sekitarnya
//   node paket/video/alat.mjs transkripsi <slug> <masuk.wav> <keluar.kata.json>   waktu kata lokal (whisper.cpp)
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { siapkan, folderProyek, asetDir } from './siapkan.mjs';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const ALAT = { potong: 'potong-narasi.mjs', 'peta-dasar': 'peta-dasar.mjs', 'peta-warna': 'peta-warna.mjs', transkripsi: 'transkripsi.mjs' };
const [alat, slug, ...sisa] = process.argv.slice(2);
if (!ALAT[alat] || !slug) {
  console.error('Pemakaian: node paket/video/alat.mjs <potong|peta-dasar|peta-warna|transkripsi> <slug> [argumen]');
  process.exit(1);
}
const lokasi = folderProyek(slug);
if (!lokasi.aset.startsWith(asetDir()) && !sisa.includes('--izinkan-lama')) {
  console.error(`Aset ${slug} masih di folder proyek lama (${lokasi.aset}); alat ini tidak menulis ke sana. Pindahkan asetnya ke ${path.join(asetDir(), 'proyek', slug)} dulu.`);
  process.exit(1);
}
// Berkas yang dulu dibaca dari konsep.json dan src/data/kebutuhan-aset.json disiapkan di folder simpanan.
const { data, konsep } = siapkan(slug);
fs.mkdirSync(lokasi.cache, { recursive: true });
fs.writeFileSync(path.join(lokasi.cache, 'konsep.json'), JSON.stringify(konsep, null, 2) + '\n');
const babak = [...new Set(data.adegan.map((a) => a.babak))];
fs.writeFileSync(
  path.join(lokasi.cache, 'kebutuhan-aset.json'),
  JSON.stringify(
    {
      adegan: konsep.adegan.map((a) => ({ nomor: a.nomor, babak: a.babak, kata: a.kata, hening: a.hening })),
      babak,
      musik: data.cue.map((c) => ({ nomor: c.nomor, berkas: c.berkas })),
      sfx: data.sfx.map((s) => ({ nomor: s.nomor, berkas: s.berkas, opsional: s.opsional })),
      peta: Object.entries(data.peta).map(([n, d]) => ({ nomor: +n, geojson: d.geojson, ikonKhusus: d.ikonKhusus.map((x) => x.slug) })),
      merek: [
        { kunci: 'tanda', berkas: 'mata-nyala', wajib: true },
        { kunci: 'wordmark', berkas: 'wordmark-krem', wajib: true },
      ],
    },
    null,
    2,
  ) + '\n',
);
const r = spawnSync(process.execPath, [path.join(DIR, 'alat', ALAT[alat]), ...sisa.filter((x) => x !== '--izinkan-lama')], { stdio: 'inherit', env: { ...process.env, ULIK_SLUG: slug } });
process.exit(r.status ?? 1);
