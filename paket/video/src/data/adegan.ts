// Data proyek yang sedang dirender. Diisi saat render lewat pasangData() (src/data/pasang.ts) dari props;
// isinya disiapkan paket/video/siapkan.mjs dari KONSEP.md, setelan.json, dan berkas aset.

export type Gerak = 'zoom-masuk' | 'zoom-keluar' | 'geser-atas' | 'geser-bawah';

export interface Adegan {
  nomor: number;
  babak: number;
  judulSingkat: string;
  /** Detik dari kolom Waktu; dipakai bila narasi belum ada. */
  durasiCadangan: number;
  bidikan: 'A' | 'B';
  gerak: Gerak;
  /** Narasi bersih tanpa tag, untuk subtitle. */
  narasi: string;
  /** Narasi persis dengan tag Eleven v3. */
  narasiSuara: string;
  teksLayar: string[];
  posisiTeksLayar: 'atas' | 'tengah';
  visual: string;
  hening: boolean;
  epilog: boolean;
  /** Adegan peta animasi (datanya di src/data/peta.ts). */
  peta: boolean;
  kataKunci: string[];
}

export let NAMA_BABAK: Record<number, string> = {};
export let DAFTAR_ADEGAN: Adegan[] = [];

export function pasangAdegan(d: { namaBabak: Record<number, string>; adegan: Adegan[] }) {
  NAMA_BABAK = d.namaBabak;
  DAFTAR_ADEGAN = d.adegan;
}
