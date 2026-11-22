import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useData, Memuat, kirim, toast, dengarAlat } from '../komponen.jsx';

// Halaman Alat: menjalankan skrip repo yang terdaftar di server/alat.mjs, dengan keluaran langsung.

export default function Alat({ fokus, slugAwal }) {
  const { data, galat } = useData('/api/alat');
  const { data: proyek } = useData('/api/proyek');
  const [tugas, setTugas] = useState({});
  useEffect(() => {
    if (data) setTugas((t) => ({ ...data.tugas, ...Object.fromEntries(Object.entries(t).filter(([id, x]) => !data.tugas[id] || x.no >= data.tugas[id].no)) }));
  }, [data]);
  useEffect(
    () =>
      dengarAlat((d) =>
        setTugas((t) => {
          const lama = t[d.id];
          if (lama && lama.no > d.no) return t;
          return { ...t, [d.id]: { ...(lama && lama.no === d.no ? lama : {}), ...d } };
        }),
      ),
    [],
  );
  useEffect(() => {
    if (fokus && data) setTimeout(() => document.getElementById(`alat-${fokus}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
  }, [fokus, !!data]);
  const kelompok = useMemo(() => {
    const g = {};
    (data?.daftar || []).forEach((a) => (g[a.kelompok] ||= []).push(a));
    return g;
  }, [data]);
  if (!data) return <Memuat galat={galat} />;
  const slugs = (proyek || []).map((p) => ({ slug: p.slug, judul: p.judul, tahap: p.tahap })).sort((a, b) => a.slug.localeCompare(b.slug));
  return (
    <>
      <div className="judul-hal">
        <div>
          <span className="label">Alat</span>
          <h1>Skrip repo</h1>
          <p className="redup">
            Menjalankan skrip di repo dari sini. Alat yang menulis berkas punya tombol Pratinjau (tanpa menulis apa pun) dan Jalankan. Perubahan yang ditulis tetap perlu di-commit.
          </p>
        </div>
      </div>
      {Object.entries(kelompok).map(([k, daftar]) => (
        <section key={k} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <h2 className="serif">{k}</h2>
          <div className="kisi-alat">
            {daftar.map((a) => (
              <KartuAlat key={a.id} alat={a} tugas={tugas[a.id]} catat={(t) => setTugas((x) => ({ ...x, [t.id]: { ...t, ...(x[t.id]?.no === t.no ? x[t.id] : {}) } }))} slugs={slugs} awal={a.id === fokus && slugAwal ? { slug: slugAwal } : {}} sorot={a.id === fokus} />
            ))}
          </div>
        </section>
      ))}
    </>
  );
}

function KartuAlat({ alat, tugas, slugs, awal, sorot, catat }) {
  const [nilai, setNilai] = useState(() => {
    const v = {};
    for (const i of alat.isian) v[i.nama] = awal[i.nama] ?? (i.jenis === 'pilihan' ? i.pilihan[0][0] : '');
    return v;
  });
  const keluar = useRef(null);
  const jalan = tugas?.status === 'jalan';
  useEffect(() => {
    const el = keluar.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [tugas?.keluaran?.length]);
  const mulai = async (tulis) => {
    try {
      catat(await kirim(`/api/alat/${alat.id}`, { ...nilai, tulis }, 'POST'));
    } catch (e) {
      toast(e.message);
    }
  };
  const idIsian = (n) => `alat-${alat.id}-${n}`;
  return (
    <article id={`alat-${alat.id}`} className={`blok kartu-alat${sorot ? ' sorot' : ''}`}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'baseline' }}>
        <h3 className="jdl-alat">{alat.judul}</h3>
        {tugas && <span className={`pil ${tugas.status === 'gagal' ? 'bahaya' : tugas.status === 'jalan' ? 'pelita' : ''}`}>{{ jalan: 'Berjalan', selesai: 'Selesai', gagal: 'Gagal' }[tugas.status]}</span>}
      </div>
      <p className="kecil redup">{alat.keterangan}</p>
      <form
        className="isian-alat"
        onSubmit={(e) => {
          e.preventDefault();
          mulai(false);
        }}
      >
        {alat.isian.map((i) => (
          <div key={i.nama} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label htmlFor={idIsian(i.nama)} className="kecil" style={{ fontWeight: 700 }}>
              {i.label}
              {i.opsional ? <span className="redup"> (opsional)</span> : null}
            </label>
            {i.jenis === 'proyek' ? (
              <select id={idIsian(i.nama)} value={nilai[i.nama]} onChange={(e) => setNilai({ ...nilai, [i.nama]: e.target.value })}>
                <option value="">Pilih proyek</option>
                {slugs.map((p) => (
                  <option key={p.slug} value={p.slug}>
                    {p.slug} · {p.tahap}
                  </option>
                ))}
              </select>
            ) : i.jenis === 'pilihan' ? (
              <select id={idIsian(i.nama)} value={nilai[i.nama]} onChange={(e) => setNilai({ ...nilai, [i.nama]: e.target.value })}>
                {i.pilihan.map(([v, t]) => (
                  <option key={v} value={v}>
                    {t}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={idIsian(i.nama)}
                type="text"
                value={nilai[i.nama]}
                placeholder={i.contoh || (i.jenis === 'berkas' ? 'Path lengkap berkas' : i.jenis === 'folder' ? 'Path lengkap folder' : '')}
                onChange={(e) => setNilai({ ...nilai, [i.nama]: e.target.value })}
                spellCheck={false}
              />
            )}
          </div>
        ))}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {alat.tulis ? (
            <>
              <button type="submit" disabled={jalan}>
                Pratinjau
              </button>
              <button type="button" className="utama" disabled={jalan} onClick={() => mulai(true)}>
                Jalankan dan tulis
              </button>
            </>
          ) : (
            <button type="submit" className="utama" disabled={jalan}>
              Jalankan
            </button>
          )}
        </div>
      </form>
      {tugas && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {tugas.perintah && (
            <p className="kecil redup" style={{ wordBreak: 'break-all' }}>
              <code>{tugas.perintah}</code>
              {tugas.tulis === false && alat.tulis ? ' · pratinjau, tidak ada yang ditulis' : ''}
            </p>
          )}
          <pre ref={keluar} className="prompt keluaran-alat" aria-live="polite">
            {(tugas.keluaran || []).join('\n') || (jalan ? 'Menunggu keluaran...' : '(tanpa keluaran)')}
          </pre>
        </div>
      )}
    </article>
  );
}
