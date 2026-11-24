// Halaman proyek carousel: membaca CAROUSEL.md (lewat paket/urai-carousel) dan berkas di $ASET_DIR/proyek/<slug>/.
// Pratinjau di sini adalah perkiraan tata letak dari mockup; hasil final dibuat paket/carousel.
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { marked } from 'marked';
import { Salin, tanggal, kirim, toast, useRender } from '../komponen.jsx';
import { Slide as SlideBersama, ZonaAman, PLATFORM } from '../../../../paket/carousel/src/Slide.jsx';
import { JudulProyek, Produksi } from './bersama.jsx';

const TAB = [
  ['ringkasan', 'Ringkasan'],
  ['slide', 'Slide'],
  ['prompt', 'Prompt ilustrasi'],
  ['ulikan', 'Kartu Ulikan dan caption'],
  ['verifikasi', 'Verifikasi'],
  ['aset', 'Aset'],
  ['render', 'Render'],
];
const dua = (n) => String(n).padStart(2, '0');

export default function KonsepCarousel({ slug, tab, data, info, muatUlang }) {
  const c = data.carousel;
  const [aktif, setAktif] = useState(1);
  const [pl, setPl] = useState('tiktok');
  const [mode, setMode] = useState('pratinjau');
  const [zona, setZona] = useState(false);
  const [luber, setLuber] = useState({});
  const tandaiLuber = (kunci, v) => setLuber((l) => (l[kunci] === v ? l : { ...l, [kunci]: v }));
  const t = TAB.some(([id]) => id === tab) ? tab : 'ringkasan';
  const slide = c?.slide || [];
  const s = slide.find((x) => x.nomor === aktif) || slide[0];
  const pilih = (n) => setAktif(Math.max(1, Math.min(slide.length, n)));

  useEffect(() => {
    const f = (e) => {
      if (/input|textarea|select/i.test(e.target.tagName)) return;
      if (e.key === 'ArrowRight') pilih(aktif + 1);
      if (e.key === 'ArrowLeft') pilih(aktif - 1);
    };
    window.addEventListener('keydown', f);
    return () => window.removeEventListener('keydown', f);
  });

  const renderAktif = s && (data.aset.slide[s.nomor]?.render[pl] || data.aset.slide[s.nomor]?.draf[pl]);

  return (
    <>
      <JudulProyek slug={slug} meta={data.meta} konsep={c} />

      <div className="konsep-atas">
        <aside className="pemutar" aria-label="Pratinjau slide">
          <div className="tab" role="tablist" style={{ borderBottom: 0 }}>
            {[
              ['pratinjau', 'Pratinjau'],
              ['render', 'Render'],
            ].map(([id, nama]) => (
              <a key={id} href="#" role="tab" aria-selected={mode === id} aria-current={mode === id ? 'page' : undefined} onClick={(e) => (e.preventDefault(), setMode(id))}>
                {nama}
              </a>
            ))}
          </div>
          <div className="baris-chip" role="group" aria-label="Platform">
            {Object.entries(PLATFORM).map(([id, p]) => (
              <button key={id} type="button" className={pl === id ? 'utama' : ''} aria-pressed={pl === id} onClick={() => setPl(id)}>
                {p.nama}
              </button>
            ))}
            <button type="button" aria-pressed={zona} onClick={() => setZona(!zona)}>
              Zona aman
            </button>
          </div>
          {!s ? (
            <p className="kosong">Belum ada slide.</p>
          ) : mode === 'render' ? (
            <div className="layar" style={{ aspectRatio: `${PLATFORM[pl].w} / ${PLATFORM[pl].h}` }}>
              {renderAktif ? <img src={renderAktif} alt={`Render slide ${s.nomor}`} /> : <p className="redup kecil" style={{ padding: 20, textAlign: 'center' }}>Slide {s.nomor} belum dirender untuk {PLATFORM[pl].nama}.</p>}
            </div>
          ) : (
            <Kanvas pl={pl}>
              <Slide s={s} c={c} a={data.aset.slide[s.nomor]} pl={pl} total={slide.length} />
              {zona && <ZonaAman pl={pl} />}
            </Kanvas>
          )}
          {s && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'space-between' }}>
              <button type="button" onClick={() => pilih(aktif - 1)} disabled={aktif <= 1} aria-label="Slide sebelumnya">
                ←
              </button>
              <span className="kecil">
                Slide {s.nomor} / {slide.length} · <span className="redup">{s.jenis}</span>
              </span>
              <button type="button" onClick={() => pilih(aktif + 1)} disabled={aktif >= slide.length} aria-label="Slide berikutnya">
                →
              </button>
            </div>
          )}
          <div className="strip-slide" role="list" aria-label="Semua slide">
            {slide.map((x) => (
              <button key={x.nomor} type="button" role="listitem" className={`mini${luber[`${pl}-${x.nomor}`] ? ' luber' : ''}`} aria-current={x.nomor === aktif} aria-label={`Slide ${x.nomor}: ${x.jenis} ${x.nama || x.judul}`} onClick={() => setAktif(x.nomor)}>
                <Kanvas pl={pl} mini onLuber={(v) => tandaiLuber(`${pl}-${x.nomor}`, v)}>
                  <Slide s={x} c={c} a={data.aset.slide[x.nomor]} pl={pl} total={slide.length} />
                </Kanvas>
                <span>{dua(x.nomor)}</span>
              </button>
            ))}
          </div>
          {Object.entries(luber).some(([k, v]) => v && k.startsWith(pl)) && (
            <p className="kecil status-kurang">
              Teks melewati zona aman {PLATFORM[pl].nama} di slide{' '}
              {Object.entries(luber)
                .filter(([k, v]) => v && k.startsWith(pl))
                .map(([k]) => k.split('-')[1])
                .join(', ')}
              . Potong kata di CAROUSEL.md; jangan mengecilkan huruf.
            </p>
          )}
          <p className="redup kecil">Templat yang sama dengan hasil render (paket/carousel). Tombol panah di keyboard berpindah slide.</p>
        </aside>

        <section>
          <nav className="tab" aria-label="Bagian carousel">
            {TAB.map(([id, nama]) => (
              <a key={id} href={`#/konsep/${slug}/${id}`} aria-current={t === id ? 'page' : undefined}>
                {nama}
              </a>
            ))}
          </nav>
          <div className="panel">
            {!c && <p className="kosong">CAROUSEL.md belum ada untuk proyek ini.</p>}
            {c?.galat && <p className="kosong">Gagal mengurai CAROUSEL.md: {c.galat}</p>}
            {c && !c.galat && t === 'ringkasan' && <Ringkasan data={data} info={info} muatUlang={muatUlang} />}
            {c && !c.galat && t === 'slide' && <DaftarSlide c={c} aset={data.aset} aktif={aktif} pilih={setAktif} />}
            {c && !c.galat && t === 'prompt' && <Prompt c={c} aset={data.aset} pilih={setAktif} />}
            {c && !c.galat && t === 'ulikan' && <Ulikan c={c} />}
            {c && !c.galat && t === 'verifikasi' && <Verifikasi data={data} />}
            {c && !c.galat && t === 'aset' && <Aset c={c} aset={data.aset} pilih={setAktif} />}
            {c && !c.galat && t === 'render' && <Render c={c} aset={data.aset} pilih={setAktif} setMode={setMode} slug={slug} />}
          </div>
        </section>
      </div>
    </>
  );
}

