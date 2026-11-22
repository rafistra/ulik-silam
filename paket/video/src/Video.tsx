import React, { useMemo } from 'react';
import { AbsoluteFill, interpolate, Sequence, useCurrentFrame } from 'remotion';
import { pasangData, type DataVideo } from './data/pasang';
import { LAPISAN, ULIKAN } from './data/proyek';
import { LapisanAudio } from './komponen/Audio';
import { GradasiAtas, GradasiBawah } from './komponen/GradasiBawah';
import { Ilustrasi } from './komponen/Ilustrasi';
import { DATA_PETA } from './data/peta';
import { PetaRute } from './peta/PetaRute';
import { KartuUlikan } from './komponen/KartuUlikan';
import { LabelLapisan } from './komponen/LabelLapisan';
import { Subtitle } from './komponen/Subtitle';
import { TeksLayar } from './komponen/TeksLayar';
import { ASET, JEDA_NARASI } from './lib/data';
import { muatFont } from './lib/font';
import { hitungLini, jedaTerakhir, keWaktuNarasi, type AdeganLini } from './lib/lini';
import { ADEGAN, KANVAS, KARTU_ULIKAN, LABEL_LAPISAN, WARNA } from './lib/merek';
import { kunciPerPotongan, pecahSubtitle, samarkan, waktuDariFrasa, waktuSubtitle } from './lib/subtitle';
import { ADEGAN_FOTO_UTUH, FRASA_NARASI, GELAP_AWAL, POTONG_SUBTITLE, SAMARKAN_SUBTITLE, TEKS_LAYAR_BAIT } from './data/setelan';

export type PropsVideo = { data: DataVideo; durasiNarasi: (number | null)[] };

const jepit = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

const LapisanIlustrasi: React.FC<{ a: AdeganLini }> = ({ a }) => {
  const f = useCurrentFrame();
  const panjang = a.vAkhir - a.vMulai;
  const masuk = a.masuk === 'crossfade' ? ADEGAN.crossfade : ADEGAN.pudarBabak;
  let opacity = a.masuk === 'langsung' ? 1 : interpolate(f, [0, masuk], [0, 1], jepit);
  if (a.keluar === 'latar') opacity *= interpolate(f, [panjang - ADEGAN.pudarBabak, panjang], [1, 0], jepit);
  // GELAP_SESUDAH: gambar memudar ke latar sebelum celah hening berlayar gelap di akhir adegan (pudar sedikit lebih pelan).
  if (a.gelapSesudah > 0) {
    const g = panjang - (a.vAkhir - a.akhir) - a.gelapSesudah;
    opacity *= interpolate(f, [g - ADEGAN.pudarBabak * 2, g], [1, 0], jepit);
  }
  // Adegan peta animasi: digambar PetaRute bila datanya ada; selain itu ilustrasi cadangan dari prompt adegan.
  const asetPeta = a.peta && DATA_PETA[a.nomor] ? ASET.peta(a.nomor) : null;
  if (asetPeta)
    return (
      <AbsoluteFill style={{ opacity }}>
        <PetaRute
          nomor={a.nomor}
          aset={asetPeta}
          narasi={a.narasi}
          narasiMulai={a.narasiMulai - a.mulai}
          narasiDurasi={a.narasiDurasi}
          durasi={a.durasi}
        />
      </AbsoluteFill>
    );
  return (
    <AbsoluteFill style={{ opacity }}>
      <Ilustrasi
        nomor={a.nomor}
        src={ASET.ilustrasi(a.nomor)}
        gerak={a.gerak}
        kenBurnsKhusus={a.kenBurns}
        utuh={ADEGAN_FOTO_UTUH.includes(a.nomor)}
        visual={a.visual}
        kemajuan={f / (a.kbAkhir - a.vMulai)}
      />
    </AbsoluteFill>
  );
};

/** Layar gelap di awal adegan (GELAP_AWAL), menutup ilustrasi sebelumnya yang masih ditahan, lalu memudar. */
const LapisanGelap: React.FC<{ frame: number }> = ({ frame }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{ background: WARNA.latar, opacity: interpolate(f, [frame, frame + ADEGAN.pudarBabak], [1, 0], jepit) }}
    />
  );
};

