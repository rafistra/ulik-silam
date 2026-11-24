#!/usr/bin/env node
// Render carousel Ulik Silam ke PNG per slide, untuk TikTok (1080 × 1920) dan Instagram (1080 × 1350).
//
//   npm run carousel -- <slug>                  render final kedua platform → $ASET_DIR/proyek/<slug>/render/<platform>/NN.png
//   npm run carousel -- <slug> --draf           render draf (bertanda DRAF) → render/draf/<platform>/NN.png
//   npm run carousel -- <slug> --cek            hanya periksa kesiapan render final
//   opsi: --platform=tiktok|instagram, --json (progres sebagai baris JSON, dipakai katalog),
//         --browser=<path Chrome> (bila Remotion tidak bisa mengunduh Chrome Headless Shell)
//
// Render final ditolak bila ada masalah kontrak CAROUSEL.md atau berkas ilustrasi atau foto yang kurang.
// Status lisensi foto tidak diperiksa. Render draf tetap jalan dan menandai setiap slide dengan DRAF.
// Setiap render juga menulis lembar-kontak.png (semua slide dalam satu gambar).
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { siapkanCarousel } from './siapkan.mjs';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const arg = process.argv.slice(2);
const slug = arg.find((a) => !a.startsWith('--'));
const opsi = Object.fromEntries(arg.filter((a) => a.startsWith('--')).map((a) => a.slice(2).split('=')).map(([k, v]) => [k, v ?? true]));
const json = !!opsi.json;
const lapor = (jenis, isi) => (json ? console.log(JSON.stringify({ jenis, ...isi })) : console.log(isi.pesan ?? JSON.stringify(isi)));
const dua = (n) => String(n).padStart(2, '0');

if (!slug) {
  console.error('Pemakaian: npm run carousel -- <slug> [--draf|--cek] [--platform=tiktok|instagram]');
  process.exit(1);
}

let siap;
try {
  siap = siapkanCarousel(slug, { salinBerkas: !opsi.cek });
} catch (e) {
  lapor('gagal', { pesan: e.message });
  process.exit(1);
}
const { data, kurang, isianCaption, masalah, lokasi } = siap;
const n = data.carousel.slide.length;

const alasan = [];
for (const m of masalah) alasan.push(`Kontrak: ${m}`);
if (kurang.ilustrasi.length) alasan.push(`Ilustrasi belum ada: ${kurang.ilustrasi.join(', ')}`);
if (kurang.foto.length) alasan.push(`Foto arsip belum ada: ${kurang.foto.join(', ')}`);
if (kurang.merek.length) alasan.push(`Berkas merek belum ada: ${kurang.merek.join(', ')}`);
if (isianCaption.length) lapor('peringatan', { pesan: `PERINGATAN: caption ${isianCaption.join(' dan ')} masih berisi [diisi ...] (tidak menghalangi render).` });

if (opsi.cek) {
  if (!alasan.length) lapor('lengkap', { pesan: `Siap render final: ${n} slide. Aset di ${lokasi.aset}` });
  else for (const a of alasan) lapor('kurang', { pesan: a });
  process.exit(0);
}

const draf = !!opsi.draf;
if (!draf && alasan.length) {
  for (const a of alasan) lapor('kurang', { pesan: a });
  lapor('gagal', { pesan: `Render final ditolak (${alasan.length} hal di atas). Pakai --draf untuk render draf.` });
  process.exit(2);
}
if (draf && masalah.length) for (const m of masalah) lapor('peringatan', { pesan: `PERINGATAN kontrak: ${m}` });

const platform = opsi.platform ? [opsi.platform] : ['tiktok', 'instagram'];
const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx';
const browser = opsi.browser || process.env.REMOTION_BROWSER;
const tambahan = browser ? [`--browser-executable=${browser}`] : [];

const jalankan = (args, ke) =>
  new Promise((ok) => {
    const p = spawn(npx, ['remotion', ...args, ...tambahan], { cwd: DIR, shell: process.platform === 'win32' });
    let sisa = '';
    const baca = (b) => {
      sisa += b.toString();
      const baris = sisa.split(/\r?\n|\r/);
      sisa = baris.pop();
      for (const l of baris) {
        const m = l.match(/Rendered (\d+)\/(\d+)/i) || l.match(/(\d+)\/(\d+)/);
        if (json && m) lapor('progres', { selesai: ke.dasar + +m[1], total: ke.total });
        else if (!json && l.trim()) console.log(l);
        else if (json && /error|galat|warning/i.test(l)) lapor('log', { pesan: l });
      }
    };
    p.stdout.on('data', baca);
    p.stderr.on('data', baca);
    p.on('close', ok);
  });

fs.mkdirSync(lokasi.cache, { recursive: true });
const total = platform.length * (n + 1);
let dasar = 0;
for (const pl of platform) {
  const keluar = path.join(lokasi.render, ...(draf ? ['draf', pl] : [pl]));
  const sementara = path.join(lokasi.cache, `carousel-${pl}`);
  fs.rmSync(sementara, { recursive: true, force: true });
  fs.mkdirSync(sementara, { recursive: true });
  const fileProps = path.join(lokasi.cache, `carousel-props-${pl}.json`);
  fs.writeFileSync(fileProps, JSON.stringify({ data, platform: pl, draf }));
  lapor('mulai', { keluar, pesan: `Render ${draf ? 'draf' : 'final'} ${pl} (${n} slide + lembar kontak) → ${keluar}` });
  const kode = await jalankan(
    ['render', 'src/index.js', 'Carousel', sementara, '--sequence', '--image-format=png', `--props=${fileProps}`, `--public-dir=${lokasi.aset}`, '--image-sequence-pattern=[frame].[ext]'],
    { dasar, total },
  );
  if (kode !== 0) {
    lapor('gagal', { pesan: `Render ${pl} gagal (kode ${kode}).` });
    process.exit(kode || 1);
  }
  // Frame 0..n-1 menjadi 01.png..NN.png, frame terakhir menjadi lembar-kontak.png.
  const hasil = fs.readdirSync(sementara).filter((f) => f.endsWith('.png')).sort((a, b) => parseInt(a) - parseInt(b));
  if (hasil.length !== n + 1) {
    lapor('gagal', { pesan: `Jumlah gambar ${hasil.length}, seharusnya ${n + 1}. Lihat ${sementara}` });
    process.exit(1);
  }
  fs.mkdirSync(keluar, { recursive: true });
  hasil.forEach((f, i) => fs.copyFileSync(path.join(sementara, f), path.join(keluar, i < n ? `${dua(i + 1)}.png` : 'lembar-kontak.png')));
  fs.rmSync(sementara, { recursive: true, force: true });
  dasar += n + 1;
  lapor('platform', { keluar, pesan: `${pl}: ${n} slide dan lembar-kontak.png di ${keluar}` });
}
lapor('selesai', { keluar: path.join(lokasi.render, ...(draf ? ['draf'] : [])), pesan: `Selesai: render ${draf ? 'draf' : 'final'} ${platform.join(' dan ')}.` });
