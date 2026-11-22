// Adegan peta animasi (skill pov-produksi 2.5a): peta vektor dari data geografi nyata, warna dari ilustrasi
// video ini, rute amber yang merambat mengikuti narasi, ikon yang muncul saat rute tiba, kamera menyesuaikan rute.
import React, { useEffect, useMemo } from 'react';
import { AbsoluteFill, Easing, Img, interpolate, useCurrentFrame } from 'remotion';
import { PETA_TERBANGUN, urlAset } from '../lib/data';
import { DATA_PETA, WARNA_PETA, type DataPeta } from '../data/peta';
import { SETELAN_PETA } from '../data/setelan';
import { HURUF, KANVAS, PETA, WARNA, ZONA } from '../lib/merek';
import { IkonPeta, type WarnaPeta } from './ikon';
import { waktuTitik, type KataRekaman } from './waktu';

type Titik2 = [number, number];
type Dasar = {
  bingkai: DataPeta['bingkai'];
  darat: Titik2[][];
  batas: { nama: string; gaya: string; status: string; pemicu: string | null; pusat: Titik2 | null; garis: Titik2[][] }[];
  sungai: { nama: string; sumber: string; garis: Titik2[][] }[];
  atribusiOsm: boolean;
};
export type AsetPeta = { dasar: string | null; kata: string | null; waktu: string | null; panggung: string | null; ikon: Record<string, string> };

const W = KANVAS.lebar;
const H = KANVAS.tinggi;
const jepit = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

/**
 * Data peta dibundel oleh scripts/cek-aset.mjs ke src/generated/peta.json (dasar, waktu kata, waktu manual).
 * Sebelumnya dimuat dengan fetch + delayRender, yang gagal di Studio (React StrictMode); impor langsung selalu siap.
 */

// ---------- proyeksi Mercator, bingkai menutupi kanvas ----------
function buatProyeksi(b: DataPeta['bingkai']) {
  const my = (lat: number) => Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360));
  const x0 = (b.barat * Math.PI) / 180;
  const x1 = (b.timur * Math.PI) / 180;
  const y0 = my(b.utara);
  const y1 = my(b.selatan);
  const s = Math.max(W / (x1 - x0), H / (y0 - y1));
  const cx = (x0 + x1) / 2;
  const cy = (y0 + y1) / 2;
  return ([lon, lat]: Titik2): Titik2 => [W / 2 + ((lon * Math.PI) / 180 - cx) * s, H / 2 - (my(lat) - cy) * s];
}

const keD = (pts: Titik2[], tutup = false) =>
  pts.length ? 'M' + pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join('L') + (tutup ? 'Z' : '') : '';

/** Catmull-Rom → polyline halus. */
function halus(pts: Titik2[], langkah = 14): Titik2[] {
  if (pts.length < 3) return pts;
  const out: Titik2[] = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    for (let t = 0; t < langkah; t++) {
      const u = t / langkah;
      const u2 = u * u;
      const u3 = u2 * u;
      const f = (a: number, b: number, c: number, d: number) =>
        0.5 * (2 * b + (-a + c) * u + (2 * a - 5 * b + 4 * c - d) * u2 + (-a + 3 * b - 3 * c + d) * u3);
      out.push([f(p0[0], p1[0], p2[0], p3[0]), f(p0[1], p1[1], p2[1], p3[1])]);
    }
  }
  out.push(pts[pts.length - 1]);
  return out;
}

