// Efek suasana per adegan (setelan EFEK_ADEGAN): digambar kode, deterministik (random() dengan seed tetap), tanpa berkas.
// Warna hanya dari token merek. Efek berposisi (kedip-pelita, debu-cahaya) ikut transform Ken Burns ilustrasinya,
// jadi tetap menempel di benda yang sama saat gambar bergerak; kabut, hujan, dan vinyet menempel ke layar.
import React from 'react';
import { AbsoluteFill, interpolate, random, useCurrentFrame } from 'remotion';
import { KANVAS, WARNA } from '../lib/merek';

export type NamaEfek = 'kedip-pelita' | 'debu-cahaya' | 'kabut' | 'hujan' | 'vinyet-hening' | 'denyut-gelap';

/**
 * Satu efek di satu adegan. `x`, `y`: pusat dalam % kanvas (kedip-pelita: posisi nyala; debu-cahaya: pusat area cahaya).
 * `lebar`, `tinggi`: ukuran area dalam % kanvas (debu-cahaya; kabut memakai `tinggi` sebagai tebal pita). `kuat`: pengali 0–2 (bawaan 1).
 * hujan: `kuat` mengatur kerapatan dan keterangan garis hujan; `x` dipakai sebagai kemiringan angin dalam derajat (bawaan 12, negatif = miring ke kiri).
 * denyut-gelap: `x` = detak per menit (bawaan 72), `kuat` = pengali gelap.
 */
export type EfekAdegan = { efek: NamaEfek; x?: number; y?: number; lebar?: number; tinggi?: number; kuat?: number };

const jepit = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
const hex = (warna: string, alfa: number) => warna.slice(0, 7) + Math.round(Math.min(1, Math.max(0, alfa)) * 255).toString(16).padStart(2, '0');

/**
 * Kedip tak beraturan 0..1 seperti nyala minyak: ayunan lambat, getar cepat kecil, dan sesekali surut
 * (gabungan sinus berfrekuensi tak sebanding, diacak per seed, lalu dipertajam).
 */
function kedip(f: number, seed: string) {
  const t = f / KANVAS.fps;
  const fase = (i: number) => random(`${seed}-${i}`) * Math.PI * 2;
  const v =
    0.42 * Math.sin(t * 1.7 + fase(1)) +
    0.26 * Math.sin(t * 4.3 + fase(2)) +
    0.18 * Math.sin(t * 9.1 + fase(3)) +
    0.14 * Math.sin(t * 17.3 + fase(4));
  const surut = Math.max(0, Math.sin(t * 0.9 + fase(5))) ** 6; // sesekali nyala mengecil sejenak
  const k = 0.5 + 0.5 * v - 0.45 * surut;
  return Math.min(1, Math.max(0, (k - 0.5) * 1.35 + 0.5));
}

/**
 * Nyala pelita: inti pendar di posisi lampu yang membesar-mengecil, cahaya ruangan amber yang ikut terang-redup,
 * dan tepi ruangan yang sedikit menggelap saat nyala mengecil. `kuat` mengatur besarnya denyut.
 */
