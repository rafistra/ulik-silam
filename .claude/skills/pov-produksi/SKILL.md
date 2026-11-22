---
name: "pov-produksi"
description: "Gunakan saat Rafi ingin memproduksi video 9:16 Ulik Silam dari KONSEP.md (POV, narasi, daftar; genre apa pun) di repo ulik-silam: menyiapkan proyek dan aset, memotong narasi, data peta, pemeriksaan aset, render lewat komposisi Remotion bersama (katalog atau npm run render), dan pembaruan dari KONSEP.md versi baru. Bukan untuk brainstorming atau menulis naskah."
---

# POV Produksi: dari KONSEP.md sampai video jadi

Skill ini mengubah KONSEP.md yang sudah disetujui menjadi video final **Ulik Silam** lewat repo `ulik-silam`. Sejak 22 November 2026 semua video dirender dari **satu komposisi Remotion bersama** (`paket/video`, komposisi `VideoUlikSilam`, `Sampul`, `LembarIkon`) yang digerakkan data; skill ini **tidak lagi membuat proyek Remotion per video**. Isi cerita tidak dinilai ulang di sini: naskah, fakta, prompt, dan caption sudah disetujui di skill genre. Komunikasi dengan Rafi dalam Bahasa Indonesia.

Skill ini paling nyaman dijalankan di Claude Code di dalam repo `ulik-silam` di laptop Rafi (Windows), karena aset dan render ada di sana. Baca `CLAUDE.md` dan `README.md` repo di awal sesi.

## Peta repo yang dipakai

| Tempat | Isi |
| --- | --- |
| `proyek/<slug>/KONSEP.md` | Sumber kebenaran isi (Kontrak v1.5, di bawah) |
| `proyek/<slug>/proyek.yaml` | Tahap produksi, prioritas, catatan, tautan, metrik. `STATUS.md` dibuat ulang dari semua berkas ini |
| `proyek/<slug>/setelan.json` | Setelan tangan per video (opsional, lihat 2.4) |
| `$ASET_DIR/proyek/<slug>/` (bawaan `aset/proyek/<slug>/`, diabaikan git) | Folder aset: `ilustrasi/`, `narasi/`, `musik/`, `sfx/`, `peta/`, `merek/`, `font/`, dan `render/` |
| `$ASET_DIR/_cache/<slug>/` | Simpanan mesin (jeda narasi, palet peta, props render); boleh dihapus |
| `paket/urai-konsep` | Pengurai KONSEP.md bersama (`npm run urai`) |
| `paket/video` | Komposisi bersama, `siapkan.mjs` (data dari KONSEP.md + aset), `render.mjs`, `alat.mjs` |
| `aplikasi/katalog` | Katalog lokal (`npm run katalog`): pratinjau, cek aset, prompt dan teks siap salin, tombol render |
| `pustaka/` | Aset pakai ulang (tokoh, musik, SFX) beserta kartunya; berkasnya di `$ASET_DIR/pustaka/` |

Proyek lama (sebelum repo) tetap di folder `pov/` (`arsip_lama` di proyek.yaml); asetnya dibaca dari `pov/<slug>/public/` dan tidak pernah ditulis.

## Aturan tetap

1. **KONSEP.md adalah sumber kebenaran isi.** Narasi, teks layar, prompt, caption, lapisan, dan kartu Ulikan dibaca langsung dari KONSEP.md oleh pengurai; tidak ada salinan kedua yang bisa berbeda. Skill ini tidak pernah mengubah isi, termasuk saat rekaman diimprovisasi atau durasi kelebihan: perbedaannya dilaporkan, diperbaiki di skill genre (Tahap R), lalu masuk lewat Tahap 5.
2. **Satu komposisi untuk semua video.** Tampilan (warna, huruf, zona aman, label lapisan, subtitle, kartu Ulikan, peta) hanya diubah di `paket/video`, dan perubahan itu berlaku untuk semua video berikutnya. Yang berbeda antar-video hanya isi, aset, dan `setelan.json`. Sesudah mengubah `paket/video`, ulangi uji kesamaan (2.6).
3. **Penutup prompt dibaca dari konsep**, tidak ditanam di skill ini.
4. **Berhenti di setiap akhir tahap.** Kerjakan satu tahap, jalankan pemeriksaannya, serahkan, lalu tunggu Rafi bilang lanjut.
5. **Tidak membuat aset kreatif.** Narasi suara, ilustrasi, musik, dan SFX dibuat Rafi. Aset uji hanya untuk menguji dan dihapus sebelum diserahkan.
6. **Pustaka dulu.** Sebelum Rafi membuat lembar karakter, cue, atau SFX baru, cek `pustaka/` (atau halaman Pustaka di katalog) untuk aset disetujui yang bisa dipakai ulang, dan tawarkan.
7. **Folder lama hanya dibaca.** Alat di `paket/video` menolak menulis ke `pov/`. Proyek lama yang perlu diproduksi ulang dipindahkan asetnya ke `$ASET_DIR/proyek/<slug>/` dulu, atas persetujuan Rafi.

