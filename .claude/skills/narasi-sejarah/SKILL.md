---
name: "narasi-sejarah"
description: "Gunakan saat Rafi ingin brainstorming, menyusun, atau merevisi konsep video narasi sejarah 9:16 Ulik Silam bernarator pencerita (orang ketiga, tanpa posisi \"kamu\"), satu kisah atau bersambung, sampai KONSEP.md. POV pakai pov-sejarah, daftar pakai daftar-sejarah, produksi pakai pov-produksi."
---

# Narasi Sejarah: dari ide sampai KONSEP.md

Skill ini menyusun video narasi sejarah untuk akun **Ulik Silam**: satu kisah nyata (tokoh, peristiwa, tempat, atau benda) yang dituturkan oleh **narator pencerita**. Bedanya dengan pov-sejarah: tidak ada posisi "kamu" sebagai tokoh. Bedanya dengan daftar-sejarah: bukan daftar entri, melainkan satu alur cerita dengan awal, ketegangan, puncak, dan akhir. Kisah yang terlalu besar untuk satu video boleh dipecah menjadi seri bersambung.

Prinsip suaranya: **gaya pencerita, disiplin dokumenter.** Narator bertutur hangat dan dramatis, seperti tukang cerita di depan pelita, tetapi setiap klaim tetap bersumber. Ketidakpastian dan perbedaan sumber tidak disembunyikan; keduanya dijadikan bagian cerita.

Tahapannya: Tahap 1 (ide dan brief), Tahap 2A (naskah dan verifikasi), Tahap 2B (visual, audio, kartu Ulikan, judul dan caption), lalu serah terima. Konsep yang sudah disetujui diubah lewat Tahap R.

Video ini memakai lapisan **Sejarah** (atau **Sejarah, Legenda** bila kisah tradisional ikut dominan). Tampilan video (label lapisan, subtitle, teks layar, kartu Ulikan, elemen merek) dipasang otomatis oleh pov-produksi; skill ini hanya menyediakan isinya.

Skill ini berhenti di dokumen konsep. Produksi dikerjakan skill **pov-produksi**, yang membaca KONSEP.md dalam format baku di bagian "Kontrak KONSEP.md v1.5". Format narasi memakai kontrak itu apa adanya: semua bidikan `B.`, tanpa posisi "kamu". pov-produksi tidak perlu diubah. Komunikasi dengan Rafi dalam Bahasa Indonesia; semua prompt untuk generator AI ditulis dalam bahasa Inggris.

## Cakupan

- **Termasuk:** kisah sejarah Indonesia maupun dunia yang punya alur: perjalanan hidup atau satu babak hidup seorang tokoh, satu peristiwa (perang, perjanjian, bencana, pemberontakan), riwayat sebuah tempat atau benda, atau perubahan sebuah kebiasaan. Satu video = satu kisah dengan satu benang merah.
- **Seri bersambung:** kisah panjang (misalnya riwayat sebuah kerajaan atau tokoh yang hidupnya penuh babak) boleh dipecah 2 sampai 4 part. Setiap part tetap punya alur utuh dan akhir yang terasa (1.3).
- **Batas dengan legenda:** tokoh tercatat sejarah yang kisahnya bercampur legenda boleh masuk; bagian dari kisah tradisional ditandai di narasi ("menurut Babad Tanah Jawi ...", "konon ...") dan di tabel verifikasi. Bila bagian itu banyak, pakai lapisan `Sejarah, Legenda`. Kisah yang intinya legenda atau mitos di luar cakupan (pakai pov-mitos-legenda).
- **Di luar cakupan:** video POV dengan posisi "kamu" (pov-sejarah), video daftar atau peringkat (daftar-sejarah), fiksi sejarah dan sejarah alternatif (pov-rekaan), mitos, legenda, dan kisah hantu (pov-mitos-legenda), serta produksi (pov-produksi). Jika diminta, sebutkan skill yang tepat; jika belum ada, tanyakan apakah Rafi tetap ingin dibantu tanpa skill ini.
- **Tokoh yang masih hidup:** hanya fakta publik yang terdokumentasi; narasi tidak menilai watak atau moralnya dan tidak menggambarkan kehidupan pribadinya.

## Aturan tetap

1. **Penutup prompt Gemini.** Setiap prompt ilustrasi untuk Gemini, tanpa kecuali (lembar karakter dan semua adegan), diakhiri dua baris ini, persis, setelah satu baris kosong:

   ```
   Style: detailed vector art
   Aspect ratio: 9:16
   ```

   Baris ini tetap ditambahkan walaupun isi prompt sudah menyebut gaya atau rasio. Gaya hanya diganti jika Rafi secara eksplisit meminta gaya lain; rasio tetap 9:16 kecuali Rafi meminta format lain. Penutup yang dipakai ditulis juga di bagian "Gaya visual" KONSEP.md.
2. **Penamaan gaya.** "Style:" selalu berarti baris penutup prompt Gemini. Untuk Suno, sebut "kolom Style of Music di Suno" (di sebagian versi aplikasi bernama "Styles").
3. **Verifikasi ketat.** Setiap klaim sejarah di narasi, teks layar, kartu Ulikan, judul, dan caption, serta setiap unsur sejarah di prompt (busana, arsitektur, senjata, kapal, benda, lanskap), wajib bersumber menurut aturan bukti di 2A.4: sumber dibuka langsung, mengikuti hierarki sumber, dan minimal dua sumber independen. Klaim yang tidak lolos tidak tampil sebagai fakta. Sumber, halaman, atau kutipan tidak pernah dikarang; bila tidak ditemukan, tulis "Tidak ditemukan".
4. **Dialog dan isi pikiran hanya yang terdokumentasi.** Kalimat tokoh nyata dalam tanda kutip hanya bila tercatat di sumber (surat, memoar, catatan sezaman, kesaksian), dan sumbernya dicatat di tabel verifikasi. Selain itu, narator menuturkannya sebagai parafrase tanpa tanda kutip. Isi pikiran dan perasaan tokoh nyata hanya dinyatakan bila ada sumbernya; bila tidak, narator boleh mengajukannya sebagai pertanyaan atau menyebut bahwa tidak ada yang mencatatnya (2A.2).
5. **Kadar dramatis mengikuti kepekaan topik.** Gaya pencerita tidak boleh mengeksploitasi korban. Kadar dramatis ditetapkan di brief (1.4) dan mengikat naskah, audio, dan visual.
6. **Berhenti di setiap akhir tahap.** Tahap 1, 2A, 2B, dan R masing-masing diakhiri pemeriksaan, penyerahan, lalu menunggu Rafi bilang lanjut.
7. **Durasi fleksibel 1 sampai 3 menit**, ditetapkan per video di brief, termasuk elemen merek Ulik Silam yang dipasang pov-produksi. Jumlah babak, adegan, dan kata diturunkan dari durasi (tabel di 2A.2).

## Alat dan cadangannya

Cek alat yang tersedia di awal sesi, diam-diam, lalu pakai cadangan bila perlu dan sebutkan dalam satu kalimat saat menyerahkan hasil.

| Kebutuhan | Alat utama | Cadangan bila tidak tersedia |
| --- | --- | --- |
| Dokumen konsep | Artifact tipe Docs (atau connector dokumen first-party) | File `KONSEP.md` yang dikirim ke Rafi |
| Diagram alur cerita | Diagram di dokumen Docs | Tabel babak (babak, fungsi dramatis, rentang waktu, adegan) |
| Bank ide | Dokumen `claude/bank-ide-pov.md` di Project lewat tool Projects | Bagian "Ide cadangan" di akhir dokumen konsep |
| Peta seri bersambung | Dokumen `claude/peta-seri-<slug-seri>.md` di Project | Subjudul `### Peta seri` di Catatan genre setiap part |
| Riset kisah, verifikasi fakta, riset busana | Web search dan fetch halaman, ditambah file/connector milik Rafi | Pengetahuan umum, setiap fakta dan unsur busana diberi label "perlu dicek" |
| Pemeriksaan silang fakta (2A.4a) | Subagen terpisah yang belum melihat tabel verifikasi (alat Agent) | Pemeriksaan ulang sendiri dengan pencarian baru dan kata kunci berbeda |
| Hitung kata, durasi, panjang judul | Skrip di shell | Hitung manual dan sebutkan bahwa hasilnya perkiraan |
| Membaca konsep lama atau part sebelumnya | Alat dokumen untuk link Docs, atau file `KONSEP.md` yang dilampirkan | Minta Rafi melampirkan `KONSEP.md` |
| Serah terima ke produksi | Ekspor dokumen ke `KONSEP.md` dan kirim sebagai file | Tulis `KONSEP.md` langsung dari isi dokumen |

## Tahap 1: Ide dan brief

Hasil tahap ini: brief yang disetujui Rafi, termasuk sudut cerita dan (bila bersambung) peta seri. Belum ada dokumen atau file.

### 1.1 Pilih pintu masuk

- Rafi baru punya tema kasar atau ingin brainstorming: lakukan 1.2.
- Rafi sudah memberi topik kisah (misalnya "kisah jatuhnya Plered"): langsung ke 1.3.
- Rafi sudah memberi sudut cerita dan detailnya: periksa sekilas di 1.3, lalu ke 1.4.
- Rafi ingin melanjutkan part berikutnya dari seri yang sudah ada: minta `KONSEP.md` part sebelumnya dan peta serinya bila tidak ada di percakapan, lalu ke 1.4.
- Rafi membawa `KONSEP.md` atau link dokumen konsep, meneruskan laporan dari pov-produksi, atau minta mengubah konsep yang sudah disetujui: langsung ke **Tahap R**.

### 1.2 Brainstorming (di chat)

Jawaban singkat dan mudah dipilih; jangan menulis naskah di sini.

