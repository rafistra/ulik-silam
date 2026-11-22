import React, { useMemo, useState } from 'react';
import { useData, kirim, toast, Memuat, Salin } from '../komponen.jsx';

const JENIS = [
  ['tokoh', 'Tokoh'],
  ['musik', 'Musik'],
  ['sfx', 'SFX'],
  ['busana', 'Busana'],
  ['latar', 'Latar'],
  ['arsip', 'Arsip'],
];
const norm = (s) => (s || '').toString().toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '');
const WARNA_STATUS = { draf: 'var(--redup)', disetujui: 'var(--legenda)', usang: 'var(--mitos)' };

export default function Pustaka({ cari, jenisAwal }) {
  const { data, galat, muatUlang } = useData('/api/pustaka');
  const { data: proyek } = useData('/api/proyek');
  const [jenis, setJenis] = useState(jenisAwal || 'tokoh');
  const [status, setStatus] = useState('');
  const [buka, setBuka] = useState(null);

  const judulProyek = useMemo(() => Object.fromEntries((proyek || []).map((p) => [p.slug, p.judul])), [proyek]);
  const hasil = useMemo(() => {
    if (!data) return [];
    const q = norm(cari);
    return data.filter(
      (a) =>
        a.jenis === jenis &&
        (!status || a.status === status) &&
        (!q || norm([a.id, a.judul, a.era, a.wilayah, a.deskripsi, a.prompt, ...(a.dipakai_di || []).map((s) => judulProyek[s] || s)].join(' ')).includes(q)),
    );
  }, [data, jenis, status, cari, judulProyek]);

  if (!data) return <Memuat galat={galat} />;
  const hitung = (j) => data.filter((a) => a.jenis === j).length;

  const ubah = async (kartu, st) => {
    try {
      if (Array.isArray(kartu)) {
        const r = await kirim('/api/pustaka', { kartu: kartu.map(({ jenis, id }) => ({ jenis, id })), status: st });
        toast(`${r.jumlah} kartu menjadi ${st}`);
      } else {
        await kirim(`/api/pustaka/${kartu.jenis}/${kartu.id}`, { status: st });
        toast(`${kartu.judul || kartu.id} menjadi ${st}`);
      }
      muatUlang();
    } catch (e) {
      toast(`Gagal: ${e.message}`);
    }
  };
  const draf = hasil.filter((a) => a.status === 'draf');

  return (
    <>
      <div className="judul-hal">
        <div>
          <h1>Pustaka aset</h1>
          <p className="redup">Tokoh, musik, dan SFX yang bisa dipakai ulang lintas proyek. Hanya aset berstatus disetujui yang dipakai di proyek baru.</p>
        </div>
      </div>
      <nav className="tab" aria-label="Jenis aset">
        {JENIS.filter(([j]) => hitung(j) || j === jenis).map(([j, nama]) => (
          <a
            key={j}
            href={`#/pustaka/${j}`}
            aria-current={jenis === j ? 'page' : undefined}
            onClick={() => {
              setJenis(j);
              setBuka(null);
            }}
          >
            {nama} <span className="redup">{hitung(j)}</span>
          </a>
        ))}
      </nav>
      <form className="saring" aria-label="Saring pustaka" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="p-status" className="label">
            Status
          </label>
          <select id="p-status" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">Semua</option>
            <option value="draf">Draf</option>
            <option value="disetujui">Disetujui</option>
            <option value="usang">Usang</option>
          </select>
        </div>
        <div style={{ flex: '1 1 24px' }} />
        <p className="redup kecil" style={{ paddingBottom: 12 }}>
          {hasil.length} kartu{cari ? ` · cari "${cari}"` : ''}
        </p>
        {draf.length > 0 && (
          <button type="button" className="utama" onClick={() => ubah(draf, 'disetujui')}>
            Setujui {draf.length} draf yang tampil
          </button>
        )}
      </form>

      {jenis === 'tokoh' ? (
        <div className="kisi-pustaka">
          {hasil.map((a) => {
            const g = a.berkas.find((b) => b.ada && /\.(png|jpe?g|webp)$/i.test(b.nama));
            return (
              <article key={a.id} className="kartu-pus">
                <button type="button" className="gbr" style={{ border: 0, borderRadius: 0, padding: 0, minHeight: 0 }} onClick={() => setBuka(buka === a.id ? null : a.id)} aria-expanded={buka === a.id} aria-label={`Rincian ${a.judul}`}>
                  {g ? <img src={g.url} alt="" loading="lazy" /> : <span>Belum ada gambar</span>}
                </button>
                <div className="badan">
                  <span className="jdl">{a.judul}</span>
                  <span className="redup kecil">{[a.era, a.wilayah].filter(Boolean).join(' · ')}</span>
                  <StatusDanAksi a={a} ubah={ubah} />
                  <Dipakai a={a} judulProyek={judulProyek} />
                  {buka === a.id && <Rincian a={a} />}
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="daftar-pus">
          {hasil.map((a) => {
            const audio = a.berkas.find((b) => b.ada);
            return (
              <article key={a.id} className="baris-pus">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
                  <button type="button" onClick={() => setBuka(buka === a.id ? null : a.id)} aria-expanded={buka === a.id} style={{ all: 'unset', cursor: 'pointer', fontWeight: 700 }}>
                    {a.judul}
                  </button>
                  <span className="redup kecil">
                    {a.id}
                    {a.deskripsi ? ` · ${a.deskripsi}` : ''}
                  </span>
                  <Dipakai a={a} judulProyek={judulProyek} />
                  {buka === a.id && <Rincian a={a} />}
                </div>
                {audio ? <audio controls preload="none" src={audio.url} /> : <span className="status-kurang kecil">Berkas belum disalin</span>}
                <StatusDanAksi a={a} ubah={ubah} />
              </article>
            );
          })}
        </div>
      )}
      {hasil.length === 0 && <p className="kosong">Tidak ada kartu yang cocok.</p>}
    </>
  );
}

function StatusDanAksi({ a, ubah }) {
  return (
    <div className="baris-chip" style={{ alignItems: 'center' }}>
      <span className="pil" style={{ color: WARNA_STATUS[a.status], borderColor: WARNA_STATUS[a.status] }}>
        {a.status}
      </span>
      {a.status !== 'disetujui' && (
        <button type="button" onClick={() => ubah(a, 'disetujui')} style={{ minHeight: 30, padding: '0 10px' }}>
          Setujui
        </button>
      )}
      {a.status !== 'usang' && (
        <button type="button" onClick={() => ubah(a, 'usang')} style={{ minHeight: 30, padding: '0 10px' }}>
          Usang
        </button>
      )}
    </div>
  );
}

function Dipakai({ a, judulProyek }) {
  return (
    <span className="kecil">
      {(a.dipakai_di || []).map((s, i) => (
        <React.Fragment key={s}>
          {i > 0 && ', '}
          <a href={`#/konsep/${s}`}>{judulProyek[s] || s}</a>
        </React.Fragment>
      ))}
    </span>
  );
}

function Rincian({ a }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 6 }}>
      {a.prompt && (
        <>
          <pre className="prompt">{a.prompt}</pre>
          <div>
            <Salin teks={a.prompt} label="Salin prompt" />
          </div>
        </>
      )}
      {a.akurasi?.length > 0 && (
        <table className="tabel">
          <thead>
            <tr>
              <th>Unsur</th>
              <th>Pilihan</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {a.akurasi.map((x, i) => (
              <tr key={i}>
                <td>{x.unsur}</td>
                <td className="kecil">
                  {x.pilihan}
                  {x.sumber && <div className="redup">{x.sumber}</div>}
                </td>
                <td>{x.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {a.catatan && <p className="redup kecil">{a.catatan}</p>}
    </div>
  );
}
