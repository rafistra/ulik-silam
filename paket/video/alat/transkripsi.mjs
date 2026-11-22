#!/usr/bin/env node
// Transkripsi kata lokal (whisper.cpp lewat @remotion/install-whisper-cpp), tanpa internet setelah unduhan pertama.
// Pemakaian:
//   node scripts/transkripsi.mjs <berkas audio> <keluaran.json>
// Keluaran: [{ teks, mulai, akhir }] dalam detik dari awal berkas. Dipakai untuk usulan titik potong babak
// (babak-N.waktu.json) dan waktu rute peta animasi (public/peta/adegan-XX.kata.json).
import fs from 'node:fs';
import path from 'node:path';
import { installWhisperCpp, downloadWhisperModel, transcribe } from '@remotion/install-whisper-cpp';
import { p, ffmpeg } from './lib.mjs';

const [, , masuk, keluar] = process.argv;
if (!masuk || !keluar) {
  console.error('Pemakaian: node scripts/transkripsi.mjs <audio> <keluaran.json>');
  process.exit(1);
}
const DIR = p('node_modules/.cache/whisper');
// Folder program tidak boleh dibuat lebih dulu: installWhisperCpp menganggap whisper sudah terpasang bila foldernya ada.
const BIN = path.join(DIR, 'whisper.cpp');
const VERSI = '1.5.5';
const MODEL = process.env.MODEL_WHISPER || 'small';
fs.mkdirSync(DIR, { recursive: true });
await installWhisperCpp({ to: BIN, version: VERSI, printOutput: false });
await downloadWhisperModel({ model: MODEL, folder: DIR, printOutput: false });

const wav = path.join(DIR, `masuk-${process.pid}.wav`);
const r = ffmpeg(['-y', '-v', 'error', '-i', path.resolve(masuk), '-ar', '16000', '-ac', '1', '-c:a', 'pcm_s16le', wav]);
if (r.kode !== 0) throw new Error(r.stderr);
const { transcription } = await transcribe({
  inputPath: wav,
  whisperPath: BIN,
  modelFolder: DIR,
  whisperCppVersion: VERSI,
  model: MODEL,
  tokenLevelTimestamps: true,
  language: 'id',
  printOutput: false,
});
fs.rmSync(wav, { force: true });

// Token whisper digabung menjadi kata (token yang tidak diawali spasi menyambung kata sebelumnya).
const kata = [];
for (const seg of transcription)
  for (const t of seg.tokens) {
    if (/^\[_/.test(t.text) || !t.text.trim()) continue;
    const mulai = t.offsets.from / 1000;
    const akhir = t.offsets.to / 1000;
    if (/^\s/.test(t.text) || !kata.length) kata.push({ teks: t.text.trim(), mulai, akhir });
    else {
      kata[kata.length - 1].teks += t.text;
      kata[kata.length - 1].akhir = akhir;
    }
  }
fs.mkdirSync(path.dirname(path.resolve(keluar)), { recursive: true });
fs.writeFileSync(keluar, JSON.stringify(kata, null, 1) + '\n');
console.log(`${kata.length} kata → ${keluar}`);
console.log(kata.map((k) => `${k.mulai.toFixed(2)} ${k.teks}`).join(' | '));
