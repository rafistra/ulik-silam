#!/usr/bin/env node
// Menyiapkan data geografi lokal untuk adegan peta animasi (npm run peta-dasar).
// - Daratan dan batas negara dari world-atlas (Natural Earth 10m), sungai besar dari Natural Earth
//   ne_10m_rivers_lake_centerlines (diunduh sekali, disimpan di node_modules/.cache/peta).
// - Berkas GeoJSON di konsep (mis. sungai-kelai.geojson) yang belum ada di public/peta/ diambil dari
//   OpenStreetMap (Nominatim + OSM API) bila internet tersedia. Batas sejarah tidak diambil dari OSM.
// Hasil per adegan: public/peta/dasar/adegan-XX.json (dipotong ke bingkai, disederhanakan), sehingga render
// tidak butuh internet.
import fs from 'node:fs';
import path from 'node:path';
import { feature, mesh } from 'topojson-client';
import { p, dua, bacaKonsep } from './lib.mjs';

const k = bacaKonsep();
const peta = k.peta || {};
const UA = 'ulik-silam-peta/1.0 (remotion)';
const CACHE = p('node_modules/.cache/peta');
fs.mkdirSync(CACHE, { recursive: true });
fs.mkdirSync(p('public/peta/dasar'), { recursive: true });

async function unduh(url, ke) {
  if (fs.existsSync(ke)) return fs.readFileSync(ke, 'utf8');
  const r = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!r.ok) throw new Error(`${r.status} ${url}`);
  const t = await r.text();
  fs.writeFileSync(ke, t);
  return t;
}

// ---------- geometri ----------
const perluas = (b, f) => {
  const dx = (b.timur - b.barat) * f;
  const dy = (b.utara - b.selatan) * f;
  return { barat: b.barat - dx, timur: b.timur + dx, selatan: b.selatan - dy, utara: b.utara + dy };
};
const di = (b, [x, y]) => x >= b.barat && x <= b.timur && y >= b.selatan && y <= b.utara;

/** Sutherland–Hodgman: potong cincin poligon ke kotak. */
function potongCincin(cincin, b) {
  const sisi = [
    [(q) => q[0] >= b.barat, (a, c) => [b.barat, a[1] + ((c[1] - a[1]) * (b.barat - a[0])) / (c[0] - a[0])]],
    [(q) => q[0] <= b.timur, (a, c) => [b.timur, a[1] + ((c[1] - a[1]) * (b.timur - a[0])) / (c[0] - a[0])]],
    [(q) => q[1] >= b.selatan, (a, c) => [a[0] + ((c[0] - a[0]) * (b.selatan - a[1])) / (c[1] - a[1]), b.selatan]],
    [(q) => q[1] <= b.utara, (a, c) => [a[0] + ((c[0] - a[0]) * (b.utara - a[1])) / (c[1] - a[1]), b.utara]],
  ];
  let out = cincin;
  for (const [dalam, potong] of sisi) {
    const inp = out;
    out = [];
    for (let i = 0; i < inp.length; i++) {
      const c = inp[i];
      const a = inp[(i + inp.length - 1) % inp.length];
      if (dalam(c)) {
        if (!dalam(a)) out.push(potong(a, c));
        out.push(c);
      } else if (dalam(a)) out.push(potong(a, c));
    }
    if (!out.length) break;
  }
  return out;
}

/** Potong garis ke kotak: bagian di dalam kotak, ditambah satu titik di luar tiap ujung. */
function potongGaris(garis, b) {
  const hasil = [];
  let kini = [];
  for (let i = 0; i < garis.length; i++) {
    const q = garis[i];
    if (di(b, q)) {
      if (!kini.length && i > 0) kini.push(garis[i - 1]);
      kini.push(q);
    } else if (kini.length) {
      kini.push(q);
      hasil.push(kini);
      kini = [];
    }
  }
  if (kini.length > 1) hasil.push(kini);
  return hasil;
}

/** Douglas–Peucker (derajat). */
function sederhana(titik, tol) {
  if (titik.length < 3) return titik;
  const simpan = new Uint8Array(titik.length);
  simpan[0] = simpan[titik.length - 1] = 1;
  const tumpuk = [[0, titik.length - 1]];
  while (tumpuk.length) {
    const [a, c] = tumpuk.pop();
    const [x1, y1] = titik[a];
    const [x2, y2] = titik[c];
    const dx = x2 - x1;
    const dy = y2 - y1;
    const pj = Math.hypot(dx, dy) || 1e-12;
    let maks = 0;
    let im = -1;
    for (let i = a + 1; i < c; i++) {
      const d = Math.abs(dy * titik[i][0] - dx * titik[i][1] + x2 * y1 - y2 * x1) / pj;
      if (d > maks) {
        maks = d;
        im = i;
      }
    }
    if (maks > tol && im > 0) {
      simpan[im] = 1;
      tumpuk.push([a, im], [im, c]);
    }
  }
  return titik.filter((_, i) => simpan[i]);
}
const bulat = (g) => g.map(([x, y]) => [+x.toFixed(4), +y.toFixed(4)]);
const garisDari = (geom) =>
  !geom ? [] : geom.type === 'LineString' ? [geom.coordinates] : geom.type === 'MultiLineString' ? geom.coordinates : [];