## Alat dan cadangannya

| Kebutuhan | Alat utama | Cadangan |
| --- | --- | --- |
| Node, Remotion, ffmpeg | Shell lokal (Claude Code) di repo | ffmpeg di PATH tidak wajib: `paket/video/ffmpeg.mjs` memakai ffmpeg bawaan Remotion |
| Render | Tombol Render di katalog, atau `npm run render -- <slug>` | `--browser=<path Chrome>` bila Chrome Headless Shell tidak bisa diunduh |
| Pratinjau dan cek visual | Pemutar Pratinjau di katalog | `npm run render -- <slug> --frames=a-b`, atau still lewat Remotion Studio (`--studio`) |
| Teks dan prompt untuk Rafi | Halaman konsep di katalog (tombol salin) | Kutip dari KONSEP.md di chat |
| Token dan logo merek | `merek/` di repo | Sistem desain Ulik Silam lewat alat Artifact |

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

### Aset merek

Tanda (`mata-nyala.svg`) dan wordmark (`wordmark-krem.svg`) ada di `merek/logo/` repo, font di `merek/font/`. Saat data proyek disiapkan, keduanya disalin otomatis ke `merek/` dan `font/` di folder aset proyek bila belum ada; jangan menggambar ulang atau mengetik wordmark dengan font. Bila sistem desain berubah, perbarui `merek/` lebih dulu (lihat CLAUDE.md repo), lalu `paket/video/src/lib/merek.ts`. Tidak ada SFX merek: pembuka nyala dan `desis-api` tidak dipakai lagi sejak Oktober 2026.

### Urutan video (sudah diterapkan di `paket/video`)

Video langsung dibuka dengan adegan 1 di frame 0; tidak ada pembuka nyala (dihapus Oktober 2026). Musik cue 1 mulai di adegan 1.

1. **Label lapisan** muncul di adegan 1 (fade masuk 8 frame), di kiri atas tepat di zona aman (x 72, y 200), bertahan 3 dtk lalu memudar. Bila `Lapisan` berisi dua nilai, dua label tampil berdampingan dengan jarak 16 px, lapisan utama di kiri. Lapisan Rekaan tidak boleh dikecilkan atau disembunyikan.
2. **Adegan** dengan Ken Burns, subtitle, dan teks layar seperti di komposisi bersama; adegan peta animasi seperti bagian Peta animasi.
3. **Kartu Ulikan (105 frame, 3,5 dtk, selalu ada).** Langsung setelah adegan terakhir, tanpa kalimat penutup tetap dari narator. Ilustrasi adegan terakhir tetap tampil sebagai latar kartu dan Ken Burns-nya berlanjut tanpa lompatan (arah dan kecepatan sama). Dalam 15 frame pertama ilustrasi itu diredupkan dengan lapisan `latar` ber-opacity 0,72 (gambar tersisa ± 28%) dan diberi blur 8 px. Kotak kartu masuk bersamaan (fade 12 frame dan naik 24 px). Di atasnya: kotak `latarNaik` (kiri 72 px, kanan 180 px, atas 520 px, padding 48 px, sudut 20 px, garis 2 px `garis`, jarak antar-baris 32 px) berisi penanda ULIKAN (`label`, `pelita`), teks (`isi`, `tinta`), dan sumber (`keterangan`, `tintaRedup`) bila ada. Di bawahnya, tengah horizontal dan 560 px dari bawah: tanda 88 px + wordmark tinggi ± 96 px berdampingan dengan jarak 14 px. Pada 30 frame terakhir seluruh layar memudar ke `latar` penuh, dan musik memudar 1 dtk di akhir kartu. Bila ilustrasi adegan terakhir belum ada, placeholder-nya yang diredupkan.

