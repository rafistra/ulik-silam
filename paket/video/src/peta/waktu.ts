// Waktu tiba rute di tiap titik, mengikuti narasi (skill pov-produksi 2.5a).
// Urutan sumber: public/peta/adegan-XX.waktu.json (manual, detik per titik dari awal rekaman narasi adegan),
// lalu adegan-XX.kata.json (transkripsi kata lokal), lalu perkiraan dari posisi pemicu di narasi bersih
// (dibobot suku kata; angka dieja; jeda tanda baca dihitung).
import type { TitikPeta } from '../data/peta';

export type KataRekaman = { teks: string; mulai: number; akhir: number };
export type SumberWaktu = 'manual' | 'transkripsi' | 'perkiraan';

const normal = (s: string) =>
  s
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/[^\p{L}\p{N}' ]+/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const SATUAN = ['', 'satu', 'dua', 'tiga', 'empat', 'lima', 'enam', 'tujuh', 'delapan', 'sembilan'];
/** Angka dieja kasar (cukup untuk menghitung suku kata). */
function eja(n: number): string {
  if (n < 10) return SATUAN[n] || 'nol';
  if (n === 10) return 'sepuluh';
  if (n === 11) return 'sebelas';
  if (n < 20) return SATUAN[n - 10] + ' belas';
  if (n < 100) return SATUAN[Math.floor(n / 10)] + ' puluh ' + eja(n % 10);
  if (n < 200) return 'seratus ' + eja(n % 100);
  if (n < 1000) return SATUAN[Math.floor(n / 100)] + ' ratus ' + eja(n % 100);
  if (n < 2000) return 'seribu ' + eja(n % 1000);
  if (n < 10000) return SATUAN[Math.floor(n / 1000)] + ' ribu ' + eja(n % 1000);
  return String(n);
}
const sukuKata = (kata: string) => {
  const w = kata.replace(/\d+/g, (d) => ' ' + eja(+d) + ' ');
  return (w.toLowerCase().match(/[aiueo]+/g) || []).length;
};

/** Jarak edit Levenshtein. */
function jarak(a: string, b: string): number {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[a.length][b.length];
}
/**
 * Kata transkripsi cocok dengan kata pemicu: sama, salah satu awalan yang lain ("dihalang" ~ "halang" lewat
 * awalan di-), atau salah dengar kecil (whisper: "sumai" untuk "sungai"; selisih ≤ 2 huruf untuk kata ≥ 4 huruf).
 */
function mirip(tok: string | undefined, w: string): boolean {
  if (!tok) return false;
  if (tok === w || tok.startsWith(w) || w.startsWith(tok) || tok.endsWith(w)) return true;
  return w.length >= 4 && jarak(tok, w) <= 2;
}

/** Bobot ucapan kumulatif sampai indeks karakter i di narasi (suku kata + jeda tanda baca). */
function bobotSampai(narasi: string, i: number): number {
  const bag = narasi.slice(0, i);
  const kata = bag.split(/\s+/).filter(Boolean);
  const jeda = (bag.match(/\.\.\.|…/g) || []).length * 2.5 + (bag.match(/[,;:]/g) || []).length * 1 + (bag.match(/[.!?](?!\.)/g) || []).length * 1.5;
  return kata.reduce((s, k) => s + sukuKata(k), 0) + jeda;
}

/** Indeks karakter awal pemicu di narasi, mencari setelah `dari`. */
function cariPemicu(narasi: string, pemicu: string, dari: number): number {
  const n = narasi.toLowerCase();
  const pp = pemicu.toLowerCase();
  const i = n.indexOf(pp, dari);
  return i;
}

/**
 * Detik (dari awal rekaman narasi adegan) saat rute tiba di setiap titik bertrigger; titik "-" diisi null
 * (diinterpolasi menurut jarak oleh komponen). Titik "awal" = 0 (komponen menambah jeda mulai rute).
 */
export function waktuTitik(
  titik: TitikPeta[],
  narasi: string,
  durasiNarasi: number | null,
  manual: number[] | null,
  kata: KataRekaman[] | null,
): { detik: (number | null)[]; sumber: SumberWaktu; tidakDitemukan: string[] } {
  const tidakDitemukan: string[] = [];
  if (manual && manual.length === titik.length) return { detik: manual.slice(), sumber: 'manual', tidakDitemukan };
  if (kata && kata.length) {
    const toks = kata.map((k) => normal(k.teks));
    let dari = 0;
    const detik = titik.map((t) => {
      if (t.pemicu === 'awal') return 0;
      if (t.pemicu === '-') return null;
      const target = normal(t.pemicu).split(' ');
      for (let i = dari; i <= toks.length - target.length; i++) {
        if (target.every((w, j) => mirip(toks[i + j], w))) {
          dari = i + target.length;
          return kata[i].mulai;
        }
      }
      tidakDitemukan.push(t.pemicu);
      return undefined as unknown as number;
    });
    if (!tidakDitemukan.length) return { detik, sumber: 'transkripsi', tidakDitemukan };
  }
  // perkiraan dari posisi pemicu di narasi bersih
  const total = bobotSampai(narasi, narasi.length) || 1;
  const panjang = durasiNarasi ?? total / 5.5;
  let dari = 0;
  const detik = titik.map((t) => {
    if (t.pemicu === 'awal') return 0;
    if (t.pemicu === '-') return null;
    const i = cariPemicu(narasi, t.pemicu, dari);
    if (i < 0) {
      if (!tidakDitemukan.includes(t.pemicu)) tidakDitemukan.push(t.pemicu);
      return null;
    }
    dari = i + t.pemicu.length;
    return (bobotSampai(narasi, i) / total) * panjang;
  });
  return { detik, sumber: 'perkiraan', tidakDitemukan };
}