const TeksAdegan: React.FC<{ a: AdeganLini }> = ({ a }) => {
  const f = useCurrentFrame();
  // teks layar: berurutan, dibagi rata sepanjang adegan; atau satu teks di akhir adegan (setelan teksLayarAkhir).
  // Adegan di TEKS_LAYAR_BAIT menampilkan semua barisnya bersama sebagai satu bait (mis. gurindam dua baris).
  const daftarTeks = TEKS_LAYAR_BAIT.includes(a.nomor) && a.teksLayar.length > 1 ? [a.teksLayar.join('\n')] : a.teksLayar;
  const n = daftarTeks.length;
  const akhirSaja = n === 1 && a.teksLayarAkhir != null;
  const ruang = akhirSaja ? Math.min(a.durasi - 12, Math.round(a.teksLayarAkhir! * KANVAS.fps)) : a.durasi - 12;
  const awalTeks = akhirSaja ? a.durasi - 6 - ruang : 6;
  const iTeks = n ? (f < awalTeks ? (akhirSaja ? -1 : 0) : Math.min(n - 1, Math.floor((f - awalTeks) / (ruang / n)))) : -1;
  const tMulai = awalTeks + Math.max(0, iTeks) * (ruang / n);
  const tAkhir = tMulai + ruang / n;
  const opTeks = n ? interpolate(f, [tMulai, tMulai + 10, tAkhir - 10, tAkhir], [0, 1, 1, 0], jepit) : 0;
  // subtitle
  const manual = useMemo(() => {
    const m = POTONG_SUBTITLE[a.nomor];
    const rapi = (s: string) => s.replace(/\s+/g, ' ').trim();
    return m && rapi(m.join(' ')) === rapi(a.narasi) ? m : null;
  }, [a.nomor, a.narasi]);
  const potongan = useMemo(() => manual ?? pecahSubtitle(a.narasi), [manual, a.narasi]);
  const kunci = useMemo(() => kunciPerPotongan(potongan, a.kataKunci), [potongan, a.kataKunci]);
  const awal = a.narasiMulai - a.mulai;
  const panjang = a.narasiDurasi ?? Math.max(1, a.durasi - awal - 18);
  const waktu = useMemo(() => {
    const jeda = a.narasiDurasi == null ? [] : JEDA_NARASI(a.nomor).map(([s, e]) => [s * KANVAS.fps, e * KANVAS.fps] as [number, number]);
    const frasa = FRASA_NARASI[a.nomor];
    const dariFrasa = frasa && a.narasiDurasi != null ? waktuDariFrasa(potongan, frasa, panjang, jeda) : null;
    return dariFrasa ?? waktuSubtitle(potongan, panjang, jeda, manual ? 12 : 0);
  }, [potongan, panjang, a.narasiDurasi, a.nomor, manual]);
  // Waktu video → waktu rekaman narasi; selama jeda sisipan (SISIP_JEDA) subtitle kosong, dan potongan yang
  // sudah tampil sebelum jeda tidak muncul lagi sesudahnya (subtitle berikutnya menunggu narator bicara lagi).
  const r = keWaktuNarasi(a.sisip, f - awal);
  const jeda = jedaTerakhir(a.sisip, f - awal);
  const iSub = r == null ? -1 : waktu.findIndex(([m, z]) => r >= m && r < z && m >= jeda);
  return (
    <>
      {iTeks >= 0 ? <GradasiAtas opacity={opTeks} /> : null}
      {iTeks >= 0 ? <TeksLayar teks={daftarTeks[iTeks]} posisi={a.posisiTeksLayar} opacity={opTeks} /> : null}
      {iSub >= 0 ? <Subtitle teks={samarkan(potongan[iSub], SAMARKAN_SUBTITLE)} kataKunci={kunci[iSub]} /> : null}
    </>
  );
};

/** Gradasi di bawah adegan; di kartu Ulikan dilanjutkan dan dipudarkan oleh KartuUlikan sendiri. */
const Gradasi: React.FC = () => <GradasiBawah opacity={1} />;

const Label: React.FC = () => {
  const f = useCurrentFrame();
  const opacity = interpolate(f, [0, LABEL_LAPISAN.fade, LABEL_LAPISAN.durasi - LABEL_LAPISAN.fade, LABEL_LAPISAN.durasi], [0, 1, 1, 0], jepit);
  return <LabelLapisan lapisan={LAPISAN} opacity={opacity} />;
};

export const Video: React.FC<PropsVideo> = ({ data, durasiNarasi }) => {
  pasangData(data);
  // Font dimuat di setiap halaman render; calculateMetadata tidak berjalan di tab render.
  muatFont(data.basisFont);
  const lini = useMemo(() => hitungLini(durasiNarasi), [data, durasiNarasi]);
  const terakhir = lini.adegan[lini.adegan.length - 1];
  return (
    <AbsoluteFill style={{ background: WARNA.latar }}>
      {lini.adegan.map((a) => (
        <Sequence key={`v${a.nomor}`} from={a.vMulai} durationInFrames={a.vAkhir - a.vMulai} name={`Ilustrasi ${a.nomor}`}>
          <LapisanIlustrasi a={a} />
        </Sequence>
      ))}
      <Sequence from={0} durationInFrames={lini.kartuMulai} name="Gradasi">
        <Gradasi />
      </Sequence>
      {lini.adegan
        .filter((a) => GELAP_AWAL[a.nomor])
        .map((a) => (
          <Sequence key={`g${a.nomor}`} from={a.mulai} durationInFrames={GELAP_AWAL[a.nomor] + ADEGAN.pudarBabak} name={`Gelap ${a.nomor}`}>
            <LapisanGelap frame={GELAP_AWAL[a.nomor]} />
          </Sequence>
        ))}
      {lini.adegan.map((a) => (
        <Sequence key={`t${a.nomor}`} from={a.mulai} durationInFrames={a.durasi} name={`Teks ${a.nomor}`}>
          <TeksAdegan a={a} />
        </Sequence>
      ))}
      <Sequence from={lini.adegan[0].mulai} durationInFrames={LABEL_LAPISAN.durasi} name="Label lapisan">
        <Label />
      </Sequence>
      <Sequence from={lini.kartuMulai} durationInFrames={KARTU_ULIKAN.durasi} name="Kartu Ulikan">
        <KartuUlikan
          teks={ULIKAN.teks}
          sumber={ULIKAN.sumber}
          mulai={lini.kartuMulai}
          ilustrasi={{
            nomor: terakhir.nomor,
            src: ASET.ilustrasi(terakhir.nomor),
            gerak: terakhir.gerak,
            visual: terakhir.visual,
            kbMulai: terakhir.vMulai,
            kbAkhir: terakhir.kbAkhir,
          }}
        />
      </Sequence>
      <LapisanAudio lini={lini} />
    </AbsoluteFill>
  );
};