## Tahap 1: Validasi konsep

Hasil tahap ini: laporan singkat bahwa KONSEP.md bisa diproduksi, atau daftar masalah.

1. Pastikan `proyek/<slug>/KONSEP.md` ada di repo. Bila Rafi hanya punya dokumen Docs, ekspor ke markdown lalu simpan di sana. Bila folder proyek belum ada, buat `proyek/<slug>/proyek.yaml` dengan `judul`, `slug`, `format`, `lapisan`, `latar`, `seri`, `tahap: Naskah terverifikasi`, `platform`, dan `versi_konsep`, lalu jalankan `python3 scripts/buat-status.py`.
2. Jalankan `npm run urai -- proyek/<slug>/KONSEP.md` (tab Verifikasi di katalog menampilkan hasil yang sama). Masalah kontrak memblokir; peringatan dan penyesuaian dilaporkan.
3. Durasi: pengurai melaporkan perkiraan durasi pada 130 sampai 135 kata per menit, termasuk jeda (0,9 dtk per adegan, 1,5 dtk per adegan hening, ± 0,5 dtk per tag bunyi dan elipsis) dan 3,5 dtk kartu Ulikan. Bandingkan dengan durasi maksimum.
4. **Kesiapan merek:**
   - `Lapisan` berisi satu atau dua dari Sejarah, Legenda, Mitos, Rekaan, tanpa duplikat. Bila salah satunya Rekaan, ingatkan bahwa caption juga harus menyebut bahwa kisahnya rekaan.
   - Kartu Ulikan ada, paling banyak ±15 kata; fakta wajib punya `Sumber`, pertanyaan boleh `-`.
   - Tag suara hanya di kolom Narasi dan `### Narasi lengkap (ElevenLabs)`; bila ada tag, `**Model:**` harus Eleven v3. Bila `### Narasi lengkap (ElevenLabs)` berbeda dari kolom Narasi, sebutkan adegannya; kolom Narasi yang dipakai.
   - **Peta animasi:** setiap adegan bertanda `**Peta animasi**` punya `### Adegan <n>` di `## Peta animasi` dan sebaliknya; minimal dua titik; bingkai memuat semua titik; setiap `Pemicu` (selain `awal` dan `-`) tertulis di narasi adegan itu; ikon `umum:` ada di pustaka ikon (`paket/video/src/peta/ikon/`); ikon `khusus:` punya entri lengkap; batas punya tahun, sumber, gaya, status, dan tidak sesudah masa adegan.
   - Penutup prompt menyebut vector art dan rasio 9:16; bila tidak, beri peringatan (bukan pemblokir).
5. **Format lama** (sebelum kontrak v1): laporkan penyesuaian yang dilakukan pengurai (kolom gabungan, slug turunan, versi v1, model Eleven v3). Bila `## Kartu Ulikan` tidak ada, minta teks dan sumbernya (satu pertanyaan) atau arahkan ke skill genre; jangan mengarangnya.

Serahkan ringkasan (adegan, kata, perkiraan durasi termasuk kartu Ulikan, lapisan, penyesuaian, masalah). Bila tidak ada pemblokir, akhiri dengan "Lanjut ke persiapan aset?". **Berhenti dan tunggu.**

## Tahap 2: Persiapan aset

Hasil tahap ini: folder aset proyek siap diisi, daftar aset yang harus dibuat Rafi (dengan aset pustaka yang bisa dipakai ulang), dan proyek yang sudah bisa dipratinjau.

### 2.1 Folder dan tahap

- Buat `$ASET_DIR/proyek/<slug>/` dengan subfolder `ilustrasi/`, `narasi/`, `musik/`, `sfx/` (dan `peta/` bila ada adegan peta). Font dan logo disalin otomatis dari `merek/` saat data disiapkan.
- Ubah `tahap` di proyek.yaml menjadi `Aset` (lewat Papan di katalog atau tulis langsung, lalu `python3 scripts/buat-status.py`). Periksa batas kerja: paling banyak 2 proyek di tahap Aset dan Rakit & render. Bila penuh, beri tahu Rafi dan tanyakan proyek mana yang ditunda.

