// Data proyek yang sedang dirender. Diisi saat render lewat pasangData() (src/data/pasang.ts) dari props;
// isinya disiapkan paket/video/siapkan.mjs dari KONSEP.md, setelan.json, dan berkas aset.
import type { NamaLapisan } from '../lib/merek';

export interface DataProyek {
  judul: string;
  /** Judul di sampul: baris "Judul di layar sampul" di bagian caption KONSEP.md bila ada, selain itu judul. */
  judulSampul: string;
  slug: string;
  versi: string;
  rasio: string;
  durasiMaksDetik: number;
  durasiTargetDetik: number | null;
  /** Satu atau dua lapisan; yang utama lebih dulu. */
  lapisan: NamaLapisan[];
  /** Tempat untuk sampul; kosong = baris tempat tidak ditampilkan. */
  latar: string;
  /** Bagian seri (mis. "Part 1"); kosong = bukan seri. Tampil di sampul. */
  bagianSeri: string;
  ulikan: { teks: string; sumber: string };
  suara: { model: string; voice: string; stability: string; arahanBabak: Record<string, string> };
}

export let JUDUL = '';
export let JUDUL_SAMPUL = '';
export let SLUG = '';
export let VERSI = '';
export let RASIO = '9:16';
export let DURASI_MAKS_DETIK = 180;
export let DURASI_TARGET_DETIK: number | null = null;
export let LAPISAN: NamaLapisan[] = [];
export let LATAR = '';
export let BAGIAN_SERI = '';
export let ULIKAN = { teks: '', sumber: '' };
export let SUARA: DataProyek['suara'] = { model: 'Eleven v3', voice: '', stability: '', arahanBabak: {} };

export function pasangProyek(d: DataProyek) {
  JUDUL = d.judul;
  JUDUL_SAMPUL = d.judulSampul;
  SLUG = d.slug;
  VERSI = d.versi;
  RASIO = d.rasio;
  DURASI_MAKS_DETIK = d.durasiMaksDetik;
  DURASI_TARGET_DETIK = d.durasiTargetDetik;
  LAPISAN = d.lapisan;
  LATAR = d.latar;
  BAGIAN_SERI = d.bagianSeri;
  ULIKAN = d.ulikan;
  SUARA = d.suara;
}
