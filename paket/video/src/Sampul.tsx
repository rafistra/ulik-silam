import React from 'react';
import { AbsoluteFill } from 'remotion';
import { DAFTAR_ADEGAN } from './data/adegan';
import { pasangData, type DataVideo } from './data/pasang';
import { SAMPUL_ADEGAN } from './data/setelan';
import { BAGIAN_SERI, JUDUL_SAMPUL, LAPISAN, LATAR } from './data/proyek';
import { Ilustrasi } from './komponen/Ilustrasi';
import { LabelLapisan } from './komponen/LabelLapisan';
import { Tanda } from './komponen/Tanda';
import { ASET } from './lib/data';
import { muatFont } from './lib/font';
import { TIPE, WARNA, ZONA } from './lib/merek';
import { jepitPosisi, POSISI_BAWAAN, POTONG_TIKTOK, type PlatformSampul, type PosisiSampul } from './lib/sampul';

/**
 * Sampul 1080 × 1920 per platform: gambar sampul khusus (`public/ilustrasi/sampul.*`) atau ilustrasi adegan SAMPUL_ADEGAN,
 * label lapisan, lalu di kiri bawah bagian seri (gaya label, pelita) + latar, judul, dan tanda logo. Tanpa wordmark.
 *
 * `posisi`: gambar digeser (% kanvas) dan diperbesar sesuai seretan di katalog; celah yang terbuka diisi gambar yang sama
 * diburamkan. `platform` "tiktok": label lapisan turun ke dalam potongan 3:4 grid profil TikTok (POTONG_TIKTOK).
 */
export const Sampul: React.FC<{ data: DataVideo; platform?: PlatformSampul; posisi?: PosisiSampul }> = ({ data, platform = 'youtube', posisi = POSISI_BAWAAN }) => {
  pasangData(data);
  // Font dimuat di halaman render itu sendiri (calculateMetadata berjalan di halaman lain saat render still).
  muatFont(data.basisFont);
  const a = DAFTAR_ADEGAN.find((x) => x.nomor === SAMPUL_ADEGAN) ?? DAFTAR_ADEGAN[0];
  const src = ASET.sampul ?? ASET.ilustrasi(a.nomor);
  // Adegan berklip video: sampul memakai frame pertama klip.
  const detikKlip = ASET.sampul ? null : ASET.klip(a.nomor);
  const klip = detikKlip ? { detik: detikKlip, frameAwal: 0 } : null;
  const p = jepitPosisi(posisi);
  return (
    <AbsoluteFill style={{ background: WARNA.latar }}>
      <Ilustrasi nomor={a.nomor} src={src} gerak="zoom-masuk" kemajuan={0} visual={a.visual} blur={32} klip={klip} />
      <AbsoluteFill style={{ background: WARNA.latar, opacity: 0.5 }} />
      <AbsoluteFill style={{ transform: `translate(${p.x}%, ${p.y}%) scale(${p.skala})` }}>
        <Ilustrasi nomor={a.nomor} src={src} gerak="zoom-masuk" kemajuan={0} visual={a.visual} klip={klip} />
      </AbsoluteFill>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 1400,
          background: `linear-gradient(to top, ${WARNA.bayang} 0%, ${WARNA.bayang} 60%, transparent 100%)`,
        }}
      />
      <LabelLapisan lapisan={LAPISAN} atas={platform === 'tiktok' ? POTONG_TIKTOK.labelAtas : undefined} />
      <div style={{ position: 'absolute', left: ZONA.kiri, right: ZONA.kanan, bottom: 520, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {BAGIAN_SERI || LATAR ? (
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, flexWrap: 'wrap' }}>
            {BAGIAN_SERI ? <span style={{ ...TIPE.label, color: WARNA.pelita }}>{BAGIAN_SERI}</span> : null}
            {BAGIAN_SERI && LATAR ? <span style={{ ...TIPE.keterangan, color: WARNA.tintaRedup }}>·</span> : null}
            {LATAR ? <span style={{ ...TIPE.keterangan, color: WARNA.tintaRedup }}>{LATAR}</span> : null}
          </div>
        ) : null}
        <div
          style={{
            ...TIPE.judulSampul,
            color: WARNA.tinta,
            textWrap: 'balance',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            // Ruang ekor huruf (g, p, y) baris terakhir: tinggi baris sama dengan ukuran huruf, jadi tanpa ini terpotong.
            paddingBottom: 28,
            marginBottom: -28,
          }}
        >
          {JUDUL_SAMPUL}
        </div>
      </div>
      <div style={{ position: 'absolute', left: ZONA.kiri, bottom: 420 }}>
        <Tanda ukuran={64} />
      </div>
    </AbsoluteFill>
  );
};
