import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './gaya.css';
import { Kepala, Toast } from './komponen.jsx';
import Papan from './halaman/Papan.jsx';
import Katalog from './halaman/Katalog.jsx';
import Konsep from './halaman/Konsep.jsx';
import Pustaka from './halaman/Pustaka.jsx';
import Identitas from './halaman/Identitas.jsx';

function rute() {
  const h = decodeURIComponent(location.hash.replace(/^#\/?/, ''));
  const [hal = 'papan', ...sisa] = h.split('/');
  return { hal, sisa };
}

function App() {
  const [r, setR] = useState(rute());
  const [cari, setCari] = useState('');
  useEffect(() => {
    const f = () => {
      setR(rute());
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', f);
    return () => window.removeEventListener('hashchange', f);
  }, []);
  useEffect(() => {
    const judul = { papan: 'Papan produksi', katalog: 'Katalog konsep', pustaka: 'Pustaka aset', konsep: 'Konsep', identitas: 'Identitas merek' }[r.hal] || 'Katalog';
    document.title = `${judul} · Ulik Silam`;
  }, [r.hal]);

  const kirimCari = (q) => {
    setCari(q);
    if (r.hal !== 'katalog' && r.hal !== 'pustaka') location.hash = '#/katalog';
  };

  let isi;
  if (r.hal === 'katalog') isi = <Katalog cari={cari} />;
  else if (r.hal === 'konsep') isi = <Konsep slug={r.sisa[0]} tab={r.sisa[1] || 'ringkasan'} />;
  else if (r.hal === 'pustaka') isi = <Pustaka cari={cari} jenisAwal={r.sisa[0]} />;
  else if (r.hal === 'identitas') isi = <Identitas />;
  else isi = <Papan />;

  return (
    <>
      <Kepala aktif={r.hal === 'konsep' ? 'katalog' : r.hal} cari={cari} onCari={kirimCari} />
      <main className="isi">{isi}</main>
      <Toast />
    </>
  );
}

createRoot(document.getElementById('akar')).render(<App />);
