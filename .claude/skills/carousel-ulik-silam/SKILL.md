---
name: carousel-ulik-silam
description: Gunakan saat Rafi ingin membuat carousel foto Ulik Silam (TikTok Photo Mode dan Instagram) dari ide sampai PNG di repo ulik-silam: brief, teks slide, verifikasi, ilustrasi dan arsip, caption, render, revisi. Semua lapisan. Video pakai skill genre dan pov-produksi.
---

# Carousel Ulik Silam: dari ide sampai slide jadi

Skill ini menyusun dan merender carousel foto untuk akun **Ulik Silam**: deretan slide yang digeser penonton, satu gagasan per slide. Berbeda dengan video, carousel dibaca, bukan didengar: tidak ada narator, musik produksi, atau Remotion video. Karena itu satu skill ini menangani semuanya, dari ide sampai PNG siap unggah.

Tahapannya: Tahap 1 (ide dan brief), Tahap 2 (naskah slide dan verifikasi), Tahap 3 (visual, arsip, kartu Ulikan, dan caption), Tahap 4 (render dan pemeriksaan), lalu Tahap R untuk revisi. Komunikasi dengan Rafi dalam Bahasa Indonesia; semua prompt untuk generator AI ditulis dalam bahasa Inggris.

Prinsipnya: **satu slide, satu gagasan; orang menggeser karena penasaran, bukan karena disuruh.** Disiplin fakta sama dengan video Ulik Silam: teks di slide sama mudahnya di-screenshot dan dikutip orang.

## Peta repo yang dipakai

| Apa | Di mana |
| --- | --- |
| Isi carousel (sumber kebenaran) | `proyek/<slug>/CAROUSEL.md` (Kontrak CAROUSEL.md v1.2 di akhir skill ini) |
| Tahap, prioritas, catatan | `proyek/<slug>/proyek.yaml` dengan `format: Carousel`; `STATUS.md` dibuat ulang dengan `python3 scripts/buat-status.py` |
| Ilustrasi per slide | `$ASET_DIR/proyek/<slug>/ilustrasi/slide-XX.<png/jpg/webp>` |
| Foto atau karya arsip | `$ASET_DIR/proyek/<slug>/arsip/slide-XX.<png/jpg/webp>` |
| Hasil render | `$ASET_DIR/proyek/<slug>/render/tiktok/NN.png`, `render/instagram/NN.png`, lembar kontak |
| Tampilan (warna, huruf, logo, label lapisan) | `merek/` (`tokens.json`, `identitas.json`, `logo/`, `font/`); templat carousel di `paket/carousel` |
| Ilustrasi video yang dipakai ulang | `$ASET_DIR/proyek/<slug-video>/ilustrasi/adegan-XX.*` |
| Tokoh, busana, latar yang sudah ada | `pustaka/` (kartu) dan `$ASET_DIR/pustaka/` (berkas) |
| Tata letak acuan | Kanvas "Mockup Layout Carousel Ulik Silam" (`https://claude.ai/artifact/DFr62weova8Nfb7yJznS51`) |

`$ASET_DIR` dibaca dari `.env` (bawaan `aset/` di repo, diabaikan git). Jangan commit gambar atau hasil render.

## Cakupan

- **Lapisan:** Sejarah, Legenda, Mitos, dan Rekaan, satu atau dua label seperti video (lapisan utama lebih dulu).
- **Platform:** TikTok Photo Mode (kanvas 1080 × 1920, 9:16) dan feed Instagram (kanvas 1080 × 1350, 4:5). Satu data slide dirender ke dua ukuran.
- **Lima jenis carousel:**

  | Jenis | Isi | Contoh |
  | --- | --- | --- |
  | Pendamping video | Hal yang tidak muat di video: entri yang tidak masuk, versi lain, sumber, angka, peta | "9 nama, bukan 5" untuk video istri Soekarno |
  | Daftar | Satu slide per entri, peringkat atau kumpulan | "5 benteng VOC yang masih berdiri" |
  | POV slide | Kisah "kamu" dalam 6 sampai 10 momen, satu momen per slide | "Kamu abdi Puri Denpasar, 20 September 1906" |
  | Di balik riset | Versi populer dibandingkan dengan versi bersumber | "Benarkah Fatmawati menjahit bendera sendirian?" |
  | Linimasa | Satu peristiwa atau hidup tokoh dari awal sampai akhir | "Dari Ende ke Bengkulu: 9 tahun pembuangan" |

- **Di luar cakupan:** video (pakai skill genre: pov-sejarah, pov-rekaan, pov-mitos-legenda, narasi-sejarah, daftar-sejarah; produksi pakai pov-produksi), carousel iklan atau promosi berbayar, desain merek baru (ubah di sistem desain Ulik Silam lalu sinkronkan `merek/`), dan meme.
- **Tokoh yang masih hidup:** hanya fakta publik yang terdokumentasi; tidak ada slide yang menilai watak atau moral, dan tidak ada berita pribadi terkini yang tidak berkaitan dengan topik.
- **Topik kekerasan atau korban:** tanpa gambar grafis; tampilkan suasana sebelum atau sesudah, benda, atau siluet.

## Aturan tetap

1. **Penutup prompt Gemini.** Setiap prompt ilustrasi (lembar karakter dan ilustrasi slide) diakhiri dua baris ini, persis, setelah satu baris kosong:

   ```
   Style: detailed vector art
   Aspect ratio: 9:16
   ```

   Ilustrasi selalu dibuat 9:16; versi Instagram memotongnya ke 4:5 saat render. Gaya hanya diganti bila Rafi memintanya.
2. **Gemini tidak pernah menulis teks.** Semua teks (judul, isi, angka, label, sumber) dipasang oleh templat saat render. Setiap prompt memuat "text, letters, labels, watermarks" di kalimat "Avoid ...".
3. **Verifikasi ketat**, dengan aturan yang sama dengan skill genre (ringkasannya di 2.3). Klaim yang tidak lolos tidak tampil sebagai fakta. Sumber, halaman, atau kutipan tidak pernah dikarang.
4. **Tampilan hanya dari `merek/` dan `paket/carousel`.** Jangan menciptakan gaya lain per carousel dan jangan hard-code warna atau huruf di luar keduanya; yang berbeda hanya isi, lapisan, ilustrasi, dan arsip.
5. **Batas teks per slide** (dihitung dengan skrip):

   | Bagian | Batas |
   | --- | --- |
   | Judul sampul | ≤ 10 kata, maksimal tiga baris |
   | Subjudul sampul | ≤ 12 kata, opsional |
   | Judul slide | ≤ 8 kata |
   | Isi slide | ≤ 35 kata (slide jenis Teks ≤ 45 kata) |
   | Keterangan arsip | ≤ 25 kata |
   | Kartu Ulikan | ≤ ±15 kata, idealnya 10 sampai 12 |

