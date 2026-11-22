#!/usr/bin/env node
// Warna peta animasi diambil dari ilustrasi video ini (npm run peta-warna), menulis src/data/peta-warna.json.
// Per adegan peta: ilustrasi adegan sebelum dan sesudah (ditambah ilustrasi lain di babak yang sama, atau
// public/peta/panggung-XX.* bila ada) diperkecil ke ± 80 px, dikelompokkan k-means menjadi enam warna,
// diurutkan dari tergelap, lalu dipetakan ke peran warna peta dengan tiga makna tetap:
// amber = rute (selalu pelita), hijau = tumbuhan (rona 78–135°), biru = air (rona 205° digeser ke palet, 180–235°).
// Tanpa ilustrasi: warna bawaan Pelita & Bayang.
import fs from 'node:fs';
import { p, dua, bacaKonsep, cariBerkas, EKST_GAMBAR, ffmpeg, bacaPng } from './lib.mjs';

const k = bacaKonsep();
const PETA = {
  // Sungai disetel lebih menyatu dengan daratan atas permintaan Rafi (2026-11-21): lebih redup, dicampur warna darat,
  // rona tidak boleh bergeser jauh ke toska (geserMin −8). Semula: geserMin −22, terangSungai [0,40; 0,52], tanpa campurDarat.
  air: { rona: 205, geserMin: -8, geserMaks: 28, ronaMin: 180, ronaMaks: 235, terangSungai: [0.3, 0.36], campurDarat: 0.22, lautMaks: 0.085 },
  tumbuhan: { ronaMin: 78, ronaMaks: 135, jenuhMin: 0.24, jenuhMaks: 0.42 },
  darat: { terangMin: 0.08, terangMaks: 0.15 },
  batasJenuhMaks: 0.1,
  kayuBatu: [140, 106, 68],
};

// ---------- warna ----------
const jepit = (x, a, b) => Math.min(b, Math.max(a, x));
function keHsl([r, g, b]) {
  r /= 255; g /= 255; b /= 255;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
  const l = (mx + mn) / 2;
  if (mx === mn) return [0, 0, l];
  const d = mx - mn;
  const s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn);
  const h = mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return [h * 60, s, l];
}
function dariHsl([h, s, l]) {
  h = ((h % 360) + 360) % 360 / 360;
  if (s === 0) return [l, l, l].map((v) => Math.round(v * 255));
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const pp = 2 * l - q;
  const f = (t) => {
    t = (t + 1) % 1;
    return t < 1 / 6 ? pp + (q - pp) * 6 * t : t < 1 / 2 ? q : t < 2 / 3 ? pp + (q - pp) * (2 / 3 - t) * 6 : pp;
  };
  return [f(h + 1 / 3), f(h), f(h - 1 / 3)].map((v) => Math.round(v * 255));
}
const hex = (c) => '#' + c.map((v) => jepit(Math.round(v), 0, 255).toString(16).padStart(2, '0')).join('');
const campur = (a, b, t) => a.map((v, i) => v + (b[i] - v) * t);
const terang = (c) => (0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]) / 255;
const selisihRona = (a, b) => ((a - b + 540) % 360) - 180;

// ---------- piksel dari gambar (ffmpeg bawaan Remotion) ----------
function piksel(file) {
  const tmp = p('node_modules/.cache/peta', `piksel-${process.pid}.png`);
  fs.mkdirSync(p('node_modules/.cache/peta'), { recursive: true });
  const r = ffmpeg(['-y', '-v', 'error', '-i', file, '-vf', 'scale=80:-1', '-frames:v', '1', '-pix_fmt', 'rgb24', tmp]);
  if (r.kode !== 0 || !fs.existsSync(tmp)) throw new Error(`gagal membaca ${file}: ${r.stderr.slice(0, 200)}`);
  const { data, kanal } = bacaPng(tmp);
  fs.rmSync(tmp, { force: true });
  const out = [];
  for (let i = 0; i + 2 < data.length; i += kanal) out.push([data[i], data[i + 1], data[i + 2]]);
  return out;
}

