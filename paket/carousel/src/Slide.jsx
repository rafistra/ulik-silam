// Templat slide carousel Ulik Silam, dipakai bersama oleh pratinjau katalog dan render Remotion (paket/carousel/render.mjs).
// Ukuran dari skill carousel-ulik-silam (bagian Identitas carousel); warna dari merek/tokens.json.
import React from 'react';
import './slide.css';
import { VAR_WARNA, HURUF, WARNA_LAPISAN } from './token.js';

const dua = (n) => String(n).padStart(2, '0');

/** Kanvas per platform: ukuran, zona aman, jarak foto, dan [ukuran, tinggi baris] tiap gaya huruf. */
export const PLATFORM = {
  tiktok: {
    nama: 'TikTok 9:16',
    w: 1080,
    h: 1920,
    // atas 330: di Photo Mode TikTok gambar dipotong atas-bawah dan bilah pencarian menutupi ±315 px pertama (diukur dari tangkapan layar, November 2026)
    aman: { atas: 330, bawah: 460, kiri: 72, kanan: 180 },
    jarakFoto: 56,
    lebarFoto: 420,
    geserAngka: -6,
    jarakLinimasa: [40, 34],
    // Sampul mengikuti Sampul video (paket/video/src/Sampul.tsx), tetapi 240 px lebih tinggi: di grid profil TikTok,
    // sampul video dipotong 3:4 dari bawah sedangkan carousel dari tengah (diukur dari tangkapan layar, November 2026).
    // Dengan geser ini judul carousel sejajar dengan judul video di grid.
    sampul: { bawahJudul: 760, bawahTanda: 660, gradasi: 1640 },
    huruf: { judulSampul: [104, 104], judulSlide: [76, 84], kutipan: [56, 70], angka: [140, 140], tahun: [84, 84], isi: [44, 62], label: [30, 36], keterangan: [28, 38] },
  },
  instagram: {
    nama: 'Instagram 4:5',
    w: 1080,
    h: 1350,
    aman: { atas: 80, bawah: 80, kiri: 80, kanan: 80 },
    jarakFoto: 40,
    lebarFoto: 380,
    geserAngka: -5,
    jarakLinimasa: [32, 26],
    sampul: { bawahJudul: 190, bawahTanda: 90, gradasi: 985 },
    huruf: { judulSampul: [92, 96], judulSlide: [68, 76], kutipan: [50, 62], angka: [120, 120], tahun: [72, 72], isi: [40, 56], label: [28, 34], keterangan: [26, 36] },
  },
};

const IKON = {
  Sejarah: (
    <>
      <path d="M8 4h10a2 2 0 0 1 0 4H8" />
      <path d="M8 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V8" />
      <path d="M9.5 12h6M9.5 15.5h4" />
    </>
  ),
  Legenda: (
    <>
      <path d="M6 12.5a3.3 3.3 0 0 1 .4-6.5 4.6 4.6 0 0 1 8.6-1.4 3.6 3.6 0 0 1 4.6 3.6A2.6 2.6 0 0 1 18.5 12.5z" />
      <path d="M12 12.5V20M12 15.5l-2.2-3M12 15.5l2.2-3M7.5 12.5v4.5M16.5 12.5v4.5M9.5 20h5" />
    </>
  ),
  Mitos: (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  Rekaan: (
    <>
      <path d="M20 4C13 4 8 9 7 16l-2.5 4" />
      <path d="M20 4c0 6.5-4.5 11.5-12.5 12" />
      <path d="M10 14l5-5" />
    </>
  ),
};

const posisi = (fokus) => ({ atas: 'center top', bawah: 'center bottom' })[fokus] || 'center center';
const huruf = (P, gaya) => ({ fontSize: P.huruf[gaya][0], lineHeight: `${P.huruf[gaya][1]}px` });
const akar = { ...VAR_WARNA, '--cs-serif': HURUF.serif, '--cs-sans': HURUF.sans };

/**
 * media: { url(rel) → URL berkas aset proyek, Img: komponen gambar (img atau Img Remotion), tanda, wordmark: URL logo }.
 */
function Latar({ src, fokus, berkas, redup = 0, blur = 0, media }) {
  const Img = media.Img;
  return (
    <>
      {src ? (
        <Img className="cs-latar-gambar" src={media.url(src)} alt="" style={{ objectPosition: posisi(fokus), filter: blur ? `blur(${blur}px)` : undefined }} />
      ) : (
        <div className="cs-latar-kosong">
          <span>{berkas ? `${berkas} belum ada` : 'Ilustrasi belum ada'}</span>
        </div>
      )}
      {redup > 0 && <div className="cs-lapis" style={{ background: 'var(--c-latar)', opacity: redup }} />}
    </>
  );
}

function Halaman({ s, total, P, media }) {
  return (
    <div className="cs-hal" style={{ top: P.aman.atas, left: P.aman.kiri, ...huruf(P, 'keterangan') }}>
      <img src={media.tanda} width={40} height={40} alt="" style={{ display: 'block' }} />
      <span>
        {dua(s.nomor)}/{dua(total)}
      </span>
    </div>
  );
}

function LabelLapisan({ nama, P }) {
  const u = P.huruf.label[0] * 1.33;
  return (
    <span className="cs-label-lapisan" style={{ color: WARNA_LAPISAN[nama], ...huruf(P, 'label') }}>
      {IKON[nama] && (
        <svg viewBox="0 0 24 24" width={u} height={u} aria-hidden="true">
          {IKON[nama]}
        </svg>
      )}
      {nama}
    </span>
  );
}

function Foto({ src, berkas, lebar, media }) {
  const Img = media.Img;
  return (
    <div className="cs-cetakan" style={{ width: lebar }}>
      {src ? <Img src={media.url(src)} alt="" /> : <div className="cs-cetakan-kosong">{berkas} belum ada</div>}
    </div>
  );
}

function Merek({ besar, media }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      <img src={media.tanda} width={besar ? 88 : 64} height={besar ? 88 : 64} alt="" style={{ display: 'block' }} />
      <img src={media.wordmark} alt="Ulik Silam" style={{ height: besar ? 56 : 44 }} />
    </div>
  );
}