6. **Jumlah slide** default 6 sampai 10, minimal 4, maksimal 15. Lebih dari itu dipecah menjadi dua part.
7. **Rekaan selalu diakui.** Carousel berlapis Rekaan menampilkan label Rekaan di sampul (tidak boleh dikecilkan atau disembunyikan) dan menyatakan rekaan di caption. Legenda dan Mitos menyebut versi dan asal kisahnya di slide Penutup atau kartu Ulikan dan di caption, tanpa mengklaimnya sebagai sejarah dan tanpa merendahkan orang yang meyakininya.
8. **Foto asli adalah bukti, bukan bahan campuran.** Foto atau karya sezaman tampil di slide `Arsip`, atau sebagai cetakan di slide `Entri` di atas ilustrasi latar yang diredupkan (lihat 3.2), selalu apa adanya dan sebagai benda terpisah. Tidak dilebur ke dalam ilustrasi, tidak diwarnai atau dipertajam AI tanpa keterangan, dan Gemini tidak diminta menyalin komposisi foto berhak cipta. Koleksi, lisensi, dan penanda rekonstruksi ditulis di caption dan teks alternatif, tidak di slide.
9. **Preferensi tetap Rafi:** motif batik parang dihindari di semua ilustrasi; batik lain boleh bila sesuai riset. Gaya ilustrasi detailed vector art 9:16.
10. **Berhenti di setiap akhir tahap.** Setiap tahap diakhiri pemeriksaan, penyerahan, lalu menunggu Rafi bilang lanjut.

## Alat dan cadangannya

Cek alat yang tersedia di awal sesi, diam-diam, lalu pakai cadangan bila perlu dan sebutkan dalam satu kalimat saat menyerahkan hasil.

| Kebutuhan | Alat utama | Cadangan bila tidak tersedia |
| --- | --- | --- |
| Konsep carousel | `proyek/<slug>/CAROUSEL.md` di repo (lewat Claude Code atau bridge ke laptop Rafi) | Artifact tipe Docs selama penyusunan, lalu ekspor ke `CAROUSEL.md` |
| Bahan dari video | `proyek/<slug-video>/KONSEP.md` di repo | Dokumen konsep di Project, atau minta Rafi melampirkannya |
| Ilustrasi pakai ulang | `$ASET_DIR/proyek/<slug-video>/ilustrasi/` dan `$ASET_DIR/pustaka/` | Minta Rafi melampirkan berkas yang dibutuhkan |
| Riset dan verifikasi | Web search dan fetch halaman | Pengetahuan umum, setiap klaim berlabel "perlu dicek"; carousel tidak dirender sebagai final |
| Pemeriksaan silang | Subagen terpisah yang belum melihat tabel verifikasi (alat Agent) | Periksa ulang sendiri dengan pencarian baru dan kata kunci berbeda |
| Tampilan | `merek/` dan templat `paket/carousel/src/Slide.jsx` (dipakai bersama pratinjau katalog dan render) | - |
| Render PNG | `npm run carousel -- <slug>` (Remotion, sama dengan video), atau tombol Render di tab Render katalog | Chrome Headless Shell yang terpasang (`--browser=<path>`) bila Remotion tidak bisa mengunduhnya |
| Hitung kata dan cek tata letak | Skrip di shell | Hitung manual, sebutkan bahwa hasilnya perkiraan |

## Identitas carousel

Sumber kebenarannya `merek/tokens.json` dan `merek/identitas.json`; ringkasan di bawah hanya untuk menulis naskah dan memeriksa hasil. Bila berbeda, `merek/` yang benar dan skill ini perlu diperbarui. Carousel selalu memakai tema Malam (gelap).

### Warna (token di `merek/tokens.json`)

| Token | Dipakai untuk |
| --- | --- |
| `latar` | Latar slide, peredup ilustrasi |
| `latar-naik` | Kotak kartu Ulikan, blok Banding |
| `garis` | Garis tepi kotak, garis linimasa |
| `tinta` | Judul dan isi |
| `tinta-redup` | Keterangan, sumber, nomor halaman, label arsip |
| `pelita` | Satu-satunya aksen: tanda logo, angka entri, titik linimasa, penanda ULIKAN, paling banyak satu kata kunci per slide |
| `tanah` | Pusat cahaya hangat di slide tanpa gambar, slide Arsip, dan placeholder |
| `bayang` | Gradasi gelap di bawah teks di atas ilustrasi |
| `lapis-sejarah`, `lapis-legenda`, `lapis-mitos`, `lapis-rekaan` | Label lapisan di sampul, selalu ikon + kata |

### Huruf

Cormorant Garamond (500, 600, 500 italic) dan Plus Jakarta Sans (500, 700, 800) dari `merek/font/`. Ukuran carousel belum ada di sistem desain; sampai ditambahkan ke sistem desain dan disinkronkan, ukuran ini berlaku dan dicatat di `paket/carousel`:

| Gaya | Huruf | 9:16 ukuran / baris | 4:5 ukuran / baris | Berat | Dipakai untuk |
| --- | --- | --- | --- | --- | --- |
| `judul-sampul` | Cormorant Garamond | 104 / 104 | 92 / 96 | 600 | Judul sampul |
| `judul-slide` | Cormorant Garamond | 76 / 84 | 68 / 76 | 600 | Judul slide, nama entri |
| `kutipan` | Cormorant Garamond italic | 56 / 70 | 50 / 62 | 500 | Slide Teks, kalimat Penutup |
| `angka` | Cormorant Garamond, angka lurus (`font-feature-settings: 'lnum' 1`) | 140 / 140 | 120 / 120 | 600 | Nomor entri (warna `pelita`); tahun linimasa memakai 84 / 84 dan 72 / 72 |
| `isi` | Plus Jakarta Sans | 44 / 62 | 40 / 56 | 500 | Isi slide, keterangan arsip |
| `label` | Plus Jakarta Sans, kapital, spasi huruf 0,16em | 30 / 36 | 28 / 34 | 800 | Label lapisan, ULIKAN, GESER, label arsip |
| `keterangan` | Plus Jakarta Sans | 28 / 38 | 26 / 36 | 500 | Tempat dan tahun, sumber, koleksi, nomor halaman |

Angka besar selalu memakai angka lurus: angka bawaan Cormorant bergaya lama dan tingginya berbeda per digit. Bila angka berdampingan dengan nama, ujung atas angka disejajarkan dengan ujung atas huruf kapital nama (geser −6 px di 9:16 dan −5 px di 4:5, diukur dengan font merek).

Isi tidak boleh lebih kecil dari ukuran di tabel. Bila teks tidak muat, potong kata (kembali ke Tahap 2), jangan mengecilkan huruf.

### Zona aman

- **9:16 (TikTok):** atas 330 px, bawah 460 px (keterangan dan nama akun TikTok menutupi bagian bawah), kiri 72 px, kanan 180 px (kolom tombol). Bagian atas lebih besar dari video (200 px) karena di Photo Mode TikTok memotong gambar atas-bawah agar pas di layar dan bilah pencarian menutupi ±315 px pertama (diukur dari tangkapan layar unggahan pertama, November 2026). Akibatnya bingkai foto Entri di 9:16 selebar 420 px.
- **4:5 (Instagram):** 80 px di keempat sisi.
- Versi 4:5 adalah potongan tengah ilustrasi 9:16 (285 px atas dan bawah terbuang). Setiap slide bergambar punya kolom `Fokus` (`atas`, `tengah`, `bawah`) untuk menggeser potongan bila subjek tidak di tengah.

### Komponen tetap

