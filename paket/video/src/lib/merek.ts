// Token identitas Ulik Silam (tema Malam), diselaraskan dengan sistem desain
// https://claude.ai/artifact/VAzJGVmAGbxEvFpyD7jt6W (project/tokens.json, Oktober 2026).
// Satu-satunya sumber warna, huruf, dan ukuran di proyek ini. Isinya sama untuk semua video.
import type { CSSProperties } from 'react';

export const WARNA = {
  latar: '#14110F',
  latarNaik: '#211913',
  garis: '#4A3828',
  tinta: '#EFE3C8',
  tintaRedup: '#B5A486',
  pelita: '#E8A33D',
  tanah: '#3B2A1E',
  bayang: '#14110FB8',
} as const;

/** Pendar di sekitar tanda logo (token `cahaya`). */
export const CAHAYA = '0 0 64px 8px #E8A33D59';
/** Pendar yang sama sebagai filter, agar mengikuti bentuk tanda (box-shadow mengikuti kotak). */
export const CAHAYA_FILTER = 'drop-shadow(0 0 24px #E8A33D59) drop-shadow(0 0 64px #E8A33D59)';
export const BAYANGAN_TEKS = '0 2px 12px #14110FCC';

export type NamaLapisan = 'Sejarah' | 'Legenda' | 'Mitos' | 'Rekaan';

export const LAPISAN: Record<NamaLapisan, { warna: string; ikon: string }> = {
  Sejarah: {
    warna: '#E8A33D',
    ikon: '<path d="M8 4h10a2 2 0 0 1 0 4H8"/><path d="M8 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V8"/><path d="M9.5 12h6M9.5 15.5h4"/>',
  },
  Legenda: {
    warna: '#9DB57A',
    ikon: '<path d="M6 12.5a3.3 3.3 0 0 1 .4-6.5 4.6 4.6 0 0 1 8.6-1.4 3.6 3.6 0 0 1 4.6 3.6A2.6 2.6 0 0 1 18.5 12.5z"/><path d="M12 12.5V20M12 15.5l-2.2-3M12 15.5l2.2-3M7.5 12.5v4.5M16.5 12.5v4.5M9.5 20h5"/>',
  },
  Mitos: {
    warna: '#E07A60',
    ikon: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>',
  },
  Rekaan: {
    warna: '#86A6C4',
    ikon: '<path d="M20 4C13 4 8 9 7 16l-2.5 4"/><path d="M20 4c0 6.5-4.5 11.5-12.5 12"/><path d="M10 14l5-5"/>',
  },
};

export const HURUF = {
  serif: '"Cormorant Garamond", Georgia, "Times New Roman", serif',
  sans: '"Plus Jakarta Sans", "Segoe UI", sans-serif',
} as const;

