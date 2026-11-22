import React from 'react';
import { Composition, Still, type CalculateMetadataFunction } from 'remotion';
import { pasangData, type DataVideo } from './data/pasang';
import { hitungDurasiNarasi } from './lib/durasi';
import { hitungLini } from './lib/lini';
import { KANVAS } from './lib/merek';
import { Sampul } from './Sampul';
import { LembarIkon } from './peta/LembarIkon';
import { Video, type PropsVideo } from './Video';

/** m:ss,d — satu desimal, agar kelebihan di bawah satu detik tetap terlihat. */
const mmss = (d: number) => `${Math.floor(d / 60)}:${(d % 60).toFixed(1).padStart(4, '0').replace('.', ',')}`;

// Props bawaan kosong; data proyek selalu dikirim lewat --props (lihat paket/video/render.mjs) atau Player katalog.
const KOSONG = { data: null as unknown as DataVideo, durasiNarasi: [] } as PropsVideo;

const metadataVideo: CalculateMetadataFunction<PropsVideo> = async ({ props }) => {
  if (!props.data) throw new Error('Data proyek belum dikirim. Jalankan lewat: node paket/video/render.mjs <slug> (atau --studio).');
  pasangData(props.data);
  const durasiNarasi = await hitungDurasiNarasi(props.data);
  const { total } = hitungLini(durasiNarasi);
  const detik = total / KANVAS.fps;
  const maks = props.data.proyek.durasiMaksDetik;
  if (detik > maks) console.warn(`PERINGATAN: durasi video ${mmss(detik)} melebihi batas ${mmss(maks)} (lebih ${(detik - maks).toFixed(1)} dtk).`);
  return { durationInFrames: total, props: { ...props, durasiNarasi } };
};

const metadataStill: CalculateMetadataFunction<{ data: DataVideo; geserBawah?: number }> = async ({ props }) => {
  pasangData(props.data);
  await hitungDurasiNarasi(props.data, true);
  return {};
};

export const Root: React.FC = () => (
  <>
    <Composition id="VideoUlikSilam" component={Video} width={KANVAS.lebar} height={KANVAS.tinggi} fps={KANVAS.fps} durationInFrames={1} defaultProps={KOSONG} calculateMetadata={metadataVideo} />
    <Still id="Sampul" component={Sampul} width={KANVAS.lebar} height={KANVAS.tinggi} defaultProps={{ data: KOSONG.data, geserBawah: 0 }} calculateMetadata={metadataStill} />
    <Still id="LembarIkon" component={LembarIkon} width={KANVAS.lebar} height={KANVAS.tinggi} defaultProps={{ data: KOSONG.data }} calculateMetadata={metadataStill} />
  </>
);