1. **Sudut cerita.** Tawarkan 3 sampai 5 pilihan, masing-masing 2 sampai 3 baris: kisah apa, dari titik mana cerita dibuka, ketegangan utamanya, dan contoh kalimat hook. Usahakan sudutnya berbeda (misalnya satu malam yang menentukan, perjalanan hidup seorang tokoh, riwayat sebuah benda dari tangan ke tangan).
2. **Pendapat jujur.** Sebutkan pilihan terkuat untuk video pendek dan alasannya: kekuatan hook, apakah ketegangannya didukung sumber (bukan dramatisasi), cukup atau tidak bahan bersumber untuk dituturkan, variasi visual, muat atau tidak dalam durasi, dan kepekaan topik.
3. **Ide Rafi diutamakan.** Kembangkan dari idenya; Rafi boleh mencampur atau menolak semua pilihan.
4. **Ide cadangan.** Pilihan yang tidak terpakai disimpan ke bank ide dengan tanda jenis "narasi sejarah". Untuk dokumen Project: baca dulu (buat bila belum ada), lalu tulis ulang utuh dengan tambahan di akhir (tanggal, jenis, tema, ide satu baris). Sebelum menulis, pastikan isi baru tidak lebih pendek dari isi lama ditambah tambahannya.

### 1.3 Riset awal, sudut cerita, dan peta seri

Dikerjakan sebelum brief, karena alur cerita bergantung pada apa yang benar-benar tercatat.

1. **Riset kerangka kisah.** Dengan web search (halaman dibuka, bukan cuplikan), susun garis waktu singkat: 6 sampai 10 titik peristiwa, masing-masing satu baris dengan tanggal atau masa, pelaku, apa yang terjadi, dan satu sumber. Tandai titik yang diperdebatkan atau hanya berasal dari tradisi.
2. **Cari ketegangan yang nyata.** Tunjukkan 1 sampai 3 sumber ketegangan yang didukung sumber: keputusan sulit, pertaruhan, pengkhianatan, kontras antara rencana dan hasil, atau perbedaan versi babad dan arsip. Ketegangan yang hanya muncul dari dramatisasi tidak dipakai.
3. **Bahan pencerita.** Catat 2 sampai 4 detail konkret bersumber yang membuat kisah hidup (benda, angka, kalimat terdokumentasi, kebiasaan, cuaca atau peristiwa alam yang tercatat). Catat juga kutipan tokoh yang terdokumentasi beserta sumbernya, bila ada.
4. **Satu video atau bersambung.** Bila titik penting tidak muat dalam 3 menit tanpa dipadatkan berlebihan, usulkan seri:
   - 2 sampai 4 part, masing-masing dengan rentang waktu, pertanyaan dramatis, dan titik akhir. Titik akhir part adalah titik belok yang nyata di kisah, bukan cliffhanger palsu.
   - Setiap part harus bisa dinikmati sendiri: punya hook, puncak, dan akhir yang terasa.
   - Durasi part boleh berbeda sesuai bahan.
   - Bila Rafi setuju, peta seri ditulis ke dokumen Project `claude/peta-seri-<slug-seri>.md` (baca dulu bila sudah ada, tulis ulang utuh) dan disalin ke `### Peta seri` di setiap KONSEP part.
5. **Usulan durasi.** Usulkan durasi (1:00 sampai 3:00) menurut bahan: anekdot atau satu momen cukup 1:00 sampai 1:30; satu peristiwa utuh 2:00 sampai 3:00.

### 1.4 Susun brief

| Kolom | Isi | Default bila kosong |
| --- | --- | --- |
| Judul / topik | Inti kisah | Diturunkan dari topik |
| Sudut cerita | Dari titik mana cerita dibuka dan benang merahnya | Dari 1.3 |
| Seri | Tunggal, atau Part n dari N beserta rentang part ini | Tunggal |
| Tokoh utama | Tokoh atau pihak yang menjadi pusat cerita, dengan masa dan perannya | Dari 1.3 |
| Latar | Wilayah dan rentang era | Dari kisah |
| Momen wajib | Fakta atau peristiwa yang harus muncul | Titik kunci dari 1.3 |
| Kadar dramatis | Bebas, Terjaga, atau Tenang (tabel di bawah) | Ditentukan dari topik |
| Nada | Misalnya megah, tegang, getir, reflektif | Tegang di tengah, reflektif di akhir |
| Akhir | Renungan, fakta penutup, jejak hari ini, pertanyaan ke penonton, atau pengantar part berikutnya | Renungan singkat yang didukung sumber |
| Hindari | Hal yang tidak boleh muncul | - |
| Teknis | Durasi (1:00 sampai 3:00), platform, generator gambar/musik, alat perakit | Dari 1.3, TikTok + Shorts, Gemini, Suno, Remotion. Gaya dan rasio mengikuti Aturan tetap 1 |

**Kadar dramatis**

| Kadar | Untuk | Yang boleh | Yang tidak |
| --- | --- | --- | --- |
| Bebas | Kisah masa jauh: kerajaan, perang lama, penjelajahan, intrik istana | Suspense, ironi, tempo berubah-ubah, musik megah, SFX dramatis | Kekerasan grafis |
| Terjaga | Konflik dan kekerasan dengan korban yang jelas, masa kolonial, pembantaian, perbudakan | Ketegangan yang menahan diri, fokus pada manusia dan akibatnya | Suspense yang menjadikan penderitaan korban sebagai tontonan; detail kekerasan; SFX benturan |
| Tenang | Peristiwa yang korban atau keluarganya masih hidup, atau luka sosial yang masih terbuka (misalnya 1965, 1998, konflik daerah) | Tutur tenang dan dekat dengan dokumenter, ruang untuk kesaksian terdokumentasi, momen hening | Cliffhanger, ironi, musik tegang berlebihan, menyimpulkan pihak yang bersalah melebihi temuan resmi atau kajian |

Aturan brief:

- Detail dari Rafi mengikat: jangan diganti, dilunakkan, atau dipindah urutannya tanpa izin.
- Kolom kosong diisi default dan dicatat sebagai Asumsi.
- Bertanya hanya jika ada yang tidak bisa ditebak dan mengubah seluruh naskah. Maksimal satu pertanyaan.
- Momen wajib harus muat dalam durasi (tabel 2A.2). Bila terlalu banyak, usulkan memperpanjang durasi, mengurangi momen, atau memecah jadi seri; jangan mempercepat narasi.
- Bila kisah melintasi era yang jauh (misalnya masa muda dan masa tua tokoh berbeda tiga dekade), catat sejak awal karena busana dan latar tiap masa harus diriset terpisah.
- Untuk part 2 dan seterusnya: tokoh, lembar karakter, deskripsi baku, dan keluarga palet mengikuti part sebelumnya; perubahan penampilan karena waktu (usia, jabatan) dicatat.

Templat brief:

```
Judul: ...
Sudut cerita: ...
Seri: Tunggal / Part n dari N (rentang ...)
Tokoh utama: ...
Latar: ...
Momen wajib: ...
Kadar dramatis: Bebas / Terjaga / Tenang
Nada: ...
Akhir: ...
Hindari: ...
Teknis: durasi ..., generator ...
```

### 1.5 Pemeriksaan dan titik berhenti

- [ ] Semua kolom terisi, asumsi ditandai.
- [ ] Setiap momen wajib punya minimal satu sumber yang sudah dibuka; ketegangan utama didukung sumber.
- [ ] Momen wajib muat dalam durasi (tabel 2A.2), atau seri sudah diusulkan.
- [ ] Kadar dramatis ditetapkan dan sesuai kepekaan topik.
- [ ] Topik masuk cakupan (kisah sejarah, bukan POV, daftar, legenda, mitologi, atau fiksi).

Tulis brief (dan peta seri bila ada) di chat dan akhiri dengan "Lanjut ke naskah?". **Berhenti dan tunggu.**

## Tahap 2A: Naskah dan verifikasi

Hasil tahap ini: dokumen konsep berisi ringkasan, struktur, naskah adegan, dan verifikasi fakta yang disetujui Rafi.

### 2A.1 Buat dokumen

Buat dokumen berjudul "Konsep Video POV: <topik>" (artifact Docs, atau `KONSEP.md` bila tidak tersedia); untuk seri, tambahkan "(Part n)" di akhir topik. Kata "POV" di judul ini adalah penanda kontrak yang dibaca pov-produksi, bukan format videonya; jangan diganti. Semua judul bagian `##` dari Kontrak KONSEP.md v1.5 langsung dibuat dalam urutan kontrak, tetapi di tahap ini hanya bagian berikut yang diisi:

- **Ringkasan konsep:** tabel keputusan dengan baris wajib kontrak, dengan isi khusus format narasi:
  - `Slug`: `narasi-<topik>`, ditambah `-part-<n>` untuk seri (misalnya `narasi-jatuhnya-plered-part-1`).
  - `Posisi "kamu"`: `Tidak ada (format narasi, narator pencerita)`.
  - `Jumlah ilustrasi`: jumlah adegan + perkiraan lembar karakter (diperbarui di 2B).
  - `Lapisan`: `Sejarah` (atau `Sejarah, Legenda`).
  - `Latar`: wilayah tanpa tahun, misalnya `Mataram Islam` atau `Batavia, masa VOC`.
  - Baris tambahan: `Format` (`Narasi · pencerita` atau `Narasi · pencerita · Part n dari N`), `Kadar dramatis`, premis satu kalimat, Asumsi, dan "Dipilih karena ..." bila dari brainstorming.
- **Struktur alur:** diagram atau tabel babak dengan fungsi dramatis tiap babak, rentang waktu kisah, dan batas durasi.
- **Naskah adegan:** sesuai kontrak dan 2A.2.
- **Catatan genre:** subjudul `### Verifikasi fakta` (2A.4), `### Pemeriksaan silang` (2A.4a), dan untuk seri `### Peta seri`.
- **Sumber:** halaman yang benar-benar dibuka.

Bagian lain diberi tanda "Dikerjakan di Tahap 2B". `KONSEP.md` belum diekspor.

### 2A.2 Struktur dan aturan naskah

**Struktur babak**

Alur dasar pencerita, disesuaikan dengan durasi:

| Fungsi | Isi |
| --- | --- |
| Pembuka | Hook: kontras, pertanyaan, atau satu momen genting yang dibuka di tengah kejadian (in medias res), lalu janji cerita |
| Latar | Siapa, di mana, kapan, dan apa yang dipertaruhkan |
| Ketegangan | Rangkaian kejadian yang menaikkan taruhan; perbedaan versi sumber bisa menjadi bagian ini |
| Puncak | Momen penentu; biasanya tempat momen hening |
| Akhir | Akibat, nasib tokoh, renungan, jejak hari ini, atau pengantar part berikutnya |