// ---------- kanvas pratinjau ----------
// Templat slide dari paket/carousel (sama dengan yang dipakai render), dengan URL katalog.
const MEDIA = { url: (u) => u, Img: 'img', tanda: '/media/merek/logo/mata-nyala.svg', wordmark: '/media/merek/logo/wordmark-krem.svg' };

/** Bidang 1080 px yang diskalakan ke lebar wadahnya; melaporkan bila isi slide melewati zona aman. */
function Kanvas({ pl, mini, onLuber, children }) {
  const ref = useRef(null);
  const [skala, setSkala] = useState(mini ? 0.08 : 0.3);
  const P = PLATFORM[pl];
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ukur = () => setSkala(el.clientWidth / P.w);
    ukur();
    const ro = new ResizeObserver(ukur);
    ro.observe(el);
    return () => ro.disconnect();
  }, [P.w]);
  useEffect(() => {
    if (!onLuber) return;
    const periksa = () => {
      // judul sampul dibatasi 3 baris; lebih dari itu terpotong
      const js = ref.current?.querySelector('.cs-judul-sampul');
      if (js) return onLuber(js.scrollHeight - 28 > js.clientHeight - 28 + 2);
      const isi = ref.current?.querySelector('.cs-isi');
      if (!isi) return onLuber(false);
      const r = isi.getBoundingClientRect();
      const anak = [...isi.children].map((c) => c.getBoundingClientRect());
      const atas = Math.min(...anak.map((x) => x.top));
      const bawah = Math.max(...anak.map((x) => x.bottom));
      onLuber(anak.length > 0 && (atas < r.top - 1 || bawah > r.bottom + 1));
    };
    // tunggu huruf dan gambar
    const t = setTimeout(periksa, 400);
    document.fonts?.ready.then(periksa);
    return () => clearTimeout(t);
  });
  return (
    <div ref={ref} className={`kanvas${mini ? ' mini' : ''}`} style={{ height: P.h * skala }}>
      <div className="panggung" style={{ width: P.w, height: P.h, transform: `scale(${skala})` }}>
        {children}
      </div>
    </div>
  );
}

