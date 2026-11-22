# Ulik Silam

Repo kerja akun **Ulik Silam** (TikTok, YouTube Shorts, Instagram): skill Claude, paket merek, pustaka aset, dan proyek produksi video serta carousel.

> Masa lalu, dari matamu.

## Isi repo

| Folder / file | Isi |
| --- | --- |
| `CLAUDE.md` | Aturan kerja yang dibaca Claude Code di setiap sesi |
| `STATUS.md` | Papan produksi: tahap dan status setiap proyek |
| `.claude/skills/` | Skill Ulik Silam (konsep per genre, produksi, carousel) |
| `merek/` | Salinan beku sistem desain: token, font, logo, templat |
| `pustaka/` | Kartu aset yang bisa dipakai ulang (tanpa file berat) |
| `proyek/<slug>/` | Satu folder per video atau carousel |

File berat (ilustrasi, narasi, musik, foto arsip, render) **tidak** masuk repo. Semuanya disimpan di folder `aset/` di dalam repo ini (diabaikan git) dengan struktur folder yang sama. Lokasinya bisa dipindah lewat `ASET_DIR` di `.env`. Karena tidak ikut git, folder `aset/` perlu disalin manual bila pindah device.

## Mulai di device baru

1. `git clone` repo ini.
2. Salin `.env.example` menjadi `.env` (bawaan `ASET_DIR=aset`), lalu salin folder `aset/` dari device lama bila perlu.
3. Masuk ke proyek yang mau dikerjakan, lalu jalankan `npm install` (Node 20+).

## Katalog lokal

```
npm install        # sekali per device (Node 20+)
npm run katalog    # membuka http://127.0.0.1:4174
```

Papan produksi, katalog konsep, halaman konsep (naskah, lembar karakter, audio, Ulikan dan caption, verifikasi, aset, render), dan pustaka. Katalog membaca KONSEP.md lewat `paket/urai-konsep`, mengambil berkas dari `$ASET_DIR` dan folder proyek lama (`arsip_lama`), dan memuat ulang sendiri saat berkas berubah. Yang ditulis katalog hanya `tahap`, `prioritas`, dan `catatan` di `proyek.yaml` (lalu `STATUS.md` dibuat ulang bila Python tersedia) serta `status` kartu pustaka. Commit tetap manual.

`npm run urai -- --semua` memeriksa semua KONSEP.md dengan pengurai yang sama.

## Video (komposisi Remotion bersama)

Semua video dirender dari satu komposisi, `paket/video` (VideoUlikSilam, Sampul, LembarIkon), yang diambil dari proyek Kayan part 2. Isi video berasal dari KONSEP.md, setelan per video dari `proyek/<slug>/setelan.json` (opsional; kuncinya sama dengan `paket/video/src/data/setelan.ts`), dan berkas dari `$ASET_DIR/proyek/<slug>/` atau folder proyek lama.

| Perintah | Fungsi |
| --- | --- |
| `npm run render -- <slug>` | Render video ke `$ASET_DIR/proyek/<slug>/render/<slug>-<tanggal>-<versi>.mp4` (audio dinormalkan ke −16 LUFS) |
| `npm run render -- <slug> --sampul` | Render sampul PNG |
| `npm run render -- <slug> --studio` | Buka Remotion Studio dengan data proyek itu |
| `npm run render -- <slug> --cek` | Cek kelengkapan aset |
| `npm run alat -- potong <slug>` | Potong rekaman babak ElevenLabs menjadi narasi per adegan |
| `npm run alat -- peta-dasar <slug>` / `peta-warna <slug>` | Data dan palet peta animasi |

Tombol Render, Render sampul, dan Buka di Remotion Studio juga ada di tab Render katalog. Render pertama di device baru mengunduh Chrome Headless Shell dari Remotion.

## Skrip

| Perintah | Fungsi |
| --- | --- |
| `python3 scripts/impor-lama.py <folder-pov>` | Menyalin KONSEP.md dan konsep.json dari proyek lama ke `proyek/`, dan membuat `proyek.yaml` bila belum ada. Folder lama tidak diubah |
| `python3 scripts/panen-pustaka.py <slug> --tulis` | Membuat kartu draf pustaka (tokoh, musik, SFX) dari KONSEP.md proyek |
| `python3 scripts/salin-pustaka.py --tulis` | Menyalin berkas pustaka dari proyek asal ke `$ASET_DIR/pustaka/` |
| `python3 scripts/buat-status.py` | Membuat ulang `STATUS.md` dari semua `proyek.yaml` |
| `python3 scripts/impor-metrik.py --youtube <csv> --tiktok <csv> --tiktok-studio <tsv> --periode-yt <awal..akhir> --tulis` | Mengisi tanggal tayang, tautan, `metrik_tiktok`, dan `metrik_shorts` di `proyek.yaml` dari ekspor YouTube Studio dan TikTok Studio. Ekspor TikTok hanya memuat 15 video teratas, jadi video lain diambil dari daftar Posts TikTok Studio (`--tiktok-studio`, TSV). Judul yang berubah saat diunggah dipetakan di `data/metrik/pemetaan.json` |

## Kebiasaan kerja

- Sebelum mulai: `git pull`.
- Setelah selesai: `git add`, `git commit`, `git push`.
- Satu proyek hanya dikerjakan di satu device dalam satu waktu.
- Skill diubah di repo ini lebih dulu, lalu versi yang sama diunggah ke claude.ai.
