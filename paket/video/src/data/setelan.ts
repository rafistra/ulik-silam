// Setelan tangan per proyek. Isinya dari proyek/<slug>/setelan.json (opsional; kunci sama dengan nama di bawah),
// dipasang lewat pasangSetelan(). Nilai di berkas ini adalah bawaan bila setelan.json tidak mengisinya.
import type { Gerak } from './adegan';
import type { KenBurnsKhusus } from '../komponen/Ilustrasi';
import type { EfekAdegan } from '../komponen/Efek';

/**
 * Timpa gerak Ken Burns, posisi teks layar, atau kata kunci subtitle (diwarnai pelita) per adegan.
 * `kenBurns`: gerak khusus (skala dan geser vertikal dalam % tinggi kanvas) yang mengalahkan `gerak`; geser negatif
 * menaikkan gambar. Jaga skala cukup besar agar tepi bawah gambar tidak terbuka.
 */
export let SETELAN_ADEGAN: Record<
  number,
  { gerak?: Gerak; posisiTeksLayar?: 'atas' | 'tengah'; kataKunci?: string[]; teksLayarAkhir?: number; kenBurns?: KenBurnsKhusus }
> = {};

/** Adegan yang gambarnya foto asli: tampil utuh tanpa dipotong, dengan latar foto yang sama diburamkan (lihat FOTO_UTUH di merek.ts). */
export let ADEGAN_FOTO_UTUH: number[] = [];

/** Layar `latar` penuh di awal adegan, dalam frame, lalu gambar memudar masuk: { nomor adegan: frame }. */
export let GELAP_AWAL: Record<number, number> = {};

/**
 * Momen hening berlayar gelap sesudah narasi adegan, dalam detik: { nomor adegan: detik }. Durasi adegan bertambah
 * sebesar itu; gambar memudar ke `latar` tepat sebelum celah, musik diturunkan seperti adegan hening.
 */
export let GELAP_SESUDAH: Record<number, number> = {};

/**
 * Timpa detik mulai, volume, atau ulang per nomor SFX (lihat src/data/audio.ts). `durasi` (detik): lama SFX diputar;
 * `fadeKeluar` (detik): memudar sampai senyap di akhir durasi itu, untuk berkas yang berhenti mendadak. Tanpa `durasi`,
 * fade dihitung dari akhir jendela putar (akhir adegan + 3 dtk), jadi isi `durasi` ≤ panjang berkas agar fade terdengar.
 */
export let SETELAN_SFX: Record<number, { detik?: number; volume?: number; ulang?: boolean; durasi?: number; fadeKeluar?: number }> = {};

/**
 * Timpa perilaku per nomor cue musik: `ulang: false` agar cue tidak diulang bila lebih pendek dari rentangnya,
 * `sunyiMulaiAdegan` agar cue memudar habis (`fadeSunyi` detik, bawaan 1) tepat saat adegan itu mulai dan sesudahnya sunyi.
 */
export let SETELAN_MUSIK: Record<number, { ulang?: boolean; sunyiMulaiAdegan?: number; fadeSunyi?: number }> = {};

/**
 * Penyamaran kata di subtitle saja (tampilan), misalnya { memerkosamu: 'memerk*samu' }.
 * Narasi di KONSEP.md, bahan, dan adegan.ts tidak berubah. Kosong = subtitle apa adanya.
 */
export let SAMARKAN_SUBTITLE: Record<string, string> = {};

/** Adegan yang teks layarnya (dipisah " / " di KONSEP.md) tampil bersama sebagai satu bait, bukan bergantian. */
export let TEKS_LAYAR_BAIT: number[] = [];

/**
 * Pemecahan subtitle manual per adegan (tampilan saja): potongan digabung dengan spasi harus sama persis dengan
 * narasi adegan itu, kalau tidak setelan diabaikan. Dipakai agar batas potongan jatuh di jeda napas narator,
 * bukan di tengah frasa. Batas tanpa tanda baca ditarik ke jeda rekaman bila ada dalam ± 0,4 dtk.
 */
export let POTONG_SUBTITLE: Record<number, string[]> = {};

/**
 * Peta frasa narasi per adegan: narasi dipecah persis di setiap jeda rekaman (src/generated/jeda.json), satu frasa
 * = satu rentang ucapan. Dengan peta ini subtitle berganti tepat saat narator mulai frasa baru, dan batas di tengah
 * frasa dihitung di dalam frasa itu saja. Peta yang tidak cocok (teks atau jumlah jeda berbeda, mis. sesudah narasi
 * diganti) diabaikan otomatis. Disusun saat pemeriksaan aset (Tahap 3); buat ulang bila rekaman diganti.
 */
export let FRASA_NARASI: Record<number, string[]> = {};

