---
name: "pov-mitos-legenda"
description: "Gunakan saat Rafi ingin brainstorming, menyusun, atau merevisi konsep video POV mitos, legenda, atau kisah hantu 9:16 untuk Ulik Silam sampai KONSEP.md. Peristiwa nyata pakai pov-sejarah, fiksi realis pov-rekaan, produksi pov-produksi."
---

# POV Mitos dan Legenda: dari ide sampai KONSEP.md

Skill ini turunan pov-sejarah untuk lapisan **Mitos** dan **Legenda** Ulik Silam. Tahapannya sama: Tahap 1 (ide dan brief), Tahap 2A (naskah, peta versi, dan verifikasi), Tahap 2B (visual, audio, kartu Ulikan, judul dan caption), lalu serah terima. Konsep yang sudah disetujui diubah, atau dimutakhirkan ke kontrak terbaru, lewat Tahap R (revisi).

Prinsip utamanya: **ceritanya milik tradisi, versinya harus jelas, dan "kamu" adalah pintu masuknya.** Di dalam video, yang gaib benar-benar terjadi; narasi tidak mengejek atau membantahnya. Di luar cerita (kartu Ulikan dan caption), video jujur menyebut asal dan versi kisahnya, tanpa mengklaimnya sebagai sejarah dan tanpa merendahkan orang yang meyakininya.

Video ini diunggah di akun **Ulik Silam**. Tampilan video (pembuka nyala, label lapisan, subtitle, kartu Ulikan) dipasang otomatis oleh pov-produksi; skill ini hanya menyediakan isinya.

Skill ini berhenti di dokumen konsep. Produksi (paket bahan, proyek Remotion, render) dikerjakan skill **pov-produksi**, yang membaca KONSEP.md dalam format baku di bagian "Kontrak KONSEP.md v1.3". Komunikasi dengan Rafi dalam Bahasa Indonesia; semua prompt untuk generator AI ditulis dalam bahasa Inggris.

## Cakupan

Jenis konsep ditentukan di brief:

- **Mitos:** tokohnya dewa, makhluk ilahi, atau leluhur asal mula; latarnya dunia lain atau masa sebelum dunia seperti sekarang; ceritanya menjelaskan asal-usul besar atau dianggap suci oleh pemiliknya (misalnya Dewi Sri). Lapisan `Mitos`.
- **Legenda:** tokohnya manusia, sering berkekuatan luar biasa, di dunia yang dikenal dan sering terikat tempat nyata; dianggap pernah terjadi tetapi umumnya tidak disucikan (misalnya Sangkuriang). Lapisan `Legenda`.
- **Kasus antara:** bila batasnya kabur, tulis dua lapisan dengan yang dominan di depan (`Legenda, Mitos` atau `Mitos, Legenda`). Nyi Roro Kidul dan epos seperti Mahabharata biasanya masuk sini. Label lapisan tidak menentukan pagar; tingkat kesakralan yang menentukan (2A.3).
- **Kisah makhluk:** hantu dan makhluk gaib dari kepercayaan rakyat yang tidak punya satu cerita baku, hanya ciri, perilaku, pantangan, dan penangkal (misalnya pocong, kuntilanak, genderuwo, wewe gombel, kuyang, palasik). "Kamu" dan kejadiannya boleh karangan, tetapi makhluknya mengikuti tradisi (2A.3). Lapisan `Legenda`, karena folklor menggolongkan kisah semacam ini sebagai legenda alam gaib; tambahkan `Sejarah` bila makhluknya terikat catatan sejarah tempat, misalnya tradisi berdirinya Pontianak.

Batas cakupan:

- **Termasuk:** mitos, legenda, dan epos Indonesia maupun dunia, dari naskah maupun tradisi lisan.
- **Batas dengan pov-sejarah:** tokoh atau peristiwa tercatat yang kisahnya bercampur legenda (Ken Arok, Gajah Mada) masuk pov-sejarah bila fokusnya peristiwa historis, dan masuk skill ini bila fokusnya legendanya sendiri. Bila legenda dan catatan sejarah sama kuat, pakai `Legenda, Sejarah` dan bedakan keduanya di Peta versi.
- **Batas dengan pov-rekaan:** kisah realis karangan baru masuk pov-rekaan. Skill ini bertumpu pada cerita yang sudah ada dalam tradisi; karangan hanya boleh sebagai sisipan (2A.3), kecuali di kisah makhluk, yang kejadiannya boleh karangan selama makhluknya mengikuti tradisi.
- **Kisah hantu "nyata" masa kini** (cerita viral, utas media sosial, pengalaman orang yang masih hidup, misalnya KKN di Desa Penari) tidak dikerjakan: latarnya bukan masa lalu dan menyangkut orang nyata. Tawarkan kisah makhluk dengan makhluk yang sama dan latar masa lalu.
- **Di luar cakupan untuk sementara:** dongeng dan fabel. Jika diminta, katakan bahwa skill ini baru mencakup mitos dan legenda, lalu tanyakan apakah Rafi tetap ingin dibantu tanpa skill ini.
- **Tidak dikerjakan:** kisah nabi dan rasul, serta penggambaran mereka. Sampaikan singkat dan tawarkan sudut lain bila ada.
- **Produksi:** paket bahan, proyek Remotion, pemeriksaan aset, dan render bukan bagian skill ini. Arahkan ke skill pov-produksi (paling nyaman di Claude Code di laptop Rafi).

## Aturan tetap

1. **Penutup prompt Gemini.** Setiap prompt ilustrasi untuk Gemini, tanpa kecuali (lembar karakter dan semua adegan), diakhiri dua baris ini, persis, setelah satu baris kosong:

   ```
   Style: detailed vector art
   Aspect ratio: 9:16
   ```

   Baris ini tetap ditambahkan walaupun isi prompt sudah menyebut gaya atau rasio. Gaya hanya diganti jika Rafi secara eksplisit meminta gaya lain untuk video tertentu; rasio tetap 9:16 kecuali Rafi meminta format lain. Penutup yang dipakai ditulis juga di bagian "Gaya visual" KONSEP.md agar pov-produksi bisa memeriksanya.
2. **Penamaan gaya.** Di skill dan dokumen ini, "Style:" selalu berarti baris penutup prompt Gemini. Untuk Suno, sebut "kolom Style of Music di Suno" (di sebagian versi aplikasi bernama "Styles"), jangan hanya "Style".
3. **Versi harus jelas.** Setiap konsep menetapkan satu versi acuan. Setiap unsur cerita dilacak ke versi itu, atau dicatat sebagai tafsir atau sisipan di Peta versi (2A.3).
4. **Kerangka tradisi dikunci.** Kejadian pokok, hubungan antartokoh, dan akhir cerita mengikuti versi acuan. Cerita boleh terasa baru lewat sudut pandang, bukan dengan diam-diam mengubah kejadiannya. Di kisah makhluk, yang dikunci adalah pakem makhluknya: rupa, perilaku, pantangan, penangkal, dan wilayah asal.
5. **Kesakralan diperiksa sebelum menulis.** Tingkat kesakralan ditetapkan di brief dan menentukan apa yang boleh digambarkan (2A.3).
6. **Asal cerita selalu dinyatakan.** Caption dan `Sumber` kartu Ulikan menyebut tradisi atau versinya. Mitos dan legenda tidak ditulis sebagai fakta sejarah di judul, kartu Ulikan, maupun caption. Kisah makhluk juga menyatakan bahwa kejadiannya rekaan, dan tidak pernah dijual sebagai "kisah nyata".
7. **Motif batik parang tidak dipakai** di prompt ilustrasi mana pun dan selalu masuk kalimat "Avoid ..." bila tokohnya berkain batik atau berlatar Jawa. Batik motif lain boleh, asal sesuai dunia cerita.
8. **Berhenti di setiap akhir tahap.** Tahap 1, 2A, 2B, dan R masing-masing diakhiri pemeriksaan, penyerahan, lalu menunggu Rafi bilang lanjut. Jangan mengerjakan tahap berikutnya tanpa persetujuan.
9. **Durasi 2 sampai 3 menit.** Setiap video berdurasi antara 2:00 dan 3:00, termasuk ± 5 detik elemen merek Ulik Silam yang ditambahkan pov-produksi (pembuka 1,5 dtk, kartu Ulikan 3,5 dtk). Jumlah adegan dan kata diturunkan dari durasi yang dipilih (tabel di 2A.2).

## Alat dan cadangannya

Cek alat yang tersedia di awal sesi, diam-diam, lalu pakai cadangan bila perlu dan sebutkan dalam satu kalimat saat menyerahkan hasil.

| Kebutuhan | Alat utama | Cadangan bila tidak tersedia |
| --- | --- | --- |
| Dokumen konsep | Artifact tipe Docs (atau connector dokumen first-party) | File `KONSEP.md` yang dikirim ke Rafi |
| Diagram struktur alur | Diagram di dokumen Docs | Tabel babak (babak, rentang waktu, adegan, isi) |
| Bank ide | Dokumen `claude/bank-ide-pov.md` di Project lewat tool Projects | Bagian "Ide cadangan" di akhir dokumen konsep |
| Riset versi, kesakralan, dan rupa | Web search dan fetch halaman, ditambah file/connector milik Rafi | Pengetahuan umum, setiap klaim dan unsur rupa diberi label "perlu dicek" |
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