- **Label lapisan** di kiri atas sampul, posisi dan gaya sama dengan video (gaya `label`, ikon 1,33em garis 1,9, garis tepi 3 px warna lapisan, latar `bayang`). Dua label berdampingan bila ada dua lapisan.
- **Penanda halaman** di slide 2 sampai akhir: tanda logo 40 px + `03/08` (gaya `keterangan`, `tinta-redup`) di kiri atas, di dalam zona aman.
- **Petunjuk geser** hanya di sampul: `GESER` (gaya `label`, `pelita`) dengan panah kecil, kanan bawah di dalam zona aman.
- **Penutup** di slide terakhir: tanda logo 88 px + wordmark krem (`merek/logo/`), tengah horizontal, di bawah kalimat ajakan, lalu `ulik.silam`. Wordmark tidak pernah diketik ulang dengan font.

### Jenis slide

| Jenis | Tampilan (sesuai mockup) | Isi di kontrak |
| --- | --- | --- |
| `Sampul` | Sama dengan sampul video pov-produksi agar seragam di grid profil: ilustrasi penuh, gradasi `bayang` dari bawah, label lapisan di kiri atas, lalu di kiri bawah baris latar (gaya `keterangan`) dan judul sampul (maksimal 3 baris, judul yang lebih panjang terpotong dan ditandai di pratinjau katalog), tanda logo di bawahnya, GESER sebaris dengan tanda logo. Di 9:16 seluruh blok judul 240 px lebih tinggi dari sampul video (judul berakhir 760 px dari bawah) karena grid profil TikTok memotong carousel 3:4 dari tengah, sedangkan sampul video dari bawah; dengan begitu judul sejajar di grid | Judul, Teks (subjudul; tidak tampil di slide, dipakai di caption) |
| `Ilustrasi` | Ilustrasi penuh, gradasi `bayang` ± 60% bawah, judul slide dan isi di bagian bawah zona aman. Bila slide berikutnya `Arsip`, di atas judul otomatis muncul "Rekonstruksi · ilustrasi" | Judul, Teks |
| `Teks` | Latar radial `tanah` ke `latar`, atau ilustrasi yang diredupkan (`latar` 0,72) bila kolom Visual berisi gambar; garis pendek `pelita`, satu kalimat besar gaya `kutipan`, isi opsional (`tinta-redup`) | Judul (boleh `-`), Teks |
| `Entri` | **Tanpa foto:** ilustrasi penuh dengan gradasi `bayang`, angka besar `pelita` di atas nama (gaya `judul-slide`), lalu baris keterangan (tempat · tahun, gaya `keterangan`), lalu isi. **Dengan foto:** ilustrasi simbolik sebagai latar, diredupkan (`latar` 0,5 ditambah gradasi), foto arsip di tengah atas sebagai cetakan berbingkai krem tanpa label, lalu baris angka dan nama berdampingan (angka rata atas dengan nama, keterangan di bawah nama), lalu isi; foto dan teks satu kelompok berjarak tetap (56 px di 9:16, 40 px di 4:5) yang dipusatkan vertikal di zona aman | Judul `#5 · Nama` atau `1 · Nama`; Teks `<keterangan> // <isi>` (keterangan opsional); Visual boleh memuat `Foto:` (lihat kontrak) |
| `Banding` | Judul slide, lalu dua kotak `latar-naik` bertumpuk: "Versi populer" (label `tinta-redup`) dan "Menurut sumber" (label `pelita`), di atas ilustrasi redup atau latar polos | Judul, Teks dua blok dipisah ` // ` |
| `Linimasa` | Latar radial atau ilustrasi yang diredupkan (`latar` 0,72); judul slide, garis vertikal `garis`, 3 sampai 4 titik `pelita` berpendar dengan tahun dan satu kalimat | Judul, Teks berisi titik `tahun: kalimat` dipisah ` // ` |
| `Arsip` | Latar radial `tanah`, label netral (garis `tinta-redup`, ikon sesuai jenis arsip), foto atau karya tampil utuh seperti cetakan berbingkai krem dengan bayangan dan pendar hangat, keterangan (gaya `isi`), lalu baris koleksi dan lisensi (gaya `keterangan`) | Judul (label arsip), Teks (keterangan), Visual `Arsip: ...` |
| `Ulikan` | Seperti kartu Ulikan video: ilustrasi terakhir diredupkan (`latar` opacity 0,72, blur 8 px), kotak `latar-naik` berisi ULIKAN, teks, sumber, lalu tanda + wordmark di bawahnya | Diisi otomatis dari `## Kartu Ulikan` |
| `Penutup` | Latar radial atau ilustrasi yang diredupkan (`latar` 0,72), garis pendek `pelita`, kalimat ajakan gaya `kutipan` rata tengah, sumber utama singkat, tanda + wordmark, `ulik.silam` | Teks (ajakan); sumber dari `## Sumber` (paling banyak 2 judul) |

Pola default: `Sampul` → 4 sampai 8 slide isi → `Ulikan` → `Penutup`. Slide `Teks`, `Banding`, `Linimasa`, dan `Penutup` bawaannya tanpa gambar; bila diberi ilustrasi (`Baru:` atau `Pakai ulang:`), prompt-nya meminta bagian tengah yang tenang dan berkontras rendah karena tertutup teks, dan templat meredupkannya. Slide `Teks` paling banyak sepertiga dari slide isi, slide `Arsip` yang berdiri sendiri paling banyak 3 per carousel, agar ilustrasi tetap dominan. Foto di slide `Entri` tidak dibatasi jumlahnya, karena setiap slide itu tetap berlatar ilustrasi.

Untuk Daftar tokoh, pola yang disarankan: setiap `Entri` memakai ilustrasi simbolik (momen bertemu atau momen penting tokoh) sebagai latar dan foto tokoh bila lisensinya aman; entri tanpa foto aman memakai ilustrasi penuh. Karena wajah tokoh tampil di foto, latarnya cukup berupa momen, benda, tempat, atau tokoh dari belakang.

## Tahap 1: Ide dan brief

Hasil tahap ini: brief yang disetujui Rafi dan folder proyek yang tercatat di Papan.

### 1.1 Pilih pintu masuk

- Rafi baru punya tema kasar: lakukan 1.2.
- Rafi sudah memberi topik dan jenis carousel: langsung ke 1.3.
- Rafi ingin carousel **pendamping video**: baca `proyek/<slug-video>/KONSEP.md`. Ambil judul, lapisan, latar, slug, klaim berstatus Terverifikasi di tabel verifikasi, `### Dasar peringkat` dan daftar "Tidak masuk" bila ada, dan daftar ilustrasi yang sudah ada di `$ASET_DIR`. Usulkan isi yang **tidak ada di video**, bukan ringkasan ulang videonya.
- Rafi membawa `CAROUSEL.md` atau minta mengubah carousel yang sudah disetujui: langsung ke **Tahap R**.

### 1.2 Brainstorming (di chat)

1. Tawarkan 3 sampai 5 sudut, masing-masing 2 sampai 3 baris: jenis carousel, judul sampul, isi garis besar, dan perkiraan jumlah slide.
2. Beri pendapat jujur tentang pilihan terkuat: apakah bekerja tanpa narasi suara, apakah ada ketegangan yang membuat orang menggeser sampai akhir, apakah setiap slide punya gambar yang kuat, berapa ilustrasi baru yang harus dibuat (pakai ulang ilustrasi video atau pustaka jauh lebih murah), dan apakah ada arsip yang bisa dipakai.
3. Ide Rafi diutamakan; Rafi boleh mencampur atau menolak semua pilihan.
4. Pilihan yang tidak terpakai disimpan sebagai bank ide: `proyek/<slug>/proyek.yaml` dengan `format: Carousel`, `tahap: Bank ide`, dan ide satu baris di `catatan`.

