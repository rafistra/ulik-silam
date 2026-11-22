---
name: "pov-produksi"
description: "Gunakan saat Rafi ingin memproduksi video POV 9:16 Ulik Silam dari KONSEP.md (genre apa pun: sejarah, cerita rakyat, mitologi, fiksi): paket bahan, proyek Remotion beridentitas Ulik Silam, pemeriksaan aset sebelum render, render final, dan pembaruan proyek dari KONSEP.md versi baru. Bukan untuk brainstorming atau menulis naskah."
---

# POV Produksi: dari KONSEP.md sampai video jadi

Skill ini mengubah dokumen konsep video POV menjadi paket bahan siap pakai dan proyek Remotion beridentitas **Ulik Silam**, lalu memeriksa aset dan merender video final. Isi cerita tidak dinilai ulang di sini: konsep (naskah, fakta, prompt, caption) sudah disetujui di skill genre (misalnya pov-sejarah). Komunikasi dengan Rafi dalam Bahasa Indonesia.

Skill ini paling nyaman dijalankan di Claude Code di laptop Rafi (Windows), karena aset dan render ada di sana. Di sesi cloud tetap bisa, dengan catatan render memakai browser headless yang terpasang.

## Masukan

- **Wajib:** satu file `KONSEP.md` yang mengikuti Kontrak KONSEP.md v1.5 (di bawah). Cari di folder kerja; jika tidak ada, minta Rafi melampirkannya. Jika Rafi hanya punya link dokumen Docs, ekspor dulu ke markdown dengan alat dokumen yang tersedia.
- **Opsional:** proyek POV sebelumnya sebagai template (lihat 2.2), dan aset (narasi, ilustrasi, musik, SFX) saat masuk tahap pemeriksaan.
- **Untuk proyek yang sudah ada:** KONSEP.md versi baru (hasil Tahap R skill genre) dan folder proyeknya; langsung ke Tahap 5.

## Aturan tetap

1. **KONSEP.md adalah sumber kebenaran isi.** Narasi, teks layar, prompt, caption, lapisan, dan isi kartu Ulikan disalin persis, tidak ditulis ulang. Skill ini tidak pernah mengubah isi sendiri, termasuk saat rekaman diimprovisasi atau durasi kelebihan: perbedaannya dilaporkan, diperbaiki di skill genre (Tahap R), lalu masuk kembali lewat Tahap 5.
2. **Sistem desain Ulik Silam adalah sumber kebenaran tampilan.** Warna, huruf, ukuran, zona aman, logo, dan urutan adegan dan kartu Ulikan, serta gaya adegan peta animasi, mengikuti bagian Identitas Ulik Silam di bawah. Jangan menciptakan gaya lain per video; yang berbeda antar-video hanya isi, lapisan, dan ilustrasi.
3. **Konsistensi tiga tempat.** Narasi harus identik di `KONSEP.md`, `bahan/teks-narasi/`, dan `src/data/adegan.ts`, dibandingkan dua kali: dengan tag suara dan setelah tag dibuang. Perubahan narasi hanya masuk lewat KONSEP.md versi baru (Tahap 5), dialirkan ke ketiganya sekaligus dengan `npm run dari-konsep`, dan dicek dengan skrip, bukan dengan mata.
4. **Penutup prompt dibaca dari konsep.** Baris penutup yang wajib mengakhiri setiap prompt diambil dari baris "Penutup prompt" di KONSEP.md, tidak ditanam di skill ini.
5. **Berhenti di setiap akhir tahap.** Kerjakan satu tahap, jalankan pemeriksaannya, serahkan, lalu tunggu Rafi bilang lanjut.
6. **Tidak membuat aset kreatif.** Narasi suara, ilustrasi, musik, dan SFX dibuat Rafi dengan alatnya. Aset uji (nada, gambar polos) hanya untuk menguji proyek dan dihapus sebelum diserahkan. Aset merek (logo, wordmark) disalin dari sistem desain, bukan digambar ulang.

## Alat dan cadangannya

Cek alat yang tersedia di awal sesi, diam-diam, lalu pakai cadangan bila perlu dan sebutkan dalam satu kalimat saat menyerahkan hasil.

| Kebutuhan | Alat utama | Cadangan bila tidak tersedia |
| --- | --- | --- |
| Menjalankan Node dan Remotion | Shell lokal (Claude Code) | Shell workspace cloud |
| Uji render | Chrome/Chromium bawaan Remotion | `--browser-executable` ke headless shell yang terpasang; jika tidak ada, serahkan dengan catatan belum diuji render |
| Menaruh hasil | Folder proyek di laptop Rafi | Zip dikirim ke percakapan (tanpa `node_modules`) |
| Membaca KONSEP.md dari Docs | Ekspor markdown dari alat dokumen | Minta Rafi mengekspor dan melampirkan |
| Aset dan token merek | Alat Artifact: `read` sistem desain Ulik Silam (lihat Identitas) | Tanda dari blok SVG di skill ini; wordmark dari paket logo Rafi; token dari tabel di skill ini |

## Identitas Ulik Silam

Sumber kebenaran: sistem desain Ulik Silam, `https://claude.ai/artifact/VAzJGVmAGbxEvFpyD7jt6W`. Bila alat Artifact tersedia, di awal Tahap 2 `read` berkas `project/tokens.json` dan `project/design-system.json` (bukan halamannya). Tabel di bawah sudah diselaraskan dengan sistem desain (Oktober 2026); bila nilai di sana berbeda, berarti salah satunya diubah sesudahnya: pakai nilai sistem desain dan beri tahu Rafi bahwa skill ini perlu diperbarui. Semua ukuran di bawah untuk kanvas 1080 × 1920; video selalu memakai tema Malam (gelap).

### Warna

| Token | Nilai | Dipakai untuk |
| --- | --- | --- |
| `latar` | `#14110F` | Latar video, peredup ilustrasi di belakang kartu Ulikan, pudar antar-babak dan akhir video |
| `latarNaik` | `#211913` | Kotak kartu Ulikan |
| `garis` | `#4A3828` | Garis tepi kartu (dekoratif saja) |
| `tinta` | `#EFE3C8` | Subtitle, teks layar, isi kartu |
| `tintaRedup` | `#B5A486` | Sumber, tempat |
| `pelita` | `#E8A33D` | Satu-satunya aksen: tanda logo, rute dan kepala rute di adegan peta animasi, kata kunci subtitle, penanda ULIKAN |
| `tanah` | `#3B2A1E` | Pusat cahaya hangat di placeholder dan foto profil |
| `bayang` | `#14110FB8` | Gradasi gelap di bawah subtitle saat gambar terang |
| `cahaya` | `0 0 64px 8px #E8A33D59` | Pendar di sekitar tanda logo |

### Lapisan

| Lapisan | Warna | Ikon (SVG 24 × 24, garis 1,9 seperti komponen label di sistem desain, ujung bulat, `stroke="currentColor"`; berkas ikon mandiri di sistem desain memakai garis 1,75, keduanya benar) |
| --- | --- | --- |
| Sejarah | `#E8A33D` | `<path d="M8 4h10a2 2 0 0 1 0 4H8"/><path d="M8 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V8"/><path d="M9.5 12h6M9.5 15.5h4"/>` |
| Legenda | `#9DB57A` | `<path d="M6 12.5a3.3 3.3 0 0 1 .4-6.5 4.6 4.6 0 0 1 8.6-1.4 3.6 3.6 0 0 1 4.6 3.6A2.6 2.6 0 0 1 18.5 12.5z"/><path d="M12 12.5V20M12 15.5l-2.2-3M12 15.5l2.2-3M7.5 12.5v4.5M16.5 12.5v4.5M9.5 20h5"/>` |
| Mitos | `#E07A60` | `<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>` |
| Rekaan | `#86A6C4` | `<path d="M20 4C13 4 8 9 7 16l-2.5 4"/><path d="M20 4c0 6.5-4.5 11.5-12.5 12"/><path d="M10 14l5-5"/>` |

### Huruf

Cormorant Garamond (500, 600, 500 italic) dan Plus Jakarta Sans (500, 700, 800), disimpan lokal dari `@fontsource/cormorant-garamond` dan `@fontsource/plus-jakarta-sans`.

| Gaya | Huruf | Ukuran / tinggi baris | Berat | Dipakai untuk |
| --- | --- | --- | --- | --- |
| `judul-sampul` | Cormorant Garamond | 104 / 104 | 600 | Judul di sampul |
| `kutipan` | Cormorant Garamond italic | 52 / 64 | 500 | Teks layar |
| `subtitle` | Plus Jakarta Sans | 56 / 72 | 700 | Subtitle narasi |
| `isi` | Plus Jakarta Sans | 42 / 58 | 500 | Isi kartu Ulikan |
| `label` | Plus Jakarta Sans, kapital, spasi huruf 0,16em | 30 / 36 | 800 | Label lapisan, penanda ULIKAN |
| `keterangan` | Plus Jakarta Sans | 30 / 40 | 500 | Sumber, tempat |

