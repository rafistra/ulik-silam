import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Player } from '@remotion/player';
import { Video, Sampul, hitungDurasiNarasi, hitungLini, KANVAS } from '../../../../paket/video/src/pemutar';
import { useData, Memuat, Lapisan, WARNA_LAPISAN } from '../komponen.jsx';

// Halaman baca-saja: identitas merek dari merek/ (tokens.json, identitas.json, logo/, VERSION).
// Ubah isi di berkas-berkas itu; halaman ini tidak menulis apa pun.

const BAGIAN = [
  ['inti', 'Inti merek'],
  ['logo', 'Logo'],
  ['warna', 'Warna'],
  ['huruf', 'Tipografi'],
  ['lapisan', 'Lapisan'],
  ['ruang', 'Jarak dan zona aman'],
  ['video', 'Elemen video'],
  ['aturan', 'Aturan tetap'],
  ['sinkron', 'Status sinkron'],
];

// ---------- kontras ----------
function rgb(hex) {
  const h = hex.replace('#', '').slice(0, 6);
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
}
function luminans(hex) {
  const [r, g, b] = rgb(hex).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function kontras(a, b) {
  const [x, y] = [luminans(a), luminans(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
}

export default function Identitas() {
  const { data, galat } = useData('/api/merek');
  if (!data) return <Memuat galat={galat} />;
  const { tokens, identitas: idn, versi, logo } = data;
  if (!tokens || !idn) return <p className="kosong">merek/tokens.json atau merek/identitas.json tidak ditemukan.</p>;
  return (
    <>
      <div className="judul-hal">
        <div>
          <span className="label">Identitas merek · baca saja</span>
          <h1>{idn.nama}</h1>
          <p className="redup">
            Sumber: <code>merek/</code> (salinan beku sistem desain, versi {versi['sistem-desain'] || '-'}). Ubah isinya di berkas, bukan di sini.
          </p>
        </div>
      </div>
      <nav className="tab" aria-label="Bagian identitas">
        {BAGIAN.map(([id, teks]) => (
          <a key={id} href={`#/identitas`} onClick={(e) => { e.preventDefault(); document.getElementById(`id-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}>
            {teks}
          </a>
        ))}
      </nav>
      <Inti idn={idn} logo={logo} />
      <Logo idn={idn} logo={logo} tokens={tokens} />
      <Warna tokens={tokens} />
      <Huruf tokens={tokens} />
      <BagianLapisan idn={idn} />
      <Ruang tokens={tokens} />
      <ElemenVideo tokens={tokens} />
      <Aturan idn={idn} />
      <Sinkron idn={idn} versi={versi} />
    </>
  );
}

function Bagian({ id, judul, catatan, children }) {
  return (
    <section id={`id-${id}`} className="blok bagian-id" aria-labelledby={`jdl-${id}`}>
      <h2 className="serif" id={`jdl-${id}`}>
        {judul}
      </h2>
      {catatan && <p className="redup kecil">{catatan}</p>}
      {children}
    </section>
  );
}

// ---------- 1. inti ----------
function Inti({ idn, logo }) {
  const wm = logo.find((l) => l.berkas === 'wordmark-krem.svg');
  return (
    <Bagian id="inti" judul="Inti merek">
      <div className="inti-merek">
        <div className="inti-logo">
          <img src="/media/merek/logo/mata-nyala.svg" alt="Tanda Mata Nyala" width="112" height="112" className="pendar" />
          {wm && <img src={wm.url} alt="Wordmark Ulik Silam" style={{ height: 64 }} />}
        </div>
        <p className="tagline">{idn.tagline}</p>
      </div>
      <p style={{ maxWidth: 760 }}>{idn.filosofi}</p>
      {idn.arahVisual && (
        <p className="redup" style={{ maxWidth: 760 }}>
          <b style={{ color: 'var(--tinta)' }}>Arah visual.</b> {idn.arahVisual}
        </p>
      )}
      <div className="baris-chip" style={{ alignItems: 'center', gap: 10 }}>
        <span className="pil pelita">@{idn.handle}</span>
        {idn.akun.map((a) =>
          a.url ? (
            <a key={a.platform} className="tombol" href={a.url} target="_blank" rel="noreferrer">
              {a.platform}
            </a>
          ) : (
            <span key={a.platform} className="pil">
              {a.platform}
            </span>
          ),
        )}
      </div>
      <h3 className="sub">Suara dan bahasa</h3>
      <ul className="daftar-aturan">
        {idn.suara.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
    </Bagian>
  );
}

// ---------- 2. logo ----------
function urutLogo(logo, idn) {
  const urut = (idn.logo.berkas || []).map((b) => b.berkas);
  const i = (f) => (urut.includes(f) ? urut.indexOf(f) : 99);
  return [...logo].sort((a, b) => i(a.berkas) - i(b.berkas));
}

function Logo({ idn, logo, tokens }) {
  const latar = (id) => tokens.color.tokens.find((t) => t.name === 'latar').value[id];
  const info = Object.fromEntries((idn.logo.berkas || []).map((b) => [b.berkas, b]));
  return (
    <Bagian id="logo" judul="Logo">
      <p style={{ maxWidth: 760 }}>
        <b>Tanda.</b> {idn.logo.tanda}
      </p>
      <p style={{ maxWidth: 760 }}>
        <b>Wordmark.</b> {idn.logo.wordmark}
      </p>
      <div className="kisi-logo">
        {urutLogo(logo, idn).map((l) => {
          const i = info[l.berkas] || {};
          const terang = i.latar === 'terang';
          const wordmark = /wordmark/.test(l.berkas);
          return (
            <figure key={l.berkas} className="kartu-logo">
              <div className="bidang" style={{ background: terang ? latar('lontar') : latar('malam') }}>
                <div className="ruang-aman">
                  <img src={l.url} alt={i.nama || l.berkas} style={wordmark ? { width: '100%', maxWidth: 220 } : { width: 88, height: 88 }} />
                </div>
              </div>
              <figcaption>
                <b>{i.nama || l.berkas}</b>
                <span className="redup kecil">
                  {l.berkas} · latar {i.latar || '-'}
                  {i.asal && i.asal !== 'sistem desain' ? ` · ${i.asal}` : ''}
                </span>
                <a className="tombol" href={l.url} download={`ulik-silam-${l.berkas}`}>
                  Unduh SVG
                </a>
              </figcaption>
            </figure>
          );
        })}
      </div>
      <p className="redup kecil">Garis putus-putus menandai ruang kosong minimal (selebar iris tanda) di sekeliling logo.</p>
      <ul className="daftar-aturan">
        {idn.logo.aturan.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
    </Bagian>
  );
}

// ---------- 3. warna ----------
function Warna({ tokens }) {
  const [tema, setTema] = useState('malam');
  const daftar = tokens.color.tokens;
  const nilai = (nama, t = tema) => {
    const v = daftar.find((x) => x.name === nama)?.value;
    return typeof v === 'string' ? v : v?.[t];
  };
  const dasar = nilai('latar');
  return (
    <Bagian id="warna" judul="Warna" catatan="Malam adalah tema utama dan dipakai di semua video. Lontar untuk dokumen, presentasi, dan materi cetak. Angka kontras dihitung terhadap latar tema yang dipilih (AA teks biasa ≥ 4,5).">
      <div role="radiogroup" aria-label="Tema" className="baris-chip">
        {tokens.color.themes.map((t) => (
          <button key={t.id} type="button" role="radio" aria-checked={tema === t.id} className={tema === t.id ? 'utama' : ''} onClick={() => setTema(t.id)}>
            {t.name}
          </button>
        ))}
      </div>
      <div className="kisi-warna" style={{ background: dasar, color: nilai('tinta') }}>
        {daftar.map((t) => {
          const v = typeof t.value === 'string' ? t.value : t.value[tema];
          const k = v.length <= 7 ? kontras(v, dasar) : null;
          return (
            <div key={t.name} className="kartu-warna" style={{ borderColor: nilai('garis') }}>
              <div className="cuplikan" style={{ background: v }} />
              <div className="badan">
                <b>{t.name}</b>
                <code>{v}</code>
                {k != null && t.name !== 'latar' && (
                  <span className="kecil" style={{ color: nilai('tinta-redup') }}>
                    Kontras {k.toFixed(1).replace('.', ',')} : 1 {k >= 4.5 ? '· AA' : k >= 3 ? '· teks besar' : ''}
                  </span>
                )}
                <span className="kecil" style={{ color: nilai('tinta-redup') }}>
                  {t.usage}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </Bagian>
  );
}

// ---------- 4. tipografi ----------
function Huruf({ tokens }) {
  const fam = tokens.type.families;
  return (
    <Bagian id="huruf" judul="Tipografi" catatan="Contoh ditampilkan setengah ukuran kanvas 1080 × 1920 supaya muat di layar; angka di sampingnya adalah ukuran asli di kanvas.">
      {tokens.type.groups.map((g) => (
        <div key={g.name} className="grup-huruf">
          <h3 className="sub">
            {g.name} · <span className="redup">{g.family === 'serif' ? 'Cormorant Garamond' : 'Plus Jakarta Sans'}</span>
          </h3>
          {g.note && <p className="redup kecil">{g.note}</p>}
          {g.styles.map((s) => (
            <div key={s.name} className="baris-huruf">
              <div className="meta">
                <b>{s.name}</b>
                <span className="redup kecil">
                  {s.fontSize} / {s.lineHeight} · {s.fontWeight}
                  {s.fontStyle === 'italic' ? ' · miring' : ''}
                  {s.textTransform === 'uppercase' ? ' · kapital' : ''}
                </span>
                <span className="redup kecil">{s.usage}</span>
              </div>
              <div
                className="contoh"
                style={{
                  fontFamily: fam[g.family],
                  fontSize: `calc(${s.fontSize} / 2)`,
                  lineHeight: `calc(${s.lineHeight} / 2)`,
                  fontWeight: s.fontWeight,
                  fontStyle: s.fontStyle || 'normal',
                  letterSpacing: s.letterSpacing || 'normal',
                  textTransform: s.textTransform || 'none',
                }}
              >
                {s.sample || 'Masa lalu, dari matamu.'}
              </div>
            </div>
          ))}
        </div>
      ))}
    </Bagian>
  );
}

// ---------- 5. lapisan ----------
function BagianLapisan({ idn }) {
  return (
    <Bagian id="lapisan" judul="Empat lapisan silam">
      <div className="kisi-lapisan">
        {idn.lapisan.map((l) => (
          <div key={l.nama} className="kartu-lapisan" style={{ borderColor: WARNA_LAPISAN[l.nama] }}>
            <span className="besar">
              <Lapisan nama={l.nama} />
            </span>
            <p>{l.arti}</p>
            <span className="redup kecil">
              Ikon {l.ikon} · token <code>{l.token}</code>
            </span>
          </div>
        ))}
      </div>
      <p className="peringatan-rekaan">{idn.aturanLapisan}</p>
    </Bagian>
  );
}

// ---------- 6. jarak dan zona aman ----------
function Ruang({ tokens }) {
  const sp = tokens.spacing.tokens;
  const px = (n) => parseFloat(sp.find((t) => t.name === n)?.value || '0');
  const aman = { atas: px('aman-atas'), bawah: px('aman-bawah'), kiri: px('aman-kiri'), kanan: px('aman-kanan') };
  return (
    <Bagian id="ruang" judul="Jarak dan zona aman" catatan={tokens.spacing.note}>
      <div className="ruang-dua">
        <div className="daftar-jarak">
          {sp
            .filter((t) => t.name.startsWith('space'))
            .map((t) => (
              <div key={t.name} className="baris-jarak">
                <b>{t.name}</b>
                <code>{t.value}</code>
                <i style={{ width: parseFloat(t.value) / 2 }} />
                <span className="redup kecil">{t.usage}</span>
              </div>
            ))}
          <h3 className="sub" style={{ marginTop: 12 }}>
            Sudut
          </h3>
          {tokens.radius.tokens.map((t) => (
            <div key={t.name} className="baris-jarak">
              <b>{t.name}</b>
              <code>{t.value}</code>
              <i style={{ width: 40, height: 28, borderRadius: Math.min(parseFloat(t.value), 14), background: 'transparent', border: '2px solid var(--pelita)' }} />
              <span className="redup kecil">{t.usage}</span>
            </div>
          ))}
        </div>
        <div>
          <div className="kanvas-mini">
            <ZonaAman aman={aman} tampil />
          </div>
          <ul className="daftar-aturan kecil">
            {sp
              .filter((t) => t.name.startsWith('aman'))
              .map((t) => (
                <li key={t.name}>
                  <b>{t.name}</b> {t.value}: {t.usage}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </Bagian>
  );
}

/** Lapisan garis zona aman di atas kanvas 1080 × 1920 (persentase, jadi ikut skala). */
function ZonaAman({ aman, tampil }) {
  if (!tampil) return null;
  const { lebar, tinggi } = KANVAS;
  return (
    <div className="zona-aman" aria-hidden="true">
      <div className="tutup" style={{ top: 0, left: 0, right: 0, height: `${(aman.atas / tinggi) * 100}%` }} />
      <div className="tutup" style={{ bottom: 0, left: 0, right: 0, height: `${(aman.bawah / tinggi) * 100}%` }} />
      <div className="tutup" style={{ top: `${(aman.atas / tinggi) * 100}%`, bottom: `${(aman.bawah / tinggi) * 100}%`, left: 0, width: `${(aman.kiri / lebar) * 100}%` }} />
      <div className="tutup" style={{ top: `${(aman.atas / tinggi) * 100}%`, bottom: `${(aman.bawah / tinggi) * 100}%`, right: 0, width: `${(aman.kanan / lebar) * 100}%` }} />
      <div
        className="bingkai"
        style={{
          top: `${(aman.atas / tinggi) * 100}%`,
          bottom: `${(aman.bawah / tinggi) * 100}%`,
          left: `${(aman.kiri / lebar) * 100}%`,
          right: `${(aman.kanan / lebar) * 100}%`,
        }}
      />
    </div>
  );
}

// ---------- 7. elemen video ----------
const SLUG_AWAL = 'narasi-perpindahan-kayan-miau-baru-part-2';

function ElemenVideo({ tokens }) {
  const { data: daftar } = useData('/api/proyek');
  const pilihan = useMemo(() => (daftar || []).filter((p) => p.gambar && p.adegan > 0).sort((a, b) => a.judul.localeCompare(b.judul, 'id')), [daftar]);
  const [slug, setSlug] = useState(null);
  useEffect(() => {
    if (!slug && pilihan.length) setSlug((pilihan.find((p) => p.slug === SLUG_AWAL) || pilihan[0]).slug);
  }, [pilihan, slug]);
  const sp = tokens.spacing.tokens;
  const px = (n) => parseFloat(sp.find((t) => t.name === n)?.value || '0');
  const aman = { atas: px('aman-atas'), bawah: px('aman-bawah'), kiri: px('aman-kiri'), kanan: px('aman-kanan') };
  return (
    <Bagian
      id="video"
      judul="Elemen video"
      catatan="Dirender langsung oleh komposisi bersama paket/video di atas ilustrasi proyek yang dipilih, jadi tampilannya sama dengan hasil render. Pilih momen untuk melompat ke elemennya."
    >
      <div className="baris-chip" style={{ alignItems: 'flex-end', gap: 14 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label htmlFor="pilih-proyek" className="label">
            Proyek
          </label>
          <select id="pilih-proyek" value={slug || ''} onChange={(e) => setSlug(e.target.value)} style={{ maxWidth: 420 }}>
            {pilihan.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.judul} · {(p.lapisan || []).join(', ')}
              </option>
            ))}
          </select>
        </div>
      </div>
      {slug ? <PratinjauElemen key={slug} slug={slug} aman={aman} /> : <p className="redup kecil">Belum ada proyek dengan ilustrasi.</p>}
    </Bagian>
  );
}

function PratinjauElemen({ slug, aman }) {
  const { data, galat } = useData(`/api/proyek/${slug}/video`);
  const [durasi, setDurasi] = useState(null);
  const [galatDurasi, setGalatDurasi] = useState(null);
  const [momen, setMomen] = useState('label');
  const [zona, setZona] = useState(true);
  const pemain = useRef(null);
  const dv = data?.data;

  useEffect(() => {
    if (!dv) return;
    let batal = false;
    hitungDurasiNarasi(dv)
      .then((d) => !batal && setDurasi(d))
      .catch((e) => !batal && setGalatDurasi(e.message));
    return () => {
      batal = true;
    };
  }, [dv]);
  const lini = useMemo(() => (durasi ? hitungLini(durasi) : null), [durasi, dv]);

  const daftarMomen = useMemo(() => {
    if (!lini) return [];
    const m = [{ id: 'label', nama: 'Label lapisan', frame: Math.round(KANVAS.fps * 1.2), ket: 'Kiri atas, tepat di bawah aman-atas, 3 detik pertama.' }];
    const adaTeks = (a) => (a.teksLayar || []).length > 0;
    const denganTeks = lini.adegan.find((a) => a.indeks >= 1 && adaTeks(a)) || lini.adegan.find(adaTeks);
    if (denganTeks) m.push({ id: 'teks', nama: 'Teks layar', frame: denganTeks.mulai + Math.round(KANVAS.fps * 1.5), ket: `Gaya kutipan di sepertiga atas (adegan ${denganTeks.nomor}).` });
    const sub = lini.adegan.find((a) => a.narasiDurasi && a.indeks >= 1) || lini.adegan.find((a) => a.narasiDurasi);
    if (sub) m.push({ id: 'subtitle', nama: 'Subtitle', frame: sub.narasiMulai + Math.round(KANVAS.fps * 2), ket: `Dua baris, rata tengah, berakhir di atas aman-bawah (adegan ${sub.nomor}).` });
    m.push({ id: 'ulikan', nama: 'Kartu Ulikan', frame: Math.min(lini.total - 1, lini.kartuMulai + Math.round(KANVAS.fps * 1.5)), ket: '3,5 detik di akhir, di atas adegan terakhir yang diredupkan.' });
    m.push({ id: 'sampul', nama: 'Sampul', frame: 0, ket: 'Gambar sampul dari komposisi Sampul.' });
    return m;
  }, [lini]);
  const aktif = daftarMomen.find((m) => m.id === momen) || daftarMomen[0];

  useEffect(() => {
    if (aktif && aktif.id !== 'sampul' && pemain.current) {
      pemain.current.pause();
      pemain.current.seekTo(aktif.frame);
    }
  }, [aktif]);

  if (galat || galatDurasi) return <p className="status-kurang kecil">Pratinjau gagal dimuat: {galat || galatDurasi}</p>;
  if (!dv || !lini) return <p className="redup kecil">Menyiapkan pratinjau...</p>;

  const sampul = aktif?.id === 'sampul';
  return (
    <div className="pratinjau-id">
      <div className="layar-id">
        <div className="layar" style={{ position: 'relative' }}>
          {sampul ? (
            <Player
              key="sampul"
              component={Sampul}
              inputProps={{ data: dv, geserBawah: 0 }}
              durationInFrames={1}
              fps={KANVAS.fps}
              compositionWidth={KANVAS.lebar}
              compositionHeight={KANVAS.tinggi}
              acknowledgeRemotionLicense
              style={{ width: '100%', aspectRatio: '9 / 16' }}
            />
          ) : (
            <Player
              key="video"
              ref={pemain}
              component={Video}
              inputProps={{ data: dv, durasiNarasi: durasi }}
              durationInFrames={lini.total}
              fps={KANVAS.fps}
              compositionWidth={KANVAS.lebar}
              compositionHeight={KANVAS.tinggi}
              initialFrame={aktif?.frame || 0}
              controls
              acknowledgeRemotionLicense
              style={{ width: '100%', aspectRatio: '9 / 16' }}
            />
          )}
          <ZonaAman aman={aman} tampil={zona} />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div role="radiogroup" aria-label="Momen" className="daftar-momen">
          {daftarMomen.map((m) => (
            <button key={m.id} type="button" role="radio" aria-checked={m.id === aktif?.id} className={m.id === aktif?.id ? 'utama' : ''} onClick={() => setMomen(m.id)}>
              {m.nama}
            </button>
          ))}
        </div>
        {aktif && <p className="redup kecil">{aktif.ket}</p>}
        <label className="kecil" style={{ display: 'flex', gap: 8, alignItems: 'center', minHeight: 44 }}>
          <input type="checkbox" checked={zona} onChange={(e) => setZona(e.target.checked)} />
          Tampilkan zona aman (area tertutup antarmuka TikTok dan Shorts)
        </label>
        <p className="kecil redup">
          Lapisan proyek ini: {(dv.proyek?.lapisan || []).join(', ') || '-'}. Label Rekaan tidak boleh disembunyikan atau dikecilkan.
        </p>
        <a className="tombol" href={`#/konsep/${slug}/render`} style={{ alignSelf: 'flex-start' }}>
          Buka konsep proyek
        </a>
      </div>
    </div>
  );
}

// ---------- 8. aturan tetap ----------
function Aturan({ idn }) {
  return (
    <Bagian id="aturan" judul="Aturan tetap" catatan="Berlaku untuk semua genre dan dicek di setiap produksi.">
      <ul className="daftar-aturan">
        {idn.aturanTetap.map((a) => (
          <li key={a.aturan}>
            {a.aturan}
            {a.sejak && <span className="pil" style={{ marginLeft: 8 }}>sejak {a.sejak}</span>}
          </li>
        ))}
      </ul>
    </Bagian>
  );
}

// ---------- 9. status sinkron ----------
function Sinkron({ idn, versi }) {
  const sd = idn.sistemDesain || {};
  const lokal = versi['sistem-desain'];
  const sama = lokal && sd.versiTerakhirDicek && lokal === sd.versiTerakhirDicek;
  return (
    <Bagian id="sinkron" judul="Status sinkron">
      <table className="tabel">
        <tbody>
          <tr>
            <th scope="row">merek/VERSION</th>
            <td>
              <code>{lokal || '-'}</code> (merek {versi.merek || '-'})
            </td>
          </tr>
          <tr>
            <th scope="row">Sistem desain, terakhir dicek</th>
            <td>
              <code>{sd.versiTerakhirDicek || '-'}</code> {sd.dicek && <span className="redup">pada {sd.dicek}</span>}
            </td>
          </tr>
          <tr>
            <th scope="row">Status</th>
            <td className={sama ? 'status-ada' : 'status-kurang'}>{sama ? 'Sama' : 'Berbeda: sinkronkan atau catat alasannya'}</td>
          </tr>
          {sd.catatan && (
            <tr>
              <th scope="row">Catatan</th>
              <td>{sd.catatan}</td>
            </tr>
          )}
        </tbody>
      </table>
      {(idn.bedaDenganSistemDesain || []).length > 0 && (
        <>
          <h3 className="sub">Keputusan yang belum tercermin di sistem desain</h3>
          <ul className="daftar-aturan">
            {idn.bedaDenganSistemDesain.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </>
      )}
      {sd.url && (
        <a className="tombol" href={sd.url} target="_blank" rel="noreferrer" style={{ alignSelf: 'flex-start' }}>
          Buka sistem desain
        </a>
      )}
    </Bagian>
  );
}
