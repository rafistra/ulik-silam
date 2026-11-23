// Efek suasana per adegan (setelan EFEK_ADEGAN): digambar kode, deterministik (random() dengan seed tetap), tanpa berkas.
// Warna hanya dari token merek. Efek berposisi (kedip-pelita, debu-cahaya) ikut transform Ken Burns ilustrasinya,
// jadi tetap menempel di benda yang sama saat gambar bergerak; kabut dan vinyet menempel ke layar.
import React from 'react';
import { AbsoluteFill, interpolate, random, useCurrentFrame } from 'remotion';
import { KANVAS, WARNA } from '../lib/merek';

export type NamaEfek = 'kedip-pelita' | 'debu-cahaya' | 'kabut' | 'vinyet-hening';

/**
 * Satu efek di satu adegan. `x`, `y`: pusat dalam % kanvas (kedip-pelita: posisi nyala; debu-cahaya: pusat area cahaya).
 * `lebar`, `tinggi`: ukuran area dalam % kanvas (debu-cahaya; kabut memakai `tinggi` dari bawah). `kuat`: pengali 0–2 (bawaan 1).
 */
export type EfekAdegan = { efek: NamaEfek; x?: number; y?: number; lebar?: number; tinggi?: number; kuat?: number };

const jepit = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
const hex = (warna: string, alfa: number) => warna.slice(0, 7) + Math.round(Math.min(1, Math.max(0, alfa)) * 255).toString(16).padStart(2, '0');

/** Kedip tak beraturan 0..1 dari gabungan sinus berfrekuensi tak sebanding, diacak per seed. */
function kedip(f: number, seed: string) {
  const t = f / KANVAS.fps;
  const fase = (i: number) => random(`${seed}-${i}`) * Math.PI * 2;
  const v = 0.5 * Math.sin(t * 2.3 + fase(1)) + 0.3 * Math.sin(t * 5.9 + fase(2)) + 0.2 * Math.sin(t * 13.7 + fase(3));
  return 0.5 + 0.5 * v;
}

/** Pendar amber di posisi pelita, berdenyut seperti nyala minyak. */
const KedipPelita: React.FC<{ e: EfekAdegan; seed: string }> = ({ e, seed }) => {
  const f = useCurrentFrame();
  const kuat = e.kuat ?? 1;
  const k = kedip(f, seed);
  const r = 18 * (0.92 + 0.12 * k); // jari-jari pendar, % lebar kanvas
  return (
    <AbsoluteFill
      style={{
        mixBlendMode: 'screen',
        opacity: Math.min(1, kuat * (0.6 + 0.35 * k)),
        background: `radial-gradient(circle ${(r * KANVAS.lebar) / 100}px at ${e.x ?? 50}% ${e.y ?? 50}%, ${hex(WARNA.pelita, 0.85)} 0%, ${hex(WARNA.pelita, 0.35)} 30%, ${hex(WARNA.pelita, 0.08)} 65%, ${hex(WARNA.pelita, 0)} 100%)`,
      }}
    />
  );
};