1. **Cek cepat.** Sebelum menawarkan pilihan, cari sekilas versi utama cerita dan apakah ceritanya masih disucikan atau dikeramatkan, karena ini membatasi pilihan posisi "kamu".
2. **Sudut pandang.** Tawarkan 3 sampai 5 posisi "kamu". Setiap pilihan 2 sampai 3 baris: siapa "kamu", konflik atau kontras yang dibawanya, versi yang dipakai, dan contoh kalimat hook. Utamakan manusia kecil di pinggir kisah besar (abdi, kusir, peladang, prajurit, saksi); tokoh legenda boleh menjadi "kamu" bila pagarnya mengizinkan. Usahakan berbeda sisi, termasuk sisi yang biasanya dianggap salah.
3. **Alur.** Setelah Rafi memilih atau menggabungkan, tawarkan 2 sampai 3 bentuk alur (satu malam penentuan, hitung mundur menuju kejadian yang sudah diketahui penonton, rentang beberapa tahun, sebelum-sesudah), lengkap dengan titik balik dan 2 sampai 3 pilihan akhir.
4. **Pendapat jujur.** Di setiap ronde, sebutkan pilihan terkuat untuk video pendek dan alasannya: hook 3 detik pertama, sudut baru pada kisah yang sudah dikenal, variasi visual, jumlah tokoh berulang, muat atau tidak dalam durasi, ketersediaan sumber, dan kepekaan. Jika ide Rafi bermasalah, sampaikan dan tawarkan jalan keluar.
5. **Ide Rafi diutamakan.** Kembangkan dari idenya; Rafi boleh mencampur atau menolak semua pilihan.
6. **Ide cadangan.** Pilihan yang tidak terpakai disimpan ke bank ide (lihat tabel Alat dan cadangannya), dengan tanda jenis "mitos", "legenda", atau "kisah makhluk". Untuk dokumen Project: baca dulu (buat bila belum ada), lalu tulis ulang utuh dengan tambahan di akhir (tanggal, jenis, tema, ide satu baris). Sebelum menulis, pastikan isi baru tidak lebih pendek dari isi lama ditambah tambahannya; bila lebih pendek, berarti ada yang terpotong, jadi jangan ditulis.

Jika Rafi langsung memilih dan bilang lanjut, lewati ronde berikutnya.

### 1.3 Susun brief

Ambil semua detail dari pesan Rafi (daftar maupun kalimat bebas) dan petakan ke kolom ini:

| Kolom | Isi | Default bila kosong |
| --- | --- | --- |
| Judul / topik | Inti video | Diturunkan dari topik |
| Jenis dan lapisan | Mitos, Legenda, kasus antara, atau Kisah makhluk | Ditentukan dari Cakupan |
| Tradisi pemilik | Suku, wilayah, atau komunitas yang memiliki cerita | Dari riset cepat |
| Versi acuan | Naskah, dalang, wilayah, atau catatan folklor yang diikuti | Versi yang paling terdokumentasi di tradisi pemiliknya |
| Pakem makhluk | Hanya untuk kisah makhluk: rupa, perilaku, tanda kehadiran, pantangan, penangkal, dan wilayah asal menurut tradisi | Dari riset; bila tiap daerah berbeda, pilih satu daerah |
| Kesakralan | Terbuka, Dihormati, atau Disucikan (2A.3) | Dari riset cepat; bila ragu, pilih yang lebih ketat |
| Posisi "kamu" | Tokoh sisipan atau tokoh cerita; status, usia, hubungan dengan tokoh lain | Manusia kecil yang paling dekat dengan kejadian |
| Latar | Dunia cerita dan tempat | Sesuai versi acuan |
| Alur | Urutan kejadian, titik balik, akhir | Malam penentuan dengan satu titik balik |
| Tokoh pendukung | Nama atau peran, sifat | 1-3 tokoh yang diperlukan alur |
| Tafsir | Sudut baru yang ditekankan, tanpa mengubah kejadian pokok | Satu sisi manusiawi yang jarang dilihat |
| Momen wajib | Adegan atau detail yang harus ada | - |
| Nada | Megah, kelam, lucu, reflektif, dan sebagainya | Khidmat dan kelam, reflektif di akhir |
| Akhir | Pertanyaan ke penonton, twist sudut pandang, penutup terbuka | Pertanyaan untuk memancing komentar |
| Hindari | Hal yang tidak boleh muncul | - |
| Teknis | Durasi (2:00 sampai 3:00), platform, generator gambar/musik, alat perakit | 3:00 (target ±2:50), TikTok + Shorts, Gemini, Suno, Remotion. Gaya dan rasio mengikuti Aturan tetap 1 |

Aturan brief:

- Detail dari Rafi mengikat: jangan diganti, dilunakkan, atau dipindah urutannya tanpa izin. Bila detail itu melanggar kerangka versi acuan atau pagar kesakralan, sampaikan konfliknya dan tawarkan jalan keluar, misalnya versi lain yang memuat detail itu.
- Kolom kosong diisi default dan dicatat sebagai Asumsi.
- Bertanya hanya jika ada yang tidak bisa ditebak dan mengubah seluruh naskah. Maksimal satu pertanyaan.
- Durasi di luar 2:00 sampai 3:00: sampaikan bahwa skill ini dirancang untuk 2 sampai 3 menit dan usulkan durasi terdekat.
- Alur lengkap dipetakan apa adanya; alur sebagian diisi bagian tengahnya dan adegan tambahan ditandai.
- Alur terlalu padat (melebihi jumlah adegan maksimum untuk durasinya di tabel 2A.2): usulkan adegan yang digabung atau dipotong, atau durasi yang lebih panjang dalam rentang; jangan mempercepat narasi.
- Posisi "kamu" menentukan sudut pandang: apa yang bisa dilihat dan diketahui tokoh, siapa yang menunduk atau memerintah, dan bidikan orang pertama. Narasi tidak boleh menyebut hal yang mustahil diketahui peran itu. Jika penutup memerlukan informasi setelah kisah selesai, tandai adegan itu sebagai epilog.

Templat brief:

```
Judul: POV ...
Jenis dan lapisan: ...
Tradisi pemilik: ...
Versi acuan: ...
Pakem makhluk: ... (hanya kisah makhluk)
Kesakralan: Terbuka / Dihormati / Disucikan, karena ...
Posisi "kamu": ...
Latar: ...
Alur: 1) ... 2) ... 3) ...
Tokoh pendukung: ...
Tafsir: ...
Momen wajib: ...
Nada: ...
Akhir: ...
Hindari: ...
Teknis: durasi ..., generator ...
```

### 1.4 Pemeriksaan dan titik berhenti

Sebelum menyerahkan brief, pastikan:

- [ ] Semua kolom terisi, asumsi ditandai.
- [ ] Topik masuk cakupan: mitos, legenda, atau kisah makhluk, bukan dongeng, kisah nabi, kisah hantu "nyata" masa kini, peristiwa historis murni, atau fiksi realis.
- [ ] Untuk kisah makhluk: pakem makhluk dari satu daerah sudah dicek sekilas punya sumber, dan latarnya masa lalu.
- [ ] Versi acuan dan tradisi pemilik sudah dicek sekilas punya sumber yang bisa ditemukan.
- [ ] Tingkat kesakralan ditetapkan beserta alasannya, dan posisi "kamu" sesuai pagarnya.
- [ ] Posisi "kamu" konsisten dengan alur; tafsir tidak mengubah kejadian pokok.
- [ ] Durasi dalam rentang 2:00 sampai 3:00.

Tulis brief di chat dan akhiri dengan "Lanjut ke naskah?". **Berhenti dan tunggu.**

## Tahap 2A: Naskah, peta versi, dan verifikasi

Hasil tahap ini: dokumen konsep berisi ringkasan, struktur alur, naskah adegan, peta versi, cek kesakralan, dan verifikasi yang disetujui Rafi. Bagian visual, audio, dan caption belum ditulis. Naskah dikerjakan dulu karena semua bagian lain bergantung padanya; mengubah naskah di sini masih murah.

### 2A.1 Buat dokumen

Buat dokumen berjudul "Konsep Video POV: <topik>" (artifact Docs, atau `KONSEP.md` bila tidak tersedia). Semua judul bagian `##` dari Kontrak KONSEP.md v1.3 langsung dibuat dalam urutan kontrak, termasuk `## Kartu Ulikan`, tetapi di tahap ini hanya bagian berikut yang diisi:

- **Ringkasan konsep:** tabel keputusan dengan baris wajib kontrak (`Jumlah ilustrasi` = jumlah adegan + jumlah lembar karakter yang sudah bisa diperkirakan; diperbarui di 2B), baris `Lapisan` (`Mitos`, `Legenda`, atau dua nilai dengan yang dominan di depan), baris `Latar` berisi tempat atau dunia cerita untuk sampul, tanpa tahun (misalnya `Tatar Sunda` atau `Kurusetra`), baris bebas `Jenis` (`Mitos`, `Legenda`, atau `Kisah makhluk`), `Tradisi`, `Versi acuan` (untuk kisah makhluk: sumber pakem makhluk), dan `Kesakralan`, premis satu kalimat, baris Asumsi, benang merah cerita, dan baris "Dipilih karena ..." bila dari brainstorming.
- **Struktur alur:** diagram timeline babak sesuai skala waktu dengan garis batas durasi (atau tabel babak).
- **Naskah adegan:** sesuai kontrak dan aturan di 2A.2.
- **Catatan genre:** subjudul `### Peta versi`, `### Cek kesakralan` (2A.3), dan `### Verifikasi sumber` (2A.4).
- **Sumber:** halaman yang benar-benar dibuka.

