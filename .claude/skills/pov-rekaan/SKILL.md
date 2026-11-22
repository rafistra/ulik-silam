---
name: "pov-rekaan"
description: "Gunakan saat Rafi ingin brainstorming, menyusun, atau merevisi konsep video POV rekaan 9:16 untuk Ulik Silam (TikTok/Shorts): fiksi sejarah realis berlatar nyata atau sejarah alternatif \"bagaimana jika\", dari ide, brief, peta rekaan, riset latar, naskah, prompt, audio, kartu Ulikan, judul dan caption sampai KONSEP.md, juga revisi KONSEP.md lama. Peristiwa nyata pakai pov-sejarah; produksi pakai pov-produksi. Bukan untuk cerita gaib, rakyat, atau mitologi."
---

# POV Rekaan: dari ide sampai KONSEP.md

Skill ini turunan pov-sejarah untuk lapisan **Rekaan** Ulik Silam: kisah karangan yang terjadi di masa lalu. Tahapannya sama: Tahap 1 (ide dan brief), Tahap 2A (naskah, peta rekaan, dan verifikasi latar), Tahap 2B (visual, audio, kartu Ulikan, judul dan caption), lalu serah terima. Konsep yang sudah disetujui diubah, atau dimutakhirkan ke kontrak terbaru, lewat Tahap R (revisi).

Prinsip utamanya: **ceritanya karangan, dunianya tidak.** Tokoh dan alur boleh dikarang, tetapi era, tempat, pakaian, harga, jabatan, kebiasaan, dan peristiwa nyata yang menjadi latar harus sesuai catatan sejarah. Penonton tidak boleh mengira bagian karangan sebagai fakta, jadi setiap video menyatakan dirinya rekaan di caption dan kartu Ulikan, dan sejarah alternatif menyatakannya juga di layar.

Video ini diunggah di akun **Ulik Silam** (lapisan **Rekaan**, atau **Rekaan, Sejarah** bila peristiwa nyata menjadi latar yang dominan). Tampilan video (label lapisan, subtitle, kartu Ulikan) dipasang otomatis oleh pov-produksi; label Rekaan tidak boleh disembunyikan. Skill ini hanya menyediakan isinya.

Skill ini berhenti di dokumen konsep. Produksi (paket bahan, proyek Remotion, render) dikerjakan skill **pov-produksi**, yang membaca KONSEP.md dalam format baku di bagian "Kontrak KONSEP.md v1.5". Komunikasi dengan Rafi dalam Bahasa Indonesia; semua prompt untuk generator AI ditulis dalam bahasa Inggris.

## Cakupan

Ada dua jenis konsep, dan jenisnya ditentukan di brief:

- **Rekaan berlatar sejarah:** tokoh "kamu" dan kejadian inti karangan, ditempatkan di era dan tempat nyata (misalnya kamu juru tulis pegadaian di Semarang 1920-an yang menemukan surat gadai milik orang hilang). Peristiwa nyata boleh menjadi latar yang terdengar, terlihat dari jauh, atau mengubah hidup tokoh, tetapi jalannya peristiwa itu tidak diubah.
- **Sejarah alternatif ("bagaimana jika"):** satu **titik cabang** yang sengaja berbeda dari catatan sejarah (misalnya "Bagaimana jika Diponegoro lolos dari Magelang, 1830?"), lalu dunia rekaan sesudahnya dilihat lewat "kamu". Semua yang terjadi sebelum titik cabang tetap sesuai catatan; titik cabangnya hanya satu dan dinyatakan terbuka di layar dan caption; akibat sesudahnya harus masuk akal dari keadaan nyata saat itu (kekuatan, wilayah, teknologi, tokoh yang hidup pada masa itu).

Batas cakupan:

- **Termasuk:** fiksi realis di masa lalu, Indonesia maupun dunia, dengan genre apa pun yang tetap realis: drama, misteri atau detektif, petualangan, romansa, intrik istana, kisah perang, komedi.
- **Batas dengan pov-sejarah:** bila kejadian inti video benar-benar terjadi dan tercatat (walau "kamu" fiktif dan perasaannya didramatisasi), itu wilayah **pov-sejarah**. Bila kejadian intinya karangan, itu skill ini. Contoh: kamu buruh gula fiktif yang mengalami Geger Pacinan 1740 → pov-sejarah; kamu buruh gula fiktif yang menyelidiki pencurian di pabrik gula Batavia tahun 1739, dengan Geger Pacinan hanya membayang di akhir → pov-rekaan. Bila ragu, tanyakan dalam satu kalimat.
- **Realis, tanpa kejadian gaib.** Tokoh boleh percaya hal gaib, berdoa, memakai jimat, atau takut pada cerita hantu, karena itu bagian kehidupan masa itu, tetapi alur tidak memuat kejadian gaib yang benar-benar terjadi. Narasi menjaga ini: tulis "kata orang, ...", "kamu yakin mendengar ...", bukan menyatakan hal gaib sebagai kejadian.
- **Di luar cakupan:** cerita gaib atau horor supranatural, cerita rakyat, mitologi, fiksi ilmiah atau fantasi, dan cerita berlatar masa kini. Jika diminta, katakan bahwa skill ini khusus rekaan realis berlatar masa lalu. Sarankan skill POV cerita rakyat atau mitologi bila sudah tersedia; jika belum, tanyakan apakah Rafi tetap ingin dibantu tanpa skill ini.
- **Produksi:** paket bahan, proyek Remotion, pemeriksaan aset, dan render bukan bagian skill ini. Arahkan ke skill pov-produksi (paling nyaman di Claude Code di laptop Rafi).

## Aturan tetap

1. **Penutup prompt Gemini.** Setiap prompt ilustrasi untuk Gemini, tanpa kecuali (lembar karakter dan semua adegan), diakhiri dua baris ini, persis, setelah satu baris kosong:

   ```
   Style: detailed vector art
   Aspect ratio: 9:16
   ```

   Baris ini tetap ditambahkan walaupun isi prompt sudah menyebut gaya atau rasio. Gaya hanya diganti jika Rafi secara eksplisit meminta gaya lain untuk video tertentu; rasio tetap 9:16 kecuali Rafi meminta format lain. Penutup yang dipakai ditulis juga di bagian "Gaya visual" KONSEP.md agar pov-produksi bisa memeriksanya.
2. **Penamaan gaya.** Di skill dan dokumen ini, "Style:" selalu berarti baris penutup prompt Gemini. Untuk Suno, sebut "kolom Style of Music di Suno" (di sebagian versi aplikasi bernama "Styles"), jangan hanya "Style".
3. **Latar harus terverifikasi, rekaan harus tercatat.** Setiap fakta latar yang muncul di narasi, teks layar, kartu Ulikan, judul, dan caption wajib dicek ke semua sumber yang tersedia sebelum diserahkan (2A.4). Setiap unsur karangan dicatat di Peta rekaan beserta alasan bahwa ia masuk akal untuk masa itu (2A.3).
4. **Rekaan selalu dinyatakan.** Caption setiap video memuat penanda rekaan, `Sumber` kartu Ulikan memuat penegasan rekaan, dan sejarah alternatif menyatakan titik cabangnya di teks layar adegan 1. Bagian karangan tidak boleh ditulis seolah fakta di judul, kartu Ulikan, maupun caption.
5. **Tokoh nyata hanya sekilas.** Tokoh nyata boleh terlihat dari jauh atau disebut namanya, di tempat dan waktu yang tercatat (atau, di sejarah alternatif, yang masuk akal sesudah titik cabang), tetapi tidak diberi ucapan, pikiran, atau tindakan karangan dan tidak berinteraksi langsung dengan "kamu" (detail di 2A.3). Tokoh yang masih hidup tidak muncul sama sekali.
6. **Motif batik parang tidak dipakai** di prompt ilustrasi mana pun dan selalu masuk kalimat "Avoid ..." bila tokohnya berkain batik atau berlatar Jawa. Batik motif lain boleh, asal sesuai era.
7. **Berhenti di setiap akhir tahap.** Tahap 1, 2A, 2B, dan R masing-masing diakhiri pemeriksaan, penyerahan, lalu menunggu Rafi bilang lanjut. Jangan mengerjakan tahap berikutnya tanpa persetujuan.
8. **Durasi 2 sampai 3 menit.** Setiap video berdurasi antara 2:00 dan 3:00, termasuk 3,5 detik kartu Ulikan yang ditambahkan pov-produksi (pembuka nyala tidak dipakai lagi sejak Oktober 2026). Jumlah adegan dan kata diturunkan dari durasi yang dipilih (tabel di 2A.2).

## Alat dan cadangannya

Cek alat yang tersedia di awal sesi, diam-diam, lalu pakai cadangan bila perlu dan sebutkan dalam satu kalimat saat menyerahkan hasil.

| Kebutuhan | Alat utama | Cadangan bila tidak tersedia |
| --- | --- | --- |
| Dokumen konsep | Artifact tipe Docs (atau connector dokumen first-party) | File `KONSEP.md` yang dikirim ke Rafi |
| Diagram struktur alur | Diagram di dokumen Docs | Tabel babak (babak, rentang waktu, adegan, isi) |
| Bank ide | Dokumen `claude/bank-ide-pov.md` di Project lewat tool Projects | Bagian "Ide cadangan" di akhir dokumen konsep |
| Verifikasi latar dan riset busana | Web search dan fetch halaman, ditambah file/connector milik Rafi | Pengetahuan umum, setiap fakta latar dan unsur busana diberi label "perlu dicek" |
| Hitung kata, durasi, panjang judul | Skrip di shell | Hitung manual dan sebutkan bahwa hasilnya perkiraan |
| Membaca konsep lama (Tahap R) | Alat dokumen untuk link Docs, atau file `KONSEP.md` yang dilampirkan | Minta Rafi melampirkan `KONSEP.md` |
| Serah terima ke produksi | Ekspor dokumen ke `KONSEP.md` dan kirim sebagai file | Tulis `KONSEP.md` langsung dari isi dokumen |

## Tahap 1: Ide dan brief

Hasil tahap ini: brief yang disetujui Rafi. Belum ada dokumen atau file.

### 1.1 Pilih pintu masuk

- Rafi ingin brainstorming, baru punya tema kasar, atau ragu: lakukan 1.2.
- Rafi sudah memberi brief (satu kalimat atau rinci): langsung ke 1.3.
- Rafi membawa `KONSEP.md` atau link dokumen konsep, meneruskan laporan dari pov-produksi, atau minta mengubah konsep yang sudah disetujui: langsung ke **Tahap R**.

### 1.2 Brainstorming (di chat)

Jawaban singkat dan mudah dipilih; jangan menulis naskah di sini.

