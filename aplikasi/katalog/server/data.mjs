// Membaca repo Ulik Silam: proyek.yaml, KONSEP.md (lewat urai-konsep), kartu pustaka, dan berkas aset.
// Katalog hanya menulis proyek.yaml (tahap, prioritas, catatan) dan status kartu pustaka.
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { uraiKonsep } from '../../../paket/urai-konsep/index.mjs';

export const AKAR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
export const TAHAP = ['Bank ide', 'Brief', 'Naskah terverifikasi', 'Aset', 'Rakit & render', 'Tayang', 'Evaluasi'];
export const BATAS = { Aset: 2, 'Rakit & render': 2 };
const GAMBAR = /\.(png|jpe?g|webp)$/i;
const AUDIO = /\.(mp3|wav|m4a|aac|ogg|flac|opus)$/i;
const VIDEO = /\.(mp4|mov|webm)$/i;

// ---------- .env dan folder aset ----------
function bacaEnv() {
  const f = path.join(AKAR, '.env');
  const hasil = {};
  if (!fs.existsSync(f)) return hasil;
  for (const b of fs.readFileSync(f, 'utf8').split(/\r?\n/)) {
    const m = b.match(/^\s*([A-Z_]+)\s*=\s*(.*?)\s*$/);
    if (m) hasil[m[1]] = m[2].replace(/^"|"$/g, '');
  }
  return hasil;
}
const env = () => ({ ...bacaEnv(), ...process.env });
export function asetDir() {
  const a = env().ASET_DIR || 'aset';
  return path.isAbsolute(a) ? a : path.join(AKAR, a);
}
function arsipDir(meta) {
  if (!meta.arsip_lama) return null;
  const kandidat = [path.join(path.dirname(AKAR), meta.arsip_lama)];
  if (env().ARSIP_DIR) kandidat.push(path.join(env().ARSIP_DIR, path.basename(meta.arsip_lama)));
  return kandidat.find((k) => fs.existsSync(k)) || null;
}

