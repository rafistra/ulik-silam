import React from 'react';
import { ADEGAN, WARNA } from '../lib/merek';

/** Gradasi `bayang` dari atas, di belakang teks layar, agar terbaca di atas langit atau kain terang. */
export const GradasiAtas: React.FC<{ opacity: number }> = ({ opacity }) => (
  <div
    style={{
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      height: ADEGAN.tinggiGradasiAtas,
      background: `linear-gradient(to bottom, ${WARNA.bayang} 0%, ${WARNA.bayang} 35%, transparent 100%)`,
      opacity,
    }}
  />
);

/** Gradasi `bayang` dari bawah (± 900 px) agar subtitle terbaca di atas gambar terang. */
export const GradasiBawah: React.FC<{ opacity: number }> = ({ opacity }) => (
  <div
    style={{
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: ADEGAN.tinggiGradasi,
      background: `linear-gradient(to top, ${WARNA.bayang} 0%, ${WARNA.bayang} 55%, transparent 100%)`,
      opacity,
    }}
  />
);