### 1.3 Susun brief

| Kolom | Isi | Default bila kosong |
| --- | --- | --- |
| Judul sampul | Hook ≤ 10 kata | Diturunkan dari topik |
| Jenis | Pendamping, Daftar, POV slide, Di balik riset, Linimasa | Dari sudut yang dipilih |
| Lapisan | Satu atau dua dari Sejarah, Legenda, Mitos, Rekaan | Dari topik, atau dari video terkait |
| Latar | Tempat untuk sampul, tanpa tahun | Dari topik |
| Posisi "kamu" | Hanya untuk POV slide: siapa "kamu", di mana, kapan | - |
| Video terkait | Slug video, atau `-` | `-` |
| Jumlah slide | Termasuk sampul, Ulikan, dan Penutup | 8 |
| Ilustrasi | Pakai ulang, baru, atau campuran, beserta perkiraan jumlah ilustrasi baru | Pakai ulang bila ada video terkait |
| Arsip | Foto atau karya sezaman yang direncanakan, beserta koleksinya, atau `-` | `-` |
| Momen wajib | Fakta atau momen yang harus muncul | - |
| Nada | Berwibawa, tegang, reflektif, ringan | Berwibawa, reflektif di akhir |
| Ajakan akhir | Pertanyaan ke penonton, ajakan simpan, atau ajakan menonton video terkait | Pertanyaan |
| Hindari | Hal yang tidak boleh muncul | - |
| Platform | TikTok, Instagram | Keduanya |

Aturan brief:

- Detail dari Rafi mengikat: jangan diganti atau dilunakkan tanpa izin.
- Kolom kosong diisi default dan dicatat sebagai Asumsi.
- Bertanya hanya bila ada yang tidak bisa ditebak dan mengubah seluruh carousel. Maksimal satu pertanyaan.

### 1.4 Pemeriksaan dan titik berhenti

- [ ] Semua kolom terisi, asumsi ditandai.
- [ ] Topik masuk cakupan; untuk Daftar dan Di balik riset, setiap entri atau klaim utama sudah punya minimal satu sumber yang dibuka.
- [ ] Jumlah slide dalam rentang 4 sampai 15.

Tulis brief di chat dan akhiri dengan "Lanjut ke naskah slide?". **Berhenti dan tunggu.** Setelah disetujui, buat `proyek/<slug>/proyek.yaml` (`judul`, `slug`, `format: Carousel`, `lapisan`, `latar`, `seri`, `tahap: Brief`, `platform: ["TikTok", "Instagram"]`, `video_terkait`) bila belum ada, lalu jalankan `python3 scripts/buat-status.py`. Slug carousel pendamping memakai slug video ditambah `-carousel`.

## Tahap 2: Naskah slide dan verifikasi

Hasil tahap ini: `proyek/<slug>/CAROUSEL.md` berisi ringkasan, tabel slide, dan verifikasi yang disetujui Rafi.

### 2.1 Buat dokumen

Tulis `proyek/<slug>/CAROUSEL.md` dengan semua judul bagian `##` dari Kontrak CAROUSEL.md v1.2. Di tahap ini isi `## Ringkasan`, `## Slide` (kolom Visual boleh masih umum), `## Catatan genre` (verifikasi), dan `## Sumber`. Bagian lain ditandai "Dikerjakan di Tahap 3". Bila repo tidak terjangkau dari sesi ini, susun di artifact Docs dan ekspor ke `CAROUSEL.md` saat Tahap 3 selesai.

### 2.2 Aturan naskah

**Umum**

- Satu gagasan per slide, kalimat pendek, kala yang konsisten.
- Setiap slide isi berakhir dengan dorongan ke slide berikutnya: pertanyaan, kontras, angka yang belum dijelaskan, atau "tapi ...". Variasikan; jangan menulis "geser" di slide isi.
- Superlatif ("pertama", "terbesar", "satu-satunya") hanya bila terverifikasi; bila tidak, perhalus.
- Nama tempat sesuai masanya (Batavia, bukan Jakarta, untuk masa VOC); nama sekarang boleh di keterangan.
- Kutipan dalam tanda kutip yang diatribusikan ke tokoh nyata hanya kutipan terdokumentasi dengan sumbernya; selain itu parafrase.
- Isi kolom Hindari tidak muncul di slide mana pun.

**Sampul**

- Judul menjanjikan sesuatu yang benar-benar dibayar oleh slide berikutnya. Tidak ada clickbait yang tidak didukung isi.
- Subjudul opsional menjelaskan cakupan (misalnya kriteria daftar).

**Per jenis carousel**

- **Pendamping video:** tidak mengulang narasi video kata per kata. Slide 2 menjelaskan hubungannya dengan video dalam satu kalimat (misalnya "Di video ada lima. Sumber mencatat lebih banyak."). Slide Penutup boleh mengajak menonton videonya.
- **Daftar:** sama dengan daftar-sejarah. Kriteria atau syarat masuk disebut di subjudul sampul atau slide 2, dengan kriteria yang sama untuk semua entri. Peringkat disebut sebagai versi Ulik Silam menurut kriteria itu, bukan kebenaran mutlak. Judul entri berformat `#5 · Nama` (peringkat) atau `1 · Nama` (kumpulan), dengan keterangan tempat dan tahun sebagai blok pertama Teks. Nomor 1 tidak dibocorkan di sampul. Bila urutan atau jumlah diperdebatkan sumber, pakai kumpulan kronologis.
- **POV slide:** sama dengan pov-sejarah. "Kamu" orang kedua, kala kini, posisinya sesuai brief. Setiap slide satu momen yang bisa digambar. Tokoh nyata hanya berucap bila ucapannya terdokumentasi. Untuk Rekaan, ikuti pov-rekaan: dunianya nyata, tokohnya boleh karangan.
- **Di balik riset:** setiap slide `Banding` memuat versi populer yang memang beredar (sebut di mana, misalnya "sering ditulis di artikel populer") dan versi bersumber dengan nama sumbernya singkat. Jangan mengejek versi populer; jelaskan mengapa ia muncul bila sumber menyebutnya.
- **Linimasa:** 3 sampai 4 titik per slide. Tahun pasti hanya bila terverifikasi; bila sumber berbeda, tulis "sekitar" atau rentang.

**Kolom Visual**

