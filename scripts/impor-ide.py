#!/usr/bin/env python3
"""Impor bank ide (KONSEP.md yang belum diproduksi) ke proyek/<slug>/.

Pemakaian:
    python3 scripts/impor-ide.py <folder-ide> [--prioritas slug1,slug2,...] [--tulis]

Untuk setiap berkas .md di <folder-ide> (juga satu tingkat subfolder) yang berjudul
"# Konsep Video POV:":
- menyalin berkas itu ke proyek/<slug>/KONSEP.md (slug dari baris Slug, cadangannya nama berkas);
- membuat proyek/<slug>/proyek.yaml dengan tahap "Naskah terverifikasi".

Proyek yang sudah punya folder di proyek/ dilewati (tidak ditimpa).
Subfolder yang berisi lebih dari satu konsep dianggap satu seri bernama subfolder itu.
--prioritas: urutan slug (prioritas 1, 2, ...); slug lain tanpa prioritas.
Tanpa --tulis hanya menampilkan rencana. Folder sumber tidak diubah.
"""
import json
import os
import re
import shutil
import sys

AKAR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))


def ambil(md, kunci):
    m = re.search(r"^\|\s*" + re.escape(kunci) + r"\s*\|\s*(.*?)\s*\|\s*$", md, re.M)
    return m.group(1).strip().strip("`") if m else ""


def q(s):
    return json.dumps(s, ensure_ascii=False)


def daftar(xs):
    return "[" + ", ".join(q(x) for x in xs) + "]"


def tebak_format(slug, md):
    f = ambil(md, "Format")
    if f:
        f = f.split("·")[0].strip()
        if f.lower().startswith("daftar"):
            return "Daftar"
        if f.lower().startswith("narasi"):
            return "Narasi"
    if slug.startswith("narasi-"):
        return "Narasi"
    if slug.startswith("daftar-"):
        return "Daftar"
    return "POV"


def tebak_seri(slug):
    m = re.match(r"(.+?)-(?:part-)?(\d)$", slug)
    return m.group(1) if m and m.group(2) in "12345" else ""


def calon(sumber):
    hasil = []
    for nama in sorted(os.listdir(sumber)):
        p = os.path.join(sumber, nama)
        if os.path.isfile(p) and nama.lower().endswith(".md"):
            hasil.append((p, ""))
        elif os.path.isdir(p):
            mds = sorted(f for f in os.listdir(p) if f.lower().endswith(".md"))
            for f in mds:
                hasil.append((os.path.join(p, f), nama if len(mds) > 1 else ""))
    return hasil


def main():
    arg = sys.argv[1:]
    if not arg or arg[0].startswith("-"):
        print(__doc__)
        sys.exit(1)
    sumber = os.path.abspath(arg[0])
    tulis = "--tulis" in arg
    prioritas = []
    if "--prioritas" in arg:
        prioritas = [s.strip() for s in arg[arg.index("--prioritas") + 1].split(",") if s.strip()]

    rencana = []
    for berkas, seri_folder in calon(sumber):
        md = open(berkas, encoding="utf-8", errors="replace").read()
        if not re.search(r"^# Konsep Video POV:", md, re.M):
            rencana.append((None, berkas, "dilewati: bukan KONSEP.md"))
            continue
        slug = ambil(md, "Slug") or os.path.splitext(os.path.basename(berkas))[0]
        tujuan = os.path.join(AKAR, "proyek", slug)
        if os.path.exists(tujuan):
            rencana.append((None, berkas, f"dilewati: proyek/{slug} sudah ada"))
            continue
        lapisan = [x.strip() for x in ambil(md, "Lapisan").split(",") if x.strip()]
        lembar = re.findall(r"\*\*Lembar karakter · (.+?)\*\*", md)
        adegan = len(re.findall(r"^\|\s*\d+\s*\|\s*\d+:\d\d", md, re.M))
        judul = ambil(md, "Judul") or re.sub(r"^# (Konsep Video POV: )?", "", (re.search(r"^# .*$", md, re.M) or [""])[0])
        pr = prioritas.index(slug) + 1 if slug in prioritas else None
        baris = [
            f"judul: {q(judul)}",
            f"slug: {slug}",
            f"format: {tebak_format(slug, md)}",
            f"lapisan: {daftar(lapisan)}",
            f"latar: {q(ambil(md, 'Latar'))}",
            f"seri: {q(seri_folder or tebak_seri(slug))}",
            "tahap: Naskah terverifikasi",
            f"prioritas: {pr if pr else 'null'}",
            'platform: ["TikTok", "YouTube Shorts"]',
            f"versi_konsep: {q(ambil(md, 'Versi'))}",
            "merek: null",
            f"adegan: {adegan}",
            f"lembar_karakter: {daftar(lembar)}",
            "aset: {ilustrasi: 0, narasi: 0, musik: 0, sfx: 0}",
            'render: ""',
            "tanggal_render: null",
            "tanggal_tayang: null",
            "tautan: {tiktok: null, shorts: null}",
            "metrik: {views: null, rata_tonton_detik: null, simpan: null, bagikan: null, diperbarui: null}",
            f"asal_ide: {q(os.path.relpath(berkas, os.path.dirname(sumber)).replace(os.sep, '/'))}",
            'catatan: ""',
        ]
        rencana.append((slug, berkas, f"impor (prioritas {pr})" if pr else "impor"))
        if tulis:
            os.makedirs(tujuan, exist_ok=True)
            shutil.copyfile(berkas, os.path.join(tujuan, "KONSEP.md"))
            open(os.path.join(tujuan, "proyek.yaml"), "w", encoding="utf-8", newline="\n").write("\n".join(baris) + "\n")

    for slug, berkas, ket in rencana:
        print(f"{slug or os.path.basename(berkas)}: {ket}")
    hilang = [s for s in prioritas if s not in [r[0] for r in rencana]]
    if hilang:
        print("Slug prioritas tidak ditemukan:", ", ".join(hilang))
    n = sum(1 for r in rencana if r[0])
    print(f"Total: {n} proyek {'ditulis' if tulis else 'direncanakan (jalankan dengan --tulis)'}")


if __name__ == "__main__":
    main()