1. **Premis.** Tawarkan 3 sampai 5 premis. Setiap premis 2 sampai 3 baris: jenis (rekaan berlatar sejarah atau sejarah alternatif) dan genre, siapa "kamu" (selalu tokoh fiktif), latar nyata yang dipakai, konflik yang dibawanya, dan contoh kalimat hook. Untuk sejarah alternatif, tulis titik cabangnya sebagai satu pertanyaan "Bagaimana jika ...?". Usahakan berbeda status atau sisi (penguasa, rakyat, orang luar, saksi) dan berbeda genre.
2. **Alur.** Setelah Rafi memilih atau menggabungkan, tawarkan 2 sampai 3 bentuk alur (satu hari penuh, hitung mundur menuju satu kejadian, rentang beberapa tahun, sebelum-sesudah, misteri yang terungkap bertahap), lengkap dengan titik balik dan 2 sampai 3 pilihan akhir. Untuk sejarah alternatif, tunjukkan di mana titik cabang muncul (umumnya hook) dan akibat apa yang dilihat "kamu".
3. **Pendapat jujur.** Di setiap ronde, sebutkan pilihan terkuat untuk video pendek dan alasannya: kekuatan hook 3 detik pertama, variasi visual, jumlah tokoh berulang (makin banyak makin sulit konsisten di Gemini), muat atau tidak dalam durasi, ketersediaan sumber untuk latarnya, risiko penonton mengira karangan sebagai fakta, dan kepekaan topik. Untuk sejarah alternatif, nilai juga apakah akibat sesudah titik cabang masuk akal. Jika ide Rafi bermasalah, sampaikan dan tawarkan jalan keluar.
4. **Ide Rafi diutamakan.** Kembangkan dari idenya; Rafi boleh mencampur atau menolak semua pilihan.
5. **Ide cadangan.** Pilihan yang tidak terpakai disimpan ke bank ide (lihat tabel Alat dan cadangannya), dengan tanda jenis "rekaan" atau "sejarah alternatif". Untuk dokumen Project: baca dulu (buat bila belum ada), lalu tulis ulang utuh dengan tambahan di akhir (tanggal, jenis, tema, ide satu baris). Sebelum menulis, pastikan isi baru tidak lebih pendek dari isi lama ditambah tambahannya; bila lebih pendek, berarti ada yang terpotong, jadi jangan ditulis.

Jika Rafi langsung memilih dan bilang lanjut, lewati ronde berikutnya.

### 1.3 Susun brief

Ambil semua detail dari pesan Rafi (daftar maupun kalimat bebas) dan petakan ke kolom ini:

| Kolom | Isi | Default bila kosong |
| --- | --- | --- |
| Judul / topik | Inti video | Diturunkan dari topik |
| Jenis | Rekaan berlatar sejarah, atau sejarah alternatif | Rekaan berlatar sejarah |
| Genre | Drama, misteri, petualangan, romansa, intrik, perang, komedi (realis) | Drama |
| Titik cabang | Hanya untuk sejarah alternatif: satu kejadian nyata yang dibuat berbeda, ditulis "Bagaimana jika ...?", plus apa yang sebenarnya terjadi | - (wajib diisi bila jenisnya sejarah alternatif; bila kosong, tanyakan) |
| Posisi "kamu" | Selalu tokoh fiktif; status, usia, pekerjaan, hubungan dengan tokoh lain | Tokoh fiktif yang paling banyak menunjukkan dunia itu |
| Latar | Era atau rentang tahun, tempat, dan peristiwa nyata yang menjadi latar (bila ada) | Masa paling dikenal dari topik |
| Alur | Urutan kejadian, titik balik, akhir | Satu hari penuh dengan satu titik balik |
| Tokoh pendukung | Nama/peran fiktif, sifat; tokoh nyata hanya sebagai latar sekilas | 1-3 tokoh fiktif yang diperlukan alur |
| Momen wajib | Adegan atau detail yang harus ada | - |
| Nada | Megah, kelam, lucu, reflektif, dan sebagainya | Megah di awal, reflektif di akhir |
| Akhir | Pertanyaan ke penonton, twist, penutup terbuka | Pertanyaan untuk memancing komentar |
| Hindari | Hal yang tidak boleh muncul | - |
| Teknis | Durasi (2:00 sampai 3:00), platform, generator gambar/musik, alat perakit | 3:00 (target ±2:50), TikTok + Shorts, Gemini, Suno, Remotion. Gaya dan rasio mengikuti Aturan tetap 1 |

Aturan brief:

- Detail dari Rafi mengikat: jangan diganti, dilunakkan, atau dipindah urutannya tanpa izin.
- Kolom kosong diisi default dan dicatat sebagai Asumsi.
- Bertanya hanya jika ada yang tidak bisa ditebak dan mengubah seluruh naskah. Maksimal satu pertanyaan.
- Durasi di luar 2:00 sampai 3:00: sampaikan bahwa skill ini dirancang untuk 2 sampai 3 menit dan usulkan durasi terdekat.
- Alur lengkap dipetakan apa adanya; alur sebagian diisi bagian tengahnya dan adegan tambahan ditandai.
- Alur terlalu padat (melebihi jumlah adegan maksimum untuk durasinya di tabel 2A.2): usulkan adegan yang digabung atau dipotong, atau durasi yang lebih panjang dalam rentang; jangan mempercepat narasi.
- Posisi "kamu" menentukan sudut pandang: apa yang bisa dilihat dan diketahui tokoh, siapa yang menunduk atau memerintah, dan bidikan orang pertama. Narasi tidak boleh menyebut hal yang mustahil diketahui peran itu. Jika penutup memerlukan informasi setelah peristiwa (misalnya sesudah tokoh wafat), tandai adegan itu sebagai epilog.
- Bila Rafi meminta tokoh nyata sebagai "kamu" atau sebagai tokoh yang berbicara dan berinteraksi, sampaikan bahwa skill ini membatasi tokoh nyata pada latar sekilas, lalu tawarkan dua jalan: tokoh fiktif yang dekat dengan tokoh nyata itu (juru tulisnya, pengawalnya, tetangganya), atau pov-sejarah bila kejadiannya memang tercatat.
- Bila ide aslinya ternyata peristiwa nyata yang tercatat, sarankan pov-sejarah (lihat Cakupan).
- Bila genre yang diminta memuat kejadian gaib, sampaikan batas realis di Cakupan dan tawarkan versi realisnya (hal gaib menjadi kepercayaan atau ketakutan tokoh, bukan kejadian).

Templat brief:

```
Judul: POV ...
Jenis: rekaan berlatar sejarah / sejarah alternatif
Genre: ...
Titik cabang: Bagaimana jika ...? (sebenarnya: ...)
Posisi "kamu": ...
Latar: ...
Alur: 1) ... 2) ... 3) ...
Tokoh pendukung: ...
Momen wajib: ...
Nada: ...
Akhir: ...
Hindari: ...
Teknis: durasi ..., generator ...
```

### 1.4 Pemeriksaan dan titik berhenti

Sebelum menyerahkan brief, pastikan:

- [ ] Semua kolom terisi, asumsi ditandai.
- [ ] Posisi "kamu" konsisten dengan alur.
- [ ] Durasi dalam rentang 2:00 sampai 3:00.
- [ ] Topik masuk cakupan pov-rekaan: kejadian inti karangan, realis, berlatar masa lalu (bukan peristiwa nyata yang tercatat, cerita gaib, cerita rakyat, atau mitologi).
- [ ] "Kamu" tokoh fiktif; tokoh nyata (bila ada) hanya sebagai latar sekilas; tidak ada tokoh yang masih hidup.
- [ ] Untuk sejarah alternatif: titik cabang hanya satu, berupa pertanyaan "Bagaimana jika ...?", dan apa yang sebenarnya terjadi sudah dicek sekilas punya sumber.
- [ ] Latar dan peristiwa nyata yang dipakai sudah dicek sekilas punya sumber yang bisa ditemukan.

Tulis brief di chat dan akhiri dengan "Lanjut ke naskah?". **Berhenti dan tunggu.**

## Tahap 2A: Naskah, peta rekaan, dan verifikasi latar

Hasil tahap ini: dokumen konsep berisi ringkasan, struktur alur, naskah adegan, peta rekaan, dan verifikasi latar yang disetujui Rafi. Bagian visual, audio, dan caption belum ditulis. Naskah dikerjakan dulu karena semua bagian lain (prompt, cue musik, SFX, caption) bergantung padanya; mengubah naskah di sini masih murah.

### 2A.1 Buat dokumen

Buat dokumen berjudul "Konsep Video POV: <topik>" (artifact Docs, atau `KONSEP.md` bila tidak tersedia). Semua judul bagian `##` dari Kontrak KONSEP.md v1.5 langsung dibuat dalam urutan kontrak, termasuk `## Kartu Ulikan`, tetapi di tahap ini hanya bagian berikut yang diisi:

- **Ringkasan konsep:** tabel keputusan dengan baris wajib kontrak (`Jumlah ilustrasi` = jumlah adegan + jumlah lembar karakter yang sudah bisa diperkirakan; diperbarui di 2B), baris `Lapisan` berisi `Rekaan` (atau `Rekaan, Sejarah` bila peristiwa nyata menjadi latar yang dominan, misalnya terlihat atau dialami di banyak adegan; `Rekaan` selalu di depan), baris `Latar` berisi tempat dari brief untuk sampul, tanpa tahun karena kisahnya bisa mencakup beberapa tahun (misalnya `Semarang`, atau `Batavia, masa VOC` bila era perlu disebut), baris bebas `Jenis` (`Rekaan berlatar sejarah` atau `Sejarah alternatif`), `Genre`, dan untuk sejarah alternatif `Titik cabang` (pertanyaan "Bagaimana jika ...?" beserta apa yang sebenarnya terjadi), premis satu kalimat, baris Asumsi, benang merah cerita, dan baris "Dipilih karena ..." bila dari brainstorming.
- **Struktur alur:** diagram timeline babak sesuai skala waktu dengan garis batas durasi (atau tabel babak). Untuk sejarah alternatif, tandai posisi titik cabang di diagram.
- **Naskah adegan:** sesuai kontrak dan aturan di 2A.2.
- **Catatan genre:** subjudul `### Peta rekaan` (2A.3) dan `### Verifikasi latar` (2A.4).
- **Sumber:** halaman yang benar-benar dibuka.

Bagian Gaya visual, Prompt ilustrasi, Panduan narasi dan audio, Kartu Ulikan, serta Judul, caption, dan hashtag diberi tanda "Dikerjakan di Tahap 2B" (di Docs sebagai blok tertunda). `KONSEP.md` belum diekspor di tahap ini.

### 2A.2 Aturan naskah

Panjang naskah diturunkan dari durasi yang dipilih:

| Durasi maksimum | Target | Adegan | Babak | Kata narasi (batas, 130 sampai 135 kpm) |
| --- | --- | --- | --- | --- |
| 2:00 | ±1:55 | 11 sampai 13 | 4 | ±210 sampai 220 |
| 2:30 | ±2:20 | 13 sampai 15 | 4 sampai 5 | ±260 sampai 270 |
| 3:00 | ±2:50 | 15 sampai 18 | 5 sampai 6 | ±320 sampai 335 |

Durasi di antara baris tabel dihitung dengan rumus yang sama. pov-produksi menambahkan jeda 0,9 detik di setiap adegan, 1,5 detik di setiap adegan hening, dan 3,5 detik kartu Ulikan, jadi batas kata dihitung dari waktu yang tersisa untuk narasi:

```
kata maksimum = (target detik − 3,5 − 0,9 × jumlah adegan − 1,5 × jumlah adegan hening) × kpm / 60
```

dengan kpm 130 sampai 135. Angka bawah (130 kpm) adalah batas aman, terutama untuk narator AI yang diberi emosi dan cenderung lebih lambat. Tag suara tidak dihitung sebagai kata, tetapi tag bunyi (misalnya `[sighs]`, `[exhales]`, `[laughs]`) dan setiap elipsis diperkirakan menambah ± 0,5 detik; kurangi waktu narasi sebanyak itu. Hitung dengan skrip bila shell tersedia.

Aturan lain:

- Hook maksimal 10 detik yang menaruh penonton di posisi tokoh ("Kamu ...").
- Setiap adegan 8 sampai 12 detik.
- Narasi orang kedua, kalimat pendek dengan kalimat menohok yang bisa diberi jeda.
- Satu momen hening/emosional dan penutup sesuai kolom Akhir. Adegan terakhir langsung disambung kartu Ulikan tanpa kalimat penutup tambahan, jadi kalimat terakhir narasi harus sudah terasa sebagai akhir.
- Sikap naratif tidak menghakimi kecuali brief meminta lain.
- **Genre dijaga lewat struktur.** Misteri menaruh petunjuk yang adil sebelum terungkap; romansa dan drama menaruh titik balik di hubungan antartokoh; petualangan dan perang menjaga taruhan yang jelas. Twist boleh, tetapi harus bisa dilacak dari adegan sebelumnya.
- **Realis.** Hal gaib hanya muncul sebagai kepercayaan, cerita, atau ketakutan tokoh ("kata orang ...", "kamu yakin mendengar ..."), tidak pernah sebagai kejadian yang dinyatakan narasi.
- **Pembuka sejarah alternatif.** Adegan 1 memuat teks layar titik cabang, misalnya `Bagaimana jika Diponegoro lolos dari Magelang, 1830?`, agar penonton tahu sejak detik pertama bahwa ini bukan sejarah yang terjadi. Hook narasinya boleh langsung masuk ke dunia rekaan.
- **Transisi babak tanpa judul di layar.** Bila waktu atau tempat melompat di awal babak baru (misalnya bertahun-tahun kemudian atau pindah kota), adegan pertama babak itu diberi teks layar penanda singkat, misalnya `Tiga tahun kemudian.` atau `Benteng Rotterdam, Makassar.`. Tanpa lompatan, tidak perlu. Penanda tempat dan tahun adalah fakta latar, jadi ikut diverifikasi (di sejarah alternatif, tahun sesudah titik cabang dicatat sebagai rekaan).
- Kolom `Bidikan dan visual` sudah memuat bidikan A/B dan deskripsi visual yang cukup untuk ditulis menjadi prompt di 2B: apa yang sedang dilakukan tokoh, emosinya, dan, bila penting, siapa yang menatap siapa (misalnya tokoh lain menatap "kamu" di bidikan A). Untuk bidikan A, sebut juga apa yang dipegang atau dilakukan tangan "kamu".

### 2A.2a Tag suara (ElevenLabs v3)

Narasi dibacakan narator AI di ElevenLabs dengan model Eleven v3, dan digenerate Rafi per babak. Emosi diarahkan langsung di kolom Narasi, dan narasi lengkap bertag ini disalin per babak ke `### Narasi lengkap (ElevenLabs)` di 2B.3:

- **Satu tag emosi di awal setiap kalimat**, dengan format `[emotion] kalimat. [emotion] kalimat.` Contoh satu adegan: `[calm] Malam itu, hujan turun di atas Kartasura. [nervous] Kamu menghitung langkah para penjaga. [whispers] Jangan bersuara...`
- **Tag** boleh apa saja dari tag Eleven v3, ditulis dalam kurung siku, huruf kecil, bahasa Inggris, tepat sebelum kalimat yang dipengaruhinya. Tag emosi: `[calm]`, `[serious]`, `[nervous]`, `[tense]`, `[sad]`, `[curious]`, `[angry]`, `[excited]`, `[sarcastic]`, `[resigned]`, `[crying]`; tag cara bicara: `[whispers]`, `[shouting]`. Dua tag boleh berurutan bila keduanya perlu (`[sad] [whispers]`).
- **Alur emosi wajar:** kalimat berurutan dengan emosi yang sama tetap diberi tagnya masing-masing, tetapi emosi tidak melompat-lompat tanpa alasan dari isi cerita. Perubahan tag ditaruh di titik yang memang berubah: hook, titik balik, momen hening, dan kalimat terakhir. Satu kata seru atau potongan kalimat pendek tetap dihitung sebagai kalimat.
- **Tag bunyi** (`[sighs]`, `[exhales]`, `[gasps]`, `[laughs]`) bersifat tambahan dan tetap hemat, paling banyak satu per adegan, di luar tag emosi kalimat.
- **Jeda:** elipsis `...` untuk napas atau ketegangan di dalam narasi. Jeda antar-adegan tidak ditulis di kolom Narasi; `...` penutup paragraf hanya ditambahkan di `### Narasi lengkap (ElevenLabs)`, dan pov-produksi menambahkan jedanya sendiri.
- Tag hanya di kolom Narasi dan `### Narasi lengkap (ElevenLabs)`. Teks layar, kartu Ulikan, judul, dan caption tidak memakai tag. Di baris `**Adegan <n> · Narasi ...:**` pada bagian prompt, narasi ditulis tanpa tag.
- Tag tidak mengubah fakta; verifikasi tetap atas teks narasinya.

### 2A.3 Peta rekaan, tokoh nyata, dan titik cabang

**Peta rekaan.** Semua yang dikarang dicatat di `## Catatan genre` di bawah subjudul `### Peta rekaan`, dengan tabel `| Unsur rekaan | Adegan | Dasar kemasukakalan | Sumber latar |`. Isinya: tokoh fiktif (siapa mereka dan mengapa orang seperti itu bisa ada di sana), kejadian inti, tempat karangan (rumah, toko, kapal fiktif di kota nyata), benda atau dokumen karangan, dan, untuk sejarah alternatif, titik cabang serta setiap akibatnya. Kolom "Dasar kemasukakalan" menjelaskan mengapa unsur itu mungkin di masa itu (misalnya "<lembaga> sudah ada di <kota> pada <tahun>; jabatan <jabatan> lazim diisi orang berstatus <status>"), dengan sumber latarnya. Unsur yang tidak masuk akal untuk era, tempat, atau status tokoh (perempuan bangsawan bepergian sendirian, pribumi memasuki tempat yang tertutup baginya, benda yang belum ada) diperbaiki atau diberi alasan di cerita.

**Tokoh fiktif.** Nama tokoh fiktif mengikuti kebiasaan penamaan era, wilayah, dan status itu (gelar, ejaan lama bila relevan). Hindari nama yang sama dengan tokoh nyata yang dikenal di latar yang sama, agar tidak dikira tokoh nyata; periksa sekilas dengan web search.

**Tokoh nyata hanya sekilas.** Tokoh nyata boleh:

- disebut namanya oleh narasi atau tokoh fiktif, sebagai kabar, perintah yang terdengar, atau desas-desus, dengan isi yang sesuai catatan;
- terlihat dari jauh atau di latar (lewat dalam iring-iringan, berdiri di panggung, potretnya di dinding), di tempat dan waktu yang tercatat.

Tokoh nyata tidak boleh:

- diberi ucapan, kutipan, pikiran, atau perasaan karangan, termasuk dialog yang ditujukan ke "kamu";
- berinteraksi langsung dengan "kamu" atau tokoh fiktif lain di adegan (bertatap muka, berbicara, menyentuh, memberi benda);
- ditempatkan di tempat atau waktu yang bertentangan dengan catatan, atau diberi tindakan yang tidak tercatat;
- tampil bila masih hidup.

Kutipan terdokumentasi tokoh nyata boleh muncul hanya sebagai sesuatu yang dibaca atau didengar "kamu" (misalnya bunyi maklumat yang ditempel di dinding), dengan sumber di tabel verifikasi. Untuk tokoh atau peristiwa yang penilaiannya masih diperdebatkan, sudut pandang tokoh fiktif boleh berpihak, tetapi narasi secara keseluruhan tidak menjadi propaganda atau penghinaan.

**Titik cabang (sejarah alternatif).**

- Hanya **satu** titik cabang. Semua sebelum titik cabang sesuai catatan dan diverifikasi seperti fakta latar.
- Titik cabang tidak membuat tokoh nyata melakukan kekejaman, pengkhianatan, atau tindakan memalukan yang tidak pernah mereka lakukan, dan tidak membuat kelompok suku, agama, atau bangsa tertentu menjadi pelaku kekejaman karangan. Pilih titik cabang berupa kebetulan, cuaca, keputusan yang tercatat pernah dipertimbangkan, atau kejadian yang memang nyaris terjadi.
- Tokoh nyata sesudah titik cabang tetap hanya sekilas, dan keadaannya diturunkan dari keadaan nyata saat titik cabang (usia, jabatan, kekuatan pasukan, wilayah). Peristiwa sesudah titik cabang yang menyangkut tokoh nyata disebut sebagai kabar atau dilihat dari jauh, tidak diperankan.
- Akibat titik cabang dibatasi pada apa yang bisa dilihat "kamu" dalam rentang cerita. Hindari klaim besar tentang seluruh sejarah sesudahnya.
- Apa yang sebenarnya terjadi dicatat di tabel verifikasi dan umumnya dipakai di kartu Ulikan (2B.5).

**Peristiwa kelam sebagai latar.** Bila latarnya pembantaian, perang, penjajahan, atau bencana, korban dan pelaku nyata tidak diberi peran karangan, jumlah korban dan jalannya peristiwa mengikuti catatan, dan peristiwa itu tidak dijadikan sekadar bumbu sensasi. Penderitaan tokoh fiktif boleh digambarkan, tetap dengan hormat.

**Ilustrasi tokoh nyata (dipakai di 2B).** Karena hanya sekilas, tokoh nyata umumnya digambar kecil, dari jauh, dari belakang, sebagai siluet, atau lewat benda simbolis (potret di dinding, bendera, tandu), tanpa lembar karakter. Atributnya (pakaian, aksesori khas, usia pada masa itu) diambil dari foto atau lukisan sejarah yang ditemukan saat verifikasi, bukan dari ingatan, dan dicatat dengan link halaman gambarnya di `### Catatan akurasi visual`. Hindari karikatur.

### 2A.4 Verifikasi latar

Cerita boleh karangan, tetapi dunia tempat cerita itu terjadi diperiksa seketat pov-sejarah. Justru karena alurnya karangan, kesalahan latar membuat seluruh video terasa palsu.

