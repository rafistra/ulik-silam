// Data proyek yang sedang dirender. Diisi saat render lewat pasangData() (src/data/pasang.ts) dari props;
// isinya disiapkan paket/video/siapkan.mjs dari KONSEP.md, setelan.json, dan berkas aset.

export interface Bingkai {
  /** Bujur barat dan timur, lintang selatan dan utara (derajat desimal; selatan/barat negatif). */
  barat: number;
  timur: number;
  selatan: number;
  utara: number;
}

export interface BatasPeta {
  nama: string;
  tahun: string;
  sumber: string;
  gaya: 'garis' | 'arsiran' | 'pancaran';
  status: 'terverifikasi' | 'perkiraan';
  /** [bujur, lintang] pusat untuk gaya pancaran. */
  pusat: [number, number] | null;
  /** Batas muncul saat kata ini diucapkan; null = sejak peta muncul. */
  pemicu: string | null;
}

export interface TitikPeta {
  nomor: number;
  /** Label di peta; "-" = titik belok tanpa label. */
  nama: string;
  bujur: number;
  lintang: number;
  /** "umum:<nama>", "khusus:<slug>", atau "-". */
  ikon: string;
  /** "awal", "-", atau kata/frasa di narasi saat rute tiba di titik ini. */
  pemicu: string;
  status: 'terverifikasi' | 'perkiraan';
}

export interface DataPeta {
  bingkai: Bingkai;
  sungaiDanGaris: string[];
  batas: BatasPeta[];
  /** Berkas di public/peta/ untuk fitur yang tidak ada di data dasar. */
  geojson: string[];
  jejakSebelumnya: { nama: string; bujur: number; lintang: number }[];
  titik: TitikPeta[];
  ikonKhusus: { slug: string; keterangan: string }[];
}

export type WarnaPetaAdegan = Record<string, string | string[]>;

export let DATA_PETA: Record<number, DataPeta> = {};
/** Palet peta per adegan (dari ilustrasi adegan sebelum dan sesudahnya; scripts/peta-warna.mjs). */
export let WARNA_PETA: Record<string, WarnaPetaAdegan> = {};

export function pasangPeta(d: { peta: Record<number, DataPeta>; warnaPeta: Record<string, WarnaPetaAdegan> }) {
  DATA_PETA = d.peta;
  WARNA_PETA = d.warnaPeta;
}