Untuk durasi pendek, fungsi digabung: 1:00 memakai 3 babak (Pembuka, Ketegangan dan puncak, Akhir). Nama babak memakai judul cerita, bukan nama fungsi, misalnya `### Babak 3: Malam di Plered`. Babak akhir boleh berupa epilog masa kini bila naskah menulisnya jelas sebagai masa kini.

**Panjang dari durasi**

Narator pencerita memakai lebih banyak jeda daripada narator dokumenter, jadi kecepatan dihitung 120 sampai 130 kata per menit (kpm).

| Durasi maksimum | Target | Babak | Adegan | Kata narasi (batas, 120 sampai 130 kpm) |
| --- | --- | --- | --- | --- |
| 1:00 | ±0:55 | 3 | 5 sampai 6 | ±85 sampai 90 |
| 1:30 | ±1:25 | 4 | 8 sampai 9 | ±140 sampai 150 |
| 2:00 | ±1:55 | 4 sampai 5 | 10 sampai 12 | ±195 sampai 210 |
| 2:30 | ±2:20 | 5 | 13 sampai 15 | ±240 sampai 260 |
| 3:00 | ±2:50 | 5 sampai 6 | 15 sampai 18 | ±295 sampai 320 |

Angka di tabel memakai elemen merek ±5 detik (perhitungan lama yang masih memasukkan pembuka; kini 3,5 detik, jadi angka tabel sedikit lebih aman) dan satu adegan hening. pov-produksi menambahkan jeda 0,9 detik di setiap adegan dan 1,5 detik di setiap adegan hening, jadi untuk angka pasti:

```
kata maksimum = (target detik − M − 0,9 × jumlah adegan − 1,5 × jumlah adegan hening) × kpm / 60
```

dengan M = durasi elemen merek yang dipasang pov-produksi (saat ini 3,5 detik: kartu Ulikan saja, karena pembuka nyala tidak dipakai lagi sejak Oktober 2026) dan kpm 120 sampai 130; angka bawah adalah batas aman. Tag suara tidak dihitung sebagai kata, tetapi setiap tag bunyi (`[sighs]`, `[exhales]`) dan setiap elipsis diperkirakan menambah ± 0,5 detik. Hitung dengan skrip bila shell tersedia.

**Teknik pencerita**

- **Hook (maksimal 10 detik):** buka dengan satu detail konkret bersumber, kontras, atau momen genting, lalu tunda penjelasannya. Contoh: "[tense] Malam itu, keraton yang dibangun dengan tangan ribuan orang ... [whispers] ditinggalkan rajanya sendiri." Narator boleh menyapa penonton sebagai pendengar ("bayangkan ...", "kamu mungkin pernah mendengar ..."), tetapi tidak menaruh penonton di posisi tokoh.
- **Ketegangan dari urutan pengungkapan, bukan dari karangan.** Tahan informasi, ungkap bertahap, dan pakai pertanyaan retoris. Isyarat ke depan ("ia belum tahu, surat itu akan mengubah segalanya") hanya untuk hal yang benar terjadi menurut sumber.
- **Detail indrawi.** Detail yang tercatat (hujan pada hari itu, jumlah kapal, bau rempah di gudang VOC menurut catatan) boleh dituturkan sebagai fakta setelah diverifikasi. Detail yang tidak tercatat hanya boleh dibingkai jelas sebagai bayangan ("bayangkan ..."), harus masuk akal menurut riset latar, dan tidak memuat klaim spesifik (nama, angka, tindakan tokoh). Bayangan dicatat di tabel verifikasi dengan status Bayangan.
- **Dialog dan isi pikiran (Aturan tetap 4).** Kutipan terdokumentasi boleh dibacakan dengan nada berbeda dan ditandai di kolom Suara. Bila isi pikiran tidak tercatat, jadikan kekosongan arsip itu bagian cerita: "[curious] Apa yang ada di benaknya malam itu? [calm] Tak satu pun catatan menyimpannya."
- **Perbedaan sumber sebagai momen naratif:** "[serious] Babad menyebutnya kemenangan. [tense] Catatan VOC menulis cerita yang lain sama sekali."
- **Ritme:** kalimat lebih panjang di latar, kalimat pendek di puncak. Variasikan pembuka kalimat.
- **Sikap narator:** tidak menghakimi tokoh atau kelompok. Renungan di akhir boleh, asal tidak melampaui apa yang didukung sumber. Tokoh yang penilaiannya diperdebatkan diceritakan dari lebih dari satu sudut secara adil.
- **Kala dan adegan masa kini:** narasi masa lalu memakai kala yang konsisten. Adegan tentang kondisi sekarang ditulis jelas sebagai masa kini ("Hari ini, ...") dan diverifikasi ke sumber terbaru.
- **Kadar dramatis (1.4)** membatasi semua teknik di atas.
- **Penutup:** kalimat yang terasa sebagai akhir, sesuai kolom Akhir. Untuk part yang bukan terakhir: akhiri di titik belok nyata, lalu satu kalimat pengantar yang jujur tentang part berikutnya.
- **Rekap untuk part 2 dan seterusnya:** paling banyak satu kalimat (±5 detik) di hook, menyebut hanya fakta dari part sebelumnya.
- **Satu momen hening** di titik paling emosional (biasanya puncak), ditandai `**Momen hening**`.

**Teks layar**

- Adegan pertama babak latar membawa penanda tempat dan masa, misalnya `Plered · 1677`.
- Teks layar lain hanya untuk tahun, nama, atau angka yang membantu penonton mengikuti kisah; tidak mengulang narasi. Setiap teks layar ikut diverifikasi.
- Untuk seri, adegan pertama memuat penanda part, misalnya `Part 2 · Jatuhnya Plered`.

**Aturan lain**

- Narasi orang ketiga, kalimat pendek sampai sedang.
- Setiap adegan 8 sampai 12 detik.
- Superlatif ("terbesar", "pertama", "satu-satunya", "terlama") hanya dipakai bila terverifikasi; bila tidak, perhalus ("salah satu ...", "termasuk yang ...").
- Kolom `Bidikan dan visual` selalu diawali `B.` (tidak ada bidikan orang pertama di format ini), lalu deskripsi rinci ± 50 sampai 90 kata yang memuat tujuh unsur ini, berurutan dan dipisah titik koma:
  1. **Bidikan:** jenis bidikan dan sudut kamera. Variasikan antaradegan.
  2. **Tempat dan waktu:** lokasi bernama dan bagian ruangnya, tahun atau masa, waktu hari, dan cuaca.
  3. **Subjek utama dan aksinya:** siapa atau apa yang menjadi pusat, sedang melakukan apa pada satu momen.
  4. **Emosi:** ekspresi dan bahasa tubuh subjek utama, atau suasana bila tanpa tokoh.
  5. **Orang lain:** jumlah, peran, dan reaksi tokoh pendukung atau figuran.
  6. **Detail sejarah kunci:** arsitektur, properti, senjata, kendaraan, panji, atau tanda status yang mendukung narasi. Setiap detail ini wajib diverifikasi di 2B.1.
  7. **Lapisan dan cahaya:** isi latar depan, tengah, dan belakang; sumber dan arah cahaya; unsur yang bergerak (asap, debu, kain, air, api).

  Visual harus menggambarkan isi narasi adegan itu, bukan hiasan umum. Visual adalah rekonstruksi: detail yang tidak tercatat (ekspresi, cuaca bila tidak tercatat) boleh digambar sebagai Rekaan atau Tafsir di `### Catatan akurasi visual`, tetapi tidak boleh bertentangan dengan narasi dan sumber. Detail yang belum pasti ditulis netral ("pakaian prajurit sesuai riset") sampai diriset di 2B.1, jangan ditebak.

  Contoh struktur (isinya ilustrasi; semua detail tetap wajib diriset): `B. Sedang-lebar, sedikit dari bawah; alun-alun keraton Mataram, 1628, senja berangin dan berdebu; raja berdiri di tangga pendopo, tangan kanan terangkat memberi aba-aba berangkat; rahang mengeras, mata menatap ke barat; puluhan prajurit berbaris, beberapa menoleh ke arah raja, seorang perwira berkuda menunggu aba-aba; tombak, panji, dan payung kebesaran sesuai riset; latar depan barisan ujung tombak, tengah sang raja di tangga, belakang atap keraton dan langit jingga, cahaya matahari rendah dari kiri, debu tersapu angin.`
- **Variasi visual:** wajah tokoh utama tidak tampil di semua adegan. Selingi dengan peristiwa, bangunan, benda, lanskap, peta bergaya tanpa tulisan, kerumunan, atau tokoh dari belakang atau siluet. Sebagai patokan, wajah tokoh utama tampil di paling banyak separuh adegan.
- **Adegan tanpa tokoh utama** tetap butuh manusia di sebagian besar adegan (figuran sesuai era), agar tidak terasa seperti foto katalog.

### 2A.2a Tag suara (ElevenLabs v3)

Narasi dibacakan narator AI di ElevenLabs dengan model Eleven v3 dan digenerate Rafi per babak.

- **Satu tag emosi di awal setiap kalimat**, format `[emotion] kalimat. [emotion] kalimat.`
- Tag dari Eleven v3, dalam kurung siku, huruf kecil, bahasa Inggris. Yang sering dipakai pencerita: `[calm]`, `[serious]`, `[curious]`, `[tense]`, `[sad]`, `[excited]`, `[resigned]`, `[whispers]`. Dua tag boleh berurutan bila perlu (`[sad] [whispers]`).
- Pencerita lebih ekspresif daripada dokumenter: emosi boleh bergerak mengikuti alur (tenang di latar, tegang di ketegangan, berbisik atau sedih di puncak, tenang di akhir), tetapi perubahan tag tetap beralasan. Kadar dramatis Tenang memakai rentang emosi yang sempit (`[calm]`, `[serious]`, `[sad]`).
- Tag bunyi (`[sighs]`, `[exhales]`) paling banyak satu per adegan dan diperhitungkan dalam durasi.
- Jeda: elipsis `...` di dalam narasi. `...` penutup paragraf hanya ditambahkan di `### Narasi lengkap (ElevenLabs)`.
- Tag hanya di kolom Narasi dan `### Narasi lengkap (ElevenLabs)`; tidak di teks layar, kartu Ulikan, judul, caption, atau baris `**Adegan <n> · Narasi ...:**` di bagian prompt.

