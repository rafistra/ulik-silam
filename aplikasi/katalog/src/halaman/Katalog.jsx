import React, { useMemo, useState } from 'react';
import { useData, Lapisan, Memuat, ringkasAngka } from '../komponen.jsx';

const norm = (s) => (s || '').toString().toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '');

export default function Katalog({ cari }) {
  const { data: info } = useData('/api/info');
  const { data, galat } = useData('/api/proyek');
  const [f, setF] = useState({ lapisan: '', format: '', tahap: '', seri: '', urut: 'render' });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const hasil = useMemo(() => {
    if (!data) return [];
    const q = norm(cari);
    let d = data.filter(
      (p) =>
        (!f.lapisan || p.lapisan.includes(f.lapisan)) &&
        (!f.format || p.format === f.format) &&
        (!f.tahap || p.tahap === f.tahap) &&
        (!f.seri || p.seri === f.seri) &&
        (!q || norm([p.judul, p.slug, p.latar, p.seri, ...p.tokoh].join(' ')).includes(q)),
    );
    const views = (p) => (p.metrikTiktok?.views || 0) + (p.metrikShorts?.views || 0);
    const urut = {
      render: (a, b) => (b.tanggalRender || '').localeCompare(a.tanggalRender || ''),
      views: (a, b) => views(b) - views(a),
      judul: (a, b) => a.judul.localeCompare(b.judul, 'id'),
    }[f.urut];
    return d.sort(urut);
  }, [data, f, cari]);

  if (!data || !info) return <Memuat galat={galat} />;
  const unik = (k) => [...new Set(data.map((p) => p[k]).filter(Boolean))].sort();
  const pilih = (id, label, k, opsi) => (
    <div>
      <label htmlFor={id} className="label">
        {label}
      </label>
      <select id={id} value={f[k]} onChange={set(k)}>
        <option value="">Semua</option>
        {opsi.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );

  return (
    <>
      <div className="judul-hal">
        <div>
          <h1>Katalog konsep</h1>
          <p className="redup">Semua proyek di repo, dari ide sampai tayang. Klik kartu untuk membuka konsep, aset, dan render.</p>
        </div>
      </div>
      <form className="saring" aria-label="Saring katalog" onSubmit={(e) => e.preventDefault()}>
        {pilih('f-lapisan', 'Lapisan', 'lapisan', ['Sejarah', 'Legenda', 'Mitos', 'Rekaan'])}
        {pilih('f-format', 'Format', 'format', unik('format'))}
        {pilih('f-tahap', 'Tahap', 'tahap', info.tahap)}
        {pilih('f-seri', 'Seri', 'seri', unik('seri'))}
        <div>
          <label htmlFor="f-urut" className="label">
            Urutkan
          </label>
          <select id="f-urut" value={f.urut} onChange={set('urut')}>
            <option value="render">Terakhir dirender</option>
            <option value="views">Views terbanyak</option>
            <option value="judul">Judul</option>
          </select>
        </div>
        <div style={{ flex: '1 1 24px' }} />
        <p className="redup kecil" style={{ paddingBottom: 12 }}>
          {hasil.length} dari {data.length} proyek{cari ? ` · cari "${cari}"` : ''}
        </p>
      </form>
      <div className="kisi">
        {hasil.map((p) => (
          <a key={p.slug} className="kartu-kat" href={`#/konsep/${p.slug}`}>
            <div className="gbr">
              {p.gambar ? <img src={p.gambar} alt="" loading="lazy" /> : null}
              <span className="baris-chip" style={{ position: 'absolute', left: 10, top: 10, right: 10 }}>
                {p.lapisan.map((l) => (
                  <Lapisan key={l} nama={l} />
                ))}
              </span>
            </div>
            <div className="badan">
              <span className="jdl">{p.judul}</span>
              <span className="redup kecil">{[p.format, p.latar].filter(Boolean).join(' · ')}</span>
              <div className="baris-chip">
                <span className="pil">{p.tahap}</span>
                {p.seri && <span className="pil">{p.seri}</span>}
                {(p.metrikTiktok || p.metrikShorts) && (
                  <span className="pil pelita">{ringkasAngka((p.metrikTiktok?.views || 0) + (p.metrikShorts?.views || 0))} views</span>
                )}
              </div>
            </div>
          </a>
        ))}
      </div>
      {hasil.length === 0 && <p className="kosong">Tidak ada proyek yang cocok dengan saringan ini.</p>}
    </>
  );
}