const Slide = (props) => <SlideBersama {...props} media={MEDIA} />;

// ---------- Ringkasan ----------
function Ringkasan({ data, info, muatUlang }) {
  const c = data.carousel;
  const st = c.statistik;
  const k = data.aset.kelengkapan;
  return (
    <>
      <div className="angka">
        <div>
          <span className="label">Slide</span>
          <b>{st.jumlahSlide}</b>
          <span className="redup kecil">{st.entri} entri</span>
        </div>
        <div>
          <span className="label">Ilustrasi baru</span>
          <b>
            {k.ilustrasi.ada}/{st.ilustrasiBaru}
          </b>
          <span className="redup kecil">berkas ada</span>
        </div>
        <div>
          <span className="label">Foto arsip</span>
          <b>
            {k.foto.ada}/{k.foto.total}
          </b>
          <span className="redup kecil">berkas ada</span>
        </div>
        <div>
          <span className="label">Fakta</span>
          <b>{st.fakta}</b>
          <span className="redup kecil">
            {Object.entries(st.statusFakta)
              .map(([a, b]) => `${b} ${a.toLowerCase()}`)
              .join(' · ')}
          </span>
        </div>
      </div>

      <Produksi data={data} info={info} muatUlang={muatUlang} />

      <div className="blok">
        <h2 className="label">Ringkasan carousel</h2>
        <table className="tabel">
          <tbody>
            {Object.entries(c.ringkasan).map(([a, b]) => (
              <tr key={a}>
                <th style={{ width: 180 }}>{a}</th>
                <td>{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {data.gayaVisualMd && <div className="blok md" dangerouslySetInnerHTML={{ __html: marked.parse(data.gayaVisualMd) }} />}
    </>
  );
}

// ---------- Slide ----------
function Kata({ n, batas }) {
  return <span className={n > batas ? 'status-kurang' : 'redup'}>{n}/{batas} kata</span>;
}

function DaftarSlide({ c, aset, aktif, pilih }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {c.slide.map((s) => {
        const a = aset.slide[s.nomor] || {};
        return (
          <article key={s.nomor} className={`kartu-slide${s.nomor === aktif ? ' aktif' : ''}`} onClick={() => pilih(s.nomor)}>
            <header>
              <b className="serif" style={{ fontSize: 26 }}>
                {dua(s.nomor)}
              </b>
              <span className="pil">{s.jenis}</span>
              <h3 style={{ fontSize: 17 }}>{s.nama || s.judul || <span className="redup">tanpa judul</span>}</h3>
              <span className="kecil" style={{ marginLeft: 'auto' }}>
                {s.kata.judul > 0 && (
                  <>
                    judul <Kata n={s.kata.judul} batas={s.batas.judul} />
                  </>
                )}
                {s.kata.isi > 0 && (
                  <>
                    {' '}
                    · teks <Kata n={s.kata.isi} batas={s.batas.isi} />
                  </>
                )}
              </span>
            </header>
            {s.jenis === 'Entri' && s.keterangan && <p className="redup kecil">{s.keterangan}</p>}
            {s.jenis === 'Linimasa' ? (
              <ul className="kecil">
                {s.titik.map((x, i) => (
                  <li key={i}>
                    <b>{x.tahun}</b>: {x.kalimat}
                  </li>
                ))}
              </ul>
            ) : s.jenis === 'Ulikan' ? (
              <p>{c.ulikan.teks}</p>
            ) : (
              (s.jenis === 'Entri' ? [s.isi] : s.blok).map((b, i) => <p key={i}>{b}</p>)
            )}
            <p className="kecil redup">
              <b>Visual:</b> {s.sumber.jenis === 'tanpa' ? 'tanpa gambar' : s.sumber.deskripsi || s.sumber.teks || s.visual}
              {a.berkasIlustrasi && (
                <>
                  {' '}
                  · <span className={a.ilustrasi ? 'status-ada' : 'status-kurang'}>{a.berkasIlustrasi}</span>
                </>
              )}
              {s.fokus !== '-' && ` · fokus ${s.fokus}`}
            </p>
            {s.foto && (
              <p className="kecil">
                <b>Foto:</b> {s.foto.deskripsi} · {s.foto.koleksi} ·{' '}
                <span className={s.foto.lisensi === 'Belum dicek' ? 'status-kurang' : 'status-ada'}>{s.foto.lisensi}</span> ·{' '}
                <span className={a.arsip ? 'status-ada' : 'status-kurang'}>{a.berkasArsip}</span>
              </p>
            )}
          </article>
        );
      })}
    </div>
  );
}

// ---------- Prompt ----------
function Prompt({ c, aset, pilih }) {
  const { lembar, ilustrasi } = c.prompt;
  if (!lembar.length && !ilustrasi.length) return <p className="kosong">Belum ada prompt ilustrasi baru.</p>;
  return (
    <>
      {c.flow.length > 0 && (
        <div className="blok">
          <h2 className="label">Flow (Nano Banana Pro)</h2>
          <p className="kecil redup">Satu batch berisi paling banyak 12 prompt. Simpan hasil sebagai ilustrasi/slide-XX.png sesuai nomor slide.</p>
          <div className="baris-chip">
            {c.flow.map((b) => (
              <Salin key={b.ke} teks={b.teks} label={`Salin batch ${b.ke}: slide ${dua(b.dari)}–${dua(b.sampai)} (${b.jumlah})`} />
            ))}
          </div>
        </div>
      )}
      {lembar.map((l) => (
        <div key={l.nama} className="blok">
          <h2 className="label">Lembar karakter · {l.nama}</h2>
          <pre className="prompt">{l.prompt}</pre>
          <div>
            <Salin teks={l.prompt} label="Salin prompt" />
          </div>
        </div>
      ))}
      {ilustrasi.map((p) => {
        const a = aset.slide[p.slide] || {};
        return (
          <div key={p.nomor} className="blok">
            <div style={{ display: 'flex', gap: 12, alignItems: 'baseline', flexWrap: 'wrap' }}>
              <h2 className="label">
                Ilustrasi {dua(p.nomor)} · Slide {p.slide}
              </h2>
              <span className={`kecil ${a.ilustrasi ? 'status-ada' : 'status-kurang'}`}>
                {a.berkasIlustrasi} {a.ilustrasi ? 'ada' : 'belum ada'}
              </span>
              <span className="kecil redup">{p.kata} kata</span>
            </div>
            <div className="prompt-dengan-gambar">
              <pre className="prompt">{p.prompt}</pre>
              {a.ilustrasi && <img src={a.ilustrasi} alt={`Ilustrasi slide ${p.slide}`} onClick={() => pilih(p.slide)} />}
            </div>
            <div className="baris-chip">
              <Salin teks={p.prompt} label="Salin prompt" />
              <button type="button" onClick={() => pilih(p.slide)}>
                Lihat slide {p.slide}
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}

// ---------- Kartu Ulikan dan caption ----------
function Ulikan({ c }) {
  return (
    <>
      {c.ulikan.teks ? (
        <div className="kotak-ulikan">
          <span className="label">Ulikan</span>
          <p className="teks">{c.ulikan.teks}</p>
          {c.ulikan.sumber && c.ulikan.sumber !== '-' && <p className="redup kecil">{c.ulikan.sumber}</p>}
          <p className="redup kecil">{c.ulikan.kata} kata</p>
        </div>
      ) : (
        <p className="kosong">Kartu Ulikan belum diisi.</p>
      )}
      {c.caption.map((x) => (
        <div key={x.platform} className="blok">
          <h2 className="label">{x.platform}</h2>
          {x.judul && (
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
              <p style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 600 }}>{x.judul}</p>
              <Salin teks={x.judul} label="Salin judul" />
            </div>
          )}
          {x.musik && (
            <p className="kecil">
              <b>Musik:</b> {x.musik}
            </p>
          )}
          {/\[diisi/.test(x.caption) && <p className="kecil status-kurang">Masih ada isian [diisi ...] sebelum diunggah.</p>}
          <pre className="prompt">{x.caption}</pre>
          <div>
            <Salin teks={x.caption} label="Salin caption" />
          </div>
          {x.alt.length > 0 && (
            <details>
              <summary className="kecil">Teks alternatif ({x.alt.length} slide)</summary>
              <ol className="kecil" style={{ paddingLeft: 20 }}>
                {x.alt.map((a) => (
                  <li key={a.slide} value={a.slide} style={{ marginBottom: 6 }}>
                    {a.teks.replace(/^Slide \d+:\s*/, '')}
                  </li>
                ))}
              </ol>
              <Salin teks={x.alt.map((a) => a.teks).join('\n')} label="Salin semua teks alternatif" />
            </details>
          )}
        </div>
      ))}
    </>
  );
}

// ---------- Verifikasi ----------
function Verifikasi({ data }) {
  const v = data.carousel.validasi;
  return (
    <>
      <div className="blok">
        <h2 className="label">Pemeriksaan kontrak CAROUSEL.md v1.2</h2>
        {[
          ['Masalah', v.masalah, 'status-kurang'],
          ['Peringatan', v.peringatan, ''],
        ].map(([j, d, k]) => (
          <div key={j}>
            <p className={`kecil ${d.length ? k : 'redup'}`}>
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
      {data.catatanGenre ? <div className="blok md" dangerouslySetInnerHTML={{ __html: marked.parse(data.catatanGenre) }} /> : <p className="kosong">Bagian Catatan genre tidak ada.</p>}
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
function Aset({ c, aset, pilih }) {
  const k = aset.kelengkapan;
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
  const sel = (url, berkas) => (berkas ? <td className={url ? 'status-ada' : 'status-kurang'}>{url ? 'ada' : 'kurang'}</td> : <td className="redup">-</td>);
  return (
    <>
      {!aset.adaFolder && <p className="kosong">Folder aset proyek ini belum ada di ASET_DIR.</p>}
      <div className="angka">
        {batang('Ilustrasi baru', k.ilustrasi)}
        {batang('Foto arsip', k.foto)}
        {batang('Render TikTok', k.tiktok)}
        {batang('Render Instagram', k.instagram)}
      </div>
      <div className="blok">
        <h2 className="label">Per slide</h2>
        <table className="tabel">
          <thead>
            <tr>
              <th>Slide</th>
              <th>Ilustrasi</th>
              <th>Foto</th>
              <th>Lisensi</th>
              <th>TikTok</th>
              <th>Instagram</th>
            </tr>
          </thead>
          <tbody>
            {c.slide.map((s) => {
              const a = aset.slide[s.nomor] || {};
              const pakai = s.sumber.jenis === 'pakai-ulang' || s.sumber.jenis === 'pustaka';
              return (
                <tr key={s.nomor} style={{ cursor: 'pointer' }} onClick={() => pilih(s.nomor)}>
                  <td>
                    {dua(s.nomor)} <span className="redup kecil">{s.jenis}</span>
                  </td>
                  {pakai ? <td className={a.ilustrasi ? 'status-ada' : 'status-kurang'}>{a.ilustrasi ? 'pakai ulang' : 'sumber belum ada'}</td> : sel(a.ilustrasi, a.berkasIlustrasi)}
                  {sel(a.arsip, a.berkasArsip)}
                  <td className={`kecil ${s.foto?.lisensi === 'Belum dicek' ? 'status-kurang' : ''}`}>{s.foto?.lisensi || (s.sumber.jenis === 'arsip' ? s.sumber.lisensi : '-')}</td>
                  {sel(a.render.tiktok, true)}
                  {sel(a.render.instagram, true)}
                </tr>
              );
            })}
          </tbody>
        </table>
        <p className="redup kecil">
          Berkas dicari di <code>{aset.folder}</code>: ilustrasi/slide-XX, arsip/slide-XX (png, jpg, webp), render/tiktok/NN.png, dan render/instagram/NN.png.
        </p>
      </div>
    </>
  );
}

// ---------- Render ----------
function Render({ c, aset, pilih, setMode, slug }) {
  const t = useRender(slug);
  const jalan = t?.status === 'jalan';
  const mulai = async (jenis) => {
    try {
      await kirim(`/api/proyek/${slug}/render`, { jenis }, 'POST');
      toast(jenis === 'carousel' ? 'Render final dimulai' : 'Render draf dimulai');
    } catch (e) {
      toast(`Gagal: ${e.message}`);
    }
  };
  const siap = aset.siapFinal;
  const galeri = (judul, kunci, lembar) => {
    const ada = c.slide.filter((s) => aset.slide[s.nomor]?.[kunci]);
    if (!ada.length) return null;
    return Object.keys(PLATFORM).map((p) =>
      c.slide.some((s) => aset.slide[s.nomor]?.[kunci][p]) ? (
        <div key={`${kunci}-${p}`} className="blok">
          <h2 className="label">
            {judul} · {PLATFORM[p].nama}
          </h2>
          <div className="galeri-render">
            {c.slide.map((s) => {
              const url = aset.slide[s.nomor]?.[kunci][p];
              return url ? (
                <button key={s.nomor} type="button" onClick={() => (pilih(s.nomor), setMode('render'))}>
                  <img src={url} alt={`Render slide ${s.nomor}`} />
                  <span className="kecil">{dua(s.nomor)}</span>
                </button>
              ) : null;
            })}
          </div>
          {lembar?.[p] && (
            <p className="kecil">
              <a href={lembar[p]} target="_blank" rel="noreferrer">
                Buka lembar kontak
              </a>
            </p>
          )}
        </div>
      ) : null,
    );
  };
  return (
    <>
      <div className="blok">
        <h2 className="label">Render carousel</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          <button type="button" className="utama" disabled={jalan || !siap.ok} onClick={() => mulai('carousel')}>
            Render final
          </button>
          <button type="button" disabled={jalan} onClick={() => mulai('carousel-draf')}>
            Render draf
          </button>
        </div>
        <p className="redup kecil">
          Kedua platform sekaligus: render/tiktok/NN.png (1080 × 1920) dan render/instagram/NN.png (1080 × 1350), masing-masing dengan lembar-kontak.png. Draf bertanda DRAF dan disimpan di render/draf/. Status lisensi foto tidak diperiksa. Lewat terminal: <code>npm run carousel -- {slug}</code> (tambahkan <code>--draf</code> untuk draf).
        </p>
        {!siap.ok && (
          <div className="kecil">
            <p className="status-kurang">Render final belum bisa:</p>
            <ul>
              {siap.alasan.map((x, i) => (
                <li key={i}>{x}</li>
              ))}
            </ul>
          </div>
        )}
        {t && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <p className={`kecil ${t.status === 'gagal' ? 'status-kurang' : t.status === 'selesai' ? 'status-ada' : ''}`}>{t.pesan}</p>
            {t.total > 0 && (
              <div className="batang">
                <i style={{ width: `${(100 * t.selesai) / t.total}%` }} />
              </div>
            )}
          </div>
        )}
      </div>
      {galeri('Final', 'render', aset.lembarKontak)}
      {galeri('Draf', 'draf', aset.lembarKontakDraf)}
      {aset.render.length > 0 && (
        <div className="blok">
          <h2 className="label">Berkas lain di render/</h2>
          <ul className="kecil">
            {aset.render.map((r) => (
              <li key={r.nama}>
                <a href={r.url} target="_blank" rel="noreferrer">
                  {r.nama}
                </a>{' '}
                <span className="redup">{tanggal(r.tanggal)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