### Zona aman

Teks tidak boleh melewati: atas 200 px, bawah 460 px, kiri 72 px, kanan 180 px (kolom tombol TikTok dan Shorts). Nilai ini perkiraan antarmuka aplikasi; tetap dicek di ponsel sebelum unggah.

### Aset merek di `public/merek/`

- `mata-nyala.svg`: tanda logo amber. Bila sistem desain bisa dibaca: `read` berkas `project/design-system.json`, ambil nilai `blob` (32 karakter heksadesimal) di `assetGroups.Logos.files["ulik-silam-mark-pelita.svg"]`, lalu `read` sistem desain dengan nilai itu sebagai `path` dan simpan hasilnya sebagai `public/merek/mata-nyala.svg`. Bila tidak bisa, tulis persis isi blok di bawah.
- `wordmark-krem.svg`: wordmark "Ulik Silam" dengan nyala di titik huruf i, diambil dengan cara yang sama dari kunci `assetGroups.Logos.files["ulik-silam-wordmark-krem.svg"]`, atau dari paket logo Rafi. Jangan mengetik ulang wordmark dengan font. Bila berkas tidak ada, kartu Ulikan memakai tanda saja dan hal ini dilaporkan.
- Tidak ada SFX merek: pembuka nyala dan `desis-api` tidak dipakai lagi sejak Oktober 2026.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="207 175 840 840" width="512" height="512"><title>Ulik Silam — Mata Nyala (amber)</title><g fill="#E8A33D" fill-rule="evenodd" transform="translate(0 1254) scale(1 -1)"><path d="M 622.05 1042.84 C 633.48 1024.07 641.04 1004.75 645.12 983.83 C 647.77 970.28 648.28 944.14 646.14 932 C 638.94 891.17 620.81 856.1 585.89 815.42 C 580.73 809.41 558.73 786.5 537 764.5 C 497.34 724.35 485.48 711.76 472.43 696 C 439.59 656.32 420.38 619.08 411.81 578.47 C 409.75 568.67 409.51 564.9 409.55 543 C 409.6 515.23 410.72 507.66 418.05 485.65 C 430.53 448.18 452.4 419.88 494.97 386.14 C 526.16 361.41 540.24 347.3 553.31 327.65 C 560.25 317.22 570.45 296.85 576.41 281.5 C 583.79 262.5 583.1 263.19 584.6 273.21 C 587.25 290.9 596.46 312.5 608.8 329.98 C 616.49 340.87 633.62 358.57 646 368.43 C 655.27 375.8 678.52 391.34 701.47 405.5 C 709.49 410.45 720.88 418.05 726.78 422.4 C 740.41 432.46 762.57 454.68 771.02 466.76 C 779.93 479.49 786.24 492.19 786.38 497.66 C 786.45 500.04 786.86 501.99 787.3 501.99 C 788.55 502 794.77 488.13 796.46 481.56 C 797.3 478.3 798.27 470.88 798.61 465.06 C 799.36 452.36 796.75 434.95 791.94 420.61 C 788.18 409.44 777.75 387.91 771.57 378.6 C 769.06 374.81 767 371.52 767 371.29 C 767 370.2 780.5 381.35 788.36 388.94 C 834.75 433.75 854.91 501.79 839.95 563.05 C 835.79 580.09 832.63 588.78 824.52 605.5 C 816.43 622.17 806.79 637.02 787.36 662.76 C 762.13 696.2 750.14 721.4 748.34 744.8 C 747.98 749.36 747.37 752.74 746.97 752.3 C 746.57 751.86 745 747.67 743.48 743 C 734.7 716.06 719.16 688.64 701.82 669.47 C 678.32 643.5 650.32 624.48 608 605.72 C 600.02 602.19 586.08 596.02 577 592.01 C 538.22 574.88 516.77 562.42 492.54 542.96 C 474.76 528.66 457.81 510.62 443.72 490.98 C 441.94 488.51 441.94 488.53 442.55 494.3 C 443.6 504.27 446.81 514.03 453.49 527.5 C 461.4 543.44 469.46 554.28 483.64 568.02 C 504.15 587.88 520.68 598.35 569.65 622.48 C 628.29 651.38 646.3 663.2 672.01 689.64 C 686.19 704.21 694.3 714.65 703.67 730.39 C 718.78 755.78 728.67 784.88 732.58 815.5 C 734.88 833.52 734.14 865.4 731.02 883 C 719.79 946.3 681.34 1006.44 628.04 1044.09 C 623.05 1047.61 618.51 1050.65 617.97 1050.84 C 617.42 1051.02 619.26 1047.42 622.05 1042.84 Z M 643.5 558.98 C 667.35 557.02 691.39 551.34 714 542.33 C 732.68 534.88 760.59 520.44 779.73 508.33 L 785.95 504.39 L 769.23 494.79 C 701.66 456 651.12 444.04 592.65 453.02 C 564.43 457.35 539.31 465.96 508.52 481.85 C 491.58 490.59 468.99 503.71 469.02 504.79 C 469.05 505.69 493.19 520.01 507 527.31 C 553.5 551.9 599.58 562.59 643.5 558.98 Z M 618 538.47 C 597.41 532.81 586.42 509.89 595.18 490.88 C 600.3 479.76 608.88 473.18 621.19 470.91 C 645.86 466.36 667.66 490.58 660.52 514.61 C 655.22 532.47 635.8 543.37 618 538.47 Z"/></g></svg>
```

### Urutan video

Video langsung dibuka dengan adegan 1 di frame 0; tidak ada pembuka nyala (dihapus Oktober 2026). Musik cue 1 mulai di adegan 1.

1. **Label lapisan** muncul di adegan 1 (fade masuk 8 frame), di kiri atas tepat di zona aman (x 72, y 200), bertahan 3 dtk lalu memudar. Bila `Lapisan` berisi dua nilai, dua label tampil berdampingan dengan jarak 16 px, lapisan utama di kiri. Lapisan Rekaan tidak boleh dikecilkan atau disembunyikan.
2. **Adegan** seperti 2.5; adegan peta animasi seperti 2.5a. Teks layar dan subtitle mengikuti gaya di 2.5.
3. **Kartu Ulikan (105 frame, 3,5 dtk, selalu ada).** Langsung setelah adegan terakhir, tanpa kalimat penutup tetap dari narator. Ilustrasi adegan terakhir tetap tampil sebagai latar kartu dan Ken Burns-nya berlanjut tanpa lompatan (arah dan kecepatan sama). Dalam 15 frame pertama ilustrasi itu diredupkan dengan lapisan `latar` ber-opacity 0,72 (gambar tersisa ± 28%) dan diberi blur 8 px. Kotak kartu masuk bersamaan (fade 12 frame dan naik 24 px). Di atasnya: kotak `latarNaik` (kiri 72 px, kanan 180 px, atas 520 px, padding 48 px, sudut 20 px, garis 2 px `garis`, jarak antar-baris 32 px) berisi penanda ULIKAN (`label`, `pelita`), teks (`isi`, `tinta`), dan sumber (`keterangan`, `tintaRedup`) bila ada. Di bawahnya, tengah horizontal dan 560 px dari bawah: tanda 88 px + wordmark tinggi ± 96 px berdampingan dengan jarak 14 px. Pada 30 frame terakhir seluruh layar memudar ke `latar` penuh, dan musik memudar 1 dtk di akhir kartu. Bila ilustrasi adegan terakhir belum ada, placeholder-nya yang diredupkan.

## Tahap 1: Validasi konsep

Hasil tahap ini: laporan singkat bahwa KONSEP.md bisa diproduksi, atau daftar masalah.

1. Uraikan KONSEP.md dengan skrip `urai-konsep.mjs` (bukan dibaca manual; di tahap ini disimpan di folder kerja, lalu dipindah ke `scripts/` proyek di Tahap 2) menjadi data: daftar adegan (nomor, babak, nama babak, bidikan A/B, visual, `narasiSuara` persis dengan tag, `narasi` bersih tanpa tag dan dengan spasi dirapikan, teks layar, penanda hening/epilog), suara narator (model, voice, stability, arahan), lembar karakter (nama tokoh dan prompt), prompt adegan, cue musik dan rentang babaknya, tabel SFX, adegan hening, slug, durasi maksimum dan target, rasio, lapisan, latar, kartu Ulikan, penutup prompt, palet per babak, judul dan caption per platform, versi konsep, pemetaan nomor adegan (bila ada), dan peta animasi per adegan (bingkai, sungai dan garis, batas, berkas GeoJSON, jejak sebelumnya, titik dengan koordinat, ikon, pemicu, dan status, serta ikon khusus). Simpan hasilnya sebagai `konsep.json` di folder kerja; folder proyek baru ditentukan di 2.1, dan berkas ini dipindah ke sana di Tahap 2.
2. Jalankan daftar periksa kontrak (lihat Kontrak KONSEP.md v1.5).
3. Hitung jumlah kata narasi (tanpa tag) dan perkiraan durasi pada 130 sampai 135 kata per menit, plus jeda (0,9 dtk per adegan, 1,5 dtk tambahan per adegan hening, dan ± 0,5 dtk per tag bunyi seperti `[sighs]` dan per elipsis), **ditambah 3,5 dtk kartu Ulikan** (tidak ada pembuka); bandingkan dengan durasi maksimum.
4. **Periksa kesiapan merek:**
   - `Lapisan` berisi satu atau dua dari Sejarah, Legenda, Mitos, Rekaan, tanpa duplikat.
   - Kartu Ulikan ada; teksnya paling banyak ±15 kata (hitung dengan skrip). Fakta wajib punya `Sumber`; pertanyaan boleh `-`. Untuk Legenda, Mitos, dan Rekaan, sumber berisi asal cerita atau penegasan bahwa ini rekaan.
   - Bila salah satu lapisan Rekaan, ingatkan bahwa caption juga harus menyebut bahwa kisahnya rekaan.
   - Tag suara hanya di kolom Narasi dan `### Narasi lengkap (ElevenLabs)`, berformat `[kata]` huruf kecil. Bila `### Narasi lengkap (ElevenLabs)` ada, cocokkan dengan kolom Narasi per adegan (abaikan `...` penutup paragraf); bila berbeda, beri peringatan dan sebutkan adegannya. Kolom Narasi yang dipakai. Bila ada tag tetapi `**Model:**` bukan Eleven v3 atau kosong, beri peringatan bahwa tag hanya bekerja di Eleven v3.
   - **Peta animasi:** setiap adegan yang kolom visualnya memuat `**Peta animasi**` punya `### Adegan <n>` di `## Peta animasi`, dan sebaliknya; ada minimal dua titik; bingkai memuat semua titik; setiap `Pemicu` (selain `awal` dan `-`) tertulis persis di narasi adegan itu (abaikan tag dan huruf besar); setiap ikon `umum:` ada di pustaka (2.5a), dan setiap ikon `khusus:` punya entri di `**Ikon khusus:**` lengkap dengan prompt dan sumber; setiap batas punya tahun berlaku, sumber, gaya, dan status, dan tahunnya tidak sesudah masa adegan. Fitur di `Sungai dan garis` atau `Batas` yang tidak ada di data dasar dicatat sebagai kebutuhan GeoJSON. Adegan peta tanpa data diberi peringatan: adegan itu memakai ilustrasi dari prompt cadangan.
   - Penutup prompt menyebut gaya vector art dan rasio 9:16. Bila tidak, beri peringatan (bukan pemblokir), karena gaya gambar Ulik Silam ditetapkan di skill genre.
