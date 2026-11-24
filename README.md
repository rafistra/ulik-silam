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

Papan produksi, katalog konsep, halaman konsep (naskah, lembar karakter, audio, Ulikan dan caption, verifikasi, aset, render), pustaka, alat, dan identitas merek. Katalog membaca KONSEP.md lewat `paket/urai-konsep` dan CAROUSEL.md lewat `paket/urai-carousel` (proyek `format: Carousel` mendapat halaman sendiri: pratinjau slide 9:16 dan 4:5, slide, prompt ilustrasi dan batch Flow, Ulikan dan caption, verifikasi, aset per slide), mengambil berkas dari `$ASET_DIR` dan folder proyek lama (`arsip_lama`), dan memuat ulang sendiri saat berkas berubah. Yang ditulis katalog sendiri hanya `tahap`, `prioritas`, `catatan`, dan `sampul` di `proyek.yaml` (lalu `STATUS.md` dibuat ulang bila Python tersedia) serta `status` kartu pustaka. Halaman **Alat** menjalankan skrip repo yang terdaftar di `aplikasi/katalog/server/alat.mjs` (periksa aset, potong narasi, peta, panen dan salin pustaka, impor metrik, impor ide, validasi konsep, STATUS.md); skrip yang menulis berkas punya tombol Pratinjau terpisah. Commit tetap manual.

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

### Carousel

`paket/carousel` merender carousel dari `proyek/<slug>/CAROUSEL.md` (diurai `paket/urai-carousel`) dengan templat yang sama dengan pratinjau katalog, lewat Remotion. Ilustrasi dibaca dari `$ASET_DIR/proyek/<slug>/ilustrasi/slide-XX.*` dan foto dari `arsip/slide-XX.*`.

| Perintah | Fungsi |
| --- | --- |
| `npm run carousel -- <slug>` | Render final ke `render/tiktok/NN.png` (1080 × 1920) dan `render/instagram/NN.png` (1080 × 1350), masing-masing dengan `lembar-kontak.png` |
| `npm run carousel -- <slug> --draf` | Render draf bertanda DRAF ke `render/draf/<platform>/`, walau berkas atau lisensi belum lengkap |
| `npm run carousel -- <slug> --cek` | Periksa kesiapan render final (kontrak, berkas, lisensi foto) |
| `--platform=tiktok` atau `--platform=instagram` | Render satu platform saja |

Render final ditolak selama ada berkas yang kurang; status lisensi foto tidak diperiksa. Tombol Render final dan Render draf juga ada di tab Render halaman carousel di katalog.

## Skrip

| Perintah | Fungsi |
| --- | --- |
| `python3 scripts/impor-lama.py <folder-pov>` | Menyalin KONSEP.md dan konsep.json dari proyek lama ke `proyek/`, dan membuat `proyek.yaml` bila belum ada. Folder lama tidak diubah |
| `python3 scripts/impor-ide.py <folder-ide> [--prioritas a,b] [--tulis]` | Memasukkan KONSEP.md yang belum diproduksi ke `proyek/<slug>/` dengan tahap Naskah terverifikasi (proyek yang sudah ada dilewati). Tanpa `--tulis` hanya menampilkan rencana. Ide baru tanpa konsep cukup dibuatkan `proyek.yaml` dengan tahap Bank ide |
| `python3 scripts/panen-pustaka.py <slug> --tulis` | Membuat kartu draf pustaka (tokoh, musik, SFX) dari KONSEP.md proyek |
| `python3 scripts/salin-pustaka.py --tulis` | Menyalin berkas pustaka dari proyek asal ke `$ASET_DIR/pustaka/` |
| `python3 scripts/buat-status.py` | Membuat ulang `STATUS.md` dari semua `proyek.yaml` |
| `python3 scripts/impor-metrik.py --youtube <csv> --tiktok <csv> --tiktok-studio <tsv> --periode-yt <awal..akhir> --tulis` | Mengisi tanggal tayang, tautan, `metrik_tiktok`, dan `metrik_shorts` di `proyek.yaml` dari ekspor YouTube Studio dan TikTok Studio. Ekspor TikTok hanya memuat 15 video teratas, jadi video lain diambil dari daftar Posts TikTok Studio (`--tiktok-studio`, TSV). Judul yang berubah saat diunggah dipetakan di `data/metrik/pemetaan.json` |

## Kebiasaan kerja

- Sebelum mulai: `git pull`.
- Setelah selesai: `git add`, `git commit`, `git push`.
- Satu proyek hanya dikerjakan di satu device dalam satu waktu.
- Skill diubah di repo ini lebih dulu, lalu versi yang sama diunggah ke claude.ai.