### 2A.3 Peta seri (khusus seri bersambung)

Di `## Catatan genre`, subjudul `### Peta seri`: tabel `| Part | Rentang kisah | Pertanyaan dramatis | Titik akhir | Status |`, disalin sama dari dokumen peta seri. Status: rencana, konsep, disetujui, produksi, tayang. Bila peta berubah, perbarui dokumen peta seri dan sebutkan part lain yang terdampak.

### 2A.4 Verifikasi fakta (ketat)

**Yang diverifikasi:** setiap klaim di narasi dan teks layar: nama dan ejaannya, gelar sesuai masanya, tanggal dan tahun, angka, tempat, urutan peristiwa, sebab-akibat, kutipan, isi pikiran tokoh, superlatif, dan detail indrawi yang dinyatakan sebagai fakta. Klaim tersirat juga dihitung; misalnya "akhirnya ia menyerah" menyiratkan urutan dan hasil peristiwa, dan isyarat ke depan menyiratkan apa yang kemudian terjadi. Pecah setiap kalimat narasi menjadi klaim-klaim tunggal dan beri nomor. Detail visual dan klaim di judul, caption, dan kartu Ulikan diverifikasi di 2B dengan aturan yang sama.

**Hierarki sumber**

| Tingkat | Jenis | Dipakai untuk |
| --- | --- | --- |
| A | Sumber primer atau edisinya: prasasti, naskah, arsip (misalnya catatan harian dan surat VOC), memoar, kesaksian tercatat, babad dan serat, lukisan, gambar, peta, dan foto sezaman | Bukti langsung, termasuk kutipan. Babad dan serat selalu ditandai sebagai versi tradisi |
| B | Kajian ilmiah: buku akademik dan artikel jurnal dengan penulis jelas | Tanggal, angka, penafsiran, dan konteks |
| C | Lembaga resmi: museum, arsip nasional, lembaga cagar budaya, komisi resmi, ensiklopedia bereditor | Konfirmasi dan fakta masa kini |
| D | Media populer, blog, video, media sosial, dan Wikipedia | Hanya petunjuk untuk menemukan sumber A sampai C; tidak dihitung sebagai sumber |

**Aturan bukti**

- Setiap klaim butuh minimal dua sumber independen dari tingkat A sampai C. Klaim kunci (tanggal, angka, tindakan tokoh, sebab-akibat utama, kutipan) butuh sedikitnya satu sumber tingkat A atau B. Kutipan butuh sumber primernya atau kajian yang mengutipnya dengan rujukan.
- Dua sumber tidak independen bila yang satu hanya menyalin atau mengutip yang lain.
- Sumber harus dibuka langsung; cuplikan hasil pencarian tidak dihitung. Catat judul, penulis atau lembaga, tahun terbit, halaman atau bagian bila ada, URL, dan tanggal akses.
- Untuk setiap klaim, tulis parafrase singkat dari bagian sumber yang mendukungnya, supaya Rafi bisa memeriksa ulang dengan cepat.
- Sumber, halaman, atau kutipan tidak pernah dikarang. Bila tidak ada, statusnya "Tidak ditemukan".

**Status dan akibatnya di naskah**

| Status | Arti | Boleh di narasi? |
| --- | --- | --- |
| Terverifikasi | ≥ 2 sumber independen tingkat A sampai C yang sepakat | Ya, sebagai fakta |
| Diperdebatkan | Sumber kredibel berbeda pendapat | Ya, dengan penanda ("diperkirakan ...", "menurut sebagian sejarawan ...") atau dijadikan momen naratif perbedaan sumber |
| Kisah tradisional | Hanya dari babad, serat, atau tradisi lisan | Ya, dengan penanda ("menurut Babad Tanah Jawi ...", "konon ...") |
| 1 sumber | Hanya satu sumber tingkat A sampai C | Hanya dengan penanda kehati-hatian; tidak boleh untuk klaim kunci |
| Bayangan | Detail indrawi yang tidak tercatat, dibingkai jelas sebagai bayangan narator | Ya, hanya dengan bingkai "bayangkan ..." atau sejenisnya, masuk akal menurut riset latar, tanpa nama, angka, atau tindakan tokoh |
| Diperbaiki | Versi populer keliru, diganti versi bersumber | Ya, versi yang sudah diperbaiki |
| Tidak ditemukan | Tidak ada sumber tingkat A sampai C | Tidak; hapus atau tulis ulang |

**Jebakan yang wajib dicek**

- **Dramatisasi yang menyusup:** kata sifat dan kata kerja yang menambah fakta ("dengan gemetar", "tanpa ragu", "diam-diam", "menangis") adalah klaim. Bila tidak bersumber, hapus atau ubah menjadi bayangan atau pertanyaan.
- **Isi pikiran dan motif tokoh:** "ia ingin membalas dendam" adalah klaim tafsir. Pakai hanya bila kajian menyebutnya, dengan penanda bila diperdebatkan.
- **Kutipan populer yang tidak terdokumentasi:** banyak "kata-kata terkenal" tokoh sejarah tidak punya sumber primer. Catat di tabel dengan adegan "(tidak dipakai)" bila sengaja dihindari.
- **Tahun dan tanggal** yang berbeda antarsumber (kalender Jawa dan Masehi, naik takhta versus penobatan): pilih yang paling didukung sumber A dan B, catat versi lain, dan pertimbangkan "sekitar" atau tidak menyebut tahun di layar.
- **Gelar dan nama sesuai masanya:** jangan menyebut gelar pada peristiwa sebelum tokoh menyandangnya.
- **Anakronisme istilah:** "Indonesia" untuk masa sebelum gerakan kebangsaan abad ke-20, "Belanda" untuk tindakan VOC sebagai kongsi dagang, atau "Jakarta" untuk Batavia masa VOC. Tulis nama tempat sesuai masanya; nama sekarang boleh disebut sebagai keterangan.
- **Sebab-akibat yang terlalu disederhanakan:** alur cerita mendorong satu sebab tunggal. Bila sumber menyebut banyak faktor, tulis sebagai salah satu faktor.
- **Jumlah korban dan pasukan:** sebut rentang bila sumber tidak sepakat.
- **Topik berkadar Tenang:** pernyataan tentang pelaku dan tanggung jawab tidak melampaui temuan resmi atau kajian; sebut sumber temuannya.
- **Fakta masa kini** dicek ke sumber terbaru dengan tanggal akses.

**Tabel verifikasi** di bawah `### Verifikasi fakta`:

`| # | Klaim | Adegan | Status | Sumber 1 (tingkat) | Sumber 2 (tingkat) | Bukti dari sumber | Catatan |`

Detail populer yang sengaja tidak dipakai dicatat dengan adegan "(tidak dipakai)" beserta alasannya.

**Tanpa web search:** naskah tidak diserahkan sebagai terverifikasi. Semua baris berstatus "Perlu dicek", hal ini disebut di awal penyerahan, dan Rafi disarankan melanjutkan verifikasi di sesi yang punya web search sebelum produksi.

### 2A.4a Pemeriksaan silang

Dikerjakan setelah tabel verifikasi selesai dan sebelum menyerahkan 2A.

1. Bila alat Agent tersedia, jalankan satu subagen terpisah. Berikan hanya naskah (narasi dan teks layar) dan daftar klaim bernomor, **tanpa** tabel verifikasi dan sumbernya. Tugasnya: mencari sumber sendiri untuk setiap klaim dengan hierarki dan aturan bukti di 2A.4, memberi status, dan melaporkan per nomor klaim mana yang tidak didukung, diperdebatkan, anakronistis, atau merupakan dramatisasi yang menambah fakta, beserta sumber yang ia buka.
2. Bandingkan laporan itu dengan tabel verifikasi. Setiap perbedaan diselidiki ulang dengan membuka sumbernya, lalu tabel dan naskah diperbaiki.
3. Bila alat Agent tidak tersedia, periksa ulang sendiri setiap klaim kunci dengan pencarian baru memakai kata kunci yang berbeda dari pencarian pertama.
4. Catat hasilnya di `### Pemeriksaan silang`: cara yang dipakai (subagen atau sendiri), jumlah klaim yang diperiksa, perbedaan yang ditemukan, dan keputusan untuk setiap perbedaan.

### 2A.5 Pemeriksaan dan titik berhenti