- **Yang diverifikasi di 2A:** setiap fakta latar di narasi dan teks layar: nama tempat dan ejaannya pada masa itu, tahun, jabatan dan gelar, lembaga, mata uang dan kisaran harga, alat transportasi dan komunikasi, istilah sehari-hari, aturan dan kebiasaan sosial, peristiwa nyata yang disebut atau terlihat, tokoh nyata yang disebut beserta tempat dan waktunya, kutipan terdokumentasi, serta (untuk sejarah alternatif) semua yang terjadi sebelum titik cabang dan apa yang sebenarnya terjadi di titik cabang. Detail visual di prompt dan klaim di judul atau caption diverifikasi di 2B dengan aturan yang sama.
- **Yang tidak diverifikasi, tetapi dicatat:** unsur karangan masuk Peta rekaan (2A.3), bukan tabel verifikasi.
- **Sumber:** cek ke semua sumber yang tersedia: web search dan halaman yang dibuka langsung, dokumen Project, file yang diunggah Rafi, dan connector. Utamakan sumber kredibel (arsip, lembaga, museum, jurnal, buku sejarah, ensiklopedia, surat kabar sezaman) di atas blog atau media sosial. Klaim kunci (tanggal, angka, kutipan, tindakan tokoh nyata, titik cabang) dikonfirmasi minimal dua sumber independen bila memungkinkan; klaim yang hanya punya satu sumber ditandai "1 sumber". Cuplikan hasil pencarian tidak dihitung sebagai sumber; halamannya harus dibuka.
- **Tabel verifikasi** di bagian Catatan genre, subjudul `### Verifikasi latar`: Fakta | Adegan | Status (Terverifikasi / Diperbaiki / Tidak ditemukan / Titik cabang) | Sumber. Status "Titik cabang" dipakai untuk fakta asli yang sengaja dibuat berbeda, dengan apa yang sebenarnya terjadi di kolom Fakta. Detail populer yang sengaja tidak dipakai juga dicatat dengan adegan "(tidak dipakai)". Fakta dari caption dicatat dengan adegan "(caption)".
- **Fakta latar yang tidak terkonfirmasi** ditulis ulang, diperhalus, diganti dengan detail yang bersumber, atau dipindah ke Peta rekaan bila memang lebih tepat sebagai karangan (misalnya nama toko diganti nama karangan), lalu dicatat di tabel.
- **Label "perlu dicek"** hanya dipakai jika web search tidak tersedia di sesi itu. Dalam kasus itu, setiap baris tabel diberi status "Perlu dicek" dan hal ini disebut saat menyerahkan.

### 2A.5 Pemeriksaan dan titik berhenti

Sebelum menyerahkan naskah, pastikan:

- [ ] Jumlah adegan, babak, dan kata sesuai tabel 2A.2 untuk durasi yang dipilih (dihitung dengan rumus, bukan perkiraan).
- [ ] Nomor adegan berurutan dari 1; tabel naskah memakai kolom persis kontrak; setiap adegan punya bidikan A/B, visual, dan narasi.
- [ ] Momen hening dan epilog (bila ada) sudah ditandai.
- [ ] Setiap fakta latar di narasi dan teks layar ada di tabel `### Verifikasi latar` dengan status dan sumber; setiap unsur karangan ada di `### Peta rekaan` dengan dasar kemasukakalannya.
- [ ] Tokoh nyata hanya sekilas: tanpa ucapan, pikiran, atau tindakan karangan, tanpa interaksi langsung dengan "kamu"; kutipan terdokumentasi hanya sebagai sesuatu yang dibaca atau didengar; tidak ada tokoh yang masih hidup.
- [ ] Tidak ada kejadian gaib yang dinyatakan narasi sebagai kejadian.
- [ ] Untuk sejarah alternatif: titik cabang hanya satu, tertulis di teks layar adegan 1, semua sebelum titik cabang sesuai catatan, dan apa yang sebenarnya terjadi ada di tabel verifikasi.
- [ ] Bagian Sumber hanya berisi halaman yang benar-benar dibuka.
- [ ] Isi kolom Hindari tidak muncul di naskah.
- [ ] Setiap kalimat narasi diawali satu tag emosi berformat `[kata]` huruf kecil bahasa Inggris, alurnya wajar, tag bunyi paling banyak satu per adegan dan sudah diperhitungkan dalam durasi; penanda teks layar ada di awal babak yang melompat waktu atau tempat.
- [ ] Baris `Lapisan` dan `Latar` terisi di Ringkasan konsep.
- [ ] Semua detail dari brief yang mengikat masih ada dan urutannya tidak berubah.

Serahkan dengan satu baris ringkasan (jumlah adegan, kata, perkiraan durasi, jumlah fakta latar terverifikasi dan yang diperbaiki, jumlah unsur di Peta rekaan), sebutkan cadangan alat yang dipakai (bila ada), lalu akhiri dengan "Lanjut ke visual, audio, dan caption?". **Berhenti dan tunggu.**

Perubahan dari Rafi selama 2A dikerjakan langsung di tahap ini (bukan Tahap R), lalu pemeriksaan 2A.5 dijalankan ulang.

## Tahap 2B: Visual, audio, kartu Ulikan, dan caption

Hasil tahap ini: dokumen konsep lengkap yang memenuhi Kontrak KONSEP.md v1.5, plus file `KONSEP.md` untuk diserahkan ke pov-produksi.

**Naskah dari 2A dikunci.** Jika saat menulis prompt atau audio ternyata ada adegan yang perlu diubah (misalnya sulit digambar Gemini atau terlalu mirip adegan lain), usulkan perubahannya ke Rafi dan jangan mengubah narasi diam-diam. Perubahan narasi yang disetujui memicu pemeriksaan ulang 2A.5 untuk adegan itu.

### 2B.1 Riset tokoh, gaya visual, dan konsistensi tokoh

Isi bagian `## Gaya visual dan konsistensi tokoh` dengan: tabel palet dan cahaya per babak (format kontrak), panduan bidikan 9:16, bidikan A (orang pertama) dan B (sorotan tokoh), deskripsi tokoh baku dalam bahasa Inggris, deskripsi tangan baku "kamu", aturan figuran, baris `**Penutup prompt:**` dengan blok kodenya, dan templat prompt yang memuat Aturan tetap 1. Deskripsi tokoh ditulis setelah riset di bawah ini, bukan dari ingatan.

**Riset budaya dan pakaian**

Sebelum menulis deskripsi tokoh, riset setiap tokoh berlembar karakter (termasuk posisi "kamu") dan setiap kelompok figuran yang sering tampil (misalnya prajurit, abdi, pedagang) dengan aturan sumber 2A.4: halaman dibuka langsung dan sumber kredibel didahulukan. Sumber yang paling berguna: arca, relief, dan naskah bergambar; lukisan dan gambar sezaman; foto lama; koleksi museum dan arsip foto; kajian tekstil dan busana. Sesuaikan dengan era, tempat, budaya atau suku, dan status sosial tokoh:

- **Tubuh dan wajah:** warna kulit, bentuk wajah, rambut dan cara menatanya, serta tanda khas budaya itu bila tercatat (tato, gigi diasah, tindik, bibir merah sirih).
- **Pakaian lapis demi lapis, dari kepala sampai kaki:** penutup kepala; badan atas (bertelanjang dada, kemben, baju, jubah); kain bawah dan cara memakainya; ikat pinggang, sabuk, atau selendang; alas kaki atau tanpa alas kaki.
- **Bahan, teknik, warna, dan motif kain:** tenun, ikat, songket, prada, batik, atau polos; pewarna yang tersedia di masa itu; motif yang tercatat untuk era dan wilayah itu.
- **Perhiasan, senjata, dan benda bawaan** yang sesuai status dan peran.
- **Penanda status:** apa yang membedakan raja, bangsawan, abdi, prajurit, pendeta, rakyat, dan orang asing di masa itu.

**Cek anakronisme.** Setiap unsur pakaian dan benda diperiksa: apakah sudah ada di era dan tempat itu. Generator gambar cenderung memakai unsur "tradisional" yang populer hari ini, jadi yang paling sering meleset adalah motif kain, penutup kepala, potongan baju, dan senjata.

- Contoh: motif parang dikaitkan dengan keraton Mataram Islam (menurut tradisi diciptakan Panembahan Senopati, akhir abad ke-16), jadi tidak dipakai untuk tokoh Majapahit. Arca Jawa Timur masa Kadiri sampai Majapahit memperlihatkan kain bermotif antara lain medalion berisi hewan, sulur, dan lingkaran bertumpuk (kawung); kajian Lesley Pullen (*Patterned Splendour*, 2021) membaca kawung pada arca Majapahit sebagai songket atau kain prada, bukan batik. Jadi prompt Majapahit menyebut motif dan tekniknya ("woven cloth with an overlapping-circle kawung pattern and gold-leaf accents"), bukan sekadar "batik".
- Nama motif atau busana lokal ditulis bersama penjelasan bentuknya dalam bahasa Inggris (misalnya "kawung: repeating grid of four overlapping oval petals"), karena generator belum tentu mengenal namanya.
- Unsur populer yang anakronistis dan mungkin dipilih generator dimasukkan ke kalimat "Avoid ..." (misalnya "parang batik pattern" untuk tokoh Majapahit).
- Tokoh fiktif dari kalangan biasa digambarkan dari sumber umum untuk era, wilayah, dan status itu, dan ditandai sebagai tafsir.

**Referensi visual.** Catat 1 sampai 3 referensi visual per tokoh (link halaman koleksi museum, Wikimedia Commons, arsip foto, atau jurnal) beserta unsur yang diambil darinya (misalnya "mahkota dan kelat bahu dari arca ..."). Bila gambarnya domain publik atau boleh dipakai, sarankan Rafi mengunggahnya ke Gemini bersama prompt lembar karakter, dan tambahkan kalimat di prompt yang membatasi apa yang diambil, misalnya "Use the uploaded statue photo only as a reference for the crown and armbands, not for the pose or art style." Referensi dipakai untuk detail busana, bukan untuk meniru satu karya seni utuh.

**Catatan akurasi visual.** Hasil riset ditulis di `## Catatan genre` di bawah subjudul `### Catatan akurasi visual`, dengan tabel `| Tokoh | Unsur | Pilihan di prompt | Dasar dan sumber | Status |`. Status: Terverifikasi (ada sumber untuk era dan tempat itu), Tafsir (diturunkan dari sumber era atau wilayah terdekat), Rekaan (tidak ada sumber, misalnya wajah tokoh tanpa potret), atau Dihindari (unsur anakronistis yang sengaja tidak dipakai, beserta alasannya). Referensi visual dicatat di kolom sumber. Unsur yang tidak ditemukan sumbernya tidak diklaim akurat: tandai sebagai tafsir atau ganti dengan unsur yang bersumber.

**Deskripsi tokoh baku**

Satu paragraf bahasa Inggris per tokoh berlembar karakter, ± 80 sampai 150 kata, disusun dari hasil riset dengan urutan tetap:

1. Identitas: nama, usia pada peristiwa, budaya atau wilayah, status atau peran.
2. Tubuh dan wajah: perawakan, warna kulit, bentuk wajah, mata, alis, hidung, bibir, tanda khas, rambut (warna, panjang, tatanan).
3. Pakaian dari kepala sampai kaki: setiap unsur dengan bahan atau teknik, warna, motif (dijelaskan bentuknya), dan cara memakainya.
4. Perhiasan, senjata, dan benda khas.
5. Sikap tubuh khas yang menggambarkan wataknya (misalnya "carries himself stiffly upright", "restless hands"), bukan pose tetap.

