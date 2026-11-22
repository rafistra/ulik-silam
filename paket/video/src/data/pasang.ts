// Satu pintu untuk memasang data proyek ke modul data. Dipanggil di awal setiap komposisi dan di calculateMetadata.
import { pasangAdegan, type Adegan } from './adegan';
import { pasangAudio, type Cue, type Sfx } from './audio';
import { pasangPeta, type DataPeta, type WarnaPetaAdegan } from './peta';
import { pasangProyek, type DataProyek } from './proyek';
import { pasangSetelan, type Setelan } from './setelan';
import { pasangAset, type DaftarAset, type DataPetaTerbangun } from '../lib/data';

/** Semua yang dibutuhkan komposisi untuk satu proyek; disiapkan paket/video/siapkan.mjs. */
export interface DataVideo {
  proyek: DataProyek;
  namaBabak: Record<number, string>;
  adegan: Adegan[];
  cue: Cue[];
  sfx: Sfx[];
  adeganHening: number[];
  peta: Record<number, DataPeta>;
  warnaPeta: Record<string, WarnaPetaAdegan>;
  setelan: Setelan;
  aset: DaftarAset;
  jeda: Record<string, { jeda: number[][] }>;
  petaTerbangun: Record<string, DataPetaTerbangun>;
  /** Awalan URL berkas aset (katalog); null = staticFile() dari --public-dir. */
  basis: string | null;
  /** Awalan URL font; null = font/ di folder aset proyek. */
  basisFont: string | null;
}

let terpasang: DataVideo | null = null;
export function pasangData(d: DataVideo) {
  if (d === terpasang) return;
  pasangProyek(d.proyek);
  pasangAdegan({ namaBabak: d.namaBabak, adegan: d.adegan });
  pasangAudio({ cue: d.cue, sfx: d.sfx, adeganHening: d.adeganHening });
  pasangPeta({ peta: d.peta, warnaPeta: d.warnaPeta });
  pasangSetelan(d.setelan);
  pasangAset({ aset: d.aset, jeda: d.jeda, petaTerbangun: d.petaTerbangun, basis: d.basis });
  terpasang = d;
}