- [ ] Jumlah babak, adegan, dan kata sesuai tabel 2A.2 (dihitung dengan rumus) untuk durasi di brief.
- [ ] Alur memuat pembuka, latar, ketegangan, puncak, dan akhir (atau gabungannya untuk durasi pendek); hook ≤ 10 detik; akhir terasa sebagai akhir.
- [ ] Nomor adegan berurutan dari 1; tabel naskah memakai kolom persis kontrak; setiap adegan diawali `B.` dan punya visual dan narasi.
- [ ] Setiap kolom `Bidikan dan visual` memuat ketujuh unsur (2A.2), menggambarkan isi narasi adegannya, dan tidak menebak detail yang belum diriset; sudut kamera bervariasi antaradegan.
- [ ] Penonton tidak ditempatkan sebagai tokoh; sapaan ke penonton hanya sebagai pendengar.
- [ ] Tidak ada kutipan tokoh nyata tanpa sumber terdokumentasi; isi pikiran dan motif tokoh bersumber atau dibingkai sebagai pertanyaan; detail tak tercatat hanya berstatus Bayangan dengan bingkainya.
- [ ] Tidak ada kata sifat atau kata kerja dramatis yang menambah fakta tanpa sumber.
- [ ] Isyarat ke depan dan cliffhanger hanya merujuk hal yang benar terjadi; kadar dramatis dipatuhi di narasi dan tag.
- [ ] Wajah tokoh utama tampil di paling banyak separuh adegan; adegan masa kini ditulis jelas sebagai masa kini.
- [ ] Momen hening ditandai.
- [ ] Setiap klaim (termasuk klaim tersirat, superlatif, gelar, istilah, dan teks layar) ada di tabel verifikasi dengan dua sumber independen tingkat A sampai C dan bukti dari sumber; klaim kunci punya sumber tingkat A atau B; fakta masa kini bersumber terbaru dengan tanggal akses.
- [ ] Tidak ada klaim berstatus Tidak ditemukan di naskah; klaim Diperdebatkan, Kisah tradisional, 1 sumber, dan Bayangan memakai penanda di narasi; tidak ada klaim 1 sumber yang menjadi klaim kunci.
- [ ] Tidak ada anakronisme istilah, nama tempat, atau gelar.
- [ ] Pemeriksaan silang (2A.4a) sudah dijalankan, dicatat, dan semua perbedaannya diselesaikan.
- [ ] Untuk seri: penanda part ada di teks layar adegan 1, rekap ≤ 1 kalimat, `### Peta seri` terisi dan sama dengan dokumen peta seri.
- [ ] Setiap kalimat narasi diawali tag emosi; tag bunyi paling banyak satu per adegan.
- [ ] Bagian Sumber hanya berisi halaman yang benar-benar dibuka; isi kolom Hindari tidak muncul.
- [ ] Baris `Slug`, `Posisi "kamu"`, `Lapisan`, `Latar`, `Format`, dan `Kadar dramatis` terisi.

Serahkan dengan satu baris ringkasan (babak, adegan, kata, perkiraan durasi, jumlah klaim per status, dan hasil pemeriksaan silang), sebutkan cadangan alat yang dipakai (bila ada), lalu akhiri dengan "Lanjut ke visual, audio, dan caption?". **Berhenti dan tunggu.**

Perubahan dari Rafi selama 2A dikerjakan langsung di tahap ini, lalu 2A.5 dijalankan ulang.

## Tahap 2B: Visual, audio, kartu Ulikan, dan caption

Hasil tahap ini: dokumen konsep lengkap yang memenuhi Kontrak KONSEP.md v1.5, plus `KONSEP.md` untuk pov-produksi.

**Naskah dari 2A dikunci.** Bila ada adegan yang perlu diubah (misalnya sulit digambar), usulkan ke Rafi; jangan mengubah narasi diam-diam. Perubahan yang disetujui memicu 2A.5 untuk adegan itu.

### 2B.1 Riset tokoh, gaya visual, dan konsistensi

Isi `## Gaya visual dan konsistensi tokoh` dengan: tabel palet dan cahaya per babak (format kontrak), panduan bidikan 9:16, tabel pembeda antartokoh (bila ada beberapa tokoh berlembar), deskripsi tokoh baku, aturan figuran, baris `**Penutup prompt:**` dengan blok kodenya, dan templat prompt yang memuat Aturan tetap 1.

**Lembar karakter**

- Tokoh yang wajahnya tampil di 2 adegan atau lebih mendapat satu lembar karakter. Tokoh yang wajahnya hanya tampil di 1 adegan tidak perlu lembar; deskripsi tokoh bakunya ditulis lengkap di prompt adegan itu.
- Bila kisah melintasi masa yang jauh dan penampilan tokoh berubah nyata (usia, jabatan, busana), buat lembar terpisah per masa dengan nama berbeda, misalnya `**Lembar karakter · Sultan Agung (muda)**` dan `**Lembar karakter · Sultan Agung (tua)**`.
- Bangunan atau benda kunci yang tampil di 2 adegan atau lebih mendapat **lembar rujukan**. Labelnya tetap `**Lembar karakter · <Nama bangunan atau benda>**` agar pov-produksi bisa membacanya tanpa perubahan; namanya ditulis persis sama di semua prompt yang merujuknya.
- **Seri bersambung:** lembar karakter, lembar rujukan, dan deskripsi baku dari part sebelumnya disalin persis dengan nama yang sama, supaya Rafi bisa memakai ulang gambar lembar yang sudah ada. Lembar baru hanya untuk tokoh baru atau perubahan penampilan.

**Riset budaya dan pakaian**

Riset setiap tokoh berlembar karakter dan setiap kelompok figuran yang sering tampil, dengan aturan sumber 2A.4. Sumber yang paling berguna: arca, relief, naskah bergambar, lukisan dan gambar sezaman, foto lama, koleksi museum, kajian tekstil. Untuk tokoh nyata, deskripsikan dari atribut terdokumentasi (potret, lukisan, foto) yang ditemukan saat riset, bukan dari ingatan; jika tidak ada potret, nyatakan wajahnya rekaan. Sesuaikan dengan era, tempat, budaya, dan status:

- **Tubuh dan wajah:** warna kulit, bentuk wajah, rambut dan tatanannya, tanda khas budaya bila tercatat.
- **Pakaian lapis demi lapis, dari kepala sampai kaki:** penutup kepala, badan atas, kain bawah dan cara memakainya, ikat pinggang atau selendang, alas kaki.
- **Bahan, teknik, warna, dan motif kain** yang tersedia di masa itu.
- **Perhiasan, senjata, dan benda bawaan** sesuai status.
- **Penanda status:** apa yang membedakan raja, bangsawan, abdi, prajurit, pendeta, rakyat, dan orang asing.

**Cek anakronisme.** Setiap unsur pakaian dan benda diperiksa: sudah ada di era dan tempat itu atau belum. Generator cenderung memakai unsur "tradisional" yang populer hari ini, jadi:

- Nama motif atau busana lokal ditulis bersama penjelasan bentuknya dalam bahasa Inggris (misalnya "kawung: repeating grid of four overlapping oval petals").
- Unsur populer yang anakronistis dimasukkan ke kalimat "Avoid ...".
- Motif batik parang tidak dipakai di prompt mana pun; batik lain boleh bila sesuai era dan bersumber.
- Contoh lain: beskap dan blangkon bentuk modern perlu dicek dulu sebelum dipakai untuk tokoh abad ke-17.

**Referensi visual.** Catat 1 sampai 3 referensi per tokoh (link halaman museum, Wikimedia Commons, arsip foto, jurnal) beserta unsur yang diambil. Bila gambarnya domain publik atau boleh dipakai, sarankan Rafi mengunggahnya ke Gemini bersama prompt lembar karakter, dengan kalimat pembatas, misalnya "Use the uploaded painting only as a reference for the headdress and jewelry, not for the pose or art style."

**Riset latar dan properti per adegan.** Setiap adegan diriset, bukan hanya tokohnya: arsitektur, perabot, senjata dan perlengkapan perang, kapal dan kendaraan, bendera dan panji, alat tulis, wadah, hewan, tanaman, dan lanskap. Mulailah dari detail kunci di kolom `Bidikan dan visual`, lalu lengkapi unsur lain yang akan muncul di prompt. Detail yang ditetapkan di sini ditulis kembali di kolom visual adegan itu bila sebelumnya masih netral.

**Catatan akurasi visual.** Hasil riset ditulis di `## Catatan genre` di bawah `### Catatan akurasi visual`, dengan tabel `| Adegan | Tokoh atau benda | Unsur | Pilihan di prompt | Dasar dan sumber (tingkat) | Status |`. Unsur tokoh berlembar karakter dicatat sekali dengan adegan `Lembar`; unsur latar dan properti dicatat per adegan. Status:

- **Terverifikasi:** ada sumber untuk era dan tempat itu.
- **Tafsir:** diturunkan dari sumber era atau wilayah terdekat; sumber terdekat itu disebut.
- **Rekaan:** tidak ada sumber, misalnya wajah tokoh tanpa potret atau rincian figuran; hanya untuk unsur yang tidak diklaim di narasi.
- **Dihindari:** unsur populer yang anakronistis, beserta alasannya.

Unsur yang tidak bisa diberi status Terverifikasi atau Tafsir dibuat netral (misalnya "plain dark cloth" alih-alih motif tertentu) atau dikeluarkan dari bingkai.

**Deskripsi tokoh baku**

Satu paragraf bahasa Inggris per tokoh berlembar karakter (atau per tokoh yang tampil sekali), ± 80 sampai 150 kata, urutan tetap:

1. Identitas: nama, usia pada masa yang digambarkan, budaya atau wilayah, status.
2. Tubuh dan wajah: perawakan, kulit, bentuk wajah, mata, alis, hidung, bibir, tanda khas, rambut.
3. Pakaian dari kepala sampai kaki: bahan atau teknik, warna, motif (dijelaskan bentuknya), cara memakai.
4. Perhiasan, senjata, dan benda khas.
5. Sikap tubuh khas yang menggambarkan wataknya, bukan pose tetap.

Deskripsi ini disalin persis ke prompt lembar karakter. Di prompt adegan, kalimat "Same character ..." yang membawa penampilannya; deskripsi adegan cukup menyebut perubahan khusus adegan itu.

**Pembeda antartokoh**

Bila ada dua tokoh berlembar atau lebih dari budaya dan status yang mirip (misalnya dua pangeran Jawa yang bersaing), tulis tabel `| Tokoh | Usia digambarkan | Perawakan dan wajah | Busana dan warna dominan | Benda khas |` dengan setiap baris berbeda jelas dan tetap sesuai riset. Pihak yang berlawanan juga dibedakan lewat warna dominan, agar penonton langsung mengenali pihaknya. Di prompt adegan yang memuat keduanya, tambahkan kalimat pembeda.

**Bangunan, benda, dokumen, dan peristiwa**

