# Sampul per platform (TikTok dan YouTube) dengan posisi gambar yang bisa diseret

Tanggal: 2026-11-23 · Disetujui Rafi di percakapan.

## Mengapa

Sampul 9:16 kadang terpotong di TikTok: grid profil memotongnya menjadi 3:4 di tengah (240 px atas dan bawah hilang). Label lapisan (y 200–260) jatuh di area itu, dan wajah di bagian atas gambar bisa ikut terpotong. Rafi ingin sampul TikTok dan YouTube terpisah, dan ingin mengatur posisi gambar dengan menyeret di pratinjau.

## Tujuan

- Dua sampul dari tab Render: TikTok (aman untuk potongan 3:4) dan YouTube (tata letak seperti sekarang).
- Posisi dan zoom gambar diatur dengan menyeret di pratinjau, per platform, dan tersimpan di `proyek.yaml`.
- Mode TikTok menampilkan garis potong 3:4 agar terlihat apa yang hilang.

## Bukan tujuan

- Menyeret teks, label, atau logo (posisi mengikuti aturan merek).
- Judul atau gambar adegan berbeda per platform (tetap satu `adegan` dan `judul`).
- Ukuran kanvas lain (keduanya 1080 × 1920).

## Pendekatan

- **A. Dua sampul terpisah + seret posisi (dipilih).** YouTube tidak dikorbankan oleh aturan potong TikTok; posisi gambar bisa beda per platform.
- B. Satu sampul aman 3:4 untuk keduanya. Lebih sederhana, tetapi sampul YouTube ikut menyempit tanpa perlu dan posisi tidak bisa dibedakan.

## Desain

**Data (`proyek.yaml`)**: `sampul: {"adegan", "judul", "tiktok": {"x","y","skala"}, "youtube": {"x","y","skala"}}`. `x` dan `y` dalam % kanvas (−50…50), `skala` 1–1,5. Kunci yang tidak ada = bawaan `{x:0, y:0, skala:1}`. Proyek lama dengan `sampul` tanpa kunci platform tetap terbaca.

**Komposisi `Sampul` (`paket/video`)**: prop `geserBawah` diganti `platform` (`tiktok` | `youtube`) dan `posisi` (`{x, y, skala}`). Gambar ditampilkan dengan `translate(x%, y%) scale(skala)`; di bawahnya selalu ada gambar yang sama diburamkan dan diredupkan sehingga celah saat digeser tidak hitam. TikTok: label lapisan turun ke y 280 (di dalam area 3:4); judul (bawah 520) dan logo (bawah 420) sudah di dalam area 3:4. YouTube: tata letak sekarang.

**`siapkan.mjs`**: membaca `sampul.tiktok` dan `sampul.youtube` ke `data.sampul.posisi`.

**`render.mjs`**: `--sampul` merender keduanya; `--sampul=tiktok` atau `--sampul=youtube` salah satu. Keluaran `<slug>-<tanggal>-<versi>-sampul-tiktok.png` dan `-sampul-youtube.png`.

**Katalog (tab Render, blok Sampul)**: sakelar TikTok | YouTube di atas pratinjau; lapisan transparan di atas Player menangkap seret (piksel layar dikonversi ke % kanvas) dan roda mouse/penggeser untuk zoom; tombol Kembalikan posisi; di mode TikTok dua garis putus-putus di y 240 dan 1680 dengan area luar diredupkan (hanya di pratinjau, tidak ikut render). Tombol "Render sampul TikTok" dan "Render sampul YouTube" menyimpan pilihan dulu bila berubah. Server menerima jenis `sampul-tiktok` dan `sampul-youtube`, dan validasi PATCH `sampul` menerima kunci `tiktok` dan `youtube`.

## Diputuskan Claude

- Satuan posisi % kanvas (bukan px) agar tetap benar bila ukuran kanvas berubah.
- Batas geser ±50% dan zoom 1–1,5 agar gambar tidak hilang dari kanvas.
- Label TikTok di y 280 (40 px di bawah garis potong).
