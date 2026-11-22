# Aturan kerja Ulik Silam

Komunikasi dengan Rafi dalam Bahasa Indonesia. Prompt untuk generator AI (Gemini, Suno, ElevenLabs SFX) ditulis dalam bahasa Inggris.

## Sebelum mulai

1. Jalankan `git pull` dan beri tahu Rafi bila ada konflik.
2. Baca `STATUS.md` untuk tahu proyek mana yang sedang dikerjakan.
3. Bandingkan `merek/VERSION` dengan sistem desain Ulik Silam (`https://claude.ai/artifact/VAzJGVmAGbxEvFpyD7jt6W`) bila alat Artifact tersedia di sesi ini. Bila berbeda, beri peringatan dan tawarkan sinkronisasi; jangan diam-diam memakai salah satunya.

## Sumber kebenaran

- **Isi** (narasi, fakta, prompt, caption): `proyek/<slug>/KONSEP.md` atau `CAROUSEL.md`. Tidak ditulis ulang saat produksi.
- **Tampilan**: `merek/` (salinan beku sistem desain). Token, warna, huruf, dan logo hanya diambil dari sini; jangan hard-code nilai lain.
- **Aset pakai ulang**: `pustaka/`. Sebelum menulis prompt atau riset busana baru, cek dulu apakah tokoh, busana, latar, musik, atau SFX-nya sudah ada di pustaka.
- **Aturan genre dan produksi**: skill di `.claude/skills/`.

## Batas kerja

- Paling banyak 2 proyek sekaligus di tahap Aset dan Rakit & render (lihat `STATUS.md`).
- Tahap setiap proyek disimpan di `proyek/<slug>/proyek.yaml`. `STATUS.md` dibuat ulang dari semua `proyek.yaml` dengan `python3 scripts/buat-status.py`; jangan diedit manual.
- Proyek Remotion lama (sebelum repo) tetap di folder `pov/` sebagai arsip. Path aslinya dicatat di `proyek.yaml` (`arsip_lama`).

## Aset berat

File berat ada di `$ASET_DIR` (lihat `.env`; bawaan folder `aset/` di repo ini, diabaikan git), dengan struktur folder sama: `$ASET_DIR/proyek/<slug>/...` dan `$ASET_DIR/pustaka/...`. Jangan commit file gambar, audio, video, atau hasil render ke repo.

## Preferensi tetap

- Gaya ilustrasi: detailed vector art (Gemini), rasio 9:16.
- Motif batik parang tidak dipakai di ilustrasi; batik lain boleh bila sesuai riset.
- Pembuka nyala tidak dipakai lagi di video (sejak Oktober 2026).
- Label lapisan Rekaan tidak boleh disembunyikan atau dikecilkan.

## Setelah selesai

1. Perbarui `STATUS.md` (tahap, tanggal, langkah berikutnya).
2. Tawarkan aset baru yang sudah disetujui untuk masuk `pustaka/`.
3. Commit dengan pesan singkat dalam Bahasa Indonesia, lalu push.