5. **Format lama.** Jika naskah memakai kolom gabungan `Teks layar / suara` (sebelum kontrak v1), pisahkan secara otomatis: teks dalam tanda kutip setelah `Teks:` menjadi teks layar, sisanya setelah `Suara:` menjadi suara. Jika `Slug` tidak ada, turunkan dari judul dan sebutkan asumsinya. Jika `Penutup prompt` tidak ada, ambil dua baris terakhir yang sama di semua blok prompt. Jika baris `**Judul:**` per platform tidak ada, pakai `Judul` dari Ringkasan konsep. Jika `Versi` tidak ada, anggap `v1`. Jika `### Suara narator` tidak punya baris Model, anggap Eleven v3 dan sebutkan. Jika lembar karakter memakai label lama `**0A · <Nama tokoh>**`, pakai nama tokohnya. Jika `Latar` tidak ada atau kosong, sampul tampil tanpa baris tempat; jangan menebak. Jika `Lapisan` tidak ada, anggap `Sejarah` bila konsep berasal dari pov-sejarah (ada `## Catatan genre` tentang verifikasi fakta); selain itu tanyakan ke Rafi. Jika `## Kartu Ulikan` tidak ada, minta Rafi memberikan teks dan sumbernya (satu pertanyaan) atau menambahkannya lewat skill genre; jangan mengarangnya. Laporkan semua penyesuaian ini.

Serahkan ringkasan (jumlah adegan, kata, perkiraan durasi termasuk elemen merek, lapisan, penyesuaian, masalah). Jika tidak ada masalah yang memblokir, akhiri dengan "Lanjut ke paket produksi?". **Berhenti dan tunggu.**

## Tahap 2: Paket bahan dan proyek Remotion

Hasil tahap ini: folder proyek `<slug>/` berisi paket bahan dan proyek Remotion berlapis merek Ulik Silam yang sudah diuji.

### 2.1 Lokasi

Tanyakan path tujuan di laptop Rafi bila belum jelas (satu pertanyaan). Default: folder kerja saat ini, subfolder `<slug>/`. Jangan menimpa folder yang sudah ada tanpa izin. Bila proyek `<slug>/` sudah ada dan Rafi membawa KONSEP.md versi baru, pakai Tahap 5, bukan tahap ini. Pindahkan `konsep.json` dan `urai-konsep.mjs` dari folder kerja ke proyek (`konsep.json` di akar, skrip di `scripts/`).

### 2.2 Template

Cari proyek POV sebelumnya di sekitar folder kerja dan lokasi yang Rafi sebut (ciri: ada `src/data/adegan.ts` dan `scripts/cek-aset.mjs`, misalnya `pov-bangsawan-jawa`). Jika ada, salin hanya kerangkanya: tanpa `node_modules`, `out/`, `arsip/`, isi proyek lama (`KONSEP.md`, `konsep.json`, `bahan/`, `src/data/`, `src/generated/`), dan aset `public/` **kecuali `public/merek/` dan `public/font/`**, yang dipakai ulang. Lalu, selalu (juga bila `src/lib/merek.ts` sudah ada), cocokkan `merek.ts` dan komponen merek dengan bagian Identitas dan 2.5, dan cari sisa versi lama dengan pencarian teks: komponen atau komposisi `Pembuka`, `desis-api`, dan perhitungan durasi yang masih menambah 45 frame pembuka (dihapus Oktober 2026; adegan 1 mulai di frame 0), `TEKS_PENUTUP`, `Kamu ada di sana`, komponen `Penutup`, `right: 72` di kartu Ulikan, kartu Ulikan berlatar `latar` polos (versi lama, sebelum ilustrasi terakhir dipakai sebagai latar), zona aman lama (`170`, `20%`), satu label lapisan saja. Perbaiki yang ditemukan dan sebutkan. Jika tidak ada template, bangun dengan arsitektur di 2.5. Sebutkan mana yang dipakai.

### 2.3 Paket bahan

- `KONSEP.md` (salinan persis) dan `konsep.json`.
- `bahan/prompt-gemini/karakter-<nama-tokoh>.txt` (satu per lembar karakter, nama tokoh dalam kebab-case), lalu `adegan-01.txt` dan seterusnya. Setiap file diakhiri baris penutup dari konsep.
- `bahan/teks-narasi/babak-N.txt`: narasi satu babak untuk sekali generate di ElevenLabs, dengan tag persis. Satu paragraf per adegan, urut, dipisah satu baris kosong, dan setiap paragraf diakhiri `...` agar ada jeda yang bisa dideteksi saat memotong. Tulis jumlah karakternya di panduan; bila babak terlalu panjang untuk batas karakter di aplikasi, bagi dua di batas adegan (`babak-N-a.txt`, `babak-N-b.txt`).
- `bahan/teks-narasi/adegan-XX.txt`: narasi satu adegan dengan tag, hanya untuk generate ulang satu adegan.
- `bahan/teks-narasi/panduan-elevenlabs.md`: model, voice, stability, arahan per babak dari `### Suara narator`, cara generate (satu babak sekali generate, unduh sebagai `public/narasi/babak-N.<ext>`), cara mengganti satu adegan (`public/narasi/adegan-XX.<ext>`), dan cara memperbaiki potongan dengan `babak-N.waktu.json`.
- `bahan/prompt-suno.md` (tabel cue, Style of Music, Exclude Styles, tips), `bahan/daftar-sfx.md` (tabel SFX lengkap, sesuai konsep), `bahan/caption.md` (judul dan caption per platform, termasuk alternatif judul bila ada).
- `bahan/peta.md` (bila ada adegan peta animasi): per adegan, bingkai, titik rute dengan ikon, pemicu, dan status, fitur dan batas yang digambar, berkas GeoJSON yang dibutuhkan beserta statusnya (sudah diambil Claude atau perlu disiapkan Rafi), pilihan gerak kamera, ilustrasi yang menjadi sumber warna peta, dan catatan bila adegan memakai panggung Gemini atau ilustrasi cadangan.
- `bahan/ikon-peta.md` (bila ada ikon khusus): per ikon, nama berkas yang diharapkan (`public/peta/ikon/<slug>.png`), jenis dan bingkainya, dan prompt Gemini-nya dalam blok kode.
- `AGENTS.md` dan `CLAUDE.md` (isi sama): aturan utama proyek (posisi "kamu" dan detail wajib dari konsep, penutup prompt, catatan khusus genre bila ada di Catatan genre, misalnya penanda dramatisasi untuk tokoh nyata), aturan merek (token hanya dari `src/lib/merek.ts`, urutan adegan dan kartu Ulikan tetap, gaya peta dari `PETA` di `src/lib/merek.ts` dan warna peta dari ilustrasi, lapisan proyek ini), peta file, dan aturan konsistensi tiga tempat.
- `README.md`: prasyarat (Node 20+), perintah (`npm install`, `npm run dev`, `npm run render`, `npm run sampul`, `npm run cek`, `npm run dari-konsep`, `npm run potong`), tabel nama file aset per folder dan per adegan (termasuk `public/merek/`), cara durasi bekerja, masalah umum di Windows, dan lisensi (font OFL, cek lisensi Suno dan pustaka SFX).

