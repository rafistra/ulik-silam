#!/usr/bin/env python3
"""Impor proyek video lama (folder pov/) ke repo sebagai data.

Pemakaian:
    python3 scripts/impor-lama.py <folder-pov-lama> [<folder-repo>]

Yang dilakukan, untuk setiap subfolder yang punya KONSEP.md:
- menyalin KONSEP.md dan konsep.json ke proyek/<slug>/ (menimpa salinan lama di repo);
- membuat proyek/<slug>/proyek.yaml bila belum ada (yang sudah ada tidak disentuh).

Folder lama tidak diubah sama sekali. Aset dan render tetap di sana.
"""
import datetime
import glob
import json
import os
import re
import shutil
import sys


def ambil(md, kunci):
    m = re.search(r"^\|\s*" + re.escape(kunci) + r"\s*\|\s*(.*?)\s*\|\s*$", md, re.M)
    return m.group(1).strip().strip("`") if m else ""


def q(s):
    return json.dumps(s, ensure_ascii=False)


def daftar(xs):
    return "[" + ", ".join(q(x) for x in xs) + "]"


def tebak_format(slug):
    if slug.startswith("pov-"):
        return "POV"
    if slug.startswith("narasi-"):
        return "Narasi"
    if slug.startswith("carousel-"):
        return "Carousel"
    return "Daftar"


def tebak_seri(slug):
    m = re.match(r"(.+?)-(?:part-)?(\d)$", slug)
    if m and m.group(2) in "12345":
        return m.group(1)
    return ""


def render_final(folder):
    calon = []
    for f in glob.glob(os.path.join(folder, "out", "*.mp4")):
        nama = os.path.basename(f).lower()
        if "mentah" in nama or "tanpa-musik" in nama:
            continue
        calon.append(f)
    if not calon:
        return "", ""
    f = max(calon, key=os.path.getmtime)
    tgl = datetime.date.fromtimestamp(os.path.getmtime(f)).isoformat()
    return "out/" + os.path.basename(f), tgl


def hitung(folder, sub, ekst):
    p = os.path.join(folder, "public", sub)
    n = 0
    for root, _, fs in os.walk(p):
        n += sum(1 for f in fs if f.lower().endswith(ekst))
    return n


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)
    sumber = os.path.abspath(sys.argv[1])
    repo = os.path.abspath(sys.argv[2] if len(sys.argv) > 2 else os.path.join(os.path.dirname(__file__), ".."))
    hasil = []
    for nama in sorted(os.listdir(sumber)):
        folder = os.path.join(sumber, nama)
        konsep = os.path.join(folder, "KONSEP.md")
        if not os.path.isdir(folder) or not os.path.exists(konsep):
            continue
        md = open(konsep, encoding="utf-8", errors="replace").read()
        slug = ambil(md, "Slug") or nama
        tujuan = os.path.join(repo, "proyek", slug)
        os.makedirs(tujuan, exist_ok=True)
        shutil.copyfile(konsep, os.path.join(tujuan, "KONSEP.md"))
        if os.path.exists(os.path.join(folder, "konsep.json")):
            shutil.copyfile(os.path.join(folder, "konsep.json"), os.path.join(tujuan, "konsep.json"))
        yaml = os.path.join(tujuan, "proyek.yaml")
        if os.path.exists(yaml):
            hasil.append((slug, "KONSEP diperbarui, proyek.yaml dibiarkan"))
            continue
        lapisan = [x.strip() for x in ambil(md, "Lapisan").split(",") if x.strip()]
        lembar = re.findall(r"\*\*Lembar karakter · (.+?)\*\*", md)
        adegan = len(re.findall(r"^\|\s*\d+\s*\|\s*\d+:\d\d", md, re.M))
        render, tgl = render_final(folder)
        judul = ambil(md, "Judul") or re.sub(r"^# (Konsep Video POV: )?", "", (re.search(r"^# .*$", md, re.M) or [""])[0])
        baris = [
            f"judul: {q(judul)}",
            f"slug: {slug}",
            f"format: {tebak_format(slug)}",
            f"lapisan: {daftar(lapisan)}",
            f"latar: {q(ambil(md, 'Latar'))}",
            f"seri: {q(tebak_seri(slug))}",
            "tahap: Tayang",
            'platform: ["TikTok", "YouTube Shorts"]',
            f"versi_konsep: {q(ambil(md, 'Versi'))}",
            "merek: pra-repo",
            f"adegan: {adegan}",
            f"lembar_karakter: {daftar(lembar)}",
            f"aset: {{ilustrasi: {hitung(folder, 'ilustrasi', ('.png', '.jpg', '.jpeg', '.webp'))}, narasi: {hitung(folder, 'narasi', ('.mp3', '.wav', '.m4a'))}, musik: {hitung(folder, 'musik', ('.mp3', '.wav', '.m4a'))}, sfx: {hitung(folder, 'sfx', ('.mp3', '.wav', '.m4a', '.ogg'))}}}",
            f"render: {q(render)}",
            f"tanggal_render: {tgl or 'null'}",
            "tanggal_tayang: null",
            "tautan: {tiktok: null, shorts: null}",
            "metrik: {views: null, rata_tonton_detik: null, simpan: null, bagikan: null, diperbarui: null}",
            f"arsip_lama: {q('pov/' + nama)}",
            'catatan: ""',
        ]
        open(yaml, "w", encoding="utf-8", newline="\n").write("\n".join(baris) + "\n")
        hasil.append((slug, "diimpor"))
    for slug, ket in hasil:
        print(f"{slug}: {ket}")
    print(f"Total: {len(hasil)} proyek")


if __name__ == "__main__":
    main()
