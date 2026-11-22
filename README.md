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

File berat (ilustrasi, narasi, musik, foto arsip, render) **tidak** masuk repo. Semuanya disimpan di cloud drive dengan struktur folder yang sama, dan lokasinya diatur lewat `ASET_DIR` di `.env`.

## Mulai di device baru

1. `git clone` repo ini.
2. Salin `.env.example` menjadi `.env`, lalu isi `ASET_DIR` dengan lokasi folder `UlikSilam/aset` di cloud drive device itu.
3. Masuk ke proyek yang mau dikerjakan, lalu jalankan `npm install` (Node 20+).

## Skrip

| Perintah | Fungsi |
| --- | --- |
| `python3 scripts/impor-lama.py <folder-pov>` | Menyalin KONSEP.md dan konsep.json dari proyek lama ke `proyek/`, dan membuat `proyek.yaml` bila belum ada. Folder lama tidak diubah |
| `python3 scripts/buat-status.py` | Membuat ulang `STATUS.md` dari semua `proyek.yaml` |
| `python3 scripts/impor-metrik.py --youtube <csv> --tiktok <csv> --tiktok-studio <tsv> --periode-yt <awal..akhir> --tulis` | Mengisi tanggal tayang, tautan, `metrik_tiktok`, dan `metrik_shorts` di `proyek.yaml` dari ekspor YouTube Studio dan TikTok Studio. Ekspor TikTok hanya memuat 15 video teratas, jadi video lain diambil dari daftar Posts TikTok Studio (`--tiktok-studio`, TSV). Judul yang berubah saat diunggah dipetakan di `data/metrik/pemetaan.json` |

## Kebiasaan kerja

- Sebelum mulai: `git pull`.
- Setelah selesai: `git add`, `git commit`, `git push`.
- Satu proyek hanya dikerjakan di satu device dalam satu waktu.
- Skill diubah di repo ini lebih dulu, lalu versi yang sama diunggah ke claude.ai.
