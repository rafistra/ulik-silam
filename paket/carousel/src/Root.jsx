// Komposisi Remotion carousel: satu frame per slide, ditambah satu frame lembar kontak di akhir.
import React from 'react';
import { AbsoluteFill, Composition, Img, staticFile, useCurrentFrame } from 'remotion';
import { loadFont } from '@remotion/fonts';
import { Slide, LembarKontak, PLATFORM } from './Slide.jsx';

const FONT = [
  ['Cormorant Garamond', 'cormorant-garamond-latin-500-normal.woff2', '500', 'normal'],
  ['Cormorant Garamond', 'cormorant-garamond-latin-600-normal.woff2', '600', 'normal'],
  ['Cormorant Garamond', 'cormorant-garamond-latin-500-italic.woff2', '500', 'italic'],
  ['Plus Jakarta Sans', 'plus-jakarta-sans-latin-500-normal.woff2', '500', 'normal'],
  ['Plus Jakarta Sans', 'plus-jakarta-sans-latin-700-normal.woff2', '700', 'normal'],
  ['Plus Jakarta Sans', 'plus-jakarta-sans-latin-800-normal.woff2', '800', 'normal'],
];
let font = null;
const muatFont = () => (font ??= Promise.all(FONT.map(([family, f, weight, style]) => loadFont({ family, url: staticFile(`font/${f}`), weight, style, format: 'woff2' }))));

const media = {
  url: (rel) => staticFile(rel),
  Img,
  get tanda() {
    return staticFile('merek/mata-nyala.svg');
  },
  get wordmark() {
    return staticFile('merek/wordmark-krem.svg');
  },
};

function Carousel({ data, platform, draf }) {
  muatFont();
  const f = useCurrentFrame();
  const c = data.carousel;
  const s = c.slide[f];
  return (
    <AbsoluteFill>
      {s ? (
        <Slide s={s} c={c} a={data.aset[s.nomor]} pl={platform} total={c.slide.length} media={media} draf={draf} />
      ) : (
        <LembarKontak c={c} aset={data.aset} pl={platform} media={media} draf={draf} />
      )}
    </AbsoluteFill>
  );
}

const metadata = async ({ props }) => {
  if (!props.data) throw new Error('Data carousel belum dikirim. Jalankan lewat: npm run carousel -- <slug>');
  await muatFont();
  const P = PLATFORM[props.platform] || PLATFORM.tiktok;
  return { width: P.w, height: P.h, durationInFrames: props.data.carousel.slide.length + 1, fps: 1 };
};

export const Root = () => (
  <Composition id="Carousel" component={Carousel} width={1080} height={1920} fps={1} durationInFrames={1} defaultProps={{ data: null, platform: 'tiktok', draf: false }} calculateMetadata={metadata} />
);