### 2.4 File data yang diisi dari konsep

- `src/data/adegan.ts`: `DAFTAR_ADEGAN` (nomor, babak, judul singkat, durasiCadangan dari kolom Waktu, gerak, `narasi` bersih untuk subtitle, `narasiSuara` dengan tag, teksLayar sebagai array, posisiTeksLayar, visual, hening, epilog, kataKunci opsional) dan `NAMA_BABAK`. `gerak` diisi bergantian otomatis (lihat Ken Burns di 2.5) dan `posisiTeksLayar` default `atas`, karena keduanya tidak ada di kontrak. `kataKunci` (satu kata atau frasa per kalimat, diwarnai `pelita` di subtitle) dibiarkan kosong kecuali Rafi memintanya atau `### Teks dan subtitle` di konsep menyebutnya.
- `src/data/audio.ts`: `CUE_MUSIK` (rentang babak), `DAFTAR_SFX` (adegan, detik mulai, volume, ulang), `ADEGAN_HENING`. Kontrak tidak memuat detik, volume, dan ulang, jadi isi dengan nilai awal: detik mulai 0 (atau sesuai momen bila kolom Bunyi menyebutnya), volume 0,5, dan untuk bunyi suasana volume 0,3 dengan ulang aktif. Tulis di README bahwa nilai ini bisa disetel di `audio.ts`.
- `src/data/proyek.ts`: `SUARA` (model, voice, stability, arahan per babak), judul, slug, durasi maksimum, target, rasio, `lapisan` (array berisi satu atau dua nilai, utama lebih dulu), `latar` (tempat untuk sampul, boleh kosong), `ulikan` (teks dan sumber).
- `src/data/peta.ts` (bila ada adegan peta animasi): per adegan, bingkai, fitur dan berkas GeoJSON, batas, jejak sebelumnya, titik (nama di peta, bujur, lintang, ikon, pemicu, status), ikon khusus, pilihan gerak kamera, dan warna peta hasil `npm run peta-warna` (lihat 2.5a).
- `src/lib/merek.ts`: token dari bagian Identitas (`WARNA`, `LAPISAN` berisi nama, warna, dan ikon, `TIPE`, `ZONA`), ditambah `PETA` untuk bentuk peta animasi (tebal garis, butiran, vinyet, ukuran ikon, rentang rona air dan tumbuhan, warna bawaan; warna per video diisi dari ilustrasi, lihat 2.5a).
- `src/peta/ikon/`: pustaka ikon umum (2.5a) sebagai komponen SVG yang warnanya diambil dari `peta.ts`. Isinya tetap untuk semua video; palet babak di konsep hanya untuk prompt ilustrasi, tidak untuk tampilan teks.
- Semua file data dihasilkan oleh skrip `scripts/dari-konsep.mjs` dari `konsep.json`, sehingga perubahan konsep cukup diproses ulang dengan `npm run dari-konsep`.

### 2.5 Arsitektur proyek (bila membangun ulang)

- Remotion 4, satu komposisi. Resolusi dari rasio: 9:16 = 1080 x 1920, 30 fps.
- `scripts/potong-narasi.mjs` (`npm run potong`) memotong setiap `public/narasi/babak-N.*` menjadi `public/narasi/potongan/adegan-XX.wav` dengan ffmpeg bawaan Remotion (`npx remotion ffmpeg`): deteksi hening (sekitar -35 dB, minimal 0,3 dtk), ambil N−1 jeda terpanjang sesuai urutan waktu (N = jumlah adegan di babak itu), dan potong di tengah tiap jeda. Bila `public/narasi/babak-N.waktu.json` ada (daftar detik titik potong), pakai itu. Bila jeda yang ditemukan kurang dari N−1, berhenti untuk babak itu dan minta Rafi mengisi `waktu.json`. Setelah memotong, tulis laporan durasi per adegan dan tandai potongan yang durasinya menyimpang lebih dari 40% dari perkiraan kata (kemungkinan salah potong).
- `scripts/cek-aset.mjs` memindai `public/{ilustrasi,narasi,musik,sfx,merek}` dan menulis `src/generated/aset.json` (ekstensi bebas); dijalankan otomatis oleh `npm run dev/render/sampul`, dan menjalankan `potong-narasi` dulu bila ada berkas babak yang lebih baru dari potongannya. Narasi per adegan dipilih berurutan: `public/narasi/adegan-XX.*` (pengganti manual), lalu `public/narasi/potongan/adegan-XX.wav`. Semua skrip memakai Node, bukan bash, agar jalan di Windows.
- `calculateMetadata` mengukur tiap file narasi (`getAudioDurationInSeconds`) sehingga durasi adegan = 0,3 dtk + narasi + 0,6 dtk (adegan hening + jeda tambahan 1,5 dtk); tanpa narasi pakai durasi cadangan. Total = semua adegan + kartu Ulikan 105 frame; peringatkan bila total melebihi batas.
- Aset yang belum ada tidak menimbulkan error: ilustrasi kosong tampil sebagai kartu placeholder (latar radial `tanah` ke `latar`, teks `tintaRedup`) berisi nomor adegan, deskripsi visual, dan nama file yang dibutuhkan; aset merek yang hilang menampilkan pengganti sederhana dan tercatat di `npm run cek`.
- Komponen merek di `src/komponen/`: `LabelLapisan`, `Subtitle`, `TeksLayar`, `KartuUlikan`, semuanya membaca `src/lib/merek.ts` dan berperilaku seperti di Urutan video. `KartuUlikan` menerima ilustrasi adegan terakhir beserta posisi Ken Burns-nya. Nilai peredup (0,72) dan blur (8 px) disimpan di `merek.ts` sebagai `KARTU_ULIKAN`, supaya bisa dinaikkan bila gambar terakhir terlalu terang.
- Pergantian babak tidak punya judul di layar. Penanda waktu atau tempat hanya muncul bila konsep menuliskannya sebagai teks layar di adegan pertama babak.
- Visual: Ken Burns pelan bergantian (zoom masuk/keluar, geser atas/bawah, maks. 114%), crossfade 15 frame dalam babak tanpa memendekkan total durasi (adegan berikutnya mulai tepat di akhir adegan sebelumnya; ilustrasi sebelumnya ditahan 15 frame lebih lama di bawahnya sementara ilustrasi baru memudar masuk), pudar lewat `latar` (arang, bukan hitam murni) antar-babak. Ken Burns adegan terakhir dihitung sepanjang adegan itu ditambah 105 frame kartu Ulikan, agar geraknya tetap halus saat kartu muncul; pudar akhir ke `latar` di 30 frame terakhir video.
- Teks: pakai div absolut (bukan AbsoluteFill dengan bottom auto) dan `textWrap: balance`.
  - **Subtitle**: dari `narasi` bersih (tanpa tag), gaya `subtitle`, warna `tinta`, rata tengah dan tepat di tengah horizontal (kiri dan kanan sama-sama 180 px), berakhir 460 px dari bawah; dipecah per kalimat (± 24 karakter per baris, paling banyak dua baris, jadi maks. sekitar 46 karakter per potongan; waktu dibagi sebanding panjang teks); bayangan teks `0 2px 12px #14110FCC`; gradasi `bayang` dari bawah setinggi ± 900 px di bawah setiap adegan; `kataKunci` diwarnai `pelita`.
  - **Teks layar**: gaya `kutipan`, warna `tinta`, rata kiri, di sepertiga atas mulai 300 px dari atas (di bawah label lapisan), kiri 72 px dan kanan 180 px.
  - **Label lapisan**: satu atau dua label berdampingan (jarak 16 px, utama di kiri), masing-masing gaya `label` dengan ikon 1,33em di depannya, warna teks, ikon, dan garis tepi 3 px dari warna lapisan, latar `bayang`, padding 15 px atas-bawah, 26 px kiri, 32 px kanan, sudut 6 px.