Bagian Gaya visual, Prompt ilustrasi, Panduan narasi dan audio, Kartu Ulikan, serta Judul, caption, dan hashtag diberi tanda "Dikerjakan di Tahap 2B" (di Docs sebagai blok tertunda). `KONSEP.md` belum diekspor di tahap ini.

### 2A.2 Aturan naskah

Panjang naskah diturunkan dari durasi yang dipilih:

| Durasi maksimum | Target | Adegan | Babak | Kata narasi (batas, 130 sampai 135 kpm) |
| --- | --- | --- | --- | --- |
| 2:00 | ±1:55 | 11 sampai 13 | 4 | ±210 sampai 220 |
| 2:30 | ±2:20 | 13 sampai 15 | 4 sampai 5 | ±260 sampai 270 |
| 3:00 | ±2:50 | 15 sampai 18 | 5 sampai 6 | ±320 sampai 335 |

Durasi di antara baris tabel dihitung dengan rumus yang sama. pov-produksi menambahkan jeda 0,9 detik di setiap adegan, 1,5 detik di setiap adegan hening, dan ± 5 detik elemen merek Ulik Silam, jadi batas kata dihitung dari waktu yang tersisa untuk narasi:

```
kata maksimum = (target detik − 5 − 0,9 × jumlah adegan − 1,5 × jumlah adegan hening) × kpm / 60
```

dengan kpm 130 sampai 135. Angka bawah (130 kpm) adalah batas aman, terutama untuk narator AI yang diberi emosi dan cenderung lebih lambat. Tag suara tidak dihitung sebagai kata, tetapi tag bunyi (misalnya `[sighs]`, `[exhales]`, `[laughs]`) dan setiap elipsis diperkirakan menambah ± 0,5 detik; kurangi waktu narasi sebanyak itu. Hitung dengan skrip bila shell tersedia.

Aturan lain:

- Hook maksimal 10 detik yang menaruh penonton di posisi tokoh ("Kamu ..."). Karena banyak penonton sudah tahu akhir ceritanya, hook menjual sudut pandangnya, bukan sekadar kejadiannya.
- Setiap adegan 8 sampai 12 detik.
- Narasi orang kedua, kalimat pendek dengan kalimat menohok yang bisa diberi jeda.
- **Yang gaib dinyatakan sebagai kejadian.** Tidak perlu "konon" di setiap kalimat dan tidak ada kedipan mata yang mengejek. Keraguan hanya boleh datang dari tokoh di dalam cerita.
- **Tidak hitam-putih.** Tokoh yang biasa dianggap jahat atau suci boleh diperlihatkan sisi manusianya lewat apa yang disaksikan "kamu", tanpa menghapus perbuatannya di versi acuan. Sikap narasi tidak menghakimi kecuali brief meminta lain.
- **Nada horor** (di jenis apa pun): ketakutan dibangun dari tanda sebelum wujud, misalnya bau, bunyi, hewan yang mendadak diam, atau pantangan yang dilanggar. Makhluk muncul bertahap: terdengar, lalu terlihat jauh atau sebagian, baru dekat di puncak, dan tidak pernah dijelaskan sampai habis. Ketakutan datang dari aturan dunia cerita yang dilanggar, bukan dari darah atau luka. Akhir boleh ambigu, tetapi tetap terasa selesai.
- Satu momen hening/emosional dan penutup sesuai kolom Akhir. Adegan terakhir langsung disambung kartu Ulikan tanpa kalimat penutup tambahan, jadi kalimat terakhir narasi harus sudah terasa sebagai akhir.
- **Transisi babak tanpa judul di layar.** Bila waktu atau tempat melompat di awal babak baru, adegan pertama babak itu diberi teks layar penanda singkat, misalnya `Tiga belas tahun kemudian.` atau `Hari kesepuluh perang.`. Tanpa lompatan, tidak perlu. Penanda ini mengikuti versi acuan dan masuk Peta versi.
- Kolom `Bidikan dan visual` sudah memuat bidikan A/B dan deskripsi visual yang cukup untuk ditulis menjadi prompt di 2B: apa yang sedang dilakukan tokoh, emosinya, dan, bila penting, siapa yang menatap siapa. Untuk bidikan A, sebut juga apa yang dipegang atau dilakukan tangan "kamu".

### 2A.2a Tag suara (ElevenLabs v3)

Narasi dibacakan narator AI di ElevenLabs dengan model Eleven v3, dan digenerate Rafi per babak. Emosi diarahkan langsung di kolom Narasi, dan narasi lengkap bertag ini disalin per babak ke `### Narasi lengkap (ElevenLabs)` di 2B.3:

- **Satu tag emosi di awal setiap kalimat**, dengan format `[emotion] kalimat. [emotion] kalimat.` Contoh satu adegan: `[calm] Malam itu, kabut turun di atas bendungan. [nervous] Kamu menghitung bayangan yang bekerja. [whispers] Jangan bersuara...`
- **Tag** boleh apa saja dari tag Eleven v3, ditulis dalam kurung siku, huruf kecil, bahasa Inggris, tepat sebelum kalimat yang dipengaruhinya. Tag emosi: `[calm]`, `[serious]`, `[nervous]`, `[tense]`, `[sad]`, `[curious]`, `[angry]`, `[excited]`, `[sarcastic]`, `[resigned]`, `[crying]`; tag cara bicara: `[whispers]`, `[shouting]`. Dua tag boleh berurutan bila keduanya perlu (`[sad] [whispers]`).
- **Alur emosi wajar:** kalimat berurutan dengan emosi yang sama tetap diberi tagnya masing-masing, tetapi emosi tidak melompat-lompat tanpa alasan dari isi cerita. Perubahan tag ditaruh di titik yang memang berubah: hook, titik balik, momen hening, dan kalimat terakhir. Satu kata seru atau potongan kalimat pendek tetap dihitung sebagai kalimat.
- **Tag bunyi** (`[sighs]`, `[exhales]`, `[gasps]`, `[laughs]`) bersifat tambahan dan tetap hemat, paling banyak satu per adegan, di luar tag emosi kalimat.
- **Jeda:** elipsis `...` untuk napas atau ketegangan di dalam narasi. Jeda antar-adegan tidak ditulis di kolom Narasi; `...` penutup paragraf hanya ditambahkan di `### Narasi lengkap (ElevenLabs)`, dan pov-produksi menambahkan jedanya sendiri.
- Tag hanya di kolom Narasi dan `### Narasi lengkap (ElevenLabs)`. Teks layar, kartu Ulikan, judul, dan caption tidak memakai tag. Di baris `**Adegan <n> · Narasi ...:**` pada bagian prompt, narasi ditulis tanpa tag.
- Tag tidak mengubah isi; pemeriksaan versi tetap atas teks narasinya.

### 2A.3 Peta versi, sisipan, dan kesakralan

**Peta versi.** Di `## Catatan genre`, subjudul `### Peta versi`, buat tabel `| Unsur cerita | Adegan | Status | Versi acuan | Versi lain | Sumber |`. Status:

- **Tradisi:** ada di versi acuan.
- **Versi lain:** diambil dari versi selain acuan, dengan alasan.
- **Tafsir:** pemaknaan, pikiran, atau perasaan yang tidak tertulis tetapi tidak bertentangan.
- **Sisipan:** tokoh, adegan, atau benda karangan Ulik Silam di celah cerita.

Perbedaan versi yang terkenal wajib dicatat. Contoh: Drupadi bersuami lima Pandawa dalam Mahabharata India, tetapi hanya istri Yudistira dalam pewayangan Jawa; konsep tidak boleh mencampur keduanya tanpa sadar.

**Sisipan.** Sisipan hanya mengisi celah. Ia tidak mengubah sebab, akibat, atau akhir kejadian pokok, dan tidak membuat "kamu" menjadi penyebab rahasia peristiwa besar. Nama tokoh sisipan mengikuti kebiasaan dunia ceritanya dan tidak sama dengan tokoh terkenal dalam tradisi itu.

**Kisah makhluk.** Di jenis ini, kejadian inti dan tokohnya dicatat sebagai Sisipan, sedangkan setiap unsur pakem makhluk (rupa, perilaku, tanda kehadiran, pantangan, penangkal, asal-usul) dicatat sebagai Tradisi beserta daerah dan sumbernya. Aturannya:

- Pakem diambil dari satu daerah. Bila ciri makhluk berbeda antar daerah (misalnya kuntilanak di Melayu, Sunda, dan Jawa), pilih satu dan catat yang lain sebagai versi lain; jangan mencampur.
- Rupa dan perilaku dari film, sinetron, atau gim tidak dianggap tradisi. Bila rupa populer sebuah hantu ternyata berasal dari film, catat di Peta versi dan kembali ke sumber folklor.
- Latar masa lalu, di tempat yang wajar untuk kepercayaan itu. Desa, makam, keluarga, atau orang nyata tidak dijadikan lokasi atau pelaku kejadian karangan, agar tidak ada yang dituduh atau dicap.
- Hantu yang lahir dari ritus atau kepercayaan agama minimal berstatus **Dihormati**. Pocong, misalnya, berangkat dari kain kafan dan tata pemakaman Islam: jenazah dan pemakaman tidak dijadikan lelucon atau tontonan, dan kartu Ulikan atau caption menyebut bahwa pocong kepercayaan rakyat, bukan ajaran agama. Makhluk yang terikat kepercayaan yang masih hidup, seperti leak di Bali, diperiksa dengan pagar yang sama ketatnya.
- Kisah pesugihan (tuyul, babi ngepet, dan sejenisnya) tidak menuduh kelompok, suku, atau profesi tertentu sebagai pelakunya.
- Latar belakang tragis hantu perempuan (misalnya meninggal saat melahirkan atau karena kekerasan) diceritakan dengan empati dan hanya disiratkan, mengikuti aturan unsur seksual dan kekerasan di bawah.

**Cek kesakralan.** Riset apakah cerita, tokoh, tempat, benda, dan ritualnya masih dipercaya, dipuja, atau dikeramatkan, lalu tulis hasilnya di `### Cek kesakralan`: tingkat, komunitas terkait, alasan, sumber, dan keputusan. Perhatikan terutama tradisi yang masih hidup, misalnya Hindu Bali, Kaharingan, Aluk Todolo, Marapu, Sunda Wiwitan, serta sosok yang dihormati keraton atau masyarakat pesisir.

| Tingkat | Ciri | Pagar |
| --- | --- | --- |
| Terbuka | Cerita umum; tokohnya tidak dipuja dan tempatnya tidak dikeramatkan secara khusus | Tafsir bebas dalam kerangka versi acuan |
| Dihormati | Tokoh, leluhur, makam, atau tempatnya dikeramatkan oleh komunitas yang masih ada | Tidak dijadikan lelucon atau horor murahan; tokohnya tidak diberi aib baru; tempat dan laku tradisinya digambarkan dengan hormat |
| Disucikan | Tokoh dipuja, teks dipakai dalam ibadah, atau cerita terikat ritual yang masih berjalan | Sosok yang dipuja tidak menjadi "kamu", tidak diberi ucapan atau sifat di luar sumber, dan tidak dijadikan bahan humor atau sensasi; "kamu" selalu manusia yang menyaksikan dari jarak hormat |

Aturan semua tingkat:

- Ritual tertutup, mantra yang dianggap berdaya, dan tata cara yang tidak untuk umum tidak diperagakan atau dituliskan.
- Unsur seksual, inses, dan kekerasan seksual hanya disiratkan seperlunya, tidak digambarkan. Tokoh anak tidak pernah berada dalam konteks seksual.
- Kekerasan tidak dijadikan tontonan; luka, darah, dan mayat ditahan atau disiratkan.
- Cerita yang merendahkan suku, agama, atau kelompok tidak diulang sebagai kebenaran. Bila tetap dipakai, sudut pandangnya harus membuat prasangka itu terlihat.
- Tokoh nyata yang muncul dalam legenda diperlakukan hati-hati: bedakan catatan sejarah dari kisah tradisi, dan tokoh yang masih hidup tidak muncul.
- Bila komunitas pemilik diketahui keberatan terhadap penggambaran tertentu, sampaikan ke Rafi dan pilih jalan yang tidak melanggar keberatan itu.

### 2A.4 Verifikasi sumber

- **Yang diverifikasi di 2A:** semua klaim yang bisa dicek di narasi dan teks layar: nama tokoh dan ejaannya, hubungan antartokoh, urutan kejadian dalam versi acuan, tempat, istilah budaya, dan kutipan naskah. Detail visual serta klaim di judul, caption, dan kartu Ulikan diverifikasi di 2B dengan aturan yang sama.
- **Sumber:** utamakan edisi atau terjemahan naskah, kajian filologi, antropologi, dan folklor, ensiklopedia, museum, serta lembaga budaya atau adat, di atas blog dan media sosial. Untuk tradisi lisan, catat siapa atau wilayah mana yang menuturkan. Bandingkan minimal dua sumber independen untuk unsur kunci bila memungkinkan; yang hanya punya satu sumber ditandai "1 sumber". Cuplikan hasil pencarian tidak dihitung sebagai sumber; halamannya harus dibuka.
- **Tabel** `### Verifikasi sumber`: Klaim | Adegan | Status (Terverifikasi / Diperbaiki / Tidak ditemukan) | Sumber. Klaim dari caption dicatat dengan adegan "(caption)".
- **Kutipan naskah** hanya yang terdokumentasi, dengan sumbernya. Selain itu, tulis sebagai parafrase tanpa tanda kutip.
- **Klaim yang tidak terkonfirmasi** ditulis ulang, dipindah ke Peta versi sebagai tafsir atau sisipan, atau dihapus.
- **Klaim asal-usul** tidak dilebih-lebihkan: jangan menyebut suatu versi "yang asli" atau "yang paling benar" kecuali ada dasar kajian.
- **Label "perlu dicek"** hanya dipakai jika web search tidak tersedia di sesi itu. Dalam kasus itu, setiap baris tabel diberi status "Perlu dicek" dan hal ini disebut saat menyerahkan.

### 2A.5 Pemeriksaan dan titik berhenti

Sebelum menyerahkan naskah, pastikan:

- [ ] Jumlah adegan, babak, dan kata sesuai tabel 2A.2 untuk durasi yang dipilih (dihitung dengan rumus, bukan perkiraan).
- [ ] Nomor adegan berurutan dari 1; tabel naskah memakai kolom persis kontrak; setiap adegan punya bidikan A/B, visual, dan narasi.
- [ ] Momen hening dan epilog (bila ada) sudah ditandai.
- [ ] Setiap unsur cerita ada di `### Peta versi` dengan status; kejadian pokok dan akhir mengikuti versi acuan; sisipan tidak mengubahnya.
- [ ] `### Cek kesakralan` terisi dan naskah mematuhi pagarnya; tidak ada ritual tertutup, mantra, atau unsur seksual yang digambarkan.
- [ ] Setiap klaim yang bisa dicek ada di `### Verifikasi sumber`; kutipan naskah hanya yang terdokumentasi.
- [ ] Bagian Sumber hanya berisi halaman yang benar-benar dibuka.
- [ ] Isi kolom Hindari tidak muncul di naskah.
- [ ] Setiap kalimat narasi diawali satu tag emosi berformat `[kata]` huruf kecil bahasa Inggris, alurnya wajar, tag bunyi paling banyak satu per adegan dan sudah diperhitungkan dalam durasi; penanda teks layar ada di awal babak yang melompat waktu atau tempat.
- [ ] Baris `Lapisan`, `Latar`, `Tradisi`, `Versi acuan`, dan `Kesakralan` terisi di Ringkasan konsep.
- [ ] Semua detail dari brief yang mengikat masih ada dan urutannya tidak berubah.

Serahkan dengan satu baris ringkasan (jumlah adegan, kata, perkiraan durasi, versi acuan, tingkat kesakralan, jumlah sisipan), sebutkan cadangan alat yang dipakai (bila ada), lalu akhiri dengan "Lanjut ke visual, audio, dan caption?". **Berhenti dan tunggu.**

Perubahan dari Rafi selama 2A dikerjakan langsung di tahap ini (bukan Tahap R), lalu pemeriksaan 2A.5 dijalankan ulang.

## Tahap 2B: Visual, audio, kartu Ulikan, dan caption

Hasil tahap ini: dokumen konsep lengkap yang memenuhi Kontrak KONSEP.md v1.3, plus file `KONSEP.md` untuk diserahkan ke pov-produksi.

**Naskah dari 2A dikunci.** Jika saat menulis prompt atau audio ternyata ada adegan yang perlu diubah, usulkan perubahannya ke Rafi dan jangan mengubah narasi diam-diam. Perubahan narasi yang disetujui memicu pemeriksaan ulang 2A.5 untuk adegan itu.

### 2B.1 Riset rupa, gaya visual, dan konsistensi tokoh

Isi bagian `## Gaya visual dan konsistensi tokoh` dengan: tabel palet dan cahaya per babak (format kontrak), panduan bidikan 9:16, bidikan A (orang pertama) dan B (sorotan tokoh), deskripsi tokoh baku dalam bahasa Inggris, deskripsi tangan baku "kamu", aturan figuran, baris `**Penutup prompt:**` dengan blok kodenya, dan templat prompt yang memuat Aturan tetap 1. Deskripsi tokoh ditulis setelah riset di bawah ini, bukan dari ingatan.

**Riset rupa dan dunia cerita**

Dunia mitos tidak punya foto, jadi rupanya diturunkan dari tradisi pemiliknya: relief dan arca, wayang, lontar dan naskah bergambar, lukisan tradisional, topeng, busana upacara, koleksi museum, serta deskripsi dalam naskah. Riset setiap tokoh berlembar karakter, makhluk gaib, kelompok figuran, dan tempat utama:

- **Tubuh dan wajah:** perawakan, warna kulit, rambut, dan tanda khas; untuk dewa atau makhluk, atribut yang tercatat (jumlah tangan, senjata, wahana, taring, warna).
- **Pakaian lapis demi lapis:** penutup kepala, badan atas, kain bawah dan cara memakainya, sabuk atau selendang, alas kaki.
- **Bahan, warna, dan motif** yang sesuai budaya pemilik cerita.
- **Perhiasan, senjata, benda bawaan,** dan penanda status.
- **Arsitektur dan alam:** bentuk bangunan, perahu, hutan, gunung, atau tempat nyata yang terikat cerita.

