# Sampul per platform Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Render sampul TikTok dan YouTube terpisah, dengan posisi dan zoom gambar yang diseret di pratinjau katalog dan disimpan per platform.

**Architecture:** Komposisi `Sampul` menerima `platform` dan `posisi`; `siapkan.mjs` membaca posisi dari `proyek.yaml`; `render.mjs` merender satu atau dua still; katalog menambah sakelar platform, lapisan seret, dan garis potong 3:4.

**Tech Stack:** Remotion 4 (React/TS), Node ESM, Vite + React (katalog).

**Spec:** `docs/superpowers/specs/2026-11-23-sampul-per-platform-design.md`

## Global Constraints

- Kanvas tetap 1080 × 1920; satu `adegan` dan satu `judul` untuk kedua platform.
- `x`, `y` dalam % kanvas, dibatasi −50…50; `skala` 1–1,5; bawaan `{x:0, y:0, skala:1}`.
- TikTok: garis potong y 240 dan 1680; label lapisan di y 280. YouTube: tata letak sekarang.
- Keluaran `<slug>-<tanggal>-<versi>-sampul-tiktok.png` dan `-sampul-youtube.png`.
- Garis potong hanya di pratinjau, tidak ikut render.

## Review Focus

- `proyek.yaml` lama (`sampul: {"adegan":16,"judul":null}`) tanpa kunci platform: harus terbaca dengan posisi bawaan.
- Nilai posisi di luar batas (diseret jauh): dijepit, bukan ditolak server.
- `--sampul` tanpa nilai: dua berkas dirender, keduanya dilaporkan selesai.
- Sampul khusus (`ilustrasi/sampul.*`) juga bisa digeser.
- Menyimpan judul/adegan tidak menghapus posisi yang sudah disimpan (dan sebaliknya).

---

### Task 1: Komposisi dan data

**Files:** `paket/video/src/Sampul.tsx`, `paket/video/src/Root.tsx`, `paket/video/siapkan.mjs`

**Interfaces:**
- Produces: `Sampul` props `{ data: DataVideo; platform?: 'tiktok' | 'youtube'; posisi?: { x: number; y: number; skala: number } }`; `data.sampul.posisi: { tiktok: Posisi; youtube: Posisi }`; ekspor `POSISI_BAWAAN`, `jepitPosisi(p)` dari `paket/video/src/lib/sampul.ts`.

- [ ] Ganti `geserBawah` dengan `platform`/`posisi`; lapisan blur selalu ada; label di y 280 untuk TikTok.
- [ ] `siapkan.mjs`: baca `sampul.tiktok|youtube`, jepit, isi `data.sampul.posisi`.
- [ ] Verifikasi: `npx tsc --noEmit` di `paket/video` lolos.

### Task 2: Render CLI

**Files:** `paket/video/render.mjs`

- [ ] `--sampul` → dua still; `--sampul=tiktok|youtube` → satu; props `{data, platform, posisi: data.sampul.posisi[platform]}`.
- [ ] Verifikasi: `npm run render -- pov-roehana-koeddoes --sampul` menghasilkan dua PNG 1080×1920; label TikTok di bawah y 240.

### Task 3: Katalog

**Files:** `aplikasi/katalog/src/halaman/Konsep.jsx`, `aplikasi/katalog/src/gaya.css`, `aplikasi/katalog/server/plugin.mjs`

- [ ] Server: jenis render `sampul`, `sampul-tiktok`, `sampul-youtube`; validasi PATCH `sampul` menerima `tiktok`/`youtube` `{x,y,skala}` angka.
- [ ] UI: sakelar platform, seret (pointer events) + roda/penggeser zoom, Kembalikan posisi, garis 3:4 di mode TikTok, dua tombol render; simpan menggabungkan adegan, judul, dan kedua posisi.
- [ ] Verifikasi: build Vite lolos; katalog memuat halaman konsep tanpa galat.
- [ ] Commit.
