import React, { useEffect, useMemo, useRef, useState } from 'react';
import { marked } from 'marked';
import { useData, useRender, kirim, toast, DaftarLapisan, Memuat, Salin, angka, tanggal } from '../komponen.jsx';
import { Player } from '@remotion/player';
import Pemutar from '../Pemutar.jsx';
import KonsepCarousel from './Carousel.jsx';
import { JudulProyek, Produksi } from './bersama.jsx';
import { Sampul, KANVAS, jepitPosisi, posisiSama, POSISI_BAWAAN, POTONG_TIKTOK, BATAS_SKALA } from '../../../../paket/video/src/pemutar';
import { promptFlow, namaAsetFlow } from '../../../../paket/urai-konsep/flow.mjs';

/** Ilustrasi adegan bisa gambar diam atau klip video (adegan-NN.mp4 dan sejenisnya). */
const KLIP = /\.(mp4|webm|mov|m4v)(\?|$)/i;
const MediaIlustrasi = ({ src, alt = '', lazy = true }) =>
  KLIP.test(src) ? (
    <video src={src} muted loop playsInline autoPlay preload="metadata" aria-label={alt || undefined} />
  ) : (
    <img src={src} alt={alt} loading={lazy ? 'lazy' : undefined} />
  );

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
  if (!data || !info) return <Memuat galat={galat} />;
  if (data.jenis === 'carousel') return <KonsepCarousel slug={slug} tab={tab} data={data} info={info} muatUlang={muatUlang} />;
  return <KonsepVideo slug={slug} tab={tab} data={data} info={info} muatUlang={muatUlang} />;
}

