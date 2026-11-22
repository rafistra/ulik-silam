// Bantuan bersama untuk alat aset (Node, tanpa bash, agar jalan di Windows).
import fs from 'node:fs';
import zlibModul from 'node:zlib';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { createRequire } from 'node:module';
import { folderProyek } from '../siapkan.mjs';

// Skrip ini berasal dari proyek Remotion lama. Path lama (public/, src/data/, node_modules/) dipetakan ke
// folder aset proyek ($ASET_DIR/proyek/<slug>/) dan folder simpanan ($ASET_DIR/_cache/<slug>/).
// Slug dipasang oleh paket/video/alat.mjs lewat variabel ULIK_SLUG.
const DIR = path.dirname(fileURLToPath(import.meta.url));
export const AKAR = path.resolve(DIR, '..');
const SLUG = process.env.ULIK_SLUG;
if (!SLUG) throw new Error('Jalankan lewat: node paket/video/alat.mjs <alat> <slug>');
const lokasi = folderProyek(SLUG);
const require = createRequire(import.meta.url);
export const p = (...s) => {
  const rel = path.join(...s).replace(/\\/g, '/');
  const [kepala, ...sisa] = rel.split('/');
  if (kepala === 'public') return path.join(lokasi.aset, ...sisa);
  if (rel === 'konsep.json' || rel.startsWith('src/')) return path.join(lokasi.cache, path.basename(rel));
  if (rel.startsWith('node_modules/.cache')) return path.join(lokasi.cache, ...rel.split('/').slice(2));
  if (kepala === 'node_modules') return path.join(path.dirname(require.resolve(`${sisa[0]}/package.json`)), ...sisa.slice(1));
  return path.join(lokasi.cache, rel);
};

export const EKST_AUDIO = ['wav', 'mp3', 'm4a', 'aac', 'ogg', 'flac', 'opus'];
export const EKST_GAMBAR = ['png', 'jpg', 'jpeg', 'webp'];

export const dua = (n) => String(n).padStart(2, '0');
export const kebab = (s) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

export const bacaKonsep = () => JSON.parse(fs.readFileSync(p('konsep.json'), 'utf8'));

// Paragraf babak: setiap paragraf diakhiri "..." (tidak ditambah bila sudah berakhir elipsis);
// titik penutup diganti elipsis ("kembali." → "kembali..."), seperti blok Narasi lengkap di KONSEP.md.
export const denganJeda = (s) => (/(\.\.\.|…)$/.test(s) ? s : s.replace(/\.$/, '') + '...');
export const tanpaJedaAkhir = (s) => s.replace(/\.\.\.$/, '');

export function kelompokBabak(adegan) {
  const m = new Map();
  for (const a of adegan) {
    if (!m.has(a.babak)) m.set(a.babak, []);
    m.get(a.babak).push(a);
  }
  return m;
}

// Tulis hanya bila isi berubah; berkas yang sama tidak disentuh.
export function tulisBilaBerubah(file, isi) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  if (fs.existsSync(file) && fs.readFileSync(file, 'utf8') === isi) return false;
  fs.writeFileSync(file, isi);
  return true;
}

export { ffmpeg } from '../ffmpeg.mjs';

export function cariBerkas(dir, regex) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => regex.test(f));
}

// Pembaca PNG sederhana (8-bit RGB/RGBA, tanpa interlace) untuk skrip peta: ffmpeg bawaan Remotion
// tidak punya keluaran rawvideo, jadi gambar diperkecil ke PNG rgb24/rgba lalu dibaca di sini.
export function bacaPng(file) {
  const zlib = zlibModul;
  const buf = fs.readFileSync(file);
  let o = 8;
  let w = 0, h = 0, tipe = 2;
  const idat = [];
  while (o < buf.length) {
    const len = buf.readUInt32BE(o);
    const t = buf.toString('ascii', o + 4, o + 8);
    const d = buf.subarray(o + 8, o + 8 + len);
    if (t === 'IHDR') {
      w = d.readUInt32BE(0);
      h = d.readUInt32BE(4);
      if (d[8] !== 8 || d[12] !== 0) throw new Error(`PNG tidak didukung: ${file}`);
      tipe = d[9];
    } else if (t === 'IDAT') idat.push(d);
    else if (t === 'IEND') break;
    o += 12 + len;
  }
  const kanal = tipe === 6 ? 4 : tipe === 2 ? 3 : null;
  if (!kanal) throw new Error(`PNG harus RGB atau RGBA: ${file}`);
  const raw = zlib.inflateSync(Buffer.concat(idat));
  const baris = w * kanal;
  const out = Buffer.alloc(baris * h);
  for (let y = 0; y < h; y++) {
    const f = raw[y * (baris + 1)];
    const src = raw.subarray(y * (baris + 1) + 1, (y + 1) * (baris + 1));
    for (let x = 0; x < baris; x++) {
      const a = x >= kanal ? out[y * baris + x - kanal] : 0;
      const b = y > 0 ? out[(y - 1) * baris + x] : 0;
      const c = x >= kanal && y > 0 ? out[(y - 1) * baris + x - kanal] : 0;
      let v = src[x];
      if (f === 1) v += a;
      else if (f === 2) v += b;
      else if (f === 3) v += (a + b) >> 1;
      else if (f === 4) {
        const p = a + b - c;
        const pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
        v += pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
      }
      out[y * baris + x] = v & 255;
    }
  }
  return { w, h, kanal, data: out };
}
