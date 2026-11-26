// Data proyek yang sedang dirender. Diisi saat render lewat pasangData() (src/data/pasang.ts) dari props;
// isinya disiapkan paket/video/siapkan.mjs dari KONSEP.md, setelan.json, dan berkas aset.

export interface Cue {
  nomor: number;
  nama: string;
  /** Nama berkas di public/musik tanpa ekstensi. */
  berkas: string;
  babakAwal: number;
  babakAkhir: number;
}

export interface Sfx {
  nomor: number;
  adegan: number;
  bunyi: string;
  /** Nama berkas di public/sfx tanpa ekstensi. */
  berkas: string;
  /** Detik mulai relatif terhadap awal adegan; negatif = dihitung dari akhir adegan. */
  detik: number;
  volume: number;
  /** Bunyi suasana: diulang sepanjang adegan dengan fade. */
  ulang: boolean;
  /** Lama diputar (detik); tidak ada = sampai berkas habis atau 3 dtk sesudah adegan (setelan.json). */
  durasi?: number;
  /** Fade keluar di akhir durasi putar (detik) (setelan.json). */
  fadeKeluar?: number;
  opsional: boolean;
}

export let CUE_MUSIK: Cue[] = [];
export let DAFTAR_SFX: Sfx[] = [];
export let ADEGAN_HENING: number[] = [];

export function pasangAudio(d: { cue: Cue[]; sfx: Sfx[]; adeganHening: number[] }) {
  CUE_MUSIK = d.cue;
  DAFTAR_SFX = d.sfx;
  ADEGAN_HENING = d.adeganHening;
}