function KonsepVideo({ slug, tab, data, info, muatUlang }) {
  const [aktif, setAktif] = useState(1);
  const [pilihMode, setMode] = useState(null);
  const videoRef = useRef(null);
  const pemutarRef = useRef(null);
  const { data: dataVideo, galat: galatVideo } = useData(`/api/proyek/${slug}/video`);
  const render = data.aset.render.find((r) => r.jenis === 'video' && !r.mentah) || data.aset.render.find((r) => r.jenis === 'video');
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
      <JudulProyek slug={slug} meta={m} konsep={k} />

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
                <MediaIlustrasi src={gambarAktif} alt={`Ilustrasi adegan ${aktif}`} lazy={false} />
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
            {tab === 'render' && <Render data={data} dataVideo={dataVideo?.data} />}
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

      <Produksi data={data} info={info} muatUlang={muatUlang} />

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
function BlokFlow({ flow }) {
  const lain = flow.adegan.filter((a) => a.rujukanLain);
  return (
    <div className="blok">
      <h2 className="label">Prompt Google Flow</h2>
      <p className="kecil">
        Dibuat otomatis dari prompt Gemini di KONSEP.md: rujukan lembar karakter diganti aset Flow. Unggah lembar karakter ke proyek Flow dengan nama aset persis{' '}
        {flow.aset.length ? flow.aset.map((a, i) => (
          <React.Fragment key={a.aset}>
            {i > 0 && ', '}
            <code>{a.aset}</code>
          </React.Fragment>
        )) : '(tidak ada)'}
        , lalu tempel teks batch di Flow{flow.batch.length > 1 ? ` satu per satu (Flow menerima paling banyak 12 adegan per batch, jadi konsep ini dibagi ${flow.batch.length})` : ''}. Perbaikan prompt yang ingin dipertahankan masuk ke KONSEP.md versi baru.
      </p>
      {lain.length > 0 && (
        <p className="kecil status-kurang">
          Adegan {lain.map((a) => a.nomor).join(', ')} masih merujuk gambar acuan di luar lembar karakter konsep ini (misalnya tokoh dari part lain); pasang gambarnya manual di Flow.
        </p>
      )}
      <div className="baris-chip">
        {flow.batch.map((b) => (
          <Salin key={b.ke} teks={b.teks} label={flow.batch.length > 1 ? `Salin batch ${b.ke}: adegan ${b.dari}–${b.sampai}` : `Salin prompt Flow (${b.jumlah} adegan)`} />
        ))}
      </div>
    </div>
  );
}

function Naskah({ data, aktif, lompat }) {
  const k = data.konsep;
  const flow = useMemo(() => promptFlow(k), [k]);
  const flowPer = useMemo(() => Object.fromEntries(flow.adegan.map((a) => [a.nomor, a])), [flow]);
  const perBabak = useMemo(() => {
    const g = {};
    k.adegan.forEach((a) => (g[a.babak] ||= []).push(a));
    return g;
  }, [k]);
  return (
    <>
      {flow.adegan.length > 0 && <BlokFlow flow={flow} />}
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
                <div className="gbr">{il ? <MediaIlustrasi src={il} /> : 'Belum ada ilustrasi'}</div>
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
                    <summary>Visual, prompt Gemini, dan prompt Flow</summary>
                    <p className="kecil" style={{ margin: '8px 0' }}>
                      {a.visual}
                    </p>
                    {prompt && (
                      <>
                        <pre className="prompt">{prompt}</pre>
                        <div style={{ marginTop: 8 }}>
                          <Salin teks={prompt} label="Salin prompt Gemini" />{' '}
                          {flowPer[a.nomor] && <Salin teks={flowPer[a.nomor].teks} label={`Salin prompt Flow${flowPer[a.nomor].aset.length ? ` (${flowPer[a.nomor].aset.join(', ')})` : ''}`} />}
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
      <div className="gbr">
        {l.gambar || l.kartu?.gambar ? (
          <a href={l.gambar || l.kartu.gambar} target="_blank" rel="noreferrer" style={{ display: 'contents' }}>
            <img src={l.gambar || l.kartu.gambar} alt={`Lembar karakter ${l.nama}`} loading="lazy" />
          </a>
        ) : (
          <span>
            Belum ada gambar. Simpan hasil Gemini atau Flow sebagai <code>{l.berkas}</code> di folder aset proyek.
          </span>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minWidth: 0 }}>
        <h2 className="serif">{l.nama}</h2>
        <p className="kecil">
          Nama aset Flow: <code>{namaAsetFlow(l.nama)}</code> <Salin teks={namaAsetFlow(l.nama)} label="Salin nama" />
        </p>
        <p className="kecil redup">
          Berkas: <code>{l.berkas}</code> {l.gambar ? <span className="status-ada">ada</span> : <span className="status-kurang">belum ada</span>}
          {l.kartu && (
            <>
              {' · '}Pustaka: <a href={`#/pustaka/tokoh`}>{l.kartu.id}</a> <span className="pil">{l.kartu.status}</span>
            </>
          )}
        </p>
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
// ---------- Pilih sampul ----------
const NAMA_PLATFORM = { tiktok: 'TikTok', youtube: 'YouTube' };

/**
 * Pratinjau komposisi Sampul yang gambarnya bisa diseret (geser) dan diperbesar (roda mouse atau penggeser).
 * Posisi dalam % kanvas, sama dengan transform di Sampul.tsx, jadi seretan 1:1 dengan hasil render.
 * Mode TikTok menampilkan garis potong 3:4 grid profil (hanya di pratinjau).
 */
function LayarSampul({ data, platform, posisi, onPosisi }) {
  const ref = useRef(null);
  const seret = useRef(null);
  const posisiRef = useRef(posisi);
  posisiRef.current = posisi;
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Roda mouse untuk zoom; listener native agar preventDefault berlaku (halaman tidak ikut bergulir).
    const roda = (e) => {
      e.preventDefault();
      const p = posisiRef.current;
      onPosisi(jepitPosisi({ ...p, skala: p.skala + (e.deltaY < 0 ? 0.02 : -0.02) }));
    };
    el.addEventListener('wheel', roda, { passive: false });
    return () => el.removeEventListener('wheel', roda);
  }, [onPosisi]);
  const mulai = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    seret.current = { x: e.clientX, y: e.clientY, awal: posisi, kotak: e.currentTarget.getBoundingClientRect() };
  };
  const gerak = (e) => {
    const s = seret.current;
    if (!s) return;
    const dx = ((e.clientX - s.x) / s.kotak.width) * 100;
    const dy = ((e.clientY - s.y) / s.kotak.height) * 100;
    onPosisi(jepitPosisi({ ...s.awal, x: s.awal.x + dx, y: s.awal.y + dy }));
  };
  const selesai = () => {
    seret.current = null;
  };
  const potongAtas = (100 * POTONG_TIKTOK.atas) / KANVAS.tinggi;
  const potongBawah = (100 * POTONG_TIKTOK.bawah) / KANVAS.tinggi;
  return (
    <div className="layar layar-sampul">
      <Player
        component={Sampul}
        inputProps={{ data, platform, posisi }}
        durationInFrames={1}
        fps={KANVAS.fps}
        compositionWidth={KANVAS.lebar}
        compositionHeight={KANVAS.tinggi}
        acknowledgeRemotionLicense
        style={{ width: '100%', aspectRatio: '9 / 16' }}
      />
      {platform === 'tiktok' && (
        <>
          <div className="potong-sampul atas" style={{ height: `${potongAtas}%` }} />
          <div className="potong-sampul bawah" style={{ height: `${potongBawah}%` }} />
        </>
      )}
      <div
        ref={ref}
        className="seret-sampul"
        role="application"
        aria-label={`Seret untuk menggeser gambar sampul ${NAMA_PLATFORM[platform]}, gulir untuk memperbesar`}
        onPointerDown={mulai}
        onPointerMove={gerak}
        onPointerUp={selesai}
        onPointerCancel={selesai}
      />
    </div>
  );
}

/** Pilihan adegan, judul, dan posisi gambar per platform, disimpan di proyek.yaml (`sampul`), dengan pratinjau langsung. */
function PilihSampul({ data, dv, sibuk, onRender }) {
  const s = dv.sampul || { adegan: 1, judul: dv.proyek.judulSampul, bawaan: { adegan: 1, judul: dv.proyek.judulSampul } };
  const kunciPosisi = JSON.stringify(s.posisi || {});
  const posisiTersimpan = useMemo(() => ({ tiktok: jepitPosisi(s.posisi?.tiktok), youtube: jepitPosisi(s.posisi?.youtube) }), [kunciPosisi]);
  const [adegan, setAdegan] = useState(s.adegan);
  const [judul, setJudul] = useState(s.judul);
  const [platform, setPlatform] = useState('tiktok');
  const [posisi, setPosisi] = useState(posisiTersimpan);
  useEffect(() => {
    setAdegan(s.adegan);
    setJudul(s.judul);
  }, [s.adegan, s.judul]);
  useEffect(() => setPosisi(posisiTersimpan), [posisiTersimpan]);
  const ubahPosisi = useMemo(() => (p) => setPosisi((lama) => ({ ...lama, [platform]: p })), [platform]);
  const posisiBerubah = ['tiktok', 'youtube'].some((pl) => !posisiSama(posisi[pl], posisiTersimpan[pl]));
  const berubah = adegan !== s.adegan || judul.trim() !== s.judul || posisiBerubah;
  const adaKhusus = !!data.aset.sampul || s.bawaan.adegan === 'khusus';
  const pratinjau = useMemo(() => {
    const d = { ...dv, proyek: { ...dv.proyek, judulSampul: judul.trim() || s.bawaan.judul } };
    if (adegan === 'khusus') return d;
    return { ...d, setelan: { ...dv.setelan, SAMPUL_ADEGAN: adegan }, aset: { ...dv.aset, sampul: {} } };
  }, [dv, adegan, judul]);
  const simpan = async () => {
    const judulBersih = judul.trim();
    const isi = {
      adegan: adegan === s.bawaan.adegan ? null : adegan,
      judul: !judulBersih || judulBersih === s.bawaan.judul ? null : judulBersih,
      tiktok: posisiSama(posisi.tiktok, POSISI_BAWAAN) ? null : posisi.tiktok,
      youtube: posisiSama(posisi.youtube, POSISI_BAWAAN) ? null : posisi.youtube,
    };
    const terisi = Object.fromEntries(Object.entries(isi).filter(([, v]) => v != null));
    await kirim(`/api/proyek/${data.slug}`, { sampul: Object.keys(terisi).length ? terisi : null });
  };
  const simpanSaja = async () => {
    try {
      await simpan();
      toast('Pilihan sampul disimpan di proyek.yaml');
    } catch (e) {
      toast(`Gagal: ${e.message}`);
    }
  };
  const renderSampul = async (pl) => {
    try {
      if (berubah) await simpan();
      await onRender(`sampul-${pl}`);
    } catch (e) {
      toast(`Gagal: ${e.message}`);
    }
  };
  const p = posisi[platform];
  const pilihan = [...(adaKhusus ? ['khusus'] : []), ...data.konsep.adegan.map((a) => a.nomor)];
  return (
    <div className="blok">
      <h2 className="label">Sampul</h2>
      <div className="pilih-sampul">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minWidth: 0 }}>
          <div className="sakelar-sampul" role="radiogroup" aria-label="Platform sampul">
            {['tiktok', 'youtube'].map((pl) => (
              <button key={pl} type="button" role="radio" aria-checked={platform === pl} className={platform === pl ? 'aktif' : ''} onClick={() => setPlatform(pl)}>
                {NAMA_PLATFORM[pl]}
              </button>
            ))}
          </div>
          <LayarSampul data={pratinjau} platform={platform} posisi={p} onPosisi={ubahPosisi} />
          <label className="kecil" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            Zoom
            <input type="range" min={BATAS_SKALA[0]} max={BATAS_SKALA[1]} step={0.01} value={p.skala} onChange={(e) => ubahPosisi(jepitPosisi({ ...p, skala: +e.target.value }))} style={{ flex: 1 }} />
            <span style={{ minWidth: 40, textAlign: 'right' }}>{Math.round(p.skala * 100)}%</span>
          </label>
          <p className="redup kecil" style={{ margin: 0 }}>
            Seret gambar untuk menggeser, gulir untuk zoom.
            {platform === 'tiktok' && ' Area gelap terpotong di grid profil TikTok (3:4).'}{' '}
            {!posisiSama(p, POSISI_BAWAAN) && (
              <button type="button" onClick={() => ubahPosisi(POSISI_BAWAAN)} style={{ minHeight: 28, padding: '0 8px' }}>
                Kembalikan posisi
              </button>
            )}
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minWidth: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label htmlFor="judul-sampul" className="label">
              Judul di sampul
            </label>
            <textarea id="judul-sampul" value={judul} rows={2} maxLength={160} onChange={(e) => setJudul(e.target.value)} style={{ minHeight: 64, fontFamily: 'var(--serif)', fontSize: 20, lineHeight: '26px' }} />
            <p className="redup kecil">
              Maksimal tiga baris di sampul; yang lebih panjang terpotong. Sama untuk TikTok dan YouTube. Bawaan dari KONSEP.md: “{s.bawaan.judul}”.{' '}
              {judul.trim() !== s.bawaan.judul && (
                <button type="button" onClick={() => setJudul(s.bawaan.judul)} style={{ minHeight: 28, padding: '0 8px' }}>
                  Kembalikan
                </button>
              )}
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span className="label" id="label-adegan-sampul">
              Gambar
            </span>
            <div className="kisi-sampul" role="radiogroup" aria-labelledby="label-adegan-sampul">
              {pilihan.map((n) => {
                const src = n === 'khusus' ? data.aset.sampul : data.aset.adegan[n]?.ilustrasi;
                const nama = n === 'khusus' ? 'Sampul khusus' : `Adegan ${n}`;
                return (
                  <button key={n} type="button" role="radio" aria-checked={adegan === n} aria-label={nama} className={`opsi-sampul${adegan === n ? ' aktif' : ''}`} onClick={() => setAdegan(n)} disabled={!src}>
                    {src ? <MediaIlustrasi src={src} /> : <span className="redup kecil">belum ada</span>}
                    <span className="nomor">{n === 'khusus' ? 'Khusus' : n}</span>
                  </button>
                );
              })}
            </div>
            {s.bawaan.adegan !== 'khusus' && <p className="redup kecil">Bawaan: adegan {s.bawaan.adegan}. Pilih gambar yang memperlihatkan sudut pandang tokoh, bukan wajah dari depan.</p>}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
            <button type="button" className="utama" disabled={sibuk} onClick={() => renderSampul('tiktok')}>
              {berubah ? 'Simpan dan render sampul TikTok' : 'Render sampul TikTok'}
            </button>
            <button type="button" className="utama" disabled={sibuk} onClick={() => renderSampul('youtube')}>
              {berubah ? 'Simpan dan render sampul YouTube' : 'Render sampul YouTube'}
            </button>
            <button type="button" disabled={!berubah} onClick={simpanSaja}>
              Simpan pilihan
            </button>
            {berubah && <span className="pil pelita">Belum disimpan</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

function Render({ data, dataVideo }) {
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
          <button type="button" onClick={studio}>
            Buka di Remotion Studio
          </button>
        </div>
        <p className="redup kecil">Hasil disimpan di aset/proyek/{data.slug}/render/ dengan tanggal dan versi konsep. Render pertama mengunduh Chrome Headless Shell (butuh internet).</p>
        <p className="kecil">
          Alat proyek ini: <a href={`#/alat/cek-aset/${data.slug}`}>Periksa aset</a> · <a href={`#/alat/potong/${data.slug}`}>Potong narasi</a> · <a href={`#/alat/panen/${data.slug}`}>Panen ke pustaka</a>
        </p>
        {t && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <p className={`kecil ${t.status === 'gagal' ? 'status-kurang' : t.status === 'selesai' ? 'status-ada' : ''}`}>
              {t.jenis.startsWith('sampul') ? 'Sampul' : 'Video'}: {t.pesan}
            </p>
            {t.total > 0 && (
              <div className="batang">
                <i style={{ width: `${(100 * t.selesai) / t.total}%` }} />
              </div>
            )}
          </div>
        )}
      </div>
      {dataVideo && data.konsep && <PilihSampul data={data} dv={dataVideo} sibuk={jalan} onRender={mulai} />}
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