### 2.2 Pustaka

Cari di `pustaka/` (status `disetujui`) tokoh, musik, dan SFX yang cocok dengan konsep: tokoh yang sama atau sejenis (era, wilayah, peran), cue dengan suasana dan instrumen serupa, dan SFX dengan kata kunci yang sama. Sajikan sebagai tabel usulan (kebutuhan di konsep → kartu pustaka); bila Rafi setuju, salin berkasnya dari `$ASET_DIR/pustaka/<jenis>/<id>/` ke folder aset proyek dengan nama yang diharapkan (2.3). Lembar karakter dari pustaka dipakai sebagai gambar acuan di Gemini, bukan ilustrasi adegan.

### 2.3 Nama berkas yang diharapkan

| Aset | Berkas di folder aset proyek |
| --- | --- |
| Ilustrasi adegan | `ilustrasi/adegan-NN.<png/jpg/webp>`; sampul khusus opsional `ilustrasi/sampul.*` |
| Narasi | `narasi/babak-N.<ext>` (satu rekaman per babak; bila babak dibagi dua: `babak-N-a`, `babak-N-b`), dipotong menjadi `narasi/potongan/adegan-NN.wav`; pengganti satu adegan `narasi/adegan-NN.<ext>` |
| Titik potong manual | `narasi/babak-N.waktu.json` (daftar detik) |
| Musik | `musik/cue-N-<nama-cue-kebab>.<ext>` (nama cue dari tabel Musik di KONSEP.md) |
| SFX | `sfx/sfx-NN-<bunyi-kebab>.<ext>` (bunyi yang sama di beberapa nomor memakai satu berkas, dinamai dari kemunculan pertama) |
| Peta | `peta/<nama>.geojson`, `peta/panggung-NN.*` (opsional), `peta/ikon/<slug>.png` untuk ikon khusus, `peta/adegan-NN.waktu.json` (opsional) |

`npm run render -- <slug> --cek` dan tab Aset di katalog menyebut nama persis setiap berkas yang belum ada. Ekstensi bebas.

### 2.4 Setelan per video (`proyek/<slug>/setelan.json`)

Opsional. Kuncinya sama dengan nama di `paket/video/src/data/setelan.ts`, dan yang tidak diisi memakai bawaan. Yang paling sering dipakai:

- `SETELAN_ADEGAN`: per nomor adegan, `gerak` (`zoom-masuk`, `zoom-keluar`, `geser-atas`, `geser-bawah`), `posisiTeksLayar` (`atas`/`tengah`), `kataKunci`, `teksLayarAkhir` (detik), atau `kenBurns` `{ "skala": [awal, akhir], "geserY": [awal, akhir] }` untuk menggeser gambar yang wajahnya tertutup subtitle.
- `SETELAN_SFX` (detik, volume, ulang), `SETELAN_MUSIK` (ulang, sunyiMulaiAdegan, fadeSunyi), `SETELAN_AUDIO` (volume narasi, musik, musikHening, crossfade, sfx).
- `GELAP_AWAL`, `GELAP_SESUDAH`, `ADEGAN_FOTO_UTUH`, `TEKS_LAYAR_BAIT`, `SAMARKAN_SUBTITLE`, `POTONG_SUBTITLE`, `FRASA_NARASI`, `SISIP_JEDA`, `SAMPUL_ADEGAN`, `SETELAN_PETA` (`kamera`: `otomatis`, `tetap`, `ikuti`).

Contoh: `{ "SETELAN_ADEGAN": { "6": { "kenBurns": { "skala": [1.14, 1.1], "geserY": [-6, -4.5] } } } }`. Setelan hanya mengubah tampilan dan pewaktuan, tidak pernah isi.

### 2.5 Bahan untuk Rafi