// ---------- proyek.yaml ----------
export function bacaYaml(file) {
  const data = {};
  if (!fs.existsSync(file)) return data;
  for (const b of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const m = b.match(/^([a-z_]+):\s*(.*)$/);
    if (!m) continue;
    let [, k, v] = m;
    if (/^[\["{]/.test(v)) {
      try {
        data[k] = JSON.parse(v);
        continue;
      } catch {
        // nilai flow gaya YAML (misalnya {ilustrasi: 16}): biarkan sebagai teks
      }
    }
    data[k] = v === 'null' ? null : /^-?\d+$/.test(v) ? Number(v) : v;
  }
  return data;
}

/** Ubah satu kunci di proyek.yaml tanpa menyentuh baris lain. */
export function tulisKunci(slug, kunci, nilai) {
  const file = path.join(AKAR, 'proyek', slug, 'proyek.yaml');
  let teks = fs.readFileSync(file, 'utf8');
  const baris = `${kunci}: ${typeof nilai === 'string' && !/[:#\[\]{}]|^\s|\s$/.test(nilai) && nilai !== '' ? nilai : JSON.stringify(nilai)}`;
  const re = new RegExp(`^${kunci}:.*$`, 'm');
  teks = re.test(teks) ? teks.replace(re, () => baris) : teks.replace(/\n?$/, '\n') + baris + '\n';
  fs.writeFileSync(file, teks);
}

/** Jalankan scripts/buat-status.py bila Python tersedia. */
export function perbaruiStatus() {
  for (const py of ['python3', 'python', 'py']) {
    const r = spawnSync(py, [path.join(AKAR, 'scripts', 'buat-status.py')], { cwd: AKAR, encoding: 'utf8' });
    if (r.status === 0) return { ok: true, pesan: r.stdout.trim() };
  }
  return { ok: false, pesan: 'Python tidak ditemukan; jalankan python3 scripts/buat-status.py secara manual.' };
}

// ---------- KONSEP.md (disimpan sementara per mtime) ----------
const simpanKonsep = new Map();
function konsep(slug) {
  const file = path.join(AKAR, 'proyek', slug, 'KONSEP.md');
  if (!fs.existsSync(file)) return null;
  const mtime = fs.statSync(file).mtimeMs;
  const ada = simpanKonsep.get(slug);
  if (ada && ada.mtime === mtime) return ada;
  const teks = fs.readFileSync(file, 'utf8');
  let hasil;
  try {
    hasil = uraiKonsep(teks, { sumber: 'KONSEP.md' });
  } catch (e) {
    hasil = { galat: e.message, adegan: [], validasi: { masalah: [e.message], peringatan: [], penyesuaian: [] } };
  }
  const nilai = { mtime, hasil, teks };
  simpanKonsep.set(slug, nilai);
  return nilai;
}

/** Ambil isi mentah satu bagian `## <judul>` dari KONSEP.md. */
function bagianMentah(teks, judul) {
  const baris = teks.replace(/\r\n/g, '\n').split('\n');
  const i = baris.findIndex((b) => b.trim() === `## ${judul}`);
  if (i < 0) return '';
  let j = i + 1;
  while (j < baris.length && !/^## /.test(baris[j])) j++;
  return baris.slice(i + 1, j).join('\n').trim();
}

// ---------- berkas aset ----------
// Sumber berkas sebuah proyek, berurutan: $ASET_DIR/proyek/<slug>/ lalu folder proyek lama (public/ dan out/).
function sumberBerkas(slug, meta) {
  const s = [];
  const a = path.join(asetDir(), 'proyek', slug);
  if (fs.existsSync(a)) s.push({ akar: a, url: `/media/aset/proyek/${enc(slug)}`, render: 'render' });
  const lama = arsipDir(meta);
  if (lama) s.push({ akar: path.join(lama, 'public'), url: `/media/arsip/${enc(slug)}/public`, renderAkar: path.join(lama, 'out'), renderUrl: `/media/arsip/${enc(slug)}/out` });
  return s;
}
const enc = (p) => p.split('/').map(encodeURIComponent).join('/');
const daftar = (dir, re) => (fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => re.test(f)).sort() : []);
const dua = (n) => String(n).padStart(2, '0');

function cariDi(sumber, sub, re) {
  for (const s of sumber) {
    const f = daftar(path.join(s.akar, sub), re)[0];
    if (f) return `${s.url}/${enc(sub)}/${encodeURIComponent(f)}`;
  }
  return null;
}

export function asetProyek(slug, meta, k) {
  const sumber = sumberBerkas(slug, meta);
  const adegan = {};
  for (const a of k?.adegan || []) {
    const n = dua(a.nomor);
    adegan[a.nomor] = {
      ilustrasi: cariDi(sumber, 'ilustrasi', new RegExp(`^adegan-${n}\\.(png|jpe?g|webp)$`, 'i')),
      narasi: cariDi(sumber, 'narasi', new RegExp(`^adegan-${n}\\.`, 'i')) || cariDi(sumber, 'narasi/potongan', new RegExp(`^adegan-${n}\\.`, 'i')),
    };
  }
  const babak = {};
  for (const n of Object.keys(k?.namaBabak || {})) {
    babak[n] = cariDi(sumber, 'narasi', new RegExp(`^babak-${n}(-[ab])?\\.(mp3|wav|m4a)$`, 'i'));
  }
  const musik = {};
  for (const c of k?.cueMusik || []) musik[c.nomor] = cariDi(sumber, 'musik', new RegExp(`^cue-0*${c.nomor}[-.]`, 'i'));
  const sfx = {};
  for (const x of k?.sfx || []) sfx[x.nomor] = cariDi(sumber, 'sfx', new RegExp(`^sfx-0*${x.nomor}-.*${AUDIO.source}`, 'i'));
  const sampul = cariDi(sumber, 'ilustrasi', /^sampul\.(png|jpe?g|webp)$/i);

  const render = [];
  for (const s of sumber) {
    const dir = s.renderAkar || path.join(s.akar, s.render || 'render');
    const url = s.renderUrl || `${s.url}/render`;
    for (const f of daftar(dir, new RegExp(`${VIDEO.source}|${GAMBAR.source}`, 'i'))) {
      const st = fs.statSync(path.join(dir, f));
      render.push({ nama: f, url: `${url}/${encodeURIComponent(f)}`, jenis: VIDEO.test(f) ? 'video' : 'gambar', ukuran: st.size, tanggal: new Date(st.mtimeMs).toISOString(), mentah: /mentah/i.test(f) });
    }
  }
  render.sort((a, b) => (a.mentah - b.mentah) || (b.jenis === 'video') - (a.jenis === 'video') || b.tanggal.localeCompare(a.tanggal));

  const hitung = (o) => ({ ada: Object.values(o).filter(Boolean).length, total: Object.keys(o).length });
  const kelengkapan = {
    ilustrasi: hitung(Object.fromEntries(Object.entries(adegan).map(([n, v]) => [n, v.ilustrasi]))),
    narasi: hitung(Object.fromEntries(Object.entries(adegan).map(([n, v]) => [n, v.narasi || babak[(k.adegan.find((a) => a.nomor == n) || {}).babak]]))),
    musik: hitung(musik),
    sfx: hitung(sfx),
  };
  return { adegan, babak, musik, sfx, sampul, render, kelengkapan, adaFolder: sumber.length > 0 };
}

// ---------- pustaka ----------
// Kartu pustaka disimpan sementara; dikosongkan saat ada berkas yang berubah (lihat bersihkanSimpanan).
let simpanPustaka = null;
export function bersihkanSimpanan() {
  simpanPustaka = null;
}
export function pustaka() {
  if (!simpanPustaka) simpanPustaka = bacaPustaka();
  return simpanPustaka;
}
function bacaPustaka() {
  const dir = path.join(AKAR, 'pustaka');
  const hasil = [];
  for (const jenis of fs.existsSync(dir) ? fs.readdirSync(dir) : []) {
    const dj = path.join(dir, jenis);
    if (!fs.statSync(dj).isDirectory()) continue;
    for (const id of fs.readdirSync(dj)) {
      const f = path.join(dj, id, 'aset.json');
      if (!fs.existsSync(f)) continue;
      let kartu;
      try {
        kartu = JSON.parse(fs.readFileSync(f, 'utf8'));
      } catch {
        continue;
      }
      const baca = (n) => (fs.existsSync(path.join(dj, id, n)) ? fs.readFileSync(path.join(dj, id, n), 'utf8').trim() : '');
      const berkas = (kartu.file || []).map((nama) => {
        const p = path.join(asetDir(), 'pustaka', jenis, id, nama);
        return { nama, url: `/media/aset/pustaka/${enc(jenis)}/${enc(id)}/${encodeURIComponent(nama)}`, ada: fs.existsSync(p) };
      });
      hasil.push({ ...kartu, prompt: baca('prompt.txt'), deskripsi: baca('deskripsi.txt'), berkas });
    }
  }
  return hasil.sort((a, b) => a.jenis.localeCompare(b.jenis) || a.id.localeCompare(b.id));
}

export function ubahStatusPustaka(jenis, id, status) {
  simpanPustaka = null;
  if (!['draf', 'disetujui', 'usang'].includes(status)) throw new Error('Status tidak dikenal');
  if (!/^[a-z0-9-]+$/.test(jenis) || !/^[a-z0-9-]+$/.test(id)) throw new Error('Id tidak sah');
  const f = path.join(AKAR, 'pustaka', jenis, id, 'aset.json');
  const kartu = JSON.parse(fs.readFileSync(f, 'utf8'));
  kartu.status = status;
  fs.writeFileSync(f, JSON.stringify(kartu, null, 2) + '\n');
}

// ---------- ringkasan dan detail proyek ----------
function slugProyek() {
  const dir = path.join(AKAR, 'proyek');
  return fs.readdirSync(dir).filter((s) => fs.existsSync(path.join(dir, s, 'proyek.yaml'))).sort();
}

export function daftarProyek() {
  return slugProyek().map((slug) => {
    const meta = bacaYaml(path.join(AKAR, 'proyek', slug, 'proyek.yaml'));
    const k = konsep(slug)?.hasil;
    const sumber = sumberBerkas(slug, meta);
    const gambar = cariDi(sumber, 'ilustrasi', /^sampul\.(png|jpe?g|webp)$/i) || cariDi(sumber, 'ilustrasi', /^adegan-01\.(png|jpe?g|webp)$/i);
    return {
      slug,
      judul: meta.judul || k?.judul || slug,
      format: meta.format || '',
      lapisan: meta.lapisan || k?.lapisan || [],
      latar: meta.latar || k?.latar || '',
      seri: meta.seri || '',
      tahap: meta.tahap || 'Bank ide',
      prioritas: meta.prioritas ?? null,
      catatan: meta.catatan || '',
      tanggalRender: meta.tanggal_render || '',
      tayang: meta.tayang || null,
      metrikTiktok: meta.metrik_tiktok || null,
      metrikShorts: meta.metrik_shorts || null,
      adegan: k?.adegan?.length || 0,
      tokoh: (k?.lembarKarakter || []).map((l) => l.nama),
      gambar,
      masalah: k?.validasi?.masalah?.length || 0,
    };
  });
}

export function detailProyek(slug) {
  if (!slugProyek().includes(slug)) return null;
  const meta = bacaYaml(path.join(AKAR, 'proyek', slug, 'proyek.yaml'));
  const kk = konsep(slug);
  const k = kk?.hasil || null;
  const aset = asetProyek(slug, meta, k || {});
  const kartuTokoh = pustaka().filter((p) => p.jenis === 'tokoh' && (p.dipakai_di || []).includes(slug));
  const lembar = (k?.lembarKarakter || []).map((l) => {
    const kartu = kartuTokoh.find((p) => p.judul === l.nama);
    return { ...l, kartu: kartu ? { id: kartu.id, status: kartu.status, gambar: kartu.berkas.find((b) => b.ada && GAMBAR.test(b.nama))?.url || null } : null };
  });
  return {
    slug,
    meta,
    konsep: k,
    lembar,
    aset,
    catatanGenre: kk ? bagianMentah(kk.teks, 'Catatan genre') : '',
    sumberMd: kk ? bagianMentah(kk.teks, 'Sumber') : '',
    pustakaDipakai: pustaka()
      .filter((p) => (p.dipakai_di || []).includes(slug))
      .map(({ id, jenis, judul, status }) => ({ id, jenis, judul, status })),
  };
}

// ---------- identitas merek ----------
export function merek() {
  const dir = path.join(AKAR, 'merek');
  const baca = (f, json = true) => {
    const p = path.join(dir, f);
    if (!fs.existsSync(p)) return null;
    const t = fs.readFileSync(p, 'utf8');
    return json ? JSON.parse(t) : t;
  };
  const versi = Object.fromEntries(
    (baca('VERSION', false) || '')
      .split(/\r?\n/)
      .map((b) => b.match(/^([\w-]+):\s*(.+)$/))
      .filter(Boolean)
      .map((m) => [m[1], m[2].trim()]),
  );
  const logo = daftar(path.join(dir, 'logo'), /\.svg$/i).map((f) => ({ berkas: f, url: `/media/merek/logo/${encodeURIComponent(f)}` }));
  return { tokens: baca('tokens.json'), identitas: baca('identitas.json'), versi, logo };
}

// ---------- media ----------
/** Petakan URL /media/... ke path berkas, atau null bila tidak sah. */
export function pathMedia(urlPath) {
  const bagian = urlPath.replace(/^\/media\//, '').split('/').map(decodeURIComponent);
  if (bagian.some((b) => b === '..' || b.includes('\\') || b === '')) return null;
  if (bagian[0] === 'aset') return path.join(asetDir(), ...bagian.slice(1));
  if (bagian[0] === 'arsip') {
    const meta = bacaYaml(path.join(AKAR, 'proyek', bagian[1], 'proyek.yaml'));
    const dir = arsipDir(meta);
    if (!dir || !['public', 'out'].includes(bagian[2])) return null;
    return path.join(dir, ...bagian.slice(2));
  }
  if (bagian[0] === 'merek') return path.join(AKAR, 'merek', ...bagian.slice(1));
  return null;
}

/** Folder yang dipantau untuk pembaruan langsung. */
export function folderPantau() {
  return [path.join(AKAR, 'proyek'), path.join(AKAR, 'pustaka'), path.join(AKAR, 'merek'), asetDir()].filter((d) => fs.existsSync(d));
}