const KedipPelita: React.FC<{ e: EfekAdegan; seed: string }> = ({ e, seed }) => {
  const f = useCurrentFrame();
  const kuat = e.kuat ?? 1;
  const k = kedip(f, seed);
  const x = e.x ?? 50, y = e.y ?? 50;
  const px = (persen: number) => (persen * KANVAS.lebar) / 100;
  const rInti = 15 + 9 * k; // % lebar kanvas
  return (
    <>
      <AbsoluteFill
        style={{
          mixBlendMode: 'screen',
          opacity: Math.min(1, kuat * (0.35 + 0.65 * k)),
          background: `radial-gradient(circle ${px(rInti)}px at ${x}% ${y}%, ${hex(WARNA.pelita, 0.9)} 0%, ${hex(WARNA.pelita, 0.4)} 28%, ${hex(WARNA.pelita, 0.1)} 62%, ${hex(WARNA.pelita, 0)} 100%)`,
        }}
      />
      <AbsoluteFill
        style={{
          mixBlendMode: 'screen',
          opacity: Math.min(1, kuat * 0.6 * k),
          background: `radial-gradient(circle ${px(85)}px at ${x}% ${y}%, ${hex(WARNA.pelita, 0.6)} 0%, ${hex(WARNA.pelita, 0.22)} 50%, ${hex(WARNA.pelita, 0)} 100%)`,
        }}
      />
      <AbsoluteFill
        style={{
          opacity: Math.min(1, kuat * 0.55 * (1 - k)),
          background: `radial-gradient(circle ${px(90)}px at ${x}% ${y}%, ${hex(WARNA.latar, 0)} 25%, ${hex(WARNA.latar, 0.75)} 100%)`,
        }}
      />
    </>
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

/**
 * Hujan: garis-garis tipis yang jatuh miring tertiup angin, dua lapis (jauh: kecil, lambat, redup; dekat: panjang, cepat,
 * lebih terang), ditambah selubung kelabu tipis agar gambar terasa basah. Posisi tiap tetes deterministik per seed.
 */
const Hujan: React.FC<{ e: EfekAdegan; seed: string }> = ({ e, seed }) => {
  const f = useCurrentFrame();
  const kuat = Math.min(2, e.kuat ?? 1);
  const sudut = e.x ?? 12;
  const geserPerPx = Math.tan((sudut * Math.PI) / 180);
  const lapis = [
    { n: 110, panjang: [40, 70], tebal: 2, laju: [40, 55], alfa: 0.4 },
    { n: 50, panjang: [90, 150], tebal: 3.5, laju: [72, 95], alfa: 0.62 },
  ];
  const W = KANVAS.lebar, H = KANVAS.tinggi;
  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      <AbsoluteFill style={{ background: hex(WARNA.latar, 0.12 * kuat) }} />
      {lapis.flatMap((l, li) =>
        Array.from({ length: Math.round(l.n * kuat) }, (_, i) => {
          const r = (k: string) => random(`${seed}-hujan-${li}-${i}-${k}`);
          const panjang = l.panjang[0] + (l.panjang[1] - l.panjang[0]) * r('p');
          const laju = l.laju[0] + (l.laju[1] - l.laju[0]) * r('v'); // px per frame
          const rentang = H + panjang + 200;
          const y = ((r('y') * rentang + f * laju) % rentang) - panjang - 100;
          const x = ((r('x') * (W + 400) - 200 + y * geserPerPx) % (W + 400) + (W + 400)) % (W + 400) - 200;
          return (
            <div
              key={`${li}-${i}`}
              style={{
                position: 'absolute',
                left: x,
                top: y,
                width: l.tebal,
                height: panjang,
                transform: `rotate(${-sudut}deg)`,
                background: `linear-gradient(to bottom, ${hex(WARNA.tinta, 0)}, ${hex(WARNA.tinta, Math.min(1, l.alfa * kuat))})`,
                borderRadius: l.tebal,
              }}
            />
          );
        }),
      )}
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

/**
 * Tepi layar menggelap berdenyut seperti detak jantung (dug-dug, lalu jeda). `x`: detak per menit (bawaan 72);
 * `kuat`: pengali gelap (bawaan 1). Dasar gelapnya tipis, puncak denyut menutup tepi lebih rapat.
 */
const DenyutGelap: React.FC<{ e: EfekAdegan }> = ({ e }) => {
  const f = useCurrentFrame();
  const kuat = e.kuat ?? 1;
  const periode = (60 / (e.x ?? 72)) * KANVAS.fps;
  const t = (f % periode) / periode; // 0..1 dalam satu detak
  const pulsa = (pusat: number, lebar: number) => Math.exp(-(((t - pusat) / lebar) ** 2));
  const denyut = Math.min(1, pulsa(0.06, 0.05) + 0.7 * pulsa(0.24, 0.05));
  const opacity = Math.min(1, kuat * (0.35 + 0.45 * denyut));
  return <AbsoluteFill style={{ opacity, background: `radial-gradient(ellipse at 50% 45%, ${hex(WARNA.latar, 0)} 40%, ${hex(WARNA.latar, 0.97)} 100%)` }} />;
};

/**
 * Butiran film abu-abu di seluruh layar (setelan BUTIRAN_FILM), berganti pola tiap 2 frame seperti film tua.
 * Tanpa warna merek: derau dibuat abu-abu lalu dicampur lewat overlay, jadi hanya mengubah tekstur, bukan rona.
 */
export const ButiranFilm: React.FC<{ kuat: number }> = ({ kuat }) => {
  const f = useCurrentFrame();
  const pola = Math.floor(f / 2) % 24;
  return (
    <AbsoluteFill style={{ opacity: Math.min(1, 0.18 * kuat), mixBlendMode: 'overlay', pointerEvents: 'none' }}>
      <svg width="100%" height="100%" viewBox={`0 0 ${KANVAS.lebar} ${KANVAS.tinggi}`} preserveAspectRatio="none">
        <filter id={`butiran-${pola}`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={2} seed={pola + 1} stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#butiran-${pola})`} />
      </svg>
    </AbsoluteFill>
  );
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
    case 'hujan':
      return <Hujan e={e} seed={seed} />;
    case 'denyut-gelap':
      return <DenyutGelap e={e} />;
    case 'vinyet-hening':
      return <VinyetHening e={e} durasi={durasi} />;
    default:
      return null;
  }
};
