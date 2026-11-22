import React, { useEffect, useMemo, useRef, useState } from 'react';
import { marked } from 'marked';
import { useData, useRender, kirim, toast, DaftarLapisan, Memuat, Salin, angka, tanggal } from '../komponen.jsx';
import Pemutar from '../Pemutar.jsx';

const TAB = [
  ['ringkasan', 'Ringkasan'],
  ['naskah', 'Naskah'],
  ['lembar', 'Lembar karakter'],
  ['audio', 'Audio'],
  ['ulikan', 'Kartu Ulikan dan caption'],
  ['verifikasi', 'Verifikasi'],
  ['aset', 'Aset'],
  ['render', 'Render'],
];
const detik = (w) => {
  const m = (w || '').match(/(\d+):(\d{2})/);
  return m ? +m[1] * 60 + +m[2] : null;
};
const mmss = (d) => `${Math.floor(d / 60)}:${String(Math.round(d % 60)).padStart(2, '0')}`;
const ukuran = (b) => (b > 1e6 ? `${(b / 1e6).toFixed(1)} MB` : `${Math.round(b / 1e3)} KB`);

export default function Konsep({ slug, tab }) {
  const { data: info } = useData('/api/info');
  const { data, galat, muatUlang } = useData(`/api/proyek/${slug}`);
  const [aktif, setAktif] = useState(1);
  const [pilihMode, setMode] = useState(null);
  const videoRef = useRef(null);
  const pemutarRef = useRef(null);
  const { data: dataVideo, galat: galatVideo } = useData(`/api/proyek/${slug}/video`);
  const render = data?.aset.render.find((r) => r.jenis === 'video' && !r.mentah) || data?.aset.render.find((r) => r.jenis === 'video');
  if (!data || !info) return <Memuat galat={galat} />;
  const k = data.konsep;
  const m = data.meta;
  // Video yang sudah tayang dibuka dengan render aslinya; pratinjau memakai komposisi bersama terbaru.
  const mode = pilihMode ?? (render && ['Tayang', 'Evaluasi'].includes(m.tahap) ? 'render' : 'pratinjau');

  const lompat = (a) => {
    setAktif(a.nomor);
    if (mode === 'pratinjau') return pemutarRef.current?.lompat(a.nomor);
    const t = detik(a.waktu);
    if (videoRef.current && t !== null) {
      videoRef.current.currentTime = t;
      videoRef.current.play().catch(() => {});
    }
  };
  const gambarAktif = data.aset.adegan[aktif]?.ilustrasi || data.aset.sampul;

  return (
    <>
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

      <div className="konsep-atas">
        <aside className="pemutar" aria-label="Pratinjau">
          <div className="tab" role="tablist" style={{ borderBottom: 0 }}>
            {[
              ['pratinjau', 'Pratinjau'],
              ['render', 'Render terakhir'],
            ].map(([id, nama]) => (
              <a
                key={id}
                href="#"
                role="tab"
                aria-selected={mode === id}
                aria-current={mode === id ? 'page' : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  setMode(id);
                }}
              >
                {nama}
              </a>
            ))}
          </div>
          {mode === 'pratinjau' ? (
            <div className="layar">{dataVideo ? <Pemutar ref={pemutarRef} data={dataVideo.data} /> : <Memuat galat={galatVideo} />}</div>
          ) : (
            <div className="layar">
              {render ? (
                <video ref={videoRef} src={render.url} controls preload="metadata" />
              ) : gambarAktif ? (
                <img src={gambarAktif} alt={`Ilustrasi adegan ${aktif}`} />
              ) : (
                <p className="redup kecil" style={{ padding: 20, textAlign: 'center' }}>
                  Belum ada render
                </p>
              )}
            </div>
          )}
          <p className="redup kecil">
            {mode === 'pratinjau'
              ? `Komposisi bersama dengan aset yang ada.${render ? ' Video lama bisa sedikit berbeda dari render aslinya karena memakai komposisi terbaru.' : ''} Klik adegan di tab Naskah atau Aset untuk melompat.`
              : render
                ? `${render.nama} · ${tanggal(render.tanggal)}. Klik adegan untuk melompat (perkiraan dari kolom Waktu).`
                : 'Belum ada render video.'}
          </p>
          {dataVideo && Object.values(dataVideo.kurang).some((d) => d.length) && (
            <details>
              <summary>Aset yang belum ada</summary>
              <ul className="kecil">
                {Object.entries(dataVideo.kurang)
                  .filter(([, d]) => d.length)
                  .map(([j, d]) => (
                    <li key={j}>
                      {j}: {d.length}
                    </li>
                  ))}
              </ul>
            </details>
          )}
        </aside>

        <section>
          <nav className="tab" aria-label="Bagian konsep">
            {TAB.map(([id, nama]) => (
              <a key={id} href={`#/konsep/${slug}/${id}`} aria-current={tab === id ? 'page' : undefined}>
                {nama}
              </a>
            ))}
          </nav>
          <div className="panel">
            {!k && <p className="kosong">KONSEP.md belum ada untuk proyek ini.</p>}
            {k && tab === 'ringkasan' && <Ringkasan data={data} info={info} muatUlang={muatUlang} />}
            {k && tab === 'naskah' && <Naskah data={data} aktif={aktif} lompat={lompat} />}
            {k && tab === 'lembar' && <Lembar data={data} />}
            {k && tab === 'audio' && <Audio data={data} />}
            {k && tab === 'ulikan' && <Ulikan k={k} />}
            {k && tab === 'verifikasi' && <Verifikasi data={data} />}
            {k && tab === 'aset' && <Aset data={data} lompat={lompat} />}
            {tab === 'render' && <Render data={data} />}
          </div>
        </section>
      </div>
    </>
  );
}

