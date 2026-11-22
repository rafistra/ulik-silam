#!/usr/bin/env python3
"""Buat STATUS.md dari semua proyek/<slug>/proyek.yaml.

Pemakaian:
    python3 scripts/buat-status.py

STATUS.md jangan diedit manual: ubah tahap di proyek.yaml (atau lewat katalog), lalu jalankan skrip ini.
"""
import datetime
import glob
import json
import os
import re

TAHAP = ["Bank ide", "Brief", "Naskah terverifikasi", "Aset", "Rakit & render", "Tayang", "Evaluasi"]
BATAS = {"Aset": 2, "Rakit & render": 2}


def baca(path):
    data = {}
    for baris in open(path, encoding="utf-8"):
        m = re.match(r"^([a-z_]+):\s*(.*)$", baris.rstrip("\n"))
        if not m:
            continue
        k, v = m.groups()
        if v.startswith("[") or v.startswith('"') or v.startswith("{"):
            try:
                data[k] = json.loads(v)
                continue
            except ValueError:
                pass
        data[k] = None if v == "null" else v
    return data


def main():
    akar = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    proyek = [baca(p) for p in sorted(glob.glob(os.path.join(akar, "proyek", "*", "proyek.yaml")))]
    out = [
        "# Papan produksi Ulik Silam",
        "",
        "Dibuat otomatis oleh `scripts/buat-status.py` dari `proyek/*/proyek.yaml`. Jangan diedit manual.",
        "",
        f"Diperbarui: {datetime.date.today().isoformat()} · {len(proyek)} proyek",
        "",
        "| Tahap | Jumlah | Batas |",
        "| --- | --- | --- |",
    ]
    for t in TAHAP:
        n = sum(1 for p in proyek if p.get("tahap") == t)
        batas = f"{n} / {BATAS[t]}" + (" (melebihi batas)" if n > BATAS[t] else "") if t in BATAS else "-"
        out.append(f"| {t} | {n} | {batas} |")
    for t in TAHAP:
        isi = [p for p in proyek if p.get("tahap") == t]
        if not isi:
            continue
        isi.sort(key=lambda p: p.get("tanggal_render") or "", reverse=True)
        out += ["", f"## {t}", "", "| Proyek | Judul | Format | Lapisan | Render | Views TikTok | Views Shorts |", "| --- | --- | --- | --- | --- | --- | --- |"]
        for p in isi:
            lap = ", ".join(p.get("lapisan") or [])
            vt = (p.get("metrik_tiktok") or {}).get("views") if isinstance(p.get("metrik_tiktok"), dict) else None
            vs = (p.get("metrik_shorts") or {}).get("views") if isinstance(p.get("metrik_shorts"), dict) else None
            f = lambda v: f"{v:,}".replace(",", ".") if isinstance(v, int) else "-"
            out.append(f"| {p.get('slug')} | {p.get('judul')} | {p.get('format')} | {lap} | {p.get('tanggal_render') or '-'} | {f(vt)} | {f(vs)} |")
    open(os.path.join(akar, "STATUS.md"), "w", encoding="utf-8", newline="\n").write("\n".join(out) + "\n")
    print(f"STATUS.md: {len(proyek)} proyek")


if __name__ == "__main__":
    main()