- `Pakai ulang: <slug-video>/adegan-XX` untuk ilustrasi video, atau `Pustaka: <jenis>/<id>` untuk gambar pustaka, ditambah satu kalimat yang memastikan isi gambarnya cocok dengan teks slide.
- `Baru: ilustrasi-XX` untuk ilustrasi baru, diikuti deskripsi dengan tujuh unsur, berurutan dan dipisah titik koma: bidikan dan sudut; tempat dan waktu; subjek dan aksinya; emosi; orang lain; detail sejarah kunci; lapisan dan cahaya. Gambar harus menggambarkan isi slide, bukan hiasan umum. Detail yang belum diriset ditulis netral.
- `Arsip: <deskripsi singkat> · <koleksi> · <status lisensi>` untuk slide `Arsip` (lihat 3.2); di Tahap 2 koleksi dan status boleh `perlu dicari`.
- Slide `Entri` dengan foto: sumber latar (`Baru:`, `Pakai ulang:`, atau `Pustaka:`) lalu ` ++ Foto: <deskripsi singkat> · <koleksi> · <status lisensi>`. Bila foto aman tidak ditemukan, bagian `++ Foto:` dihapus dan latar menjadi ilustrasi penuh.
- `Tanpa gambar` untuk slide `Teks`, `Linimasa` polos, dan `Penutup`.
- Wajah tokoh yang sama paling banyak di 3 slide; slide lain memakai benda, tempat, kerumunan, atau tokoh dari belakang.

### 2.3 Verifikasi (ringkasan aturan skill genre)

**Yang diverifikasi:** setiap klaim di judul, isi, angka, tahun, keterangan arsip, kartu Ulikan, dan caption, termasuk klaim tersirat. Pecah setiap kalimat menjadi klaim tunggal dan beri nomor.

**Lapisan Sejarah** (sama dengan 2A.4 di pov-sejarah dan daftar-sejarah):

| Tingkat | Jenis | Dipakai untuk |
| --- | --- | --- |
| A | Sumber primer atau edisinya: prasasti, naskah, arsip, babad dan serat (selalu ditandai versi tradisi), lukisan, peta, dan foto sezaman, memoar tokoh | Bukti langsung |
| B | Kajian ilmiah dengan penulis jelas | Tanggal, angka, penafsiran |
| C | Lembaga resmi: museum, arsip nasional, lembaga cagar budaya, ensiklopedia bereditor | Konfirmasi, fakta masa kini |
| D | Media populer, blog, video, media sosial, Wikipedia | Hanya petunjuk menuju A sampai C; tidak dihitung |

- Setiap klaim butuh minimal dua sumber independen tingkat A sampai C; klaim kunci butuh sedikitnya satu sumber A atau B. Sumber harus dibuka langsung, bukan cuplikan pencarian.
- Status: Terverifikasi, Diperdebatkan (tampil dengan penanda), Kisah tradisional (tampil dengan "menurut ..." atau "konon"), 1 sumber (hanya dengan penanda kehati-hatian, tidak untuk klaim kunci), Diperbaiki, Tidak ditemukan (tidak tampil).
- Fakta masa kini (masih berdiri, kini museum, lokasi benda, status tokoh yang masih hidup) dicek ke sumber terbaru dengan tanggal akses.
- **Keterangan arsip** (siapa, di mana, kapan) diverifikasi dari katalog koleksi pemegangnya; bila katalog dan sumber lain berbeda, pakai katalog dan catat perbedaannya.

**Lapisan Legenda dan Mitos** (sama dengan pov-mitos-legenda): yang diverifikasi adalah versi dan asal kisahnya (koleksi cerita, naskah, kajian folklor, sumber tradisi lisan yang tercatat), bukan kebenaran gaibnya. Bila versi berbeda, sebut versi mana yang dipakai.

**Lapisan Rekaan** (sama dengan pov-rekaan): tokoh dan alur boleh karangan; era, tempat, pakaian, harga, jabatan, kebiasaan, dan peristiwa nyata yang menjadi latar diverifikasi dengan aturan Sejarah.

**Pendamping video:** klaim yang sudah Terverifikasi di `KONSEP.md` video boleh dipakai dengan menyalin barisnya beserta sumbernya dan menulis "dari KONSEP.md <slug>" di Catatan. Fakta masa kini dicek ulang. Klaim baru diverifikasi penuh.

**Tabel verifikasi** di `## Catatan genre`, subjudul `### Verifikasi fakta`:

`| # | Klaim | Slide | Status | Sumber 1 (tingkat) | Sumber 2 (tingkat) | Bukti dari sumber | Catatan |`

**Pemeriksaan silang:** setelah tabel selesai, jalankan satu subagen terpisah (bila alat Agent ada) yang hanya menerima teks slide dan daftar klaim bernomor, tanpa tabel dan sumbernya, untuk mencari sumber sendiri dan melaporkan klaim yang tidak didukung, diperdebatkan, atau anakronistis. Bandingkan, selidiki setiap perbedaan dengan membuka sumbernya, lalu perbaiki. Bila tidak ada alat Agent, periksa ulang sendiri setiap klaim kunci dengan kata kunci berbeda. Catat hasilnya di `### Pemeriksaan silang`.

**Tanpa web search:** naskah tidak diserahkan sebagai terverifikasi; semua baris berstatus "Perlu dicek" dan hal ini disebut di awal penyerahan.

### 2.4 Pemeriksaan dan titik berhenti

- [ ] Jumlah slide dan batas kata per bagian sesuai Aturan tetap 5 dan 6 (dihitung skrip).
- [ ] Nomor slide berurutan dari 1; tabel slide memakai kolom persis kontrak; jenis slide dari daftar yang sah; slide pertama `Sampul`, dua slide terakhir `Ulikan` dan `Penutup`; slide `Arsip` paling banyak 3.
- [ ] Setiap slide isi punya satu gagasan dan dorongan ke slide berikutnya; tidak ada slide isi yang menulis "geser".
- [ ] Aturan per jenis carousel (2.2) dipenuhi.
- [ ] Setiap klaim ada di tabel verifikasi dengan status yang membolehkannya tampil; penanda dipakai untuk Diperdebatkan, Kisah tradisional, dan 1 sumber.
- [ ] Pemeriksaan silang dijalankan, dicatat, dan semua perbedaannya diselesaikan.
- [ ] Tidak ada anakronisme istilah, nama tempat, atau gelar.

Serahkan dengan satu baris ringkasan (jumlah slide, kata terbanyak per slide, jumlah klaim per status, hasil pemeriksaan silang), ubah `tahap` di `proyek.yaml` menjadi `Naskah terverifikasi` setelah Rafi setuju, lalu "Lanjut ke visual dan caption?". **Berhenti dan tunggu.**

## Tahap 3: Visual, arsip, kartu Ulikan, dan caption

Hasil tahap ini: `CAROUSEL.md` lengkap yang memenuhi Kontrak CAROUSEL.md v1.2. Teks slide dari Tahap 2 dikunci; perubahan harus disetujui Rafi dan diperiksa ulang dengan 2.4.

### 3.1 Ilustrasi pakai ulang

- Untuk setiap slide `Pakai ulang` atau `Pustaka`, pastikan berkasnya ada (`$ASET_DIR/proyek/<slug-video>/ilustrasi/adegan-XX.*` atau `$ASET_DIR/pustaka/...`) dan isi kolom `Fokus` (`tengah` bila ragu).
- Periksa bahwa gambar itu memang cocok dengan teks slide (lihat gambarnya). Bila tidak, ganti dengan ilustrasi lain atau jadikan ilustrasi baru, dan sebutkan.
- Sebelum menulis prompt atau riset busana baru, cek `pustaka/` (tokoh, busana, latar) seperti di CLAUDE.md repo.

### 3.2 Arsip: foto dan karya sezaman

