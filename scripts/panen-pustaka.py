#!/usr/bin/env python3
"""Panen aset pakai ulang dari KONSEP.md proyek ke pustaka/ sebagai kartu berstatus draf.

Yang dipanen:
- tokoh: setiap lembar karakter (prompt, deskripsi baku, catatan akurasi visual, dan gambar ilustrasi/lembar-<nama>.* bila ada);
- musik: setiap cue Suno (Style of Music, Exclude Styles, suasana) beserta berkas cue-nya bila ada;
- sfx: setiap efek suara yang berkasnya ada (bunyi, kata kunci, prompt generator).

Pemakaian:
    python3 scripts/panen-pustaka.py --semua            # pratinjau semua proyek
    python3 scripts/panen-pustaka.py pov-opas-si-pitung --tulis

Kartu yang sudah ada tidak ditimpa; proyek baru hanya ditambahkan ke `dipakai_di`. Musik dan SFX yang berkasnya
sama persis dengan berkas pustaka (disalin dari pustaka) dicatat sebagai pemakaian ulang, bukan kartu baru.
Berkas dicari di folder proyek lama (public/<jenis>) atau di $ASET_DIR/proyek/<slug>/<jenis>.
Berkas berat tidak disalin di sini (lihat scripts/salin-pustaka.py); kartu mencatat asalnya di `asal`.
Setelah Rafi menyetujui, ubah `status` kartu menjadi "disetujui".
"""
import argparse
import datetime
import difflib
import glob
import json
import os
import re
import unicodedata

AKAR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUSTAKA = os.path.join(AKAR, "pustaka")
STATUS_AKURASI = ["Terverifikasi", "Tafsir", "Rekaan", "Dihindari"]


def slug(s, maks=48):
    s = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode().lower()
    s = re.sub(r"[^a-z0-9]+", "-", s).strip("-")
    if len(s) > maks:
        s = s[: maks + 1].rsplit("-", 1)[0]
    return s.strip("-") or "tanpa-nama"


def baca_yaml(path):
    data = {}
    if not os.path.exists(path):
        return data
    for baris in open(path, encoding="utf-8"):
        m = re.match(r"^([a-z_]+):\s*(.*)$", baris.rstrip("\n"))
        if not m:
            continue
        k, v = m.groups()
        try:
            data[k] = json.loads(v) if v[:1] in '["{' else v
        except ValueError:
            data[k] = v
    return data


def bagian(md, judul):
    m = re.search(r"^" + re.escape(judul) + r".*$", md, re.M)
    if not m:
        return ""
    sisa = md[m.end():]
    n = re.search(r"^#{2,3} ", sisa, re.M)
    return sisa[: n.start()] if n else sisa


def tabel(blok, kolom0):
    baris = []
    for l in blok.split("\n"):
        if l.startswith("|") and not re.match(r"^\|\s*:?-", l):
            c = [x.strip() for x in l.strip().strip("|").split("|")]
            if c[0] != kolom0:
                baris.append(c)
    return baris


def tanpa_tautan(s):
    return re.sub(r"\[([^\]]+)\]\((https?://[^)]+)\)", r"\1 (\2)", s)


def folder_lama(meta, slug_proyek):
    """Folder proyek lama (pov/<slug>) atau $ASET_DIR/proyek/<slug>."""
    kandidat = []
    if meta.get("arsip_lama"):
        kandidat.append(os.path.join(os.path.dirname(AKAR), meta["arsip_lama"]))
        arsip = os.environ.get("ARSIP_DIR") or baca_env().get("ARSIP_DIR")
        if arsip:  # folder induk proyek lama bila tidak bersebelahan dengan repo
            kandidat.append(os.path.join(arsip, os.path.basename(meta["arsip_lama"])))
    kandidat.append(os.path.join(aset_dir(), "proyek", slug_proyek))
    for k in kandidat:
        if os.path.isdir(k):
            return k
    return None


def aset_dir():
    """Folder aset berat. Bawaan: folder aset/ di dalam repo (diabaikan git). Path relatif dihitung dari akar repo."""
    aset = os.environ.get("ASET_DIR") or baca_env().get("ASET_DIR") or "aset"
    return aset if os.path.isabs(aset) else os.path.join(AKAR, aset)