Pilih satu **pakem rupa** per konsep (misalnya berdasar relief Jawa Timur, wayang kulit, atau busana adat wilayah tertentu) dan pegang di semua prompt. Jangan mencampur budaya tanpa alasan; Mahabharata versi Jawa tidak otomatis memakai rupa India, dan sebaliknya. Referensi dipakai untuk unsur rupa, bukan untuk meniru satu karya seni utuh. Rupa modern dari film, komik, atau gim tidak dijadikan acuan.

**Sosok yang disucikan.** Di tingkat Disucikan, sosok yang dipuja hanya digambarkan sesuai ikonografi tradisinya, tanpa unsur sensual atau komikal. Bila tradisinya tidak menggambarkan wujud sosok itu, atau penggambaran berisiko, gunakan cahaya, siluet jauh, bayangan, atau benda simbolis.

**Horor di gambar.** Untuk nada horor:

- Makhluk lebih banyak tampil jauh, sebagian, atau terbingkai (di ujung jalan, di balik bilik bambu, di cabang pohon, di tepi cahaya pelita); wujud penuh dan dekat disimpan untuk puncak, paling banyak satu atau dua adegan.
- Makhluk yang muncul di 3 adegan atau lebih tetap mendapat lembar karakter, digambar utuh di latar polos agar rupanya konsisten, tanpa darah atau luka.
- Wajah dan tubuh makhluk digambarkan lewat ciri pakemnya (misalnya kain kafan yang terikat di kepala dan kaki, rambut panjang yang menutupi wajah), bukan lewat luka terbuka.
- Masukkan "gore, blood, exposed wounds, rotting flesh, grotesque close-up" ke kalimat "Avoid ...". Bila Gemini menolak, ganti dengan siluet, bayangan di dinding, atau tanda kehadiran (jejak, kain putih di kejauhan).
- Cahaya bulan pucat boleh, tetapi tetap ada satu sumber cahaya hangat sebagai kontras, sesuai identitas Ulik Silam.

**Unsur populer yang menyimpang.** Generator gambar cenderung memakai rupa "fantasi" umum atau busana tradisional masa kini. Unsur yang tidak cocok dengan pakem dimasukkan ke kalimat "Avoid ...", bersama motif parang (Aturan tetap 7). Nama motif atau busana lokal ditulis bersama penjelasan bentuknya dalam bahasa Inggris, karena generator belum tentu mengenal namanya.

**Referensi visual.** Catat 1 sampai 3 referensi per tokoh (link koleksi museum, Wikimedia Commons, arsip, atau jurnal) beserta unsur yang diambil. Bila gambarnya domain publik atau boleh dipakai, sarankan Rafi mengunggahnya ke Gemini bersama prompt lembar karakter, dengan kalimat pembatas, misalnya "Use the uploaded relief photo only as a reference for the crown and armbands, not for the pose or art style."

**Catatan akurasi visual.** Tulis di `## Catatan genre`, subjudul `### Catatan akurasi visual`, tabel `| Tokoh | Unsur | Pilihan di prompt | Dasar dan sumber | Status |`. Status: Tradisi (ada dasar dalam tradisi itu), Tafsir (diturunkan dari sumber terdekat), Rekaan (tanpa sumber), atau Dihindari (sengaja tidak dipakai, beserta alasannya).

**Deskripsi tokoh baku**

Satu paragraf bahasa Inggris per tokoh berlembar karakter, ± 80 sampai 150 kata, disusun dari hasil riset dengan urutan tetap:

1. Identitas: nama, usia kesan, budaya atau dunia cerita, status atau peran.
2. Tubuh dan wajah: perawakan, warna kulit, bentuk wajah, mata, alis, hidung, bibir, tanda khas, rambut; untuk makhluk, ciri nonmanusia yang tetap.
3. Pakaian dari kepala sampai kaki: setiap unsur dengan bahan atau teknik, warna, motif (dijelaskan bentuknya), dan cara memakainya.
4. Perhiasan, senjata, dan benda khas.
5. Sikap tubuh khas yang menggambarkan wataknya, bukan pose tetap.

Deskripsi ini disalin persis ke prompt lembar karakter. Di prompt adegan, kalimat "Same character ..." yang membawa penampilannya; deskripsi adegan cukup menyebut perubahan khusus adegan itu.

**Tangan dan lengan "kamu" (bidikan A)**

Di bidikan A, tangan dan lengan adalah satu-satunya bagian tubuh "kamu" yang terlihat, jadi harus sama di setiap adegan:

- Tulis satu **deskripsi tangan baku** dalam bahasa Inggris: warna kulit, kesan usia dan pekerjaan, lengan baju atau lengan telanjang, perhiasan, serta tato atau bekas luka bila ada. Deskripsi ini disalin persis ke setiap prompt bidikan A.
- Bila pakaian "kamu" berganti di tengah cerita, tulis varian berlabel, misalnya `Tangan baku · Babak 1–3` dan `Tangan baku · Babak 4–5`, dan pakai varian yang sesuai di setiap adegan.
- Di setiap prompt bidikan A, sebut tangan mana yang terlihat, apa yang dipegang atau dilakukan masing-masing, dan kesinambungan benda dari adegan sebelumnya. Tangan masuk dari bawah bingkai dengan perspektif orang pertama yang wajar dan terangkat ke depan setinggi dada, sehingga benda yang dipegang terlihat jelas di sekitar tengah gambar.
- Posisi "kamu" yang tampil di 3 adegan atau lebih, lewat bidikan A maupun B, mendapat lembar karakter, juga bila hanya tampil lewat bidikan A. Lembar ini ditambah satu panel tangan dan lengan dari sudut pandang orang pertama. Bila "kamu" tidak bernama, perannya dipakai sebagai nama lembar (misalnya `Kusir Tua`). Prompt bidikan A merujuknya dengan "The viewer is <Nama tokoh>: the hands and forearms in the foreground match the first-person panel of the <Nama tokoh> reference image.", dan Rafi mengunggah lembar ini di setiap adegan bidikan A.

**Figuran**

- Setiap figuran atau kelompok figuran diberi ciri pembeda yang jelas: usia, perawakan, wajah, rambut, dan pakaian sesuai statusnya, dengan warna dan aksesori yang berbeda dari tokoh utama. Unsur khas tokoh utama tidak dipakai figuran.
- Figuran dalam satu kelompok juga beragam, tidak seragam seperti salinan.
- Di prompt, tambahkan kalimat pembeda, misalnya "The guards are different people from <Nama tokoh>: older and stockier, with plain brown headcloths and no jewelry."
- Masukkan "background figures copying <Nama tokoh>'s face or outfit, identical faces" ke kalimat "Avoid ...".

**Arah pandang, ekspresi, dan gerak**

- **Arah pandang.** Setiap tokoh diberi arah pandang ke sesuatu di dalam adegan. Tidak ada tokoh yang menatap kamera kecuali memang disengaja dan sudah tertulis di kolom `Bidikan dan visual`. Bila tidak ada kontak mata yang disengaja, tulis "characters looking at the camera" di kalimat "Avoid ...".
- **Ekspresi dan emosi.** Setiap tokoh yang wajahnya terlihat diberi ekspresi spesifik dari narasi dan tag emosi: alis, mata, mulut, rahang, ditambah bahasa tubuh. Figuran juga bereaksi sesuai perannya.
- **Gerak dinamis.** Gambarkan tokoh di tengah gerakan, dengan pose tidak simetris serta kain, rambut, asap, atau api yang ikut bergerak. Adegan tenang tetap punya gerak kecil. Variasikan sudut kamera antaradegan. Masukkan "stiff symmetrical poses, characters standing straight and facing forward" ke kalimat "Avoid ...".

**Panduan bidikan 9:16**

Video tampil di kanvas 1080 × 1920: teks layar di sepertiga atas, subtitle dan antarmuka aplikasi di ± 32% terbawah, tombol suka dan komentar di tepi kanan ± 17%, label lapisan di pojok kiri atas, dan efek Ken Burns memperbesar gambar hingga 114%. pov-produksi memakai zona ini saat memeriksa ilustrasi. Zona ini dijaga lewat pilihan bidikan, bukan lewat kalimat tata letak di prompt:

- Utamakan bidikan sedang atau sedang-lebar dengan wajah di sekitar tengah gambar dan ruang di atas kepala; jangan menaruh wajah atau benda kunci tepat di tepi bawah atau tepi kanan.
- Untuk adegan yang punya teks layar, pilih isi adegan yang wajar memberi ruang di bagian atas (langit, atap, dinding, kegelapan), ditulis sebagai isi adegan.
- Prompt tidak memuat kalimat tata letak zona seperti "open space in the top third" atau "nothing important in the bottom third"; cukup tulis jenis bidikan dan sudut kameranya.

**Palet dan cahaya**

Palet dan cahaya diselaraskan dengan identitas Ulik Silam ("pelita di kegelapan masa silam"): warna tanah yang hangat, bayangan dalam, dan sumber cahaya hangat bila adegannya memungkinkan. Kejadian gaib boleh punya cahaya khas, tetapi hindari palet neon atau dingin jenuh. Hook dan adegan terakhir diutamakan bercahaya redup dengan satu sumber cahaya hangat.