- **Dua tempat foto:** slide `Arsip` (berdiri sendiri, berlabel netral, pola rekonstruksi lalu bukti) dan slide `Entri` (cetakan tanpa label di atas ilustrasi latar). Berkasnya sama-sama `arsip/slide-XX.*`.
- **Pembagian kerja:** Rafi yang mencari dan menyimpan berkas arsip di `$ASET_DIR/proyek/<slug>/arsip/slide-XX.*`. Skill ini merancang slotnya, menulis keterangan, dan mencatat koleksi serta status lisensinya. Claude tidak mengunduh foto tokoh publik dari web ke dalam berkas.
- **Apa adanya:** tampil utuh, dipotong seperlunya saja, tidak diwarnai, dipertajam, atau diedit AI. Bila Rafi memakai versi yang sudah diwarnai pihak lain, label arsip wajib menyebut "diwarnai ulang".
- **Label arsip** (kolom Judul): `Foto arsip`, `Lukisan sezaman`, `Peta sezaman`, `Naskah`, `Relief`, atau `Arca`. Untuk era sebelum fotografi pakai karya sezaman, bukan foto rekonstruksi.
- **Keterangan** (kolom Teks): siapa, di mana, kapan, ≤ 25 kata, terverifikasi dari katalog koleksi.
- **Koleksi dan lisensi** (kolom Visual): `Arsip: <deskripsi singkat> · <nama koleksi dan nomor inventaris bila ada> · <status lisensi>` (atau `++ Foto: ...` di slide Entri). Status lisensi: `Domain publik`, `CC BY`, `CC BY-SA`, `CC0`, `Izin tertulis`, atau `Belum dicek`. Status lisensi dicatat sebagai informasi dan tidak menghalangi render. Koleksi, atribusi yang diminta lisensi, dan penanda rekonstruksi ditulis di caption dan teks alternatif Instagram, tidak di slide; cek ketentuan atribusi setiap koleksi.
- **Hak cipta (gambaran umum, bukan nasihat hukum):** menurut UU 28/2014, perlindungan karya fotografi dan potret berlaku 50 tahun sejak pertama diumumkan, jadi foto lebih tua umumnya lebih aman; tetap cek status di koleksi sumbernya (ANRI, KITLV/Leiden, Nationaal Archief, Rijksmuseum, Wikimedia Commons beserta lisensinya). Foto agensi (Getty dan sejenisnya) tidak dipakai tanpa lisensi.
- **Pola rekonstruksi lalu bukti:** slide `Ilustrasi` yang menggambarkan momen yang sama ditaruh tepat sebelum slide `Arsip`; templat otomatis menulis "Rekonstruksi · ilustrasi" di slide itu, dan kalimat terakhirnya boleh mengantar ("Di slide berikutnya, foto aslinya.").
- Foto boleh dipakai sebagai rujukan busana atau bangunan untuk prompt ilustrasi, tetapi komposisinya tidak disalin.

### 3.3 Prompt ilustrasi baru (Gemini)

Ikuti struktur 2B.1 dan 2B.2 di pov-sejarah atau daftar-sejarah, diringkas di sini:

- **Riset tokoh dan latar** dengan aturan sumber 2.3: tubuh dan wajah, pakaian lapis demi lapis, bahan dan motif (dijelaskan bentuknya dalam bahasa Inggris), perhiasan, senjata, penanda status, arsitektur, properti, dan lanskap. Unsur anakronistis dimasukkan ke "Avoid ...". Hasilnya dicatat di `### Catatan akurasi visual` dengan tabel `| Slide | Tokoh atau benda | Unsur | Pilihan di prompt | Dasar dan sumber (tingkat) | Status |` (status: Terverifikasi, Tafsir, Rekaan, Dihindari).
- **Lembar karakter** untuk tokoh yang wajahnya tampil di 2 slide baru atau lebih, berlabel `**Lembar karakter · <Nama tokoh>**`. Bila tokoh itu sudah ada di pustaka atau di video terkait, pakai ulang lembar itu dan sebutkan.
- **Deskripsi tokoh baku** (bahasa Inggris, ± 80 sampai 150 kata) ditulis di `## Gaya visual` dan disalin persis ke lembar karakternya.
- **Urutan isi prompt ilustrasi:** rujukan "Same character as the <Nama tokoh> reference image." bila ada; bidikan dan sudut, dengan subjek utama di tengah bingkai (agar aman dipotong 4:5); tempat, masa, waktu hari, cuaca; komposisi latar depan, tengah, belakang; aksi, ekspresi rinci, dan arah pandang setiap tokoh; figuran beserta kalimat pembeda dari tokoh utama; detail sejarah dari catatan akurasi visual; cahaya dan unsur yang bergerak; "Detailed vector art illustration, clean crisp outlines, flat colors with subtle shading"; palet; "historically accurate ..."; kalimat "Avoid ..." (isi kolom Hindari, unsur Dihindari, "parang batik motif" bila ada batik, "characters looking at the camera, stiff symmetrical poses, extra or malformed hands and fingers, text, letters, labels, watermarks"); satu baris kosong; dua baris Aturan tetap 1.
- Panjang ± 120 sampai 220 kata di luar baris penutup.
- **Palet** mengikuti "Pelita & Bayang": warna tanah hangat, bayangan dalam, satu sumber cahaya hangat. Satu palet untuk seluruh carousel; ilustrasi pakai ulang dari video sudah sesuai.
- Cara pakai untuk Rafi: buat lembar karakter dulu (simpan sebagai `ilustrasi/lembar-<nama-tokoh>.png`), lalu satu percakapan Gemini atau satu batch Flow (paling banyak 12 gambar per batch) untuk seluruh carousel, dan simpan hasilnya sebagai `ilustrasi/slide-XX.png` sesuai nomor slide.

### 3.4 Kartu Ulikan

Sama dengan skill genre: satu fakta atau satu pertanyaan, ≤ ±15 kata, tidak mengulang isi slide. Fakta wajib terverifikasi (baris tabel dengan slide "(kartu Ulikan)") dan punya `Sumber` singkat; pertanyaan boleh `-`. Untuk Legenda dan Mitos, sumber berisi asal kisah; untuk Rekaan, penegasan rekaan. Tawarkan 2 pilihan saat menyerahkan Tahap 3.

### 3.5 Caption dan teks alternatif

Satu subjudul per platform (`### TikTok`, `### Instagram`), Bahasa Indonesia.

