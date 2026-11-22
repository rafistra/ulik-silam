import React from 'react';
import { BAYANGAN_TEKS, TIPE, WARNA, ZONA } from '../lib/merek';
import { reUtuh } from '../lib/subtitle';

/** Kata kunci (utuh, bukan bagian kata lain) diwarnai pelita. */
function warnai(teks: string, kataKunci: string[]): React.ReactNode {
  if (!kataKunci.length) return teks;
  return teks.split(reUtuh(kataKunci)).map((bag, i) =>
    i % 2 === 1 ? (
      <span key={i} style={{ color: WARNA.pelita }}>
        {bag}
      </span>
    ) : (
      bag
    ),
  );
}

/** Tanda hubung di antara huruf (kata ulang: kampung-kampung) diapit word joiner agar baris tidak putus di situ. */
const sambungKataUlang = (teks: string) => teks.replace(/(?<=\p{L})-(?=\p{L})/gu, '⁠-⁠');

/** Subtitle narasi: tepat di tengah horizontal (kiri = kanan = 180 px), berakhir 460 px dari bawah. */
export const Subtitle: React.FC<{ teks: string; kataKunci: string[]; opacity?: number }> = ({ teks, kataKunci, opacity = 1 }) => (
  <div
    style={{
      position: 'absolute',
      left: ZONA.kanan,
      right: ZONA.kanan,
      bottom: ZONA.bawah,
      ...TIPE.subtitle,
      color: WARNA.tinta,
      textAlign: 'center',
      textWrap: 'balance',
      textShadow: BAYANGAN_TEKS,
      opacity,
    }}
  >
    {warnai(sambungKataUlang(teks), kataKunci)}
  </div>
);