def baca_env():
    path = os.path.join(AKAR, ".env")
    hasil = {}
    if os.path.exists(path):
        for l in open(path, encoding="utf-8"):
            m = re.match(r"^\s*([A-Z_]+)\s*=\s*(.*?)\s*$", l)
            if m:
                hasil[m.group(1)] = m.group(2).strip('"')
    return hasil


def cari_berkas(folder, sub, pola):
    """Cari berkas di <folder>/<sub>; proyek lama memakai public/<jenis>, folder aset baru langsung <jenis>."""
    if not folder:
        return None
    calon = [sub]
    if sub.startswith("public/"):
        calon.append(sub[len("public/"):])
    for c in calon:
        if not os.path.isdir(os.path.join(folder, c)):
            continue
        for f in sorted(os.listdir(os.path.join(folder, c))):
            if re.match(pola, f, re.I):
                return f"{c}/{f}"
    return None


SIDIK = None


def sidik(path):
    """Sidik isi berkas (ukuran + md5) untuk mengenali berkas pustaka yang dipakai ulang."""
    import hashlib
    h = hashlib.md5()
    with open(path, "rb") as f:
        for blok in iter(lambda: f.read(1 << 20), b""):
            h.update(blok)
    return f"{os.path.getsize(path)}-{h.hexdigest()}"


def kartu_dari_berkas(folder, rel):
    """Kartu pustaka (jenis, id) yang berkasnya sama persis dengan berkas proyek ini, bila ada."""
    global SIDIK
    if not folder or not rel:
        return None
    if SIDIK is None:
        # indeks menurut ukuran dulu; md5 hanya dihitung untuk berkas yang ukurannya sama
        SIDIK = {}
        akar = os.path.join(aset_dir(), "pustaka")
        for path in glob.glob(os.path.join(akar, "*", "*", "*")):
            if os.path.isfile(path):
                jenis, id_ = os.path.relpath(path, akar).split(os.sep)[:2]
                SIDIK.setdefault(os.path.getsize(path), []).append((path, (jenis, id_)))
    path = os.path.join(folder, rel)
    if not os.path.isfile(path):
        return None
    calon = SIDIK.get(os.path.getsize(path), [])
    if not calon:
        return None
    s = sidik(path)
    return next((k for p, k in calon if sidik(p) == s), None)


def tahun(teks):
    m = re.findall(r"\b(1[0-9]{3}|20[0-2][0-9])\b", teks)
    return m[0] if m else ""