### 2B.2 Prompt ilustrasi

- Lembar karakter disebut dengan nama tokohnya: `**Lembar karakter · <Nama tokoh>**`. Tokoh utama yang tampil (bidikan B), posisi "kamu" yang tampil di 3 adegan atau lebih, serta setiap tokoh pendukung atau makhluk yang muncul di 3 adegan atau lebih mendapat satu lembar. Sosok yang hanya digambarkan simbolis tidak mendapat lembar. Nama tokoh ditulis persis sama di semua prompt yang merujuknya.
- Isi prompt lembar karakter: "Character reference sheet of <Nama tokoh>.", deskripsi tokoh baku (persis), tampak depan, samping, dan belakang seluruh badan dalam sikap berdiri yang santai dan wajar, satu potret wajah tiga perempat, satu panel detail motif kain dan perhiasan, panel tangan orang pertama untuk lembar "kamu", latar polos terang, "Detailed vector art illustration, clean crisp outlines, flat colors with subtle shading", "faithful to <tradisi dan pakem rupa> ..." dengan rincian dari riset, kalimat referensi visual bila Rafi mengunggah gambar, kalimat "Avoid ...", satu baris kosong, lalu dua baris Aturan tetap 1.
- Urutan isi setiap prompt adegan:
  1. "Same character as the <Nama tokoh> reference image." untuk setiap tokoh berlembar karakter yang tampil; untuk "kamu" di bidikan A, kalimat "The viewer is <Nama tokoh> ...".
  2. Bidikan dan sudut kamera, tempat, waktu, dan suasana adegan.
  3. Untuk bidikan A: "First-person point of view.", deskripsi tangan baku (persis, varian babak yang sesuai), lalu apa yang dilakukan setiap tangan.
  4. Untuk setiap tokoh: gerak, ekspresi dan emosi, serta arah pandang.
  5. Kejadian gaib, digambarkan konkret sebagai bagian adegan.
  6. Figuran beserta kalimat pembedanya.
  7. "Detailed vector art illustration, clean crisp outlines, flat colors with subtle shading".
  8. Palet dan cahaya babak.
  9. "faithful to <tradisi dan pakem rupa> ..." dengan rincian pakaian dan arsitektur dari riset.
  10. Kalimat "Avoid ...": isi kolom Hindari, unsur berstatus Dihindari, yang relevan dari 2B.1, ditambah "extra or malformed hands and fingers, text, watermarks".
  11. Satu baris kosong, lalu dua baris Aturan tetap 1.
- Cara pakai untuk Rafi: buat lembar karakter dulu, lalu unggah lembar tokoh yang tampil sebagai referensi di setiap adegan, termasuk lembar "kamu" di setiap bidikan A. Kerjakan dalam satu percakapan Gemini dan minta ubah ke 9:16 bila hasilnya tidak vertikal. Bila ada yang meleset, minta Gemini memperbaiki bagian itu saja.
- Perbarui baris `Jumlah ilustrasi` di Ringkasan konsep (adegan + lembar karakter).

Contoh prompt bidikan B:

```
Same character as the Sangkuriang reference image.
Medium-wide shot from a low angle, a half-built earthen dam on a mountain river before dawn. Sangkuriang drives a heavy wooden stake into the mud with both arms, weight thrown forward, jaw clenched, eyes fixed on the darkening water. Around him, shadowy spirit workers with faint ember-like eyes haul logs through the mist, their bodies dissolving into smoke at the edges. Torch flames lean in the wind and wet earth sprays from his feet.
Detailed vector art illustration, clean crisp outlines, flat colors with subtle shading, warm earthy palette of ochre, deep brown and torch gold with deep shadows, faithful to Sundanese folklore with simple woven cloth and a plain headcloth.
Avoid characters looking at the camera, stiff symmetrical poses, generic fantasy armor, parang batik pattern, extra or malformed hands and fingers, text, watermarks.

Style: detailed vector art
Aspect ratio: 9:16
```

Contoh prompt bidikan A, dengan kontak mata yang disengaja:

```
The viewer is Peladang: the hands and forearms in the foreground match the first-person panel of the Peladang reference image.
Medium shot at eye level, the edge of a misty hillside field before dawn, a faint red glow rising behind the eastern ridge.
First-person point of view. <deskripsi tangan baku · Babak 1–3, disalin persis>. The left hand grips a wooden pestle; the right hand is raised to shield a small oil lamp.
An old village woman, small and stooped with grey hair in a loose bun and a faded indigo cloth, stops mid-step and looks straight at the viewer, eyes wide, lips parted, one finger pressed to her mouth. She is a different person from Peladang, with no jewelry.
Detailed vector art illustration, clean crisp outlines, flat colors with subtle shading, warm earthy palette of ochre and lamp gold against cool grey mist, faithful to Sundanese folklore and rural highland life.
Avoid stiff symmetrical poses, parang batik pattern, extra or malformed hands and fingers, mismatched sleeves, text, watermarks.

Style: detailed vector art
Aspect ratio: 9:16
```

### 2B.3 Suara narator dan musik

**Suara narator (ElevenLabs)**

- Isi `### Suara narator` dengan baris `**Model:** Eleven v3`, `**Voice:**` (voice pilihan Rafi; `-` bila belum dipilih), dan `**Stability:**` (default `Natural`; `Creative` bila ingin lebih ekspresif dengan risiko hasil meleset; `Robust` kurang menanggapi tag).
- Tambahkan arahan per babak dalam satu baris: nada, tempo, dan emosi dominan.
- Ingatkan bahwa pilihan voice paling menentukan: tag tidak bisa memaksa voice yang lembut untuk berteriak.

**Narasi lengkap (ElevenLabs)**

Setelah `### Suara narator`, tulis `### Narasi lengkap (ElevenLabs)`: seluruh narasi video, lengkap dengan tag emosi per kalimat, siap disalin ke ElevenLabs satu babak sekali generate.

- Untuk tiap babak: baris `**Babak <n>: <nama>**`, lalu satu blok kode berisi narasi babak itu.
- Di dalam blok: satu paragraf per adegan, urut, dipisah satu baris kosong. Setiap paragraf berformat `[emotion] kalimat. [emotion] kalimat.` dan diakhiri `...` sebagai jeda antar-adegan (tidak ditambah bila paragraf sudah berakhir elipsis). Format ini sama dengan `babak-N.txt` di pov-produksi, jadi potongan per adegan tetap terdeteksi.
- Isinya disalin dari kolom Narasi, bukan ditulis ulang: teks dan tag harus identik. Bila ada tag yang ingin diubah, ubah di kolom Narasi dulu, lalu salin ulang.
- Tulis jumlah karakter tiap babak di bawah bloknya (`Karakter: <n>`, dihitung skrip).

**Musik (Suno)**

- Tiga cue sesuai perubahan suasana dalam alur; Suno tidak bisa menepati timestamp, jadi cue disambung di editor.
- Tabel cue: Cue | Babak | Durasi target | Suasana (format di Kontrak). **Durasi target** = jumlah durasi babak dalam rentang cue (dari kolom Waktu naskah) ditambah ± 5 detik untuk crossfade, dibulatkan ke atas ke kelipatan 5 detik, ditulis `m:ss`. Hitung dengan skrip bila shell tersedia.
- Isi kolom Style of Music di Suno: genre dan instrumen yang sesuai tradisi cerita, suasana, perkembangan ("starts sparse ... fades ..."), **durasi target** dalam detik dan `m:ss` yang sama dengan tabel (misalnya "about 75 seconds long (1:15), with a clear ending"), BPM, "no vocals". Pengaturan: Custom, Instrumental, Exclude Styles untuk instrumen yang tidak diinginkan. Hindari meniru musik ritual tertentu pada cerita berstatus Disucikan.
- Suno belum tentu menepati durasi yang ditulis. Bila aplikasi Suno menyediakan pengaturan durasi, isi dengan angka yang sama. Cue yang terlalu pendek di-Extend; cue yang terlalu panjang dipotong atau dipudarkan di editor.
- Tips: 2 sampai 4 variasi per cue, crossfade 1 sampai 2 detik di pergantian babak, hening diatur lewat volume di editor, cek lisensi paket Suno sebelum monetisasi.

### 2B.4 Efek suara

- Claude tidak bisa membuat SFX organik yang akurat; katakan terus terang bila ditanya.
- Tabel: # | Adegan | Bunyi | Kata kunci pustaka | Prompt generator AI (format di Kontrak). Pustaka: CapCut, Pixabay, YouTube Audio Library, Freesound CC0; generator: misalnya ElevenLabs Sound Effects.
- Tandai bunyi yang sulit dan beri cadangan dari cue musik.
- Untuk nada horor, bunyi adalah alat utama: utamakan tanda kehadiran dari pakem makhluk (misalnya tawa atau tangis di kejauhan, ketukan, gesekan kain), hening mendadak sebelum puncak, dan bunyi alam yang berhenti. Hindari jumpscare keras yang mengagetkan tanpa membangun ketegangan.
- Isi baris `**Adegan hening:**` sesuai penanda Momen hening di naskah.

### 2B.5 Kartu Ulikan

