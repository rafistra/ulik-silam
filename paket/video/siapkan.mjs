// Menyiapkan data satu proyek untuk komposisi VideoUlikSilam (props `data`).
// Pengganti scripts/dari-konsep.mjs dan scripts/cek-aset.mjs di proyek Remotion lama: tidak menulis kode,
// hanya mengembalikan objek data. Yang ditulis hanya simpanan jeda di $ASET_DIR/_cache/<slug>/.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { uraiKonsep } from '../urai-konsep/index.mjs';
import { ffmpeg } from './ffmpeg.mjs';

/** Posisi gambar sampul sah: x, y −50…50 (% kanvas), skala 1–1,5. Sama dengan jepitPosisi di src/lib/sampul.ts. */
function jepitPosisi(p) {
  const o = p && typeof p === 'object' ? p : {};
  const j = (v, min, maks, b) => Math.min(maks, Math.max(min, typeof v === 'number' && Number.isFinite(v) ? v : b));
  return { x: Math.round(j(o.x, -50, 50, 0) * 10) / 10, y: Math.round(j(o.y, -50, 50, 0) * 10) / 10, skala: Math.round(j(o.skala, 1, 1.5, 1) * 100) / 100 };
}

export const AKAR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const EKST_AUDIO = ['wav', 'mp3', 'm4a', 'aac', 'ogg', 'flac', 'opus'];
const EKST_GAMBAR = ['png', 'jpg', 'jpeg', 'webp'];
const dua = (n) => String(n).padStart(2, '0');
const kebab = (s) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
const lepas = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// ---------- lokasi ----------
function bacaEnv() {
  const f = path.join(AKAR, '.env');
  const h = {};
  if (fs.existsSync(f)) for (const b of fs.readFileSync(f, 'utf8').split(/\r?\n/)) {
    const m = b.match(/^\s*([A-Z_]+)\s*=\s*(.*?)\s*$/);
    if (m) h[m[1]] = m[2].replace(/^"|"$/g, '');
  }
  return { ...h, ...process.env };
}
export function asetDir() {
  const a = bacaEnv().ASET_DIR || 'aset';
  return path.isAbsolute(a) ? a : path.join(AKAR, a);
}
function bacaYaml(file) {
  const d = {};
  if (!fs.existsSync(file)) return d;
  for (const b of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const m = b.match(/^([a-z_]+):\s*(.*)$/);
    if (!m) continue;
    try {
      d[m[1]] = /^[\["{]/.test(m[2]) ? JSON.parse(m[2]) : m[2];
    } catch {
      d[m[1]] = m[2];
    }
  }
  return d;
}

/**
 * Folder aset sebuah proyek (setara public/ di proyek Remotion lama) dan folder proyek lama bila ada.
 * Urutan: $ASET_DIR/proyek/<slug>/, lalu <arsip_lama>/public.
 */
export function folderProyek(slug) {
  const meta = bacaYaml(path.join(AKAR, 'proyek', slug, 'proyek.yaml'));
  const baru = path.join(asetDir(), 'proyek', slug);
  let lama = null;
  if (meta.arsip_lama) {
    const env = bacaEnv();
    lama = [path.join(path.dirname(AKAR), meta.arsip_lama), env.ARSIP_DIR && path.join(env.ARSIP_DIR, path.basename(meta.arsip_lama))].find((d) => d && fs.existsSync(d)) || null;
  }
  // Folder baru dipakai bila sudah berisi aset; folder render/ saja tidak dihitung (proyek lama tetap memakai public/ lamanya).
  const adaIsi = ['ilustrasi', 'narasi', 'musik'].some((d) => fs.existsSync(path.join(baru, d)));
  const aset = adaIsi || !lama ? baru : path.join(lama, 'public');
  return { aset, lama, meta, cache: path.join(asetDir(), '_cache', slug), render: path.join(baru, 'render') };
}

// ---------- data dari KONSEP.md (bagian data dari scripts/dari-konsep.mjs) ----------
const GERAK = ['zoom-masuk', 'geser-atas', 'zoom-keluar', 'geser-bawah'];
const judulSingkat = (v) => {
  const kal = v.replace(/\b(drg|dr|Dr|Jl|No|St)\./g, '$1․').split(/[.;:]/)[0].replace(/․/g, '.').trim().split(/\s+/);
  return kal.slice(0, 6).join(' ') + (kal.length > 6 ? '…' : '');
};
const SUASANA = /angin|gemericik|jangkrik|bisik|suasana|ambience|hujan|gerimis|ombak|keramaian|murmur|room tone|ticking|detak|sungai|aliran|serangga|tonggeret|hutan|ruang|nyala|berderak|dayung|riak/i;

function bagianMentah(md, judul, level) {
  const b = md.split('\n');
  const pref = '#'.repeat(level) + ' ';
  const i = b.findIndex((x) => x.trim() === pref + judul);
  if (i < 0) return '';
  let j = i + 1;
  while (j < b.length) {
    const m = b[j].match(/^(#+) /);
    if (m && m[1].length <= level) break;
    j++;
  }
  return b.slice(i + 1, j).join('\n').trim();
}

export function dataKonsep(k, konsepMd, peringatan = []) {
  const reUtuh = (s) => new RegExp(`(?<![\\p{L}\\p{N}])${lepas(s)}(?![\\p{L}\\p{N}])`, 'iu');
  const kataKunciKonsep = ((bagianMentah(konsepMd, 'Teks dan subtitle', 3).match(/Kata kunci[^:\n]*:\s*(.+?)\.?(?=\.\s|\n|$)/i) || [])[1] || '')
    .split(/,\s*(?![^()]*\))/)
    .map((s) => s.replace(/[*_"“”]/g, '').trim())
    .filter(Boolean)
    .map((s) => {
      const m = s.match(/\(([^)]*)\)/);
      const batas = m && /^adegan\s/i.test(m[1].trim()) ? (m[1].match(/\d+/g) || []).map(Number) : null;
      return { kata: s.replace(/\s*\([^)]*\)/g, '').trim(), batas };
    });
  const kataKunciAdegan = (narasi, nomor) => kataKunciKonsep.filter((kk) => (!kk.batas || kk.batas.includes(nomor)) && reUtuh(kk.kata).test(narasi)).map((kk) => kk.kata);
  for (const kk of kataKunciKonsep)
    if (!k.adegan.some((a) => (!kk.batas || kk.batas.includes(a.nomor)) && reUtuh(kk.kata).test(a.narasi)))
      peringatan.push(`kata kunci "${kk.kata}" tidak ditemukan di narasi ${kk.batas ? 'adegan ' + kk.batas.join(', ') : 'mana pun'}`);

  const adegan = k.adegan.map((a, i) => ({
    nomor: a.nomor,
    babak: a.babak,
    judulSingkat: judulSingkat(a.visual),
    durasiCadangan: a.durasiCadangan,
    bidikan: a.bidikan,
    gerak: GERAK[i % GERAK.length],
    narasi: a.narasi,
    narasiSuara: a.narasiSuara,
    teksLayar: a.teksLayar,
    posisiTeksLayar: 'atas',
    visual: a.visual,
    hening: a.hening,
    epilog: a.epilog,
    peta: !!a.petaAnimasi,
    kataKunci: kataKunciAdegan(a.narasi, a.nomor),
  }));

  const berkasBunyi = new Map();
  const sfx = k.sfx.map((s) => {
    if (!berkasBunyi.has(s.bunyi)) berkasBunyi.set(s.bunyi, `sfx-${dua(s.nomor)}-${kebab(s.bunyi.replace(/\(.*?\)/g, '').split(':')[0])}`);
    const suasana = SUASANA.test(s.bunyi + ' ' + s.kataKunci);
    return { nomor: s.nomor, adegan: s.adegan, bunyi: s.bunyi, berkas: berkasBunyi.get(s.bunyi), detik: /penutup/i.test(s.bunyi) ? -2.5 : 0, volume: suasana ? 0.3 : 0.5, ulang: suasana, opsional: /opsional/i.test(s.bunyi) };
  });
  const cue = k.cueMusik.map((c) => ({ nomor: c.nomor, nama: c.nama, berkas: `cue-${c.nomor}-${kebab(c.nama)}`, babakAwal: c.babakAwal, babakAkhir: c.babakAkhir }));

  const bagianSeri = [k.ringkasan.Seri, k.ringkasan.Format, k.judul].map((s) => (s || '').match(/\bPart\s*(\d+)/i)).find(Boolean);
  const judulSampul =
    k.caption.map((c) => ((c.catatan || '').match(/\*\*Judul di layar sampul:\*\*\s*(.+)/) || [])[1]).find(Boolean)?.trim() ||
    (bagianSeri ? k.judul.replace(/\s*\(Part\s*\d+\)/i, '') : k.judul).replace(/\s*\(judul kerja\)/i, '').trim();
  const proyek = {
    judul: k.judul,
    judulSampul,
    slug: k.slug,
    versi: k.versi,
    rasio: k.rasio,
    durasiMaksDetik: k.durasiMaksDetik,
    durasiTargetDetik: k.durasiTargetDetik ?? null,
    lapisan: k.lapisan,
    latar: k.latar,
    bagianSeri: bagianSeri ? `Part ${bagianSeri[1]}` : '',
    ulikan: { teks: k.ulikan?.teks || '', sumber: k.ulikan?.sumber || '' },
    suara: { model: k.suara?.model || 'Eleven v3', voice: k.suara?.voice || '', stability: k.suara?.stability || '', arahanBabak: k.suara?.arahanBabak || {} },
  };
  const peta = Object.fromEntries(
    Object.entries(k.peta || {}).map(([n, d]) => [n, { ...d, catatan: undefined, ikonKhusus: d.ikonKhusus.map(({ slug, keterangan }) => ({ slug, keterangan })) }]),
  );
  return { proyek, namaBabak: k.namaBabak, adegan, cue, sfx, adeganHening: k.adeganHening, peta };
}

// ---------- berkas aset (bagian pindai dari scripts/cek-aset.mjs) ----------
const daftar = (dir) => (fs.existsSync(dir) ? fs.readdirSync(dir) : []);
function cari1(akar, dir, dasar, eks) {
  const re = new RegExp(`^${lepas(dasar)}\\.(${eks.join('|')})$`, 'i');
  const f = daftar(path.join(akar, dir)).filter((x) => re.test(x)).sort()[0];
  return f ? `${dir}/${f}` : null;
}

export function pindaiAset(akar, d) {
  const aset = { ilustrasi: {}, narasi: {}, musik: {}, sfx: {}, merek: {}, sampul: {}, peta: {} };
  const kurang = { ilustrasi: [], narasi: [], musik: [], sfx: [], merek: [], peta: [] };
  const s = cari1(akar, 'ilustrasi', 'sampul', EKST_GAMBAR);
  if (s) aset.sampul.gambar = s;
  for (const a of d.adegan) {
    const n = dua(a.nomor);
    const il = cari1(akar, 'ilustrasi', `adegan-${n}`, EKST_GAMBAR);
    if (il) aset.ilustrasi[a.nomor] = il;
    else kurang.ilustrasi.push(`ilustrasi/adegan-${n}.png`);
    const na = cari1(akar, 'narasi', `adegan-${n}`, EKST_AUDIO) || cari1(akar, 'narasi/potongan', `adegan-${n}`, ['wav']);
    if (na) aset.narasi[a.nomor] = na;
    else kurang.narasi.push(`adegan ${a.nomor}`);
  }
  for (const c of d.cue) {
    const f = cari1(akar, 'musik', c.berkas, EKST_AUDIO) || (daftar(path.join(akar, 'musik')).find((x) => new RegExp(`^cue-0*${c.nomor}[-.]`, 'i').test(x)) ? `musik/${daftar(path.join(akar, 'musik')).find((x) => new RegExp(`^cue-0*${c.nomor}[-.]`, 'i').test(x))}` : null);
    if (f) aset.musik[c.nomor] = f;
    else kurang.musik.push(`musik/${c.berkas}.mp3`);
  }
  for (const x of d.sfx) {
    const f = cari1(akar, 'sfx', x.berkas, EKST_AUDIO) || (() => {
      const g = daftar(path.join(akar, 'sfx')).find((y) => new RegExp(`^sfx-0*${x.nomor}-.*\\.(${EKST_AUDIO.join('|')})$`, 'i').test(y));
      return g ? `sfx/${g}` : null;
    })();
    if (f) aset.sfx[x.nomor] = f;
    else {
      const nama = `sfx/${x.berkas}.mp3${x.opsional ? ' (opsional)' : ''}`;
      if (!kurang.sfx.includes(nama)) kurang.sfx.push(nama);
    }
  }
  for (const m of [{ kunci: 'tanda', berkas: 'mata-nyala' }, { kunci: 'wordmark', berkas: 'wordmark-krem' }]) {
    const f = cari1(akar, 'merek', m.berkas, ['svg', 'png']);
    if (f) aset.merek[m.kunci] = f;
    else kurang.merek.push(`merek/${m.berkas}.svg`);
  }
  for (const [nomor, p] of Object.entries(d.peta)) {
    const n = dua(nomor);
    const ada = (rel) => (fs.existsSync(path.join(akar, rel)) ? rel : null);
    const e = { dasar: ada(`peta/dasar/adegan-${n}.json`), kata: ada(`peta/adegan-${n}.kata.json`), waktu: ada(`peta/adegan-${n}.waktu.json`), panggung: cari1(akar, 'peta', `panggung-${n}`, EKST_GAMBAR), ikon: {} };
    if (!e.dasar) kurang.peta.push(`peta/dasar/adegan-${n}.json (node paket/video/alat.mjs peta-dasar)`);
    for (const g of p.geojson) if (!fs.existsSync(path.join(akar, 'peta', g))) kurang.peta.push(`peta/${g}`);
    for (const sl of p.ikonKhusus.map((x) => x.slug)) {
      const f = cari1(akar, 'peta/ikon', `${sl}.selaras`, ['png']);
      if (f) e.ikon[sl] = f;
      else kurang.peta.push(`peta/ikon/${sl}.png`);
    }
    aset.peta[nomor] = e;
  }
  return { aset, kurang };
}

// ---------- jeda di rekaman narasi (ffmpeg silencedetect), disimpan menurut ukuran dan waktu ubah berkas ----------
const JEDA_DB = -35;
const JEDA_MIN = 0.18;
export function hitungJeda(akar, narasi, cacheDir, simpananLama = {}) {
  const fileJeda = path.join(cacheDir, 'jeda.json');
  const lama = { ...simpananLama, ...(fs.existsSync(fileJeda) ? JSON.parse(fs.readFileSync(fileJeda, 'utf8')) : {}) };
  const jeda = {};
  let gagal = false;
  for (const [nomor, rel] of Object.entries(narasi)) {
    const st = fs.statSync(path.join(akar, rel));
    const kunci = `${rel}|${st.size}|${Math.round(st.mtimeMs)}`;
    if (lama[nomor]?.kunci === kunci) {
      jeda[nomor] = lama[nomor];
      continue;
    }
    if (gagal) continue;
    const r = ffmpeg(['-hide_banner', '-nostats', '-i', path.join(akar, rel), '-vn', '-af', `silencedetect=noise=${JEDA_DB}dB:d=${JEDA_MIN}`, '-f', 'null', '-']);
    if (r.kode !== 0) {
      gagal = true;
      continue;
    }
    const teks = r.stdout + r.stderr;
    const mulai = [...teks.matchAll(/silence_start: ([\d.]+)/g)].map((m) => +m[1]);
    const akhir = [...teks.matchAll(/silence_end: ([\d.]+)/g)].map((m) => +m[1]);
    jeda[nomor] = { kunci, jeda: mulai.map((s, i) => [+s.toFixed(3), +(akhir[i] ?? s).toFixed(3)]).filter(([s, e]) => e > s) };
  }
  fs.mkdirSync(cacheDir, { recursive: true });
  fs.writeFileSync(fileJeda, JSON.stringify(jeda, null, 2) + '\n');
  return { jeda, tanpaFfmpeg: gagal };
}

/** Font dan logo untuk proyek baru di $ASET_DIR (proyek lama sudah punya di public/). Hanya menyalin yang belum ada. */
function salinMerek(lokasi) {
  if (lokasi.lama && !lokasi.aset.startsWith(asetDir())) return;
  const salin = (dari, ke) => {
    if (fs.existsSync(dari) && !fs.existsSync(ke)) {
      fs.mkdirSync(path.dirname(ke), { recursive: true });
      fs.copyFileSync(dari, ke);
    }
  };
  const font = path.join(AKAR, 'merek', 'font');
  for (const f of daftar(font).filter((f) => f.endsWith('.woff2'))) salin(path.join(font, f), path.join(lokasi.aset, 'font', f));
  for (const f of ['mata-nyala.svg', 'wordmark-krem.svg']) salin(path.join(AKAR, 'merek', 'logo', f), path.join(lokasi.aset, 'merek', f));
}

const WARNA_BAWAAN = {
  garis: '#0b0908', laut: '#0e1418', darat: '#261d16', tepiTerang: '#5a4632',
  bahanGelap: '#3b2a1e', bahan: '#8c6a44', bahanTerang: '#c9a06a',
  sungai: '#4f7f9b', sungaiBawah: '#141c21', labelSungai: '#a9c3d3',
  pohonGelap: '#1f3320', pohon: '#3d5c33', pohonTerang: '#6f8f4f',
  medan: '#4a3a2a', medanTerang: '#7d6448', batas: '#6e6a66',
  palet: [], ronaDominan: null, ronaAir: 205, bawaan: true,
};

/**
 * Siapkan props `data` untuk satu proyek.
 * @param {string} slug
 * @param {{ basis?: string|null, basisFont?: string|null }} opsi  basis = awalan URL aset (katalog); kosong = staticFile.
 */
export function siapkan(slug, { basis = null, basisFont = null } = {}) {
  const folder = path.join(AKAR, 'proyek', slug);
  const konsepMd = fs.readFileSync(path.join(folder, 'KONSEP.md'), 'utf8').replace(/\r\n/g, '\n');
  const k = uraiKonsep(konsepMd);
  const peringatan = [];
  const d = dataKonsep(k, konsepMd, peringatan);
  const lokasi = folderProyek(slug);
  salinMerek(lokasi);
  const { aset, kurang } = pindaiAset(lokasi.aset, d);

  // Simpanan lama dari proyek Remotion sebelum repo (src/generated, src/data) dipakai bila ada.
  const bacaLama = (rel) => (lokasi.lama && fs.existsSync(path.join(lokasi.lama, rel)) ? JSON.parse(fs.readFileSync(path.join(lokasi.lama, rel), 'utf8')) : null);
  const { jeda, tanpaFfmpeg } = hitungJeda(lokasi.aset, aset.narasi, lokasi.cache, bacaLama('src/generated/jeda.json') || {});
  if (tanpaFfmpeg) peringatan.push('ffmpeg gagal dijalankan: jeda narasi tidak dihitung, pewaktuan subtitle memakai perkiraan');

  const baca = (rel) => (rel && fs.existsSync(path.join(lokasi.aset, rel)) ? JSON.parse(fs.readFileSync(path.join(lokasi.aset, rel), 'utf8')) : null);
  const petaTerbangun = Object.fromEntries(Object.entries(aset.peta).map(([n, e]) => [n, { dasar: baca(e.dasar), kata: baca(e.kata), waktu: baca(e.waktu) }]));

  let warnaPeta = {};
  for (const f of [path.join(lokasi.cache, 'peta-warna.json'), path.join(lokasi.aset, 'peta', 'warna.json')]) if (fs.existsSync(f)) warnaPeta = JSON.parse(fs.readFileSync(f, 'utf8'));
  if (!Object.keys(warnaPeta).length) warnaPeta = bacaLama('src/data/peta-warna.json') || {};
  for (const n of Object.keys(d.peta)) if (!warnaPeta[n]) warnaPeta[n] = WARNA_BAWAAN;

  const fileSetelan = path.join(folder, 'setelan.json');
  const setelan = fs.existsSync(fileSetelan) ? JSON.parse(fs.readFileSync(fileSetelan, 'utf8')) : {};

  // Pilihan sampul dari katalog (proyek.yaml `sampul: {"adegan": n|"khusus", "judul": "..."}`) mengalahkan bawaan.
  // Bawaan: ilustrasi/sampul.* bila ada, selain itu SAMPUL_ADEGAN di setelan.json (atau adegan 1); judul dari KONSEP.md.
  const bawaan = { adegan: aset.sampul.gambar ? 'khusus' : setelan.SAMPUL_ADEGAN ?? 1, judul: d.proyek.judulSampul };
  const pilih = bacaYaml(path.join(folder, 'proyek.yaml')).sampul || {};
  const adeganSampul = pilih.adegan === 'khusus' && !aset.sampul.gambar ? bawaan.adegan : pilih.adegan ?? bawaan.adegan;
  const judulSampul = typeof pilih.judul === 'string' && pilih.judul.trim() ? pilih.judul.trim() : bawaan.judul;
  if (adeganSampul !== 'khusus') {
    setelan.SAMPUL_ADEGAN = adeganSampul;
    aset.sampul = {};
  }
  d.proyek.judulSampul = judulSampul;
  // Posisi gambar per platform (`sampul.tiktok`, `sampul.youtube`: {x, y, skala}); tidak ada = bawaan. Dijepit sama dengan src/lib/sampul.ts.
  const posisi = Object.fromEntries(['tiktok', 'youtube'].map((pl) => [pl, jepitPosisi(pilih[pl])]));
  const sampul = { adegan: adeganSampul, judul: judulSampul, bawaan, adaKhusus: bawaan.adegan === 'khusus', posisi };

  const data = { ...d, warnaPeta, setelan, aset, jeda, petaTerbangun, basis, basisFont, sampul };
  return { data, kurang, peringatan, lokasi, konsep: k };
}