- Audio: `Html5Audio` untuk narasi per adegan, cue musik dengan loop mulai dari adegan 1, crossfade 1 sampai 2 detik di pergantian babak, ducking di adegan hening (volume musik sekitar 0,16), SFX relatif terhadap awal adegan (nilai negatif dihitung dari akhir adegan), bunyi suasana diulang dengan fade.
- Font disimpan lokal di `public/font` (woff2 dari @fontsource, lisensi OFL) lewat `@remotion/fonts`; jangan `@remotion/google-fonts` karena butuh internet saat render.
- Komposisi `Sampul` (still 1080 × 1920): ilustrasi adegan 1 dengan gradasi `bayang` di bawah, label lapisan (satu atau dua) di kiri atas (72, 200), lalu di kiri bawah (kiri 72, kanan 180, berakhir 520 px dari bawah) `latar` proyek dengan gaya `keterangan` (baris ini tidak ditampilkan bila `latar` kosong) dan judul dengan gaya `judul-sampul` (maks. tiga baris), serta tanda logo 64 px di kiri, 420 px dari bawah. Tanpa wordmark.

### 2.5a Adegan peta animasi

Adegan bertanda `**Peta animasi**` yang datanya ada di `## Peta animasi` digambar komponen `PetaRute` dari data geografi nyata, bukan dari ilustrasi Gemini. Datanya harus akurat, dan tampilannya harus senada dengan ilustrasi Gemini di video itu, bukan peta GIS datar. Acuan tampilan: pratinjau "Peta yang menyesuaikan warna ilustrasinya" (November 2026).

**Data**
- **Data dasar (lokal):** daratan dan batas negara dari `world-atlas` (`land-10m`, `countries-10m`), sungai besar dari Natural Earth `ne_10m_rivers_lake_centerlines`, disimpan di `public/peta/dasar/` agar render tidak butuh internet. Proyeksi Mercator dengan bingkai dari konsep; garis disederhanakan dan hanya bagian di sekitar bingkai yang disimpan.
- **GeoJSON:** fitur di `Sungai dan garis` atau `Batas` yang tidak ada di data dasar (sungai kecil, wilayah adat, wilayah kerajaan) diambil dari `public/peta/<nama>.geojson`. Bila berkas belum ada dan internet tersedia, ambil dari OpenStreetMap lewat Overpass API (misalnya `waterway=river` dengan nama itu di dalam bingkai), sederhanakan, simpan, dan catat di `bahan/peta.md`. Batas sejarah tidak diambil dari OSM; Rafi menyiapkannya dari sumber yang tercatat di konsep. Data OSM wajib diberi atribusi "© OpenStreetMap contributors" kecil di pojok peta (di dalam zona aman) dan di README. Fitur yang tetap tidak tersedia ditampilkan sebagai label saja.

**Bentuk** (token `PETA` di `merek.ts`), tanpa relief, tanpa riak laut, tanpa bayangan daratan:
- satu garis pantai tegas seperti vector art (3 sampai 4 px, warna garis tepi) dengan tepi terang tipis di sisi daratan; di luar garis pantai langsung laut polos;
- tekstur kertas tipis, butiran halus, dan vinyet di tepi;
- sungai dengan garis bawah gelap; kepala rute sebagai pelita (pendar `pelita`) dan pendar hangat lembut di titik berangkat.

**Warna diambil dari ilustrasi video itu** (`npm run peta-warna`, menulis ke `peta.ts`):
- ilustrasi adegan sebelum dan sesudah peta (ditambah ilustrasi lain di babak yang sama bila ada) diperkecil ke ± 80 px, lalu dikelompokkan dengan k-means menjadi enam warna dan diurutkan dari tergelap;
- warna tergelap menjadi garis tepi dan dasar laut, gelap berikutnya menjadi daratan, warna tengah menjadi tepi terang dan bahan ikon; laut dijaga sangat gelap (kecerahan HSL ≤ 0,085) dan daratan gelap (0,08 sampai 0,15) agar label dan subtitle terbaca;
- **tiga makna warna tetap, rona dikunci tetapi nuansanya ikut palet:**
  - **Amber = rute dan yang aktif.** Rute, kepala rute, pondok atau jendela yang menyala, dan pendar ikon aktif selalu `pelita`, tidak ikut palet.
  - **Hijau = tumbuhan.** Pohon, kelapa, dan sawah: rona dikunci 78° sampai 135°, kejenuhan 0,24 sampai 0,42; terang-gelapnya dari palet.
  - **Biru = air.** Rona air dimulai dari 205° lalu digeser ke arah rona dominan palet (rata-rata melingkar warna k-means, dibobot kejenuhan) sejauh −22° sampai +28°, dan selalu dijaga di 180° sampai 235° agar tidak jatuh ke hijau. Kejenuhan dan terang-gelap ikut palet, dan sungai dicampur sedikit dengan warna tengah ilustrasi. Sungai (kecerahan 0,40 sampai 0,52), laut (sangat gelap), label sungai (pucat), dan air di ikon memakai rona yang sama.
- **Batas berwarna netral:** dari warna tengah palet, kejenuhan ≤ 0,10, rona dijauhkan dari amber (20° sampai 60°), selalu lebih redup dari sungai.
- Bila ilustrasi belum ada, pakai warna bawaan Pelita & Bayang di `PETA`, lalu jalankan ulang perintah ini setelah ilustrasi asli masuk (Tahap 3).

**Batas wilayah** (baris `**Batas:**` di konsep; tanpa baris itu peta tidak menggambar batas):
- Hanya batas yang sudah ada di masa adegan itu. Batas negara modern dari Natural Earth tidak dipakai untuk cerita sebelum batas itu ada.
- Gaya `garis` (batas pasti): garis putus-putus tipis (2,4 px, putus 12/10), warna batas netral, opacity ± 0,7, jauh lebih tipis dan redup dari rute.
- Gaya `arsiran` (wilayah berbentuk tetapi tepinya tidak pasti, misalnya wilayah adat atau sebaran suku): arsiran garis miring tipis di dalam wilayah, dibatasi masker yang tepinya dikaburkan sehingga arsiran memudar ke tepi; tanpa garis tepi.
- Gaya `pancaran` (kekuasaan kerajaan lama yang melemah ke pinggiran): gradasi radial samar dari koordinat pusat (ibu kota atau pusat kekuasaan) yang memudar ke luar, tanpa tepi, dengan penanda pusat kecil.
- Batas berstatus `perkiraan` selalu diberi catatan kecil "batas perkiraan".
- Batas tampil sejak peta muncul dan tidak dianimasikan, kecuali bila batas itu punya `Pemicu` (misalnya nama perjanjian): batas `garis` lalu digambar merambat dan batas `arsiran` atau `pancaran` memudar masuk saat pemicu diucapkan.

**Ikon** (semua ikon memakai aturan gambar yang sama: garis tepi gelap setebal garis pantai, cahaya dari kiri atas dengan sisi kiri terang dan kanan gelap, 3 sampai 4 warna dari palet, pendar pelita bila aktif):
- **Ikon umum** (pustaka `src/peta/ikon/`, digambar dalam kode, dipakai ulang di semua video, ± 28 sampai 40 px): `pohon`, `kelapa`, `bukit`, `gunung`, `gunung-api`, `pondok`, `rumah-panjang`, `kampung`, `masjid` (atap tumpang), `gereja`, `candi`, `benteng`, `dermaga`, `perahu`, `kapal-layar`, `sawah`, `makam`. Ikon alam (bukit, gunung, gunung api) memakai warna medan dari palet; ikon buatan manusia memakai warna palet yang dicampur nada kayu atau batu (`#8C6A44`) agar tidak ikut hijau atau biru; tumbuhan mengikuti aturan hijau dan air mengikuti aturan biru. Ikon yang menyala (pondok, rumah panjang, kampung, masjid) punya keadaan redup dan menyala. Ikon baru boleh ditambahkan ke pustaka dengan aturan yang sama; sebutkan saat menyerahkan.
- **Gugus pohon** ditabur dengan seed tetap di daratan sebagai latar, tidak menimpa label, rute, atau ikon titik.
- **Ikon khusus** (per video, ± 64 sampai 96 px): bangunan khusus (kraton, istana, benteng tertentu) berdiri di alas bundar; lambang faksi selalu dibingkai `panji` atau `perisai` agar lambang yang berbeda tetap terlihat satu set. Sumbernya gambar Gemini dari prompt di `**Ikon khusus:**`, disimpan Rafi di `public/peta/ikon/<slug>.png`.
- **Penyelarasan ikon khusus** (`npm run peta-ikon`, setelah `peta-warna`): latar polos dibuang (flood fill dari tepi gambar, atau alfa bila PNG transparan); warna diturunkan ke empat nada menurut kuartil kecerahan dan dipetakan ke nada bahan ikon (gelap, bahan gelap, bahan, bahan terang); jendela atau lampu kuning terang dikenali (rona 32° sampai 61°, kejenuhan > 0,55, kecerahan > 0,6) dan menjadi `pelita` saat ikon aktif; garis tepi seragam 3 px ditambahkan di luar bentuk; hasil diletakkan di alas atau bingkainya dan disimpan ke `public/peta/ikon/<slug>.selaras.png`. Bila gambar belum ada, pakai penanda titik dengan label dan laporkan.
- **Waktu ikon:** ikon umum latar ada sejak peta muncul; ikon titik rute muncul atau menyala saat rute tiba; ikon khusus muncul (skala 0,9 ke 1, fade 10 frame, pendar pelita) saat pemicunya diucapkan.

