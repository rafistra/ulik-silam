#!/usr/bin/env node
// Memotong public/narasi/babak-N.<ext> menjadi public/narasi/potongan/adegan-XX.wav.
// Titik potong: tengah N−1 jeda hening terpanjang (−35 dB, min. 0,3 dtk), atau babak-N.waktu.json bila ada.
// Setiap potongan lalu dirapikan: hening di tepinya dibuang, disisakan PAD detik.
import fs from 'node:fs';
import { p, dua, EKST_AUDIO, ffmpeg, cariBerkas } from './lib.mjs';

const PAD = 0.12;
const KPM = 132; // kata per menit untuk perkiraan
// Kenyaringan disamakan per berkas babak dengan satu gain tetap (dinamika di dalam babak tidak berubah):
// target −24 LUFS, tetapi gain dibatasi agar puncak sejati tidak melewati −1 dBTP.
const TARGET_LUFS = -24;
const PUNCAK_MAKS = -1;
// Percepatan narasi (atempo, nada tetap) bila total video sedikit melewati batas; berkas babak asli tidak diubah.
// 1 = tanpa percepatan. Tidak berlaku untuk pengganti public/narasi/adegan-XX.*.

const TEMPO = 1;
const kebutuhan = JSON.parse(fs.readFileSync(p('src/data/kebutuhan-aset.json'), 'utf8'));
const DIR = p('public/narasi');
const DIR_POT = p('public/narasi/potongan');
fs.mkdirSync(DIR_POT, { recursive: true });

const RE = new RegExp(`^babak-(\\d+)(?:-([ab]))?\\.(${EKST_AUDIO.join('|')})$`, 'i');
const berkasBabak = () =>
  cariBerkas(DIR, RE).map((f) => {
    const [, n, bagian] = f.match(RE);
    const semua = kebutuhan.adegan.filter((a) => a.babak === +n);
    const t = Math.ceil(semua.length / 2);
    const adegan = bagian === 'a' ? semua.slice(0, t) : bagian === 'b' ? semua.slice(t) : semua;
    const dasar = f.replace(/\.[^.]+$/, '');
    return { f, babak: +n, bagian, adegan, waktu: p('public/narasi', dasar + '.waktu.json') };
  });

function analisis(file) {
  const r = ffmpeg(['-hide_banner', '-i', file, '-af', 'silencedetect=noise=-35dB:d=0.3', '-f', 'null', '-']);
  const out = r.stderr;
  const dm = out.match(/Duration:\s*(\d+):(\d+):([\d.]+)/);
  if (!dm) throw new Error('Durasi tidak terbaca: ' + file + '\n' + out.slice(-800));
  const durasi = +dm[1] * 3600 + +dm[2] * 60 + +dm[3];
  const hening = [];
  let mulai = null;
  for (const l of out.split(/\r?\n/)) {
    let m = l.match(/silence_start:\s*(-?[\d.]+)/);
    if (m) mulai = Math.max(0, +m[1]);
    m = l.match(/silence_end:\s*([\d.]+)/);
    if (m && mulai != null) {
      hening.push({ s: mulai, e: +m[1] });
      mulai = null;
    }
  }
  if (mulai != null) hening.push({ s: mulai, e: durasi });
  return { durasi, hening };
}

function ukurKeras(file) {
  const r = ffmpeg(['-hide_banner', '-i', file, '-af', 'loudnorm=print_format=json', '-f', 'null', '-']);
  const j = JSON.parse(r.stderr.slice(r.stderr.lastIndexOf('{'), r.stderr.lastIndexOf('}') + 1));
  return { i: +j.input_i, tp: +j.input_tp };
}

