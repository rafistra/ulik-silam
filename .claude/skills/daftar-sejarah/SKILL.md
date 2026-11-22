---
name: "daftar-sejarah"
description: "Gunakan saat Rafi ingin brainstorming, menyusun, atau merevisi konsep video daftar atau peringkat sejarah 9:16 Ulik Silam bernarator dokumenter (tokoh, tempat, peristiwa, perjanjian, benda; misalnya 5 raja paling berpengaruh di Mataram), sampai KONSEP.md. Untuk video POV \"kamu\" pakai pov-sejarah; produksi pakai pov-produksi."
---

# Daftar Sejarah: dari ide sampai KONSEP.md

Skill ini menyusun video berformat daftar untuk akun **Ulik Silam**, misalnya "5 Raja Paling Berpengaruh di Mataram Islam". Bedanya dengan pov-sejarah: tidak ada posisi "kamu". Narator dokumenter membawakan beberapa entri berurutan (biasanya hitung mundur dari #5 ke #1), dan setiap entri adalah satu babak. Tahapannya sama: Tahap 1 (ide, entri, dan brief), Tahap 2A (naskah dan verifikasi), Tahap 2B (visual, audio, kartu Ulikan, judul dan caption), lalu serah terima. Konsep yang sudah disetujui diubah lewat Tahap R.

Video ini memakai lapisan **Sejarah** (atau **Sejarah, Legenda** bila kisah tradisional ikut dominan). Tampilan video (pembuka nyala, label lapisan, subtitle, teks layar, kartu Ulikan) dipasang otomatis oleh pov-produksi; skill ini hanya menyediakan isinya.

Skill ini berhenti di dokumen konsep. Produksi dikerjakan skill **pov-produksi**, yang membaca KONSEP.md dalam format baku di bagian "Kontrak KONSEP.md v1.3". Format daftar memakai kontrak itu apa adanya: entri = babak, angka peringkat = teks layar. pov-produksi tidak perlu diubah. Komunikasi dengan Rafi dalam Bahasa Indonesia; semua prompt untuk generator AI ditulis dalam bahasa Inggris.

## Cakupan

- **Termasuk:** daftar tokoh, peristiwa, tempat, benda, atau fenomena sejarah Indonesia maupun dunia. Dua jenis:
  - **Peringkat:** entri diurutkan menurut kriteria ("paling berpengaruh", "terluas", "terlama"). Default hitung mundur, nomor 1 terakhir.
  - **Kumpulan:** entri tanpa peringkat ("5 benteng VOC yang masih berdiri", "4 perjanjian yang memecah Mataram"). Default urut kronologis.
- **Jenis entri:** tokoh, tempat atau bangunan, peristiwa, dokumen atau perjanjian, benda atau artefak, serta budaya atau kebiasaan masa lalu (termasuk kerajaan, komoditas, dan jalur dagang, yang diperlakukan seperti tempat atau peristiwa sesuai isinya). Satu daftar boleh campuran (misalnya "5 hal yang membuat Sultan Agung ditakuti VOC"). Jenis tiap entri menentukan pola adegannya (2A.2) dan cara menjaga konsistensi visualnya (2B.1).
- **Batas dengan legenda:** sama dengan pov-sejarah. Tokoh tercatat sejarah yang kisahnya bercampur legenda boleh masuk; bagian dari kisah tradisional ditandai di narasi ("menurut Babad Tanah Jawi ...", "konon ...") dan di tabel verifikasi. Bila bagian itu banyak, pakai lapisan `Sejarah, Legenda`. Daftar yang isinya memang legenda atau mitos (misalnya "5 makhluk mitologi Jawa") di luar cakupan.
- **Di luar cakupan:** video POV dengan posisi "kamu" (pakai pov-sejarah), cerita rakyat, mitologi, fiksi, dan produksi (pakai pov-produksi). Jika diminta, sebutkan skill yang tepat; jika belum ada, tanyakan apakah Rafi tetap ingin dibantu tanpa skill ini.
- **Tokoh yang masih hidup** tidak dimasukkan ke daftar yang menilai watak atau moral ("paling kejam", "paling korup"). Untuk daftar netral (misalnya "presiden dengan masa jabatan terlama"), hanya fakta publik yang terdokumentasi.

## Aturan tetap

1. **Penutup prompt Gemini.** Setiap prompt ilustrasi untuk Gemini, tanpa kecuali (lembar karakter dan semua adegan), diakhiri dua baris ini, persis, setelah satu baris kosong:

   ```
   Style: detailed vector art
   Aspect ratio: 9:16
   ```

   Baris ini tetap ditambahkan walaupun isi prompt sudah menyebut gaya atau rasio. Gaya hanya diganti jika Rafi secara eksplisit meminta gaya lain; rasio tetap 9:16 kecuali Rafi meminta format lain. Penutup yang dipakai ditulis juga di bagian "Gaya visual" KONSEP.md.
2. **Penamaan gaya.** "Style:" selalu berarti baris penutup prompt Gemini. Untuk Suno, sebut "kolom Style of Music di Suno" (di sebagian versi aplikasi bernama "Styles").
3. **Verifikasi ketat.** Setiap klaim sejarah di narasi, teks layar, kartu Ulikan, judul, dan caption, serta setiap unsur sejarah di prompt (busana, arsitektur, senjata, kapal, benda, lanskap), wajib bersumber menurut aturan bukti di 2A.4: sumber dibuka langsung, mengikuti hierarki sumber, dan minimal dua sumber independen. Klaim yang tidak lolos tidak tampil sebagai fakta. Ini termasuk **alasan peringkat**: setiap entri punya bukti untuk posisinya. Sumber, halaman, atau kutipan tidak pernah dikarang; bila tidak ditemukan, tulis "Tidak ditemukan".
4. **Peringkat adalah pilihan editorial, bukan fakta.** Kriteria ditulis eksplisit dan sama untuk semua entri. Narasi dan caption tidak mengklaim peringkat sebagai kebenaran mutlak; peringkat disebut sebagai versi Ulik Silam menurut kriteria itu. Urutan akhir diputuskan Rafi.
5. **Berhenti di setiap akhir tahap.** Tahap 1, 2A, 2B, dan R masing-masing diakhiri pemeriksaan, penyerahan, lalu menunggu Rafi bilang lanjut.
6. **Durasi 2 sampai 3 menit.** Termasuk ± 5 detik elemen merek Ulik Silam (pembuka 1,5 dtk, kartu Ulikan 3,5 dtk). Jumlah entri, adegan, dan kata diturunkan dari durasi (tabel di 2A.2).

## Alat dan cadangannya

Cek alat yang tersedia di awal sesi, diam-diam, lalu pakai cadangan bila perlu dan sebutkan dalam satu kalimat saat menyerahkan hasil.

| Kebutuhan | Alat utama | Cadangan bila tidak tersedia |
| --- | --- | --- |
| Dokumen konsep | Artifact tipe Docs (atau connector dokumen first-party) | File `KONSEP.md` yang dikirim ke Rafi |
| Diagram struktur | Diagram di dokumen Docs | Tabel babak (babak, entri, rentang waktu, adegan) |
| Bank ide | Dokumen `claude/bank-ide-pov.md` di Project lewat tool Projects | Bagian "Ide cadangan" di akhir dokumen konsep |
| Riset kandidat, verifikasi fakta, riset busana | Web search dan fetch halaman, ditambah file/connector milik Rafi | Pengetahuan umum, setiap fakta dan unsur busana diberi label "perlu dicek" |
| Pemeriksaan silang fakta (2A.4a) | Subagen terpisah yang belum melihat tabel verifikasi (alat Agent) | Pemeriksaan ulang sendiri dengan pencarian baru dan kata kunci berbeda |
| Hitung kata, durasi, panjang judul | Skrip di shell | Hitung manual dan sebutkan bahwa hasilnya perkiraan |
| Membaca konsep lama (Tahap R) | Alat dokumen untuk link Docs, atau file `KONSEP.md` yang dilampirkan | Minta Rafi melampirkan `KONSEP.md` |
| Serah terima ke produksi | Ekspor dokumen ke `KONSEP.md` dan kirim sebagai file | Tulis `KONSEP.md` langsung dari isi dokumen |

## Tahap 1: Ide, entri, dan brief

Hasil tahap ini: brief yang disetujui Rafi, termasuk daftar entri dan urutannya. Belum ada dokumen atau file.

### 1.1 Pilih pintu masuk

- Rafi baru punya tema kasar atau ingin brainstorming: lakukan 1.2.
- Rafi sudah memberi topik daftar (misalnya "raja paling berpengaruh di Mataram"): langsung ke 1.3.
- Rafi sudah memberi entri dan urutannya: periksa sekilas di 1.3, lalu ke 1.4.
- Rafi membawa `KONSEP.md` atau link dokumen konsep, meneruskan laporan dari pov-produksi, atau minta mengubah konsep yang sudah disetujui: langsung ke **Tahap R**.

### 1.2 Brainstorming (di chat)

Jawaban singkat dan mudah dipilih; jangan menulis naskah di sini.

1. **Sudut daftar.** Tawarkan 3 sampai 5 pilihan, masing-masing 2 sampai 3 baris: kategori, kriteria atau sifat yang diurutkan, jenis (peringkat atau kumpulan), dan contoh kalimat hook. Usahakan sudutnya berbeda (misalnya "paling berpengaruh", "paling singkat berkuasa", "yang mengubah peta Jawa").
2. **Pendapat jujur.** Sebutkan pilihan terkuat untuk video pendek dan alasannya: kekuatan hook, apakah kriterianya bisa dipertanggungjawabkan dengan sumber, variasi visual antarentri (entri yang mirip satu sama lain membosankan dan sulit dibedakan di Gemini), muat atau tidak dalam durasi, dan kepekaan topik. Daftar bertema "paling kejam" atau sejenis bisa dikerjakan bila bersumber dan adil, tetapi sampaikan risikonya.
3. **Ide Rafi diutamakan.** Kembangkan dari idenya; Rafi boleh mencampur atau menolak semua pilihan.
4. **Ide cadangan.** Pilihan yang tidak terpakai disimpan ke bank ide dengan tanda jenis "daftar sejarah". Untuk dokumen Project: baca dulu (buat bila belum ada), lalu tulis ulang utuh dengan tambahan di akhir (tanggal, jenis, tema, ide satu baris). Sebelum menulis, pastikan isi baru tidak lebih pendek dari isi lama ditambah tambahannya.

### 1.3 Kriteria dan kandidat entri

Langkah ini khusus format daftar dan dikerjakan sebelum brief, karena seluruh naskah bergantung pada entri yang dipilih.

1. **Kriteria.** Usulkan 2 sampai 3 kriteria yang bisa diukur atau dibuktikan, misalnya untuk "raja paling berpengaruh": luas wilayah atau pengaruh politik, lembaga atau tatanan yang diwariskan, dan dampak jangka panjang yang masih terasa. Untuk daftar kumpulan, tulis syarat masuk daftar (misalnya "benteng VOC yang bangunannya masih berdiri").
2. **Riset kandidat.** Cari kandidat dengan web search (halaman dibuka, bukan cuplikan) dan susun 6 sampai 8 kandidat bila jumlah entri 5, masing-masing satu baris: nama, masa atau tahun, alasan utama menurut kriteria, dan satu fakta kunci beserta sumbernya. Sertakan kandidat yang lazim disebut orang agar Rafi bisa memutuskan dengan sadar.
3. **Usulan urutan.** Untuk peringkat, usulkan urutan beserta alasan singkat per posisi, terutama untuk nomor 1. Sebutkan bila sumber berbeda pendapat atau bila dua kandidat sangat berdekatan. Untuk kumpulan, usulkan urutan kronologis kecuali ada alasan lain.
4. **Kandidat yang tidak masuk.** Catat 1 sampai 3 kandidat terkuat yang tidak masuk beserta alasannya; ini dipakai di Catatan genre dan bisa menjadi bahan kartu Ulikan atau ajakan komentar.

Rafi yang memilih entri dan urutannya. Jika Rafi sudah memberi urutan, hormati, tetapi sampaikan bila ada entri yang sulit dibuktikan dengan kriteria yang sama.

### 1.4 Susun brief

| Kolom | Isi | Default bila kosong |
| --- | --- | --- |
| Judul / topik | Inti video | Diturunkan dari topik |
| Jenis | Peringkat (hitung mundur atau naik) atau kumpulan (kronologis atau bebas) | Peringkat, hitung mundur |
| Kriteria | 2 sampai 3 kriteria, atau syarat masuk untuk kumpulan | Dari 1.3 |
| Entri | Urutan entri dengan nama, masa, dan jenis entri (tokoh, tempat, peristiwa, dokumen, benda, budaya) | Dari 1.3 |
| Latar | Wilayah dan rentang era | Dari entri |
| Momen wajib | Fakta atau peristiwa yang harus muncul | - |
| Nada | Berwibawa, tegang, reflektif, ringan | Berwibawa, reflektif di akhir |
| Akhir | Pertanyaan ke penonton, fakta penutup, kalimat reflektif | Pertanyaan yang mengajak debat peringkat |
| Hindari | Hal yang tidak boleh muncul | - |
| Teknis | Durasi (2:00 sampai 3:00), platform, generator gambar/musik, alat perakit | 3:00 (target ±2:50), TikTok + Shorts, Gemini, Suno, Remotion. Gaya dan rasio mengikuti Aturan tetap 1 |

Aturan brief:

- Detail dari Rafi mengikat: jangan diganti, dilunakkan, atau dipindah urutannya tanpa izin.
- Kolom kosong diisi default dan dicatat sebagai Asumsi.
- Bertanya hanya jika ada yang tidak bisa ditebak dan mengubah seluruh naskah. Maksimal satu pertanyaan.
- Jumlah entri harus muat dalam durasi (tabel 2A.2). Bila terlalu banyak, usulkan mengurangi entri atau memperpanjang durasi dalam rentang; jangan mempercepat narasi.
- Bila entri berbeda era jauh (misalnya abad ke-16 dan ke-18), catat sejak awal karena busana dan latar tiap entri harus diriset terpisah.

Templat brief:

```
Judul: <N> <kategori> ...
Jenis: peringkat, hitung mundur
Kriteria: 1) ... 2) ... 3) ...
Entri: #5 ... (masa, jenis) / #4 ... / #3 ... / #2 ... / #1 ...
Tidak masuk: ... (alasan)
Latar: ...
Momen wajib: ...
Nada: ...
Akhir: ...
Hindari: ...
Teknis: durasi ..., generator ...
```

### 1.5 Pemeriksaan dan titik berhenti

- [ ] Semua kolom terisi, asumsi ditandai.
- [ ] Kriteria eksplisit dan setiap entri punya alasan menurut kriteria itu, dengan minimal satu sumber yang sudah dibuka.
- [ ] Jumlah entri muat dalam durasi (tabel 2A.2).
- [ ] Topik masuk cakupan (daftar sejarah, bukan POV, legenda, mitologi, atau fiksi).

Tulis brief di chat dan akhiri dengan "Lanjut ke naskah?". **Berhenti dan tunggu.**

## Tahap 2A: Naskah dan verifikasi

Hasil tahap ini: dokumen konsep berisi ringkasan, struktur, naskah adegan, dan verifikasi fakta yang disetujui Rafi.

### 2A.1 Buat dokumen

Buat dokumen berjudul "Konsep Video POV: <topik>" (artifact Docs, atau `KONSEP.md` bila tidak tersedia). Kata "POV" di judul ini adalah penanda kontrak yang dibaca pov-produksi, bukan format videonya; jangan diganti. Semua judul bagian `##` dari Kontrak KONSEP.md v1.3 langsung dibuat dalam urutan kontrak, tetapi di tahap ini hanya bagian berikut yang diisi:

- **Ringkasan konsep:** tabel keputusan dengan baris wajib kontrak, dengan isi khusus format daftar:
  - `Posisi "kamu"`: `Tidak ada (format daftar, narator dokumenter)`.
  - `Jumlah ilustrasi`: jumlah adegan + perkiraan lembar karakter (diperbarui di 2B).
  - `Lapisan`: `Sejarah` (atau `Sejarah, Legenda`).
  - `Latar`: wilayah tanpa tahun, misalnya `Mataram Islam` atau `Jawa`.
  - Baris tambahan: `Format` (misalnya `Daftar · peringkat hitung mundur`), `Jumlah entri`, `Kriteria`, premis satu kalimat, Asumsi, dan "Dipilih karena ..." bila dari brainstorming.
- **Struktur alur:** diagram atau tabel babak: babak 1 pembuka, lalu satu babak per entri, dengan rentang waktu dan batas durasi.
- **Naskah adegan:** sesuai kontrak dan 2A.2.
- **Catatan genre:** subjudul `### Dasar peringkat` (2A.3), `### Verifikasi fakta` (2A.4), dan `### Pemeriksaan silang` (2A.4a).
- **Sumber:** halaman yang benar-benar dibuka.

Bagian lain diberi tanda "Dikerjakan di Tahap 2B". `KONSEP.md` belum diekspor.

### 2A.2 Struktur dan aturan naskah

**Struktur babak**

- `### Babak 1: Pembuka` berisi hook, 1 sampai 2 adegan.
- Satu babak per entri, dinamai dengan angka dan nama entri, misalnya `### Babak 2: #5 Panembahan Senopati`. Untuk kumpulan tanpa peringkat, pakai nomor urut (`### Babak 2: 1 Benteng Rotterdam`).
- Tidak ada babak penutup terpisah. Adegan terakhir entri terakhir memuat kalimat penutup, lalu langsung disambung kartu Ulikan.

**Panjang dari durasi**

| Durasi maksimum | Target | Entri | Adegan | Babak | Kata narasi (batas, 130 sampai 135 kpm) |
| --- | --- | --- | --- | --- | --- |
| 2:00 | ±1:55 | 3 sampai 4 | 11 sampai 13 | 4 sampai 5 | ±210 sampai 220 |
| 2:30 | ±2:20 | 4 sampai 5 | 13 sampai 15 | 5 sampai 6 | ±260 sampai 270 |
| 3:00 | ±2:50 | 5 sampai 6 | 15 sampai 18 | 6 sampai 7 | ±320 sampai 335 |

Pola yang disarankan: pembuka 1 sampai 2 adegan, setiap entri 3 adegan (6 entri: 2 sampai 3 adegan). Entri nomor 1 boleh mendapat satu adegan lebih bila durasi masih cukup. Panjang antarentri dibuat seimbang; selisih kata antarentri paling banyak ± 30%, kecuali nomor 1.

pov-produksi menambahkan jeda 0,9 detik di setiap adegan, 1,5 detik di setiap adegan hening, dan ± 5 detik elemen merek, jadi:

```
kata maksimum = (target detik − 5 − 0,9 × jumlah adegan − 1,5 × jumlah adegan hening) × kpm / 60
```

dengan kpm 130 sampai 135; angka bawah adalah batas aman. Tag suara tidak dihitung sebagai kata, tetapi setiap tag bunyi (`[sighs]`, `[exhales]`) dan setiap elipsis diperkirakan menambah ± 0,5 detik. Hitung dengan skrip bila shell tersedia.

**Isi tiap bagian**

- **Hook (maksimal 10 detik):** pertanyaan atau kontras yang memancing, plus janji daftarnya. Contoh: "[serious] Mataram melahirkan belasan raja. [curious] Tapi hanya lima yang benar-benar mengubah wajah Jawa." Boleh menyapa penonton ("menurutmu ..."), tetapi tidak menaruh penonton di posisi tokoh. Kriteria disebut singkat di hook atau adegan kedua pembuka. Jangan menyebut nomor 1; bila ingin memancing penasaran, hanya dengan klaim yang benar dan didukung naskah.
- **Setiap entri, pola dasar tiga adegan sesuai jenisnya:**

  | Jenis entri | Adegan 1 (penanda entri) | Adegan 2 | Adegan 3 |
  | --- | --- | --- | --- |
  | Tokoh | Siapa dan kapan: nama, masa, satu hal yang membuatnya menarik | Tindakan atau peristiwa kunci, dengan detail konkret sebagai bukti kriteria | Dampak dan alasan posisinya |
  | Tempat/bangunan | Apa, di mana, kapan dan oleh siapa dibangun | Peristiwa kunci yang terjadi di sana | Nasibnya: runtuh, berubah fungsi, atau jejaknya hari ini |
  | Peristiwa | Latar dan pemicu: kapan, di mana, siapa yang terlibat | Momen puncak | Akibatnya, dan mengapa itu penting |
  | Dokumen/perjanjian | Siapa, kapan, dan dalam situasi apa | Isi pokoknya, diparafrasekan | Apa yang berubah karenanya |
  | Benda/artefak | Wujud dan asal-usulnya | Kisah kunci di baliknya | Di mana sekarang |
  | Budaya/kebiasaan | Apa itu dan di lingkungan mana | Contoh nyata di masanya | Mengapa hilang atau berubah |

  Adegan 3 juga memuat alasan posisinya untuk daftar peringkat, plus jembatan singkat ke entri berikutnya bila wajar. Pada daftar campuran, setiap entri memakai pola jenisnya sendiri. Variasikan pembuka kalimat antarentri; jangan setiap entri dimulai dengan "Nomor lima ...". Angka sudah tampil di layar, jadi narasi boleh langsung masuk ke isinya.
- **Kala dan sudut pandang untuk adegan "hari ini":** adegan yang membahas kondisi sekarang (bangunan yang kini jadi museum, benda yang kini disimpan di museum) ditulis jelas sebagai masa kini ("Hari ini, ..."), agar penonton tidak mengira itu bagian masa lalu. Fakta masa kini diverifikasi dengan sumber terbaru (2A.4).
- **Penutup (adegan terakhir):** kalimat yang terasa sebagai akhir, sesuai kolom Akhir, misalnya pertanyaan yang mengajak debat peringkat.
- **Satu momen hening** di titik yang paling emosional (misalnya wafatnya tokoh, keruntuhan, atau kekalahan), ditandai `**Momen hening**`. Format daftar jarang memakai epilog.

**Penanda entri di teks layar**

pov-produksi tidak menampilkan judul babak, jadi angka dan nama entri dibawa kolom `Teks layar` di adegan pertama setiap entri, dengan format tetap:

- Peringkat: `#5 · Panembahan Senopati`
- Kumpulan: `1 · Benteng Rotterdam`

Satu teks saja, tanpa ` / `, agar tampil bersamaan. Nama ditulis sesuai sumber dan sama di narasi, caption, dan Catatan genre. Bila perlu masa atau tahun, taruh di teks layar adegan kedua entri itu (misalnya `Bertakhta 1613–1645`), dan tahun itu ikut diverifikasi. Teks layar di pembuka boleh berisi kriteria singkat (misalnya `Wilayah · Tatanan · Warisan`).

**Aturan lain**

- Narasi orang ketiga, kalimat pendek, kala yang konsisten. Sikap tidak menghakimi kecuali brief meminta lain.
- Setiap adegan 8 sampai 12 detik.
- Superlatif ("terbesar", "pertama", "satu-satunya", "terlama") hanya dipakai bila terverifikasi; bila tidak, perhalus ("salah satu ...", "termasuk yang ...").
- Kolom `Bidikan dan visual` selalu diawali `B.` (sorotan tokoh atau peristiwa; tidak ada bidikan orang pertama di format ini), lalu deskripsi rinci ± 50 sampai 90 kata yang memuat tujuh unsur ini, berurutan dan dipisah titik koma:
  1. **Bidikan:** jenis bidikan dan sudut kamera (misalnya sedang-lebar, sedikit dari bawah). Variasikan antaradegan.
  2. **Tempat dan waktu:** lokasi bernama dan bagian ruangnya (pendopo, gerbang air, alun-alun, dek kapal), tahun atau masa, waktu hari, dan cuaca.
  3. **Subjek utama dan aksinya:** siapa atau apa yang menjadi pusat, sedang melakukan apa pada satu momen.
  4. **Emosi:** ekspresi dan bahasa tubuh subjek utama, atau suasana bila tanpa tokoh.
  5. **Orang lain:** jumlah, peran, dan reaksi tokoh pendukung atau figuran.
  6. **Detail sejarah kunci:** arsitektur, properti, senjata, kendaraan, panji, atau tanda status yang mendukung narasi. Setiap detail ini wajib diverifikasi di 2B.1.
  7. **Lapisan dan cahaya:** isi latar depan, tengah, dan belakang; sumber dan arah cahaya; unsur yang bergerak (asap, debu, kain, air, api).

  Visual harus menggambarkan isi narasi adegan itu, bukan hiasan umum: bila narasi menyebut pasukan berangkat, gambarnya memperlihatkan keberangkatan itu. Detail yang belum pasti ditulis netral ("pakaian prajurit sesuai riset") sampai diriset di 2B.1, jangan ditebak.

  Contoh struktur (isinya ilustrasi; semua detail tetap wajib diriset): `B. Sedang-lebar, sedikit dari bawah; alun-alun keraton Mataram, 1628, senja berangin dan berdebu; raja berdiri di tangga pendopo, tangan kanan terangkat memberi aba-aba berangkat; rahang mengeras, mata menatap ke barat; puluhan prajurit berbaris, beberapa menoleh ke arah raja, seorang perwira berkuda menunggu aba-aba; tombak, panji, dan payung kebesaran sesuai riset; latar depan barisan ujung tombak, tengah sang raja di tangga, belakang atap keraton dan langit jingga, cahaya matahari rendah dari kiri, debu tersapu angin.`
- **Wajah tokoh entri tampil di paling banyak 2 adegan per entri.** Adegan lain memakai peristiwa, bangunan, benda, peta bergaya tanpa tulisan, kerumunan, atau tokoh dari belakang atau siluet. Ini menjaga jumlah lembar karakter tetap wajar dan variasi visual tetap tinggi.
- **Entri non-tokoh** tetap butuh manusia di sebagian adegan agar tidak terasa seperti foto katalog: penjaga di benteng, pedagang di pelabuhan, juru tulis di meja perjanjian. Orang-orang ini figuran, kecuali tokoh nyata yang memang menjadi kunci entri itu (misalnya penanda tangan perjanjian).

### 2A.2a Tag suara (ElevenLabs v3)

Narasi dibacakan narator AI di ElevenLabs dengan model Eleven v3 dan digenerate Rafi per babak. Aturannya sama dengan pov-sejarah:

- **Satu tag emosi di awal setiap kalimat**, format `[emotion] kalimat. [emotion] kalimat.`
- Tag dari Eleven v3, dalam kurung siku, huruf kecil, bahasa Inggris. Untuk narator dokumenter yang sering dipakai: `[calm]`, `[serious]`, `[curious]`, `[tense]`, `[sad]`, `[excited]`, `[resigned]`, `[whispers]`. Dua tag boleh berurutan bila perlu (`[sad] [whispers]`).
- Alur emosi wajar: perubahan tag di titik yang memang berubah (hook, awal entri, momen hening, kalimat terakhir). Narator dokumenter cenderung stabil, jadi `[serious]` dan `[calm]` boleh mendominasi; jangan membuat emosi melompat tanpa alasan.
- Tag bunyi (`[sighs]`, `[exhales]`) paling banyak satu per adegan dan diperhitungkan dalam durasi.
- Jeda: elipsis `...` di dalam narasi. `...` penutup paragraf hanya ditambahkan di `### Narasi lengkap (ElevenLabs)`.
- Tag hanya di kolom Narasi dan `### Narasi lengkap (ElevenLabs)`; tidak di teks layar, kartu Ulikan, judul, caption, atau baris `**Adegan <n> · Narasi ...:**` di bagian prompt.

### 2A.3 Dasar peringkat

Di `## Catatan genre`, subjudul `### Dasar peringkat`:

- Satu baris kriteria (sama dengan Ringkasan konsep).
- Tabel `| Posisi | Entri | Alasan menurut kriteria | Bukti kunci | Sumber |`, satu baris per entri.
- Tabel atau daftar "Tidak masuk": kandidat terkuat yang tidak dipilih beserta alasannya.
- Catatan perdebatan bila sumber berbeda pendapat tentang peran atau penilaian seorang tokoh.

Untuk tokoh yang penilaiannya diperdebatkan (misalnya raja yang dikenal keras atau yang bekerja sama dengan VOC), narasi menyebut lebih dari satu sudut pandang secara adil, tanpa kesan propaganda atau penghinaan. Kutipan dalam tanda kutip yang diatribusikan ke tokoh nyata hanya kutipan terdokumentasi dengan sumbernya; selain itu parafrase tanpa tanda kutip.

### 2A.4 Verifikasi fakta (ketat)

**Yang diverifikasi:** setiap klaim di narasi dan teks layar: nama dan ejaannya, gelar sesuai masanya, tanggal dan tahun, masa takhta, angka, tempat, urutan peristiwa, sebab-akibat, kutipan, superlatif, dan alasan peringkat. Klaim tersirat juga dihitung; misalnya "akhirnya ia menyerah" menyiratkan urutan dan hasil peristiwa. Pecah setiap kalimat narasi menjadi klaim-klaim tunggal dan beri nomor. Detail visual dan klaim di judul, caption, dan kartu Ulikan diverifikasi di 2B dengan aturan yang sama.

**Hierarki sumber**

| Tingkat | Jenis | Dipakai untuk |
| --- | --- | --- |
| A | Sumber primer atau edisinya: prasasti, naskah, arsip (misalnya catatan harian dan surat VOC), babad dan serat, lukisan, gambar, peta, dan foto sezaman | Bukti langsung. Babad dan serat selalu ditandai sebagai versi tradisi |
| B | Kajian ilmiah: buku akademik dan artikel jurnal dengan penulis jelas | Tanggal, angka, penafsiran, dan konteks |
| C | Lembaga resmi: museum, arsip nasional, lembaga cagar budaya, ensiklopedia bereditor | Konfirmasi dan fakta masa kini |
| D | Media populer, blog, video, media sosial, dan Wikipedia | Hanya petunjuk untuk menemukan sumber A sampai C; tidak dihitung sebagai sumber |

**Aturan bukti**

- Setiap klaim butuh minimal dua sumber independen dari tingkat A sampai C. Klaim kunci (tanggal, angka, tindakan tokoh, sebab-akibat utama, alasan peringkat) butuh sedikitnya satu sumber tingkat A atau B.
- Dua sumber tidak independen bila yang satu hanya menyalin atau mengutip yang lain (misalnya artikel berita yang menyalin ensiklopedia daring).
- Sumber harus dibuka langsung; cuplikan hasil pencarian tidak dihitung. Catat judul, penulis atau lembaga, tahun terbit, halaman atau bagian bila ada, URL, dan tanggal akses.
- Untuk setiap klaim, tulis parafrase singkat dari bagian sumber yang mendukungnya, supaya Rafi bisa memeriksa ulang dengan cepat.
- Sumber, halaman, atau kutipan tidak pernah dikarang. Bila tidak ada, statusnya "Tidak ditemukan".

**Status dan akibatnya di naskah**

| Status | Arti | Boleh di narasi? |
| --- | --- | --- |
| Terverifikasi | ≥ 2 sumber independen tingkat A sampai C yang sepakat | Ya, sebagai fakta |
| Diperdebatkan | Sumber kredibel berbeda pendapat | Ya, dengan penanda ("diperkirakan ...", "menurut sebagian sejarawan ...") atau rentang |
| Kisah tradisional | Hanya dari babad, serat, atau tradisi lisan | Ya, dengan penanda ("menurut Babad Tanah Jawi ...", "konon ...") |
| 1 sumber | Hanya satu sumber tingkat A sampai C | Hanya dengan penanda kehati-hatian; tidak boleh untuk klaim kunci atau alasan peringkat |
| Diperbaiki | Versi populer keliru, diganti versi bersumber | Ya, versi yang sudah diperbaiki |
| Tidak ditemukan | Tidak ada sumber tingkat A sampai C | Tidak; hapus atau tulis ulang |

**Jebakan yang wajib dicek**

- **Tahun dan masa takhta** yang berbeda antarsumber (kalender Jawa dan Masehi, naik takhta versus penobatan): pilih yang paling didukung sumber A dan B, catat versi lain, dan pertimbangkan "sekitar" atau tidak menyebut tahun di layar.
- **Gelar dan nama sesuai masanya:** tokoh sering berganti nama atau gelar. Pakai nama yang dikenal penonton, tetapi jangan menyebut gelar pada peristiwa sebelum ia menyandangnya.
- **Anakronisme istilah:** "Indonesia" untuk masa sebelum gerakan kebangsaan abad ke-20, "Belanda" untuk tindakan yang dilakukan VOC sebagai kongsi dagang, atau "Jakarta" untuk Batavia masa VOC. Tulis nama tempat sesuai masanya; nama sekarang boleh disebut sebagai keterangan.
- **Sebab-akibat yang terlalu disederhanakan** ("karena satu peristiwa ini, kerajaan runtuh"): bila sumber menyebut banyak faktor, tulis sebagai salah satu faktor.
- **Entri non-tokoh:** tahun dibangun tertukar dengan tahun renovasi, perluasan, atau pengambilalihan; nama lama dan baru bangunan; isi perjanjian (parafrase dari kajian atau terjemahan teksnya, tidak dikutip kecuali kutipannya terdokumentasi); batas superlatif ("tertua di Jawa", "salah satu yang tertua"); jumlah korban dan pasukan (sebut rentang bila sumber tidak sepakat).
- **Fakta masa kini** (masih berdiri, sudah dipugar, kini museum, terbuka untuk umum, lokasi benda sekarang) dicek ke sumber terbaru, misalnya situs resmi pengelola, museum, atau lembaga cagar budaya, dengan tanggal akses.

**Tabel verifikasi** di bawah `### Verifikasi fakta`:

`| # | Klaim | Adegan | Status | Sumber 1 (tingkat) | Sumber 2 (tingkat) | Bukti dari sumber | Catatan |`

Detail populer yang sengaja tidak dipakai dicatat dengan adegan "(tidak dipakai)" beserta alasannya.

**Tanpa web search:** naskah tidak diserahkan sebagai terverifikasi. Semua baris berstatus "Perlu dicek", hal ini disebut di awal penyerahan, dan Rafi disarankan melanjutkan verifikasi di sesi yang punya web search sebelum produksi.

### 2A.4a Pemeriksaan silang

Dikerjakan setelah tabel verifikasi selesai dan sebelum menyerahkan 2A, supaya verifikasi tidak hanya memeriksa dirinya sendiri.

1. Bila alat Agent tersedia, jalankan satu subagen terpisah. Berikan hanya naskah (narasi dan teks layar) dan daftar klaim bernomor, **tanpa** tabel verifikasi dan sumbernya. Tugasnya: mencari sumber sendiri untuk setiap klaim dengan hierarki dan aturan bukti di 2A.4, memberi status, dan melaporkan per nomor klaim mana yang tidak didukung, diperdebatkan, atau anakronistis, beserta sumber yang ia buka.
2. Bandingkan laporan itu dengan tabel verifikasi. Setiap perbedaan diselidiki ulang dengan membuka sumbernya, lalu tabel dan naskah diperbaiki.
3. Bila alat Agent tidak tersedia, periksa ulang sendiri setiap klaim kunci dengan pencarian baru memakai kata kunci yang berbeda dari pencarian pertama.
4. Catat hasilnya di `### Pemeriksaan silang`: cara yang dipakai (subagen atau sendiri), jumlah klaim yang diperiksa, perbedaan yang ditemukan, dan keputusan untuk setiap perbedaan.

### 2A.5 Pemeriksaan dan titik berhenti

- [ ] Jumlah entri, adegan, babak, dan kata sesuai tabel 2A.2 (dihitung dengan rumus); panjang antarentri seimbang.
- [ ] Nomor adegan berurutan dari 1; tabel naskah memakai kolom persis kontrak; setiap adegan diawali `B.` dan punya visual dan narasi.
- [ ] Setiap kolom `Bidikan dan visual` memuat ketujuh unsur (2A.2), menggambarkan isi narasi adegannya, dan tidak menebak detail yang belum diriset; sudut kamera bervariasi antaradegan.
- [ ] Adegan pertama setiap entri punya teks layar penanda entri dengan format tetap; nomor dan nama cocok dengan nama babak.
- [ ] Setiap entri memakai pola adegan sesuai jenisnya; adegan masa kini ditulis jelas sebagai masa kini.
- [ ] Wajah tokoh entri paling banyak 2 adegan per entri; entri non-tokoh punya manusia di sebagian adegannya.
- [ ] Momen hening ditandai.
- [ ] Setiap klaim (termasuk klaim tersirat, superlatif, gelar, istilah, dan teks layar) ada di tabel verifikasi dengan dua sumber independen tingkat A sampai C dan bukti dari sumber; klaim kunci punya sumber tingkat A atau B; fakta masa kini bersumber terbaru dengan tanggal akses.
- [ ] Tidak ada klaim berstatus Tidak ditemukan di naskah; klaim Diperdebatkan, Kisah tradisional, dan 1 sumber memakai penanda di narasi; tidak ada klaim 1 sumber yang menjadi klaim kunci atau alasan peringkat.
- [ ] Tidak ada anakronisme istilah, nama tempat, atau gelar.
- [ ] Pemeriksaan silang (2A.4a) sudah dijalankan, dicatat, dan semua perbedaannya diselesaikan.
- [ ] `### Dasar peringkat` terisi untuk semua entri, dan setiap alasan peringkat berstatus Terverifikasi, atau Diperdebatkan dengan penanda.
- [ ] Narasi tidak mengklaim peringkat sebagai kebenaran mutlak; nomor 1 tidak dibocorkan di hook.
- [ ] Setiap kalimat narasi diawali tag emosi; tag bunyi paling banyak satu per adegan.
- [ ] Bagian Sumber hanya berisi halaman yang benar-benar dibuka; isi kolom Hindari tidak muncul.
- [ ] Baris `Posisi "kamu"`, `Lapisan`, `Latar`, `Format`, `Jumlah entri`, dan `Kriteria` terisi.

Serahkan dengan satu baris ringkasan (entri, adegan, kata, perkiraan durasi, jumlah klaim per status, dan hasil pemeriksaan silang), sebutkan cadangan alat yang dipakai (bila ada), lalu akhiri dengan "Lanjut ke visual, audio, dan caption?". **Berhenti dan tunggu.**

Perubahan dari Rafi selama 2A dikerjakan langsung di tahap ini, lalu 2A.5 dijalankan ulang.

## Tahap 2B: Visual, audio, kartu Ulikan, dan caption

Hasil tahap ini: dokumen konsep lengkap yang memenuhi Kontrak KONSEP.md v1.3, plus `KONSEP.md` untuk pov-produksi.

**Naskah dari 2A dikunci.** Bila ada adegan yang perlu diubah (misalnya sulit digambar), usulkan ke Rafi; jangan mengubah narasi diam-diam. Perubahan yang disetujui memicu 2A.5 untuk adegan itu.

### 2B.1 Riset tokoh, gaya visual, dan konsistensi

Isi `## Gaya visual dan konsistensi tokoh` dengan: tabel palet dan cahaya per babak (format kontrak), panduan bidikan 9:16, tabel pembeda antarentri, deskripsi tokoh baku, aturan figuran, baris `**Penutup prompt:**` dengan blok kodenya, dan templat prompt yang memuat Aturan tetap 1.

**Lembar karakter**

- Tokoh entri yang wajahnya tampil di 2 adegan atau lebih mendapat satu lembar karakter. Tokoh yang wajahnya hanya tampil di 1 adegan tidak perlu lembar; deskripsi tokoh bakunya ditulis lengkap di prompt adegan itu.
- Tokoh pendukung yang tampil di 3 adegan atau lebih juga mendapat lembar.
- Bangunan atau benda kunci entri non-tokoh yang tampil di 2 adegan atau lebih mendapat **lembar rujukan**. Labelnya tetap `**Lembar karakter · <Nama bangunan atau benda>**` (misalnya `**Lembar karakter · Benteng Rotterdam**`) agar pov-produksi bisa membacanya tanpa perubahan; namanya ditulis persis sama di semua prompt yang merujuknya. Isinya diatur di "Entri non-tokoh" di bawah.
- Peristiwa, dokumen, dan budaya biasanya tidak perlu lembar; konsistensinya dijaga lewat deskripsi baku latar (ruang, kapal, medan perang) yang disalin persis ke setiap prompt entri itu.

**Riset budaya dan pakaian**

Riset setiap tokoh berlembar karakter dan setiap kelompok figuran yang sering tampil, dengan aturan sumber 2A.4. Sumber yang paling berguna: arca, relief, naskah bergambar, lukisan dan gambar sezaman, foto lama, koleksi museum, kajian tekstil. Untuk tokoh nyata, deskripsikan dari atribut terdokumentasi (potret, lukisan, foto) yang ditemukan saat riset, bukan dari ingatan; jika tidak ada potret, nyatakan wajahnya rekaan. Sesuaikan dengan era, tempat, budaya, dan status:

- **Tubuh dan wajah:** warna kulit, bentuk wajah, rambut dan tatanannya, tanda khas budaya bila tercatat.
- **Pakaian lapis demi lapis, dari kepala sampai kaki:** penutup kepala, badan atas, kain bawah dan cara memakainya, ikat pinggang atau selendang, alas kaki.
- **Bahan, teknik, warna, dan motif kain** yang tersedia di masa itu.
- **Perhiasan, senjata, dan benda bawaan** sesuai status.
- **Penanda status:** apa yang membedakan raja, bangsawan, abdi, prajurit, pendeta, rakyat, dan orang asing.

**Cek anakronisme.** Setiap unsur pakaian dan benda diperiksa: sudah ada di era dan tempat itu atau belum. Format daftar sering melintasi beberapa generasi, jadi busana entri awal dan entri akhir bisa berbeda nyata walau dalam satu kerajaan; jangan menyalin busana satu entri ke entri lain. Generator cenderung memakai unsur "tradisional" yang populer hari ini (motif kain, penutup kepala, potongan baju, senjata), jadi:

- Nama motif atau busana lokal ditulis bersama penjelasan bentuknya dalam bahasa Inggris (misalnya "kawung: repeating grid of four overlapping oval petals").
- Unsur populer yang anakronistis dimasukkan ke kalimat "Avoid ...".
- Contoh: motif parang dikaitkan tradisi dengan keraton Mataram Islam (akhir abad ke-16), jadi tidak dipakai untuk tokoh Majapahit; dan beskap serta blangkon bentuk modern perlu dicek dulu sebelum dipakai untuk raja awal Mataram.

**Referensi visual.** Catat 1 sampai 3 referensi per tokoh (link halaman museum, Wikimedia Commons, arsip foto, jurnal) beserta unsur yang diambil. Bila gambarnya domain publik atau boleh dipakai, sarankan Rafi mengunggahnya ke Gemini bersama prompt lembar karakter, dengan kalimat pembatas, misalnya "Use the uploaded painting only as a reference for the headdress and jewelry, not for the pose or art style."

**Riset latar dan properti per adegan.** Setiap adegan diriset, bukan hanya tokohnya: arsitektur (bentuk atap, bahan dinding, tiang, lantai, pagar), perabot, senjata dan perlengkapan perang, kapal dan kendaraan, bendera dan panji, alat tulis, wadah, hewan, tanaman, dan lanskap. Mulailah dari detail kunci di kolom `Bidikan dan visual`, lalu lengkapi unsur lain yang akan muncul di prompt. Aturan sumber sama dengan 2A.4; untuk visual, sumber terkuat adalah tingkat A (lukisan, gambar, peta, dan foto sezaman, relief, koleksi museum) dan kajian arkeologi, arsitektur, atau busana. Detail yang ditetapkan di sini ditulis kembali di kolom visual adegan itu bila sebelumnya masih netral.

**Catatan akurasi visual.** Hasil riset ditulis di `## Catatan genre` di bawah `### Catatan akurasi visual`, dengan tabel `| Adegan | Tokoh atau benda | Unsur | Pilihan di prompt | Dasar dan sumber (tingkat) | Status |`. Unsur tokoh berlembar karakter dicatat sekali dengan adegan `Lembar`; unsur latar dan properti dicatat per adegan. Status:

- **Terverifikasi:** ada sumber untuk era dan tempat itu.
- **Tafsir:** diturunkan dari sumber era atau wilayah terdekat; sumber terdekat itu disebut.
- **Rekaan:** tidak ada sumber, misalnya wajah tokoh tanpa potret atau rincian figuran; hanya untuk unsur yang tidak diklaim di narasi.
- **Dihindari:** unsur populer yang anakronistis, beserta alasannya.

Unsur yang tidak bisa diberi status Terverifikasi atau Tafsir dibuat netral (misalnya "plain dark cloth" alih-alih motif tertentu) atau dikeluarkan dari bingkai.

**Deskripsi tokoh baku**

Satu paragraf bahasa Inggris per tokoh berlembar karakter (atau per tokoh entri yang tampil sekali), ± 80 sampai 150 kata, urutan tetap:

1. Identitas: nama, usia pada masa yang digambarkan, budaya atau wilayah, status.
2. Tubuh dan wajah: perawakan, kulit, bentuk wajah, mata, alis, hidung, bibir, tanda khas, rambut.
3. Pakaian dari kepala sampai kaki: bahan atau teknik, warna, motif (dijelaskan bentuknya), cara memakai.
4. Perhiasan, senjata, dan benda khas.
5. Sikap tubuh khas yang menggambarkan wataknya, bukan pose tetap.

Deskripsi ini disalin persis ke prompt lembar karakter. Di prompt adegan, kalimat "Same character ..." yang membawa penampilannya; deskripsi adegan cukup menyebut perubahan khusus adegan itu.

**Pembeda antarentri**

Gemini cenderung membuat entri sejenis (lima raja Jawa, lima benteng) tampak mirip. Tulis tabel pembeda dengan setiap baris berbeda jelas dari yang lain dan tetap sesuai riset:

- Entri tokoh: `| Entri | Usia digambarkan | Perawakan dan wajah | Busana dan warna dominan | Benda khas |`.
- Entri non-tokoh: `| Entri | Bentuk dan siluet | Bahan dan warna | Lanskap sekitar | Waktu dan cuaca | Skala manusia |`. Bila riset menunjukkan dua entri memang mirip (misalnya dua benteng bastion VOC), bedakan lewat lanskap, waktu, cuaca, dan kegiatan manusianya, bukan dengan mengarang bentuk bangunan.
- Daftar campuran memakai kedua tabel sesuai jenis entrinya.

Di prompt adegan, tambahkan "Avoid ... resemblance to other kings in this series" atau kalimat sejenis bila dua entri berdekatan secara visual.

**Entri non-tokoh**

- **Lembar rujukan bangunan atau benda.** Isi prompt: "Reference sheet of <Nama>.", deskripsi baku (bentuk dan denah kasar, bahan, warna, ornamen, kondisi pada era yang digambarkan, ukuran relatif terhadap orang), tampak depan, samping, dan atas tiga perempat, satu panel detail bahan atau ornamen, satu figur manusia kecil sebagai skala, latar polos terang, kalimat gaya, "historically accurate ...", kalimat "Avoid ...", satu baris kosong, lalu dua baris Aturan tetap 1. Deskripsi baku ini diriset seperti busana tokoh (sumber, cek anakronisme, status di `### Catatan akurasi visual`) dan disalin persis ke lembar rujukannya. Prompt adegan merujuknya dengan "Same building as the <Nama> reference image." atau "Same object as the <Nama> reference image.".
- **Dulu dan sekarang.** Adegan masa lalu digambar sebagai rekonstruksi era itu, utuh dan dipakai, dengan elemen modern dimasukkan ke "Avoid ..." (misalnya "power lines, cars, asphalt roads, modern signage, tourists"). Hanya adegan yang di naskah ditulis sebagai masa kini boleh berlatar sekarang; adegan itu tetap bergaya vector art yang sama dan menampilkan kondisi bangunan atau benda seperti hasil riset (dipugar, reruntuhan, di dalam lemari museum).
- **Dokumen dan perjanjian.** Gemini tidak bisa menulis aksara atau teks dengan benar. Gambarkan adegan penandatanganan atau perundingan: tangan, pena bulu atau alat tulis yang sesuai era, stempel atau cap, lilin, meja, dan wajah-wajah yang tegang. Lembaran ditulis "sheets covered in illegible faint script" atau dilihat dari samping, dan "readable text, letters, words" masuk ke "Avoid ...". Nama perjanjian dan tahun dibawa teks layar.
- **Peristiwa.** Utamakan kerumunan dan figuran yang beragam (usia, perawakan, pakaian sesuai pihaknya), gerak massa, asap, debu, dan cahaya. Tidak ada satu wajah dominan kecuali tokoh nyata yang memang menjadi kunci peristiwa itu; tokoh itu mengikuti aturan lembar karakter tokoh. Pihak yang berlawanan dibedakan jelas lewat pakaian dan senjata hasil riset. Hindari kekerasan grafis: tampilkan ketegangan, momen sebelum atau sesudah benturan, atau siluet.
- **Benda dan artefak.** Bidikan dekat atau sedang dengan petunjuk skala (tangan yang memegang, meja, bantal pusaka), detail bahan dan ornamen dari riset, dan cahaya hangat yang menonjolkan teksturnya. Untuk benda yang hanya diketahui dari deskripsi tertulis, tandai wujudnya sebagai tafsir di `### Catatan akurasi visual`.
- **Budaya dan kebiasaan.** Gambarkan satu momen kegiatan dengan orang-orang yang melakukannya (figuran, beragam), di lingkungan dan dengan benda yang sesuai era dan status mereka.

**Figuran**

Figuran adalah orang yang tampil tanpa lembar karakter. Agar Gemini tidak menyalin tokoh utama ke mereka:

- Setiap figuran atau kelompok diberi ciri pembeda (usia, perawakan, wajah, rambut, pakaian sesuai status) dengan warna dan aksesori berbeda dari tokoh utama. Unsur khas tokoh utama tidak dipakai figuran.
- Figuran dalam satu kelompok juga beragam, tidak seragam seperti salinan.
- Tambahkan kalimat pembeda, misalnya "The courtiers are different people from Sultan Agung: older, plainer headcloths and no jewelry.", dan masukkan "background figures copying <Nama tokoh>'s face or outfit, identical faces" ke kalimat "Avoid ...".

**Arah pandang, ekspresi, dan gerak**

- Setiap tokoh diberi arah pandang ke sesuatu di dalam adegan; tidak ada yang menatap kamera kecuali disengaja dan tertulis di kolom visual (misalnya potret entri yang menatap penonton di adegan pertama entri nomor 1). Bila tidak disengaja, tulis "characters looking at the camera" di kalimat "Avoid ...".
- Ekspresi spesifik dari narasi dan tag emosi adegan: alis, mata, mulut, rahang, bahasa tubuh. Hindari kata umum tanpa rincian seperti "serious expression".
- Gerak dinamis: kata kerja aksi pada satu momen, berat badan bertumpu pada satu sisi, kain, asap, atau api yang ikut bergerak. Variasikan sudut kamera antaradegan. Masukkan "stiff symmetrical poses, characters standing straight and facing forward" ke kalimat "Avoid ...".

**Peta dan tulisan**

Generator gambar tidak bisa membuat peta akurat atau tulisan yang benar. Bila adegan membutuhkan wilayah, pakai "stylized antique map without any text or labels" dengan bentuk pulau yang umum, atau ganti dengan prajurit yang bergerak melintasi lanskap. Nama tempat dan angka dibawa narasi atau teks layar, bukan gambar. Masukkan "text, labels, letters" ke kalimat "Avoid ...".

**Panduan bidikan 9:16**

Video tampil di kanvas 1080 × 1920: teks layar di sepertiga atas, subtitle dan antarmuka aplikasi di ± 32% terbawah, tombol di tepi kanan ± 17%, label lapisan di kiri atas, dan Ken Burns memperbesar hingga 114%. Zona ini dijaga lewat pilihan bidikan, bukan lewat kalimat tata letak di prompt:

- Utamakan bidikan sedang atau sedang-lebar dengan wajah di sekitar tengah dan ruang di atas kepala.
- Adegan pertama setiap entri selalu punya teks layar penanda, jadi pilih isi adegan yang wajar memberi ruang di bagian atas (langit, atap, dinding, kegelapan), ditulis sebagai isi adegan.
- Prompt tidak memuat kalimat tata letak zona seperti "open space in the top third"; cukup jenis bidikan dan sudut kamera.

**Palet dan cahaya**

Palet mengikuti identitas Ulik Silam ("pelita di kegelapan masa silam"): warna tanah hangat, bayangan dalam, sumber cahaya hangat. Hindari neon atau dingin jenuh. Satu babak per entri, jadi beri tiap entri nuansa berbeda di dalam keluarga warna yang sama (misalnya entri perang lebih merah tembaga, entri pembangunan keraton lebih emas pagi), agar penonton merasakan pergantian entri. Pembuka dan adegan terakhir diutamakan redup dengan satu sumber cahaya hangat.

### 2B.2 Prompt ilustrasi

- Lembar karakter berlabel `**Lembar karakter · <Nama tokoh>**`, nama persis sama di semua prompt yang merujuknya.
- Isi prompt lembar karakter: "Character reference sheet of <Nama tokoh>.", deskripsi tokoh baku (persis), tampak depan, samping, dan belakang seluruh badan dalam sikap santai, satu potret wajah tiga perempat, satu panel detail motif kain dan perhiasan, latar polos terang, "Detailed vector art illustration, clean crisp outlines, flat colors with subtle shading", "historically accurate ..." dengan rincian dari riset, kalimat referensi visual bila ada, kalimat "Avoid ..." (anakronisme, teks, label, watermark), satu baris kosong, lalu dua baris Aturan tetap 1.
- Urutan isi setiap prompt adegan:
  1. "Same character as the <Nama tokoh> reference image." untuk setiap tokoh berlembar karakter yang tampil, dan "Same building as the <Nama> reference image." atau "Same object as the <Nama> reference image." untuk setiap bangunan atau benda berlembar rujukan; untuk tokoh entri yang tampil sekali, deskripsi tokoh bakunya; untuk entri tanpa lembar, deskripsi baku latarnya.
  2. Bidikan dan sudut kamera, tempat bernama dan bagian ruangnya, masa, waktu hari, cuaca, dan suasana.
  3. Komposisi berlapis: isi latar depan, tengah, dan belakang.
  4. Untuk setiap tokoh: aksi pada satu momen, ekspresi rinci (alis, mata, mulut, rahang), bahasa tubuh, dan arah pandang.
  5. Figuran: jumlah, peran, keragaman, reaksi, dan kalimat pembedanya.
  6. Detail sejarah dari `### Catatan akurasi visual` (arsitektur, bahan, properti, senjata, kendaraan, panji), ditulis dengan bentuk, bahan, dan warnanya, bukan hanya namanya.
  7. Cahaya: sumber, arah, dan warna, plus unsur yang bergerak (asap, debu, kain, air, api).
  8. "Detailed vector art illustration, clean crisp outlines, flat colors with subtle shading".
  9. Palet babak.
  10. "historically accurate ..." dengan rincian era, tempat, pakaian, dan arsitektur dari riset.
  11. Kalimat "Avoid ...": isi kolom Hindari, unsur berstatus Dihindari, dan yang relevan dari 2B.1, ditambah "extra or malformed hands and fingers, text, watermarks".
  12. Satu baris kosong, lalu dua baris Aturan tetap 1.
- Setiap unsur di kolom `Bidikan dan visual` adegan itu harus muncul di prompt. Panjang prompt adegan ± 120 sampai 220 kata di luar baris penutup; prompt yang jauh lebih pendek biasanya berarti ada unsur yang hilang.
- Detail visual lain (arsitektur, perabot, kendaraan, senjata) diperiksa dan dicatat di `### Catatan akurasi visual`.
- Cara pakai untuk Rafi: buat lembar karakter dulu (simpan dengan nama tokohnya), lalu unggah lembar tokoh yang tampil di setiap adegan. Kerjakan satu entri per percakapan Gemini agar tokoh antarentri tidak tercampur, dan minta ubah ke 9:16 bila hasilnya tidak vertikal.
- Perbarui baris `Jumlah ilustrasi` (adegan + lembar karakter).

Contoh prompt adegan pertama sebuah entri:

```
Same character as the Sultan Agung reference image.
Medium-wide shot from a slightly low angle, a palace courtyard at dusk with a tall dark roofline against an amber sky. Sultan Agung strides down the pendopo steps, one hand on the hilt of his keris, the other raised to halt the kneeling commanders; brows drawn low, jaw set, eyes fixed on the distant western horizon. Three commanders, weathered men of different ages in plain dark cloth and simple headcloths, kneel on the stone with heads bowed, one glancing up uneasily. The commanders are different people from Sultan Agung, with no gold jewelry. Torch flames lean in the evening wind. Foreground: the edge of the stone steps and a torch stand; middle ground: Sultan Agung and the commanders; background: the dark roof of the pendopo against the amber sky.
Detailed vector art illustration, clean crisp outlines, flat colors with subtle shading, warm earthy palette of copper, deep brown and torch gold with deep shadows, historically accurate early 17th-century Javanese court of Mataram.
Avoid characters looking at the camera, stiff symmetrical poses, background figures copying Sultan Agung's face or outfit, extra or malformed hands and fingers, text, watermarks.

Style: detailed vector art
Aspect ratio: 9:16
```

Contoh lembar rujukan bangunan:

```
Reference sheet of Benteng Rotterdam.
<deskripsi baku bangunan dari riset, disalin persis: bentuk dan denah kasar, bahan dan warna dinding, bastion, gerbang, bangunan di dalam benteng, kondisi pada akhir abad ke-17>.
Front view, side view, and three-quarter aerial view of the whole fort, plus one close-up panel of the wall stonework and gate. One small human figure beside the gate for scale. Plain light background.
Detailed vector art illustration, clean crisp outlines, flat colors with subtle shading, historically accurate late 17th-century VOC fort in Makassar.
Avoid modern buildings, power lines, cars, signage, readable text, labels, watermarks.

Style: detailed vector art
Aspect ratio: 9:16
```

Contoh prompt adegan entri tempat:

```
Same building as the Benteng Rotterdam reference image.
Wide shot from the sea at early morning, low mist over calm water and a pale gold sky above the fort walls. Small wooden boats row toward the water gate; on the nearest boat an older fisherman with a faded headcloth pulls the oars while a boy at the bow points up at the bastion. Two sentries on the wall walk slowly along the parapet, one leaning on his musket, both looking out to sea. The sentries and boatmen are varied in age and build, with plain period clothing. Gulls wheel above the flagpole. Foreground: the bow of the nearest boat and rippling water; middle ground: the sea wall and water gate; background: the bastion, the roofs inside the fort, and the pale sky.
Detailed vector art illustration, clean crisp outlines, flat colors with subtle shading, warm earthy palette of sandstone, sea grey-green and morning gold with soft shadows, historically accurate late 17th-century Makassar harbor.
Avoid characters looking at the camera, stiff symmetrical poses, modern buildings, power lines, motorboats, readable text, extra or malformed hands and fingers, watermarks.

Style: detailed vector art
Aspect ratio: 9:16
```

Isi contoh-contoh ini (busana, arsitektur, bentuk benteng, pakaian figuran) tetap harus diriset ulang untuk setiap video; jangan disalin sebagai fakta.

### 2B.3 Suara narator dan musik

**Suara narator (ElevenLabs)**

- `### Suara narator` berisi `**Model:** Eleven v3`, `**Voice:**` (pilihan Rafi; `-` bila belum dipilih), dan `**Stability:**` (default `Natural`; `Creative` lebih ekspresif dengan risiko meleset; `Robust` kurang menanggapi tag).
- Sarankan voice narator dokumenter: dalam, berwibawa, tidak terlalu teatrikal.
- Arahan per babak dalam satu baris, misalnya "Babak 6 (#1): tempo sedikit lebih lambat, paling berwibawa, berbisik di kalimat terakhir".

**Narasi lengkap (ElevenLabs)**

`### Narasi lengkap (ElevenLabs)`: seluruh narasi dengan tag, satu babak sekali generate.

- Tiap babak: baris `**Babak <n>: <nama>**`, lalu satu blok kode.
- Di dalam blok: satu paragraf per adegan, urut, dipisah satu baris kosong, format `[emotion] kalimat.`, setiap paragraf diakhiri `...` (tidak ditambah bila sudah berakhir elipsis).
- Isinya disalin dari kolom Narasi, identik. Ubah di kolom Narasi dulu bila ada perubahan tag.
- Tulis `Karakter: <n>` di bawah setiap blok (dihitung skrip).
- Babak per entri pendek (± 3 adegan); bila Rafi ingin lebih sedikit kali generate, ia boleh menggabungkan beberapa babak berurutan dalam satu generate, karena pov-produksi memotong per jeda. Sebutkan ini di arahan.

**Musik (Suno)**

- Tiga cue, dikelompokkan per entri: misalnya cue 1 untuk pembuka sampai dua entri pertama, cue 2 untuk entri tengah, cue 3 untuk nomor 1 (paling megah atau paling reflektif). Batas cue selalu di batas babak.
- Tabel cue: Cue | Babak | Durasi target | Suasana (format kontrak). **Durasi target** = jumlah durasi babak dalam rentang cue ditambah ± 5 detik untuk crossfade, dibulatkan ke atas ke kelipatan 5 detik, ditulis `m:ss`. Hitung dengan skrip.
- Isi kolom Style of Music: genre dan instrumen khas latar, suasana, perkembangan ("starts sparse ... builds ... fades ..."), durasi target dalam detik dan `m:ss` yang sama dengan tabel, BPM, "no vocals". Pengaturan: Custom, Instrumental, Exclude Styles untuk instrumen yang tidak diinginkan.
- Suno belum tentu menepati durasi. Cue terlalu pendek di-Extend (pov-produksi juga mengulang cue); terlalu panjang dipotong atau dipudarkan.
- Tips: 2 sampai 4 variasi per cue, crossfade 1 sampai 2 detik, cek lisensi paket Suno sebelum monetisasi.

### 2B.4 Efek suara

- Claude tidak bisa membuat SFX organik yang akurat; katakan terus terang bila ditanya.
- **Bunyi penanda entri:** satu bunyi tetap yang sama di adegan pertama setiap entri (misalnya pukulan gong kecil atau dentang kenong), menjadi ritme khas format daftar. Di tabel, satu baris per adegan pertama entri dengan bunyi dan kata kunci yang sama, agar Rafi cukup menyiapkan satu berkas. Tulis di kolom Bunyi bahwa bunyi ini diputar di awal adegan.
- Tabel: # | Adegan | Bunyi | Kata kunci pustaka | Prompt generator AI (format kontrak). Pustaka: CapCut, Pixabay, YouTube Audio Library, Freesound CC0; generator: misalnya ElevenLabs Sound Effects.
- Tandai bunyi yang sulit dan beri cadangan.
- Isi baris `**Adegan hening:**` sesuai penanda Momen hening di naskah.

### 2B.5 Kartu Ulikan

Tampil 3,5 detik langsung setelah adegan terakhir dan meninggalkan satu hal untuk diulik lebih jauh.

- Isi **satu** fakta atau satu pertanyaan, maksimal ±15 kata dan idealnya 10 sampai 12 kata (hitung dengan skrip), dalam Bahasa Indonesia.
- Untuk format daftar, pilihan yang kuat: kandidat yang nyaris masuk ("Nyaris masuk daftar: Amangkurat I, yang memindahkan keraton ke Plered."), jejak entri hari ini, atau pertanyaan peringkat ("Siapa yang menurutmu pantas jadi nomor satu?"). Jangan mengulang narasi.
- Untuk entri tempat atau benda, info yang bisa dikunjungi hari ini juga kuat, misalnya bangunan yang kini menjadi museum atau benda yang dipamerkan di museum tertentu. Ini fakta masa kini, jadi diverifikasi ke sumber terbaru (2A.4) dan tidak ditulis bila statusnya tidak pasti (misalnya sedang dipugar atau tutup).
- Fakta wajib terverifikasi dan dicatat di tabel verifikasi dengan adegan "(kartu Ulikan)". `Sumber` diisi singkat; untuk pertanyaan boleh `-`.
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
- Caption tidak membocorkan nomor 1 di baris pembuka.

**Judul**

- Format seri: `<Angka> <Kategori> <Sifat> <Latar>`, misalnya "5 Raja Paling Berpengaruh di Mataram Islam". Untuk kumpulan: "4 Perjanjian yang Memecah Mataram". Angka ditulis sebagai digit di awal.
- YouTube Shorts memakai judul terpisah: batas 100 karakter; usahakan ±60 karakter atau kurang. Hitung dengan skrip.
- TikTok tidak memakai baris judul terpisah; baris pembuka caption mengambil fungsi judul.
- Tawarkan 3 pilihan judul saat menyerahkan 2B; yang terkuat dipakai, sisanya ditulis sebagai alternatif.

**Caption** (urutan isi)

1. **Baris pembuka** ±80 sampai 100 karakter atau kurang: hook atau pertanyaan, tidak mengulang judul kata per kata.
2. **Konteks** 1 sampai 3 kalimat: cakupan daftar dan kriterianya.
3. **Ajakan komentar:** satu pertanyaan, biasanya tentang peringkat ("Setuju dengan nomor satunya? Atau ada raja lain yang lebih pantas?").
4. **Penanda:** "Peringkat disusun Ulik Silam berdasarkan <kriteria singkat>; ilustrasi adalah rekonstruksi. Sumber utama: <1 sampai 2 sumber singkat>." Untuk kumpulan, kalimat pertamanya diganti "Daftar disusun Ulik Silam berdasarkan <syarat>". Bila ada bagian kisah tradisional, tambahkan "Sebagian kisah bersumber dari <nama kisah>."
5. **Hashtag** di baris terakhir.

Panjang total ±300 sampai 600 karakter.

**Hashtag**

- 3 sampai 5 per platform, tanpa spasi: 1 tag merek (`#UlikSilam`, CamelCase), 1 tag genre (`#sejarah`, `#sejarahindonesia`, atau `#history`), 1 sampai 2 tag topik (kerajaan, tokoh, atau peristiwa, misalnya `#mataramislam`, `#sultanagung`), opsional 1 tag kategori (misalnya `#rajajawa`). Tag selain merek huruf kecil.
- Tidak memakai `#pov` (format ini bukan POV). Hindari `#fyp`, `#foryou`, `#viral`, tag yang tidak relevan, dan tag bernada SARA atau kekerasan.
- YouTube: hashtag di akhir caption; hingga tiga tampil di dekat judul, jadi yang terpenting di depan.

**Format di dokumen** (sesuai kontrak)

````
### YouTube Shorts

**Judul:** 5 Raja Paling Berpengaruh di Mataram Islam

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
- [ ] Setiap tokoh entri yang wajahnya tampil di 2 adegan atau lebih punya lembar karakter berlabel `**Lembar karakter · <Nama tokoh>**`; setiap rujukan "Same character as the <Nama tokoh> reference image." merujuk nama yang ada; tokoh yang tampil sekali punya deskripsi baku lengkap di promptnya.
- [ ] Setiap bangunan atau benda kunci yang tampil di 2 adegan atau lebih punya lembar rujukan berlabel `**Lembar karakter · <Nama>**` dengan figur skala; setiap "Same building/object as the <Nama> reference image." merujuk nama yang ada.
- [ ] Tabel pembeda antarentri ada (versi tokoh dan/atau non-tokoh) dan setiap baris berbeda jelas; busana dan bangunan tiap entri diriset untuk eranya sendiri dan tercatat di `### Catatan akurasi visual`; tidak ada unsur anakronistis.
- [ ] Adegan masa lalu tidak memuat elemen modern (tercantum di "Avoid ..."); adegan dokumen tidak meminta teks terbaca; adegan peristiwa tanpa kekerasan grafis.
- [ ] Setiap prompt adegan memuat semua unsur kolom `Bidikan dan visual`, komposisi berlapis, dan cahaya; panjangnya ± 120 sampai 220 kata (dihitung skrip).
- [ ] Setiap unsur sejarah di prompt (busana, arsitektur, properti, senjata, kendaraan, lanskap) tercatat di `### Catatan akurasi visual` dengan adegan, sumber bertingkat, dan status; tidak ada unsur tanpa status, dan unsur tanpa sumber sudah dibuat netral.
- [ ] Deskripsi tokoh baku disalin persis ke prompt lembar karakternya (dicocokkan dengan skrip).
- [ ] Setiap tokoh di prompt punya gerak, ekspresi, dan arah pandang; tatapan ke kamera hanya di adegan yang menyengajanya.
- [ ] Setiap prompt dengan figuran punya kalimat pembeda; tidak ada peta bertulisan dan tidak ada kalimat tata letak zona.
- [ ] Bunyi penanda entri ada di tabel SFX untuk adegan pertama setiap entri.
- [ ] Setiap blok Style of Music memuat durasi target yang sama dengan tabel cue; batas cue di batas babak.
- [ ] `### Narasi lengkap (ElevenLabs)` ada, satu blok per babak, identik dengan kolom Narasi (dicocokkan dengan skrip setelah `...` penutup paragraf diabaikan), jumlah karakter tercatat.
- [ ] `### Suara narator` memuat Model, Voice, Stability, dan arahan per babak; tag suara tidak ada di teks layar, kartu Ulikan, judul, caption, atau baris narasi di bagian prompt.
- [ ] Judul YouTube ≤ 100 karakter (dihitung skrip); baris pembuka caption ≤ ±100 karakter dan tidak membocorkan nomor 1; 3 sampai 5 hashtag; penanda peringkat ada di setiap caption.
- [ ] Setiap fakta di judul, caption, dan kartu Ulikan ada di tabel verifikasi dan memenuhi aturan bukti 2A.4; fakta baru di bagian ini ikut diperiksa silang (2A.4a).
- [ ] Kartu Ulikan terisi (Teks ≤ ±15 kata, Sumber untuk fakta); `Lapisan` = `Sejarah` atau `Sejarah, Legenda`; `Latar` tanpa tahun.
- [ ] Dokumen lolos daftar periksa Kontrak KONSEP.md v1.3.

Serahkan dengan satu baris ringkasan, 3 pilihan judul, 2 pilihan isi kartu Ulikan, sebutkan cadangan alat yang dipakai (bila ada), lalu tanyakan apakah Rafi menyetujui konsep atau mengubah bagian tertentu. **Berhenti dan tunggu.**

### 2B.8 Serah terima ke pov-produksi

Setelah Rafi menyetujui konsep:

1. Isi baris `Versi` dengan `v1 · <tanggal>`.
2. Ekspor dokumen ke `KONSEP.md` dan kirim sebagai file.
3. Sampaikan dalam dua kalimat: produksi dilanjutkan dengan skill pov-produksi, paling nyaman di Claude Code di laptop Rafi, dengan prompt pembuka seperti "Kerjakan produksi video dari KONSEP.md ini dengan skill pov-produksi. Ini video format daftar bernarator dokumenter: semua bidikan B, angka entri ada di teks layar."
4. Jangan membangun proyek Remotion atau paket bahan di skill ini.

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
| **Tukar urutan entri** (misalnya #2 menjadi #1) | Urutan babak dan nama babak, teks layar penanda entri, penomoran adegan di semua bagian, `### Narasi lengkap (ElevenLabs)`, tabel SFX, Adegan hening, rentang dan durasi target cue, palet per babak, Waktu, `### Dasar peringkat`, kalimat jembatan antarentri dan penutup, caption | Tabel pemetaan nomor lama → baru; rekaman babak yang kalimat jembatan atau penutupnya berubah; ilustrasi tidak perlu diulang bila isinya sama |
| **Ganti atau tambah entri** | Riset kandidat baru (1.3), verifikasi, naskah entri itu, lembar karakter, pembeda antarentri, dan semua yang ada di baris "tukar urutan" | Rekaman, ilustrasi, dan lembar karakter entri baru; pemetaan nomor |
| Tambah, hapus, gabung, atau pindah adegan dalam satu entri | Penomoran ulang di naskah, prompt, narasi lengkap, SFX, Adegan hening, cue musik, Waktu, `Jumlah ilustrasi`, struktur | Pemetaan nomor; rekaman dan ilustrasi adegan baru |
| Kriteria peringkat | `Kriteria` di Ringkasan, `### Dasar peringkat`, hook, caption; periksa apakah urutan masih sah | Rekaman pembuka bila kriteria disebut di narasi |
| Penampilan tokoh, bangunan, atau benda | Deskripsi baku, pembeda antarentri, catatan akurasi visual, lembar karakter atau lembar rujukan, semua prompt yang memuatnya | Lembar dan ilustrasi yang memuatnya |
| Fakta masa kini (status bangunan, lokasi benda) | Verifikasi ulang ke sumber terbaru, lalu narasi adegan masa kini, kartu Ulikan, dan caption yang memakainya | Rekaman adegan yang narasinya berubah |
| Fakta | Verifikasi ulang (2A.4), lalu narasi, teks layar, judul, dan caption yang memakainya | Rekaman babak atau adegan yang narasinya berubah |
| Suasana atau batas babak | Tabel palet, cue musik | Cue musik terkait |
| Judul, caption, atau hashtag | Bagian itu saja, plus pemeriksaan caption (2B.7) | - |
| Kartu Ulikan | Bagian itu, plus verifikasi fakta barunya | - (dirender dari data) |
| Teks layar | Kolom Teks layar | - (dirender dari data) |

Kasus khusus dari pov-produksi:

- **Narasi berbeda dari rekaman:** bila rekamannya lebih baik dipertahankan, narasi di konsep disamakan dengan rekaman, tetapi verifikasi setiap fakta baru di dalamnya; bila tidak, usulkan generate ulang adegan itu.
- **Durasi lewat batas:** usulkan kalimat atau adegan yang dipangkas, dimulai dari yang bukan momen wajib, bukan hook, dan bukan adegan penanda entri; menjaga keseimbangan antarentri. Rafi yang memilih.
- **Ilustrasi tidak bisa dibuat Gemini:** usulkan bidikan pengganti (dari belakang, siluet, benda simbolis, lanskap) tanpa mengubah narasi.

**Bukan revisi lagi:** jika lebih dari separuh entri berganti, jenis daftar berubah (peringkat menjadi kumpulan), atau topiknya berubah, sampaikan bahwa ini lebih tepat dikerjakan sebagai konsep baru dari Tahap 1, dan tanyakan pilihan Rafi.

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

- [ ] Daftar periksa Kontrak KONSEP.md v1.3 dijalankan ulang untuk seluruh dokumen.
- [ ] Butir 2A.5 untuk adegan yang narasinya berubah; butir 2B.7 untuk prompt, audio, kartu Ulikan, dan caption yang berubah.
- [ ] Klaim baru atau yang berubah sudah diverifikasi dengan aturan bukti 2A.4 dan diperiksa silang (2A.4a); unsur visual baru tercatat di `### Catatan akurasi visual`.
- [ ] Teks layar penanda entri cocok dengan nama babak dan urutan terbaru.
- [ ] Jumlah kata dan perkiraan durasi masih sesuai tabel 2A.2.
- [ ] Baris `Versi` naik dan Riwayat revisi terisi; pemetaan nomor ada bila ada penomoran ulang.

Serahkan:

1. `KONSEP.md` hasil ekspor ulang sebagai file.
2. Ringkasan perubahan: versi baru, adegan yang berubah, aset yang harus dibuat ulang, dan tabel pemetaan nomor bila ada.
3. Bila produksi sudah berjalan, prompt lanjutan: "KONSEP.md diperbarui ke v<n>. Perbarui proyek dari KONSEP.md ini dengan skill pov-produksi (Tahap 5: Pembaruan konsep)."

**Berhenti dan tunggu.**

## Kontrak KONSEP.md v1.3

Format ini dibaca otomatis oleh skill pov-produksi dan harus identik dengan kontrak di skill itu. Konsep v1 tetap terbaca: bagian dan baris baru di v1.1, v1.2, dan v1.3 boleh tidak ada, dan label lama lembar karakter tetap diterima. Judul bagian `##` ditulis persis seperti di bawah dan berurutan. Bagian bertanda (opsional) boleh tidak ada. Skill ini selalu mengisi `Lapisan`, `Latar`, dan `## Kartu Ulikan`; untuk format daftar, `Posisi "kamu"` diisi `Tidak ada (format daftar, narator dokumenter)` dan setiap kolom `Bidikan dan visual` diawali `B.`.

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