Semua bahan dibaca langsung dari KONSEP.md di halaman konsep katalog, dengan tombol salin: prompt lembar karakter dan adegan (tab Lembar karakter dan Naskah), teks ElevenLabs per babak dan arahan suara (tab Audio), Style of Music dan Exclude Styles per cue, daftar SFX dengan prompt, serta judul dan caption per platform. Tidak perlu membuat folder `bahan/`. Bila teks satu babak melebihi batas karakter ElevenLabs (± 3.000), sarankan membaginya di batas adegan menjadi `babak-N-a` dan `babak-N-b`.

Serahkan urutan produksi untuk Rafi:

1. Narasi per babak di ElevenLabs (Eleven v3) dari tab Audio, simpan sebagai `narasi/babak-N.<ext>`.
2. Lembar karakter (atau dari pustaka), lalu ilustrasi per adegan dari tab Naskah.
3. Cue musik dan SFX (atau dari pustaka); berkas peta yang diminta bila ada.
4. Taruh semua di folder aset sesuai 2.3, lalu minta pemeriksaan sebelum render.

**Berhenti dan tunggu.**

### 2.6 Uji kesamaan (hanya bila `paket/video` diubah)

Setiap perubahan di `paket/video` diuji dengan proyek acuan Kayan part 2 (`narasi-perpindahan-kayan-miau-baru-part-2`): `npx tsc --noEmit` di `paket/video` lolos, durasi dari `npx remotion compositions` tetap 5.306 frame, dan still di frame 20, 400, 1200, 2400, dan 4000 dibandingkan dengan render lama di `pov/.../out/` (beda piksel rata-rata wajarnya di bawah ± 4 dari 255 karena kompresi). Perubahan tampilan yang memang disengaja disebutkan dan tidak dianggap gagal.

## Tahap 3: Pemeriksaan sebelum render

Dijalankan saat Rafi kembali dengan aset.

- [ ] `npm run render -- <slug> --cek` (atau tab Aset): semua ilustrasi, narasi, musik, SFX wajib, dan merek ada; laporkan yang kurang atau salah nama, dan tawarkan mengganti nama bila jelas cocok.
- [ ] `npm run alat -- potong <slug>` berhasil untuk setiap babak. Laporkan potongan yang ditandai menyimpang (lebih dari 40% dari perkiraan kata), dengarkan batas adegannya lewat Pratinjau, dan bila salah potong bantu Rafi mengisi `narasi/babak-N.waktu.json`, lalu potong ulang.
- [ ] Durasi dari rekaman (tampil di Pratinjau dan di peringatan render) di bawah batas. Bila lewat, laporkan kelebihannya dan adegan yang bisa dipangkas; pemangkasan dikerjakan di skill genre (Tahap R) lalu masuk lewat Tahap 5.
- [ ] Tanyakan apakah ada kata yang berbeda dari teks (ElevenLabs bisa melewatkan, mengulang, atau menambah kata). Subtitle diambil dari KONSEP.md, jadi teks dan suara harus sama. Bila berbeda dan Rafi tidak mau generate ulang, catat sebagai laporan untuk skill genre; jangan mengubah KONSEP.md di sini.
- [ ] Ilustrasi vertikal, wajah dan detail kunci tidak di sepertiga bawah atau tepi kanan (Ken Burns hingga 114%), gaya sekeluarga; sebutkan yang menyimpang. Untuk gambar yang wajahnya tertutup subtitle, usulkan `kenBurns` di setelan.json.
- [ ] Tonton Pratinjau di katalog di titik-titik penting: label lapisan di adegan 1, subtitle terpanjang, teks layar terpanjang, adegan hening, peralihan ke kartu Ulikan, dan kartu Ulikan dengan ilustrasi terakhir asli (logo, wordmark, dan tepi kotak jelas; bila gambar terlalu terang, naikkan peredup kartu di `paket/video/src/lib/merek.ts` hanya bila Rafi setuju, karena berlaku untuk semua video). Untuk cek frame persis, render potongan uji `--frames=a-b`.
- [ ] Peta animasi (bila ada): `npm run alat -- peta-dasar <slug>`, `npm run alat -- peta-warna <slug>` dengan ilustrasi asli, dan waktu kata (`npm run alat -- transkripsi <slug> <potongan.wav> <folder aset>/peta/adegan-NN.kata.json`) dengan setiap pemicu ditemukan, atau `waktu.json` diisi. Render `LembarIkon` dan lihat adegan sebelum, peta, dan sesudah di Pratinjau; pohon tetap hijau, air biru, rute amber, label tidak terpotong.