const cincinDari = (geom) =>
  geom.type === 'Polygon' ? geom.coordinates : geom.type === 'MultiPolygon' ? geom.coordinates.flat() : [];
const kebabNama = (s) => s.toLowerCase().replace(/^sungai\s+/, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// ---------- OSM untuk GeoJSON yang belum ada ----------
async function ambilOsm(berkas, b) {
  const nama = berkas.replace(/\.geojson$/, '').replace(/^sungai-/, '');
  const ejaan = [...new Set([nama, nama.replace(/i$/, 'y'), nama.replace(/y$/, 'i')])];
  const vb = `${b.barat},${b.utara},${b.timur},${b.selatan}`;
  const id = new Set();
  for (const e of ejaan)
    for (const q of [e, `Sungai ${e}`]) {
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=jsonv2&viewbox=${vb}&bounded=1&limit=20`;
      const r = await fetch(url, { headers: { 'User-Agent': UA } });
      if (!r.ok) continue;
      for (const h of await r.json()) if (h.category === 'waterway' && h.osm_type === 'way') id.add(h.osm_id);
      await new Promise((s) => setTimeout(s, 1100)); // batas sopan Nominatim: 1 permintaan per detik
    }
  const fitur = [];
  for (const w of id) {
    const r = await fetch(`https://api.openstreetmap.org/api/0.6/way/${w}/full.json`, { headers: { 'User-Agent': UA } });
    if (!r.ok) continue;
    const j = await r.json();
    const simpul = new Map(j.elements.filter((e) => e.type === 'node').map((e) => [e.id, [e.lon, e.lat]]));
    const jalan = j.elements.find((e) => e.type === 'way');
    fitur.push({
      type: 'Feature',
      properties: { name: jalan.tags.name, waterway: jalan.tags.waterway, osm: `way/${w}` },
      geometry: { type: 'LineString', coordinates: bulat(sederhana(jalan.nodes.map((n) => simpul.get(n)), 0.002)) },
    });
  }
  if (!fitur.length) return null;
  return {
    type: 'FeatureCollection',
    atribusi: '© OpenStreetMap contributors (ODbL)',
    diambil: new Date().toISOString().slice(0, 10),
    features: fitur,
  };
}

// ---------- utama ----------
const land = JSON.parse(fs.readFileSync(p('node_modules/world-atlas/land-10m.json'), 'utf8'));
const negara = JSON.parse(fs.readFileSync(p('node_modules/world-atlas/countries-10m.json'), 'utf8'));
const NE_SUNGAI = 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/v5.1.2/geojson/ne_10m_rivers_lake_centerlines.geojson';
const sungaiNe = JSON.parse(await unduh(NE_SUNGAI, path.join(CACHE, 'ne_10m_rivers_lake_centerlines.geojson')));
const daratGeom = feature(land, land.objects.land).features.map((f) => f.geometry);

const laporan = [];
for (const [nomor, d] of Object.entries(peta)) {
  const n = +nomor;
  const b = perluas(d.bingkai, 0.25);
  const tol = Math.max(d.bingkai.timur - d.bingkai.barat, d.bingkai.utara - d.bingkai.selatan) / 1600;
  // daratan
  const darat = [];
  for (const g of daratGeom)
    for (const c of cincinDari(g)) {
      if (!c.some((q) => di(perluas(b, 0.5), q))) continue;
      const pot = potongCincin(c, b);
      if (pot.length >= 3) darat.push(bulat(sederhana(pot, tol)));
    }
  // batas: hanya yang tertulis di konsep. Batas Kalimantan–Sarawak/Sabah = garis antara Indonesia dan Malaysia.
  const batas = [];
  for (const bt of d.batas) {
    if (/kalimantan|sarawak|sabah|borneo/i.test(bt.nama)) {
      const m = mesh(negara, negara.objects.countries, (a, c) => {
        const id = new Set([a.id, c.id]);
        return id.has('360') && id.has('458');
      });
      const garis = garisDari(m).flatMap((g) => potongGaris(g, b)).map((g) => bulat(sederhana(g, tol)));
      batas.push({ nama: bt.nama, gaya: bt.gaya, status: bt.status, pemicu: bt.pemicu, pusat: bt.pusat, garis });
      laporan.push(`adegan ${n}: batas "${bt.nama}" dari world-atlas (garis Indonesia–Malaysia), ${garis.length} ruas`);
    } else {
      const f = `batas-${kebabNama(bt.nama)}.geojson`;
      if (fs.existsSync(p('public/peta', f))) {
        const gj = JSON.parse(fs.readFileSync(p('public/peta', f), 'utf8'));
        const geom = (gj.features || [gj]).map((x) => x.geometry);
        batas.push({
          nama: bt.nama,
          gaya: bt.gaya,
          status: bt.status,
          pemicu: bt.pemicu,
          pusat: bt.pusat,
          garis: geom.flatMap((g) => [...garisDari(g), ...cincinDari(g)]).map((g) => bulat(sederhana(g, tol))),
        });
      } else laporan.push(`adegan ${n}: batas "${bt.nama}" PERLU disiapkan Rafi sebagai public/peta/${f} (tidak diambil dari OSM)`);
    }
  }
  // sungai dari Natural Earth, menurut nama di konsep
  const sungai = [];
  const dicari = d.sungaiDanGaris.filter((s) => /^sungai\s/i.test(s)).map((s) => s.replace(/^sungai\s+/i, ''));
  for (const nm of dicari) {
    const cocok = sungaiNe.features.filter((f) => (f.properties.name || '').toLowerCase() === nm.toLowerCase());
    const garis = cocok.flatMap((f) => garisDari(f.geometry)).flatMap((g) => potongGaris(g, b)).map((g) => bulat(sederhana(g, tol)));
    if (garis.length) {
      sungai.push({ nama: `Sungai ${nm}`, sumber: 'Natural Earth', garis });
      laporan.push(`adegan ${n}: Sungai ${nm} dari Natural Earth, ${garis.length} ruas`);
    }
  }
  // GeoJSON (OSM) untuk fitur yang tidak ada di data dasar
  let pakaiOsm = false;
  for (const f of d.geojson) {
    const file = p('public/peta', f);
    if (!fs.existsSync(file)) {
      try {
        const gj = await ambilOsm(f, d.bingkai);
        if (gj) {
          fs.writeFileSync(file, JSON.stringify(gj) + '\n');
          laporan.push(`adegan ${n}: ${f} diambil dari OpenStreetMap (${gj.features.length} ruas)`);
        } else laporan.push(`adegan ${n}: ${f} tidak ditemukan di OpenStreetMap; PERLU disiapkan Rafi`);
      } catch (e) {
        laporan.push(`adegan ${n}: ${f} gagal diambil (${e.message}); PERLU disiapkan Rafi`);
      }
    }
    if (!fs.existsSync(file)) continue;
    const gj = JSON.parse(fs.readFileSync(file, 'utf8'));
    if (/openstreetmap/i.test(gj.atribusi || '')) pakaiOsm = true;
    const nm = (gj.features[0]?.properties?.name || f.replace(/\.geojson$/, '')).replace(/kelay/i, 'Kelai');
    const garis = gj.features.flatMap((x) => garisDari(x.geometry)).flatMap((g) => potongGaris(g, b)).map((g) => bulat(sederhana(g, tol)));
    const ada = sungai.find((s) => kebabNama(s.nama) === kebabNama(nm));
    if (ada) ada.garis.push(...garis);
    else sungai.push({ nama: nm.replace(/^sungai/i, 'Sungai'), sumber: gj.atribusi || f, garis });
  }
  for (const nm of dicari)
    if (!sungai.some((s) => kebabNama(s.nama) === kebabNama(nm)))
      laporan.push(`adegan ${n}: Sungai ${nm} tidak ada di Natural Earth maupun GeoJSON; tampil sebagai label saja`);
  const hasil = { bingkai: d.bingkai, darat, batas, sungai, atribusiOsm: pakaiOsm };
  fs.writeFileSync(p('public/peta/dasar', `adegan-${dua(n)}.json`), JSON.stringify(hasil) + '\n');
  const titik = darat.reduce((s, c) => s + c.length, 0);
  laporan.push(`adegan ${n}: ditulis public/peta/dasar/adegan-${dua(n)}.json (daratan ${darat.length} cincin/${titik} titik)`);
}
laporan.forEach((l) => console.log(l));
if (!Object.keys(peta).length) console.log('Tidak ada adegan peta animasi di konsep.');