/** k-means (seed tetap, inisialisasi menurut kuantil kecerahan agar hasil stabil). */
function kmeans(data, kk = 6, iter = 20) {
  const urut = [...data].sort((a, b) => terang(a) - terang(b));
  let pusat = Array.from({ length: kk }, (_, i) => urut[Math.floor(((i + 0.5) / kk) * urut.length)].slice());
  let label = new Array(data.length).fill(0);
  for (let t = 0; t < iter; t++) {
    for (let i = 0; i < data.length; i++) {
      let best = 0, bd = Infinity;
      for (let j = 0; j < kk; j++) {
        const d = (data[i][0] - pusat[j][0]) ** 2 + (data[i][1] - pusat[j][1]) ** 2 + (data[i][2] - pusat[j][2]) ** 2;
        if (d < bd) { bd = d; best = j; }
      }
      label[i] = best;
    }
    pusat = pusat.map((c, j) => {
      const anggota = data.filter((_, i) => label[i] === j);
      if (!anggota.length) return c;
      return [0, 1, 2].map((x) => anggota.reduce((s, q) => s + q[x], 0) / anggota.length);
    });
  }
  const jumlah = pusat.map((_, j) => label.filter((l) => l === j).length);
  return pusat.map((c, j) => ({ c, n: jumlah[j] })).sort((a, b) => terang(a.c) - terang(b.c));
}

function warnaDariPalet(palet) {
  const c = palet.map((x) => x.c);
  // rona dominan: rata-rata melingkar dibobot kejenuhan × jumlah piksel
  let sx = 0, sy = 0;
  for (const { c: w, n } of palet) {
    const [h, s] = keHsl(w);
    sx += Math.cos((h * Math.PI) / 180) * s * n;
    sy += Math.sin((h * Math.PI) / 180) * s * n;
  }
  const dominan = ((Math.atan2(sy, sx) * 180) / Math.PI + 360) % 360;
  const jenuhRata = palet.reduce((s, x) => s + keHsl(x.c)[1] * x.n, 0) / palet.reduce((s, x) => s + x.n, 0);
  const A = PETA.air;
  const ronaAir = jepit(A.rona + jepit(selisihRona(dominan, A.rona), A.geserMin, A.geserMaks), A.ronaMin, A.ronaMaks);
  const jenuhAir = jepit(jenuhRata * 0.9 + 0.12, 0.22, 0.5);
  const tengah = c[3];
  const [hG, sG] = keHsl(c[0]);
  const [hD, sD, lD] = keHsl(c[1]);
  const garis = dariHsl([hG, jepit(sG, 0, 0.35), jepit(keHsl(c[0])[2], 0.025, 0.05)]);
  const laut = dariHsl([ronaAir, jepit(jenuhAir * 0.8, 0.15, 0.4), jepit(keHsl(c[0])[2] * 0.9 + 0.03, 0.05, A.lautMaks)]);
  const darat = dariHsl([hD, jepit(sD, 0.08, 0.32), jepit(lD, PETA.darat.terangMin, PETA.darat.terangMaks)]);
  const [hT, sT, lT] = keHsl(c[2]);
  const tepiTerang = dariHsl([hT, jepit(sT, 0.1, 0.4), jepit(lT, 0.22, 0.34)]);
  // bahan ikon buatan manusia: palet dicampur nada kayu atau batu agar tidak ikut hijau atau biru
  const bahan = campur(tengah, PETA.kayuBatu, 0.5);
  const [hB, sB] = keHsl(bahan);
  const bahanGelap = dariHsl([hB, sB, jepit(keHsl(bahan)[2] * 0.55, 0.12, 0.25)]);
  const bahanTerang = dariHsl([hB, sB, jepit(keHsl(bahan)[2] * 1.35, 0.45, 0.66)]);
  // air
  const sungaiInti = dariHsl([ronaAir, jenuhAir, jepit(0.33 + (terang(tengah) - 0.35) * 0.3, A.terangSungai[0], A.terangSungai[1])]);
  // dicampur warna daratan (bukan warna tengah palet yang bisa kehijauan) agar menyatu dengan peta, tetap biru
  const sungai = campur(sungaiInti, darat, A.campurDarat ?? 0.12);
  const sungaiBawah = dariHsl([ronaAir, jepit(jenuhAir * 0.6, 0.1, 0.3), 0.08]);
  const labelSungai = dariHsl([ronaAir, jepit(jenuhAir * 0.6, 0.15, 0.35), 0.7]);
  // tumbuhan: rona dikunci, kejenuhan dibatasi, terang-gelap dari palet
  const T = PETA.tumbuhan;
  const ronaHijau = jepit(hD >= T.ronaMin && hD <= T.ronaMaks ? hD : 108, T.ronaMin, T.ronaMaks);
  const jenuhHijau = jepit(jenuhRata + 0.08, T.jenuhMin, T.jenuhMaks);
  const pohonGelap = dariHsl([ronaHijau, jenuhHijau, jepit(keHsl(c[1])[2] + 0.06, 0.13, 0.2)]);
  const pohon = dariHsl([ronaHijau, jenuhHijau, jepit(keHsl(c[2])[2] + 0.08, 0.24, 0.34)]);
  const pohonTerang = dariHsl([ronaHijau - 8, jenuhHijau, jepit(keHsl(c[3])[2] + 0.06, 0.38, 0.5)]);
  // medan alam (bukit, gunung)
  const medan = campur(darat, tengah, 0.35);
  const medanTerang = campur(tengah, c[4], 0.3);
  // batas: netral dari warna tengah, rona dijauhkan dari amber, lebih redup dari sungai
  let [hBt, , lBt] = keHsl(tengah);
  if (hBt >= 20 && hBt <= 60) hBt = hBt < 40 ? 15 : 65;
  const batas = dariHsl([hBt, PETA.batasJenuhMaks, Math.min(lBt, terang(sungai) - 0.06, 0.42)]);
  return {
    garis: hex(garis), laut: hex(laut), darat: hex(darat), tepiTerang: hex(tepiTerang),
    bahanGelap: hex(bahanGelap), bahan: hex(bahan), bahanTerang: hex(bahanTerang),
    sungai: hex(sungai), sungaiBawah: hex(sungaiBawah), labelSungai: hex(labelSungai),
    pohonGelap: hex(pohonGelap), pohon: hex(pohon), pohonTerang: hex(pohonTerang),
    medan: hex(medan), medanTerang: hex(medanTerang), batas: hex(batas),
    palet: c.map(hex), ronaDominan: +dominan.toFixed(1), ronaAir: +ronaAir.toFixed(1),
  };
}

