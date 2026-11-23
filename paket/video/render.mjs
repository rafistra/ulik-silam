#!/usr/bin/env node
// Render video, sampul, atau buka Remotion Studio untuk satu proyek, lewat komposisi bersama.
//
//   node paket/video/render.mjs <slug>                 video → $ASET_DIR/proyek/<slug>/render/<slug>-<tanggal>-<versi>.mp4
//   node paket/video/render.mjs <slug> --sampul        sampul PNG TikTok dan YouTube (--sampul=tiktok atau --sampul=youtube untuk salah satu)
//   node paket/video/render.mjs <slug> --studio        Remotion Studio dengan data proyek ini
//   node paket/video/render.mjs <slug> --cek           hanya cek kelengkapan aset
//   opsi: --frames=0-89 (potongan uji), --keluar=<berkas>, --json (progres sebagai baris JSON, dipakai katalog),
//         --browser=<path Chrome> (bila Remotion tidak bisa mengunduh Chrome Headless Shell)
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { siapkan, AKAR } from './siapkan.mjs';
import { ffmpeg } from './ffmpeg.mjs';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const arg = process.argv.slice(2);
const slug = arg.find((a) => !a.startsWith('--'));
const opsi = Object.fromEntries(arg.filter((a) => a.startsWith('--')).map((a) => a.slice(2).split('=')).map(([k, v]) => [k, v ?? true]));
const json = !!opsi.json;
const lapor = (jenis, isi) => (json ? console.log(JSON.stringify({ jenis, ...isi })) : console.log(isi.pesan ?? JSON.stringify(isi)));

if (!slug || !fs.existsSync(path.join(AKAR, 'proyek', slug, 'KONSEP.md'))) {
  console.error('Pemakaian: node paket/video/render.mjs <slug> [--sampul|--studio|--cek] [--frames=a-b] [--keluar=berkas]');
  process.exit(1);
}

const { data, kurang, peringatan, lokasi } = siapkan(slug);
for (const p of peringatan) lapor('peringatan', { pesan: `PERINGATAN: ${p}` });
const ringkas = Object.entries(kurang).filter(([, d]) => d.length);
for (const [j, d] of ringkas) lapor('kurang', { aset: j, daftar: d, pesan: `Belum ada ${j}: ${d.slice(0, 6).join(', ')}${d.length > 6 ? ` (+${d.length - 6})` : ''}` });
if (opsi.cek) {
  const n = data.adegan.length;
  if (!ringkas.length) lapor('lengkap', { pesan: `Semua aset wajib lengkap: ${n} adegan (ilustrasi, narasi, musik, SFX, merek). Aset di ${lokasi.aset}` });
  process.exit(0);
}

fs.mkdirSync(lokasi.cache, { recursive: true });
const fileProps = path.join(lokasi.cache, 'props.json');
const PLATFORM = ['tiktok', 'youtube'];
if (opsi.sampul && opsi.sampul !== true && !PLATFORM.includes(opsi.sampul)) {
  console.error(`--sampul hanya menerima ${PLATFORM.join(' atau ')}.`);
  process.exit(1);
}
const platformSampul = opsi.sampul === true ? PLATFORM : opsi.sampul ? [opsi.sampul] : [];
const propsSampul = (pl) => ({ data, platform: pl, posisi: data.sampul.posisi[pl] });
fs.writeFileSync(fileProps, JSON.stringify(opsi.sampul ? propsSampul(platformSampul[0]) : { data, durasiNarasi: [] }));

const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx';
const browser = opsi.browser || process.env.REMOTION_BROWSER;
const tambahan = browser ? [`--browser-executable=${browser}`] : [];
const jalankan = (args) =>
  new Promise((ok) => {
    const p = spawn(npx, ['remotion', ...args, ...tambahan], { cwd: DIR, shell: process.platform === 'win32' });
    let sisa = '';
    const baca = (b) => {
      sisa += b.toString();
      const baris = sisa.split(/\r?\n|\r/);
      sisa = baris.pop();
      for (const l of baris) {
        const m = l.match(/Rendered (\d+)\/(\d+)|Rendering frames.*?(\d+)\/(\d+)/i) || l.match(/(\d+)\/(\d+)/);
        if (json && m) lapor('progres', { selesai: +(m[1] || m[3]), total: +(m[2] || m[4]) });
        else if (!json && l.trim()) console.log(l);
        else if (json && /error|galat|peringatan|warning/i.test(l)) lapor('log', { pesan: l });
      }
    };
    p.stdout.on('data', baca);
    p.stderr.on('data', baca);
    p.on('close', ok);
  });

