// Membaca repo Ulik Silam: proyek.yaml, KONSEP.md (lewat urai-konsep), CAROUSEL.md (lewat urai-carousel), kartu pustaka, dan berkas aset.
// Katalog hanya menulis proyek.yaml (tahap, prioritas, catatan) dan status kartu pustaka.
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { uraiKonsep } from '../../../paket/urai-konsep/index.mjs';
import { uraiCarousel } from '../../../paket/urai-carousel/index.mjs';
import { siapkanCarousel } from '../../../paket/carousel/siapkan.mjs';

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
        // nilai flow gaya YAML sederhana (misalnya {ilustrasi: 16, tiktok: null}): kunci diberi tanda kutip lalu dicoba lagi
        try {
          data[k] = JSON.parse(v.replace(/([{,]\s*)([A-Za-z_][\w-]*)\s*:/g, '$1"$2":'));
          continue;
        } catch {
          // biarkan sebagai teks
        }
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

// ---------- CAROUSEL.md (disimpan sementara per mtime) ----------
const simpanCarousel = new Map();
function carousel(slug) {
  const file = path.join(AKAR, 'proyek', slug, 'CAROUSEL.md');
  if (!fs.existsSync(file)) return null;
  const mtime = fs.statSync(file).mtimeMs;
  const ada = simpanCarousel.get(slug);
  if (ada && ada.mtime === mtime) return ada;
  const teks = fs.readFileSync(file, 'utf8');
  let hasil;
  try {
    hasil = uraiCarousel(teks);
  } catch (e) {
    hasil = { galat: e.message, slide: [], validasi: { masalah: [e.message], peringatan: [] } };
  }
  const nilai = { mtime, hasil, teks };
  simpanCarousel.set(slug, nilai);
  return nilai;
}
const adalahCarousel = (slug, meta) => meta.format === 'Carousel' || fs.existsSync(path.join(AKAR, 'proyek', slug, 'CAROUSEL.md'));

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

/** Slug nama tokoh untuk nama berkas (sama dengan slug() di scripts/panen-pustaka.py). */
export function slugNama(s) {
  return s
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

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
  const lembar = {};
  for (const l of k?.lembarKarakter || []) {
    const n = slugNama(l.nama);
    lembar[`lembar-${n}`] = cariDi(sumber, 'ilustrasi', new RegExp(`^lembar-(karakter-)?${n}\\.(png|jpe?g|webp)$`, 'i'));
  }

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
  return { adegan, babak, musik, sfx, sampul, lembar, render, kelengkapan, adaFolder: sumber.length > 0 };
}

/** Berkas per slide carousel: ilustrasi/slide-XX, arsip/slide-XX, render/tiktok/NN.png, render/instagram/NN.png. */
export function asetCarousel(slug, meta, c) {
  const sumber = sumberBerkas(slug, meta);
  const ilustrasiSlide = (n) => cariDi(sumber, 'ilustrasi', new RegExp(`^slide-${dua(n)}\\.(png|jpe?g|webp)$`, 'i'));
  const slide = {};
  for (const s of c?.slide || []) {
    const src = s.sumber || {};
    let ilustrasi = null;
    let berkas = null;
    if (src.jenis === 'baru') {
      berkas = `ilustrasi/slide-${dua(s.nomor)}.png`;
      ilustrasi = ilustrasiSlide(s.nomor);
    } else if (src.jenis === 'pakai-ulang' && src.slide) {
      ilustrasi = ilustrasiSlide(s.nomor) || ilustrasiSlide(src.slide);
    } else if (src.jenis === 'pakai-ulang' && src.video) {
      berkas = `ilustrasi/slide-${dua(s.nomor)}.png`;
      const dir = path.join(asetDir(), 'proyek', src.video.slug, 'ilustrasi');
      const f = daftar(dir, new RegExp(`^adegan-${dua(src.video.adegan)}\\.(png|jpe?g|webp)$`, 'i'))[0];
      ilustrasi = ilustrasiSlide(s.nomor) || (f ? `/media/aset/proyek/${enc(src.video.slug)}/ilustrasi/${encodeURIComponent(f)}` : null);
    } else if (src.jenis === 'pustaka') {
      const kartu = pustaka().find((p) => p.jenis === src.pustaka.jenis && p.id === src.pustaka.id);
      ilustrasi = ilustrasiSlide(s.nomor) || kartu?.berkas.find((b) => b.ada && GAMBAR.test(b.nama))?.url || null;
    }
    const perluArsip = s.foto || src.jenis === 'arsip';
    // render final di render/<platform>/NN.png, draf di render/draf/<platform>/NN.png (paket/carousel/render.mjs)
    const hasilRender = (...sub) => {
      const o = {};
      for (const pl of ['tiktok', 'instagram']) {
        const dir = path.join(asetDir(), 'proyek', slug, 'render', ...sub, pl);
        const f = daftar(dir, new RegExp(`^${dua(s.nomor)}\\.png$`, 'i'))[0];
        o[pl] = f ? `/media/aset/proyek/${enc(slug)}/render/${[...sub, pl].join('/')}/${f}?v=${Math.round(fs.statSync(path.join(dir, f)).mtimeMs)}` : null;
      }
      return o;
    };
    const render = hasilRender();
    const draf = hasilRender('draf');
    slide[s.nomor] = {
      ilustrasi,
      berkasIlustrasi: berkas,
      arsip: perluArsip ? cariDi(sumber, 'arsip', new RegExp(`^slide-${dua(s.nomor)}\\.(png|jpe?g|webp)$`, 'i')) : null,
      berkasArsip: perluArsip ? `arsip/slide-${dua(s.nomor)}.png` : null,
      render,
      draf,
    };
  }
  const hitung = (pilih) => {
    const v = Object.values(slide).filter((x) => pilih(x) !== undefined).map(pilih);
    return { ada: v.filter(Boolean).length, total: v.length };
  };
  const kelengkapan = {
    ilustrasi: hitung((x) => (x.berkasIlustrasi ? x.ilustrasi : undefined)),
    foto: hitung((x) => (x.berkasArsip ? x.arsip : undefined)),
    tiktok: hitung((x) => x.render.tiktok),
    instagram: hitung((x) => x.render.instagram),
  };
  const lain = [];
  for (const s of sumber) {
    const dir = path.join(s.akar, 'render');
    for (const f of daftar(dir, GAMBAR)) {
      const st = fs.statSync(path.join(dir, f));
      lain.push({ nama: f, url: `${s.url}/render/${encodeURIComponent(f)}`, jenis: 'gambar', ukuran: st.size, tanggal: new Date(st.mtimeMs).toISOString() });
    }
  }
  const lembar = (...sub) =>
    Object.fromEntries(
      ['tiktok', 'instagram'].map((pl) => {
        const f = path.join(asetDir(), 'proyek', slug, 'render', ...sub, pl, 'lembar-kontak.png');
        return [pl, fs.existsSync(f) ? `/media/aset/proyek/${enc(slug)}/render/${[...sub, pl].join('/')}/lembar-kontak.png?v=${Math.round(fs.statSync(f).mtimeMs)}` : null];
      }),
    );
  // kesiapan render final, dengan aturan yang sama dengan paket/carousel/render.mjs
  let siapFinal = { ok: false, alasan: [] };
  try {
    const x = siapkanCarousel(slug, { salinBerkas: false });
    const alasan = [
      ...x.masalah.map((m) => `Kontrak: ${m}`),
      ...(x.kurang.ilustrasi.length ? [`Ilustrasi belum ada: ${x.kurang.ilustrasi.join(', ')}`] : []),
      ...(x.kurang.foto.length ? [`Foto arsip belum ada: ${x.kurang.foto.join(', ')}`] : []),
    ];
    siapFinal = { ok: !alasan.length, alasan };
  } catch (e) {
    siapFinal = { ok: false, alasan: [e.message] };
  }
  return { slide, kelengkapan, render: lain, adaFolder: sumber.length > 0, folder: path.join(asetDir(), 'proyek', slug), lembarKontak: lembar(), lembarKontakDraf: lembar('draf'), siapFinal };
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
export function slugProyek() {
  const dir = path.join(AKAR, 'proyek');
  return fs.readdirSync(dir).filter((s) => fs.existsSync(path.join(dir, s, 'proyek.yaml'))).sort();
}

export function daftarProyek() {
  return slugProyek().map((slug) => {
    const meta = bacaYaml(path.join(AKAR, 'proyek', slug, 'proyek.yaml'));
    const k = konsep(slug)?.hasil;
    const c = adalahCarousel(slug, meta) ? carousel(slug)?.hasil : null;
    const sumber = sumberBerkas(slug, meta);
    const gambar = c
      ? cariDi(sumber, 'ilustrasi', /^slide-01\.(png|jpe?g|webp)$/i)
      : cariDi(sumber, 'ilustrasi', /^sampul\.(png|jpe?g|webp)$/i) || cariDi(sumber, 'ilustrasi', /^adegan-01\.(png|jpe?g|webp)$/i);
    return {
      slug,
      judul: meta.judul || k?.judul || c?.judul || slug,
      format: meta.format || '',
      lapisan: meta.lapisan || k?.lapisan || c?.lapisan || [],
      latar: meta.latar || k?.latar || c?.latar || '',
      seri: meta.seri || '',
      tahap: meta.tahap || 'Bank ide',
      prioritas: meta.prioritas ?? null,
      catatan: meta.catatan || '',
      tanggalRender: meta.tanggal_render || '',
      tayang: meta.tayang || null,
      metrikTiktok: meta.metrik_tiktok || null,
      metrikShorts: meta.metrik_shorts || null,
      adegan: k?.adegan?.length || 0,
      slide: c?.slide?.length || 0,
      tokoh: (k?.lembarKarakter || []).map((l) => l.nama),
      gambar,
      masalah: (c || k)?.validasi?.masalah?.length || 0,
    };
  });
}

export function detailProyek(slug) {
  if (!slugProyek().includes(slug)) return null;
  const meta = bacaYaml(path.join(AKAR, 'proyek', slug, 'proyek.yaml'));
  if (adalahCarousel(slug, meta)) {
    const cc = carousel(slug);
    const c = cc?.hasil || null;
    return {
      slug,
      meta,
      jenis: 'carousel',
      konsep: null,
      carousel: c,
      aset: asetCarousel(slug, meta, c),
      catatanGenre: cc ? bagianMentah(cc.teks, 'Catatan genre') : '',
      sumberMd: cc ? bagianMentah(cc.teks, 'Sumber') : '',
      gayaVisualMd: cc ? bagianMentah(cc.teks, 'Gaya visual') : '',
      pustakaDipakai: pustaka()
        .filter((p) => (p.dipakai_di || []).includes(slug))
        .map(({ id, jenis, judul, status }) => ({ id, jenis, judul, status })),
    };
  }
  const kk = konsep(slug);
  const k = kk?.hasil || null;
  const aset = asetProyek(slug, meta, k || {});
  const kartuTokoh = pustaka().filter((p) => p.jenis === 'tokoh' && (p.dipakai_di || []).includes(slug));
  const lembar = (k?.lembarKarakter || []).map((l) => {
    const kartu = kartuTokoh.find((p) => p.judul === l.nama);
    // gambar lembar karakter di folder aset proyek: ilustrasi/lembar-<nama-tokoh>.<png|jpg|webp>
    const berkasLembar = `lembar-${slugNama(l.nama)}`;
    const gambarProyek = aset.lembar?.[berkasLembar] || null;
    return {
      ...l,
      berkas: `ilustrasi/${berkasLembar}.png`,
      gambar: gambarProyek,
      kartu: kartu ? { id: kartu.id, status: kartu.status, gambar: kartu.berkas.find((b) => b.ada && GAMBAR.test(b.nama))?.url || null } : null,
    };
  });
  return {
    slug,
    meta,
    jenis: 'video',
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