- **Lembar rujukan bangunan atau benda.** Isi prompt: "Reference sheet of <Nama>.", deskripsi baku (bentuk dan denah kasar, bahan, warna, ornamen, kondisi pada era yang digambarkan, ukuran relatif terhadap orang), tampak depan, samping, dan atas tiga perempat, satu panel detail bahan atau ornamen, satu figur manusia kecil sebagai skala, latar polos terang, kalimat gaya, "historically accurate ...", kalimat "Avoid ...", satu baris kosong, lalu dua baris Aturan tetap 1. Prompt adegan merujuknya dengan "Same building as the <Nama> reference image." atau "Same object as the <Nama> reference image.".
- **Dulu dan sekarang.** Adegan masa lalu digambar sebagai rekonstruksi era itu, utuh dan dipakai, dengan elemen modern dimasukkan ke "Avoid ..." (misalnya "power lines, cars, asphalt roads, modern signage, tourists"). Hanya adegan yang di naskah ditulis sebagai masa kini boleh berlatar sekarang; adegan itu tetap bergaya vector art yang sama dan menampilkan kondisi seperti hasil riset.
- **Dokumen dan surat.** Gemini tidak bisa menulis aksara atau teks dengan benar. Gambarkan tangan, alat tulis sesuai era, stempel, lilin, meja, dan wajah-wajah yang tegang. Lembaran ditulis "sheets covered in illegible faint script" atau dilihat dari samping, dan "readable text, letters, words" masuk ke "Avoid ...". Nama dokumen dan tahun dibawa teks layar.
- **Peristiwa dan pertempuran.** Utamakan kerumunan dan figuran yang beragam, gerak massa, asap, debu, dan cahaya. Pihak yang berlawanan dibedakan jelas lewat pakaian dan senjata hasil riset. Tidak ada kekerasan grafis: tampilkan ketegangan, momen sebelum atau sesudah benturan, atau siluet. Kadar Terjaga dan Tenang lebih menahan diri lagi: akibat dan kehilangan ditampilkan lewat benda yang ditinggalkan, ruang kosong, atau orang yang menunggu, bukan lewat tubuh korban.

**Figuran**

Figuran adalah orang yang tampil tanpa lembar karakter. Agar Gemini tidak menyalin tokoh utama ke mereka:

- Setiap figuran atau kelompok diberi ciri pembeda (usia, perawakan, wajah, rambut, pakaian sesuai status) dengan warna dan aksesori berbeda dari tokoh utama. Unsur khas tokoh utama tidak dipakai figuran.
- Figuran dalam satu kelompok juga beragam, tidak seragam seperti salinan.
- Tambahkan kalimat pembeda, misalnya "The courtiers are different people from Sultan Agung: older, plainer headcloths and no jewelry.", dan masukkan "background figures copying <Nama tokoh>'s face or outfit, identical faces" ke kalimat "Avoid ...".

**Arah pandang, ekspresi, dan gerak**

- Setiap tokoh diberi arah pandang ke sesuatu di dalam adegan; tidak ada yang menatap kamera kecuali disengaja dan tertulis di kolom visual. Bila tidak disengaja, tulis "characters looking at the camera" di kalimat "Avoid ...".
- Ekspresi spesifik dari narasi dan tag emosi adegan: alis, mata, mulut, rahang, bahasa tubuh. Hindari kata umum tanpa rincian seperti "serious expression".
- Gerak dinamis: kata kerja aksi pada satu momen, berat badan bertumpu pada satu sisi, kain, asap, atau api yang ikut bergerak. Variasikan sudut kamera antaradegan. Masukkan "stiff symmetrical poses, characters standing straight and facing forward" ke kalimat "Avoid ...".

**Peta dan tulisan**

Generator gambar tidak bisa membuat peta akurat atau tulisan yang benar. Bila adegan membutuhkan wilayah, pakai "stylized antique map without any text or labels" dengan bentuk pulau yang umum, atau ganti dengan perjalanan melintasi lanskap. Nama tempat dan angka dibawa narasi atau teks layar, bukan gambar. Masukkan "text, labels, letters" ke kalimat "Avoid ...".

**Panduan bidikan 9:16**

Video tampil di kanvas 1080 × 1920: teks layar di sepertiga atas, subtitle dan antarmuka aplikasi di ± 32% terbawah, tombol di tepi kanan ± 17%, label lapisan di kiri atas, dan Ken Burns memperbesar hingga 114%. Zona ini dijaga lewat pilihan bidikan, bukan lewat kalimat tata letak di prompt:

- Utamakan bidikan sedang atau sedang-lebar dengan wajah di sekitar tengah dan ruang di atas kepala.
- Adegan yang punya teks layar diberi isi yang wajar memberi ruang di bagian atas (langit, atap, dinding, kegelapan), ditulis sebagai isi adegan.
- Prompt tidak memuat kalimat tata letak zona seperti "open space in the top third"; cukup jenis bidikan dan sudut kamera.

**Palet dan cahaya**

Palet mengikuti identitas Ulik Silam "Pelita & Bayang": dasar gelap, warna tanah hangat, bayangan dalam, dan sumber cahaya hangat seperti pelita. Hindari neon atau dingin jenuh. Palet bergerak mengikuti alur: latar lebih terang dan tenang, ketegangan lebih kontras, puncak paling gelap dengan satu sumber cahaya, akhir kembali hangat dan redup. Untuk seri, keluarga palet sama di semua part.

### 2B.2 Prompt ilustrasi

- Lembar karakter berlabel `**Lembar karakter · <Nama tokoh>**`, nama persis sama di semua prompt yang merujuknya.
- Isi prompt lembar karakter: "Character reference sheet of <Nama tokoh>.", deskripsi tokoh baku (persis), tampak depan, samping, dan belakang seluruh badan dalam sikap santai, satu potret wajah tiga perempat, satu panel detail motif kain dan perhiasan, latar polos terang, "Detailed vector art illustration, clean crisp outlines, flat colors with subtle shading", "historically accurate ..." dengan rincian dari riset, kalimat referensi visual bila ada, kalimat "Avoid ..." (anakronisme, teks, label, watermark), satu baris kosong, lalu dua baris Aturan tetap 1.
- Urutan isi setiap prompt adegan:
  1. "Same character as the <Nama tokoh> reference image." untuk setiap tokoh berlembar karakter yang tampil, dan "Same building as the <Nama> reference image." atau "Same object as the <Nama> reference image." untuk setiap bangunan atau benda berlembar rujukan; untuk tokoh yang tampil sekali, deskripsi tokoh bakunya.
  2. Bidikan dan sudut kamera, tempat bernama dan bagian ruangnya, masa, waktu hari, cuaca, dan suasana.
  3. Komposisi berlapis: isi latar depan, tengah, dan belakang.
  4. Untuk setiap tokoh: aksi pada satu momen, ekspresi rinci (alis, mata, mulut, rahang), bahasa tubuh, dan arah pandang.
  5. Figuran: jumlah, peran, keragaman, reaksi, dan kalimat pembedanya.
  6. Detail sejarah dari `### Catatan akurasi visual`, ditulis dengan bentuk, bahan, dan warnanya, bukan hanya namanya.
  7. Cahaya: sumber, arah, dan warna, plus unsur yang bergerak.
  8. "Detailed vector art illustration, clean crisp outlines, flat colors with subtle shading".
  9. Palet babak.
  10. "historically accurate ..." dengan rincian era, tempat, pakaian, dan arsitektur dari riset.
  11. Kalimat "Avoid ...": isi kolom Hindari, unsur berstatus Dihindari, dan yang relevan dari 2B.1, ditambah "extra or malformed hands and fingers, text, watermarks".
  12. Satu baris kosong, lalu dua baris Aturan tetap 1.
- Setiap unsur di kolom `Bidikan dan visual` adegan itu harus muncul di prompt. Panjang prompt adegan ± 120 sampai 220 kata di luar baris penutup; prompt yang jauh lebih pendek biasanya berarti ada unsur yang hilang.
- Cara pakai untuk Rafi: buat lembar karakter dulu (simpan dengan nama tokohnya), lalu unggah lembar tokoh yang tampil di setiap adegan. Kerjakan satu babak per percakapan Gemini bila tokohnya banyak, dan minta ubah ke 9:16 bila hasilnya tidak vertikal.
- Perbarui baris `Jumlah ilustrasi` (adegan + lembar karakter baru; lembar yang dipakai ulang dari part sebelumnya disebut terpisah).

Contoh prompt adegan:

```
Same character as the Sultan Agung reference image.
Medium-wide shot from a slightly low angle, a palace courtyard at dusk with a tall dark roofline against an amber sky. Sultan Agung strides down the pendopo steps, one hand on the hilt of his keris, the other raised to halt the kneeling commanders; brows drawn low, jaw set, eyes fixed on the distant western horizon. Three commanders, weathered men of different ages in plain dark cloth and simple headcloths, kneel on the stone with heads bowed, one glancing up uneasily. The commanders are different people from Sultan Agung, with no gold jewelry. Torch flames lean in the evening wind. Foreground: the edge of the stone steps and a torch stand; middle ground: Sultan Agung and the commanders; background: the dark roof of the pendopo against the amber sky.
Detailed vector art illustration, clean crisp outlines, flat colors with subtle shading, warm earthy palette of copper, deep brown and torch gold with deep shadows, historically accurate early 17th-century Javanese court of Mataram.
Avoid characters looking at the camera, stiff symmetrical poses, background figures copying Sultan Agung's face or outfit, parang batik motif, extra or malformed hands and fingers, text, watermarks.

Style: detailed vector art
Aspect ratio: 9:16
```

Isi contoh ini (busana, arsitektur, pakaian figuran) tetap harus diriset ulang untuk setiap video; jangan disalin sebagai fakta.

### 2B.3 Suara narator dan musik

**Suara narator (ElevenLabs)**

- `### Suara narator` berisi `**Model:** Eleven v3`, `**Voice:**` (pilihan Rafi; `-` bila belum dipilih), dan `**Stability:**` (default `Creative` untuk kadar Bebas karena pencerita butuh ekspresi, `Natural` untuk Terjaga dan Tenang; `Robust` kurang menanggapi tag).
- Sarankan voice pencerita: hangat, bertekstur, mampu berbisik dan menegang, tidak terlalu teatrikal. Untuk seri, voice sama di semua part.
- Arahan per babak dalam satu baris, misalnya "Babak 4 (puncak): tempo melambat, berbisik di dua kalimat terakhir".

**Narasi lengkap (ElevenLabs)**

`### Narasi lengkap (ElevenLabs)`: seluruh narasi dengan tag, satu babak sekali generate.