Deskripsi ini disalin persis ke prompt lembar karakter. Di prompt adegan, kalimat "Same character ..." yang membawa penampilannya; deskripsi adegan cukup menyebut perubahan khusus adegan itu (misalnya pakaian basah, penutup kepala dilepas, kain berkabung).

**Tangan dan lengan "kamu" (bidikan A)**

Di bidikan A, tangan dan lengan adalah satu-satunya bagian tubuh "kamu" yang terlihat, jadi harus sama di setiap adegan:

- Tulis satu **deskripsi tangan baku** dalam bahasa Inggris: warna kulit, kesan usia dan pekerjaan (kapalan, halus, keriput, bentuk kuku), lengan baju (bahan, warna, motif, potongan ujung lengan) atau lengan telanjang, perhiasan (cincin, gelang, kelat bahu), serta tato atau bekas luka bila ada. Deskripsi ini disalin persis ke setiap prompt bidikan A.
- Bila pakaian "kamu" berganti di tengah cerita (lompatan waktu, penyamaran, kain berkabung), tulis varian berlabel, misalnya `Tangan baku · Babak 1–3` dan `Tangan baku · Babak 4–5`, dan pakai varian yang sesuai di setiap adegan.
- Di setiap prompt bidikan A, sebut tangan mana yang terlihat (kiri, kanan, atau keduanya), apa yang dipegang atau dilakukan masing-masing, dan kesinambungan benda dari adegan sebelumnya (surat yang sama masih di tangan kiri, keris yang sama di pinggang). Tangan masuk dari bawah bingkai dengan perspektif orang pertama yang wajar dan terangkat ke depan setinggi dada, sehingga benda yang dipegang terlihat jelas di sekitar tengah gambar.
- Posisi "kamu" yang tampil di 3 adegan atau lebih, lewat bidikan A maupun B, mendapat lembar karakter, juga bila hanya tampil lewat bidikan A. Lembar ini ditambah satu panel tangan dan lengan dari sudut pandang orang pertama yang sesuai deskripsi tangan baku. Bila "kamu" tidak bernama, perannya dipakai sebagai nama lembar (misalnya `Buruh Gula`). Prompt bidikan A merujuknya dengan "The viewer is <Nama tokoh>: the hands and forearms in the foreground match the first-person panel of the <Nama tokoh> reference image.", dan Rafi mengunggah lembar ini di setiap adegan bidikan A.

**Figuran**

Figuran adalah orang yang tampil tanpa lembar karakter (prajurit, abdi, kerumunan, pedagang). Agar Gemini tidak menyalin wajah atau pakaian tokoh berlembar karakter ke mereka:

- Setiap figuran atau kelompok figuran diberi ciri pembeda yang jelas: usia, perawakan, wajah, rambut, dan pakaian sesuai statusnya, dengan warna dan aksesori yang berbeda dari tokoh utama. Unsur khas tokoh utama (penutup kepala, motif kain, perhiasan, senjata) tidak dipakai figuran.
- Figuran dalam satu kelompok juga beragam (usia, tinggi, wajah), tidak seragam seperti salinan.
- Di prompt, tambahkan kalimat pembeda, misalnya "The guards are different people from <Nama tokoh>: older and stockier, with plain brown headcloths and no jewelry."
- Masukkan "background figures copying <Nama tokoh>'s face or outfit, identical faces" ke kalimat "Avoid ...".

**Arah pandang, ekspresi, dan gerak**

- **Arah pandang.** Setiap tokoh di adegan diberi arah pandang ke sesuatu di dalam adegan: tokoh lain, benda, pintu, kejauhan, atau lantai. Tidak ada tokoh yang menatap kamera kecuali memang disengaja dan sudah tertulis di kolom `Bidikan dan visual`; yang paling umum, di bidikan A, tokoh yang berbicara atau bereaksi kepada "kamu" menatap penonton ("looks straight at the viewer"), sementara tokoh lain tetap menatap ke tempat lain. Bila tidak ada kontak mata yang disengaja, tulis "characters looking at the camera" di kalimat "Avoid ...".
- **Ekspresi dan emosi.** Setiap tokoh yang wajahnya terlihat diberi ekspresi spesifik yang diturunkan dari narasi dan tag emosi adegan itu: alis, mata, mulut, rahang, ditambah bahasa tubuh (bahu, tangan, kepala). Hindari kata umum tanpa rincian seperti "serious expression"; tulis misalnya "brows pulled together, eyes glistening, lips pressed thin, shoulders drawn up". Figuran juga bereaksi sesuai perannya (takut, penasaran, acuh), tidak semuanya berwajah datar.
- **Gerak dinamis.** Gambarkan tokoh di tengah gerakan, bukan berpose diam: kata kerja aksi pada satu momen ("mid-stride", "turning sharply toward the gate", "reaching for the keris hilt", "lowering the tray as she kneels"), berat badan bertumpu pada satu sisi, pose tidak simetris, serta kain, rambut, asap, atau api yang ikut bergerak. Adegan tenang tetap punya gerak kecil (jari meremas kain, kepala menoleh, napas tertahan) tanpa dibuat berlebihan. Variasikan sudut kamera antaradegan (sejajar mata, dari bawah, dari atas, dari balik bahu). Masukkan "stiff symmetrical poses, characters standing straight and facing forward" ke kalimat "Avoid ...".

**Panduan bidikan 9:16**

Video tampil di kanvas 1080 × 1920: teks layar di sepertiga atas, subtitle dan antarmuka aplikasi di ± 32% terbawah, tombol suka dan komentar di tepi kanan ± 17%, label lapisan di pojok kiri atas, dan efek Ken Burns memperbesar gambar hingga 114%. pov-produksi memakai zona ini saat memeriksa ilustrasi. Zona ini dijaga lewat pilihan bidikan, bukan lewat kalimat tata letak di prompt:

- Utamakan bidikan sedang atau sedang-lebar dengan wajah di sekitar tengah gambar dan ruang di atas kepala; jangan menaruh wajah atau benda kunci tepat di tepi bawah atau tepi kanan.
- Untuk adegan yang punya teks layar, pilih isi adegan yang wajar memberi ruang di bagian atas (langit, atap, dinding, kegelapan), ditulis sebagai isi adegan.
- Prompt tidak memuat kalimat tata letak zona seperti "open space in the top third" atau "nothing important in the bottom third"; cukup tulis jenis bidikan dan sudut kameranya (misalnya "medium shot, eye level").

**Palet dan cahaya**

Palet dan cahaya diselaraskan dengan identitas Ulik Silam ("pelita di kegelapan masa silam"): warna tanah yang hangat, bayangan dalam, dan sumber cahaya hangat (pelita, obor, matahari rendah) bila adegannya memungkinkan. Hindari palet neon atau dingin jenuh. Hook dan adegan terakhir diutamakan bercahaya redup dengan satu sumber cahaya hangat, agar menyambung dengan kartu Ulikan yang gelap.

### 2B.2 Prompt ilustrasi

- Lembar karakter disebut dengan nama tokohnya, bukan nomor: `**Lembar karakter · <Nama tokoh>**` (misalnya `**Lembar karakter · Raden Mas Arya**`). Tokoh utama yang tampil (bidikan B), posisi "kamu" yang tampil di 3 adegan atau lebih (2B.1), dan setiap tokoh pendukung fiktif yang muncul di 3 adegan atau lebih mendapat satu lembar. Tokoh nyata tidak mendapat lembar karakter, karena hanya tampil sekilas (2A.3); di prompt, tokoh nyata ditulis kecil, jauh, membelakangi, atau sebagai siluet, dan tidak menatap atau berhadapan dengan "kamu". Nama tokoh ditulis persis sama di semua prompt yang merujuknya.
- Isi prompt lembar karakter: "Character reference sheet of <Nama tokoh>.", deskripsi tokoh baku (persis), tampak depan, samping, dan belakang seluruh badan dalam sikap berdiri yang santai dan wajar, satu potret wajah tiga perempat, satu panel detail motif kain dan perhiasan, panel tangan orang pertama untuk lembar "kamu", latar polos terang, "Detailed vector art illustration, clean crisp outlines, flat colors with subtle shading", "historically accurate ..." dengan rincian dari riset, kalimat referensi visual bila Rafi mengunggah gambar, kalimat "Avoid ..." (anakronisme yang dihindari, teks, label, watermark), satu baris kosong, lalu dua baris Aturan tetap 1.
- Urutan isi setiap prompt adegan:
  1. "Same character as the <Nama tokoh> reference image." untuk setiap tokoh berlembar karakter yang tampil, satu kalimat per tokoh; untuk "kamu" di bidikan A, kalimat "The viewer is <Nama tokoh> ..." dari 2B.1.
  2. Bidikan dan sudut kamera, tempat, waktu, dan suasana adegan.
  3. Untuk bidikan A: "First-person point of view.", deskripsi tangan baku (persis, varian babak yang sesuai), lalu apa yang dilakukan setiap tangan.
  4. Untuk setiap tokoh: gerak, ekspresi dan emosi, serta arah pandang (2B.1).
  5. Figuran beserta kalimat pembedanya.
  6. "Detailed vector art illustration, clean crisp outlines, flat colors with subtle shading".
  7. Palet dan cahaya babak.
  8. "historically accurate ..." dengan rincian era, tempat, pakaian, dan arsitektur dari riset.
  9. Kalimat "Avoid ...": isi kolom Hindari (Gemini tidak punya kolom negative prompt), unsur berstatus Dihindari di Catatan akurasi visual, dan yang relevan dari 2B.1 (tatapan ke kamera bila tidak disengaja, pose kaku, figuran yang menyalin tokoh utama), ditambah "extra or malformed hands and fingers, text, watermarks".
  10. Satu baris kosong, lalu dua baris Aturan tetap 1.
- Detail visual lain di prompt adegan (arsitektur, perabot, kendaraan, senjata) diperiksa dengan cara yang sama seperti pakaian dan dicatat di `### Catatan akurasi visual`.
- Cara pakai untuk Rafi: buat lembar karakter dulu (simpan dengan nama tokohnya; unggah referensi visual bila disarankan), lalu unggah lembar tokoh yang tampil sebagai referensi di setiap adegan, termasuk lembar "kamu" di setiap bidikan A. Kerjakan dalam satu percakapan Gemini dan minta ubah ke 9:16 bila hasilnya tidak vertikal. Bila ada tokoh yang menatap kamera tanpa disengaja, posenya kaku, atau tangan "kamu" berbeda, minta Gemini memperbaiki bagian itu saja (misalnya "make her look at the soldier, not at the viewer").
- Perbarui baris `Jumlah ilustrasi` di Ringkasan konsep (adegan + lembar karakter).

Contoh prompt bidikan B:

