// Lini waktu video: adegan (durasi dari rekaman narasi), kartu Ulikan.
import { ADEGAN, KANVAS, KARTU_ULIKAN } from './merek';
import { ADEGAN_TERPAKAI, type AdeganTerpakai } from './data';
import { GELAP_SESUDAH, KEJUTAN, SISIP_JEDA } from '../data/setelan';

/** Jeda sisipan dalam frame: `pada` dihitung dari awal rekaman narasi adegan (tanpa geseran jeda sebelumnya). */
export interface Sisip {
  pada: number;
  lama: number;
  sfx: number;
  dariSfx: number;
}

/**
 * Ubah posisi frame sejak narasi mulai (waktu video) menjadi posisi di rekaman narasi.
 * Mengembalikan null selama jeda sisipan (narator diam).
 */
export function keWaktuNarasi(sisip: Sisip[], r: number): number | null {
  let geser = 0;
  for (const g of sisip) {
    if (r < g.pada + geser) return r - geser;
    if (r < g.pada + geser + g.lama) return null;
    geser += g.lama;
  }
  return r - geser;
}

/** Titik `pada` (frame rekaman) jeda sisipan terakhir yang sudah lewat di posisi video r; -1 bila belum ada. */
export function jedaTerakhir(sisip: Sisip[], r: number): number {
  let geser = 0;
  let pada = -1;
  for (const g of sisip) {
    if (r < g.pada + geser + g.lama) break;
    pada = g.pada;
    geser += g.lama;
  }
  return pada;
}

export interface AdeganLini extends AdeganTerpakai {
  indeks: number;
  /** Frame awal adegan (narasi, subtitle, SFX). */
  mulai: number;
  durasi: number;
  akhir: number;
  /** Frame narasi mulai dan panjangnya (null bila belum ada rekaman). */
  narasiMulai: number;
  narasiDurasi: number | null;
  /** Jeda sisipan (SISIP_JEDA) dalam frame, urut; kosong bila tidak ada atau belum ada rekaman. */
  sisip: Sisip[];
  /** Layar gelap hening di akhir adegan (GELAP_SESUDAH), frame; 0 bila tidak ada. */
  gelapSesudah: number;
  /** Adegan KEJUTAN: frame global saat ilustrasinya muncul mendadak; null untuk adegan biasa. */
  muncul: number | null;
  /** Rentang ilustrasi tampil (lebih panjang dari adegan saat crossfade). */
  vMulai: number;
  vAkhir: number;
  /** Rentang yang dipakai untuk menghitung Ken Burns. */
  kbAkhir: number;
  /** `langsung` = adegan pertama: tampil penuh sejak frame 0 (tanpa pembuka, sejak Oktober 2026). */
  masuk: 'langsung' | 'crossfade' | 'latar';
  keluar: 'crossfade' | 'latar' | 'kartu';
}

export interface Lini {
  adegan: AdeganLini[];
  kartuMulai: number;
  total: number;
}

const f = (detik: number) => Math.round(detik * KANVAS.fps);

export function hitungLini(durasiNarasi: (number | null)[]): Lini {
  let t = 0;
  const adegan: AdeganLini[] = ADEGAN_TERPAKAI.map((a, i) => {
    const n = durasiNarasi[i] ?? null;
    const sisip: Sisip[] =
      n == null
        ? []
        : (SISIP_JEDA[a.nomor] ?? [])
            .map((g) => ({ pada: f(Math.min(g.pada, n)), lama: f(g.lama), sfx: g.sfx, dariSfx: f(g.dariSfx) }))
            .sort((x, y) => x.pada - y.pada);
    const tambah = sisip.reduce((s, g) => s + g.lama, 0);
    const gelapSesudah = f(GELAP_SESUDAH[a.nomor] ?? 0);
    const kejutan = KEJUTAN[a.nomor];
    // Adegan kejutan: narasi, celah gelap `jeda`, lalu ilustrasi tampil `tampil` detik (menggantikan jeda akhir biasa).
    const narasiPenuh = n != null ? f(ADEGAN.jedaAwal + n) + tambah : null;
    const durasi = kejutan
      ? (narasiPenuh ?? f(a.durasiCadangan)) + f(kejutan.jeda + kejutan.tampil) + gelapSesudah
      : (n != null ? f(ADEGAN.jedaAwal + n + ADEGAN.jedaAkhir + (a.hening ? ADEGAN.jedaHening : 0)) + tambah : f(a.durasiCadangan)) +
        gelapSesudah;
    const muncul = kejutan ? t + (narasiPenuh ?? f(a.durasiCadangan)) + f(kejutan.jeda) : null;
    const x = {
      ...a,
      indeks: i,
      mulai: t,
      durasi,
      akhir: t + durasi,
      narasiMulai: t + f(ADEGAN.jedaAwal),
      narasiDurasi: n != null ? f(n) : null,
      sisip,
      gelapSesudah,
      muncul,
      vMulai: t,
      vAkhir: t + durasi,
      kbAkhir: t + durasi,
      masuk: 'latar' as AdeganLini['masuk'],
      keluar: 'latar' as AdeganLini['keluar'],
    };
    t += durasi;
    return x;
  });
  const kartuMulai = t;
  const total = t + KARTU_ULIKAN.durasi;
  adegan.forEach((a, i) => {
    const sebelum = adegan[i - 1];
    const sesudah = adegan[i + 1];
    if (!sebelum) a.masuk = 'langsung';
    else if (sebelum.babak === a.babak) a.masuk = 'crossfade';
    if (!sesudah) {
      a.keluar = 'kartu';
      a.kbAkhir = total;
    } else if (sesudah.babak === a.babak) {
      a.keluar = 'crossfade';
      // ilustrasi ditahan di bawah adegan berikutnya selama crossfade
      a.vAkhir = a.akhir + ADEGAN.crossfade;
      a.kbAkhir = a.vAkhir;
    }
  });
  // Kejutan: gambar adegan sebelumnya ditahan sampai narasi adegan ini selesai lalu dipotong ke gelap;
  // gambar adegan ini muncul mendadak (tanpa crossfade) di frame `muncul`.
  adegan.forEach((a, i) => {
    if (a.muncul == null) return;
    const sebelum = adegan[i - 1];
    if (sebelum) {
      sebelum.vAkhir = Math.max(sebelum.akhir, a.narasiDurasi != null ? a.narasiMulai + a.narasiDurasi : a.mulai);
      sebelum.kbAkhir = sebelum.vAkhir;
      sebelum.keluar = 'crossfade';
    }
    a.vMulai = a.muncul;
    a.masuk = 'langsung';
  });
  return { adegan, kartuMulai, total };
}
