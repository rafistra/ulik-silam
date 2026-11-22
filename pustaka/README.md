# Pustaka aset Ulik Silam

Aset yang bisa dipakai ulang lintas proyek: lembar karakter tokoh, busana per era, latar, cue musik, SFX, dan foto arsip. Repo hanya menyimpan **kartu** setiap aset; file beratnya ada di `$ASET_DIR/pustaka/` dengan struktur folder yang sama.

```
pustaka/<jenis>/<id>/
  aset.json        # kartu identitas (lihat aset.schema.json)
  prompt.txt       # prompt asli (Gemini atau Style of Music Suno)
  deskripsi.txt    # deskripsi tokoh, busana, atau latar baku (bahasa Inggris)
```

Jenis: `tokoh`, `busana`, `latar`, `musik`, `sfx`, `arsip`.

## Penamaan id

Huruf kecil, dipisah tanda hubung: `<subjek>-<era atau tahun>[-<detail>]`, misalnya `soekarno-1945`, `jawa-mataram-1620an`, `batavia-1740-pelabuhan`, `tegang-gamelan-01`.

## Mengisi pustaka

- `python3 scripts/panen-pustaka.py <slug> --tulis` membuat kartu **draf** dari KONSEP.md proyek: lembar karakter (tokoh), cue Suno (musik), dan SFX yang berkasnya ada. Kartu yang sudah ada hanya ditambah proyeknya di `dipakai_di`.
- Setelah Rafi menyetujui, `status` kartu diubah menjadi `disetujui`; draf yang tidak dipakai diubah menjadi `usang`.
- `python3 scripts/salin-pustaka.py --status disetujui --tulis` menyalin berkas dari proyek asal (`asal`) ke `$ASET_DIR/pustaka/`.

## Aturan

- Hanya aset berstatus **disetujui** yang boleh dipakai di proyek baru. Kartu **draf** adalah usulan hasil panen yang menunggu persetujuan.
- Yang dipakai ulang adalah rujukan (lembar karakter, latar, busana, palet, cue). Ilustrasi adegan yang sama tidak dipakai di video lain, kecuali untuk turunan proyek yang sama (carousel pendamping, sampul, episode lanjutan).
- Lembar yang direvisi disimpan sebagai versi baru (`versi` naik), supaya proyek lama tetap memakai versi lamanya.
- Riset dan sumber disalin dari catatan akurasi visual di KONSEP.md proyek asal.
- Foto arsip wajib punya koleksi dan status lisensi sebelum dipakai.