Kartu Ulikan selalu ada di setiap video. Tampil 3,5 detik langsung setelah adegan terakhir dan menjadi tempat video melangkah keluar dari cerita.

- Isi **satu** temuan atau satu pertanyaan, maksimal ±15 kata dan idealnya 10 sampai 12 kata (hitung dengan skrip), dalam Bahasa Indonesia.
- Pilihan isi terbaik: perbedaan versi yang mengejutkan, jejak cerita di tempat atau tradisi hari ini, atau apa yang coba dijelaskan kisah itu. Jangan mengulang narasi.
- Temuan wajib terverifikasi dan dicatat di `### Verifikasi sumber` dengan adegan "(kartu Ulikan)". Kartu tidak membantah keyakinan orang dan tidak menyatakan kisahnya sebagai fakta sejarah.
- `Sumber` selalu memuat asal cerita, juga untuk pertanyaan, misalnya `Legenda Sunda; versi: <sumber singkat>` atau `Mitos Bali; sumber: <sumber singkat>`. Untuk kisah makhluk: `Kisah rekaan; <makhluk>: kepercayaan <daerah>; sumber: <sumber singkat>`. Isi terbaik untuk kisah makhluk adalah asal-usul kepercayaannya atau pantangan yang masih dikenal hari ini.
- Tawarkan 2 pilihan di chat saat menyerahkan 2B (satu temuan, satu pertanyaan); yang terkuat ditulis di dokumen.

Format di dokumen (sesuai kontrak):

```
## Kartu Ulikan

**Teks:** <satu temuan atau pertanyaan>

**Sumber:** <asal cerita>; versi: <sumber singkat>
```

### 2B.6 Judul, caption, dan hashtag

Ditulis satu subjudul per platform (`### TikTok`, `### YouTube Shorts`, atau platform lain di brief), dalam Bahasa Indonesia.

**Prinsip umum**

- Judul dan caption hanya menjanjikan apa yang ada di video. Tidak ada klaim "kisah nyata", "versi asli", atau "rahasia yang disembunyikan" tanpa dasar.
- Kejadian cerita ditulis sebagai cerita ("dalam kisah ini", "menurut <versi>"), bukan catatan sejarah.
- Setiap klaim di judul dan caption sudah ada di `### Verifikasi sumber`.
- Tidak memuat isi kolom Hindari atau kata yang mengejek kepercayaan, tokoh, dan kelompok.

**Judul**

- YouTube Shorts memakai judul terpisah: batas platform 100 karakter; usahakan ±60 karakter atau kurang. Hitung dengan skrip.
- Format seri: `POV: Kamu <posisi "kamu"> <kisah singkat>`, misalnya "POV: Kamu Peladang di Malam Bendungan Sangkuriang". Kata "POV" dan posisi "kamu" tetap di awal.
- TikTok tidak memakai baris judul terpisah; fungsi judul diambil alih baris pembuka caption.
- Tawarkan 3 pilihan judul di chat saat menyerahkan 2B; yang terkuat dipakai di dokumen dan sisanya ditulis sebagai alternatif di bawah judul platform.

**Caption** (urutan isi)

1. **Baris pembuka** ±80 sampai 100 karakter atau kurang: hook atau pertanyaan, tidak mengulang judul kata per kata.
2. **Konteks** 1 sampai 3 kalimat: kisah apa, dari tradisi mana, siapa "kamu" di dalamnya, plus satu temuan terverifikasi.
3. **Ajakan komentar:** satu pertanyaan sesuai kolom Akhir, atau ajakan berbagi versi yang dikenal penonton di daerahnya.
4. **Penanda asal:** "Diceritakan dari <jenis dan tradisi>, mengikuti <versi acuan>. Sudut pandang "kamu" adalah tafsir Ulik Silam." Wajib di semua video. Untuk kisah makhluk: "Kisah rekaan Ulik Silam. <Makhluk> berasal dari kepercayaan rakyat <daerah>; ciri dan pantangannya mengikuti <sumber singkat>."
5. **Hashtag** di baris terakhir.

Panjang total caption ±300 sampai 600 karakter.

**Hashtag**

- 3 sampai 5 per platform, tanpa spasi: 1 tag merek (`#UlikSilam`), 1 tag genre (`#mitologi`, `#mitos`, `#legenda`, `#ceritarakyat`, atau untuk nada horor `#ceritahoror`), 1 sampai 2 tag topik spesifik, opsional `#pov`.
- Tag merek ditulis CamelCase; tag lain huruf kecil.
- Hindari tag yang tidak berkaitan (`#fyp`, `#foryou`, `#viral`) dan tag bernada SARA atau kekerasan.
- YouTube: hashtag ditaruh di akhir caption. Hingga tiga hashtag ditampilkan di dekat judul, jadi urutkan yang paling penting di depan.

**Format di dokumen** (sesuai kontrak)

````
### YouTube Shorts

**Judul:** POV: Kamu Peladang di Malam Bendungan Sangkuriang

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
- [ ] Setiap tokoh yang muncul di 3 adegan atau lebih punya lembar karakter berlabel benar, kecuali sosok yang sengaja digambarkan simbolis; semua rujukan nama cocok; lembar "kamu" memuat panel tangan.
- [ ] Pakem rupa satu dan konsisten; `### Catatan akurasi visual` terisi; motif parang dan unsur menyimpang tidak muncul serta masuk "Avoid ..." bila relevan.
- [ ] Penggambaran mematuhi `### Cek kesakralan`.
- [ ] Untuk nada horor dan kisah makhluk: makhluk sesuai pakem satu daerah, kejadian karangan tidak memakai orang atau tempat nyata sebagai pelaku, prompt tidak memuat darah atau luka dan memuat kalimat "Avoid ..." horor, caption memuat penanda kisah rekaan.
- [ ] Deskripsi tokoh baku dan tangan baku disalin persis (dicocokkan dengan skrip).
- [ ] Setiap tokoh di prompt punya gerak, ekspresi, dan arah pandang; kontak mata hanya di adegan yang menyengajanya; prompt berfiguran punya kalimat pembeda.
- [ ] Tidak ada kalimat tata letak zona di prompt.
- [ ] Setiap blok Style of Music memuat durasi target yang sama dengan tabel cue.
- [ ] Isi kolom Hindari tidak muncul di prompt, audio, judul, maupun caption.
- [ ] `### Narasi lengkap (ElevenLabs)` ada, satu blok per babak, identik dengan kolom Narasi (dicocokkan dengan skrip setelah `...` penutup paragraf diabaikan), dan jumlah karakter tercatat.
- [ ] `### Suara narator` memuat Model, Voice, Stability, dan arahan per babak; tag suara tidak ada di teks layar, kartu Ulikan, judul, caption, atau baris narasi di bagian prompt.
- [ ] Judul YouTube ≤ 100 karakter; baris pembuka caption ≤ ±100 karakter; 3 sampai 5 hashtag per platform; penanda asal ada di setiap caption.
- [ ] Kartu Ulikan terisi (Teks ≤ ±15 kata; Sumber memuat asal cerita); klaimnya terverifikasi.
- [ ] `Lapisan` memuat `Mitos` atau `Legenda`; `Latar` tanpa tahun.
- [ ] Dokumen lolos daftar periksa Kontrak KONSEP.md v1.3.

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
| Pemutakhiran kontrak | Konsep belum punya `Lapisan`, `Latar`, `## Kartu Ulikan`, `### Narasi lengkap (ElevenLabs)`, `### Peta versi`, `### Cek kesakralan`, atau penanda asal di caption | Baca konsep, lalu kerjakan R.2a; perubahan lain hanya bila Rafi memintanya |

Jika konsepnya tidak ada di percakapan, minta Rafi melampirkan `KONSEP.md` atau link dokumennya (satu pertanyaan). Jika ada dua versi yang berbeda, tanyakan mana yang terbaru; jangan menebak.

### R.2 Baca dan validasi

- Jalankan daftar periksa kontrak pada konsep yang ada (dengan skrip bila shell tersedia).
- Catat versi saat ini dari baris `Versi`; jika tidak ada, anggap `v1`.
- Jika konsep belum memenuhi kontrak v1.3, kerjakan R.2a, juga saat jalur masuknya revisi biasa.

### R.2a Pemutakhiran ke kontrak v1.3

Pemutakhiran menambah bagian yang belum ada tanpa mengubah narasi, prompt, atau audio yang sudah disetujui.

1. **Ringkasan konsep:** tambahkan atau perbaiki `Lapisan`, `Latar` (tanpa tahun), `Tradisi`, `Versi acuan`, dan `Kesakralan`.
2. **Catatan genre:** susun `### Peta versi`, `### Cek kesakralan`, dan `### Verifikasi sumber` dari isi konsep. Bila ditemukan pelanggaran pagar, laporkan dan usulkan perubahan lewat R.4.
3. **Lembar karakter:** ganti label lama `**0A · <Nama tokoh>**` menjadi `**Lembar karakter · <Nama tokoh>**`, dan sesuaikan rujukannya di prompt adegan.
4. **Kartu Ulikan dan caption:** tambahkan bila belum ada (2B.5, 2B.6), tawarkan 2 pilihan kartu, dan tunggu Rafi memilih.
5. **Durasi:** hitung ulang dengan tambahan ± 5 detik elemen merek. Jika lewat batas, usulkan pemangkasan; Rafi yang memilih.
6. **Suara dan narasi:** tambahkan baris `**Model:**`, `**Voice:**`, `**Stability:**` serta `### Narasi lengkap (ElevenLabs)`, disalin dari kolom Narasi apa adanya.
7. Naikkan `Versi` dan isi Riwayat revisi dengan "Pemutakhiran ke kontrak v1.3". Dampak ke produksi: tidak ada aset yang perlu dibuat ulang.