- Tiap babak: baris `**Babak <n>: <nama>**`, lalu satu blok kode.
- Di dalam blok: satu paragraf per adegan, urut, dipisah satu baris kosong, format `[emotion] kalimat.`, setiap paragraf diakhiri `...` (tidak ditambah bila sudah berakhir elipsis).
- Isinya disalin dari kolom Narasi, identik. Ubah di kolom Narasi dulu bila ada perubahan tag.
- Tulis `Karakter: <n>` di bawah setiap blok (dihitung skrip).

**Musik (Suno)**

- Jumlah cue mengikuti durasi: 1:00 sampai 1:30 memakai 1 sampai 2 cue; 2:00 sampai 3:00 memakai 2 sampai 3 cue. Batas cue selalu di batas babak, idealnya di titik perubahan dramatis (masuk ketegangan, sesudah puncak).
- Tabel cue: Cue | Babak | Durasi target | Suasana (format kontrak). **Durasi target** = jumlah durasi babak dalam rentang cue ditambah ± 5 detik untuk crossfade, dibulatkan ke atas ke kelipatan 5 detik, ditulis `m:ss`. Hitung dengan skrip.
- Isi kolom Style of Music: genre dan instrumen khas latar, suasana, perkembangan ("starts sparse ... builds ... fades ..."), durasi target dalam detik dan `m:ss` yang sama dengan tabel, BPM, "no vocals". Pengaturan: Custom, Instrumental, Exclude Styles untuk instrumen yang tidak diinginkan.
- Kadar Tenang: musik minimal dan rendah, tanpa perkusi tegang.
- Suno belum tentu menepati durasi. Cue terlalu pendek di-Extend (pov-produksi juga mengulang cue); terlalu panjang dipotong atau dipudarkan.
- Tips: 2 sampai 4 variasi per cue, crossfade 1 sampai 2 detik, cek lisensi paket Suno sebelum monetisasi.

### 2B.4 Efek suara

- Claude tidak bisa membuat SFX organik yang akurat; katakan terus terang bila ditanya.
- Tabel: # | Adegan | Bunyi | Kata kunci pustaka | Prompt generator AI (format kontrak). Pustaka: CapCut, Pixabay, YouTube Audio Library, Freesound CC0; generator: misalnya ElevenLabs Sound Effects.
- SFX menguatkan suasana (angin, ombak, gamelan jauh, langkah, pintu) dan tidak menenggelamkan narasi. Kadar Terjaga dan Tenang tidak memakai bunyi benturan, tembakan, atau jeritan.
- Tandai bunyi yang sulit dan beri cadangan.
- Isi baris `**Adegan hening:**` sesuai penanda Momen hening di naskah.

### 2B.5 Kartu Ulikan

Tampil 3,5 detik langsung setelah adegan terakhir dan meninggalkan satu hal untuk diulik lebih jauh.

- Isi **satu** fakta atau satu pertanyaan, maksimal ±15 kata dan idealnya 10 sampai 12 kata (hitung dengan skrip), dalam Bahasa Indonesia.
- Pilihan yang kuat untuk format narasi: fakta yang tidak sempat dituturkan tetapi menyambung kisah, jejak kisah yang masih bisa dikunjungi hari ini, perbedaan versi sumber, atau pertanyaan yang mengajak renungan. Jangan mengulang narasi.
- Untuk part yang bukan terakhir: boleh pertanyaan pengantar part berikutnya yang jujur, misalnya "Ke mana sang raja pergi setelah Plered jatuh?".
- Fakta wajib terverifikasi dan dicatat di tabel verifikasi dengan adegan "(kartu Ulikan)". Fakta masa kini diverifikasi ke sumber terbaru. `Sumber` diisi singkat; untuk pertanyaan boleh `-`.
- Tawarkan 2 pilihan saat menyerahkan 2B (satu fakta, satu pertanyaan); yang terkuat ditulis di dokumen.

Format (sesuai kontrak):

```
## Kartu Ulikan

**Teks:** <satu fakta atau pertanyaan>

**Sumber:** <sumber singkat, atau - untuk pertanyaan>
```

### 2B.6 Judul, caption, dan hashtag

Satu subjudul per platform (`### TikTok`, `### YouTube Shorts`, atau lainnya di brief), dalam Bahasa Indonesia.

**Prinsip umum**

- Judul dan caption hanya menjanjikan apa yang ada di video; tidak ada klaim sensasional yang tidak didukung naskah.
- Setiap fakta di judul dan caption sudah ada di tabel verifikasi; fakta baru dicatat dengan adegan "(caption)".
- Tidak memuat kutipan yang tidak terdokumentasi, isi kolom Hindari, atau kata yang menghakimi tokoh dan kelompok.
- Kadar Tenang: judul dan caption tanpa nada sensasional atau teka-teki tentang penderitaan korban.

**Judul**

- Judul bergaya cerita: memancing rasa ingin tahu dengan fakta yang benar, misalnya "Malam Ketika Raja Mataram Meninggalkan Keratonnya" atau "Surat yang Menjatuhkan Plered". Untuk seri, tambahkan "(Part n)" di akhir.
- YouTube Shorts memakai judul terpisah: batas 100 karakter; usahakan ±60 karakter atau kurang. Hitung dengan skrip.
- TikTok tidak memakai baris judul terpisah; baris pembuka caption mengambil fungsi judul.
- Tawarkan 3 pilihan judul saat menyerahkan 2B; yang terkuat dipakai, sisanya ditulis sebagai alternatif.

**Caption** (urutan isi)

1. **Baris pembuka** ±80 sampai 100 karakter atau kurang: hook atau pertanyaan, tidak mengulang judul kata per kata.
2. **Konteks** 1 sampai 3 kalimat: siapa, di mana, kapan.
3. **Ajakan komentar:** satu pertanyaan yang mengajak penonton berpendapat atau berbagi cerita.
4. **Penanda:** "Dituturkan ulang dari sumber sejarah; ilustrasi adalah rekonstruksi. Sumber utama: <1 sampai 2 sumber singkat>." Bila ada bagian kisah tradisional, tambahkan "Sebagian kisah bersumber dari <nama kisah>." Untuk seri, tambahkan "Part n dari N."
5. **Hashtag** di baris terakhir.

Panjang total ±300 sampai 600 karakter.

**Hashtag**

- 3 sampai 5 per platform, tanpa spasi: 1 tag merek (`#UlikSilam`, CamelCase), 1 tag genre (`#sejarah`, `#sejarahindonesia`, atau `#history`), 1 sampai 2 tag topik (kerajaan, tokoh, atau peristiwa), opsional 1 tag format (misalnya `#ceritasejarah`). Tag selain merek huruf kecil.
- Tidak memakai `#pov` (format ini bukan POV). Hindari `#fyp`, `#foryou`, `#viral`, tag yang tidak relevan, dan tag bernada SARA atau kekerasan.
- YouTube: hashtag di akhir caption; hingga tiga tampil di dekat judul, jadi yang terpenting di depan.

**Format di dokumen** (sesuai kontrak)

````
### YouTube Shorts

**Judul:** Malam Ketika Raja Mataram Meninggalkan Keratonnya

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

- [ ] Naskah tidak berubah sejak disetujui di 2A, atau setiap perubahan sudah disetujui dan diperiksa ulang dengan 2A.5.
- [ ] Setiap adegan punya visual, narasi, dan prompt Gemini; jumlahnya sama di semua bagian.
- [ ] Setiap prompt (termasuk lembar karakter) diakhiri "Style: detailed vector art" dan "Aspect ratio: 9:16".
- [ ] Setiap tokoh yang wajahnya tampil di 2 adegan atau lebih punya lembar karakter berlabel `**Lembar karakter · <Nama tokoh>**`; setiap rujukan "Same character as the <Nama tokoh> reference image." merujuk nama yang ada; tokoh yang tampil sekali punya deskripsi baku lengkap di promptnya.
- [ ] Setiap bangunan atau benda kunci yang tampil di 2 adegan atau lebih punya lembar rujukan dengan figur skala; setiap "Same building/object as the <Nama> reference image." merujuk nama yang ada.
- [ ] Untuk seri: lembar dan deskripsi baku dari part sebelumnya disalin persis dengan nama yang sama.
- [ ] Busana dan bangunan diriset untuk eranya sendiri dan tercatat di `### Catatan akurasi visual`; tidak ada unsur anakronistis; tidak ada motif parang.
- [ ] Adegan masa lalu tidak memuat elemen modern; adegan dokumen tidak meminta teks terbaca; tidak ada kekerasan grafis, dan kadar Terjaga atau Tenang dipatuhi di visual dan SFX.
- [ ] Setiap prompt adegan memuat semua unsur kolom `Bidikan dan visual`, komposisi berlapis, dan cahaya; panjangnya ± 120 sampai 220 kata (dihitung skrip).
- [ ] Setiap unsur sejarah di prompt tercatat di `### Catatan akurasi visual` dengan adegan, sumber bertingkat, dan status; unsur tanpa sumber sudah dibuat netral.
- [ ] Deskripsi tokoh baku disalin persis ke prompt lembar karakternya (dicocokkan dengan skrip).
- [ ] Setiap tokoh di prompt punya gerak, ekspresi, dan arah pandang; tatapan ke kamera hanya di adegan yang menyengajanya.
- [ ] Setiap prompt dengan figuran punya kalimat pembeda; tidak ada peta bertulisan dan tidak ada kalimat tata letak zona.
- [ ] Jumlah cue sesuai durasi; setiap blok Style of Music memuat durasi target yang sama dengan tabel cue; batas cue di batas babak.
- [ ] `### Narasi lengkap (ElevenLabs)` ada, satu blok per babak, identik dengan kolom Narasi (dicocokkan dengan skrip setelah `...` penutup paragraf diabaikan), jumlah karakter tercatat.
- [ ] `### Suara narator` memuat Model, Voice, Stability, dan arahan per babak; tag suara tidak ada di teks layar, kartu Ulikan, judul, caption, atau baris narasi di bagian prompt.
- [ ] Judul YouTube ≤ 100 karakter (dihitung skrip); baris pembuka caption ≤ ±100 karakter; 3 sampai 5 hashtag tanpa `#pov`; penanda ada di setiap caption.
- [ ] Setiap fakta di judul, caption, dan kartu Ulikan ada di tabel verifikasi dan memenuhi aturan bukti 2A.4; fakta baru di bagian ini ikut diperiksa silang (2A.4a).
- [ ] Kartu Ulikan terisi (Teks ≤ ±15 kata, Sumber untuk fakta); `Lapisan` = `Sejarah` atau `Sejarah, Legenda`; `Latar` tanpa tahun.
- [ ] Dokumen lolos daftar periksa Kontrak KONSEP.md v1.5.

