import React, { useState } from 'react';
import { useData, kirim, toast, DaftarLapisan, Memuat, ringkasAngka } from '../komponen.jsx';

export default function Papan() {
  const { data: info } = useData('/api/info');
  const { data, galat, muatUlang } = useData('/api/proyek');
  const [seret, setSeret] = useState(null);
  const [di, setDi] = useState(null);
  if (!data || !info) return <Memuat galat={galat} />;

  const pindah = async (slug, tahap) => {
    const p = data.find((x) => x.slug === slug);
    if (!p || p.tahap === tahap) return;
    try {
      const r = await kirim(`/api/proyek/${slug}`, { tahap });
      toast(`${p.judul} → ${tahap}. ${r.status.ok ? 'STATUS.md diperbarui.' : r.status.pesan}`);
      muatUlang();
    } catch (e) {
      toast(`Gagal: ${e.message}`);
    }
  };

  return (
    <>
      <div className="judul-hal">
        <div>
          <h1>Papan produksi</h1>
          <p className="redup">Geser kartu ke kolom lain, atau pilih tahapnya di kartu. Yang diubah hanya proyek.yaml; commit tetap manual.</p>
        </div>
        <p className="redup kecil">{data.length} proyek</p>
      </div>
      <div className="papan">
        {info.tahap.map((t) => {
          const isi = data.filter((p) => p.tahap === t).sort((a, b) => (a.prioritas ?? 99) - (b.prioritas ?? 99) || (b.tanggalRender || '').localeCompare(a.tanggalRender || ''));
          const batas = info.batas[t];
          const lebih = batas && isi.length > batas;
          return (
            <section
              key={t}
              aria-label={t}
              className={`kolom${lebih ? ' lebih' : ''}${di === t ? ' seret' : ''}`}
              onDragOver={(e) => {
                e.preventDefault();
                setDi(t);
              }}
              onDragLeave={() => setDi((x) => (x === t ? null : x))}
              onDrop={(e) => {
                e.preventDefault();
                setDi(null);
                if (seret) pindah(seret, t);
                setSeret(null);
              }}
            >
              <h2>
                <span>{t}</span>
                <span className="redup">{isi.length}</span>
              </h2>
              {batas && (
                <p className="kecil" style={{ padding: '6px 10px', borderRadius: 6, background: 'var(--latar)', color: lebih ? 'var(--mitos)' : 'var(--redup)' }}>
                  Batas kerja: <strong style={{ color: 'var(--tinta)' }}>{isi.length} / {batas}</strong>
                  {lebih ? ' · melebihi batas' : ''}
                </p>
              )}
              {isi.map((p) => (
                <a
                  key={p.slug}
                  className="kartu-papan"
                  href={`#/konsep/${p.slug}`}
                  draggable
                  onDragStart={(e) => {
                    setSeret(p.slug);
                    e.dataTransfer.effectAllowed = 'move';
                  }}
                  onDragEnd={() => setSeret(null)}
                >
                  <DaftarLapisan lapisan={p.lapisan} />
                  <span className="jdl">{p.judul}</span>
                  <span className="redup kecil">
                    {[p.format, p.latar].filter(Boolean).join(' · ')}
                    {p.metrikTiktok || p.metrikShorts ? ` · ${ringkasAngka((p.metrikTiktok?.views || 0) + (p.metrikShorts?.views || 0))} views` : ''}
                  </span>
                  {p.catatan && <span className="kecil">{p.catatan}</span>}
                  {p.masalah > 0 && <span className="pil bahaya">{p.masalah} masalah kontrak</span>}
                  <label className="sr" htmlFor={`tahap-${p.slug}`}>
                    Tahap {p.judul}
                  </label>
                  <select id={`tahap-${p.slug}`} value={p.tahap} onClick={(e) => e.preventDefault()} onChange={(e) => pindah(p.slug, e.target.value)}>
                    {info.tahap.map((x) => (
                      <option key={x}>{x}</option>
                    ))}
                  </select>
                </a>
              ))}
              {isi.length === 0 && <p className="kosong kecil">Belum ada proyek</p>}
            </section>
          );
        })}
      </div>
    </>
  );
}