export const TIPE = {
  judulSampul: { fontFamily: HURUF.serif, fontSize: 104, lineHeight: '104px', fontWeight: 600 },
  kutipan: { fontFamily: HURUF.serif, fontSize: 52, lineHeight: '64px', fontWeight: 500, fontStyle: 'italic' },
  subtitle: { fontFamily: HURUF.sans, fontSize: 56, lineHeight: '72px', fontWeight: 700 },
  isi: { fontFamily: HURUF.sans, fontSize: 42, lineHeight: '58px', fontWeight: 500 },
  label: { fontFamily: HURUF.sans, fontSize: 30, lineHeight: '36px', fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase' },
  keterangan: { fontFamily: HURUF.sans, fontSize: 30, lineHeight: '40px', fontWeight: 500 },
} satisfies Record<string, CSSProperties>;

/** Zona aman kanvas 1080 × 1920 (antarmuka TikTok dan Shorts). */
export const ZONA = { atas: 200, bawah: 460, kiri: 72, kanan: 180 } as const;

export const KANVAS = { lebar: 1080, tinggi: 1920, fps: 30 } as const;

/** Kartu Ulikan. Naikkan `peredup` (mis. ke 0,8) bila ilustrasi terakhir terlalu terang atau ramai. */
/**
 * Foto asli yang tampil utuh (tidak dipotong): foto yang sama diburamkan dan diredupkan memenuhi kanvas,
 * foto utuh di atasnya. Skala berakhir di 1, jadi tepi foto tidak pernah terpotong selama Ken Burns.
 */
export const FOTO_UTUH = {
  peredup: 0.72,
  blur: 32,
  skala: [0.94, 1] as [number, number],
};

export const KARTU_ULIKAN = {
  durasi: 105,
  peredup: 0.72,
  blur: 8,
  framePeredup: 15,
  frameMasuk: 12,
  naik: 24,
  pudarAkhir: 30,
  atas: 520,
  padding: 48,
  sudut: 20,
  tebalGaris: 2,
  jarak: 32,
  tanda: 88,
  tinggiWordmark: 96,
  jarakLogo: 14,
  logoDariBawah: 560,
} as const;

export const LABEL_LAPISAN = { durasi: 90, fade: 8, jarak: 16, tebalGaris: 3, sudut: 6, padding: '15px 32px 15px 26px', ukuranIkon: '1.33em', jarakIkon: 8 } as const;

/**
 * Peta animasi (skill pov-produksi 2.5a, acuan "Peta yang menyesuaikan warna ilustrasinya", November 2026).
 * Bentuk tetap di sini; warna per video dihitung `npm run peta-warna` dari ilustrasi ke src/data/peta-warna.json.
 */
export const PETA = {
  garisPantai: 3.5,
  tepiTerang: 1.4,
  sungai: 4,
  sungaiBawah: 7.5,
  rute: 7,
  pendarRute: 18,
  kepalaRute: 11,
  batas: { tebal: 2.4, putus: '12 10', opacity: 0.7 },
  jejak: { tebal: 3, putus: '3 9', opacity: 0.45 },
  butiran: 0.11,
  tekstur: 0.07,
  vinyet: 0.62,
  ikonUmum: 36,
  ikonKhusus: 80,
  gugusPohon: 110,
  /** Rentang rona yang dikunci (derajat) dan kejenuhannya; terang-gelap dari palet. */
  // Sungai disetel lebih menyatu dengan daratan atas permintaan Rafi (2026-11-21): lebih redup, dicampur warna darat,
  // rona tidak boleh bergeser jauh ke toska (geserMin −8). Semula: geserMin −22, terangSungai [0,40; 0,52], tanpa campurDarat.
  air: { rona: 205, geserMin: -8, geserMaks: 28, ronaMin: 180, ronaMaks: 235, terangSungai: [0.3, 0.36], campurDarat: 0.22, lautMaks: 0.085 },
  tumbuhan: { ronaMin: 78, ronaMaks: 135, jenuhMin: 0.24, jenuhMaks: 0.42 },
  darat: { terangMin: 0.08, terangMaks: 0.15 },
  batasJenuhMaks: 0.1,
  kayuBatu: '#8C6A44',
  /** Kamera: rute lebih lebar dari ini (bagian lebar layar) = bingkai tetap; selain itu mengikuti kepala rute. */
  ambangTetap: 0.55,
  zoomTetap: 1.06,
  zoomIkuti: [1.2, 1.4] as [number, number],
  /** Rute kecil (kamera ikuti): pandangan akhir membingkai rute dalam kotak ini (px) dengan perbesaran paling besar zoomAkhirMaks. */
  bingkaiAkhir: [520, 480] as [number, number],
  zoomAkhirMaks: 2.2,
  mundurAkhir: 0.15,
  /** Rute mulai sekian detik setelah adegan masuk. */
  mulaiRute: 0.3,
  labelFade: 8,
  ikonMuncul: 10,
} as const;

export const ADEGAN = {
  /** Jeda sebelum dan sesudah narasi, detik. */
  jedaAwal: 0.3,
  jedaAkhir: 0.6,
  jedaHening: 1.5,
  crossfade: 15,
  pudarBabak: 12,
  zoomMaks: 1.14,
  tinggiGradasi: 900,
  tinggiGradasiAtas: 720,
} as const;