**Huruf sama dengan produksi**, dari `public/font`: Cormorant Garamond untuk nama tempat (500), tempat tujuan (600), sungai, laut, dan tanggal (500 italic); Plus Jakarta Sans untuk nama wilayah (800, kapital, spasi huruf 0,16em) dan catatan (500). Label diberi garis tepi warna `latar` agar terbaca, label sungai memakai biru pucat, dan label tidak masuk zona subtitle, kolom kanan, atau area teks layar.

**Panggung opsional:** bila ada `public/peta/panggung-XX.<ext>` (gambar Gemini berisi permukaan peta kosong, misalnya kulit kayu atau kertas tua di bawah cahaya pelita, tanpa tulisan), peta digambar di atasnya dengan blend multiply dan sedikit transparansi, dan warna peta diambil dari gambar itu.

**Gerak kamera menyesuaikan rute:** hitung kotak pembatas rute di layar. Bila rute mengisi lebih dari ± 55% lebar layar, pakai bingkai tetap dengan Ken Burns pelan (maks. 106%). Bila rute kecil atau berliku, kamera mengikuti kepala rute dengan perbesaran 1,2 sampai 1,4 kali, lalu mundur perlahan di ± 15% akhir adegan agar seluruh rute terlihat. Gerak selalu dengan easing, tanpa lompatan, dan tujuan akhir tetap di dalam zona aman. Sebutkan pilihan kamera per adegan saat menyerahkan.

**Waktu mengikuti narasi:** waktu tiap kata di narasi adegan peta diambil dengan transkripsi lokal `@remotion/install-whisper-cpp` (model kecil, bahasa Indonesia) dari potongan narasi adegan itu, lalu disimpan di `public/peta/adegan-XX.kata.json`. Rute tiba di tiap titik tepat saat `Pemicu`-nya diucapkan (cocokkan longgar: abaikan huruf besar dan tanda baca); label muncul (fade 8 frame) saat rute tiba; titik `-` dilewati di antara dua pemicu. Rute mulai ± 0,3 dtk setelah adegan masuk, dan tujuan menyala setelah pemicu terakhir. Bila transkripsi tidak tersedia atau pemicu tidak ditemukan, perkirakan waktunya dari posisi karakter pemicu di narasi bersih dan laporkan. Rafi bisa menimpa dengan `public/peta/adegan-XX.waktu.json` (detik per titik).

**Lain-lain:**
- **Jejak sebelumnya** digambar redup dan putus-putus tipis. Bila ada titik berstatus `perkiraan`, tampilkan catatan kecil "rute perkiraan".
- Subtitle, gradasi bawah, label lapisan (bila adegan 1), dan teks layar tetap tampil seperti adegan lain; peralihan masuk dan keluar memakai crossfade 15 frame yang sama. Ken Burns biasa tidak dipakai di adegan peta (diganti gerak kamera di atas).
- **Cadangan:** bila data peta tidak ada atau tidak lengkap, adegan itu memakai ilustrasi dari prompt cadangan (`public/ilustrasi/adegan-XX.*`) seperti adegan biasa, dan hal ini dilaporkan.

### 2.6 Uji

- `tsc --noEmit` lolos.
- Isi sementara `public/` dengan aset uji (gambar polos berlabel, dan satu berkas babak berisi nada sinus sebanyak jumlah adegan babak itu dengan jeda hening di antaranya, untuk menguji `npm run potong`; jangan menimpa `public/merek/`), render still di titik berikut dan satu potongan pendek, lalu lihat hasilnya:
  - frame 0 dan detik pertama adegan 1 (label lapisan, satu atau dua, di zona aman);
  - adegan dengan teks layar terpanjang dan dengan subtitle terpanjang (subtitle tepat di tengah, dua baris, tidak masuk zona bawah atau kanan);
  - adegan hening, peralihan ke kartu Ulikan (Ken Burns tidak melompat), dan kartu Ulikan dengan gambar uji yang terang (teks tidak terpotong, logo dan wordmark utuh, ilustrasi di belakang cukup redup);
  - sampul;
  - bila ada adegan peta animasi: still di awal rute, di setiap pemicu, dan di akhir; satu potongan dari adegan sebelum sampai adegan sesudah peta (crossfade masuk dan keluar); lembar kontak adegan n−1, n, dan n+1 berdampingan untuk menilai apakah warna peta senada dengan ilustrasi (pakai ilustrasi uji bila aset asli belum ada); dan lembar ikon yang dipakai video itu (ikon umum dan ikon khusus setelah diselaraskan, redup dan menyala). Pastikan pohon tetap hijau, air tetap biru, rute tetap amber, label tidak terpotong, dan tidak ada yang masuk zona aman.
- Hapus semua aset uji sesudahnya.

### 2.7 Pemeriksaan sebelum menyerahkan paket

- [ ] Narasi identik di `KONSEP.md`, `bahan/teks-narasi/` (berkas babak = gabungan adegannya), dan `src/data/adegan.ts`, dengan dan tanpa tag (dicek dengan skrip `npm run cek`); tidak ada `[` atau `]` di data subtitle.
- [ ] Uji `npm run potong` menghasilkan potongan sejumlah adegan babak uji.
- [ ] Jumlah file prompt adegan dan narasi = jumlah adegan; setiap file prompt diakhiri baris penutup dari konsep.
- [ ] `npm run cek` juga memastikan: lapisan sah (satu atau dua), kartu Ulikan terisi dan paling banyak ±15 kata (fakta punya sumber; pertanyaan boleh `-`), dan `public/merek/` lengkap atau kekurangannya tercatat.
- [ ] Typecheck lolos; still uji tidak menunjukkan teks terpotong atau keluar zona aman.
- [ ] Bila ada adegan peta animasi: data dasar lokal ada, GeoJSON yang dibutuhkan sudah diambil atau tercatat di `bahan/peta.md`, atribusi OSM ada bila datanya dipakai, batas sesuai masa cerita, ikon khusus sudah diselaraskan atau tercatat di `bahan/ikon-peta.md`, huruf label dari `public/font`, dan still uji peta lolos.
- [ ] Aset uji sudah dihapus dari `public/`; zip (bila dikirim) tanpa `node_modules`.

Serahkan lokasi folder (atau zip) dan urutan produksi untuk Rafi:

1. Generate narasi per babak di ElevenLabs (Eleven v3) dari `bahan/teks-narasi/babak-N.txt` mengikuti `panduan-elevenlabs.md`, simpan sebagai `public/narasi/babak-N.<ext>` (durasi video mengikuti rekaman).
2. Buat lembar karakter, lalu ilustrasi per adegan dari `bahan/prompt-gemini/`.
3. Buat cue musik dari `bahan/prompt-suno.md` dan kumpulkan SFX dari `bahan/daftar-sfx.md` (dan berkas GeoJSON, gambar ikon khusus, atau panggung peta yang diminta di `bahan/peta.md` dan `bahan/ikon-peta.md`, bila ada).
4. Taruh semua di `public/` sesuai tabel README, lalu minta pemeriksaan sebelum render.

**Berhenti dan tunggu.**

## Tahap 3: Pemeriksaan sebelum render

Dijalankan saat Rafi kembali dengan aset.

