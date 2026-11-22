// Memecah narasi bersih menjadi potongan subtitle: per kalimat, dan setiap potongan dijamin muat dua baris
// pada lebar subtitle sebenarnya (diukur dengan tabel lebar huruf, bukan jumlah karakter).
import { LEBAR_HURUF, LEBAR_LAIN, UKURAN_UKUR } from './lebar-huruf';
import { KANVAS, TIPE, ZONA } from './merek';

const IDEAL = 38;
/** Lebar kolom subtitle (kiri = kanan = zona kanan), disisakan 1,5% untuk kerning dan pembulatan. */
const LEBAR_BARIS = (KANVAS.lebar - 2 * ZONA.kanan) * 0.985;
const skala = TIPE.subtitle.fontSize / UKURAN_UKUR;
const lebar = (s: string) => [...s].reduce((t, c) => t + (LEBAR_HURUF[c] ?? LEBAR_LAIN), 0) * skala;

/** Muat paling banyak dua baris bila dibungkus per kata seperti browser (bungkus serakah = jumlah baris minimum). */
export function muatDuaBaris(s: string): boolean {
  let baris = 1;
  let kini = '';
  for (const k of s.split(' ')) {
    const coba = kini ? `${kini} ${k}` : k;
    if (lebar(coba) <= LEBAR_BARIS) kini = coba;
    else {
      baris++;
      kini = k;
      if (baris > 2 || lebar(k) > LEBAR_BARIS) return false;
    }
  }
  return true;
}
// Kata yang janggal di akhir potongan (harus menempel ke kata sesudahnya).
const SAMBUNG = new Set(
  'di ke dari dan yang untuk pada karena tapi tetapi dengan atau sebagai oleh akan adalah bahwa saat seorang sebuah para setiap tak tidak bukan lebih paling si sang'.split(' '),
);

/** Kalimat panjang dipecah di batas kata dengan biaya terkecil: sedikit potongan, panjang seimbang, utamakan setelah tanda baca. */
function pecahKalimat(k: string): string[] {
  const kata = k.split(' ');
  const n = kata.length;
  const biaya: number[] = Array(n + 1).fill(Infinity);
  const dari: number[] = Array(n + 1).fill(-1);
  biaya[0] = 0;
  for (let j = 1; j <= n; j++) {
    for (let i = j - 1; i >= 0; i--) {
      const potong = kata.slice(i, j).join(' ');
      if (!muatDuaBaris(potong) && j - i > 1) break;
      const akhir = kata[j - 1];
      const c =
        400 +
        0.5 * (potong.length - IDEAL) ** 2 +
        (j < n && !/[,:;—–-]$/.test(akhir) ? 150 : 0) +
        (j < n && SAMBUNG.has(akhir.toLowerCase().replace(/[^\p{L}]/gu, '')) ? 800 : 0);
      if (biaya[i] + c < biaya[j]) {
        biaya[j] = biaya[i] + c;
        dari[j] = i;
      }
    }
  }
  const hasil: string[] = [];
  for (let j = n; j > 0; j = dari[j]) hasil.unshift(kata.slice(dari[j], j).join(' '));
  return hasil;
}