Laporkan hasilnya, ubah `tahap` menjadi `Rakit & render`, dan akhiri dengan "Render final?". **Berhenti dan tunggu.**

## Tahap 4: Render final

- Render video dan sampul dari tab Render di katalog (tombol Render video dan Render sampul), atau `npm run render -- <slug>` dan `npm run render -- <slug> --sampul`. Hasil: `$ASET_DIR/proyek/<slug>/render/<slug>-<tanggal>-<versi>.mp4` (audio dinormalkan ke −16 LUFS, puncak −1,5 dBTP), rekaman sebelum normalisasi `...-mentah.mp4`, dan `...-sampul.png`.
- Laporkan durasi dan ukuran berkas, isi `render` dan `tanggal_render` di proyek.yaml.
- Ingatkan Rafi menonton di ponsel dengan dan tanpa suara sebelum unggah (subtitle dan label tidak tertutup antarmuka TikTok dan Shorts), dan memakai judul serta caption dari tab Kartu Ulikan dan caption (termasuk penanda dari skill genre dan penegasan rekaan untuk lapisan Rekaan).
- Setelah tayang: ubah `tahap` menjadi `Tayang`, lalu tawarkan memanen aset baru ke pustaka dengan `python3 scripts/panen-pustaka.py <slug> --tulis` (kartu draf, disetujui Rafi di halaman Pustaka) dan `python3 scripts/salin-pustaka.py --status disetujui --tulis`. Metrik masuk lewat `scripts/impor-metrik.py` setelah ekspor berikutnya.
- Commit (pesan singkat Bahasa Indonesia) dan push, sesuai CLAUDE.md repo.

## Tahap 5: Pembaruan konsep

Dipakai saat Rafi membawa KONSEP.md versi baru untuk proyek yang sudah ada (biasanya hasil Tahap R skill genre). Hasil: proyek mengikuti konsep baru, aset yang namanya sudah disesuaikan, dan daftar aset yang harus dibuat ulang.

1. **Validasi:** jalankan Tahap 1 pada konsep baru. `Slug` harus sama dan `Versi` lebih tinggi; bila tidak, tanyakan (satu pertanyaan).
2. **Bandingkan** hasil urai lama dan baru dengan skrip (`paket/urai-konsep`), per bagian: adegan ditambah, dihapus, digabung, atau dipindah; narasi; teks layar; prompt adegan dan lembar karakter; cue dan rentang babak; SFX; adegan hening; lapisan; latar; kartu Ulikan; caption; peta animasi. Pemetaan nomor adegan dari `### Pemetaan nomor adegan`; bila tidak ada tetapi urutan berubah, susun usulan dari kemiripan narasi dan tandai sebagai usulan.
3. **Rencana** di chat, lalu **berhenti dan tunggu:** tabel ganti nama aset (lama → baru) per folder; aset yang harus dibuat ulang (rekaman babak yang narasi atau tagnya berubah, atau `narasi/adegan-NN.<ext>` bila hanya satu adegan; ilustrasi yang visual atau promptnya berubah; lembar karakter; cue); aset yang tidak terpakai; kunci `setelan.json` yang nomor adegannya ikut bergeser.
4. **Kerjakan** setelah Rafi setuju: simpan KONSEP.md lama ke `proyek/<slug>/arsip/v<n lama>/KONSEP.md`; taruh konsep baru di `proyek/<slug>/KONSEP.md` dan perbarui `versi_konsep` di proyek.yaml; hapus potongan narasi babak yang berubah (dibuat ulang oleh `npm run alat -- potong`); ganti nama aset dengan skrip Node dua langkah (semua ke nama sementara dulu, lalu ke nama akhir); pindahkan aset yang tidak terpakai ke `$ASET_DIR/proyek/<slug>/arsip/v<n lama>/`, jangan dihapus; sesuaikan nomor di `setelan.json`.
5. **Uji dan serahkan:** `npm run render -- <slug> --cek` lolos, lihat adegan yang berubah dan kartu Ulikan di Pratinjau, lalu serahkan ringkasan (versi lama → baru, perubahan, aset yang diganti nama, daftar aset yang harus dibuat ulang). Setelah aset siap, lanjut ke Tahap 3. **Berhenti dan tunggu.**