- [ ] Nama dan jumlah file di `public/` sesuai tabel README, termasuk `public/merek/` (tanda dan wordmark); laporkan yang kurang atau salah nama, dan tawarkan mengganti nama otomatis bila jelas cocok.
- [ ] `npm run potong` berhasil untuk setiap babak. Laporkan potongan yang ditandai menyimpang, dan render potongan pendek di setiap batas adegan untuk didengar; bila ada yang salah potong, bantu Rafi mengisi `babak-N.waktu.json`.
- [ ] Total durasi dari rekaman narasi, ditambah kartu Ulikan, di bawah batas. Jika lewat, laporkan kelebihannya dalam detik dan adegan yang bisa dipangkas; pemangkasan dikerjakan Rafi di skill genre (Tahap R), lalu masuk lewat Tahap 5.
- [ ] Tanyakan apakah ada kata yang berbeda dari teks: ElevenLabs bisa melewatkan, mengulang, atau menambah kata (lebih sering di stability Creative), dan rekaman sendiri bisa diimprovisasi. Subtitle diambil dari `adegan.ts`, jadi teks dan suara harus sama. Bila ada yang berbeda dan Rafi tidak mau generate ulang adegan itu, catat perbedaannya sebagai laporan untuk skill genre, yang juga memverifikasi fakta barunya; jangan mengubah `KONSEP.md` atau `adegan.ts` sebelum KONSEP.md versi baru diterima lewat Tahap 5.
- [ ] Ilustrasi berorientasi vertikal, wajah dan detail kunci tidak berada di sepertiga bawah, tepi kanan, atau tepi lain (ada zoom hingga 114%), dan gayanya sekeluarga (vector art detail, cahaya hangat); sebutkan adegan yang gayanya menyimpang.
- [ ] Render still di beberapa titik dan potongan pendek; cek keterbacaan teks, posisi label dan subtitle, dan keseimbangan volume narasi, musik, SFX.
- [ ] Render still kartu Ulikan dengan ilustrasi terakhir yang asli: logo, wordmark, dan tepi kotak harus tetap jelas. Bila gambar terlalu terang atau ramai, naikkan peredup di `KARTU_ULIKAN` (misalnya ke 0,8) dan sebutkan.

Laporkan hasilnya dan akhiri dengan "Render final?". **Berhenti dan tunggu.**

- [ ] Adegan peta animasi (bila ada): jalankan `npm run peta-warna` dengan ilustrasi asli, lalu `npm run peta-ikon` untuk ikon khusus; transkripsi kata berhasil dan setiap pemicu ditemukan (atau `waktu.json` diisi); render lembar kontak adegan sebelum, peta, dan sesudah serta lembar ikon. Bila peta atau ikon masih terasa jomplang (lebih terang, lebih datar, atau warnanya lain), setel `PETA` (butiran, vinyet, tebal garis) atau ganti ilustrasi sumber warnanya, lalu sebutkan perubahannya.

## Tahap 4: Render final

- Render video final ke `out/<slug>.mp4` dan sampul ke `out/<slug>-sampul.png`.
- Laporkan durasi dan ukuran file.
- Ingatkan Rafi untuk menonton di ponsel dengan dan tanpa suara sebelum mengunggah (cek juga bahwa subtitle dan label tidak tertutup antarmuka TikTok dan Shorts), dan memakai caption dari `bahan/caption.md` (termasuk penanda yang diwajibkan skill genre, bila ada, dan penegasan rekaan untuk lapisan Rekaan).

## Tahap 5: Pembaruan konsep

Dipakai kapan saja setelah Tahap 2, saat Rafi membawa KONSEP.md versi baru untuk proyek yang sudah ada (biasanya hasil Tahap R di skill genre, misalnya dengan prompt "Perbarui proyek dari KONSEP.md ini dengan skill pov-produksi"). Hasil tahap ini: proyek yang datanya mengikuti konsep baru, aset yang namanya sudah disesuaikan, dan daftar aset yang harus dibuat ulang.

### 5.1 Validasi

- Jalankan Tahap 1 pada konsep baru.
- Pastikan `Slug` sama dengan proyek dan `Versi` lebih tinggi dari `KONSEP.md` di proyek. Bila tidak, tanyakan (satu pertanyaan); jangan menebak mana yang terbaru.

### 5.2 Bandingkan

Bandingkan `konsep.json` lama dengan yang baru memakai skrip, per bagian: adegan yang ditambah, dihapus, digabung, atau dipindah; narasi; teks layar; prompt adegan dan lembar karakter; cue musik dan rentang babak; SFX; adegan hening; lapisan; latar; kartu Ulikan; caption; peta animasi (bingkai, titik, ikon, pemicu, batas, GeoJSON, ikon khusus).

Pemetaan nomor adegan diambil dari `### Pemetaan nomor adegan` di konsep baru. Bila bagian itu tidak ada tetapi jumlah atau urutan adegan berubah, susun usulan pemetaan dari kemiripan narasi dan tandai jelas sebagai usulan yang perlu dikonfirmasi Rafi.

### 5.3 Rencana

Tulis rencana singkat di chat, lalu **berhenti dan tunggu**:

- file data dan bahan yang dibuat ulang;
- tabel ganti nama aset `public/` (lama → baru), per folder;
- aset yang harus dibuat ulang: rekaman babak yang narasi, tag, atau arahan suaranya berubah (atau rekaman satu adegan sebagai pengganti di `public/narasi/adegan-XX.<ext>` bila hanya satu adegan berubah), ilustrasi adegan yang visual atau promptnya berubah, lembar karakter yang berubah, cue musik yang berubah;
- aset yang tidak terpakai lagi.

### 5.4 Kerjakan (setelah Rafi setuju)

1. Simpan `KONSEP.md` dan `konsep.json` lama ke `arsip/v<n lama>/`.
2. Salin konsep baru dan `konsep.json` baru ke proyek, lalu jalankan `npm run dari-konsep`.
3. Tulis ulang berkas `bahan/` yang berubah; berkas yang sama tidak disentuh.
4. Hapus potongan lama di `public/narasi/potongan/` untuk babak yang berubah (dibuat ulang otomatis), lalu ganti nama aset `public/` dengan skrip Node dua langkah (semua ke nama sementara dulu, lalu ke nama akhir) supaya tidak saling menimpa.
5. Pindahkan aset yang tidak terpakai ke `arsip/v<n lama>/public/`; jangan dihapus.

### 5.5 Uji dan serahkan

- `npm run cek` dan `tsc --noEmit` lolos; render still di adegan yang berubah dan di kartu Ulikan.
- Serahkan ringkasan: versi lama → baru, apa yang berubah, aset yang sudah diganti nama, dan daftar aset yang harus dibuat ulang. Setelah aset siap, lanjut ke Tahap 3.

**Berhenti dan tunggu.**

## Kontrak KONSEP.md v1.5

Format ini dihasilkan skill genre (misalnya pov-sejarah) dan harus identik dengan kontrak di skill-skill itu. Konsep v1 tetap terbaca: bagian dan baris baru di v1.1 sampai v1.5 boleh tidak ada, dan label lama lembar karakter tetap diterima. Judul bagian `##` ditulis persis seperti di bawah dan berurutan. Bagian bertanda (opsional) boleh tidak ada.

1. `# Konsep Video POV: <topik>`
2. `## Ringkasan konsep` berisi tabel `| Keputusan | Isi |` dengan baris wajib: `Judul`, `Slug` (kebab-case huruf kecil, dipakai sebagai nama folder proyek, misalnya `pov-francois-tack`), `Durasi` (tulis batas dan target, misalnya `3:00 maksimum, target ±2:50`), `Rasio` (misalnya `9:16`), `Platform`, `Posisi "kamu"`, `Jumlah ilustrasi`. Baris opsional: `Versi` berformat `v<n> · <YYYY-MM-DD>` (tidak ada = `v1`); `Lapisan` berisi satu atau dua dari `Sejarah`, `Legenda`, `Mitos`, `Rekaan`, dipisah koma, lapisan utama lebih dulu (misalnya `Sejarah, Legenda`); `Latar` berisi tempat untuk sampul, tanpa tahun (misalnya `Yogyakarta`, atau dengan keterangan era seperti `Batavia, masa VOC`). Baris lain bebas.
3. `## Gaya visual dan konsistensi tokoh` berisi, di antara isi lain:
   - tabel `| Babak | Suasana | Palet | Cahaya |`, satu baris per babak, kolom Babak diawali nomor (`1 Nama babak`);
   - baris `**Penutup prompt:**` diikuti blok kode berisi baris penutup persis yang wajib mengakhiri setiap prompt.