Serahkan dengan satu baris ringkasan, 3 pilihan judul, 2 pilihan isi kartu Ulikan, sebutkan cadangan alat yang dipakai (bila ada), lalu tanyakan apakah Rafi menyetujui konsep atau mengubah bagian tertentu. **Berhenti dan tunggu.**

### 2B.8 Serah terima ke pov-produksi

Setelah Rafi menyetujui konsep:

1. Isi baris `Versi` dengan `v1 · <tanggal>`.
2. Ekspor dokumen ke `KONSEP.md` dan kirim sebagai file.
3. Untuk seri: perbarui status part ini di dokumen peta seri menjadi "disetujui".
4. Sampaikan dalam dua kalimat: produksi dilanjutkan dengan skill pov-produksi, paling nyaman di Claude Code di laptop Rafi, dengan prompt pembuka seperti "Kerjakan produksi video dari KONSEP.md ini dengan skill pov-produksi. Ini video format narasi bernarator pencerita: semua bidikan B, tanpa posisi kamu."
5. Jangan membangun proyek Remotion atau paket bahan di skill ini.

Perubahan apa pun setelah titik ini dikerjakan lewat Tahap R.

## Tahap R: Revisi konsep yang sudah disetujui

Hasil tahap ini: `KONSEP.md` versi baru yang lolos kontrak, plus daftar aset yang harus dibuat ulang bila produksi sudah berjalan.

### R.1 Kenali jalur masuk

| Jalur | Ciri | Yang dilakukan |
| --- | --- | --- |
| Revisi di sesi yang sama | Konsep sudah disetujui di percakapan ini | Pakai dokumen yang ada |
| Konsep dari sesi lain | Rafi melampirkan `KONSEP.md` atau memberi link | Baca dengan alat dokumen atau Read |
| Laporan pov-produksi | Rafi meneruskan masalah dari validasi, rekaman, durasi, atau ilustrasi | Baca konsep terbaru, perlakukan laporan sebagai daftar perubahan |
| Pemutakhiran kontrak | Kontrak di pov-produksi sudah naik versi | Sesuaikan bagian yang baru tanpa mengubah isi yang disetujui |

Jika konsepnya tidak ada di percakapan, minta Rafi melampirkannya (satu pertanyaan). Jika ada dua versi berbeda, tanyakan mana yang terbaru.

### R.2 Baca dan validasi

- Jalankan daftar periksa kontrak (dengan skrip bila shell tersedia).
- Catat versi dari baris `Versi`; jika tidak ada, anggap `v1`.

### R.3 Tentukan status produksi

Jika belum jelas, tanyakan sekali: "Produksinya sudah sampai mana: belum mulai, paket bahan sudah dibuat, atau aset (narasi/ilustrasi) sudah sebagian dibuat?" Laporan dari pov-produksi berarti produksi sudah berjalan.

### R.4 Petakan dampak

| Jenis perubahan | Bagian yang ikut diperbarui | Aset yang dibuat ulang bila sudah ada |
| --- | --- | --- |
| Narasi atau tag satu adegan | Naskah (Narasi, Waktu), paragrafnya di `### Narasi lengkap (ElevenLabs)` dan jumlah karakter babak, baris `Adegan <n> · Narasi` di prompt, hitungan kata dan durasi, tabel verifikasi bila fakta berubah | Rekaman babak itu, atau rekaman adegan itu saja |
| Arahan suara | `### Suara narator` | Rekaman babak yang terdampak |
| Visual satu adegan | Kolom visual, prompt adegan, catatan akurasi visual | Ilustrasi adegan itu |
| Tambah, hapus, gabung, atau pindah adegan | Penomoran ulang di naskah, prompt, narasi lengkap, SFX, Adegan hening, cue musik, Waktu, `Jumlah ilustrasi`, struktur | Pemetaan nomor; rekaman dan ilustrasi adegan baru |
| Ubah durasi | Hitungan kata dan adegan (2A.2), jumlah cue, Waktu | Tergantung adegan yang berubah |
| Kadar dramatis | Tag, narasi yang terdampak, Stability, musik, SFX, visual peristiwa, judul dan caption | Rekaman, cue, dan ilustrasi yang terdampak |
| Penampilan tokoh, bangunan, atau benda | Deskripsi baku, pembeda antartokoh, catatan akurasi visual, lembar karakter atau lembar rujukan, semua prompt yang memuatnya; untuk seri, part lain yang memakai lembar itu | Lembar dan ilustrasi yang memuatnya |
| Peta seri (pecah, gabung, atau geser batas part) | `### Peta seri` dan dokumen peta seri, penanda part di teks layar, judul, caption, akhir part dan rekap part berikutnya | Rekaman adegan pembuka dan penutup yang terdampak |
| Fakta masa kini | Verifikasi ulang ke sumber terbaru, lalu narasi adegan masa kini, kartu Ulikan, dan caption yang memakainya | Rekaman adegan yang narasinya berubah |
| Fakta | Verifikasi ulang (2A.4), lalu narasi, teks layar, judul, dan caption yang memakainya | Rekaman babak atau adegan yang narasinya berubah |
| Suasana atau batas babak | Tabel palet, cue musik | Cue musik terkait |
| Judul, caption, atau hashtag | Bagian itu saja, plus pemeriksaan caption (2B.7) | - |
| Kartu Ulikan | Bagian itu, plus verifikasi fakta barunya | - (dirender dari data) |
| Teks layar | Kolom Teks layar | - (dirender dari data) |

Kasus khusus dari pov-produksi:

- **Narasi berbeda dari rekaman:** bila rekamannya lebih baik dipertahankan, narasi di konsep disamakan dengan rekaman, tetapi verifikasi setiap fakta baru di dalamnya; bila tidak, usulkan generate ulang adegan itu.
- **Durasi lewat batas:** usulkan kalimat atau adegan yang dipangkas, dimulai dari yang bukan momen wajib, bukan hook, dan bukan puncak. Rafi yang memilih.
- **Ilustrasi tidak bisa dibuat Gemini:** usulkan bidikan pengganti (dari belakang, siluet, benda simbolis, lanskap) tanpa mengubah narasi.

**Bukan revisi lagi:** jika sudut cerita atau topiknya berubah, atau lebih dari separuh adegan ditulis ulang, sampaikan bahwa ini lebih tepat dikerjakan sebagai konsep baru dari Tahap 1, dan tanyakan pilihan Rafi.

### R.5 Sampaikan rencana bila dampaknya ke produksi

- Produksi belum mulai dan perubahannya kecil: langsung kerjakan.
- Produksi sudah berjalan, atau perubahan memicu penomoran ulang, rekam ulang, atau ilustrasi ulang: tulis rencana singkat di chat (perubahan, bagian yang ikut berubah, aset yang harus dibuat ulang) dan tunggu Rafi setuju.
- Saat produksi sudah berjalan, utamakan mengubah isi adegan yang ada daripada menambah atau menghapus adegan.

### R.6 Kerjakan

- Ubah hanya bagian yang terdampak.
- Naikkan baris `Versi` menjadi `v<n+1> · <tanggal>`.
- Tambahkan satu baris ke `### Riwayat revisi` di `## Alur produksi dan checklist` (buat bila belum ada): `| Versi | Tanggal | Perubahan | Dampak ke produksi |`.
- Bila nomor adegan berubah, tulis atau ganti `### Pemetaan nomor adegan` (`| Lama | Baru |`, `-` untuk adegan yang dihapus atau baru). Bila nomor tidak berubah, hapus tabel lama.

### R.7 Pemeriksaan dan titik berhenti

- [ ] Daftar periksa Kontrak KONSEP.md v1.5 dijalankan ulang untuk seluruh dokumen.
- [ ] Butir 2A.5 untuk adegan yang narasinya berubah; butir 2B.7 untuk prompt, audio, kartu Ulikan, dan caption yang berubah.
- [ ] Klaim baru atau yang berubah sudah diverifikasi dengan aturan bukti 2A.4 dan diperiksa silang (2A.4a); unsur visual baru tercatat di `### Catatan akurasi visual`.
- [ ] Jumlah kata dan perkiraan durasi masih sesuai tabel 2A.2.
- [ ] Untuk seri: dokumen peta seri dan part lain yang terdampak sudah dicatat.
- [ ] Baris `Versi` naik dan Riwayat revisi terisi; pemetaan nomor ada bila ada penomoran ulang.

Serahkan:

1. `KONSEP.md` hasil ekspor ulang sebagai file.
2. Ringkasan perubahan: versi baru, adegan yang berubah, aset yang harus dibuat ulang, dan tabel pemetaan nomor bila ada.
3. Bila produksi sudah berjalan, prompt lanjutan: "KONSEP.md diperbarui ke v<n>. Perbarui proyek dari KONSEP.md ini dengan skill pov-produksi (Tahap 5: Pembaruan konsep)."

**Berhenti dan tunggu.**

## Kontrak KONSEP.md v1.5

Format ini dibaca otomatis oleh skill pov-produksi dan harus identik dengan kontrak di skill itu. Konsep v1 tetap terbaca: bagian dan baris baru di v1.1 sampai v1.5 boleh tidak ada, dan label lama lembar karakter tetap diterima. Judul bagian `##` ditulis persis seperti di bawah dan berurutan. Bagian bertanda (opsional) boleh tidak ada. Skill ini selalu mengisi `Lapisan`, `Latar`, dan `## Kartu Ulikan`; untuk format narasi, `Posisi "kamu"` diisi `Tidak ada (format narasi, narator pencerita)` dan setiap kolom `Bidikan dan visual` diawali `B.`.

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
