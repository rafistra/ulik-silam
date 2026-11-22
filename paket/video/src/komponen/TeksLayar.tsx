import React from 'react';
import { BAYANGAN_TEKS, TIPE, WARNA, ZONA } from '../lib/merek';

/** Teks layar: kutipan rata kiri di sepertiga atas, mulai 300 px dari atas (di bawah label lapisan). */
export const TeksLayar: React.FC<{ teks: string; posisi: 'atas' | 'tengah'; opacity?: number }> = ({ teks, posisi, opacity = 1 }) => (
  <div
    style={{
      position: 'absolute',
      left: ZONA.kiri,
      right: ZONA.kanan,
      top: posisi === 'atas' ? 300 : 760,
      ...TIPE.kutipan,
      color: WARNA.tinta,
      textWrap: 'balance',
      // Baris bait (dipisah \n) tampil sebagai baris tersendiri.
      whiteSpace: 'pre-line',
      textShadow: BAYANGAN_TEKS,
      opacity,
    }}
  >
    {teks}
  </div>
);
