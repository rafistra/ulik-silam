import React from 'react';
import { AbsoluteFill, Freeze, Img, OffthreadVideo } from 'remotion';
import type { Gerak } from '../data/adegan';
import { ADEGAN, FOTO_UTUH, HURUF, KANVAS, WARNA } from '../lib/merek';
import { dua } from '../lib/data';

/** Ken Burns khusus (setelan tangan): skala dan geser vertikal (% tinggi kanvas, negatif = gambar naik) dari awal ke akhir. */
export type KenBurnsKhusus = { skala: [number, number]; geserY: [number, number] };

/** Transform Ken Burns untuk kemajuan 0..1. Linear, agar gerak bisa diteruskan tanpa lompatan. */
export function kenBurns(gerak: Gerak, kemajuan: number, khusus?: KenBurnsKhusus): string {
  const k = Math.min(1, Math.max(0, kemajuan));
  if (khusus) {
    const antara = ([a, b]: [number, number]) => a + (b - a) * k;
    return `scale(${antara(khusus.skala)}) translateY(${antara(khusus.geserY)}%)`;
  }
  const maks = ADEGAN.zoomMaks;
  const min = 1.02;
  switch (gerak) {
    case 'zoom-masuk':
      return `scale(${min + (maks - min) * k})`;
    case 'zoom-keluar':
      return `scale(${maks - (maks - min) * k})`;
    case 'geser-atas':
      return `scale(1.12) translateY(${4 - 8 * k}%)`;
    case 'geser-bawah':
      return `scale(1.12) translateY(${-4 + 8 * k}%)`;
  }
}

export const Ilustrasi: React.FC<{
  nomor: number;
  src: string | null;
  gerak: Gerak;
  kemajuan: number;
  visual: string;
  blur?: number;
  kenBurnsKhusus?: KenBurnsKhusus;
  /** Foto asli: tampil utuh tanpa dipotong, di atas foto yang sama yang diburamkan. */
  utuh?: boolean;
  /**
   * Ilustrasi berupa klip video: `detik` = panjang klip, `frameAwal` = frame klip pada frame 0 Sequence pemanggil
   * (kartu Ulikan melanjutkan klip adegan terakhir). Klip diputar tanpa suara; setelah habis, frame terakhirnya ditahan.
   */
  klip?: { detik: number; frameAwal?: number } | null;
}> = ({ nomor, src, gerak, kemajuan, visual, blur = 0, kenBurnsKhusus, utuh = false, klip = null }) => {
  const transform = kenBurns(gerak, kemajuan, kenBurnsKhusus);
  const filter = blur > 0 ? `blur(${blur}px)` : undefined;
  if (src && klip) {
    // Klip diputar berurutan (OffthreadVideo menahan frame terakhirnya sendiri bila Sequence lebih panjang).
    // Membekukan frame per frame dengan <Freeze> membuat cache compositor kehabisan frame ("No frame found").
    const akhirKlip = Math.max(0, Math.floor(klip.detik * KANVAS.fps) - 1);
    const awal = Math.max(0, Math.round(klip.frameAwal ?? 0));
    const gaya = { width: '100%', height: '100%', objectFit: 'cover', transform, filter } as const;
    return (
      <AbsoluteFill style={{ overflow: 'hidden', backgroundColor: WARNA.latar }}>
        {awal >= akhirKlip ? (
          // Klip sudah habis sebelum Sequence ini mulai: tahan frame terakhirnya (satu posisi tetap).
          <Freeze frame={akhirKlip}>
            <OffthreadVideo src={src} muted style={gaya} />
          </Freeze>
        ) : (
          <OffthreadVideo src={src} muted trimBefore={awal > 0 ? awal : undefined} style={gaya} />
        )}
      </AbsoluteFill>
    );
  }
  if (src && utuh) {
    const k = Math.min(1, Math.max(0, kemajuan));
    const [a, b] = FOTO_UTUH.skala;
    return (
      <AbsoluteFill style={{ overflow: 'hidden', backgroundColor: WARNA.latar }}>
        <Img
          src={src}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.15)', filter: `blur(${FOTO_UTUH.blur}px)` }}
        />
        <AbsoluteFill style={{ backgroundColor: WARNA.latar, opacity: FOTO_UTUH.peredup }} />
        <Img src={src} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', transform: `scale(${a + (b - a) * k})` }} />
      </AbsoluteFill>
    );
  }
  if (src)
    return (
      <AbsoluteFill style={{ overflow: 'hidden' }}>
        <Img src={src} style={{ width: '100%', height: '100%', objectFit: 'cover', transform, filter }} />
      </AbsoluteFill>
    );
  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      <AbsoluteFill
        style={{
          transform,
          filter,
          background: `radial-gradient(ellipse at 50% 45%, ${WARNA.tanah} 0%, ${WARNA.latar} 75%)`,
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 120,
            right: 200,
            top: 640,
            color: WARNA.tintaRedup,
            fontFamily: HURUF.sans,
            fontSize: 30,
            lineHeight: '42px',
            fontWeight: 500,
          }}
        >
          <div style={{ fontSize: 44, fontWeight: 800, letterSpacing: '0.12em', marginBottom: 24 }}>ADEGAN {dua(nomor)}</div>
          <div style={{ marginBottom: 24 }}>{visual}</div>
          <div style={{ opacity: 0.8 }}>public/ilustrasi/adegan-{dua(nomor)}.png</div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