def panen(slug_proyek):
    folder = os.path.join(AKAR, "proyek", slug_proyek)
    md = open(os.path.join(folder, "KONSEP.md"), encoding="utf-8").read()
    meta = baca_yaml(os.path.join(folder, "proyek.yaml"))
    lama = folder_lama(meta, slug_proyek)
    wilayah = meta.get("latar", "")
    kartu = []

    # tokoh
    akurasi = tabel(bagian(md, "### Catatan akurasi visual"), "Tokoh")
    for m in re.finditer(r"^\*\*(?:Lembar karakter · |0[A-Z] · )(.+?)\*\*\s*```[a-z]*\n(.*?)```", md, re.M | re.S):
        nama, prompt = m.group(1).strip(), m.group(2).strip()
        baris = prompt.split("\n")
        deskripsi = baris[1] if len(baris) > 1 and baris[0].lower().startswith("character reference sheet") else ""
        ak = []
        for c in akurasi:
            if len(c) >= 5 and c[0].lower() == nama.lower():
                st = next((s for s in STATUS_AKURASI if c[4].startswith(s)), None)
                if st:
                    ak.append({"unsur": c[1], "pilihan": tanpa_tautan(c[2]), "sumber": tanpa_tautan(c[3]), "status": st})
        era = tahun(prompt)
        id_ = slug(nama, 36)
        if era and era not in id_:
            id_ += f"-{era}"
        elif not era:
            akhir = slug(wilayah.split(",")[0], 20)
            if akhir not in id_:
                id_ += "-" + akhir
        gambar = cari_berkas(lama, "public/ilustrasi", rf"lembar-(karakter-)?{re.escape(slug(nama, 60))}\.(png|jpe?g|webp)$")
        k = {
            "jenis": "tokoh", "id": id_,
            "judul": nama, "era": era, "wilayah": wilayah, "tokoh": [nama],
            "file": [os.path.basename(gambar)] if gambar else [], "alat": "Gemini", "akurasi": ak,
            "_prompt": prompt, "_deskripsi": deskripsi,
        }
        if gambar:
            k["_asal"] = gambar
        else:
            k["catatan"] = f"Gambar lembar karakter belum disimpan; simpan sebagai ilustrasi/lembar-{slug(nama, 60)}.png di folder aset proyek, atau buat ulang dari prompt.txt."
        kartu.append(k)

    # musik
    mus = bagian(md, "### Musik")
    for c in tabel(mus.split("**Cue")[0], "Cue"):
        n = re.match(r"(\d+)", c[0]) if c else None
        if not n or len(c) < 4:
            continue
        n = n.group(1)
        nama = c[0].split("·")[-1].strip()
        m = re.search(r"\*\*Cue " + n + r"\*\*\s*```[a-z]*\n(.*?)```\s*(?:Exclude Styles:\s*`([^`]*)`)?", mus, re.S)
        if not m or re.match(r"(?i)tidak dibuat", m.group(1).strip()):
            continue  # bukan cue Suno (misalnya lagu berlisensi yang dipasang di aplikasi)
        style = m.group(1).strip()
        exclude = m.group(2) or ""
        berkas = cari_berkas(lama, "public/musik", rf"cue-0*{n}[-.]")
        if not berkas:
            continue
        kartu.append({
            "jenis": "musik", "id": f"{slug(nama, 28)}-{singkat(slug_proyek)}",
            "judul": f"{nama} ({c[3]})", "era": "", "wilayah": wilayah, "file": [os.path.basename(berkas)],
            "alat": "Suno", "lisensi": "Belum dicatat: cek paket Suno saat lagu dibuat",
            "_prompt": style + (f"\nExclude Styles: {exclude}" if exclude else ""),
            "_deskripsi": f"{c[3]}. Durasi target {c[2]}, babak {c[1]}.",
            "_asal": berkas,
        })

    # sfx
    for c in tabel(bagian(md, "### Efek suara"), "#"):
        if len(c) < 4 or not c[0].isdigit():
            continue
        berkas = cari_berkas(lama, "public/sfx", rf"sfx-0*{c[0]}-")
        if not berkas:
            continue
        nama_berkas = re.sub(r"^sfx-\d+-|\.\w+$", "", os.path.basename(berkas))
        kartu.append({
            "jenis": "sfx", "id": slug(nama_berkas, 48), "judul": c[2], "wilayah": wilayah,
            "file": [os.path.basename(berkas)], "alat": "Belum dicatat (ElevenLabs SFX atau pustaka bunyi)",
            "_prompt": c[4] if len(c) > 4 else "", "_deskripsi": c[3], "_asal": berkas,
        })
    for k in kartu:
        k["_proyek"] = slug_proyek
        if k["jenis"] in ("musik", "sfx") and k.get("_asal"):
            k["_pakai_ulang"] = kartu_dari_berkas(lama, k["_asal"])
    return kartu


ADA = {}


def muat_ada():
    for path in glob.glob(os.path.join(PUSTAKA, "*", "*", "aset.json")):
        kartu = json.load(open(path, encoding="utf-8"))
        pp = os.path.join(os.path.dirname(path), "prompt.txt")
        ADA[(kartu["jenis"], kartu["id"])] = {"kartu": kartu, "prompt": open(pp, encoding="utf-8").read().strip() if os.path.exists(pp) else "", "ubah": False}


def akhiran(k):
    return singkat(k["_proyek"])


def singkat(slug_proyek):
    hasil = slug(re.sub(r"^(pov|narasi)-", "", slug_proyek), 24)
    part = re.search(r"part-(\d+)$", slug_proyek)
    return f"{hasil}-p{part.group(1)}" if part and not hasil.endswith(part.group(0)) else hasil


