import React from 'react';
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from 'remotion';
import type { Gerak } from '../data/adegan';
import { KARTU_ULIKAN as K, TIPE, WARNA, ZONA } from '../lib/merek';
import { GradasiBawah } from './GradasiBawah';
import { Ilustrasi } from './Ilustrasi';
import { Tanda, Wordmark } from './Tanda';

/** Rentang angka (1.013–1.251) tidak dipotong di tanda pisah: tampilan saja. */
const sambungRentang = (s: string) => s.replace(/(\d)[–-](\d)/g, (m, a, b) => a + '⁠' + m.slice(1, -1) + '⁠' + b);
/** Tautan markdown di Sumber (`[Kontan](https://...)`) tampil sebagai teksnya saja; URL tidak muat di kartu. */
const tanpaTautan = (s: string) => s.replace(/\[([^\]]+)\]\((?:<[^>]*>|[^)]*)\)/g, '$1');

/**
 * Kartu Ulikan (105 frame) di atas ilustrasi adegan terakhir yang Ken Burns-nya berlanjut,
 * diredupkan (latar 0,72) dan diburamkan (8 px), lalu seluruh layar memudar ke latar.
 */
export const KartuUlikan: React.FC<{
  teks: string;
  sumber: string;
  ilustrasi: { nomor: number; src: string | null; gerak: Gerak; visual: string; kbMulai: number; kbAkhir: number };
  /** Frame global saat kartu mulai, untuk melanjutkan Ken Burns. */
  mulai: number;
}> = ({ teks, sumber, ilustrasi, mulai }) => {
  const f = useCurrentFrame();
  const global = mulai + f;
  const kemajuan = (global - ilustrasi.kbMulai) / (ilustrasi.kbAkhir - ilustrasi.kbMulai);
  const redup = interpolate(f, [0, K.framePeredup], [0, 1], { extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) });
  const masuk = interpolate(f, [0, K.frameMasuk], [0, 1], { extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const pudar = interpolate(f, [K.durasi - K.pudarAkhir, K.durasi], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const adaSumber = sumber.trim() !== '' && sumber.trim() !== '-';
  // Gradasi bawah dipudarkan seiring peredup naik sehingga kegelapan di bagian bawah tetap
  // (1 − a·g)(1 − p) = 1 − a; tanpa ini bagian bawah sempat terang sesaat di gambar terang.
  const alfaBayang = parseInt(WARNA.bayang.slice(7, 9), 16) / 255;
  const p = K.peredup * redup;
  const gradasi = Math.min(1, Math.max(0, (1 - (1 - alfaBayang) / (1 - p)) / alfaBayang));
  return (
    <AbsoluteFill>
      <Ilustrasi {...ilustrasi} kemajuan={kemajuan} blur={K.blur * redup} />
      <GradasiBawah opacity={gradasi} />
      <AbsoluteFill style={{ background: WARNA.latar, opacity: K.peredup * redup }} />
      <div
        style={{
          position: 'absolute',
          left: ZONA.kiri,
          right: ZONA.kanan,
          top: K.atas,
          padding: K.padding,
          borderRadius: K.sudut,
          border: `${K.tebalGaris}px solid ${WARNA.garis}`,
          background: WARNA.latarNaik,
          display: 'flex',
          flexDirection: 'column',
          gap: K.jarak,
          opacity: masuk,
          transform: `translateY(${(1 - masuk) * K.naik}px)`,
        }}
      >
        <div style={{ ...TIPE.label, color: WARNA.pelita }}>Ulikan</div>
        <div style={{ ...TIPE.isi, color: WARNA.tinta, textWrap: 'pretty' }}>{sambungRentang(teks)}</div>
        {adaSumber ? <div style={{ ...TIPE.keterangan, color: WARNA.tintaRedup }}>Sumber: {tanpaTautan(sumber)}</div> : null}
      </div>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: K.logoDariBawah,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: K.jarakLogo,
          opacity: masuk,
        }}
      >
        <Tanda ukuran={K.tanda} />
        <Wordmark tinggi={K.tinggiWordmark} />
      </div>
      <AbsoluteFill style={{ background: WARNA.latar, opacity: pudar }} />
    </AbsoluteFill>
  );
};
