import React, { useCallback, useEffect, useRef, useState } from 'react';

// ---------- data ----------
const pendengar = new Set();
const pendengarRender = new Set();
const pendengarAlat = new Set();

/** Dengarkan kabar keluaran alat dari server; kembalikan fungsi untuk berhenti. */
export function dengarAlat(f) {
  pantau();
  pendengarAlat.add(f);
  return () => pendengarAlat.delete(f);
}
let sumber = null;
function pantau() {
  if (sumber) return;
  sumber = new EventSource('/api/peristiwa');
  sumber.addEventListener('ubah', (e) => {
    const d = JSON.parse(e.data);
    pendengar.forEach((f) => f(d));
  });
  sumber.addEventListener('alat', (e) => {
    const d = JSON.parse(e.data);
    pendengarAlat.forEach((f) => f(d));
  });
  sumber.addEventListener('render', (e) => {
    const d = JSON.parse(e.data);
    pendengarRender.forEach((f) => f(d));
    if (d.status !== 'jalan') pendengar.forEach((f) => f(d));
  });
}

/** Status render per proyek, diperbarui lewat kabar dari server. */
export function useRender(slug) {
  const [t, setT] = useState(null);
  useEffect(() => {
    pantau();
    fetch('/api/render')
      .then((r) => r.json())
      .then((d) => setT(d.find((x) => x.slug === slug) || null));
    const f = (d) => d.slug === slug && setT({ ...d });
    pendengarRender.add(f);
    return () => pendengarRender.delete(f);
  }, [slug]);
  return t;
}

/** Ambil JSON dan muat ulang otomatis saat berkas di repo atau ASET_DIR berubah. */
export function useData(url) {
  const [state, setState] = useState({ data: null, galat: null, muat: true });
  const urlRef = useRef(url);
  urlRef.current = url;
  const muat = useCallback(async () => {
    try {
      const r = await fetch(urlRef.current);
      const d = await r.json();
      if (!r.ok) throw new Error(d.galat || r.statusText);
      setState({ data: d, galat: null, muat: false });
    } catch (e) {
      setState((s) => ({ ...s, galat: e.message, muat: false }));
    }
  }, []);
  useEffect(() => {
    setState({ data: null, galat: null, muat: true });
    muat();
  }, [url, muat]);
  useEffect(() => {
    pantau();
    pendengar.add(muat);
    return () => pendengar.delete(muat);
  }, [muat]);
  return { ...state, muatUlang: muat };
}

export async function kirim(url, isi, metode = 'PATCH') {
  const r = await fetch(url, { method: metode, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(isi) });
  const d = await r.json();
  if (!r.ok) throw new Error(d.galat || r.statusText);
  return d;
}

// ---------- toast ----------
let pasangToast = () => {};
export const toast = (pesan) => pasangToast(pesan);
export function Toast() {
  const [pesan, setPesan] = useState(null);
  useEffect(() => {
    let t;
    pasangToast = (p) => {
      setPesan(p);
      clearTimeout(t);
      t = setTimeout(() => setPesan(null), 3500);
    };
  }, []);
  return pesan ? (
    <div className="toast" role="status">
      {pesan}
    </div>
  ) : null;
}

// ---------- merek ----------
export function Tanda({ ukuran = 28 }) {
  return <img src="/media/merek/logo/mata-nyala.svg" width={ukuran} height={ukuran} alt="" style={{ display: 'block' }} />;
}

export function Kepala({ aktif, cari, onCari }) {
  const [q, setQ] = useState(cari);
  useEffect(() => setQ(cari), [cari]);
  const link = (href, teks, kunci) => (
    <a href={href} aria-current={aktif === kunci ? 'page' : undefined}>
      {teks}
    </a>
  );
  return (
    <header className="kepala">
      <a className="merek" href="#/papan" aria-label="Ulik Silam, papan produksi">
        <Tanda ukuran={30} />
        <b>Ulik Silam</b>
        <span>Katalog</span>
      </a>
      <nav className="navigasi" aria-label="Navigasi utama">
        {link('#/papan', 'Papan', 'papan')}
        {link('#/katalog', 'Katalog', 'katalog')}
        {link('#/pustaka', 'Pustaka', 'pustaka')}
        {link('#/alat', 'Alat', 'alat')}
        {link('#/identitas', 'Identitas', 'identitas')}
      </nav>
      <div style={{ flex: '1 1 40px' }} />
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          onCari(q);
        }}
      >
        <label htmlFor="cari" className="sr">
          Cari konsep atau aset
        </label>
        <input
          id="cari"
          type="search"
          value={q}
          placeholder="Cari judul, tokoh, tempat"
          onChange={(e) => {
            setQ(e.target.value);
            if (aktif === 'katalog' || aktif === 'pustaka') onCari(e.target.value);
          }}
          style={{ minWidth: 260 }}
        />
      </form>
    </header>
  );
}

// ---------- lapisan ----------
export const WARNA_LAPISAN = { Sejarah: 'var(--sejarah)', Legenda: 'var(--legenda)', Mitos: 'var(--mitos)', Rekaan: 'var(--rekaan)' };
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

/** Label lapisan. Rekaan tidak boleh disembunyikan atau dikecilkan. */
export function Lapisan({ nama }) {
  return (
    <span className="chip" style={{ color: WARNA_LAPISAN[nama] || 'var(--redup)' }}>
      {IKON[nama] && (
        <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true" style={{ fill: 'none', stroke: 'currentColor', strokeWidth: 1.9, strokeLinecap: 'round', strokeLinejoin: 'round' }}>
          {IKON[nama]}
        </svg>
      )}
      {nama}
    </span>
  );
}

export function DaftarLapisan({ lapisan }) {
  return (
    <span className="baris-chip">
      {(lapisan || []).map((l) => (
        <Lapisan key={l} nama={l} />
      ))}
    </span>
  );
}

// ---------- angka ----------
export const angka = (v) => (typeof v === 'number' ? v.toLocaleString('id-ID') : '-');
export const ringkasAngka = (v) => {
  if (typeof v !== 'number') return '-';
  if (v >= 1e6) return (v / 1e6).toLocaleString('id-ID', { maximumFractionDigits: 1 }) + ' jt';
  if (v >= 1e3) return (v / 1e3).toLocaleString('id-ID', { maximumFractionDigits: 1 }) + ' rb';
  return String(v);
};
export const tanggal = (s) => (s ? new Date(s).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '-');

export function Salin({ teks, label = 'Salin' }) {
  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(teks);
        toast('Disalin ke papan klip');
      }}
    >
      {label}
    </button>
  );
}

export function Memuat({ galat }) {
  return <p className="redup">{galat ? `Gagal memuat: ${galat}` : 'Memuat...'}</p>;
}