## Lampiran: Peta animasi (spesifikasi yang diterapkan `paket/video`)

Adegan bertanda `**Peta animasi**` yang datanya ada di `## Peta animasi` digambar komponen `PetaRute` dari data geografi nyata, bukan dari ilustrasi Gemini. Datanya harus akurat, dan tampilannya harus senada dengan ilustrasi Gemini di video itu, bukan peta GIS datar. Acuan tampilan: pratinjau "Peta yang menyesuaikan warna ilustrasinya" (November 2026).

**Data**
- **Data dasar (lokal):** daratan dan batas negara dari `world-atlas` (`land-10m`, `countries-10m`), sungai besar dari Natural Earth `ne_10m_rivers_lake_centerlines`, disimpan di `peta/dasar/` agar render tidak butuh internet. Proyeksi Mercator dengan bingkai dari konsep; garis disederhanakan dan hanya bagian di sekitar bingkai yang disimpan.
- **GeoJSON:** fitur di `Sungai dan garis` atau `Batas` yang tidak ada di data dasar (sungai kecil, wilayah adat, wilayah kerajaan) diambil dari `peta/<nama>.geojson`. Bila berkas belum ada dan internet tersedia, ambil dari OpenStreetMap lewat Overpass API (misalnya `waterway=river` dengan nama itu di dalam bingkai), sederhanakan, simpan, dan laporkan ke Rafi. Batas sejarah tidak diambil dari OSM; Rafi menyiapkannya dari sumber yang tercatat di konsep. Data OSM wajib diberi atribusi "© OpenStreetMap contributors" kecil di pojok peta (di dalam zona aman) dan di README. Fitur yang tetap tidak tersedia ditampilkan sebagai label saja.

**Bentuk** (token `PETA` di `paket/video/src/lib/merek.ts`), tanpa relief, tanpa riak laut, tanpa bayangan daratan:
- satu garis pantai tegas seperti vector art (3 sampai 4 px, warna garis tepi) dengan tepi terang tipis di sisi daratan; di luar garis pantai langsung laut polos;
- tekstur kertas tipis, butiran halus, dan vinyet di tepi;
- sungai dengan garis bawah gelap; kepala rute sebagai pelita (pendar `pelita`) dan pendar hangat lembut di titik berangkat.

**Warna diambil dari ilustrasi video itu** (`npm run alat -- peta-warna <slug>`, disimpan di `$ASET_DIR/_cache/<slug>/peta-warna.json`):
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
- **Ikon umum** (pustaka `paket/video/src/peta/ikon/`, digambar dalam kode, dipakai ulang di semua video, ± 28 sampai 40 px): `pohon`, `kelapa`, `bukit`, `gunung`, `gunung-api`, `pondok`, `rumah-panjang`, `kampung`, `masjid` (atap tumpang), `gereja`, `candi`, `benteng`, `dermaga`, `perahu`, `kapal-layar`, `sawah`, `makam`. Ikon alam (bukit, gunung, gunung api) memakai warna medan dari palet; ikon buatan manusia memakai warna palet yang dicampur nada kayu atau batu (`#8C6A44`) agar tidak ikut hijau atau biru; tumbuhan mengikuti aturan hijau dan air mengikuti aturan biru. Ikon yang menyala (pondok, rumah panjang, kampung, masjid) punya keadaan redup dan menyala. Ikon baru boleh ditambahkan ke pustaka dengan aturan yang sama; sebutkan saat menyerahkan.
- **Gugus pohon** ditabur dengan seed tetap di daratan sebagai latar, tidak menimpa label, rute, atau ikon titik.
- **Ikon khusus** (per video, ± 64 sampai 96 px): bangunan khusus (kraton, istana, benteng tertentu) berdiri di alas bundar; lambang faksi selalu dibingkai `panji` atau `perisai` agar lambang yang berbeda tetap terlihat satu set. Sumbernya gambar Gemini dari prompt di `**Ikon khusus:**`, disimpan Rafi di `peta/ikon/<slug>.png`.
- **Penyelarasan ikon khusus** (belum dipindahkan ke `paket/video/alat/`; bila ada ikon khusus, porting skrip `peta-ikon` dari proyek lama lebih dulu): latar polos dibuang (flood fill dari tepi gambar, atau alfa bila PNG transparan); warna diturunkan ke empat nada menurut kuartil kecerahan dan dipetakan ke nada bahan ikon (gelap, bahan gelap, bahan, bahan terang); jendela atau lampu kuning terang dikenali (rona 32° sampai 61°, kejenuhan > 0,55, kecerahan > 0,6) dan menjadi `pelita` saat ikon aktif; garis tepi seragam 3 px ditambahkan di luar bentuk; hasil diletakkan di alas atau bingkainya dan disimpan ke `peta/ikon/<slug>.selaras.png`. Bila gambar belum ada, pakai penanda titik dengan label dan laporkan.
- **Waktu ikon:** ikon umum latar ada sejak peta muncul; ikon titik rute muncul atau menyala saat rute tiba; ikon khusus muncul (skala 0,9 ke 1, fade 10 frame, pendar pelita) saat pemicunya diucapkan.

