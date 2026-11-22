#!/usr/bin/env python3
"""Salin berkas aset pustaka dari folder proyek asalnya ke $ASET_DIR/pustaka/<jenis>/<id>/.

Kartu yang punya `asal` ({"proyek": slug, "berkas": path relatif}) dicari di folder proyek lama
(`arsip_lama` di proyek.yaml) atau di $ASET_DIR/proyek/<slug>/. Berkas yang sudah ada tidak ditimpa.

Pemakaian:
    python3 scripts/salin-pustaka.py               # pratinjau
    python3 scripts/salin-pustaka.py --tulis
    python3 scripts/salin-pustaka.py --status disetujui --tulis   # hanya kartu yang sudah disetujui
"""
import argparse
import glob
import json
import os
import shutil
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from importlib import import_module  # noqa: E402

panen = import_module("panen-pustaka")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--status", help="Hanya kartu dengan status ini (misalnya disetujui)")
    ap.add_argument("--tulis", action="store_true")
    a = ap.parse_args()
    aset = panen.aset_dir()
    salin = ada = hilang = 0
    for path in sorted(glob.glob(os.path.join(panen.PUSTAKA, "*", "*", "aset.json"))):
        kartu = json.load(open(path, encoding="utf-8"))
        if a.status and kartu.get("status") != a.status:
            continue
        for asal in kartu.get("asal", []):
            meta = panen.baca_yaml(os.path.join(panen.AKAR, "proyek", asal["proyek"], "proyek.yaml"))
            folder = panen.folder_lama(meta, asal["proyek"])
            sumber = os.path.join(folder, asal["berkas"]) if folder else None
            tujuan = os.path.join(aset, "pustaka", kartu["jenis"], kartu["id"], os.path.basename(asal["berkas"]))
            if os.path.exists(tujuan):
                ada += 1
            elif not sumber or not os.path.exists(sumber):
                hilang += 1
                print(f"TIDAK ADA: {kartu['jenis']}/{kartu['id']} <- {asal['proyek']}/{asal['berkas']}")
            else:
                salin += 1
                if a.tulis:
                    os.makedirs(os.path.dirname(tujuan), exist_ok=True)
                    shutil.copy2(sumber, tujuan)
    print(f"{'Disalin' if a.tulis else 'Akan disalin'}: {salin}; sudah ada: {ada}; tidak ditemukan: {hilang}")


if __name__ == "__main__":
    main()