4. `## Struktur alur` (diagram atau tabel; tidak dibaca otomatis).
5. `## Naskah adegan` berisi satu subjudul per babak `### Babak <n>: <nama>` dan di bawahnya tabel dengan kolom persis:
   `| # | Waktu | Bidikan dan visual | Narasi | Teks layar | Suara |`
   - `#` nomor adegan berurutan dari 1, unik di seluruh dokumen.
   - `Waktu` format `m:ss–m:ss` (perkiraan; durasi akhir mengikuti rekaman).
   - `Bidikan dan visual` diawali `A.` (orang pertama) atau `B.` (sorotan tokoh), lalu deskripsi.
   - `Narasi` teks narasi lengkap tanpa tanda kutip pembuka/penutup tambahan; ini sumber kebenaran narasi. Boleh memuat tag suara Eleven v3 dalam kurung siku, huruf kecil, bahasa Inggris (misalnya `[whispers]`), ditaruh tepat sebelum frasa yang dipengaruhinya, dan elipsis `...` untuk jeda. Tag dibuang dari subtitle dan tidak dihitung sebagai kata; elipsis tetap tampil.
   - `Teks layar` teks yang tampil di layar tanpa tanda kutip; beberapa teks berurutan dipisah ` / `; isi `-` bila tidak ada.
   - `Suara` deskripsi suara bebas (untuk manusia; SFX yang dipasang diambil dari tabel Efek suara).
   - Adegan hening ditandai `**Momen hening**` di kolom visual; adegan epilog ditandai `**Epilog**`; adegan peta animasi ditandai `**Peta animasi**` (datanya di bagian 6a, dan tetap punya prompt cadangan di bagian 6).
6. `## Prompt ilustrasi untuk Gemini` berisi:
   - `### Lembar karakter` dengan setiap lembar sebagai baris `**Lembar karakter · <Nama tokoh>**` diikuti satu blok kode prompt; nama tokoh unik dan ditulis persis sama di prompt adegan yang merujuknya (label lama `**0A · <Nama tokoh>**` dari kontrak v1 tetap diterima);
   - setiap adegan sebagai baris `**Adegan <n> · Narasi (<m:ss–m:ss>):** <narasi>` diikuti satu blok kode prompt; subjudul babak di antaranya boleh ada.
   - Setiap blok kode prompt diakhiri baris penutup dari bagian Gaya visual.
6a. `## Peta animasi` (opsional; v1.4, diperluas di v1.5) untuk adegan yang kolom `Bidikan dan visual`-nya memuat `**Peta animasi**`. Satu subjudul per adegan peta, `### Adegan <n>`, berisi:
   - baris `**Bingkai:** <bujur barat>–<bujur timur> BT, <lintang selatan>–<lintang utara> LU` dalam derajat desimal (lintang selatan dan bujur barat ditulis negatif);
   - baris `**Sungai dan garis:** <nama>, <nama>` (sungai, pantai, atau jalan yang digambar; `-` bila tidak ada);
   - baris `**Batas:** <nama batas> (<tahun berlaku>; <sumber>; <gaya>; <status>), ...` (sejak v1.5): gaya `garis` (batas pasti), `arsiran` (wilayah berbentuk tetapi tepinya tidak pasti), atau `pancaran` (kekuasaan yang melemah dari pusat; tambahkan `pusat <bujur>, <lintang>`); status `terverifikasi` atau `perkiraan`; boleh ditambah `pemicu <kata>` bila batas muncul saat disebut. Hanya batas yang sudah ada di masa adegan itu; `-` bila tidak ada batas;
   - baris `**GeoJSON:** <nama-berkas.geojson>, ...` untuk fitur atau batas yang tidak ada di data dasar, disimpan di `public/peta/`; `-` bila tidak perlu;
   - baris opsional `**Jejak sebelumnya:** <nama titik>, <nama titik>, ...` beserta koordinatnya dalam kurung `(bujur, lintang)` (rute dari part sebelumnya, digambar redup);
   - tabel `| Titik | Nama di peta | Bujur | Lintang | Ikon | Pemicu | Status |` (kolom `Ikon` sejak v1.5; tabel v1.4 tanpa kolom itu tetap dibaca): titik berurutan sepanjang rute; `Nama di peta` label yang tampil (tanpa tag; `-` untuk titik belok tanpa label); `Ikon` `umum:<nama>` dari pustaka, `khusus:<slug>`, atau `-`; `Pemicu` kata atau frasa yang tertulis persis di narasi adegan itu dan menandai saat rute tiba di titik itu (`awal` untuk titik pertama, `-` untuk titik belok); `Status` `terverifikasi` atau `perkiraan`;
   - subbagian opsional `**Ikon khusus:**` (sejak v1.5): per ikon, baris `- <slug>: <bangunan | lambang (panji | perisai)>; <deskripsi bentuk singkat>; sumber <sumber bentuk>`, lalu blok kode prompt Gemini dalam bahasa Inggris (satu objek di tengah, tampak depan tiga perempat, latar polos satu warna, tanpa tulisan, tanpa bayangan jatuh) diakhiri `Style: detailed vector art` dan `Aspect ratio: 1:1`. Ikon khusus juga boleh dipakai tanpa titik rute dengan menyebut `pemicu <kata>` dan koordinatnya di baris itu.
   Bila ada titik berstatus `perkiraan`, peta menampilkan catatan kecil "rute perkiraan"; bila ada batas berstatus `perkiraan`, catatan "batas perkiraan".
7. `## Panduan narasi dan audio` berisi:
   - `### Suara narator` berisi baris opsional `**Model:** <model ElevenLabs, misalnya Eleven v3>`, `**Voice:** <nama voice atau ->`, `**Stability:** <Creative, Natural, atau Robust>`, lalu arahan bebas (boleh per babak);
   - `### Narasi lengkap (ElevenLabs)` (opsional; tidak dibaca otomatis, hanya dicocokkan) berisi untuk tiap babak baris `**Babak <n>: <nama>**` diikuti satu blok kode: narasi babak itu dengan tag persis, satu paragraf per adegan, urut, dipisah satu baris kosong, setiap paragraf diakhiri `...` (tidak ditambah bila sudah berakhir elipsis). Isinya harus sama dengan kolom Narasi di naskah; bila berbeda, kolom Narasi yang berlaku;
   - `### Musik (Suno)` dengan tabel `| Cue | Babak | Durasi target | Suasana |`, kolom Cue berformat `<n> · <nama>` dan kolom Babak berformat `<awal>–<akhir>` atau satu angka; lalu untuk tiap cue baris `**Cue <n>**`, satu blok kode Style of Music, dan baris `Exclude Styles: \`...\``;
   - `### Efek suara` dengan tabel `| # | Adegan | Bunyi | Kata kunci pustaka | Prompt generator AI |`, kolom Adegan berisi satu nomor adegan;
   - baris `**Adegan hening:** <n>[, <n>]` (nomor adegan tempat musik diturunkan); tulis `-` bila tidak ada;
   - `### Teks dan subtitle` (bebas; boleh menyebut kata kunci subtitle).
8. `## Kartu Ulikan` (wajib untuk video Ulik Silam; konsep lama tanpa bagian ini tetap terbaca dan isinya diminta saat validasi pov-produksi) berisi baris `**Teks:** <satu fakta atau pertanyaan, maks. ±15 kata>` dan baris `**Sumber:** <sumber, asal cerita, atau penegasan rekaan>` (`-` hanya bila teksnya pertanyaan).
9. `## Judul, caption, dan hashtag` dengan subjudul `### <Platform>`; di bawahnya baris `**Judul:** <judul>` bila platform memakai judul terpisah (misalnya YouTube Shorts; tidak ada = memakai `Judul` dari Ringkasan konsep), baris bebas lain boleh ada (misalnya alternatif judul), lalu caption dalam satu blok kode dengan hashtag di baris terakhir.
10. `## Catatan genre` (opsional; untuk sejarah: verifikasi fakta). Tidak dibaca otomatis, disalin apa adanya.
11. `## Alur produksi dan checklist` (opsional; boleh memuat `### Riwayat revisi` dan `### Pemetaan nomor adegan` berisi tabel `| Lama | Baru |` untuk revisi terakhir yang mengubah nomor adegan; `-` di kolom Baru berarti adegan dihapus, `-` di kolom Lama berarti adegan baru).
12. `## Sumber` (opsional).
13. `## Ide cadangan` (opsional).

Daftar periksa kontrak: semua judul bagian wajib ada; jumlah baris naskah = jumlah prompt adegan = nomor adegan terbesar; setiap tabel memakai kolom persis; Slug terisi; baris Penutup prompt ada dan setiap prompt diakhiri isinya; setiap subjudul platform punya satu blok kode caption; `Lapisan` (bila ada) berisi satu atau dua nilai sah tanpa duplikat; nama tokoh di lembar karakter unik; `## Kartu Ulikan` (bila ada) memuat baris Teks dan Sumber; tag suara `[...]` hanya ada di kolom Narasi dan `### Narasi lengkap (ElevenLabs)` (tidak di Teks layar, kartu Ulikan, judul, atau caption); `### Narasi lengkap (ElevenLabs)` (bila ada) punya satu blok per babak dan isinya sama dengan kolom Narasi; setiap adegan bertanda `**Peta animasi**` punya `### Adegan <n>` di `## Peta animasi` dan sebaliknya, dengan setiap `Pemicu` (selain `awal` dan `-`) tertulis di narasi adegan itu dan setiap ikon `khusus:` punya entri di `**Ikon khusus:**`.