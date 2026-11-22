#!/usr/bin/env python3
"""Impor data penonton TikTok dan YouTube Shorts ke proyek/<slug>/proyek.yaml.

Pemakaian:
    python3 scripts/impor-metrik.py --youtube "<Table data.csv>" --tiktok "<Content.csv>" [--tiktok-studio <daftar.tsv>] [--periode-yt "2026-10-24..2026-11-21"] [--tahun 2026] [--tulis]

- YouTube Studio: ekspor Konten (Table data.csv). Dicocokkan lewat judul YouTube Shorts di KONSEP.md.
- TikTok Studio: ekspor Konten (Content.csv). Dicocokkan lewat awal caption TikTok di KONSEP.md.
Tanpa --tulis, skrip hanya menampilkan hasil pencocokan. Dengan --tulis, baris tayang, tautan,
metrik_tiktok, dan metrik_shorts di proyek.yaml diganti; baris lain tidak disentuh.
"""
import argparse
import csv
import datetime
import difflib
import glob
import json
import os
import re

AKAR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
BULAN = {b: i for i, b in enumerate(["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], 1)}
BULAN_PENDEK = {b[:3]: i for b, i in BULAN.items()}


def norm(s):
    s = re.sub(r"#\S+", " ", s or "")
    s = re.sub(r"[^0-9a-zà-ÿ ]+", " ", s.lower())
    return re.sub(r"\s+", " ", s).strip()


def mirip(a, b):
    a, b = norm(a), norm(b)
    if not a or not b:
        return 0.0
    n = min(len(a), len(b), 160)
    return difflib.SequenceMatcher(None, a[:n], b[:n]).ratio()


def judul_dan_caption(md):
    judul = []
    for m in re.finditer(r"\*\*Judul:\*\*\s*(.+)", md):
        judul.append(m.group(1).strip())
    m = re.search(r"^\|\s*Judul\s*\|\s*(.*?)\s*\|", md, re.M)
    if m:
        judul.append(m.group(1).strip())
    caption = {}
    for plat in ("TikTok", "YouTube Shorts"):
        m = re.search(r"^###\s*" + re.escape(plat) + r".*?```[a-z]*\n(.*?)```", md, re.M | re.S)
        if m:
            caption[plat] = m.group(1).strip()
    return judul, caption


def baca_youtube(path):
    rows = []
    with open(path, encoding="utf-8-sig") as f:
        for r in csv.DictReader(f):
            if r.get("Content") in (None, "", "Total"):
                continue
            rows.append(r)
    return rows


def baca_tiktok(path):
    teks = open(path, encoding="utf-8-sig").read()
    teks = teks.split("\n", 1)[1] if teks.lstrip().startswith('"Time"') else teks
    pola = re.compile(r'^"(?P<time>[^"\n]*)","(?P<judul>.*?)","(?P<link>https://www\.tiktok\.com/[^"]+)","(?P<post>[^"]*)","(?P<suka>\d+)","(?P<komentar>\d+)","(?P<bagikan>\d+)","(?P<views>\d+)"\s*$', re.M | re.S)
    return [m.groupdict() for m in pola.finditer(teks)]


def baca_tiktok_studio(path):
    with open(path, encoding="utf-8-sig") as f:
        return [r for r in csv.DictReader(f, delimiter="\t") if r.get("views") not in (None, "", "0")]


def angka_studio(s):
    """'5,042' -> (5042, False); '18K' -> (18000, True), True berarti dibulatkan."""
    s = (s or "").strip().replace(",", "")
    m = re.fullmatch(r"([\d.]+)([KM]?)", s)
    if not m:
        return None
    kali = {"": 1, "K": 1000, "M": 1000000}[m.group(2)]
    return int(float(m.group(1)) * kali), bool(m.group(2))


def tanggal_tiktok(s, tahun):
    m = re.match(r"([A-Za-z]+)\s+(\d+)", s.strip())
    return datetime.date(tahun, BULAN.get(m.group(1)) or BULAN_PENDEK[m.group(1)[:3]], int(m.group(2))).isoformat() if m else None


def tanggal_youtube(s):
    m = re.match(r"([A-Za-z]{3})\w*\s+(\d+),\s*(\d{4})", s.strip())
    return datetime.date(int(m.group(3)), BULAN_PENDEK[m.group(1)], int(m.group(2))).isoformat() if m else None


def ganti_kunci(teks, kunci, nilai):
    baris = f"{kunci}: {nilai}"
    if re.search(rf"^{kunci}:.*$", teks, re.M):
        return re.sub(rf"^{kunci}:.*$", lambda _: baris, teks, flags=re.M)
    return teks.rstrip("\n") + "\n" + baris + "\n"


def baca_yaml_flow(teks, kunci):
    m = re.search(rf"^{kunci}:\s*(\{{.*\}})\s*$", teks, re.M)
    if not m:
        return {}
    try:
        return json.loads(m.group(1))
    except ValueError:
        return {}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--youtube")
    ap.add_argument("--tiktok")
    ap.add_argument("--tiktok-studio", help="TSV dari daftar Posts di TikTok Studio (id, tanggal, views, suka, komentar, caption_awal); melengkapi video di luar 15 teratas ekspor TikTok")
    ap.add_argument("--periode-yt", default="")
    ap.add_argument("--tahun", type=int, default=datetime.date.today().year)
    ap.add_argument("--ambang", type=float, default=0.7)
    ap.add_argument("--peta", default=os.path.join(AKAR, "data", "metrik", "pemetaan.json"), help="JSON {judul atau awal caption: slug} untuk video yang judulnya berubah saat diunggah")
    ap.add_argument("--tulis", action="store_true")
    a = ap.parse_args()
    hari_ini = datetime.date.today().isoformat()

    proyek = {}
    for p in sorted(glob.glob(os.path.join(AKAR, "proyek", "*", "KONSEP.md"))):
        slug = os.path.basename(os.path.dirname(p))
        proyek[slug] = judul_dan_caption(open(p, encoding="utf-8", errors="replace").read())

    hasil = {s: {} for s in proyek}
    tak_cocok = []
    peta = json.load(open(a.peta, encoding="utf-8")) if os.path.exists(a.peta) else {}

    def cari(teks, skor_fn):
        for kunci, slug in peta.items():
            t, k = norm(teks), norm(kunci)
            if slug in proyek and (t.startswith(k) or (len(t) >= 20 and k.startswith(t))):
                return slug, 1.0
        skor = {s: skor_fn(s) for s in proyek}
        slug = max(skor, key=skor.get)
        return slug, skor[slug]

    def simpan(slug, plat, data):
        lama = hasil[slug].get(plat)
        if lama and lama["skor"] >= data["skor"]:
            print(f"PERINGATAN: {plat} {data['judul']!r} juga cocok ke {slug}; dipakai yang skornya lebih tinggi")
            return
        if lama:
            print(f"PERINGATAN: {plat} {lama['judul']!r} digantikan oleh {data['judul']!r} untuk {slug}")
        hasil[slug][plat] = data

    if a.youtube:
        for r in baca_youtube(a.youtube):
            slug, sk = cari(r["Video title"], lambda s: max([mirip(r["Video title"], j) for j in proyek[s][0]] + [0]))
            if sk < a.ambang:
                tak_cocok.append(("YouTube", r["Video title"], slug, sk))
                continue
            views = int(r["Views"] or 0)
            jam = float(r["Watch time (hours)"] or 0)
            durasi = int(r["Duration"] or 0)
            rata = round(jam * 3600 / views, 1) if views else None
            simpan(slug, "shorts", {
                "tanggal": tanggal_youtube(r["Video publish time"]),
                "tautan": f"https://youtube.com/shorts/{r['Content']}",
                "metrik": {"views": views, "jam_tonton": round(jam, 1), "rata_tonton_detik": rata, "durasi_detik": durasi,
                           "persen_ditonton": round(100 * rata / durasi, 1) if rata and durasi else None,
                           "subscriber": int(r["Subscribers"] or 0), "impresi": int(r["Thumbnail impressions"] or 0),
                           "ctr": float(r["Thumbnail click-through rate (%)"] or 0), "periode": a.periode_yt, "diperbarui": hari_ini},
                "skor": round(sk, 2), "judul": r["Video title"],
            })

    if a.tiktok:
        for r in baca_tiktok(a.tiktok):
            slug, sk = cari(r["judul"], lambda s: mirip(r["judul"], proyek[s][1].get("TikTok", "")))
            if sk < a.ambang:
                tak_cocok.append(("TikTok", r["judul"][:90], slug, sk))
                continue
            simpan(slug, "tiktok", {
                "tanggal": tanggal_tiktok(r["post"], a.tahun),
                "tautan": r["link"],
                "metrik": {"views": int(r["views"]), "suka": int(r["suka"]), "komentar": int(r["komentar"]), "bagikan": int(r["bagikan"]), "diperbarui": hari_ini},
                "skor": round(sk, 2), "judul": r["judul"][:70],
            })

    if a.tiktok_studio:
        for r in baca_tiktok_studio(a.tiktok_studio):
            slug, sk = cari(r["caption_awal"], lambda s: mirip(r["caption_awal"], proyek[s][1].get("TikTok", "")))
            if sk < a.ambang:
                tak_cocok.append(("TikTok Studio", r["caption_awal"][:90], slug, sk))
                continue
            if "tiktok" in hasil[slug]:
                continue  # angka pasti dari ekspor TikTok lebih diutamakan
            views = angka_studio(r["views"])
            if views is None or views[1]:
                print(f"LEWAT: {slug} views TikTok Studio dibulatkan ({r['views']}); pakai ekspor TikTok untuk angka pasti")
                continue
            simpan(slug, "tiktok", {
                "tanggal": tanggal_tiktok(r["tanggal"], a.tahun),
                "tautan": f"https://www.tiktok.com/@ulik.silam/video/{r['id']}",
                "metrik": {"views": views[0], "suka": angka_studio(r["suka"])[0], "komentar": angka_studio(r["komentar"])[0], "bagikan": None, "sumber": "tiktok-studio", "diperbarui": hari_ini},
                "skor": round(sk, 2), "judul": r["caption_awal"][:70],
            })

    for slug, h in sorted(hasil.items()):
        if not h:
            continue
        ket = " | ".join(f"{k}: {v['metrik']['views']} views (skor {v['skor']})" for k, v in h.items())
        print(f"{slug}: {ket}")
        if not a.tulis:
            continue
        path = os.path.join(AKAR, "proyek", slug, "proyek.yaml")
        teks = open(path, encoding="utf-8").read()
        tayang = baca_yaml_flow(teks, "tayang")
        tautan = baca_yaml_flow(teks, "tautan")
        for plat, v in h.items():
            tayang[plat] = v["tanggal"]
            tautan[plat] = v["tautan"]
            teks = ganti_kunci(teks, f"metrik_{plat}", json.dumps(v["metrik"], ensure_ascii=False))
        teks = ganti_kunci(teks, "tayang", json.dumps(tayang, ensure_ascii=False))
        teks = ganti_kunci(teks, "tautan", json.dumps(tautan, ensure_ascii=False))
        teks = re.sub(r"^(tanggal_tayang|metrik):.*\n", "", teks, flags=re.M)
        open(path, "w", encoding="utf-8", newline="\n").write(teks)

    for plat, judul, slug, skor in tak_cocok:
        print(f"TIDAK COCOK [{plat}] {judul!r} (terdekat {slug}, skor {skor:.2f})")
    print(f"Cocok: {sum(len(h) for h in hasil.values())} baris; tidak cocok: {len(tak_cocok)}")


if __name__ == "__main__":
    main()