Jika jalurnya hanya pemutakhiran, lanjut langsung ke R.7 setelah Rafi memilih isi kartu Ulikan.

### R.3 Tentukan status produksi

Jika belum jelas dari jalur masuk, tanyakan sekali: "Produksinya sudah sampai mana: belum mulai, paket bahan sudah dibuat, atau aset (narasi/ilustrasi) sudah sebagian dibuat?" Laporan dari pov-produksi berarti produksi sudah berjalan.

### R.4 Petakan dampak

| Jenis perubahan | Bagian yang ikut diperbarui | Aset yang dibuat ulang bila sudah ada |
| --- | --- | --- |
| Narasi atau tag suara satu adegan | Naskah (Narasi, Waktu), paragraf adegan itu di `### Narasi lengkap (ElevenLabs)` beserta jumlah karakter babaknya, baris `Adegan <n> · Narasi` di prompt, hitungan kata dan durasi, Peta versi atau Verifikasi sumber bila isinya berubah | Rekaman babak yang memuat adegan itu, atau rekaman adegan itu saja sebagai pengganti |
| Arahan suara (voice, stability, arahan babak) | `### Suara narator` | Rekaman babak yang terdampak |
| Visual satu adegan | Kolom visual, prompt adegan, catatan akurasi visual | Ilustrasi adegan itu |
| Tambah, hapus, gabung, atau pindah adegan | Penomoran ulang di naskah, prompt, `### Narasi lengkap (ElevenLabs)`, tabel SFX (kolom Adegan), baris Adegan hening, rentang babak dan durasi target cue musik (tabel dan blok Style of Music), Waktu semua adegan sesudahnya, `Jumlah ilustrasi`, struktur alur, Peta versi | Tabel pemetaan nomor lama → baru agar file aset bisa diganti nama; rekaman dan ilustrasi adegan baru |
| Penampilan tokoh atau pakem rupa | Deskripsi tokoh baku, `### Catatan akurasi visual`, lembar karakter, semua prompt yang memuat tokoh itu | Lembar karakter dan ilustrasi yang memuat tokoh itu |
| Tangan atau pakaian "kamu" di bidikan A | Deskripsi tangan baku (dan variannya), panel tangan di lembar "kamu", semua prompt bidikan A yang memakai varian itu | Lembar "kamu" dan ilustrasi bidikan A yang terdampak |
| Unsur versi, tafsir, atau sisipan | Peta versi, lalu narasi, teks layar, prompt, kartu Ulikan, dan caption yang memakainya | Rekaman dan ilustrasi adegan yang terdampak |
| Tingkat kesakralan | `### Cek kesakralan`, lalu semua adegan dan prompt yang melanggar pagar baru | Rekaman dan ilustrasi adegan yang terdampak |
| Suasana atau batas babak | Tabel palet, cue musik (rentang babak, durasi target di tabel dan blok Style of Music) | Cue musik terkait |
| Judul, caption, atau hashtag | Bagian itu saja, plus pemeriksaan caption (2B.7) | - |
| Kartu Ulikan | Bagian itu, plus verifikasi isi barunya | - (dirender dari data) |
| Teks layar | Kolom Teks layar | - (dirender dari data) |

Kasus khusus dari pov-produksi:

- **Narasi berbeda dari rekaman:** pov-produksi hanya melaporkan perbedaannya. Bila rekamannya lebih baik dipertahankan, narasi di konsep disamakan dengan rekaman, tetapi periksa isinya terhadap Peta versi dan pagar; bila tidak, usulkan generate ulang adegan itu.
- **Durasi lewat batas:** usulkan adegan atau kalimat yang dipangkas, dimulai dari yang bukan momen wajib dan bukan hook; Rafi yang memilih.
- **Ilustrasi tidak bisa dibuat Gemini:** usulkan bidikan pengganti (dari belakang, siluet, orang pertama, benda simbolis) tanpa mengubah narasi.

**Bukan revisi lagi:** jika perubahan menyentuh posisi "kamu", versi acuan, makhluk atau pakemnya (kisah makhluk), latar, atau alur besar, atau lebih dari sepertiga adegan berubah, sampaikan bahwa ini lebih tepat dikerjakan sebagai konsep baru dari Tahap 1 atau Tahap 2A, dan tanyakan pilihan Rafi.

### R.5 Sampaikan rencana bila dampaknya ke produksi

- Produksi belum mulai dan perubahannya kecil: langsung kerjakan.
- Produksi sudah berjalan, atau perubahan memicu penomoran ulang, rekam ulang, atau ilustrasi ulang: tulis rencana singkat di chat dan tunggu Rafi setuju.
- Saat produksi sudah berjalan, utamakan mengubah isi adegan yang ada daripada menambah atau menghapus adegan.

### R.6 Kerjakan

- Ubah hanya bagian yang terdampak. Detail dari brief dan bagian yang tidak diminta berubah tetap utuh.
- Naikkan versi: baris `Versi` di Ringkasan konsep menjadi `v<n+1> · <tanggal>`.
- Tambahkan satu baris ke tabel `### Riwayat revisi` di bagian `## Alur produksi dan checklist`: `| Versi | Tanggal | Perubahan | Dampak ke produksi |`.
- Bila nomor adegan berubah, tulis atau ganti tabel `### Pemetaan nomor adegan` (`| Lama | Baru |`, satu baris per adegan lama, `-` untuk adegan yang dihapus atau baru) di bagian yang sama. Bila nomor tidak berubah, hapus tabel lama agar tidak terbaca lagi.

### R.7 Pemeriksaan dan titik berhenti

- [ ] Daftar periksa Kontrak KONSEP.md v1.3 dijalankan ulang untuk seluruh dokumen.
- [ ] Butir 2A.5 dijalankan untuk adegan yang narasinya berubah; butir 2B.7 untuk prompt, audio, kartu Ulikan, dan caption yang berubah.
- [ ] Jumlah kata dan perkiraan durasi masih sesuai tabel 2A.2.
- [ ] Baris `Versi` naik dan Riwayat revisi terisi.
- [ ] Bila ada penomoran ulang: `### Pemetaan nomor adegan` mencakup semua adegan lama; bila tidak, tabel lama sudah dihapus.

Serahkan:

1. `KONSEP.md` hasil ekspor ulang sebagai file.
2. Ringkasan perubahan: versi baru, adegan yang berubah, dan aset yang harus dibuat ulang, plus tabel pemetaan nomor bila ada.
3. Bila produksi sudah berjalan, prompt lanjutan untuk Rafi: "KONSEP.md diperbarui ke v<n>. Perbarui proyek dari KONSEP.md ini dengan skill pov-produksi (Tahap 5: Pembaruan konsep)."

**Berhenti dan tunggu.**

## Kontrak KONSEP.md v1.3

Format ini dibaca otomatis oleh skill pov-produksi dan harus identik dengan kontrak di skill itu. Konsep v1 tetap terbaca: bagian dan baris baru di v1.1, v1.2, dan v1.3 boleh tidak ada, dan label lama lembar karakter tetap diterima. Judul bagian `##` ditulis persis seperti di bawah dan berurutan. Bagian bertanda (opsional) boleh tidak ada. Skill ini selalu mengisi `Lapisan`, `Latar`, dan `## Kartu Ulikan`.

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
   - Adegan hening ditandai `**Momen hening**` di kolom visual; adegan epilog ditandai `**Epilog**`.
6. `## Prompt ilustrasi untuk Gemini` berisi:
   - `### Lembar karakter` dengan setiap lembar sebagai baris `**Lembar karakter · <Nama tokoh>**` diikuti satu blok kode prompt; nama tokoh unik dan ditulis persis sama di prompt adegan yang merujuknya (label lama `**0A · <Nama tokoh>**` dari kontrak v1 tetap diterima);
   - setiap adegan sebagai baris `**Adegan <n> · Narasi (<m:ss–m:ss>):** <narasi>` diikuti satu blok kode prompt; subjudul babak di antaranya boleh ada.
   - Setiap blok kode prompt diakhiri baris penutup dari bagian Gaya visual.
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

Daftar periksa kontrak: semua judul bagian wajib ada; jumlah baris naskah = jumlah prompt adegan = nomor adegan terbesar; setiap tabel memakai kolom persis; Slug terisi; baris Penutup prompt ada dan setiap prompt diakhiri isinya; setiap subjudul platform punya satu blok kode caption; `Lapisan` (bila ada) berisi satu atau dua nilai sah tanpa duplikat; nama tokoh di lembar karakter unik; `## Kartu Ulikan` (bila ada) memuat baris Teks dan Sumber; tag suara `[...]` hanya ada di kolom Narasi dan `### Narasi lengkap (ElevenLabs)` (tidak di Teks layar, kartu Ulikan, judul, atau caption); `### Narasi lengkap (ElevenLabs)` (bila ada) punya satu blok per babak dan isinya sama dengan kolom Narasi.