```
Same character as the Raden Mas Arya reference image.
Medium-wide shot from a slightly low angle, inside a lamp-lit pendopo at night. Raden Mas Arya half rises from his carved chair, one hand braced on the armrest, the other crushing a folded letter; brows pulled together, jaw clenched, eyes fixed on the kneeling messenger. The messenger, a thin older man with grey stubble, a faded brown headcloth and a plain dark cloth, bows low with trembling shoulders, eyes on the floor. Two young guards by the pillar glance at each other uneasily, one tightening his grip on his spear. The messenger and guards are different people from Raden Mas Arya, with plainer clothes and no jewelry. Lamp flames lean in a draft and shadows sway across the pillars.
Detailed vector art illustration, clean crisp outlines, flat colors with subtle shading, warm earthy palette of ochre, deep brown and lamp gold with deep shadows, historically accurate 19th-century Javanese aristocratic pendopo.
Avoid characters looking at the camera, stiff symmetrical poses, background figures copying Raden Mas Arya's face or outfit, extra or malformed hands and fingers, text, watermarks.

Style: detailed vector art
Aspect ratio: 9:16
```

Contoh prompt bidikan A, dengan kontak mata yang disengaja:

```
The viewer is Raden Mas Arya: the hands and forearms in the foreground match the first-person panel of the Raden Mas Arya reference image.
Medium shot at eye level, a wooden doorway at dawn with cold mist outside and warm lamplight inside.
First-person point of view. <deskripsi tangan baku · Babak 1–3, disalin persis>. The left hand still holds the folded letter from the previous scene; the right hand pushes the door open.
An old servant woman, small and stooped with grey hair in a loose bun and a plain faded indigo cloth, freezes mid-step on the threshold, clutching a clay water jar to her chest; eyes wide and looking straight at the viewer, mouth half open, shoulders flinching back. She is a different person from Raden Mas Arya, with no jewelry.
Detailed vector art illustration, clean crisp outlines, flat colors with subtle shading, warm earthy palette of ochre and lamp gold against cool grey mist, historically accurate 19th-century Javanese house interior.
Avoid stiff symmetrical poses, extra or malformed hands and fingers, mismatched sleeves, text, watermarks.

Style: detailed vector art
Aspect ratio: 9:16
```

### 2B.3 Suara narator dan musik

**Suara narator (ElevenLabs)**

- Isi `### Suara narator` dengan baris `**Model:** Eleven v3`, `**Voice:**` (voice pilihan Rafi; `-` bila belum dipilih), dan `**Stability:**` (default `Natural`; `Creative` bila ingin lebih ekspresif dengan risiko hasil meleset; `Robust` kurang menanggapi tag).
- Tambahkan arahan per babak dalam satu baris: nada, tempo, dan emosi dominan (misalnya "Babak 3: tegang, tempo sedikit lebih cepat, berbisik di akhir").
- Ingatkan bahwa pilihan voice paling menentukan: tag tidak bisa memaksa voice yang lembut untuk berteriak.

**Narasi lengkap (ElevenLabs)**

Setelah `### Suara narator`, tulis `### Narasi lengkap (ElevenLabs)`: seluruh narasi video, lengkap dengan tag emosi per kalimat, siap disalin ke ElevenLabs satu babak sekali generate.

- Untuk tiap babak: baris `**Babak <n>: <nama>**`, lalu satu blok kode berisi narasi babak itu.
- Di dalam blok: satu paragraf per adegan, urut, dipisah satu baris kosong. Setiap paragraf berformat `[emotion] kalimat. [emotion] kalimat.` dan diakhiri `...` sebagai jeda antar-adegan (tidak ditambah bila paragraf sudah berakhir elipsis). Format ini sama dengan `babak-N.txt` di pov-produksi, jadi potongan per adegan tetap terdeteksi.
- Isinya disalin dari kolom Narasi, bukan ditulis ulang: teks dan tag harus identik. Bila saat menyusun blok ini ada tag yang ingin diubah, ubah di kolom Narasi dulu, lalu salin ulang.
- Tulis jumlah karakter tiap babak di bawah bloknya (`Karakter: <n>`, dihitung skrip) agar Rafi tahu apakah muat batas karakter aplikasi.

Contoh:

````markdown
### Narasi lengkap (ElevenLabs)

**Babak 1: Malam di Kartasura**

```
[calm] Malam itu, hujan turun di atas Kartasura. [nervous] Kamu menghitung langkah para penjaga...

[tense] Pintu gerbang terbuka. [whispers] Jangan bersuara...
```

Karakter: 160
````

**Musik (Suno)**

- Tiga cue sesuai perubahan suasana dalam alur; Suno tidak bisa menepati timestamp, jadi cue disambung di editor.
- Tabel cue: Cue | Babak | Durasi target | Suasana (format di Kontrak). **Durasi target** = jumlah durasi babak dalam rentang cue (dari kolom Waktu naskah) ditambah ± 5 detik untuk crossfade, dibulatkan ke atas ke kelipatan 5 detik, ditulis `m:ss`. Hitung dengan skrip bila shell tersedia.
- Isi kolom Style of Music di Suno: genre dan instrumen khas latar, suasana, perkembangan ("starts sparse ... fades ..."), **durasi target** dalam detik dan `m:ss` yang sama dengan tabel (misalnya "about 75 seconds long (1:15), with a clear ending"), BPM, "no vocals". Pengaturan: Custom, Instrumental, Exclude Styles untuk instrumen yang tidak diinginkan.
- Suno belum tentu menepati durasi yang ditulis. Bila aplikasi Suno menyediakan pengaturan durasi, isi dengan angka yang sama. Cue yang terlalu pendek di-Extend (pov-produksi juga mengulang cue bila kurang); cue yang terlalu panjang dipotong atau dipudarkan di editor.
- Tips: 2 sampai 4 variasi per cue, crossfade 1 sampai 2 detik di pergantian babak, hening diatur lewat volume di editor, cek lisensi paket Suno sebelum monetisasi.

Contoh blok Style of Music:

```
Javanese gamelan ambient, slow gender and suling over soft gong pulses, solemn and mysterious, starts sparse and builds gently, fades out at the end, about 75 seconds long (1:15), with a clear ending, 60 BPM, instrumental, no vocals
```

### 2B.4 Efek suara

- Claude tidak bisa membuat SFX organik yang akurat; katakan terus terang bila ditanya.
- Tabel: # | Adegan | Bunyi | Kata kunci pustaka | Prompt generator AI (format di Kontrak). Pustaka: CapCut, Pixabay, YouTube Audio Library, Freesound CC0; generator: misalnya ElevenLabs Sound Effects.
- Tandai bunyi yang sulit dan beri cadangan dari cue musik.
- Isi baris `**Adegan hening:**` sesuai penanda Momen hening di naskah.

### 2B.5 Kartu Ulikan

Kartu Ulikan selalu ada di setiap video. Tampil 3,5 detik langsung setelah adegan terakhir dan meninggalkan satu hal untuk diulik lebih jauh.

- Isi **satu** fakta nyata dari latar atau satu pertanyaan, maksimal ±15 kata dan idealnya 10 sampai 12 kata (hitung dengan skrip), dalam Bahasa Indonesia. Dalam 3,5 detik, 15 kata sudah batas atas untuk dibaca santai; bila lebih, pangkas, jangan memperpanjang kartu.
- Kartu Ulikan adalah jembatan dari karangan ke sejarah: faktanya selalu fakta nyata, tidak pernah unsur karangan. Untuk rekaan berlatar sejarah, pilih fakta latar yang membuat dunia cerita terasa nyata (misalnya lembaga, kebiasaan, atau peristiwa yang dialami tokoh). Untuk sejarah alternatif, utamakan apa yang sebenarnya terjadi di titik cabang (misalnya "Kenyataannya, Diponegoro ditangkap di Magelang, 28 Maret 1830.").
- Fakta wajib terverifikasi dengan aturan 2A.4 dan dicatat di tabel verifikasi dengan adegan "(kartu Ulikan)".
- `Sumber` selalu memuat penegasan rekaan diikuti sumber faktanya, misalnya `Kisah rekaan; fakta latar: Arsip Nasional RI` atau `Sejarah alternatif; fakta: Peter Carey, Kuasa Ramalan`. Untuk pertanyaan, `Sumber` cukup `Kisah rekaan`.
- Tawarkan 2 pilihan di chat saat menyerahkan 2B (satu fakta, satu pertanyaan); yang terkuat ditulis di dokumen.

Format di dokumen (sesuai kontrak):

```
## Kartu Ulikan

**Teks:** <satu fakta nyata atau pertanyaan>

**Sumber:** <Kisah rekaan / Sejarah alternatif>; fakta: <sumber singkat>
```

### 2B.6 Judul, caption, dan hashtag

Ditulis satu subjudul per platform (`### TikTok`, `### YouTube Shorts`, atau platform lain di brief), dalam Bahasa Indonesia.

**Prinsip umum**

- Judul dan caption hanya menjanjikan apa yang benar-benar ada di video. Tidak ada klaim sensasional yang tidak didukung naskah ("rahasia yang disembunyikan", "fakta yang dihapus", "kisah nyata").
- Unsur karangan tidak ditulis seolah fakta. Kalimat tentang tokoh fiktif dan kejadian inti ditulis sebagai cerita ("kamu", "di kisah ini"), bukan sebagai catatan sejarah.
- Setiap fakta latar di judul dan caption (tanggal, angka, nama, gelar) harus sudah ada di tabel verifikasi. Fakta baru yang hanya muncul di caption diverifikasi dan dicatat dengan adegan "(caption)".
- Tidak memuat kutipan tokoh nyata yang tidak terdokumentasi, isi kolom Hindari, atau kata yang menghakimi tokoh dan kelompok.

**Judul**

- YouTube Shorts memakai judul terpisah: batas platform 100 karakter; usahakan ±60 karakter atau kurang agar tidak terpotong di layar ponsel. Hitung dengan skrip.
- Format seri: `POV: Kamu <posisi "kamu"> <latar singkat>`, misalnya "POV: Kamu Juru Tulis Pegadaian di Semarang 1925". Untuk sejarah alternatif, titik cabangnya disebut di judul agar tidak dikira fakta, misalnya "POV: Diponegoro Lolos, dan Kamu Kurirnya" atau "POV: Kamu Kurir Diponegoro yang Tak Pernah Ditangkap". Variasi boleh bila Rafi meminta, tetapi kata "POV" tetap di awal dan posisi "kamu" tetap ada.
- TikTok tidak memakai baris judul terpisah; fungsi judul diambil alih baris pembuka caption.
- Tawarkan 3 pilihan judul di chat saat menyerahkan 2B; yang terkuat dipakai di dokumen dan sisanya ditulis sebagai alternatif di bawah judul platform.

**Caption** (urutan isi)

1. **Baris pembuka** ±80 sampai 100 karakter atau kurang, karena hanya bagian ini yang terlihat sebelum caption dilipat di TikTok. Isinya hook atau pertanyaan, tidak mengulang judul kata per kata.
2. **Konteks** 1 sampai 3 kalimat: siapa "kamu" di cerita ini, kapan, di mana, plus satu fakta latar yang terverifikasi dan belum terlalu ditonjolkan di video.
3. **Ajakan komentar:** satu pertanyaan sesuai kolom Akhir di brief ("Kalau kamu di posisinya, kamu pilih ...?"). Untuk sejarah alternatif, pertanyaan "bagaimana jika" ke penonton cocok di sini ("Menurutmu, apa yang terjadi kalau ...?").
4. **Penanda rekaan:** wajib di semua video, sesuai jenisnya:
   - Rekaan berlatar sejarah: "Kisah rekaan berlatar sejarah. Tokoh dan alur karangan; latar berdasarkan <1 sampai 2 sumber singkat>."
   - Sejarah alternatif: "Sejarah alternatif, bukan yang terjadi. Kenyataannya, <apa yang sebenarnya terjadi, satu kalimat>. Sumber: <1 sampai 2 sumber singkat>."
