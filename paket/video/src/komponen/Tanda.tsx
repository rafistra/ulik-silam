import React from 'react';
import { Img } from 'remotion';
import { ASET } from '../lib/data';
import { WARNA } from '../lib/merek';

/** Tanda logo Mata Nyala. Bila berkasnya hilang, tampil lingkaran pelita sederhana (dan tercatat di `npm run cek`). */
export const Tanda: React.FC<{ ukuran: number; style?: React.CSSProperties }> = ({ ukuran, style }) =>
  ASET.tanda ? (
    <Img src={ASET.tanda} style={{ width: ukuran, height: ukuran, display: 'block', ...style }} />
  ) : (
    <div style={{ width: ukuran, height: ukuran, borderRadius: 9999, background: WARNA.pelita, ...style }} />
  );

/** Wordmark "Ulik Silam" (berkas merek; tidak diketik ulang dengan font). Tanpa berkas: tidak tampil. */
export const Wordmark: React.FC<{ tinggi: number }> = ({ tinggi }) =>
  ASET.wordmark ? <Img src={ASET.wordmark} style={{ height: tinggi, width: 'auto', display: 'block' }} /> : null;