**Huruf sama dengan produksi**, dari `font/`: Cormorant Garamond untuk nama tempat (500), tempat tujuan (600), sungai, laut, dan tanggal (500 italic); Plus Jakarta Sans untuk nama wilayah (800, kapital, spasi huruf 0,16em) dan catatan (500). Label diberi garis tepi warna `latar` agar terbaca, label sungai memakai biru pucat, dan label tidak masuk zona subtitle, kolom kanan, atau area teks layar.

**Panggung opsional:** bila ada `peta/panggung-XX.<ext>` (gambar Gemini berisi permukaan peta kosong, misalnya kulit kayu atau kertas tua di bawah cahaya pelita, tanpa tulisan), peta digambar di atasnya dengan blend multiply dan sedikit transparansi, dan warna peta diambil dari gambar itu.

**Gerak kamera menyesuaikan rute:** hitung kotak pembatas rute di layar. Bila rute mengisi lebih dari ± 55% lebar layar, pakai bingkai tetap dengan Ken Burns pelan (maks. 106%). Bila rute kecil atau berliku, kamera mengikuti kepala rute dengan perbesaran 1,2 sampai 1,4 kali, lalu mundur perlahan di ± 15% akhir adegan agar seluruh rute terlihat. Gerak selalu dengan easing, tanpa lompatan, dan tujuan akhir tetap di dalam zona aman. Sebutkan pilihan kamera per adegan saat menyerahkan.

**Waktu mengikuti narasi:** waktu tiap kata di narasi adegan peta diambil dengan transkripsi lokal `@remotion/install-whisper-cpp` (model kecil, bahasa Indonesia) dari potongan narasi adegan itu, lalu disimpan di `peta/adegan-XX.kata.json`. Rute tiba di tiap titik tepat saat `Pemicu`-nya diucapkan (cocokkan longgar: abaikan huruf besar dan tanda baca); label muncul (fade 8 frame) saat rute tiba; titik `-` dilewati di antara dua pemicu. Rute mulai ± 0,3 dtk setelah adegan masuk, dan tujuan menyala setelah pemicu terakhir. Bila transkripsi tidak tersedia atau pemicu tidak ditemukan, perkirakan waktunya dari posisi karakter pemicu di narasi bersih dan laporkan. Rafi bisa menimpa dengan `peta/adegan-XX.waktu.json` (detik per titik).

**Lain-lain:**
- **Jejak sebelumnya** digambar redup dan putus-putus tipis. Bila ada titik berstatus `perkiraan`, tampilkan catatan kecil "rute perkiraan".
- Subtitle, gradasi bawah, label lapisan (bila adegan 1), dan teks layar tetap tampil seperti adegan lain; peralihan masuk dan keluar memakai crossfade 15 frame yang sama. Ken Burns biasa tidak dipakai di adegan peta (diganti gerak kamera di atas).
- **Cadangan:** bila data peta tidak ada atau tidak lengkap, adegan itu memakai ilustrasi dari prompt cadangan (`ilustrasi/adegan-XX.*`) seperti adegan biasa, dan hal ini dilaporkan.

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