export function ZonaAman({ pl }) {
  const a = PLATFORM[pl].aman;
  return <div className="cs-zona-aman" style={{ ...akar, top: a.atas, bottom: a.bawah, left: a.kiri, right: a.kanan }} aria-hidden="true" />;
}

/**
 * Satu slide di kanvas 1080 px.
 * s: slide dari urai-carousel; c: hasil uraiCarousel; a: { ilustrasi, berkasIlustrasi, arsip, berkasArsip } untuk slide ini.
 */
export function Slide({ s, c, a = {}, pl, total, media, draf = false }) {
  const P = PLATFORM[pl];
  const A = P.aman;
  // slide 2 dan seterusnya: isi dimulai di bawah penanda halaman (tanda 40 px + jarak)
  const dalam = { position: 'absolute', left: A.kiri, right: A.kanan, top: A.atas + (s.nomor > 1 && s.jenis !== 'Penutup' ? 72 : 0), bottom: A.bawah, display: 'flex', flexDirection: 'column' };
  const hal = s.nomor > 1 && <Halaman s={s} total={total} P={P} media={media} />;
  const tandaDraf = draf && <span className="cs-draf">DRAF</span>;
  const bungkus = (isi, radial = false) => (
    <div className={`cs-slide${radial ? ' cs-radial' : ''}`} style={akar}>
      {isi}
      {tandaDraf}
    </div>
  );
  // Slide teks (Teks, Banding, Linimasa, Arsip, Penutup) boleh berlatar ilustrasi yang diredupkan.
  const latarRedup = (a.berkasIlustrasi || a.ilustrasi) && (
    <>
      <Latar src={a.ilustrasi} fokus={s.fokus} berkas={a.berkasIlustrasi} redup={0.72} media={media} />
      <div className="cs-lapis cs-cahaya-tengah" />
    </>
  );

  if (s.jenis === 'Sampul') {
    // Tata letak sama dengan sampul video pov-produksi: label lapisan di kiri atas, lalu latar dan judul (maks. 3 baris)
    // di kiri bawah, tanda logo di bawahnya. Tanpa subjudul; petunjuk GESER sebaris dengan tanda logo.
    const S = P.sampul;
    return bungkus(
      <>
        <Latar src={a.ilustrasi} fokus={s.fokus} berkas={a.berkasIlustrasi} media={media} />
        <div className="cs-lapis" style={{ top: 'auto', height: S.gradasi, background: 'linear-gradient(to top, var(--c-bayang) 0%, var(--c-bayang) 60%, transparent 100%)' }} />
        <div style={{ position: 'absolute', left: A.kiri, top: A.atas, display: 'flex', gap: 12 }}>
          {(c.lapisan || []).map((l) => (
            <LabelLapisan key={l} nama={l} P={P} />
          ))}
        </div>
        <div style={{ position: 'absolute', left: A.kiri, right: A.kanan, bottom: S.bawahJudul, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {c.latar && c.latar !== '-' && (
            <p className="cs-redup" style={huruf(P, 'keterangan')}>
              {c.latar}
            </p>
          )}
          <h3
            className="cs-serif cs-judul-sampul"
            style={{ ...huruf(P, 'judulSampul'), textWrap: 'balance', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', paddingBottom: 28, marginBottom: -28 }}
          >
            {s.judul}
          </h3>
        </div>
        <div style={{ position: 'absolute', left: A.kiri, right: A.kanan, bottom: S.bawahTanda, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <img src={media.tanda} width={64} height={64} alt="" style={{ display: 'block' }} />
          <p className="cs-geser" style={huruf(P, 'label')}>
            Geser <span aria-hidden="true">→</span>
          </p>
        </div>
      </>,
    );
  }

  if (s.jenis === 'Ilustrasi') {
    const sebelumArsip = c.slide[s.nomor]?.jenis === 'Arsip';
    return bungkus(
      <>
        <Latar src={a.ilustrasi} fokus={s.fokus} berkas={a.berkasIlustrasi} media={media} />
        <div className="cs-lapis cs-gradasi" style={{ height: '62%' }} />
        {hal}
        <div className="cs-isi" style={{ ...dalam, justifyContent: 'flex-end', gap: 20 }}>
          {sebelumArsip && (
            <p className="cs-label-kecil" style={huruf(P, 'keterangan')}>
              Rekonstruksi · ilustrasi
            </p>
          )}
          {s.judul && (
            <h3 className="cs-serif" style={huruf(P, 'judulSlide')}>
              {s.judul}
            </h3>
          )}
          <p style={huruf(P, 'isi')}>{s.teks}</p>
        </div>
      </>,
    );
  }

  if (s.jenis === 'Entri') {
    const angka = (
      <span className="cs-angka" style={huruf(P, 'angka')}>
        {s.angka}
      </span>
    );
    const nama = (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <h3 className="cs-serif" style={huruf(P, 'judulSlide')}>
          {s.nama}
        </h3>
        {s.keterangan && (
          <p className="cs-redup" style={huruf(P, 'keterangan')}>
            {s.keterangan}
          </p>
        )}
      </div>
    );
    if (s.foto) {
      return bungkus(
        <>
          <Latar src={a.ilustrasi} fokus={s.fokus} berkas={a.berkasIlustrasi} redup={0.5} media={media} />
          <div className="cs-lapis cs-gradasi" style={{ height: '60%' }} />
          {hal}
          <div className="cs-isi" style={{ ...dalam, justifyContent: 'center', gap: P.jarakFoto }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Foto src={a.arsip} berkas={a.berkasArsip} lebar={P.lebarFoto} media={media} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start' }}>
                <span style={{ marginTop: P.geserAngka }}>{angka}</span>
                {nama}
              </div>
              <p style={huruf(P, 'isi')}>{s.isi}</p>
            </div>
          </div>
        </>,
      );
    }
    return bungkus(
      <>
        <Latar src={a.ilustrasi} fokus={s.fokus} berkas={a.berkasIlustrasi} media={media} />
        <div className="cs-lapis cs-gradasi" style={{ height: '66%' }} />
        {hal}
        <div className="cs-isi" style={{ ...dalam, justifyContent: 'flex-end', gap: 20 }}>
          {angka}
          {nama}
          <p style={huruf(P, 'isi')}>{s.isi}</p>
        </div>
      </>,
    );
  }

  if (s.jenis === 'Teks') {
    return bungkus(
      <>
        {latarRedup}
        {hal}
        <div className="cs-isi" style={{ ...dalam, justifyContent: 'center', gap: 32 }}>
          <i className="cs-garis-pelita" />
          {s.judul && (
            <p className="cs-serif cs-kutipan" style={huruf(P, 'kutipan')}>
              {s.judul}
            </p>
          )}
          {s.blok.map((b, i) => (
            <p key={i} className="cs-redup" style={huruf(P, 'isi')}>
              {b}
            </p>
          ))}
        </div>
      </>,
      true,
    );
  }

  if (s.jenis === 'Banding') {
    return bungkus(
      <>
        {latarRedup}
        {hal}
        <div className="cs-isi" style={{ ...dalam, justifyContent: 'center', gap: 28 }}>
          <h3 className="cs-serif" style={huruf(P, 'judulSlide')}>
            {s.judul}
          </h3>
          {[
            ['Versi populer', s.populer, 'var(--c-tinta-redup)'],
            ['Menurut sumber', s.sumberBanding, 'var(--c-pelita)'],
          ].map(([l, t, w]) => (
            <div key={l} className="cs-kotak-naik">
              <span className="cs-huruf-label" style={{ ...huruf(P, 'label'), color: w }}>
                {l}
              </span>
              <p style={huruf(P, 'isi')}>{t}</p>
            </div>
          ))}
        </div>
      </>,
      true,
    );
  }

  if (s.jenis === 'Linimasa') {
    return bungkus(
      <>
        {latarRedup}
        {hal}
        <div className="cs-isi" style={{ ...dalam, justifyContent: 'center', gap: P.jarakLinimasa[0] }}>
          <h3 className="cs-serif" style={huruf(P, 'judulSlide')}>
            {s.judul}
          </h3>
          <div className="cs-linimasa" style={{ gap: P.jarakLinimasa[1] }}>
            {s.titik.map((x, i) => (
              <div key={i} className="cs-titik">
                <i />
                <div>
                  <p className="cs-serif cs-tahun" style={{ ...huruf(P, 'tahun'), fontSize: P.huruf.tahun[0] * (x.tahun.length > 6 ? 0.72 : 1) }}>
                    {x.tahun}
                  </p>
                  <p style={huruf(P, 'isi')}>{x.kalimat}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>,
      true,
    );
  }

  if (s.jenis === 'Arsip') {
    return bungkus(
      <>
        {latarRedup}
        {hal}
        <div className="cs-isi" style={{ ...dalam, justifyContent: 'center', alignItems: 'center', gap: 36, textAlign: 'center' }}>
          <span className="cs-label-netral" style={huruf(P, 'label')}>
            {s.judul}
          </span>
          <Foto src={a.arsip} berkas={a.berkasArsip} lebar={P.lebarFoto * 1.4} media={media} />
          <p style={huruf(P, 'isi')}>{s.teks}</p>
        </div>
      </>,
      true,
    );
  }

  if (s.jenis === 'Ulikan') {
    return bungkus(
      <>
        <Latar src={a.ilustrasi} fokus={s.fokus} berkas={null} redup={0.72} blur={8} media={media} />
        {hal}
        <div className="cs-isi" style={{ ...dalam, justifyContent: 'center', alignItems: 'center', gap: 48 }}>
          <div className="cs-kotak-naik" style={{ width: '100%' }}>
            <span className="cs-huruf-label" style={{ ...huruf(P, 'label'), color: 'var(--c-pelita)', letterSpacing: '0.2em' }}>
              Ulikan
            </span>
            <p className="cs-serif" style={{ ...huruf(P, 'judulSlide'), fontSize: P.huruf.judulSlide[0] * 0.82, lineHeight: 1.15 }}>
              {c.ulikan.teks}
            </p>
            {c.ulikan.sumber && c.ulikan.sumber !== '-' && (
              <p className="cs-redup" style={huruf(P, 'keterangan')}>
                {c.ulikan.sumber}
              </p>
            )}
          </div>
          <Merek media={media} />
        </div>
      </>,
    );
  }

  if (s.jenis === 'Penutup') {
    return bungkus(
      <>
        {latarRedup}
        <div className="cs-isi" style={{ ...dalam, justifyContent: 'center', alignItems: 'center', gap: 40, textAlign: 'center' }}>
          <i className="cs-garis-pelita" />
          <p className="cs-serif cs-kutipan" style={huruf(P, 'kutipan')}>
            {s.teks}
          </p>
          {c.sumberUtama && (
            <p className="cs-redup" style={huruf(P, 'keterangan')}>
              Sumber utama: {c.sumberUtama}
            </p>
          )}
          <Merek besar media={media} />
          <p className="cs-redup" style={huruf(P, 'keterangan')}>
            ulik.silam
          </p>
        </div>
      </>,
      true,
    );
  }

  return bungkus(
    <div className="cs-isi" style={{ ...dalam, justifyContent: 'center' }}>
      <p style={huruf(P, 'isi')}>Jenis slide "{s.jenis}" belum punya templat.</p>
    </div>,
    true,
  );
}

/** Lembar kontak: semua slide dalam kisi 4 × 4 di kanvas yang sama. */
export function LembarKontak({ c, aset, pl, media, draf }) {
  const P = PLATFORM[pl];
  const skala = 0.25;
  return (
    <div className="cs-lembar" style={akar}>
      {c.slide.map((s) => (
        <div key={s.nomor}>
          <div className="cs-skala" style={{ width: P.w, height: P.h, transform: `scale(${skala})` }}>
            <Slide s={s} c={c} a={aset[s.nomor]} pl={pl} total={c.slide.length} media={media} draf={draf} />
          </div>
          <b>{dua(s.nomor)}</b>
        </div>
      ))}
    </div>
  );
}