- **TikTok:** baris `**Judul:**` bila Rafi memakai kolom judul di Photo Mode (pendek, tidak mengulang sampul kata per kata), lalu caption: baris pembuka ±80 sampai 100 karakter, 1 sampai 2 kalimat konteks, satu pertanyaan ajakan komentar, penanda, dan hashtag di baris terakhir. Tambahkan baris `**Musik:**` berisi saran suasana musik dari pustaka TikTok (opsional, tanpa judul lagu berhak cipta yang belum dicek).
- **Instagram:** baris pembuka ± 125 karakter atau kurang (bagian yang terlihat sebelum terpotong), konteks yang boleh sedikit lebih panjang dari TikTok, ajakan, penanda, hashtag. Lalu `**Teks alternatif:**` berisi satu baris per slide: deskripsi gambar ditambah teks slide, untuk ditempel di pengaturan aksesibilitas.
- **Penanda** di setiap caption: "Ilustrasi adalah rekonstruksi. Sumber utama: <1 sampai 2 sumber singkat>." Bila ada foto, tambahkan "Ilustrasi latar adalah rekonstruksi. Foto: <tokoh atau isi, tahun>, <koleksi>, <lisensi atau atribusi>." untuk setiap foto, atau satu baris gabungan bila koleksinya sama. Daftar ditambah "Daftar disusun Ulik Silam berdasarkan <kriteria>." Legenda dan Mitos ditambah asal kisahnya. Rekaan ditambah "Kisah ini rekaan berlatar sejarah nyata."
- **Hashtag** 3 sampai 5: `#UlikSilam`, satu tag genre (`#sejarah`, `#sejarahindonesia`, `#legenda`, `#mitos`, `#ceritarakyat`), satu sampai dua tag topik, opsional satu tag kategori; huruf kecil kecuali merek. Tidak memakai `#fyp`, `#foryou`, `#viral`, atau tag bernada SARA. `#pov` hanya untuk jenis POV slide.
- Setiap fakta di caption sudah ada di tabel verifikasi (fakta baru dicatat dengan slide "(caption)").

### 3.6 Pemeriksaan dan titik berhenti

- [ ] Teks slide tidak berubah sejak Tahap 2, atau setiap perubahan sudah disetujui dan diperiksa ulang.
- [ ] Setiap slide bergambar punya sumber gambar (pakai ulang atau pustaka dengan berkas yang ada, prompt baru, atau arsip) dan kolom Fokus.
- [ ] Setiap slide `Arsip` punya label, keterangan terverifikasi, koleksi, dan status lisensi; setiap `++ Foto:` di slide Entri punya koleksi dan status lisensi; setiap foto tercatat di caption.
- [ ] Setiap prompt diakhiri "Style: detailed vector art" dan "Aspect ratio: 9:16", memuat larangan teks, dan memakai subjek di tengah bingkai.
- [ ] Setiap rujukan lembar karakter merujuk nama yang ada; deskripsi tokoh baku disalin persis (dicocokkan skrip).
- [ ] Setiap unsur sejarah di prompt tercatat di `### Catatan akurasi visual` dengan status; tidak ada unsur anakronistis atau motif parang.
- [ ] Kartu Ulikan terisi dan terverifikasi.
- [ ] Caption per platform punya penanda dan 3 sampai 5 hashtag; Instagram punya teks alternatif untuk setiap slide.
- [ ] Dokumen lolos daftar periksa Kontrak CAROUSEL.md v1.2.

Serahkan dengan daftar berkas yang harus dibuat, disalin, atau dicari Rafi (nama berkas per slide di `$ASET_DIR/proyek/<slug>/ilustrasi/` dan `arsip/`), 2 pilihan kartu Ulikan, lalu tanyakan apakah konsep disetujui. Setelah disetujui, ubah `tahap` menjadi `Aset`. **Berhenti dan tunggu.**

## Tahap 4: Render dan pemeriksaan

Hasil tahap ini: PNG final per platform dan lembar kontak di `$ASET_DIR/proyek/<slug>/render/`.

### 4.1 Render

- `npm run carousel -- <slug> --cek` memeriksa kesiapan render final: masalah kontrak, berkas ilustrasi (`ilustrasi/slide-XX`), dan foto (`arsip/slide-XX`), lalu melaporkan yang kurang dengan nama berkas persis. Isian `[diisi ...]` di caption dilaporkan sebagai peringatan.
- `npm run carousel -- <slug>` merender final kedua platform dengan templat `paket/carousel` dan aset `merek/` (font dan logo disalin ke folder aset proyek bila belum ada): `render/tiktok/NN.png` (1080 × 1920) dan `render/instagram/NN.png` (1080 × 1350), masing-masing dengan `lembar-kontak.png`. Teks diambil persis dari `CAROUSEL.md`. Opsi `--platform=tiktok` atau `--platform=instagram` merender satu platform saja.
- Render final **ditolak** selama ada masalah kontrak atau berkas yang kurang. Status lisensi foto tidak diperiksa saat render; Rafi yang memutuskan pemakaian foto. Untuk melihat hasil sebelum itu, pakai `--draf`: semua slide dirender (berkas yang kurang tampil sebagai penanda nama berkas), setiap slide bertanda DRAF, dan hasilnya disimpan terpisah di `render/draf/<platform>/`.
- Katalog punya tombol Render final dan Render draf di tab Render, dengan progres dan galeri hasil; tombol final hanya aktif bila semua syarat terpenuhi.
- Ilustrasi dari video lain (`Pakai ulang: <slug>/adegan-XX`) atau pustaka disalin otomatis ke `ilustrasi/slide-XX` saat render.
- Ubah `tahap` menjadi `Rakit & render` saat render pertama.

### 4.2 Pemeriksaan otomatis

- Pratinjau katalog memakai templat yang sama dengan render dan menandai slide yang teksnya melewati zona aman (thumbnail berbingkai merah dan peringatan di bawah pratinjau), per platform. Bila ada, teksnya dipotong di Tahap 2 (lewat Tahap R bila konsep sudah disetujui), bukan dikecilkan.
- Jumlah kata per bagian (Aturan tetap 5) dan kelengkapan kontrak diperiksa `paket/urai-carousel`; hasilnya di tab Verifikasi katalog.
- Paket render memastikan jumlah PNG per platform sama dengan jumlah slide ditambah lembar kontak, dengan ukuran 1080 × 1920 dan 1080 × 1350.

### 4.3 Pemeriksaan visual

- Lihat sendiri (alat Read): kedua lembar kontak, sampul, satu slide dari setiap jenis yang dipakai, setiap slide Arsip, dan slide terakhir.
- Kontras teks di atas ilustrasi: bila area di belakang teks terlalu terang setelah gradasi, laporkan slide itu dan usulkan ilustrasi atau Fokus lain.
- Resolusi foto arsip: bingkai foto selebar ±470 px di 9:16 dan ±350 px di 4:5; foto yang lebih kecil akan tampak buram, jadi sarankan versi koleksi aslinya.
- Periksa potongan 4:5 tidak memotong wajah atau benda kunci (bila memotong, ubah Fokus dan render ulang slide itu), label lapisan tampil di sampul, angka entri dan nama cocok, foto arsip tidak terpotong berlebihan, dan tidak ada teks yang menempel di wajah tokoh.

### 4.4 Penyerahan

Kirim lembar kontak ke Rafi, dengan:

- Ringkasan: jumlah slide, slide yang masih placeholder, penyesuaian (Fokus atau gradasi) yang dibuat.
- Urutan unggah: TikTok dari `render/tiktok/` berurutan nama berkas, pilih musik sesuai baris `**Musik:**`, tempel caption; Instagram dari `render/instagram/`, tempel caption dan teks alternatif per slide.
- Pengingat untuk memeriksa tampilan di ponsel sebelum unggah, karena zona aman adalah perkiraan antarmuka aplikasi.
- Setelah tayang: ubah `tahap` menjadi `Tayang`, tawarkan ilustrasi dan lembar karakter baru untuk masuk `pustaka/`, dan ingatkan commit (pesan singkat Bahasa Indonesia) sesuai CLAUDE.md repo.

**Berhenti dan tunggu.**

## Tahap R: Revisi