function panjangKumulatif(pts: Titik2[]): number[] {
  const L = [0];
  for (let i = 1; i < pts.length; i++) L.push(L[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  return L;
}
function titikDiPanjang(pts: Titik2[], L: number[], l: number): Titik2 {
  if (l <= 0) return pts[0];
  if (l >= L[L.length - 1]) return pts[pts.length - 1];
  let i = 1;
  while (L[i] < l) i++;
  const t = (l - L[i - 1]) / (L[i] - L[i - 1] || 1);
  return [pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * t, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * t];
}

function diDalam([x, y]: Titik2, cincin: Titik2[]): boolean {
  let dalam = false;
  for (let i = 0, j = cincin.length - 1; i < cincin.length; j = i++) {
    const [xi, yi] = cincin[i];
    const [xj, yj] = cincin[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) dalam = !dalam;
  }
  return dalam;
}

/** Pembangkit acak dengan seed tetap. */
function acak(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/** Kotak teks yang dilarang untuk label peta: teks layar, subtitle, kolom kanan, zona atas. */
const ZONA_TERLARANG = [
  { x0: 0, y0: 0, x1: W, y1: ZONA.atas + 20 },
  { x0: 0, y0: 280, x1: W - ZONA.kanan, y1: 400 },
  { x0: 0, y0: H - ZONA.bawah - 170, x1: W, y1: H },
  { x0: W - ZONA.kanan, y0: 0, x1: W, y1: H },
  // catatan kecil dan atribusi di kiri bawah
  { x0: 0, y0: H - ZONA.bawah - 232, x1: 720, y1: H - ZONA.bawah - 186 },
];

type Rata = 'kiri' | 'kanan' | 'tengah';
type TataLabel = {
  teks: string;
  /** Titik peta (koordinat kanvas pada kamera netral). */
  jangkar: Titik2;
  dx: number;
  dy: number;
  rata: Rata;
  sudut?: number;
  gaya: React.CSSProperties;
  warna: string;
  /** Frame label mulai muncul; null = sejak awal. */
  tiba: number | null;
};
type Kotak = { x0: number; y0: number; x1: number; y1: number };
const tabrak = (a: Kotak, b: Kotak) => a.x0 < b.x1 && a.x1 > b.x0 && a.y0 < b.y1 && a.y1 > b.y0;
const lebarKira = (teks: string, gaya: React.CSSProperties) =>
  teks.length * Number(gaya.fontSize) * (gaya.fontFamily === HURUF.sans ? 0.74 : 0.47);
function kotakLabel(xy: Titik2, teks: string, gaya: React.CSSProperties, rata: Rata, sudut?: number): Kotak {
  const lw = lebarKira(teks, gaya);
  const h = Number(gaya.fontSize);
  if (sudut) {
    const r = (Math.abs(sudut) * Math.PI) / 180;
    const bw = Math.abs(Math.cos(r)) * lw + h;
    const bh = Math.abs(Math.sin(r)) * lw + h;
    return { x0: xy[0] - bw / 2, y0: xy[1] - bh / 2, x1: xy[0] + bw / 2, y1: xy[1] + bh / 2 };
  }
  const x0 = rata === 'kiri' ? xy[0] : rata === 'kanan' ? xy[0] - lw : xy[0] - lw / 2;
  return { x0, y0: xy[1] - h * 0.85, x1: x0 + lw, y1: xy[1] + h * 0.25 };
}
/** Jarak aman label dari zona teks; label yang masuk jarak ini memudar (lihat render). */
const TEPI = 36;
const ZONA_LABEL = [...ZONA_TERLARANG, { x0: -W, y0: -H, x1: ZONA.kiri - TEPI, y1: 2 * H }];
const bebasZona = (k: Kotak) => !ZONA_LABEL.some((z) => tabrak(k, { x0: z.x0 - TEPI, y0: z.y0 - TEPI, x1: z.x1 + TEPI, y1: z.y1 + TEPI }));

/** Pilih posisi label: titik rute dulu (tujuan paling penting), lalu sungai, lalu wilayah dan laut. */
function susunLabel(
  g: { titik: (DataPeta['titik'][number] & { xy: Titik2 })[]; sungai: { nama: string; garis: Titik2[][] }[]; tiba: number[]; rute: Titik2[] },
  dasar: Dasar,
  data: DataPeta,
  warna: WarnaPeta,
  /** Koordinat peta → layar pada pandangan akhir kamera; label disusun di pandangan itu. */
  ke: (p: Titik2) => Titik2,
): TataLabel[] {
  const terpakai: Kotak[] = g.titik.map((t) => {
    const [x, y] = ke(t.xy);
    return { x0: x - 26, y0: y - 40, x1: x + 26, y1: y + 8 };
  });
  // rute juga dijaga (sampel tiap ± 40 px); disimpan terpisah agar fallback label titik boleh menyentuh rute
  const kotakRute: Kotak[] = [];
  for (let i = 0; i < g.rute.length; i += 3) {
    const [x, y] = ke(g.rute[i]);
    kotakRute.push({ x0: x - 10, y0: y - 10, x1: x + 10, y1: y + 10 });
  }
  const jumlahIkon = terpakai.length;
  terpakai.push(...kotakRute);
  const hasil: TataLabel[] = [];
  const coba = (l: Omit<TataLabel, 'dx' | 'dy' | 'rata'>, calon: [number, number, Rata][], wajib = false) => {
    for (const [dx, dy, rata] of calon) {
      const k = kotakLabel([ke(l.jangkar)[0] + dx, ke(l.jangkar)[1] + dy], l.teks, l.gaya, rata, l.sudut);
      // label selain titik rute (wilayah, laut, sungai) diberi jarak lega agar tidak menempel ke label lain
      const lega = l.tiba == null ? 28 : 0;
      const kl = { x0: k.x0 - lega, y0: k.y0 - lega, x1: k.x1 + lega, y1: k.y1 + lega };
      if (!bebasZona(k) || terpakai.some((t) => tabrak(kl, t))) continue;
      terpakai.push(k);
      hasil.push({ ...l, dx, dy, rata });
      return true;
    }
    // Label titik rute wajib tampil. Fallback 1: di dalam zona aman, boleh menyentuh garis rute, tidak menabrak
    // label atau ikon lain. Fallback 2: sama, tetapi boleh dekat zona teks (memudar sebagian bila masuk tepinya).
    if (wajib) {
      const bukanRute = (t: Kotak, idx: number) => idx < jumlahIkon || idx >= jumlahIkon + kotakRute.length;
      for (const longgar of [false, true])
        for (const [dx, dy, rata] of calon) {
          const k = kotakLabel([ke(l.jangkar)[0] + dx, ke(l.jangkar)[1] + dy], l.teks, l.gaya, rata, l.sudut);
          if (k.x0 < ZONA.kiri || k.x1 > W - ZONA.kanan) continue;
          if (!longgar && !bebasZona(k)) continue;
          if (terpakai.some((t, idx) => bukanRute(t, idx) && tabrak(k, t))) continue;
          terpakai.push(k);
          hasil.push({ ...l, dx, dy, rata });
          return true;
        }
    }
    return false;
  };
  const urutan = g.titik.map((t, i) => ({ t, i })).filter(({ t }) => t.nama !== '-');
  urutan.sort((a, b) => b.i - a.i); // tujuan dulu
  for (const { t, i } of urutan) {
    const tujuan = i === g.titik.length - 1;
    const gaya: React.CSSProperties = { fontFamily: HURUF.serif, fontWeight: tujuan ? 600 : 500, fontSize: tujuan ? 52 : 44 };
    // arah keluar dari rute: label diletakkan menjauhi titik tetangga
    const tetangga = g.titik[i === 0 ? 1 : i - 1].xy;
    const keKanan = t.xy[0] >= tetangga[0];
    const samping: [number, number, Rata][] = keKanan
      ? [[30, 16, 'kiri'], [-30, 16, 'kanan']]
      : [[-30, 16, 'kanan'], [30, 16, 'kiri']];
    coba({ teks: t.nama, jangkar: t.xy, gaya, warna: WARNA.tinta, tiba: g.tiba[i] }, [...samping, [0, 62, 'tengah'], [28, 64, 'tengah'], [-18, 62, 'kiri'], [18, 62, 'kanan'], [0, -54, 'tengah'], [-28, -50, 'tengah'], [-18, -54, 'kiri'], [0, 104, 'tengah']], true);
  }
  const namaTitik = new Set(g.titik.map((t) => t.nama.toLowerCase()));
  for (const su of g.sungai) {
    if (namaTitik.has(su.nama.toLowerCase())) continue;
    const semua = su.garis.flat();
    const calon = [0.5, 0.38, 0.62, 0.25, 0.75, 0.15, 0.85].map((u) => semua[Math.floor(u * (semua.length - 1))]);
    const gaya: React.CSSProperties = { fontFamily: HURUF.serif, fontStyle: 'italic', fontWeight: 500, fontSize: 36 };
    for (const q of calon) if (coba({ teks: su.nama, jangkar: q, gaya, warna: warna.labelSungai, tiba: null }, [[0, -16, 'tengah'], [0, 42, 'tengah']])) break;
  }
  // wilayah dan laut: posisi geografis tetap, dilewati bila bertabrakan
  const pr = buatProyeksi(dasar.bingkai);
  const wilayah: [string, Titik2][] = [];
  if (data.batas.some((b) => /sarawak/i.test(b.nama))) wilayah.push(['Sarawak', [114.85, 2.75]]);
  wilayah.push(['Kalimantan Timur', [116.3, 1.0]]);
  for (const [teks, ll] of wilayah)
    coba(
      { teks: teks.toUpperCase(), jangkar: pr(ll), gaya: { fontFamily: HURUF.sans, fontWeight: 800, fontSize: 28, letterSpacing: '0.16em' }, warna: WARNA.tintaRedup, tiba: null },
      [[0, 0, 'tengah'], [0, 60, 'tengah'], [0, -60, 'tengah'], [0, 130, 'tengah'], [-120, 90, 'tengah'], [0, 200, 'tengah']],
    );
  if (data.sungaiDanGaris.some((s) => /selat makassar/i.test(s)))
    coba(
      { teks: 'Selat Makassar', jangkar: pr([117.75, -0.9]), gaya: { fontFamily: HURUF.serif, fontStyle: 'italic', fontWeight: 500, fontSize: 38 }, warna: warna.labelSungai, tiba: null, sudut: -64 },
      [[0, 0, 'tengah'], [-40, 0, 'tengah'], [-40, 120, 'tengah']],
    );
  return hasil;
}

export const PetaRute: React.FC<{
  nomor: number;
  aset: AsetPeta;
  narasi: string;
  /** Frame narasi mulai, relatif awal adegan, dan panjang rekaman (frame; null = belum ada). */
  narasiMulai: number;
  narasiDurasi: number | null;
  durasi: number;
}> = ({ nomor, aset, narasi, narasiMulai, narasiDurasi, durasi }) => {
  const f = useCurrentFrame();
  const data = DATA_PETA[nomor];
  const bundel = (PETA_TERBANGUN as unknown as Record<string, { dasar: Dasar | null; kata: KataRekaman[] | null; waktu: number[] | null }>)[String(nomor)];
  const dasar = bundel?.dasar ?? null;
  const kata = bundel?.kata ?? null;
  const manual = bundel?.waktu ?? null;
  const warna = ((WARNA_PETA as Record<string, unknown>)[String(nomor)] ?? Object.values(WARNA_PETA)[0]) as WarnaPeta;

  const siap = dasar && kata !== undefined && manual !== undefined;
  const g = useMemo(() => {
    if (!siap || !dasar) return null;
    const pr = buatProyeksi(dasar.bingkai);
    const darat = dasar.darat.map((c) => c.map(pr));
    const sungai = dasar.sungai.map((s) => ({ ...s, garis: s.garis.map((l) => l.map(pr)) }));
    const batas = dasar.batas.map((b) => ({ ...b, garis: b.garis.map((l) => l.map(pr)) }));
    const titik = data.titik.map((t) => ({ ...t, xy: pr([t.bujur, t.lintang]) }));
    const jejak = data.jejakSebelumnya.map((t) => pr([t.bujur, t.lintang]));
    // rute: kurva halus melalui semua titik; panjang di setiap titik
    const kasar = titik.map((t) => t.xy);
    const langkah = 16;
    const rute = halus(kasar, langkah);
    const L = panjangKumulatif(rute);
    const lTitik = titik.map((_, i) => L[Math.min(L.length - 1, i * langkah)]);
    // waktu tiba (frame dari awal adegan)
    const fps = KANVAS.fps;
    const w = waktuTitik(data.titik, narasi, narasiDurasi != null ? narasiDurasi / fps : null, manual ?? null, kata ?? null);
    const ujung = Math.max(PETA.mulaiRute * fps + 30, (narasiDurasi ?? durasi - narasiMulai) + narasiMulai);
    const tiba: number[] = w.detik.map((d, i) => (i === 0 ? PETA.mulaiRute * fps : d == null ? NaN : narasiMulai + d * fps));
    // titik tanpa pemicu diinterpolasi menurut jarak di antara dua titik bertrigger
    for (let i = 1; i < tiba.length; i++) {
      if (!Number.isNaN(tiba[i])) continue;
      let j = i + 1;
      while (j < tiba.length && Number.isNaN(tiba[j])) j++;
      const a = i - 1;
      const tb = j < tiba.length ? tiba[j] : Math.min(ujung, tiba[a] + 2 * fps);
      for (let m = i; m < j; m++) tiba[m] = tiba[a] + ((lTitik[m] - lTitik[a]) / (lTitik[Math.min(j, tiba.length - 1)] - lTitik[a] || 1)) * (tb - tiba[a]);
      i = j - 1;
    }
    for (let i = 1; i < tiba.length; i++) tiba[i] = Math.max(tiba[i], tiba[i - 1] + 6);
    // Kecepatan tetap (permintaan Rafi, 2026-11-21): rute tidak melambat atau melaju di tiap titik. Garis lurus
    // waktu = a + b × panjang dicocokkan (kuadrat terkecil) ke waktu pemicu yang diucapkan, sehingga gerak tetap
    // selaras narasi secara keseluruhan; titik lalu dicapai menurut jaraknya. Mulai tidak lebih awal dari mulaiRute.
    const pasang = data.titik.map((t, i) => ({ t, i })).filter(({ t, i }) => i > 0 && t.pemicu !== '-' && t.pemicu !== 'awal' && !Number.isNaN(tiba[i]));
    const totalL = L[L.length - 1] || 1;
    let tMulai = tiba[0];
    let tAkhir = tiba[tiba.length - 1];
    if (pasang.length >= 2) {
      const xs0 = pasang.map(({ i }) => lTitik[i]);
      const ys0 = pasang.map(({ i }) => tiba[i]);
      const mx = xs0.reduce((s, v) => s + v, 0) / xs0.length;
      const my = ys0.reduce((s, v) => s + v, 0) / ys0.length;
      const sxx = xs0.reduce((s, v) => s + (v - mx) ** 2, 0);
      const b = sxx > 0 ? xs0.reduce((s, v, k) => s + (v - mx) * (ys0[k] - my), 0) / sxx : 0;
      if (b > 0) {
        tMulai = my - b * mx;
        tAkhir = tMulai + b * totalL;
      }
    } else if (pasang.length === 1) {
      tAkhir = tMulai + ((tiba[pasang[0].i] - tMulai) * totalL) / (lTitik[pasang[0].i] || totalL);
    }
    tMulai = Math.max(PETA.mulaiRute * fps, tMulai);
    tAkhir = Math.min(Math.max(tAkhir, tMulai + fps), ujung);
    const tibaPemicu = tiba.slice();
    for (let i = 0; i < tiba.length; i++) tiba[i] = tMulai + (lTitik[i] / totalL) * (tAkhir - tMulai);
    // kotak rute di layar → pilihan kamera
    const xs = kasar.map((q) => q[0]);
    const ys = kasar.map((q) => q[1]);
    const lebarRute = (Math.max(...xs) - Math.min(...xs)) / W;
    const pilih = SETELAN_PETA[nomor]?.kamera ?? 'otomatis';
    const kamera: 'tetap' | 'ikuti' = pilih === 'otomatis' ? (lebarRute > PETA.ambangTetap ? 'tetap' : 'ikuti') : pilih;
    // Pandangan akhir: rute tetap = seluruh bingkai (Ken Burns pelan); rute ikuti = membingkai rute itu sendiri
    // (skill 2.5a: mundur agar seluruh rute terlihat), dengan perbesaran secukupnya agar label tidak berdesakan.
    let akhir: { s: number; fx: number; fy: number } = { s: PETA.zoomTetap, fx: W / 2, fy: H / 2 };
    if (kamera === 'ikuti') {
      const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
      const sa = Math.min(PETA.zoomAkhirMaks, Math.max(1, Math.min(PETA.bingkaiAkhir[0] / Math.max(1, x1 - x0), PETA.bingkaiAkhir[1] / Math.max(1, y1 - y0))));
      const bx = W / (2 * sa), by = H / (2 * sa);
      akhir = { s: sa, fx: Math.min(W - bx, Math.max(bx, (x0 + x1) / 2)), fy: Math.min(H - by, Math.max(by, (y0 + y1) / 2 + (H / 2 - 900) / sa)) };
    }
    // gugus pohon di daratan, menjauhi rute, titik, dan zona teks
    const r = acak(1964 + nomor);
    const pohon: { xy: Titik2; s: number }[] = [];
    let coba = 0;
    while (pohon.length < PETA.gugusPohon && coba++ < 6000) {
      const q: Titik2 = [60 + r() * (W - 120), ZONA.atas + r() * (H - ZONA.atas - 300)];
      if (!darat.some((c) => diDalam(q, c))) continue;
      if (rute.some((t) => Math.hypot(t[0] - q[0], t[1] - q[1]) < 52)) continue;
      if (titik.some((t) => Math.hypot(t.xy[0] - q[0], t.xy[1] - q[1]) < 90)) continue;
      if (pohon.some((t) => Math.hypot(t.xy[0] - q[0], t.xy[1] - q[1]) < 70)) continue;
      // satu gugus: 2–4 pohon berdekatan dengan ukuran berbeda
      const jumlah = 2 + Math.floor(r() * 3);
      for (let j = 0; j < jumlah; j++) {
        const t: Titik2 = [q[0] + (r() - 0.5) * 44, q[1] + (r() - 0.5) * 22];
        if (darat.some((c) => diDalam(t, c))) pohon.push({ xy: t, s: 0.62 + r() * 0.4 });
      }
    }
    pohon.sort((a, b) => a.xy[1] - b.xy[1]);
    return { darat, sungai, batas, titik, jejak, rute, L, lTitik, tiba, tibaPemicu, kamera, akhir, pohon, sumberWaktu: w.sumber, tidakDitemukan: w.tidakDitemukan, lebarRute };
  }, [siap, dasar, data, narasi, narasiMulai, narasiDurasi, durasi, manual, kata, nomor]);

  const keAkhir = useMemo(() => (g ? (p: Titik2): Titik2 => [(p[0] - g.akhir.fx) * g.akhir.s + W / 2, (p[1] - g.akhir.fy) * g.akhir.s + H / 2] : (p: Titik2) => p), [g]);
  const tataLabel = useMemo(() => (g && dasar ? susunLabel(g, dasar, data, warna, keAkhir) : []), [g, dasar, data, warna, keAkhir]);
  // pohon latar tidak menimpa label (kotak label pada pandangan akhir, diperlebar sedikit)
  const pohonTampil = useMemo(() => {
    if (!g) return [];
    const kotak = tataLabel.map((l) => kotakLabel([keAkhir(l.jangkar)[0] + l.dx, keAkhir(l.jangkar)[1] + l.dy], l.teks, l.gaya, l.rata, l.sudut));
    return g.pohon.filter((t) => {
      const [x, y] = keAkhir(t.xy);
      return !kotak.some((k) => x > k.x0 - 22 && x < k.x1 + 22 && y > k.y0 - 10 && y < k.y1 + 40);
    });
  }, [g, tataLabel, keAkhir]);

  useEffect(() => {
    if (g)
      console.log(`Peta adegan ${nomor}: waktu rute ${g.sumberWaktu}; tiba (dtk) ${g.tiba.map((t) => (t / KANVAS.fps).toFixed(2)).join(' ')}; pemicu ${g.tibaPemicu.map((t) => (t / KANVAS.fps).toFixed(2)).join(' ')}${g.tidakDitemukan.length ? `; pemicu tidak ditemukan: ${g.tidakDitemukan.join(', ')}` : ''}; kamera ${g.kamera} (rute ${(g.lebarRute * 100).toFixed(0)}% lebar)`);
  }, [g, nomor, tataLabel]);

  if (!g) return <AbsoluteFill style={{ background: WARNA.latar }} />;

  // ---------- kemajuan rute ----------
  const total = g.L[g.L.length - 1];
  // kecepatan tetap: panjang rute bertambah linear dari tiba[0] sampai tiba terakhir, tanpa easing per titik
  const panjang = interpolate(f, [g.tiba[0], g.tiba[g.tiba.length - 1]], [0, total], jepit);
  const kepala = titikDiPanjang(g.rute, g.L, panjang);
  const tibaAkhir = g.tiba[g.tiba.length - 1];
  const nyalaTujuan = interpolate(f, [tibaAkhir, tibaAkhir + 18], [0, 1], jepit);

  // ---------- kamera ----------
  let s = 1;
  let fx = W / 2;
  let fy = H / 2;
  if (g.kamera === 'ikuti') {
    // perbesaran mengikuti 1,4 → 1,2 (tidak lebih kecil dari pandangan akhir), lalu mundur ke pandangan akhir
    const A = g.akhir;
    const z0 = Math.max(PETA.zoomIkuti[0], A.s);
    const z1 = Math.max(PETA.zoomIkuti[1], A.s * 1.15);
    const mundur = durasi * (1 - PETA.mundurAkhir);
    const zMasuk = interpolate(f, [0, Math.max(1, tibaAkhir)], [z1, z0], { ...jepit, easing: Easing.inOut(Easing.quad) });
    const k = interpolate(f, [mundur, durasi], [0, 1], { ...jepit, easing: Easing.inOut(Easing.cubic) });
    s = zMasuk + (A.s - zMasuk) * k;
    // fokus mengikuti kepala rute (sedikit di depan pusat area baca), lalu ke pusat pandangan akhir
    const sasaranY = 900;
    const ikutX = kepala[0];
    const ikutY = kepala[1] + (H / 2 - sasaranY) / s;
    // titik berangkat tetap terlihat (sekurangnya 150 px dari tepi kiri) selama rute masih muat di layar
    const awal = g.titik[0].xy;
    const ikutXJaga = Math.min(ikutX, awal[0] + (W / 2 - 150) / s);
    fx = ikutXJaga + (A.fx - ikutXJaga) * k;
    fy = ikutY + (A.fy - ikutY) * k;
    // jaga agar tepi peta tidak terbuka
    const bx = W / (2 * s);
    const by = H / (2 * s);
    fx = Math.min(W - bx, Math.max(bx, fx));
    fy = Math.min(H - by, Math.max(by, fy));
  } else {
    s = interpolate(f, [0, durasi], [1, PETA.zoomTetap], { ...jepit, easing: Easing.inOut(Easing.sin) });
  }
  const transform = `translate(${W / 2} ${H / 2}) scale(${s}) translate(${-fx} ${-fy})`;
  const keLayar = ([x, y]: Titik2): Titik2 => [(x - fx) * s + W / 2, (y - fy) * s + H / 2];

  const dDarat = g.darat.map((c) => keD(c, true)).join('');
  const dRute = keD(g.rute);
  const catatan: string[] = [];
  if (data.titik.some((t) => t.status === 'perkiraan')) catatan.push('rute perkiraan');
  if (data.batas.some((b) => b.status === 'perkiraan')) catatan.push('batas perkiraan');

  // ---------- label ----------
  // Tata letak dipilih sekali pada pandangan akhir (kamera mundur penuh), agar label tidak meloncat saat kamera
  // bergerak; tiap frame label mengikuti jangkarnya di layar dengan ukuran huruf tetap.
  // Saat kamera mendekat, label yang terbawa ke zona teks (teks layar, subtitle, kolom kanan) memudar halus.
  const label = tataLabel.map((l) => {
    const [x, y] = keLayar(l.jangkar);
    const xy: Titik2 = [x + l.dx, y + l.dy];
    const k = kotakLabel(xy, l.teks, l.gaya, l.rata, l.sudut);
    let dalam = 0;
    for (const z of ZONA_LABEL) {
      const e = { x0: z.x0 - TEPI, y0: z.y0 - TEPI, x1: z.x1 + TEPI, y1: z.y1 + TEPI };
      if (!tabrak(k, e)) continue;
      dalam = Math.max(dalam, Math.min(k.x1 - e.x0, e.x1 - k.x0, k.y1 - e.y0, e.y1 - k.y0));
    }
    const muncul = (l.tiba == null ? 1 : interpolate(f, [l.tiba, l.tiba + PETA.labelFade], [0, 1], jepit)) * (1 - Math.min(1, dalam / TEPI));
    return { ...l, xy, muncul };
  });
  const panggung = aset.panggung ? urlAset(aset.panggung) : null;
  return (
    <AbsoluteFill style={{ background: warna.laut }}>
      {panggung ? <Img src={panggung} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} /> : null}
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: 'absolute', inset: 0, mixBlendMode: panggung ? 'multiply' : undefined, opacity: panggung ? 0.9 : 1 }}>
        <defs>
          <clipPath id={`darat-${nomor}`}>
            <path d={dDarat} />
          </clipPath>
          <radialGradient id="pendar-pelita">
            <stop offset="0%" stopColor={WARNA.pelita} stopOpacity={0.55} />
            <stop offset="100%" stopColor={WARNA.pelita} stopOpacity={0} />
          </radialGradient>
          <radialGradient id={`pendar-hangat-${nomor}`}>
            <stop offset="0%" stopColor={WARNA.pelita} stopOpacity={0.28} />
            <stop offset="60%" stopColor={WARNA.pelita} stopOpacity={0.06} />
            <stop offset="100%" stopColor={WARNA.pelita} stopOpacity={0} />
          </radialGradient>
          <filter id={`pendar-rute-${nomor}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation={PETA.pendarRute / 2} />
          </filter>
          <filter id={`butiran-${nomor}`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} seed={7} />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <filter id={`kertas-${nomor}`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.012 0.02" numOctaves={4} seed={3} />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <radialGradient id={`vinyet-${nomor}`} cx="50%" cy="46%" r="75%">
            <stop offset="55%" stopColor={WARNA.latar} stopOpacity={0} />
            <stop offset="100%" stopColor={WARNA.latar} stopOpacity={PETA.vinyet} />
          </radialGradient>
        </defs>
        <g transform={transform}>
          <rect x={-W} y={-H} width={W * 3} height={H * 3} fill={warna.laut} opacity={panggung ? 0 : 1} />
          {/* daratan: isi, tepi terang tipis di sisi darat, garis pantai tegas */}
          <path d={dDarat} fill={warna.darat} />
          <g clipPath={`url(#darat-${nomor})`}>
            <path d={dDarat} fill="none" stroke={warna.tepiTerang} strokeWidth={(PETA.garisPantai + PETA.tepiTerang) * 2} strokeLinejoin="round" />
          </g>
          <path d={dDarat} fill="none" stroke={warna.garis} strokeWidth={PETA.garisPantai} strokeLinejoin="round" />
          {/* sungai: garis bawah gelap lalu air */}
          {g.sungai.map((su) =>
            su.garis.map((l, i) => <path key={`sb${su.nama}${i}`} d={keD(l)} fill="none" stroke={warna.sungaiBawah} strokeWidth={PETA.sungaiBawah} strokeLinecap="round" strokeLinejoin="round" />),
          )}
          {g.sungai.map((su) =>
            su.garis.map((l, i) => <path key={`s${su.nama}${i}`} d={keD(l)} fill="none" stroke={warna.sungai} strokeWidth={PETA.sungai} strokeLinecap="round" strokeLinejoin="round" />),
          )}
          {/* batas */}
          {g.batas.map((b) => {
            return b.garis.map((l, i) => (
              <path
                key={`b${b.nama}${i}`}
                d={keD(l)}
                fill="none"
                stroke={warna.batas}
                strokeWidth={PETA.batas.tebal}
                strokeDasharray={PETA.batas.putus}
                opacity={PETA.batas.opacity}
                strokeLinecap="round"
              />
            ));
          })}
          {/* gugus pohon latar */}
          {pohonTampil.map((t, i) => (
            <IkonPeta key={`p${i}`} nama="pohon" x={t.xy[0]} y={t.xy[1]} w={warna} ukuran={PETA.ikonUmum * t.s} />
          ))}
          {/* jejak sebelumnya */}
          {g.jejak.length > 1 ? (
            <path d={keD(halus(g.jejak))} fill="none" stroke={WARNA.pelita} strokeWidth={PETA.jejak.tebal} strokeDasharray={PETA.jejak.putus} opacity={PETA.jejak.opacity} strokeLinecap="round" />
          ) : null}
          {/* pendar hangat di titik berangkat */}
          <circle cx={g.titik[0].xy[0]} cy={g.titik[0].xy[1]} r={150} fill={`url(#pendar-hangat-${nomor})`} />
          {/* rute: pendar, garis bawah gelap, garis amber */}
          <path d={dRute} fill="none" stroke={WARNA.pelita} strokeWidth={PETA.rute + 8} strokeLinecap="round" strokeLinejoin="round" opacity={0.45} strokeDasharray={`${panjang} ${total + 10}`} filter={`url(#pendar-rute-${nomor})`} />
          <path d={dRute} fill="none" stroke={warna.garis} strokeWidth={PETA.rute + 4} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={`${panjang} ${total + 10}`} />
          <path d={dRute} fill="none" stroke={WARNA.pelita} strokeWidth={PETA.rute} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={`${panjang} ${total + 10}`} />
          {/* ikon titik rute: muncul saat rute tiba; tujuan menyala setelah pemicu terakhir */}
          {g.titik.map((t, i) => {
            if (!t.ikon.startsWith('umum:')) {
              if (t.ikon.startsWith('khusus:') && aset.ikon[t.ikon.slice(7)]) {
                const m = interpolate(f, [g.tiba[i], g.tiba[i] + PETA.ikonMuncul], [0, 1], jepit);
                const u = PETA.ikonKhusus * (0.9 + 0.1 * m);
                return <image key={`k${i}`} href={urlAset(aset.ikon[t.ikon.slice(7)])} x={t.xy[0] - u / 2} y={t.xy[1] - u} width={u} height={u} opacity={m} />;
              }
              return null;
            }
            const m = interpolate(f, [g.tiba[i], g.tiba[i] + PETA.ikonMuncul], [0, 1], jepit);
            const tujuan = i === g.titik.length - 1;
            const nyala = i === 0 ? 1 : tujuan ? nyalaTujuan : m;
            return <IkonPeta key={`i${i}`} nama={t.ikon.slice(5)} x={t.xy[0]} y={t.xy[1] + 6} w={warna} nyala={nyala} muncul={m} ukuran={PETA.ikonUmum * (tujuan ? 1.25 : 1.1)} />;
          })}
          {/* kepala rute: pelita */}
          {panjang > 0 && panjang < total ? (
            <g>
              <circle cx={kepala[0]} cy={kepala[1]} r={PETA.kepalaRute * 3} fill="url(#pendar-pelita)" />
              <circle cx={kepala[0]} cy={kepala[1]} r={PETA.kepalaRute} fill={WARNA.pelita} stroke={warna.garis} strokeWidth={2.5} />
            </g>
          ) : null}
          {nyalaTujuan > 0 ? (
            <circle cx={g.titik[g.titik.length - 1].xy[0]} cy={g.titik[g.titik.length - 1].xy[1] - 16} r={70} fill="url(#pendar-pelita)" opacity={nyalaTujuan} />
          ) : null}
        </g>
        {/* tekstur kertas, butiran, vinyet (di atas peta, tidak ikut kamera) */}
        <rect width={W} height={H} filter={`url(#kertas-${nomor})`} opacity={PETA.tekstur} style={{ mixBlendMode: 'overlay' }} />
        <rect width={W} height={H} filter={`url(#butiran-${nomor})`} opacity={PETA.butiran} style={{ mixBlendMode: 'overlay' }} />
        <rect width={W} height={H} fill={`url(#vinyet-${nomor})`} />
        {/* label */}
        {label
          .map((l, i) => (
            <text
              key={`l${i}`}
              x={l.xy[0]}
              y={l.xy[1]}
              textAnchor={l.rata === 'kiri' ? 'start' : l.rata === 'kanan' ? 'end' : 'middle'}
              transform={l.sudut ? `rotate(${l.sudut} ${l.xy[0]} ${l.xy[1]})` : undefined}
              style={{ ...l.gaya, paintOrder: 'stroke', stroke: WARNA.latar, strokeWidth: 7, strokeLinejoin: 'round' }}
              fill={l.warna}
              opacity={l.muncul}
            >
              {l.teks}
            </text>
          ))}
        {/* catatan kecil dan atribusi, di atas zona subtitle */}
        <text x={ZONA.kiri} y={H - ZONA.bawah - 200} style={{ fontFamily: HURUF.sans, fontWeight: 500, fontSize: 24, paintOrder: 'stroke', stroke: WARNA.latar, strokeWidth: 5 }} fill={WARNA.tintaRedup}>
          {[...catatan, dasar!.atribusiOsm ? '© OpenStreetMap contributors' : ''].filter(Boolean).join(' · ')}
        </text>
      </svg>
    </AbsoluteFill>
  );
};
