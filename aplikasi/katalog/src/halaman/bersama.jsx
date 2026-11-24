// Bagian halaman proyek yang dipakai video dan carousel.
import React, { useEffect, useState } from 'react';
import { kirim, toast, DaftarLapisan } from '../komponen.jsx';

/** Remah, judul, dan chip proyek. */
export function JudulProyek({ slug, meta: m, konsep: k }) {
  return (
    <div className="judul-hal">
      <div>
        <p className="kecil">
          <a href="#/katalog">Katalog</a> <span className="redup">/ {slug}</span>
        </p>
        <h1>{m.judul || k?.judul}</h1>
        <div className="baris-chip" style={{ alignItems: 'center' }}>
          <DaftarLapisan lapisan={m.lapisan || k?.lapisan} />
          <span className="pil">{m.tahap}</span>
          {m.format && <span className="pil">{m.format}</span>}
          {m.seri && <span className="pil">{m.seri}</span>}
          {k?.versi && <span className="pil">{k.versi}</span>}
          <span className="redup kecil">{m.latar || k?.latar}</span>
        </div>
      </div>
    </div>
  );
}

/** Tahap, prioritas, dan catatan di proyek.yaml. */
export function Produksi({ data, info, muatUlang }) {
  const m = data.meta;
  const [catatan, setCatatan] = useState(m.catatan || '');
  const [prioritas, setPrioritas] = useState(m.prioritas ?? '');
  useEffect(() => {
    setCatatan(m.catatan || '');
    setPrioritas(m.prioritas ?? '');
  }, [m.catatan, m.prioritas]);
  const simpan = async (isi) => {
    try {
      await kirim(`/api/proyek/${data.slug}`, isi);
      toast('proyek.yaml disimpan');
      muatUlang();
    } catch (e) {
      toast(`Gagal: ${e.message}`);
    }
  };
  return (
    <div className="blok">
      <h2 className="label">Produksi (proyek.yaml)</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, alignItems: 'flex-end' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label htmlFor="r-tahap" className="label">
            Tahap
          </label>
          <select id="r-tahap" value={m.tahap} onChange={(e) => simpan({ tahap: e.target.value })}>
            {info.tahap.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label htmlFor="r-prio" className="label">
            Prioritas
          </label>
          <input id="r-prio" type="text" inputMode="numeric" value={prioritas} onChange={(e) => setPrioritas(e.target.value.replace(/\D/g, ''))} onBlur={() => simpan({ prioritas: prioritas === '' ? null : +prioritas })} style={{ width: 90 }} />
        </div>
        <span className="redup kecil" style={{ paddingBottom: 12 }}>
          Render {m.tanggal_render || '-'} · tayang{' '}
          {m.tayang ? Object.entries(m.tayang).map(([p, t]) => `${p} ${t}`).join(', ') : '-'}
        </span>
      </div>
      <label htmlFor="r-catatan" className="label">
        Catatan
      </label>
      <textarea id="r-catatan" value={catatan} onChange={(e) => setCatatan(e.target.value)} />
      <div>
        <button type="button" onClick={() => simpan({ catatan })} disabled={catatan === (m.catatan || '')}>
          Simpan catatan
        </button>
      </div>
      {m.tautan && typeof m.tautan === 'object' && Object.values(m.tautan).some((u) => typeof u === 'string' && /^https?:/.test(u)) && (
        <p className="kecil">
          {Object.entries(m.tautan)
            .filter(([, u]) => typeof u === 'string' && /^https?:/.test(u))
            .map(([p, u]) => (
              <a key={p} href={u} target="_blank" rel="noreferrer" style={{ marginRight: 16 }}>
                Buka di {{ shorts: 'YouTube Shorts', tiktok: 'TikTok', instagram: 'Instagram' }[p] || p}
              </a>
            ))}
        </p>
      )}
    </div>
  );
}