5. **Hashtag** di baris terakhir.

Panjang total caption ±300 sampai 600 karakter. Batas platform jauh lebih panjang, tetapi caption pendek lebih mungkin dibaca.

**Hashtag**

- 3 sampai 5 per platform, tanpa spasi, campuran dari:
  - 1 tag merek akun (saat ini `#UlikSilam`; ikuti nama akun bila berubah);
  - 1 tag genre luas (`#fiksisejarah` untuk rekaan berlatar sejarah, `#sejarahalternatif` untuk sejarah alternatif, atau `#historicalfiction` untuk latar dunia);
  - 1 sampai 2 tag topik spesifik (latar, era, atau tempat, misalnya `#semarang`, `#perangjawa`), boleh ditambah tag genre cerita (`#misteri`, `#ceritapendek`); hindari nama tokoh nyata sebagai tag kecuali ia memang disebut di video;
  - opsional 1 tag format (`#pov`).
- Tag merek ditulis CamelCase; tag lain huruf kecil.
- Hindari tag umum yang tidak berkaitan dengan isi (`#fyp`, `#foryou`, `#viral`), tag yang tidak relevan dengan video, dan tag bernada SARA atau kekerasan.
- YouTube: hashtag ditaruh di akhir caption (deskripsi). Hingga tiga hashtag ditampilkan di dekat judul, jadi urutkan yang paling penting di depan. Lebih dari 60 hashtag membuat semuanya diabaikan; dengan aturan 3 sampai 5 ini tidak akan terjadi.

**Format di dokumen** (sesuai kontrak)

````
### YouTube Shorts

**Judul:** POV: Kamu Juru Tulis Pegadaian di Semarang 1925

Alternatif judul: ... / ...

```
<caption lengkap dengan hashtag di baris terakhir>
```

### TikTok

```
<caption lengkap dengan hashtag di baris terakhir>
```
````

### 2B.7 Pemeriksaan dan titik berhenti

Sebelum menyerahkan dokumen, pastikan:

- [ ] Naskah tidak berubah sejak disetujui di 2A, atau setiap perubahan sudah disetujui Rafi dan diperiksa ulang dengan 2A.5.
- [ ] Setiap adegan punya visual, narasi, dan prompt Gemini; jumlahnya sama di semua bagian.
- [ ] Setiap prompt (termasuk lembar karakter) diakhiri "Style: detailed vector art" dan "Aspect ratio: 9:16".
- [ ] Setiap tokoh yang muncul di 3 adegan atau lebih, termasuk posisi "kamu" yang hanya tampil lewat bidikan A, punya lembar karakter berlabel `**Lembar karakter · <Nama tokoh>**`; setiap "Same character as the <Nama tokoh> reference image." dan "The viewer is <Nama tokoh> ..." merujuk nama yang ada; lembar "kamu" memuat panel tangan orang pertama.
- [ ] Setiap tokoh berlembar karakter dan kelompok figuran utama sudah diriset (budaya, pakaian lapis demi lapis, bahan, motif, perhiasan) dan tercatat di `### Catatan akurasi visual` dengan sumber dan status; tidak ada unsur anakronistis di deskripsi tokoh maupun prompt, dan unsur populer yang berisiko masuk ke kalimat "Avoid ...".
- [ ] Deskripsi tokoh baku disalin persis ke prompt lembar karakternya, dan setiap prompt bidikan A memuat deskripsi tangan baku (varian babak yang sesuai) secara persis, dicocokkan dengan skrip, plus apa yang dipegang setiap tangan.
- [ ] Setiap tokoh yang tampil di prompt adegan punya gerak, ekspresi, dan arah pandang; kontak mata dengan penonton hanya ada di adegan yang menyengajanya, dan adegan lain memuat "characters looking at the camera" di kalimat "Avoid ...".
- [ ] Setiap prompt yang memuat figuran punya kalimat pembeda dari tokoh berlembar karakter.
- [ ] Tidak ada kalimat tata letak zona di prompt (misalnya "open space in the top third" atau "nothing important in the bottom third"); bidikan ditulis sebagai jenis bidikan dan sudut kamera.
- [ ] Setiap blok Style of Music memuat durasi target yang sama dengan kolom Durasi target di tabel cue.
- [ ] Isi kolom Hindari tidak muncul di prompt, audio, judul, maupun caption.
- [ ] `### Narasi lengkap (ElevenLabs)` ada, satu blok per babak, setiap kalimat diawali tag emosi, setiap paragraf adegan diakhiri `...`, isinya identik dengan kolom Narasi (dicocokkan dengan skrip setelah `...` penutup paragraf diabaikan), dan jumlah karakter per babak tercatat.
- [ ] `### Suara narator` memuat Model, Voice, Stability, dan arahan per babak; tag suara tidak ada di teks layar, kartu Ulikan, judul, caption, atau baris narasi di bagian prompt.
- [ ] Judul YouTube ≤ 100 karakter (dihitung skrip); baris pembuka caption ≤ ±100 karakter; 3 sampai 5 hashtag per platform; penanda rekaan sesuai jenisnya ada di setiap caption.
- [ ] Setiap fakta latar di judul, caption, dan kartu Ulikan ada di tabel verifikasi; tidak ada unsur karangan yang ditulis seolah fakta; judul sejarah alternatif menyebut titik cabangnya.
- [ ] Tokoh nyata tidak punya lembar karakter, dan di prompt hanya tampil kecil, jauh, membelakangi, atau sebagai siluet tanpa berhadapan dengan "kamu"; motif batik parang tidak ada di prompt mana pun.
- [ ] Kartu Ulikan terisi (Teks ≤ ±15 kata, berisi fakta nyata atau pertanyaan; Sumber diawali penegasan rekaan); `Lapisan` = `Rekaan` atau `Rekaan, Sejarah`; `Latar` berisi tempat tanpa tahun.
- [ ] Dokumen lolos daftar periksa Kontrak KONSEP.md v1.5 (judul bagian, kolom tabel, penanda adegan, slug, lapisan, kartu Ulikan).

Serahkan dengan satu baris ringkasan, 3 pilihan judul, 2 pilihan isi kartu Ulikan, sebutkan cadangan alat yang dipakai (bila ada), lalu tanyakan apakah Rafi mau menyetujui konsep atau mengubah bagian tertentu. **Berhenti dan tunggu.**

### 2B.8 Serah terima ke pov-produksi

Setelah Rafi menyetujui konsep:

1. Isi baris `Versi` di Ringkasan konsep dengan `v1 · <tanggal>`.
2. Ekspor dokumen ke `KONSEP.md` (markdown) dan kirim sebagai file.
3. Sampaikan dalam dua kalimat: produksi dilanjutkan dengan skill pov-produksi, paling nyaman di Claude Code di laptop Rafi, dengan prompt pembuka seperti "Kerjakan produksi video POV dari KONSEP.md ini dengan skill pov-produksi."
4. Jangan membangun proyek Remotion atau paket bahan di skill ini.

Perubahan apa pun setelah titik ini dikerjakan lewat Tahap R.

## Tahap R: Revisi konsep yang sudah disetujui

Hasil tahap ini: `KONSEP.md` versi baru yang lolos kontrak, plus daftar aset yang harus dibuat ulang bila produksi sudah berjalan.

### R.1 Kenali jalur masuk

| Jalur | Ciri | Yang dilakukan |
| --- | --- | --- |
| Revisi di sesi yang sama | Konsep sudah disetujui di percakapan ini | Pakai dokumen yang ada |
| Konsep dari sesi lain | Rafi melampirkan `KONSEP.md` atau memberi link dokumen | Baca dokumen itu dengan alat dokumen atau Read |
| Laporan pov-produksi | Rafi meneruskan masalah dari validasi, rekaman, durasi, atau ilustrasi | Baca konsep terbaru, lalu perlakukan laporan sebagai daftar perubahan |
| Pemutakhiran kontrak | Rafi meminta konsep lama disesuaikan dengan skill atau kontrak terbaru, atau konsep belum punya `Lapisan`, `Latar`, `## Kartu Ulikan`, `### Narasi lengkap (ElevenLabs)`, `### Peta rekaan`, atau penanda rekaan di caption, masih memakai tahun di `Latar`, label lembar karakter bernomor, atau kartu Ulikan lebih dari ±15 kata | Baca konsep, lalu kerjakan R.2a; perubahan lain hanya bila Rafi memintanya |
| Pindah dari pov-sejarah | Konsep fiksi yang dulu dibuat dengan pov-sejarah (misalnya kejadian intinya ternyata karangan) dan kini ingin dijadikan lapisan Rekaan | Baca konsep, kerjakan R.2a, lalu periksa tokoh nyata terhadap 2A.3; adegan yang memberi tokoh nyata ucapan atau interaksi karangan diusulkan diubah lewat R.4 |

Jika konsepnya tidak ada di percakapan, minta Rafi melampirkan `KONSEP.md` atau link dokumennya (satu pertanyaan). Jika ada dua versi yang berbeda (misalnya dokumen Docs dan `KONSEP.md`), tanyakan mana yang terbaru; jangan menebak.

### R.2 Baca dan validasi

- Jalankan daftar periksa kontrak pada konsep yang ada (dengan skrip bila shell tersedia).
- Catat versi saat ini dari baris `Versi`; jika tidak ada, anggap `v1`.
- Jika konsep masih format lama (sebelum kontrak v1, misalnya kolom gabungan `Teks layar / suara` atau tanpa `Slug`), ubah dulu ke format v1 dan sebutkan penyesuaiannya. Perubahan format ini tidak mengubah isi.
- Jika konsep belum memenuhi kontrak v1.5, kerjakan R.2a, juga saat jalur masuknya revisi biasa.

### R.2a Pemutakhiran ke kontrak v1.5

Pemutakhiran menambah bagian yang belum ada tanpa mengubah narasi, prompt, atau audio yang sudah disetujui.

