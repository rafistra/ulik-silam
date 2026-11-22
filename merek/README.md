# Paket merek Ulik Silam

Salinan beku dari sistem desain Ulik Silam (`https://claude.ai/artifact/VAzJGVmAGbxEvFpyD7jt6W`). Sistem desain adalah sumber utama; folder ini adalah salinan yang dipakai produksi di semua device. Versi salinan dicatat di `VERSION`.

| Isi | Keterangan |
| --- | --- |
| `tokens.json` | Token warna (tema Malam dan Lontar), huruf, spasi, radius, bayangan |
| `font/` | Cormorant Garamond (500, 600, 500 italic) dan Plus Jakarta Sans (500, 700, 800), woff2 subset Latin, lisensi OFL |
| `identitas.json` | Teks identitas: tagline, filosofi, suara, arti lapisan, aturan logo, aturan tetap, status sinkron. Dibaca halaman Identitas di katalog |
| `logo/mata-nyala.svg` | Tanda logo amber untuk latar gelap |
| `logo/mata-nyala-arang.svg`, `logo/mata-nyala-lontar.svg` | Tanda arang (latar krem) dan krem (watermark), turunan warna dari tanda amber |
| `logo/wordmark-krem.svg` | Wordmark untuk latar gelap |
| `logo/wordmark-arang.svg` | Wordmark untuk latar krem, turunan warna dari wordmark krem |
| `carousel/` | Templat HTML carousel (menyusul setelah mockup final) |
| `video/` | Kosong; komponen video bersama ada di `paket/video` |

## Aturan

- Jangan mengubah file di sini secara langsung. Ubah sistem desain dulu, lalu sinkronkan dan naikkan `VERSION` (juga `sistemDesain` di `identitas.json`).
- Wordmark tidak pernah diketik ulang dengan font.
- Setiap proyek mencatat versi merek yang dipakainya, supaya video lama bisa dirender ulang dengan tampilan aslinya.
