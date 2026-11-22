// Durasi rekaman narasi per adegan (detik) dan pemuatan font; dipakai calculateMetadata dan Player katalog.
import { getAudioDurationInSeconds } from '@remotion/media-utils';
import { DAFTAR_ADEGAN } from '../data/adegan';
import { pasangData, type DataVideo } from '../data/pasang';
import { ASET } from './data';
import { muatFont } from './font';

export async function hitungDurasiNarasi(data: DataVideo, hanyaFont = false): Promise<(number | null)[]> {
  pasangData(data);
  await muatFont(data.basisFont);
  if (hanyaFont) return [];
  return Promise.all(
    DAFTAR_ADEGAN.map((a) => {
      const src = ASET.narasi(a.nomor);
      return src ? getAudioDurationInSeconds(src).catch(() => null) : Promise.resolve(null);
    }),
  );
}