1. Baca `proyek/<slug>/CAROUSEL.md` terbaru dan jalankan daftar periksa kontrak.
2. Petakan dampak: teks satu slide (verifikasi ulang bila fakta berubah, render ulang slide itu); urutan atau jumlah slide (nomor ulang, nama berkas `slide-XX` ikut bergeser, penanda halaman semua slide berubah, render ulang semua); ilustrasi atau arsip (prompt atau berkas, catatan akurasi visual, lisensi, render ulang slide itu); kartu Ulikan atau caption (bagian itu saja, plus verifikasi fakta baru); lapisan (sampul, caption, penanda).
3. Bila carousel sudah diunggah, sampaikan bahwa platform umumnya tidak mengizinkan slide diganti setelah unggah, sehingga revisi berarti unggah ulang; tanyakan dulu sebelum mengerjakan perubahan besar.
4. Simpan versi lama ke `proyek/<slug>/arsip/v<n>/CAROUSEL.md`, naikkan baris `Versi` menjadi `v<n+1> · <tanggal>`, tambahkan baris di `## Riwayat revisi` (`| Versi | Tanggal | Perubahan | Slide yang dirender ulang |`). Bila nomor slide bergeser, ganti nama berkas di `ilustrasi/` dan `arsip/` dengan skrip dua langkah (ke nama sementara dulu, lalu ke nama akhir). Jalankan ulang pemeriksaan tahap yang terdampak dan render ulang hanya slide yang berubah (semua slide bila penomoran berubah).

Serahkan ringkasan perubahan dan lembar kontak baru. **Berhenti dan tunggu.**

## Kontrak CAROUSEL.md v1.2

Judul bagian `##` ditulis persis seperti di bawah dan berurutan. Bagian bertanda (opsional) boleh tidak ada.

1. `# Konsep Carousel: <topik>`
2. `## Ringkasan` berisi tabel `| Keputusan | Isi |` dengan baris wajib: `Judul` (judul sampul), `Slug` (kebab-case huruf kecil, sama dengan nama folder proyek), `Jenis` (Pendamping, Daftar, POV slide, Di balik riset, Linimasa), `Lapisan` (satu atau dua dari Sejarah, Legenda, Mitos, Rekaan, dipisah koma, utama lebih dulu), `Latar` (tempat tanpa tahun, atau `-`), `Platform`, `Jumlah slide`. Baris opsional: `Versi` (`v<n> · <YYYY-MM-DD>`, tidak ada = `v1`), `Video terkait` (slug atau `-`), `Posisi "kamu"` (untuk POV slide), Asumsi. Baris lain bebas.
3. `## Slide` berisi tabel dengan kolom persis:
   `| # | Jenis | Judul | Teks | Visual | Fokus |`
   - `#` nomor slide berurutan dari 1.
   - `Jenis` salah satu dari `Sampul`, `Ilustrasi`, `Teks`, `Entri`, `Banding`, `Linimasa`, `Arsip`, `Ulikan`, `Penutup`. Slide 1 selalu `Sampul`; dua slide terakhir `Ulikan` lalu `Penutup`; `Arsip` paling banyak 3.
   - `Judul` tanpa tanda kutip tambahan; `-` bila tidak ada. Untuk `Entri` berformat `#<n> · <Nama>` atau `<n> · <Nama>`. Untuk `Arsip` berisi label arsip (`Foto arsip`, `Lukisan sezaman`, `Peta sezaman`, `Naskah`, `Relief`, `Arca`).
   - `Teks` tanpa tanda kutip tambahan; beberapa blok dipisah ` // ` (untuk `Entri` opsional `<keterangan> // <isi>`, untuk `Banding` tepat dua blok, untuk `Linimasa` 3 sampai 4 blok berformat `<tahun>: <kalimat>`). Untuk `Ulikan` isi `-` (diambil dari `## Kartu Ulikan`).
   - `Visual` berisi `Pakai ulang: <slug>/adegan-XX`, `Pustaka: <jenis>/<id>`, `Baru: ilustrasi-XX` beserta deskripsi, `Arsip: <deskripsi> · <koleksi> · <status lisensi>`, atau `Tanpa gambar`. Khusus `Entri`, sumber latar boleh diikuti ` ++ Foto: <deskripsi> · <koleksi> · <status lisensi>`. Berkasnya selalu disimpan sebagai `ilustrasi/slide-XX.*` (atau `arsip/slide-XX.*`) dengan XX nomor slide.
   - `Fokus` berisi `atas`, `tengah`, `bawah`, atau `-` untuk slide tanpa gambar dan slide Arsip.
4. `## Gaya visual` berisi palet, deskripsi tokoh baku (bila ada), dan baris `**Penutup prompt:**` diikuti blok kode berisi baris penutup persis.
5. `## Prompt ilustrasi untuk Gemini` berisi `### Lembar karakter` (setiap lembar sebagai baris `**Lembar karakter · <Nama tokoh>**` diikuti satu blok kode) dan setiap ilustrasi baru sebagai baris `**Ilustrasi <XX> · Slide <n>**` diikuti satu blok kode; setiap blok diakhiri baris penutup. Tulis `-` bila tidak ada ilustrasi baru.
6. `## Kartu Ulikan` berisi baris `**Teks:** <satu fakta atau pertanyaan, maks. ±15 kata>` dan `**Sumber:** <sumber, asal kisah, atau penegasan rekaan>` (`-` hanya untuk pertanyaan).
7. `## Caption` berisi `### TikTok` dan/atau `### Instagram`; di bawahnya baris opsional `**Judul:**` dan `**Musik:**` (TikTok), satu blok kode caption dengan hashtag di baris terakhir, dan untuk Instagram baris `**Teks alternatif:**` diikuti daftar `- Slide <n>: <teks>` untuk setiap slide.
8. `## Catatan genre` berisi `### Verifikasi fakta`, `### Pemeriksaan silang`, dan `### Catatan akurasi visual` (bila ada ilustrasi baru).
9. `## Riwayat revisi` (opsional).
10. `## Sumber` berisi halaman, buku, dan katalog koleksi yang benar-benar dibuka.

Daftar periksa kontrak: semua judul bagian wajib ada; Slug terisi dan sama dengan nama folder; jumlah baris tabel slide = `Jumlah slide`; jenis slide sah dan urutan Sampul di awal serta Ulikan dan Penutup di akhir dipenuhi; slide `Arsip` paling banyak 3; setiap `Arsip:` dan `++ Foto:` punya koleksi serta status lisensi; setiap slide `Baru:` punya blok prompt dengan nomor ilustrasi yang sama, dan sebaliknya; setiap prompt diakhiri isi Penutup prompt; `Lapisan` berisi satu atau dua nilai sah tanpa duplikat; nama di lembar karakter unik; `## Kartu Ulikan` memuat Teks dan Sumber; setiap platform punya satu blok kode caption; Instagram punya teks alternatif untuk setiap slide.

Perubahan dari v1.0: jenis slide `Arsip` dan opsi Visual `Arsip:`; opsi Visual `Pustaka:`; keterangan tempat dan tahun di slide `Entri`; berkas ilustrasi selalu `slide-XX` di folder aset proyek; batas keterangan arsip (v1.1). Foto di slide `Entri` lewat ` ++ Foto:`, koleksi dan lisensi pindah ke caption, angka lurus (v1.2).