/** Butiran debu terang yang melayang pelan di area cahaya; memudar di tepi area. */
const DebuCahaya: React.FC<{ e: EfekAdegan; seed: string }> = ({ e, seed }) => {
  const f = useCurrentFrame();
  const kuat = e.kuat ?? 1;
  const cx = e.x ?? 50, cy = e.y ?? 40, lebar = e.lebar ?? 70, tinggi = e.tinggi ?? 60;
  const jumlah = Math.round(70 * Math.min(2, kuat));
  const t = f / KANVAS.fps;
  return (
    <AbsoluteFill style={{ mixBlendMode: 'screen' }}>
      {Array.from({ length: jumlah }, (_, i) => {
        const r = (k: string) => random(`${seed}-debu-${i}-${k}`);
        // Melayang naik sangat pelan sambil bergoyang; berputar kembali di dalam area (posisi relatif 0..1).
        const px = (r('x') + 0.012 * Math.sin(t * (0.3 + r('fx')) + r('px') * 6)) % 1;
        const py = (((r('y') - t * (0.006 + 0.01 * r('vy'))) % 1) + 1) % 1;
        const dx = (px - 0.5) * 2, dy = (py - 0.5) * 2;
        const tepi = Math.min(1, 1.6 * Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy))); // penuh di sebagian besar area, memudar di tepi
        const kelip = 0.55 + 0.45 * Math.sin(t * (0.8 + 1.6 * r('k')) + r('pk') * 6);
        const ukuran = 6 + 9 * r('u');
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${cx - lebar / 2 + px * lebar}%`,
              top: `${cy - tinggi / 2 + py * tinggi}%`,
              width: ukuran,
              height: ukuran,
              borderRadius: '50%',
              background: WARNA.tinta,
              opacity: Math.min(1, kuat) * 0.95 * tepi * kelip,
              boxShadow: `0 0 ${ukuran * 1.6}px ${ukuran * 0.5}px ${hex(WARNA.pelita, 0.45)}`,
              filter: ukuran > 9 ? 'blur(1.6px)' : 'blur(0.8px)',
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

/** Kabut tipis yang bergeser pelan dalam pita mendatar; `y` pusat pita (% dari atas, bawaan 58, di atas area subtitle), `tinggi` tebal pita. */
const Kabut: React.FC<{ e: EfekAdegan; seed: string }> = ({ e, seed }) => {
  const f = useCurrentFrame();
  const kuat = e.kuat ?? 1;
  const tinggi = e.tinggi ?? 35;
  const y = e.y ?? 58;
  const t = f / KANVAS.fps;
  const geser = (i: number, laju: number) => ((random(`${seed}-kabut-${i}`) * 100 + t * laju) % 160) - 30;
  return (
    <AbsoluteFill style={{ mixBlendMode: 'screen', opacity: Math.min(1, 0.85 * kuat) }}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${geser(i, 1.6 + i * 0.7) - 40}%`,
            top: `${y - tinggi / 2 + (i - 1) * (tinggi / 5)}%`,
            width: '120%',
            height: `${tinggi}%`,
            background: `radial-gradient(ellipse at 50% 60%, ${hex(WARNA.tinta, 0.42 - i * 0.08)} 0%, ${hex(WARNA.tinta, 0)} 70%)`,
            filter: 'blur(40px)',
          }}
        />
      ))}
    </AbsoluteFill>
  );
};

/** Tepi layar menggelap pelan sepanjang adegan (momen hening). */
const VinyetHening: React.FC<{ e: EfekAdegan; durasi: number }> = ({ e, durasi }) => {
  const f = useCurrentFrame();
  const kuat = e.kuat ?? 1;
  const opacity = kuat * interpolate(f, [0, Math.max(1, durasi * 0.8)], [0.25, 0.7], jepit);
  return <AbsoluteFill style={{ opacity, background: `radial-gradient(ellipse at 50% 45%, ${hex(WARNA.latar, 0)} 45%, ${hex(WARNA.latar, 0.95)} 100%)` }} />;
};

export const EFEK_MENEMPEL: NamaEfek[] = ['kedip-pelita', 'debu-cahaya'];

/** Satu efek; `seed` membedakan adegan agar kedip dan debu tidak sama persis. */
export const Efek: React.FC<{ e: EfekAdegan; seed: string; durasi: number }> = ({ e, seed, durasi }) => {
  switch (e.efek) {
    case 'kedip-pelita':
      return <KedipPelita e={e} seed={seed} />;
    case 'debu-cahaya':
      return <DebuCahaya e={e} seed={seed} />;
    case 'kabut':
      return <Kabut e={e} seed={seed} />;
    case 'vinyet-hening':
      return <VinyetHening e={e} durasi={durasi} />;
    default:
      return null;
  }
};
