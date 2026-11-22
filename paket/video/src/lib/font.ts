// Font lokal (woff2 dari @fontsource, lisensi OFL). Tidak memakai @remotion/google-fonts agar render tanpa internet.
import { loadFont } from '@remotion/fonts';
import { urlAset } from './data';

const FONT = [
  { family: 'Cormorant Garamond', berkas: 'cormorant-garamond-latin-500-normal.woff2', weight: '500', style: 'normal' },
  { family: 'Cormorant Garamond', berkas: 'cormorant-garamond-latin-600-normal.woff2', weight: '600', style: 'normal' },
  { family: 'Cormorant Garamond', berkas: 'cormorant-garamond-latin-500-italic.woff2', weight: '500', style: 'italic' },
  { family: 'Plus Jakarta Sans', berkas: 'plus-jakarta-sans-latin-500-normal.woff2', weight: '500', style: 'normal' },
  { family: 'Plus Jakarta Sans', berkas: 'plus-jakarta-sans-latin-700-normal.woff2', weight: '700', style: 'normal' },
  { family: 'Plus Jakarta Sans', berkas: 'plus-jakarta-sans-latin-800-normal.woff2', weight: '800', style: 'normal' },
];

const dimuat = new Map<string, Promise<unknown>>();
/** Muat font dari folder font/ di aset proyek (atau dari `basisFont` bila diisi, misalnya /media/merek/font di katalog). */
export function muatFont(basisFont?: string | null) {
  const kunci = basisFont || '';
  if (!dimuat.has(kunci))
    dimuat.set(
      kunci,
      Promise.all(
        FONT.map((x) =>
          loadFont({ family: x.family, url: basisFont ? `${basisFont}/${x.berkas}` : urlAset(`font/${x.berkas}`), weight: x.weight, style: x.style, format: 'woff2' }),
        ),
      ),
    );
  return dimuat.get(kunci)!;
}
