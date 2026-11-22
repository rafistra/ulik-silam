// Lembar ikon peta (still pemeriksaan): semua ikon umum dengan palet peta video ini, redup dan menyala,
// ikon yang dipakai adegan peta ditandai. Render: npx remotion still LembarIkon out/uji/lembar-ikon.png
import React from 'react';
import { AbsoluteFill } from 'remotion';
import { DATA_PETA, WARNA_PETA } from '../data/peta';
import { pasangData, type DataVideo } from '../data/pasang';
import { HURUF, WARNA } from '../lib/merek';
import { IKON_UMUM, IkonPeta, type WarnaPeta } from './ikon';
import { muatFont } from '../lib/font';

export const LembarIkon: React.FC<{ data: DataVideo }> = ({ data }) => {
  pasangData(data);
  muatFont(data.basisFont);
  const nomor = Object.keys(DATA_PETA)[0];
  const w = ((WARNA_PETA as Record<string, unknown>)[nomor ?? ''] ?? Object.values(WARNA_PETA)[0]) as WarnaPeta;
  const dipakai = new Set(Object.values(DATA_PETA).flatMap((d) => d.titik.map((t) => t.ikon.replace(/^umum:/, ''))).concat('pohon'));
  const nama = Object.keys(IKON_UMUM);
  return (
    <AbsoluteFill style={{ background: w.darat, fontFamily: HURUF.sans, color: WARNA.tinta }}>
      <div style={{ position: 'absolute', left: 60, top: 60, fontSize: 34, fontWeight: 800, letterSpacing: '0.12em' }}>
        IKON PETA · adegan {nomor ?? '-'} · redup / menyala
      </div>
      <div style={{ position: 'absolute', left: 60, top: 112, display: 'flex', gap: 10 }}>
        {(['laut', 'darat', 'garis', 'tepiTerang', 'bahan', 'sungai', 'pohon', 'medan', 'batas'] as const).map((k) => (
          <div key={k} style={{ textAlign: 'center', fontSize: 16 }}>
            <div style={{ width: 92, height: 44, background: w[k], border: `2px solid ${WARNA.garis}` }} />
            {k}
          </div>
        ))}
      </div>
      <svg width={1080} height={1640} style={{ position: 'absolute', top: 240, left: 0 }}>
        <defs>
          <radialGradient id="pendar-pelita">
            <stop offset="0%" stopColor={WARNA.pelita} stopOpacity={0.55} />
            <stop offset="100%" stopColor={WARNA.pelita} stopOpacity={0} />
          </radialGradient>
        </defs>
        {nama.map((n, i) => {
          const kol = i % 3;
          const bar = Math.floor(i / 3);
          const x = 120 + kol * 330;
          const y = 120 + bar * 260;
          return (
            <g key={n}>
              <rect x={x - 90} y={y - 110} width={300} height={220} rx={14} fill={w.laut} stroke={dipakai.has(n) ? WARNA.pelita : WARNA.garis} strokeWidth={dipakai.has(n) ? 4 : 2} />
              <IkonPeta nama={n} x={x} y={y + 30} w={w} ukuran={96} />
              <IkonPeta nama={n} x={x + 130} y={y + 30} w={w} ukuran={96} nyala={1} />
              <text x={x + 60} y={y + 90} textAnchor="middle" fill={WARNA.tinta} style={{ fontFamily: HURUF.sans, fontSize: 22, fontWeight: 700 }}>
                {n}
              </text>
            </g>
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};