export function pecahSubtitle(narasi: string): string[] {
  const kalimat = (narasi.match(/[^.!?…]+(?:\.\.\.|[.!?…])+["”’)]*|[^.!?…]+$/g) || [narasi]).map((s) => s.trim()).filter(Boolean);
  return kalimat.flatMap((k) => (muatDuaBaris(k) ? [k] : pecahKalimat(k)));
}

const lepas = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Kata atau frasa utuh (bukan bagian kata lain), tanpa membedakan huruf besar-kecil. */
export const reUtuh = (daftar: string[]) =>
  new RegExp(`(?<![\\p{L}\\p{N}])(${daftar.map(lepas).join('|')})(?![\\p{L}\\p{N}])`, 'giu');

/**
 * Kata kunci per potongan subtitle. Frasa kunci yang terbelah ke dua potongan (mis. "untuk siapa / sebenarnya kamu
 * mendayung") tetap diwarnai: tiap potongan mendapat bagian frasa yang jatuh di dalamnya. Potongan berasal dari
 * narasi yang dipecah di spasi, jadi bagian itu selalu kata utuh.
 */
export function kunciPerPotongan(potongan: string[], kataKunci: string[]): string[][] {
  if (!kataKunci.length) return potongan.map(() => []);
  const gabung = potongan.join(' ');
  const rentang: [number, number][] = [];
  let pos = 0;
  for (const p of potongan) {
    rentang.push([pos, pos + p.length]);
    pos += p.length + 1;
  }
  const hasil = potongan.map(() => [...kataKunci]);
  for (const m of gabung.matchAll(reUtuh(kataKunci))) {
    const a = m.index ?? 0, z = a + m[0].length;
    rentang.forEach(([pa, pz], i) => {
      const bagian = gabung.slice(Math.max(a, pa), Math.min(z, pz)).trim();
      if (bagian && bagian !== m[0] && !hasil[i].includes(bagian)) hasil[i].push(bagian);
    });
  }
  return hasil;
}

const kata = (s: string) => s.replace(/\s+/g, ' ').trim().split(' ');

/**
 * Pewaktuan dari peta frasa: `frasa` adalah narasi yang dipecah persis di setiap jeda rekaman (satu frasa = satu
 * rentang ucapan di antara dua jeda). Batas potongan yang jatuh di awal frasa diletakkan tepat di akhir jedanya;
 * batas di tengah frasa dihitung sebanding suku kata di dalam rentang ucapan frasa itu saja.
 * Mengembalikan null bila peta tidak cocok dengan potongan atau jumlah jeda, agar pemanggil memakai cara biasa.
 */
export function waktuDariFrasa(
  potongan: string[],
  frasa: string[],
  durasi: number,
  jeda: [number, number][],
): [number, number][] | null {
  const kp = potongan.flatMap(kata);
  const kf = frasa.map(kata);
  if (kf.flat().join(' ') !== kp.join(' ')) return null;
  const dalam = jeda.filter(([s, e]) => s > 0 && Math.round(e) < Math.round(durasi));
  if (dalam.length !== frasa.length - 1) return null;
  const rentang: [number, number][] = [];
  let t = 0;
  for (const [s, e] of dalam) {
    rentang.push([t, s]);
    t = e;
  }
  rentang.push([t, durasi]);
  // waktu mulai setiap kata
  const mulaiKata: number[] = [];
  kf.forEach((ks, i) => {
    const [a, z] = rentang[i];
    const b = ks.map(bobotUcapan);
    const total = b.reduce((x, y) => x + y, 0);
    let c = 0;
    ks.forEach((_, j) => {
      mulaiKata.push(j === 0 && i > 0 ? a : a + ((z - a) * c) / total);
      c += b[j];
    });
  });
  const hasil: [number, number][] = [];
  let w = 0;
  potongan.forEach((p, i) => {
    const m = i === 0 ? 0 : mulaiKata[w];
    w += kata(p).length;
    hasil.push([Math.round(m), 0]);
  });
  hasil.forEach((h, i) => (h[1] = i + 1 < hasil.length ? hasil[i + 1][0] : Math.round(durasi)));
  return hasil;
}

/** Menyamarkan kata di teks subtitle yang tampil (setelan SAMARKAN_SUBTITLE); narasi sumber tidak berubah. */
export function samarkan(teks: string, peta: Record<string, string>): string {
  const kunci = Object.keys(peta);
  if (!kunci.length) return teks;
  const kecil = Object.fromEntries(Object.entries(peta).map(([k, v]) => [k.toLowerCase(), v]));
  return teks.replace(reUtuh(kunci), (m) => kecil[m.toLowerCase()] ?? m);
}

/** Perkiraan panjang ucapan: jumlah suku kata (gugus vokal), angka dihitung ± 3 suku kata per digit. */
const bobotUcapan = (s: string) =>
  (s.toLowerCase().replace(/\d/g, '').match(/[aiueo]+/g) || []).length + 3 * (s.match(/\d/g) || []).length || 1;

/** Jeda yang boleh dipakai sebagai batas potongan berada paling jauh sejauh ini (frame) dari perkiraannya. */
const JANGKAU_JEDA = 36;

/**
 * Waktu tiap potongan: [mulai, akhir] dalam frame relatif terhadap awal narasi.
 * Waktu ucapan (di luar jeda rekaman) dibagi sebanding suku kata, lalu setiap batas digeser ke akhir jeda nyata
 * terdekat, sehingga potongan berganti saat narator mulai bicara lagi, bukan di tengah kata.
 * Tanpa data jeda (`jeda` kosong) hasilnya pembagian sebanding suku kata sepanjang durasi.
 */
export function waktuSubtitle(
  potongan: string[],
  durasi: number,
  jeda: [number, number][] = [],
  /** Untuk pemecahan manual: batas tanpa tanda baca tetap ditarik ke jeda nyata bila sedekat ini (frame). */
  jangkauTanpaTanda = 0,
): [number, number][] {
  const bobot = potongan.map(bobotUcapan);
  const total = bobot.reduce((s, b) => s + b, 0);
  const dalam = jeda.filter(([s, e]) => s > 0 && e < durasi);
  const ucapan = durasi - dalam.reduce((t, [s, e]) => t + (e - s), 0);
  // waktu ucapan kumulatif → waktu jam (melompati jeda)
  const jam = (u: number) => {
    let sisa = u;
    let prev = 0;
    for (const [s, e] of dalam) {
      if (sisa <= s - prev) return prev + sisa;
      sisa -= s - prev;
      prev = e;
    }
    return prev + sisa;
  };
  // waktu jam → waktu ucapan kumulatif (kebalikan `jam`)
  const ucapanSampai = (t: number) => t - dalam.reduce((s, [a, b]) => s + Math.max(0, Math.min(b, t) - a), 0);
  const batas: number[] = [0];
  let sisaBobot = total;
  for (let i = 0; i < potongan.length - 1; i++) {
    const sebelum = batas[batas.length - 1];
    // Dihitung ulang dari batas sebelumnya, agar tempo narator yang berubah-ubah tidak menumpuk selisih.
    const u0 = ucapanSampai(sebelum);
    const target = jam(u0 + ((ucapan - u0) * bobot[i]) / sisaBobot);
    sisaBobot -= bobot[i];
    // Potongan yang berakhir tanpa tanda baca dipecah di tengah frasa yang diucapkan bersambung:
    // jangan ditarik ke jeda kecil di dekatnya (mis. sesudah "Kelak,"), pakai perkiraan suku kata.
    const bertanda = /[.,;:!?…—–"”’)]$/.test(potongan[i]);
    if (!bertanda && !jangkauTanpaTanda) {
      batas.push(Math.max(sebelum + 6, target));
      continue;
    }
    const jangkau = bertanda ? JANGKAU_JEDA : jangkauTanpaTanda;
    const kandidat = dalam
      .filter(([, e]) => e > sebelum + 6)
      .map(([s, e]) => ({ t: e, d: Math.abs((s + e) / 2 - target) }))
      .filter((k) => k.d <= jangkau)
      .sort((a, b) => a.d - b.d)[0];
    batas.push(Math.max(sebelum + 6, kandidat ? kandidat.t : target));
  }
  batas.push(durasi);
  return potongan.map((_, i) => [Math.round(batas[i]), Math.round(batas[i + 1])]);
}
