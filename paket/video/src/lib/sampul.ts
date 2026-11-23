/** Posisi gambar sampul per platform: geser dalam % kanvas (−50…50) dan skala 1–1,5. */
export type PlatformSampul = 'tiktok' | 'youtube';
export type PosisiSampul = { x: number; y: number; skala: number };

export const PLATFORM_SAMPUL: PlatformSampul[] = ['tiktok', 'youtube'];
export const POSISI_BAWAAN: PosisiSampul = { x: 0, y: 0, skala: 1 };
export const BATAS_GESER = 50;
export const BATAS_SKALA: [number, number] = [1, 1.5];

/**
 * Potongan 3:4 di grid profil TikTok: 240 px atas dan bawah kanvas 1080 × 1920 hilang.
 * Label lapisan sampul TikTok turun ke `labelAtas` agar tetap di dalam potongan.
 */
export const POTONG_TIKTOK = { atas: 240, bawah: 240, labelAtas: 280 };

const jepit = (v: unknown, min: number, maks: number, bawaan: number) => {
  const n = typeof v === 'number' && Number.isFinite(v) ? v : bawaan;
  return Math.min(maks, Math.max(min, n));
};

/** Nilai apa pun (dari proyek.yaml atau seretan) menjadi posisi sah, dibulatkan 0,1. */
export function jepitPosisi(p: unknown): PosisiSampul {
  const o = (p && typeof p === 'object' ? p : {}) as Record<string, unknown>;
  const bulat = (n: number, d: number) => Math.round(n * d) / d;
  return {
    x: bulat(jepit(o.x, -BATAS_GESER, BATAS_GESER, 0), 10),
    y: bulat(jepit(o.y, -BATAS_GESER, BATAS_GESER, 0), 10),
    skala: bulat(jepit(o.skala, BATAS_SKALA[0], BATAS_SKALA[1], 1), 100),
  };
}

export const posisiSama = (a: PosisiSampul, b: PosisiSampul) => a.x === b.x && a.y === b.y && a.skala === b.skala;
