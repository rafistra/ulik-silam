// Pustaka ikon umum peta animasi (skill pov-produksi 2.5a). Dipakai ulang di semua video.
// Aturan gambar: garis tepi gelap setebal garis pantai, cahaya dari kiri atas (sisi kiri terang, kanan gelap),
// 3–4 warna dari palet peta, pendar pelita bila menyala. Setiap ikon digambar di kotak 40 × 40 dengan titik
// pijak (0, 0) di tengah bawah; ikon naik ke arah y negatif.
import React from 'react';
import { PETA, WARNA } from '../../lib/merek';

export interface WarnaPeta {
  garis: string;
  laut: string;
  darat: string;
  tepiTerang: string;
  bahanGelap: string;
  bahan: string;
  bahanTerang: string;
  sungai: string;
  sungaiBawah: string;
  labelSungai: string;
  pohonGelap: string;
  pohon: string;
  pohonTerang: string;
  medan: string;
  medanTerang: string;
  batas: string;
}

type Gambar = (w: WarnaPeta, nyala: number) => React.ReactNode;
const G = (w: WarnaPeta) => ({ stroke: w.garis, strokeWidth: 2.6, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const });
/** Jendela atau lampu: bahan gelap saat redup, pelita saat menyala. */
const lampu = (w: WarnaPeta, nyala: number) => (nyala > 0.5 ? WARNA.pelita : w.bahanGelap);