// ---------- Ringkasan ----------
function Ringkasan({ data, info, muatUlang }) {
  const k = data.konsep;
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
  const st = k.statistik;
  const mt = m.metrik_tiktok, ms = m.metrik_shorts;
  return (
    <>
      <div className="angka">
        <div>
          <span className="label">Adegan</span>
          <b>{st.jumlahAdegan}</b>
        </div>
        <div>
          <span className="label">Babak</span>
          <b>{st.jumlahBabak}</b>
        </div>
        <div>
          <span className="label">Kata narasi</span>
          <b>{st.totalKata}</b>
        </div>
        <div>
          <span className="label">Perkiraan durasi</span>
          <b>
            {mmss(st.perkiraanDetik135.denganMerek)}–{mmss(st.perkiraanDetik130.denganMerek)}
          </b>
          <span className="redup kecil">maks. {mmss(k.durasiMaksDetik || 180)}</span>
        </div>
        {mt && (
          <div>
            <span className="label">Views TikTok</span>
            <b>{angka(mt.views)}</b>
            <span className="redup kecil">
              {angka(mt.suka)} suka · {angka(mt.bagikan)} bagikan
            </span>
          </div>
        )}
        {ms && (
          <div>
            <span className="label">Views Shorts</span>
            <b>{angka(ms.views)}</b>
            <span className="redup kecil">
              {ms.persen_ditonton ?? '-'}% ditonton · +{angka(ms.subscriber)} sub
            </span>
          </div>
        )}
      </div>

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
        {m.tautan && (
          <p className="kecil">
            {Object.entries(m.tautan).map(([p, u]) => (
              <a key={p} href={u} target="_blank" rel="noreferrer" style={{ marginRight: 16 }}>
                Buka di {p === 'shorts' ? 'YouTube Shorts' : 'TikTok'}
              </a>
            ))}
          </p>
        )}
      </div>

      <div className="blok">
        <h2 className="label">Ringkasan konsep</h2>
        <table className="tabel">
          <tbody>
            {Object.entries(k.ringkasan).map(([a, b]) => (
              <tr key={a}>
                <th style={{ width: 180 }}>{a}</th>
                <td>{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {k.palet?.length > 0 && (
        <div className="blok">
          <h2 className="label">Gaya visual per babak</h2>
          <table className="tabel">
            <thead>
              <tr>
                <th>Babak</th>
                <th>Suasana</th>
                <th>Palet</th>
                <th>Cahaya</th>
              </tr>
            </thead>
            <tbody>
              {k.palet.map((p) => (
                <tr key={p.babak}>
                  <td>
                    {p.babak} {p.nama}
                  </td>
                  <td>{p.suasana}</td>
                  <td>{p.palet}</td>
                  <td>{p.cahaya}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {data.pustakaDipakai.length > 0 && (
        <div className="blok">
          <h2 className="label">Aset pustaka dari proyek ini</h2>
          <p className="kecil">
            {['tokoh', 'musik', 'sfx'].map((j) => {
              const n = data.pustakaDipakai.filter((p) => p.jenis === j).length;
              return n ? (
                <a key={j} href={`#/pustaka/${j}`} style={{ marginRight: 16 }}>
                  {n} {j}
                </a>
              ) : null;
            })}
          </p>
        </div>
      )}
    </>
  );
}

// ---------- Naskah ----------
function Naskah({ data, aktif, lompat }) {
  const k = data.konsep;
  const perBabak = useMemo(() => {
    const g = {};
    k.adegan.forEach((a) => (g[a.babak] ||= []).push(a));
    return g;
  }, [k]);
  return (
    <>
      {Object.entries(perBabak).map(([b, daftar]) => (
        <div key={b} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <h2 className="babak-judul">
            Babak {b}: {k.namaBabak[b]}
          </h2>
          {daftar.map((a) => {
            const prompt = k.promptAdegan?.[a.nomor]?.prompt;
            const il = data.aset.adegan[a.nomor]?.ilustrasi;
            return (
              <article key={a.nomor} className={`adegan${aktif === a.nomor ? ' aktif' : ''}`} onClick={() => lompat(a)}>
                <div className="gbr">{il ? <img src={il} alt="" loading="lazy" /> : 'Belum ada ilustrasi'}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 0 }}>
                  <div className="baris-chip">
                    <span className="pil">Adegan {a.nomor}</span>
                    <span className="pil">{a.waktu}</span>
                    <span className="pil">{a.bidikan === 'A' ? 'A · orang pertama' : 'B · sorotan'}</span>
                    {a.hening && <span className="pil pelita">Momen hening</span>}
                    {a.epilog && <span className="pil pelita">Epilog</span>}
                    {a.peta && <span className="pil pelita">Peta animasi</span>}
                    <span className="redup kecil">{a.kata} kata</span>
                  </div>
                  <p className="narasi">
                    {a.narasiSuara.split(/(\[[a-z][a-z ]*\])/g).map((s, i) =>
                      /^\[/.test(s) ? (
                        <span key={i} className="tag">
                          {s}{' '}
                        </span>
                      ) : (
                        s
                      ),
                    )}
                  </p>
                  {a.teksLayar?.length > 0 && <p className="kecil">Teks layar: {a.teksLayar.join(' / ')}</p>}
                  {a.suara && <p className="redup kecil">Suara: {a.suara}</p>}
                  <details onClick={(e) => e.stopPropagation()}>
                    <summary>Visual dan prompt Gemini</summary>
                    <p className="kecil" style={{ margin: '8px 0' }}>
                      {a.visual}
                    </p>
                    {prompt && (
                      <>
                        <pre className="prompt">{prompt}</pre>
                        <div style={{ marginTop: 8 }}>
                          <Salin teks={prompt} label="Salin prompt" />
                        </div>
                      </>
                    )}
                  </details>
                </div>
              </article>
            );
          })}
        </div>
      ))}
    </>
  );
}

// ---------- Lembar karakter ----------
function Lembar({ data }) {
  if (!data.lembar.length) return <p className="kosong">Tidak ada lembar karakter di konsep ini.</p>;
  return data.lembar.map((l) => (
    <div key={l.nama} className="blok lembar">
      <div className="gbr">{l.kartu?.gambar ? <img src={l.kartu.gambar} alt={`Lembar karakter ${l.nama}`} loading="lazy" /> : 'Gambar lembar karakter belum ada di pustaka'}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minWidth: 0 }}>
        <h2 className="serif">{l.nama}</h2>
        {l.kartu && (
          <p className="kecil">
            Pustaka: <a href={`#/pustaka/tokoh`}>{l.kartu.id}</a> <span className="pil">{l.kartu.status}</span>
          </p>
        )}
        <pre className="prompt">{l.prompt}</pre>
        <div>
          <Salin teks={l.prompt} label="Salin prompt" />
        </div>
      </div>
    </div>
  ));
}

// ---------- Audio ----------
function Audio({ data }) {
  const k = data.konsep;
  const s = k.suara || {};
  return (
    <>
      <div className="blok">
        <h2 className="label">Suara narator</h2>
        <p className="kecil">
          Model {s.model || '-'} · Voice {s.voice || '-'} · Stability {s.stability || '-'}
        </p>
        {s.arahan && <p>{s.arahan}</p>}
      </div>
      {Object.entries(k.namaBabak).map(([n, nama]) => (
        <div key={n} className="blok">
          <h2 className="label">
            Narasi babak {n}: {nama}
          </h2>
          {s.arahanBabak?.[n] && <p className="redup kecil">Arahan: {s.arahanBabak[n]}</p>}
          {data.aset.babak[n] ? <audio controls preload="none" src={data.aset.babak[n]} /> : <p className="status-kurang kecil">Rekaman babak belum ada</p>}
          {(() => {
            // Satu paragraf per adegan, diakhiri "..." agar jeda antar-adegan bisa dideteksi saat memotong.
            const teks = k.narasiLengkap?.[n] || k.adegan.filter((a) => String(a.babak) === String(n)).map((a) => (/(\.\.\.|…)$/.test(a.narasiSuara) ? a.narasiSuara : a.narasiSuara.replace(/\.$/, '') + '...')).join('\n\n');
            return (
              <details>
                <summary>
                  Teks ElevenLabs · {teks.length.toLocaleString('id-ID')} karakter{teks.length > 3000 ? ' · lebih dari 3.000, bagi dua di batas adegan (babak-' + n + '-a dan -b)' : ''}
                </summary>
                <pre className="prompt">{teks}</pre>
                <div style={{ marginTop: 8 }}>
                  <Salin teks={teks} label="Salin teks babak" />
                </div>
              </details>
            );
          })()}
        </div>
      ))}
      <div className="blok">
        <h2 className="label">Musik (Suno)</h2>
        {k.cueMusik.map((c) => (
          <div key={c.nomor} style={{ display: 'flex', flexDirection: 'column', gap: 6, paddingBottom: 12, borderBottom: '1px solid var(--garis)' }}>
            <p>
              <b>
                Cue {c.nomor} · {c.nama}
              </b>{' '}
              <span className="redup kecil">
                babak {c.babakAwal}
                {c.babakAkhir !== c.babakAwal ? `–${c.babakAkhir}` : ''} · {c.durasiTarget} · {c.suasana}
              </span>
            </p>
            {data.aset.musik[c.nomor] ? <audio controls preload="none" src={data.aset.musik[c.nomor]} /> : <p className="status-kurang kecil">Berkas cue belum ada</p>}
            <pre className="prompt">{c.style}</pre>
            <p className="kecil">Exclude Styles: {c.exclude || '-'}</p>
            <div>
              <Salin teks={c.style} label="Salin Style of Music" />
            </div>
          </div>
        ))}
        <p className="kecil redup">Adegan hening: {k.adeganHening?.length ? k.adeganHening.join(', ') : '-'}</p>
      </div>
      <div className="blok">
        <h2 className="label">Efek suara</h2>
        <table className="tabel">
          <thead>
            <tr>
              <th>#</th>
              <th>Adegan</th>
              <th>Bunyi</th>
              <th>Prompt</th>
              <th style={{ width: 240 }}>Berkas</th>
            </tr>
          </thead>
          <tbody>
            {k.sfx.map((x) => (
              <tr key={x.nomor}>
                <td>{x.nomor}</td>
                <td>{x.adegan}</td>
                <td>
                  {x.bunyi}
                  <div className="redup kecil">{x.kataKunci}</div>
                </td>
                <td className="kecil">{x.prompt}</td>
                <td>{data.aset.sfx[x.nomor] ? <audio controls preload="none" src={data.aset.sfx[x.nomor]} /> : <span className="status-kurang kecil">belum ada</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

// ---------- Ulikan & caption ----------
function Ulikan({ k }) {
  return (
    <>
      {k.ulikan ? (
        <div className="kotak-ulikan">
          <span className="label">Ulikan</span>
          <p className="teks">{k.ulikan.teks}</p>
          {k.ulikan.sumber && k.ulikan.sumber !== '-' && <p className="redup kecil">{k.ulikan.sumber}</p>}
          <p className="redup kecil">{k.ulikan.kata} kata</p>
        </div>
      ) : (
        <p className="kosong">Kartu Ulikan belum diisi.</p>
      )}
      {k.caption.map((c) => (
        <div key={c.platform} className="blok">
          <h2 className="label">{c.platform}</h2>
          {c.judul && (
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
              <p style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 600 }}>{c.judul}</p>
              <Salin teks={c.judul} label="Salin judul" />
            </div>
          )}
          {c.catatan && <p className="redup kecil">{c.catatan}</p>}
          <pre className="prompt">{c.caption}</pre>
          <div>
            <Salin teks={c.caption} label="Salin caption" />
          </div>
        </div>
      ))}
    </>
  );
}

// ---------- Verifikasi ----------
function Verifikasi({ data }) {
  const v = data.konsep.validasi;
  return (
    <>
      <div className="blok">
        <h2 className="label">Pemeriksaan kontrak KONSEP.md</h2>
        {[
          ['Masalah', v.masalah, 'status-kurang'],
          ['Peringatan', v.peringatan, ''],
          ['Penyesuaian', v.penyesuaian, 'redup'],
        ].map(([j, d, c]) => (
          <div key={j}>
            <p className={`kecil ${c}`}>
              <b>{j}</b>: {d.length}
            </p>
            {d.length > 0 && (
              <ul className="kecil">
                {d.map((x, i) => (
                  <li key={i}>{x}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
      {data.catatanGenre ? (
        <div className="blok md" dangerouslySetInnerHTML={{ __html: marked.parse(data.catatanGenre) }} />
      ) : (
        <p className="kosong">Bagian Catatan genre tidak ada.</p>
      )}
      {data.sumberMd && (
        <div className="blok md">
          <h2 className="label">Sumber</h2>
          <div dangerouslySetInnerHTML={{ __html: marked.parse(data.sumberMd) }} />
        </div>
      )}
    </>
  );
}

// ---------- Aset ----------
function Aset({ data, lompat }) {
  const a = data.aset;
  const k = data.konsep;
  const batang = (nama, { ada, total }) => (
    <div key={nama} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <p className="kecil">
        <b>{nama}</b> <span className={ada === total ? 'status-ada' : 'status-kurang'}>{ada} / {total}</span>
      </p>
      <div className="batang">
        <i style={{ width: `${total ? (100 * ada) / total : 100}%` }} />
      </div>
    </div>
  );
  return (
    <>
      {!a.adaFolder && <p className="kosong">Folder aset proyek ini belum ada di ASET_DIR maupun folder proyek lama.</p>}
      <div className="angka">
        {batang('Ilustrasi', a.kelengkapan.ilustrasi)}
        {batang('Narasi', a.kelengkapan.narasi)}
        {batang('Musik', a.kelengkapan.musik)}
        {batang('SFX', a.kelengkapan.sfx)}
      </div>
      <div className="blok">
        <h2 className="label">Per adegan</h2>
        <table className="tabel">
          <thead>
            <tr>
              <th>Adegan</th>
              <th>Ilustrasi</th>
              <th>Narasi</th>
              <th>SFX</th>
            </tr>
          </thead>
          <tbody>
            {k.adegan.map((x) => {
              const s = a.adegan[x.nomor] || {};
              const sfx = k.sfx.filter((f) => f.adegan === x.nomor);
              const narasi = s.narasi || a.babak[x.babak];
              return (
                <tr key={x.nomor} style={{ cursor: 'pointer' }} onClick={() => lompat(x)}>
                  <td>
                    {x.nomor} <span className="redup kecil">babak {x.babak}</span>
                  </td>
                  <td className={s.ilustrasi ? 'status-ada' : 'status-kurang'}>{s.ilustrasi ? 'ada' : 'kurang'}</td>
                  <td className={narasi ? 'status-ada' : 'status-kurang'}>{s.narasi ? 'potongan' : narasi ? 'rekaman babak' : 'kurang'}</td>
                  <td className="kecil">{sfx.length ? sfx.map((f) => `${f.nomor} ${a.sfx[f.nomor] ? '✓' : '✗'}`).join(', ') : '-'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <p className="redup kecil">Ilustrasi dicari sebagai ilustrasi/adegan-NN, narasi sebagai narasi/adegan-NN, narasi/potongan/adegan-NN, atau narasi/babak-N; musik cue-N-*; SFX sfx-NN-*.</p>
      </div>
    </>
  );
}

// ---------- Render ----------
function Render({ data }) {
  const t = useRender(data.slug);
  const r = data.aset.render;
  const jalan = t?.status === 'jalan';
  const mulai = async (jenis) => {
    try {
      await kirim(`/api/proyek/${data.slug}/render`, { jenis }, 'POST');
      toast(`Render ${jenis} dimulai`);
    } catch (e) {
      toast(`Gagal: ${e.message}`);
    }
  };
  const studio = async () => {
    try {
      const h = await kirim(`/api/proyek/${data.slug}/studio`, {}, 'POST');
      toast(h.pesan);
    } catch (e) {
      toast(`Gagal: ${e.message}`);
    }
  };
  return (
    <>
      <div className="blok">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          <button type="button" className="utama" disabled={jalan} onClick={() => mulai('video')}>
            Render video
          </button>
          <button type="button" disabled={jalan} onClick={() => mulai('sampul')}>
            Render sampul
          </button>
          <button type="button" onClick={studio}>
            Buka di Remotion Studio
          </button>
        </div>
        <p className="redup kecil">Hasil disimpan di aset/proyek/{data.slug}/render/ dengan tanggal dan versi konsep. Render pertama mengunduh Chrome Headless Shell (butuh internet).</p>
        {t && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <p className={`kecil ${t.status === 'gagal' ? 'status-kurang' : t.status === 'selesai' ? 'status-ada' : ''}`}>
              {t.jenis === 'sampul' ? 'Sampul' : 'Video'}: {t.pesan}
            </p>
            {t.total > 0 && (
              <div className="batang">
                <i style={{ width: `${(100 * t.selesai) / t.total}%` }} />
              </div>
            )}
          </div>
        )}
      </div>
      {!r.length ? (
        <p className="kosong">Belum ada hasil render.</p>
      ) : (
        <div className="kisi" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
          {r.map((x) => (
            <div key={x.url} className="kartu-kat" style={{ cursor: 'default' }}>
              <div className="gbr" style={{ aspectRatio: '9 / 16', background: '#000' }}>
                {x.jenis === 'video' ? <video src={x.url} controls preload="metadata" style={{ width: '100%', height: '100%' }} /> : <img src={x.url} alt={x.nama} />}
              </div>
              <div className="badan">
                <span className="kecil" style={{ wordBreak: 'break-all' }}>
                  <b>{x.nama}</b>
                </span>
                <span className="redup kecil">
                  {tanggal(x.tanggal)} · {ukuran(x.ukuran)}
                  {x.mentah ? ' · mentah' : ''}
                </span>
                <a className="kecil" href={x.url} download>
                  Unduh
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