def daftarkan(k):
    """Masukkan kartu ke ADA. Hasil: baru, tambah-proyek, pakai-ulang, atau sama."""
    if k.get("_pakai_ulang") and tuple(k["_pakai_ulang"]) in ADA:
        # berkasnya disalin dari kartu pustaka yang sudah ada: catat pemakaiannya, jangan buat kartu baru
        v = ADA[tuple(k["_pakai_ulang"])]
        if k["_proyek"] in v["kartu"].setdefault("dipakai_di", []):
            return "sama"
        v["kartu"]["dipakai_di"].append(k["_proyek"])
        v["ubah"] = True
        return "pakai-ulang"
    if k["jenis"] == "tokoh":
        for v in ADA.values():
            if v["kartu"]["jenis"] == "tokoh" and v["kartu"].get("judul") == k["judul"] and k["_proyek"] not in v["kartu"]["dipakai_di"] \
                    and difflib.SequenceMatcher(None, v["prompt"], k["_prompt"]).ratio() >= 0.6:
                v["kartu"]["dipakai_di"].append(k["_proyek"])
                v["ubah"] = True
                return "tambah-proyek"
    kunci = (k["jenis"], k["id"])
    if kunci in ADA:
        lama = ADA[kunci]
        if k["_proyek"] in lama["kartu"].get("dipakai_di", []):
            return "sama"
        mirip = difflib.SequenceMatcher(None, lama["prompt"], k["_prompt"]).ratio()
        if k["jenis"] == "tokoh" and mirip >= 0.6:
            lama["kartu"]["dipakai_di"].append(k["_proyek"])
            lama["ubah"] = True
            return "tambah-proyek"
        if k["id"].endswith("-" + akhiran(k)):
            return "sama"
        k["id"] = f"{k['id']}-{akhiran(k)}"
        return daftarkan(k)
    kartu = {"id": k["id"], "jenis": k["jenis"], "judul": k["judul"], "versi": 1, "status": "draf"}
    for f in ("era", "wilayah", "tokoh", "file", "alat", "akurasi", "lisensi"):
        if k.get(f):
            kartu[f] = k[f]
    kartu.setdefault("file", [])
    if k.get("_asal"):
        kartu["asal"] = [{"proyek": k["_proyek"], "berkas": k["_asal"]}]
    kartu["dipakai_di"] = [k["_proyek"]]
    if k.get("catatan"):
        kartu["catatan"] = k["catatan"]
    ADA[kunci] = {"kartu": kartu, "prompt": k["_prompt"], "deskripsi": k["_deskripsi"], "ubah": True}
    return "baru"


def simpan_semua():
    for (jenis, id_), v in ADA.items():
        if not v["ubah"]:
            continue
        folder = os.path.join(PUSTAKA, jenis, id_)
        os.makedirs(folder, exist_ok=True)
        json.dump(v["kartu"], open(os.path.join(folder, "aset.json"), "w", encoding="utf-8", newline="\n"), ensure_ascii=False, indent=2)
        for nama, isi in (("prompt.txt", v.get("prompt")), ("deskripsi.txt", v.get("deskripsi"))):
            if isi and not os.path.exists(os.path.join(folder, nama)):
                open(os.path.join(folder, nama), "w", encoding="utf-8", newline="\n").write(isi + "\n")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("slug", nargs="*")
    ap.add_argument("--semua", action="store_true")
    ap.add_argument("--tulis", action="store_true")
    a = ap.parse_args()
    proyek = a.slug
    if a.semua:
        def kunci(p):
            meta = baca_yaml(os.path.join(p, "proyek.yaml"))
            return (str(meta.get("tanggal_render", "")), os.path.basename(p))
        proyek = [os.path.basename(p) for p in sorted((os.path.dirname(x) for x in glob.glob(os.path.join(AKAR, "proyek", "*", "KONSEP.md"))), key=kunci)]
    muat_ada()
    hitung = {}
    tanpa_lama = []
    for s in proyek:
        meta = baca_yaml(os.path.join(AKAR, "proyek", s, "proyek.yaml"))
        if not folder_lama(meta, s):
            tanpa_lama.append(s)
        for k in panen(s):
            hasil = daftarkan(k)
            hitung.setdefault(k["jenis"], {}).setdefault(hasil, 0)
            hitung[k["jenis"]][hasil] += 1
    for j, h in sorted(hitung.items()):
        print(f"{j}: " + ", ".join(f"{v} {k}" for k, v in sorted(h.items())))
    if tanpa_lama:
        print("Folder aset tidak ditemukan (musik dan SFX dilewati):", ", ".join(tanpa_lama))
    if a.tulis:
        simpan_semua()
    else:
        print("Pratinjau saja; tambahkan --tulis untuk menulis kartu.")


if __name__ == "__main__":
    main()