const pohon: Gambar = (w) => (
  <>
    <rect x={-1.6} y={-9} width={3.2} height={9} fill={w.bahanGelap} {...G(w)} />
    <path d="M0 -34 C 9 -30 13 -20 11 -13 C 9 -8 -9 -8 -11 -13 C -13 -20 -9 -30 0 -34 Z" fill={w.pohon} {...G(w)} />
    <path d="M0 -32 C -7 -28 -10 -20 -8.5 -14 C -6 -12 -2 -12 -1 -13 C -3 -20 -2 -27 0 -32 Z" fill={w.pohonTerang} />
    <path d="M3 -30 C 8 -26 10 -19 9 -14 C 7 -11 4 -11 3 -12 Z" fill={w.pohonGelap} />
  </>
);
const kelapa: Gambar = (w) => (
  <>
    <path d="M-1 0 C 0 -10 2 -20 1 -28 L 4 -28 C 5 -20 3 -10 2 0 Z" fill={w.bahan} {...G(w)} />
    {[-160, -120, -60, -20, -90].map((a, i) => {
      const r = (a * Math.PI) / 180;
      const x = Math.cos(r) * 15;
      const y = -29 + Math.sin(r) * 9 + 4;
      return <path key={i} d={`M2.5 -29 Q ${x / 2 + 2} ${y - 6} ${x + 2} ${y}`} fill="none" stroke={i < 2 ? w.pohonTerang : w.pohon} strokeWidth={4.2} strokeLinecap="round" />;
    })}
    <circle cx={2.5} cy={-28} r={2.4} fill={w.pohonGelap} {...G(w)} strokeWidth={1.6} />
  </>
);
const bukit: Gambar = (w) => (
  <>
    <path d="M-19 0 C -12 -18 10 -20 19 0 Z" fill={w.medan} {...G(w)} />
    <path d="M-16 -2 C -11 -14 -3 -17 2 -16 C -6 -12 -10 -6 -11 -1 Z" fill={w.medanTerang} />
  </>
);
const gunung: Gambar = (w) => (
  <>
    <path d="M-20 0 L -3 -32 L 4 -22 L 8 -26 L 20 0 Z" fill={w.medan} {...G(w)} />
    <path d="M-3 -32 L -15 -2 L -6 -2 L -1 -20 Z" fill={w.medanTerang} />
    <path d="M-3 -32 L -7 -24 L -3 -26 L 1 -23 Z" fill={w.bahanTerang} />
  </>
);
const gunungApi: Gambar = (w, nyala) => (
  <>
    <path d="M-20 0 L -5 -28 L 5 -28 L 20 0 Z" fill={w.medan} {...G(w)} />
    <path d="M-5 -28 L -15 -2 L -7 -2 L -2 -26 Z" fill={w.medanTerang} />
    <path d="M-4 -30 C -8 -36 -2 -40 0 -36 C 2 -42 9 -38 5 -31" fill="none" stroke={nyala > 0.5 ? WARNA.pelita : w.tepiTerang} strokeWidth={2.4} strokeLinecap="round" />
  </>
);
const pondok: Gambar = (w, nyala) => (
  <>
    <path d="M-11 0 V -6 M 11 0 V -6" stroke={w.garis} strokeWidth={2.6} />
    <rect x={-12} y={-15} width={24} height={9} fill={w.bahan} {...G(w)} />
    <rect x={-12} y={-15} width={9} height={9} fill={w.bahanTerang} opacity={0.55} />
    <rect x={-3} y={-13} width={6} height={6} fill={lampu(w, nyala)} stroke={w.garis} strokeWidth={1.4} />
    <path d="M-16 -14 L 0 -27 L 16 -14 Z" fill={w.bahanGelap} {...G(w)} />
    <path d="M-16 -14 L 0 -27 L -2 -14 Z" fill={w.medanTerang} />
  </>
);
const rumahPanjang: Gambar = (w, nyala) => (
  <>
    {[-18, -9, 0, 9, 18].map((x) => (
      <path key={x} d={`M${x} 0 V -7`} stroke={w.garis} strokeWidth={2.4} />
    ))}
    <rect x={-20} y={-16} width={40} height={9} fill={w.bahan} {...G(w)} />
    <rect x={-20} y={-16} width={13} height={9} fill={w.bahanTerang} opacity={0.5} />
    {[-14, -6, 2, 10].map((x) => (
      <rect key={x} x={x} y={-14} width={4.5} height={5} fill={lampu(w, nyala)} stroke={w.garis} strokeWidth={1.2} />
    ))}
    <path d="M-23 -15 L -16 -25 L 16 -25 L 23 -15 Z" fill={w.bahanGelap} {...G(w)} />
    <path d="M-23 -15 L -16 -25 L -4 -25 L -10 -15 Z" fill={w.medanTerang} />
  </>
);
const kampung: Gambar = (w, nyala) => (
  <>
    <g transform="translate(-8 0) scale(0.75)">{pondok(w, nyala)}</g>
    <g transform="translate(9 -2) scale(0.6)">{pondok(w, nyala)}</g>
  </>
);
const masjid: Gambar = (w, nyala) => (
  <>
    <rect x={-12} y={-10} width={24} height={10} fill={w.bahan} {...G(w)} />
    <rect x={-3} y={-8} width={6} height={8} fill={lampu(w, nyala)} stroke={w.garis} strokeWidth={1.4} />
    <path d="M-17 -10 L 0 -18 L 17 -10 Z" fill={w.bahanGelap} {...G(w)} />
    <path d="M-12 -17 L 0 -24 L 12 -17 Z" fill={w.bahanGelap} {...G(w)} />
    <path d="M-7 -23 L 0 -31 L 7 -23 Z" fill={w.bahanGelap} {...G(w)} />
    <path d="M-17 -10 L 0 -18 L -3 -10 Z M-12 -17 L 0 -24 L -3 -17 Z" fill={w.medanTerang} />
  </>
);
const gereja: Gambar = (w, nyala) => (
  <>
    <rect x={-12} y={-14} width={24} height={14} fill={w.bahan} {...G(w)} />
    <rect x={-3} y={-9} width={6} height={9} fill={lampu(w, nyala)} stroke={w.garis} strokeWidth={1.4} />
    <path d="M-15 -14 L 0 -24 L 15 -14 Z" fill={w.bahanGelap} {...G(w)} />
    <path d="M0 -24 V -34 M -4 -30 H 4" stroke={w.garis} strokeWidth={2.4} strokeLinecap="round" />
  </>
);
const candi: Gambar = (w) => (
  <>
    <path d="M-16 0 H 16 L 13 -8 H -13 Z" fill={w.bahan} {...G(w)} />
    <path d="M-12 -8 H 12 L 9 -17 H -9 Z" fill={w.bahan} {...G(w)} />
    <path d="M-8 -17 H 8 L 0 -32 Z" fill={w.bahanGelap} {...G(w)} />
    <path d="M-16 0 H -6 L -5 -8 H -13 Z M-8 -17 H -2 L 0 -32 Z" fill={w.bahanTerang} opacity={0.6} />
  </>
);
const benteng: Gambar = (w) => (
  <>
    <path d="M-17 0 V -16 H -13 V -12 H -9 V -16 H -5 V -12 H 5 V -16 H 9 V -12 H 13 V -16 H 17 V 0 Z" fill={w.bahan} {...G(w)} />
    <rect x={-17} y={-16} width={8} height={16} fill={w.bahanTerang} opacity={0.5} />
    <rect x={-3} y={-8} width={6} height={8} fill={w.bahanGelap} stroke={w.garis} strokeWidth={1.4} />
  </>
);
const dermaga: Gambar = (w) => (
  <>
    <rect x={-18} y={-8} width={36} height={4} fill={w.bahan} {...G(w)} />
    {[-14, -4, 6, 15].map((x) => (
      <path key={x} d={`M${x} -4 V 2`} stroke={w.garis} strokeWidth={2.4} />
    ))}
  </>
);
const perahu: Gambar = (w) => (
  <>
    <path d="M-18 -6 Q 0 4 18 -6 L 14 -2 Q 0 6 -14 -2 Z" fill={w.bahan} {...G(w)} />
    <path d="M-18 -6 Q -8 -1 -2 0 L -14 -2 Z" fill={w.bahanTerang} />
  </>
);
const kapalLayar: Gambar = (w) => (
  <>
    <path d="M-17 -6 Q 0 3 17 -6 L 13 0 H -13 Z" fill={w.bahan} {...G(w)} />
    <path d="M0 -6 V -34" stroke={w.garis} strokeWidth={2.4} />
    <path d="M1 -32 Q 13 -20 12 -8 H 1 Z" fill={w.bahanTerang} {...G(w)} />
    <path d="M-1 -28 Q -10 -18 -9 -8 H -1 Z" fill={w.medanTerang} {...G(w)} />
  </>
);
const sawah: Gambar = (w) => (
  <>
    <path d="M-18 0 L -12 -10 H 18 L 12 0 Z" fill={w.pohon} {...G(w)} />
    {[-8, -1, 6].map((x) => (
      <path key={x} d={`M${x - 6} -2 L ${x} -9`} stroke={w.pohonTerang} strokeWidth={1.6} />
    ))}
  </>
);
const makam: Gambar = (w) => (
  <>
    <path d="M-10 0 V -12 Q 0 -22 10 -12 V 0 Z" fill={w.bahan} {...G(w)} />
    <path d="M-10 0 V -12 Q -6 -17 -2 -18 V 0 Z" fill={w.bahanTerang} opacity={0.55} />
  </>
);

export const IKON_UMUM: Record<string, Gambar> = {
  pohon,
  kelapa,
  bukit,
  gunung,
  'gunung-api': gunungApi,
  pondok,
  'rumah-panjang': rumahPanjang,
  kampung,
  masjid,
  gereja,
  candi,
  benteng,
  dermaga,
  perahu,
  'kapal-layar': kapalLayar,
  sawah,
  makam,
};

/** Ikon umum di titik (x, y) layar; `nyala` 0..1 memberi pendar pelita, `muncul` 0..1 skala dan opacity. */
export const IkonPeta: React.FC<{ nama: string; x: number; y: number; w: WarnaPeta; nyala?: number; muncul?: number; ukuran?: number }> = ({
  nama,
  x,
  y,
  w,
  nyala = 0,
  muncul = 1,
  ukuran = PETA.ikonUmum,
}) => {
  const g = IKON_UMUM[nama];
  if (!g || muncul <= 0) return null;
  const s = (ukuran / 40) * (0.9 + 0.1 * muncul);
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={muncul}>
      {nyala > 0 ? <ellipse cx={0} cy={-14} rx={26} ry={22} fill="url(#pendar-pelita)" opacity={nyala} /> : null}
      {g(w, nyala)}
    </g>
  );
};
