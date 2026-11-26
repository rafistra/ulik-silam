import React from 'react';
import { Html5Audio, interpolate, Sequence } from 'remotion';
import { CUE_MUSIK } from '../data/audio';
import { SETELAN_AUDIO, SETELAN_MUSIK } from '../data/setelan';
import { ASET, SFX_TERPAKAI } from '../lib/data';
import type { Lini } from '../lib/lini';
import { KANVAS } from '../lib/merek';

const RAMPA_HENING = 15;
const FADE_SUASANA = 15;
/** Fade masuk dan keluar SFX di jeda sisipan, frame. */
const FADE_JEDA = 6;

/** Volume musik di frame global t: turun ke musikHening di adegan hening. */
function levelMusik(lini: Lini, t: number): number {
  let faktor = 1;
  for (const a of lini.adegan) {
    if (!a.hening) continue;
    const x = interpolate(t, [a.mulai - RAMPA_HENING, a.mulai, a.akhir, a.akhir + RAMPA_HENING], [0, 1, 1, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    faktor = Math.min(faktor, 1 - x * (1 - SETELAN_AUDIO.musikHening / SETELAN_AUDIO.musik));
  }
  // Musik juga diturunkan selama jeda sisipan, agar tawa dan tangis di celah itu terdengar jelas.
  for (const a of lini.adegan) {
    let geser = 0;
    for (const g of a.sisip) {
      const m = a.narasiMulai + g.pada + geser;
      geser += g.lama;
      const x = interpolate(t, [m - RAMPA_HENING, m, m + g.lama, m + g.lama + RAMPA_HENING], [0, 1, 1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });
      faktor = Math.min(faktor, 1 - x * (1 - SETELAN_AUDIO.musikHening / SETELAN_AUDIO.musik));
    }
  }
  // Celah gelap hening (GELAP_SESUDAH) di akhir adegan: musik diturunkan seperti adegan hening.
  for (const a of lini.adegan) {
    if (!a.gelapSesudah) continue;
    const m = a.akhir - a.gelapSesudah;
    const x = interpolate(t, [m - RAMPA_HENING, m, a.akhir, a.akhir + RAMPA_HENING], [0, 1, 1, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    faktor = Math.min(faktor, 1 - x * (1 - SETELAN_AUDIO.musikHening / SETELAN_AUDIO.musik));
  }
  return SETELAN_AUDIO.musik * faktor;
}

export const LapisanAudio: React.FC<{ lini: Lini }> = ({ lini }) => {
  const xf = Math.round(SETELAN_AUDIO.crossfadeMusik * KANVAS.fps);
  const setengah = Math.round(xf / 2);
  return (
    <>
      {lini.adegan.map((a) => {
        const src = ASET.narasi(a.nomor);
        if (!src) return null;
        // Narasi dipecah di setiap jeda sisipan (SISIP_JEDA): tiap bagian diputar dari posisinya di rekaman,
        // digeser sebesar jumlah jeda sebelumnya.
        const bagian: { dari: number; sampai: number | null; geser: number }[] = [];
        let awal = 0;
        let geser = 0;
        for (const g of a.sisip) {
          bagian.push({ dari: awal, sampai: g.pada, geser });
          awal = g.pada;
          geser += g.lama;
        }
        bagian.push({ dari: awal, sampai: null, geser });
        return bagian.map((b, i) => {
          const mulai = a.narasiMulai + b.dari + b.geser;
          const durasi = b.sampai == null ? a.akhir - mulai : b.sampai - b.dari;
          if (durasi <= 0) return null;
          return (
            <Sequence key={`n${a.nomor}-${i}`} from={mulai} durationInFrames={durasi} name={`Narasi ${a.nomor}${a.sisip.length ? ` (${i + 1})` : ''}`}>
              <Html5Audio src={src} trimBefore={b.dari || undefined} volume={SETELAN_AUDIO.narasi} />
            </Sequence>
          );
        });
      })}

      {lini.adegan.flatMap((a) => {
        let geser = 0;
        return a.sisip.map((g, i) => {
          const src = ASET.sfx(g.sfx);
          const s = SFX_TERPAKAI.find((x) => x.nomor === g.sfx);
          const mulai = a.narasiMulai + g.pada + geser;
          geser += g.lama;
          if (!src || !s) return null;
          return (
            <Sequence key={`j${a.nomor}-${i}`} from={mulai} durationInFrames={g.lama} name={`Jeda ${a.nomor}: SFX ${g.sfx}`}>
              <Html5Audio
                src={src}
                trimBefore={g.dariSfx || undefined}
                volume={(f) =>
                  s.volume * SETELAN_AUDIO.sfx *
                  interpolate(f, [0, FADE_JEDA, g.lama - FADE_JEDA, g.lama], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
                }
              />
            </Sequence>
          );
        });
      })}

      {CUE_MUSIK.map((c, i) => {
        const src = ASET.musik(c.nomor);
        const adegan = lini.adegan.filter((a) => a.babak >= c.babakAwal && a.babak <= c.babakAkhir);
        if (!src || !adegan.length) return null;
        const setelan = SETELAN_MUSIK[c.nomor] ?? {};
        const adeganSunyi = lini.adegan.find((a) => a.nomor === setelan.sunyiMulaiAdegan);
        const pertama = i === 0;
        const terakhir = i === CUE_MUSIK.length - 1;
        const dari = pertama ? adegan[0].mulai : adegan[0].mulai - setengah;
        const sampai = adeganSunyi
          ? adeganSunyi.mulai
          : terakhir
            ? lini.total
            : adegan[adegan.length - 1].akhir + setengah;
        const masuk = pertama ? 15 : xf;
        const keluar = adeganSunyi ? Math.round((setelan.fadeSunyi ?? 1) * KANVAS.fps) : terakhir ? KANVAS.fps : xf;
        const durasi = sampai - dari;
        if (durasi <= 0) return null;
        return (
          <Sequence key={`m${c.nomor}`} from={dari} durationInFrames={durasi} name={`Musik cue ${c.nomor}`}>
            <Html5Audio
              src={src}
              loop={setelan.ulang !== false}
              volume={(f) =>
                levelMusik(lini, dari + f) *
                interpolate(f, [0, masuk, durasi - keluar, durasi], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
              }
            />
          </Sequence>
        );
      })}

      {SFX_TERPAKAI.map((s) => {
        const src = ASET.sfx(s.nomor);
        const a = lini.adegan.find((x) => x.nomor === s.adegan);
        if (!src || !a) return null;
        // SFX yang diputar di jeda sisipan adegannya tidak diputar lagi di jadwal biasa.
        if (a.sisip.some((g) => g.sfx === s.nomor)) return null;
        const dari = Math.max(0, Math.round(s.detik >= 0 ? a.mulai + s.detik * KANVAS.fps : a.akhir + s.detik * KANVAS.fps));
        if (s.ulang) {
          const durasi = Math.max(1, a.akhir - dari);
          return (
            <Sequence key={`s${s.nomor}`} from={dari} durationInFrames={durasi} name={`SFX ${s.nomor} ${s.bunyi}`}>
              <Html5Audio
                src={src}
                loop
                volume={(f) =>
                  s.volume * SETELAN_AUDIO.sfx *
                  interpolate(f, [0, FADE_SUASANA, durasi - FADE_SUASANA, durasi], [0, 1, 1, 0], {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                  })
                }
              />
            </Sequence>
          );
        }
        const jendela = Math.min(lini.total - dari, a.akhir - dari + 3 * KANVAS.fps);
        const durasi = Math.max(1, s.durasi != null ? Math.min(jendela, Math.round(s.durasi * KANVAS.fps)) : jendela);
        // fadeKeluar: SFX memudar ke senyap di akhir durasinya (berkas yang berhenti mendadak tidak terdengar terpotong).
        const fade = s.fadeKeluar ? Math.min(durasi, Math.round(s.fadeKeluar * KANVAS.fps)) : 0;
        return (
          <Sequence key={`s${s.nomor}`} from={dari} durationInFrames={durasi} name={`SFX ${s.nomor} ${s.bunyi}`}>
            <Html5Audio
              src={src}
              volume={
                fade
                  ? (f) => s.volume * SETELAN_AUDIO.sfx * interpolate(f, [durasi - fade, durasi], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
                  : s.volume * SETELAN_AUDIO.sfx
              }
            />
          </Sequence>
        );
      })}
    </>
  );
};
