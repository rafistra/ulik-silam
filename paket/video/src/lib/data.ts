// Data adegan dan audio yang sudah digabung dengan setelan tangan, plus peta berkas aset.
// Semua nilai di sini diisi ulang oleh pasangData() (src/data/pasang.ts) setiap kali proyek berganti.
import { staticFile } from 'remotion';
import { DAFTAR_ADEGAN, type Adegan } from '../data/adegan';
import { DAFTAR_SFX, type Sfx } from '../data/audio';
import { SETELAN_ADEGAN, SETELAN_SFX } from '../data/setelan';
import type { KenBurnsKhusus } from '../komponen/Ilustrasi';
import type { AsetPeta } from '../peta/PetaRute';

export type AdeganTerpakai = Adegan & { teksLayarAkhir?: number; kenBurns?: KenBurnsKhusus };

type Peta = Record<string, string>;

/** Path relatif berkas aset terhadap folder aset proyek (setara public/ di proyek lama). */
export interface DaftarAset {
  ilustrasi: Peta;
  narasi: Peta;
  musik: Peta;
  sfx: Peta;
  merek: Peta;
  sampul: Peta;
  peta?: Record<string, AsetPeta>;
}

export interface DataPetaTerbangun {
  dasar: unknown;
  kata: unknown;
  waktu: number[] | null;
}

export let ADEGAN_TERPAKAI: AdeganTerpakai[] = [];
export let SFX_TERPAKAI: Sfx[] = [];
/** Isi data peta per adegan (data dasar, waktu kata, waktu manual), dibundel ke props agar tidak dimuat asinkron. */
export let PETA_TERBANGUN: Record<string, DataPetaTerbangun> = {};

let daftar: DaftarAset = { ilustrasi: {}, narasi: {}, musik: {}, sfx: {}, merek: {}, sampul: {} };
let jedaNarasi: Record<string, { jeda: number[][] }> = {};
/** Awalan URL berkas aset; null = staticFile() dari --public-dir saat render dan Studio. */
let basis: string | null = null;

/** URL berkas dari path relatif di folder aset proyek. */
export const urlAset = (rel: string) => (basis ? `${basis}/${rel.split('/').map(encodeURIComponent).join('/')}` : staticFile(rel));
const ambil = (peta: Peta | undefined, kunci: number | string) => (peta?.[String(kunci)] ? urlAset(peta[String(kunci)]) : null);

export const ASET = {
  ilustrasi: (nomor: number) => ambil(daftar.ilustrasi, nomor),
  narasi: (nomor: number) => ambil(daftar.narasi, nomor),
  musik: (nomor: number) => ambil(daftar.musik, nomor),
  sfx: (nomor: number) => ambil(daftar.sfx, nomor),
  get tanda() {
    return ambil(daftar.merek, 'tanda');
  },
  get wordmark() {
    return ambil(daftar.merek, 'wordmark');
  },
  /** Peta animasi per adegan (data dasar, waktu kata, waktu manual, panggung, ikon khusus); null bila tidak ada. */
  peta: (nomor: number): AsetPeta | null => {
    const e = daftar.peta?.[String(nomor)];
    return e && e.dasar ? e : null;
  },
  /** Gambar sampul khusus (`ilustrasi/sampul.*`); null = memakai ilustrasi adegan SAMPUL_ADEGAN. */
  get sampul() {
    return ambil(daftar.sampul, 'gambar');
  },
};

/** Jeda di rekaman narasi adegan dalam detik, relatif awal berkas; kosong bila belum ada. */
export const JEDA_NARASI = (nomor: number): [number, number][] =>
  (jedaNarasi[String(nomor)]?.jeda ?? []).map(([s, e]) => [s, e] as [number, number]);

export const dua = (n: number) => String(n).padStart(2, '0');

/** Hitung ulang data turunan. Dipanggil pasangData() sesudah adegan, audio, dan setelan terpasang. */
export function pasangAset(d: { aset: DaftarAset; jeda: Record<string, { jeda: number[][] }>; petaTerbangun: Record<string, DataPetaTerbangun>; basis: string | null }) {
  daftar = d.aset;
  jedaNarasi = d.jeda;
  PETA_TERBANGUN = d.petaTerbangun;
  basis = d.basis ? d.basis.replace(/\/$/, '') : null;
  ADEGAN_TERPAKAI = DAFTAR_ADEGAN.map((a) => ({ ...a, ...SETELAN_ADEGAN[a.nomor] }));
  SFX_TERPAKAI = DAFTAR_SFX.map((s) => ({ ...s, ...SETELAN_SFX[s.nomor] }));
}