/**
 * Jeda sisipan di tengah narasi: narator berhenti `lama` detik di titik `pada` (detik rekaman narasi adegan itu,
 * taruh di tengah jeda napas) dan SFX `sfx` diputar sendirian di celah itu, mulai dari detik `dariSfx` berkasnya,
 * dengan fade pendek. Durasi adegan bertambah sebesar `lama`; subtitle ikut bergeser dan kosong selama jeda.
 * SFX yang dipakai di sini tidak diputar lagi di jadwal biasanya untuk adegan itu.
 */
export let SISIP_JEDA: Record<number, { pada: number; lama: number; sfx: number; dariSfx: number }[]> = {};

/**
 * Efek suasana per adegan (lihat src/komponen/Efek.tsx): kedip-pelita, debu-cahaya, kabut, vinyet-hening.
 * { nomor adegan: [{ efek, x?, y?, lebar?, tinggi?, kuat? }] }; posisi dan ukuran dalam % kanvas. Kosong = tanpa efek.
 */
export let EFEK_ADEGAN: Record<number, EfekAdegan[]> = {};

/** Nomor adegan yang ilustrasinya dipakai di sampul (bawaan skill: 1). */
export let SAMPUL_ADEGAN = 1;

/**
 * Peta animasi: gerak kamera per adegan peta. `otomatis` memilih menurut lebar rute di layar
 * (> ± 55% lebar = bingkai tetap dengan Ken Burns pelan; selain itu kamera mengikuti kepala rute).
 */
export let SETELAN_PETA: Record<number, { kamera?: 'otomatis' | 'tetap' | 'ikuti' }> = {};

export let SETELAN_AUDIO = {
  /** Potongan narasi sudah disamakan ke ± −24 LUFS per babak oleh `npm run potong`; puncaknya ± −1 dBTP, jadi jangan dinaikkan di atas 1. */
  narasi: 1,
  /** Cue Suno ± −15 LUFS; 0,1 (−20 dB) menaruh musik ± −35 LUFS, ± 11 dB di bawah narasi (dikalibrasi di pov-jan-oherne, 2026-10-18). */
  musik: 0.1,
  /** Volume musik di adegan hening (ducking): ± 8 dB di bawah musik biasa. */
  musikHening: 0.04,
  /** Crossfade musik di pergantian babak, detik. */
  crossfadeMusik: 1.5,
  /** Pengali semua SFX adegan. */
  sfx: 1,
};

const BAWAAN = structuredClone({ SETELAN_ADEGAN, ADEGAN_FOTO_UTUH, GELAP_AWAL, GELAP_SESUDAH, SETELAN_SFX, SETELAN_MUSIK, SAMARKAN_SUBTITLE, TEKS_LAYAR_BAIT, POTONG_SUBTITLE, FRASA_NARASI, SISIP_JEDA, SAMPUL_ADEGAN, SETELAN_PETA, SETELAN_AUDIO, EFEK_ADEGAN });
export type Setelan = Partial<{ [K in keyof typeof BAWAAN]: (typeof BAWAAN)[K] }>;

/** Pasang setelan proyek; kunci yang tidak diisi kembali ke bawaan. */
export function pasangSetelan(d: Setelan = {}) {
  SETELAN_ADEGAN = d.SETELAN_ADEGAN ?? BAWAAN.SETELAN_ADEGAN;
  ADEGAN_FOTO_UTUH = d.ADEGAN_FOTO_UTUH ?? BAWAAN.ADEGAN_FOTO_UTUH;
  GELAP_AWAL = d.GELAP_AWAL ?? BAWAAN.GELAP_AWAL;
  GELAP_SESUDAH = d.GELAP_SESUDAH ?? BAWAAN.GELAP_SESUDAH;
  SETELAN_SFX = d.SETELAN_SFX ?? BAWAAN.SETELAN_SFX;
  SETELAN_MUSIK = d.SETELAN_MUSIK ?? BAWAAN.SETELAN_MUSIK;
  SAMARKAN_SUBTITLE = d.SAMARKAN_SUBTITLE ?? BAWAAN.SAMARKAN_SUBTITLE;
  TEKS_LAYAR_BAIT = d.TEKS_LAYAR_BAIT ?? BAWAAN.TEKS_LAYAR_BAIT;
  POTONG_SUBTITLE = d.POTONG_SUBTITLE ?? BAWAAN.POTONG_SUBTITLE;
  FRASA_NARASI = d.FRASA_NARASI ?? BAWAAN.FRASA_NARASI;
  SISIP_JEDA = d.SISIP_JEDA ?? BAWAAN.SISIP_JEDA;
  SAMPUL_ADEGAN = d.SAMPUL_ADEGAN ?? BAWAAN.SAMPUL_ADEGAN;
  EFEK_ADEGAN = d.EFEK_ADEGAN ?? BAWAAN.EFEK_ADEGAN;
  SETELAN_PETA = d.SETELAN_PETA ?? BAWAAN.SETELAN_PETA;
  SETELAN_AUDIO = { ...BAWAAN.SETELAN_AUDIO, ...(d.SETELAN_AUDIO || {}) };
}