function potong(b) {
  const file = p('public/narasi', b.f);
  const N = b.adegan.length;
  const { durasi, hening } = analisis(file);
  const keras = ukurKeras(file);
  const gain = +Math.min(TARGET_LUFS - keras.i, PUNCAK_MAKS - keras.tp).toFixed(2);
  const tepiAwal = hening.find((h) => h.s <= 0.05);
  const tepiAkhir = hening.find((h) => h.e >= durasi - 0.05);
  const dalam = hening.filter((h) => h !== tepiAwal && h !== tepiAkhir);
  let titik;
  let sumber;
  if (fs.existsSync(b.waktu)) {
    titik = JSON.parse(fs.readFileSync(b.waktu, 'utf8')).map(Number).sort((x, y) => x - y);
    sumber = 'waktu.json';
    if (titik.length !== N - 1) return { gagal: `${b.f}: waktu.json berisi ${titik.length} titik, harus ${N - 1}.` };
  } else {
    if (dalam.length < N - 1)
      return {
        gagal: `${b.f}: hanya ${dalam.length} jeda ditemukan untuk ${N} adegan (perlu ${N - 1}). Isi public/narasi/${b.f.replace(/\.[^.]+$/, '')}.waktu.json dengan titik potong.`,
      };
    titik = [...dalam]
      .sort((x, y) => y.e - y.s - (x.e - x.s))
      .slice(0, N - 1)
      .sort((x, y) => x.s - y.s)
      .map((h) => (h.s + h.e) / 2);
    sumber = 'jeda';
  }
  const batas = [0, ...titik, durasi];
  const hasil = [];
  for (let i = 0; i < N; i++) {
    let a = batas[i];
    let z = batas[i + 1];
    const hA = hening.find((h) => h.s <= a + 0.001 && h.e >= a - 0.001);
    const hZ = hening.find((h) => h.s <= z + 0.001 && h.e >= z - 0.001);
    if (hA) a = Math.max(a, hA.e - PAD);
    if (hZ) z = Math.min(z, hZ.s + PAD);
    if (z - a < 0.2) return { gagal: `${b.f}: potongan adegan ${b.adegan[i].nomor} terlalu pendek; periksa waktu.json.` };
    const nomor = b.adegan[i].nomor;
    const keluar = p('public/narasi/potongan', `adegan-${dua(nomor)}.wav`);
    const r = ffmpeg(['-y', '-hide_banner', '-loglevel', 'error', '-i', file, '-af', `atrim=start=${a.toFixed(3)}:end=${z.toFixed(3)},asetpts=PTS-STARTPTS,volume=${gain}dB${TEMPO !== 1 ? `,atempo=${TEMPO}` : ''}`, '-c:a', 'pcm_s16le', '-ar', '48000', keluar]);
    if (r.kode !== 0) return { gagal: `${b.f}: ffmpeg gagal untuk adegan ${nomor}: ${r.stderr.slice(-400)}` };
    const perkiraan = (b.adegan[i].kata / KPM) * 60;
    const d = (z - a) / TEMPO;
    hasil.push({ nomor, mulai: a, akhir: z, durasi: d, perkiraan, menyimpang: Math.abs(d / perkiraan - 1) > 0.4 });
  }
  return { hasil, sumber, durasi, titik, keras, gain };
}

const daftar = berkasBabak();
const pilih = process.argv.slice(2).filter((x) => !x.startsWith('--'));
let gagal = 0;
if (!daftar.length) console.log('Tidak ada public/narasi/babak-N.<ext>; tidak ada yang dipotong.');
for (const b of daftar) {
  if (pilih.length && !pilih.includes(String(b.babak))) continue;
  // potongan lama babak ini dihapus dulu
  for (const a of b.adegan) fs.rmSync(p('public/narasi/potongan', `adegan-${dua(a.nomor)}.wav`), { force: true });
  const r = potong(b);
  if (r.gagal) {
    gagal++;
    console.error('GAGAL ' + r.gagal);
    continue;
  }
  console.log(`\n${b.f} (${r.durasi.toFixed(1)} dtk, ${b.adegan.length} adegan, titik dari ${r.sumber}: ${r.titik.map((t) => t.toFixed(2)).join(', ') || '-'})`);
  console.log(
    `  kenyaringan ${r.keras.i.toFixed(1)} LUFS, puncak ${r.keras.tp.toFixed(1)} dBTP → gain ${r.gain >= 0 ? '+' : ''}${r.gain} dB` +
      (TARGET_LUFS - r.keras.i > r.gain + 0.05 ? ` (dibatasi puncak; ${(TARGET_LUFS - r.keras.i - r.gain).toFixed(1)} dB di bawah target)` : ''),
  );
  for (const h of r.hasil)
    console.log(
      `  adegan-${dua(h.nomor)}  ${h.mulai.toFixed(2)}–${h.akhir.toFixed(2)}  ${h.durasi.toFixed(2)} dtk  (perkiraan kata ${h.perkiraan.toFixed(1)})${h.menyimpang ? '  << MENYIMPANG >40%, dengarkan; mungkin salah potong' : ''}`,
    );
}
process.exit(gagal ? 1 : 0);