const tanggal = new Date().toISOString().slice(0, 10);
const versi = (data.proyek.versi.match(/^v\d+/) || ['v1'])[0];

if (opsi.studio) {
  lapor('info', { pesan: `Remotion Studio untuk ${slug} (aset dari ${lokasi.aset})` });
  await jalankan(['studio', 'src/index.ts', `--props=${fileProps}`, `--public-dir=${lokasi.aset}`]);
  process.exit(0);
}

fs.mkdirSync(lokasi.render, { recursive: true });
if (opsi.sampul) {
  // Satu still per platform; props ditulis ulang sebelum tiap render.
  const hasil = [];
  for (const pl of platformSampul) {
    fs.writeFileSync(fileProps, JSON.stringify(propsSampul(pl)));
    const k = opsi.keluar && platformSampul.length === 1 ? path.resolve(opsi.keluar) : path.join(lokasi.render, `${slug}-${tanggal}-${versi}-sampul-${pl}.png`);
    lapor('mulai', { keluar: k, pesan: `Render sampul ${pl === 'tiktok' ? 'TikTok' : 'YouTube'} ${slug} → ${k}` });
    const kode = await jalankan(['still', 'src/index.ts', 'Sampul', k, `--props=${fileProps}`, `--public-dir=${lokasi.aset}`]);
    if (kode !== 0) {
      lapor('gagal', { pesan: `Render sampul ${pl} gagal (kode ${kode}).` });
      process.exit(kode || 1);
    }
    hasil.push(k);
  }
  lapor('selesai', { keluar: hasil[hasil.length - 1], pesan: `Selesai: ${hasil.join(', ')}` });
  process.exit(0);
}

const keluar = opsi.keluar ? path.resolve(opsi.keluar) : path.join(lokasi.render, `${slug}-${tanggal}-${versi}${opsi.frames ? `-uji-${opsi.frames}.mp4` : '-mentah.mp4'}`);
lapor('mulai', { keluar, pesan: `Render video ${slug} → ${keluar}` });
const kode = await jalankan(['render', 'src/index.ts', 'VideoUlikSilam', keluar, `--props=${fileProps}`, `--public-dir=${lokasi.aset}`, '--codec=h264', '--crf=18', ...(opsi.frames ? [`--frames=${opsi.frames}`] : [])]);
if (kode !== 0) {
  lapor('gagal', { pesan: `Render gagal (kode ${kode}).` });
  process.exit(kode || 1);
}

// Audio final ke −16 LUFS (puncak −1,5 dBTP), video disalin tanpa encode ulang.
if (!opsi.frames && !opsi.keluar) {
  const akhir = keluar.replace(/-mentah\.mp4$/, '.mp4');
  const TARGET = 'I=-16:TP=-1.5:LRA=11';
  const ambilJson = (s) => JSON.parse(s.slice(s.lastIndexOf('{'), s.lastIndexOf('}') + 1));
  lapor('info', { pesan: 'Menormalkan audio ke −16 LUFS...' });
  const u = ambilJson(ffmpeg(['-hide_banner', '-i', keluar, '-vn', '-af', `loudnorm=${TARGET}:print_format=json`, '-f', 'null', '-']).stderr);
  const filter = `loudnorm=${TARGET}:measured_I=${u.input_i}:measured_TP=${u.input_tp}:measured_LRA=${u.input_lra}:measured_thresh=${u.input_thresh}:offset=${u.target_offset}:linear=true:print_format=json`;
  const r = ffmpeg(['-hide_banner', '-y', '-i', keluar, '-map', '0:v', '-map', '0:a', '-c:v', 'copy', '-af', filter, '-ar', '48000', '-c:a', 'aac', '-b:a', '256k', '-movflags', '+faststart', akhir]);
  if (r.kode !== 0) {
    lapor('gagal', { pesan: 'Normalisasi audio gagal:\n' + r.stderr.slice(-800) });
    process.exit(1);
  }
  lapor('selesai', { keluar: akhir, pesan: `Selesai: ${akhir}` });
} else lapor('selesai', { keluar, pesan: `Selesai: ${keluar}` });