const BAWAAN = {
  garis: '#0b0908', laut: '#0e1418', darat: '#261d16', tepiTerang: '#5a4632',
  bahanGelap: '#3b2a1e', bahan: '#8c6a44', bahanTerang: '#c9a06a',
  sungai: '#4f7f9b', sungaiBawah: '#141c21', labelSungai: '#a9c3d3',
  pohonGelap: '#1f3320', pohon: '#3d5c33', pohonTerang: '#6f8f4f',
  medan: '#4a3a2a', medanTerang: '#7d6448', batas: '#6e6a66',
  palet: [], ronaDominan: null, ronaAir: 205,
};

const cari = (nama) => {
  const f = cariBerkas(p('public/ilustrasi'), new RegExp(`^${nama}\\.(${EKST_GAMBAR.join('|')})$`, 'i'))[0];
  return f ? p('public/ilustrasi', f) : null;
};
const hasil = {};
for (const n of Object.keys(k.peta || {}).map(Number)) {
  const panggung = cariBerkas(p('public/peta'), new RegExp(`^panggung-${dua(n)}\\.(${EKST_GAMBAR.join('|')})$`, 'i'))[0];
  const a = k.adegan.find((x) => x.nomor === n);
  const sumber = panggung
    ? [p('public/peta', panggung)]
    : [n - 1, n + 1, ...k.adegan.filter((x) => x.babak === a.babak && x.nomor !== n).map((x) => x.nomor)]
        .filter((v, i, arr) => arr.indexOf(v) === i)
        .map((m) => cari(`adegan-${dua(m)}`))
        .filter(Boolean);
  if (!sumber.length) {
    hasil[n] = { ...BAWAAN, sumber: [], bawaan: true };
    console.log(`adegan ${n}: belum ada ilustrasi sumber; memakai warna bawaan Pelita & Bayang. Jalankan lagi setelah ilustrasi masuk.`);
    continue;
  }
  const data = sumber.flatMap((f) => piksel(f));
  const palet = kmeans(data);
  hasil[n] = { ...warnaDariPalet(palet), sumber: sumber.map((f) => f.slice(p('public').length + 1).replace(/\\/g, '/')), bawaan: false };
  console.log(`adegan ${n}: warna dari ${hasil[n].sumber.join(', ')} · palet ${hasil[n].palet.join(' ')} · air ${hasil[n].ronaAir}°`);
}
fs.writeFileSync(p('src/data/peta-warna.json'), JSON.stringify(hasil, null, 2) + '\n');
console.log('Ditulis src/data/peta-warna.json');