1. **Ringkasan konsep:** tambahkan atau perbaiki baris `Lapisan` = `Rekaan` (atau `Rekaan, Sejarah`, lihat 2A.1), baris `Latar` (tempat tanpa tahun, diambil dari isi konsep), serta baris `Jenis`, `Genre`, dan `Titik cabang` bila belum ada. Bila `Latar` lama memuat tahun, hapus tahunnya. Bila teks kartu Ulikan lebih dari ±15 kata, pangkas dan tawarkan versi pendeknya.
1a. **Catatan genre:** bila belum ada `### Peta rekaan` dan `### Verifikasi latar`, susun dari isi konsep (2A.3, 2A.4). Tabel verifikasi lama dari pov-sejarah dipakai sebagai dasar `### Verifikasi latar`; baris yang ternyata karangan dipindah ke Peta rekaan. Pastikan caption memuat penanda rekaan (2B.6) dan `Sumber` kartu Ulikan diawali penegasan rekaan; teks narasi tidak berubah.
2. **Lembar karakter:** ganti label lama `**0A · <Nama tokoh>**`, `**0B · ...**` menjadi `**Lembar karakter · <Nama tokoh>**`, dan ubah "Same character as the reference image." di prompt adegan menjadi "Same character as the <Nama tokoh> reference image.". Ini perubahan label, bukan isi; ilustrasi yang sudah dibuat tidak perlu diulang.
3. **Kartu Ulikan:** bila belum ada, tulis bagian `## Kartu Ulikan` sesuai 2B.5, di antara `## Panduan narasi dan audio` dan `## Judul, caption, dan hashtag`. Ini isi baru: verifikasi faktanya, tawarkan 2 pilihan, dan tunggu Rafi memilih.
4. **Durasi:** hitung ulang perkiraan durasi dengan tambahan 3,5 detik kartu Ulikan. Jika lewat batas, perlakukan sebagai kasus "Durasi lewat batas" di R.4 dan usulkan pemangkasan; Rafi yang memilih.
5. **Prompt ilustrasi dan musik (2B.1 sampai 2B.3):** jangan menulis ulang prompt yang sudah dipakai. Bila ilustrasi belum dibuat, tawarkan (tidak wajib) penyesuaian prompt ke aturan terbaru: riset budaya dan pakaian beserta `### Catatan akurasi visual`, kalimat tata letak zona dihapus, figuran yang dibedakan, arah pandang, ekspresi, gerak, tangan baku dan lembar "kamu" untuk bidikan A, serta palet. Bila musik belum dibuat, tambahkan durasi target ke blok Style of Music (sama dengan tabel cue). Bila Rafi setuju, perlakukan sebagai perubahan penampilan tokoh atau visual di R.4.
6. **Suara narator:** tambahkan baris `**Model:**`, `**Voice:**`, dan `**Stability:**` di `### Suara narator`.
7. **Narasi lengkap:** tambahkan `### Narasi lengkap (ElevenLabs)` sesuai 2B.3, disalin dari kolom Narasi apa adanya. Bila narasi belum direkam dan belum bertag per kalimat, tawarkan (tidak wajib) penambahan tag emosi per kalimat sesuai 2A.2a; bila Rafi setuju, ubah kolom Narasi dan blok ini bersamaan. Teks narasi tidak berubah, jadi fakta tidak perlu diverifikasi ulang.
8. Naikkan `Versi` dan isi Riwayat revisi dengan "Pemutakhiran ke kontrak v1.5" seperti di R.6. Dampak ke produksi: tidak ada aset yang perlu dibuat ulang.

Jika jalurnya hanya pemutakhiran, lanjut langsung ke R.7 setelah Rafi memilih isi kartu Ulikan.

### R.3 Tentukan status produksi

Status produksi menentukan seberapa hati-hati revisi dilakukan. Jika belum jelas dari jalur masuk, tanyakan sekali: "Produksinya sudah sampai mana: belum mulai, paket bahan sudah dibuat, atau aset (narasi/ilustrasi) sudah sebagian dibuat?" Laporan dari pov-produksi berarti produksi sudah berjalan.

### R.4 Petakan dampak

Untuk setiap perubahan yang diminta, tentukan bagian yang ikut diperbarui:

| Jenis perubahan | Bagian yang ikut diperbarui | Aset yang dibuat ulang bila sudah ada |
| --- | --- | --- |
| Narasi atau tag suara satu adegan | Naskah (Narasi, Waktu), paragraf adegan itu di `### Narasi lengkap (ElevenLabs)` beserta jumlah karakter babaknya, baris `Adegan <n> · Narasi` di prompt, hitungan kata dan durasi, tabel verifikasi bila fakta berubah | Rekaman babak yang memuat adegan itu, atau rekaman adegan itu saja sebagai pengganti |
| Arahan suara (voice, stability, arahan babak) | `### Suara narator` | Rekaman babak yang terdampak |
| Visual satu adegan | Kolom visual, prompt adegan, catatan akurasi visual | Ilustrasi adegan itu |
| Tambah, hapus, gabung, atau pindah adegan | Penomoran ulang di naskah, prompt, `### Narasi lengkap (ElevenLabs)`, tabel SFX (kolom Adegan), baris Adegan hening, rentang babak dan durasi target cue musik (tabel dan blok Style of Music), Waktu semua adegan sesudahnya, `Jumlah ilustrasi`, struktur alur | Tabel pemetaan nomor lama → baru agar file aset bisa diganti nama; rekaman dan ilustrasi adegan baru |
| Penampilan tokoh | Deskripsi tokoh baku, `### Catatan akurasi visual`, lembar karakter, semua prompt yang memuat tokoh itu | Lembar karakter dan ilustrasi yang memuat tokoh itu |
| Tangan atau pakaian "kamu" di bidikan A | Deskripsi tangan baku (dan variannya), panel tangan di lembar "kamu", semua prompt bidikan A yang memakai varian itu | Lembar "kamu" dan ilustrasi bidikan A yang terdampak |
| Fakta latar | Verifikasi ulang (2A.4), lalu narasi, teks layar, judul, dan caption yang memakainya | Rekaman babak atau adegan yang narasinya berubah |
| Unsur rekaan (tokoh fiktif, kejadian karangan) | Peta rekaan beserta dasar kemasukakalannya (2A.3), narasi, dan prompt yang memuatnya | Rekaman dan ilustrasi adegan yang terdampak |
| Titik cabang (sejarah alternatif) | Biasanya bukan revisi lagi (lihat di bawah); bila hanya rumusannya yang berubah: teks layar adegan 1, baris `Titik cabang`, tabel verifikasi, kartu Ulikan, judul, dan penanda rekaan di caption | Ilustrasi adegan 1 bila teks layarnya tidak muat |
| Suasana atau batas babak | Tabel palet, cue musik (rentang babak, durasi target di tabel dan blok Style of Music) | Cue musik terkait |
| Judul, caption, atau hashtag | Bagian itu saja, plus pemeriksaan caption (2B.7) | - |
| Kartu Ulikan | Bagian itu, plus verifikasi fakta barunya (2A.4) | - (dirender dari data) |
| Teks layar | Kolom Teks layar | - (dirender dari data) |

Kasus khusus dari pov-produksi:

- **Narasi berbeda dari rekaman** (improvisasi, atau ElevenLabs melewatkan atau menambah kata): pov-produksi hanya melaporkan perbedaannya. Bila rekamannya lebih baik dipertahankan, narasi di konsep disamakan dengan rekaman, tetapi verifikasi setiap fakta baru di dalamnya; bila tidak, usulkan generate ulang adegan itu. Fakta yang tidak terkonfirmasi dilaporkan dan diusulkan rekam ulang untuk kalimat itu.
- **Durasi lewat batas:** usulkan adegan atau kalimat yang dipangkas, dimulai dari yang bukan momen wajib dan bukan hook; Rafi yang memilih.
- **Ilustrasi tidak bisa dibuat Gemini:** usulkan bidikan pengganti (dari belakang, siluet, orang pertama, benda simbolis) tanpa mengubah narasi.

**Bukan revisi lagi:** jika perubahan menyentuh posisi "kamu", latar, jenis (rekaan berlatar sejarah ↔ sejarah alternatif), titik cabang itu sendiri, atau alur besar, atau lebih dari sepertiga adegan berubah, sampaikan bahwa ini lebih tepat dikerjakan sebagai konsep baru dari Tahap 1 (brief baru) atau dari Tahap 2A, dan tanyakan pilihan Rafi.

### R.5 Sampaikan rencana bila dampaknya ke produksi

- Produksi belum mulai dan perubahannya kecil: langsung kerjakan.
- Produksi sudah berjalan, atau perubahan memicu penomoran ulang, rekam ulang, atau ilustrasi ulang: tulis rencana singkat di chat (perubahan, bagian yang ikut berubah, aset yang harus dibuat ulang) dan tunggu Rafi setuju.
- Saat produksi sudah berjalan, utamakan mengubah isi adegan yang ada daripada menambah atau menghapus adegan, karena penomoran ulang membuat nama file aset bergeser.

### R.6 Kerjakan

- Ubah hanya bagian yang terdampak. Detail dari brief dan bagian yang tidak diminta berubah tetap utuh.
- Naikkan versi: baris `Versi` di Ringkasan konsep menjadi `v<n+1> · <tanggal>`.
- Tambahkan satu baris ke tabel `### Riwayat revisi` di bagian `## Alur produksi dan checklist` (buat bagian dan tabelnya bila belum ada): `| Versi | Tanggal | Perubahan | Dampak ke produksi |`.
- Bila nomor adegan berubah (tambah, hapus, gabung, atau pindah), tulis atau ganti tabel `### Pemetaan nomor adegan` (`| Lama | Baru |`, satu baris per adegan lama, `-` untuk adegan yang dihapus atau baru) di bagian yang sama. Tabel ini hanya untuk revisi terakhir; pov-produksi memakainya untuk mengganti nama file aset. Bila nomor tidak berubah, hapus tabel lama agar tidak terbaca lagi.

### R.7 Pemeriksaan dan titik berhenti

- [ ] Daftar periksa Kontrak KONSEP.md v1.5 dijalankan ulang untuk seluruh dokumen (penomoran ulang mudah merusak kecocokan antarbagian).
- [ ] Butir 2A.5 dijalankan untuk adegan yang narasinya berubah; butir 2B.7 untuk prompt, audio, kartu Ulikan, dan caption yang berubah.
- [ ] Jumlah kata dan perkiraan durasi masih sesuai tabel 2A.2.
- [ ] Baris `Versi` naik dan Riwayat revisi terisi.
- [ ] Bila ada penomoran ulang: `### Pemetaan nomor adegan` ada dan mencakup semua adegan lama; bila tidak ada penomoran ulang, tabel lama sudah dihapus.

Serahkan:

1. `KONSEP.md` hasil ekspor ulang sebagai file.
2. Ringkasan perubahan: versi baru, adegan yang berubah, dan aset yang harus dibuat ulang (rekaman adegan ..., ilustrasi adegan ..., cue ...), plus tabel pemetaan nomor bila ada.
3. Bila produksi sudah berjalan, prompt lanjutan untuk Rafi: "KONSEP.md diperbarui ke v<n>. Perbarui proyek dari KONSEP.md ini dengan skill pov-produksi (Tahap 5: Pembaruan konsep)."

**Berhenti dan tunggu.**

## Kontrak KONSEP.md v1.5

Format ini dibaca otomatis oleh skill pov-produksi dan harus identik dengan kontrak di skill itu. Konsep v1 tetap terbaca: bagian dan baris baru di v1.1 sampai v1.5 boleh tidak ada, dan label lama lembar karakter tetap diterima. Judul bagian `##` ditulis persis seperti di bawah dan berurutan. Bagian bertanda (opsional) boleh tidak ada. Skill ini selalu mengisi `Lapisan`, `Latar`, dan `## Kartu Ulikan`.

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
