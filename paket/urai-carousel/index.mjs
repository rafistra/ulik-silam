// Pengurai CAROUSEL.md Ulik Silam (Kontrak CAROUSEL.md v1.2, lihat .claude/skills/carousel-ulik-silam/SKILL.md).
// Mengembalikan data terstruktur untuk katalog dan (kelak) paket/carousel, plus hasil pemeriksaan kontrak.

export const JENIS_SLIDE = ['Sampul', 'Ilustrasi', 'Teks', 'Entri', 'Banding', 'Linimasa', 'Arsip', 'Ulikan', 'Penutup'];
export const LAPISAN = ['Sejarah', 'Legenda', 'Mitos', 'Rekaan'];
export const LABEL_ARSIP = ['Foto arsip', 'Lukisan sezaman', 'Peta sezaman', 'Naskah', 'Relief', 'Arca'];
export const LISENSI = ['Domain publik', 'CC BY', 'CC BY-SA', 'CC0', 'Izin tertulis', 'Belum dicek'];
export const BAGIAN_WAJIB = ['Ringkasan', 'Slide', 'Gaya visual', 'Prompt ilustrasi untuk Gemini', 'Kartu Ulikan', 'Caption', 'Catatan genre', 'Sumber'];
export const PENUTUP_PROMPT = 'Style: detailed vector art\nAspect ratio: 9:16';
export const MAKS_FLOW = 12;

/** Batas kata per bagian slide (Aturan tetap 5 di skill). */
export const BATAS = { judulSampul: 10, subjudul: 12, judulSlide: 8, isi: 35, isiTeks: 45, keteranganArsip: 25, ulikan: 15 };

export const hitungKata = (t) => (t && t !== '-' ? t.split(/\s+/).filter((w) => w && w !== '//').length : 0);
const dua = (n) => String(n).padStart(2, '0');

/** Pecah teks per judul `## `. */
function bagian(teks) {
  const hasil = { _judul: '', _urutan: [] };
  let kini = null;
  for (const b of teks.replace(/\r\n/g, '\n').split('\n')) {
    const h1 = b.match(/^# (.+)$/);
    if (h1 && !hasil._judul) {
      hasil._judul = h1[1].trim();
      continue;
    }
    const h2 = b.match(/^## (.+?)\s*$/);
    if (h2) {
      kini = h2[1];
      hasil[kini] = [];
      hasil._urutan.push(kini);
      continue;
    }
    if (kini) hasil[kini].push(b);
  }
  for (const k of hasil._urutan) hasil[k] = hasil[k].join('\n').trim();
  return hasil;
}

/** Sub-bagian `### ` di dalam satu bagian. */
function subBagian(teks) {
  const hasil = { _awal: [] };
  let kini = '_awal';
  for (const b of (teks || '').split('\n')) {
    const h = b.match(/^### (.+?)\s*$/);
    if (h) {
      kini = h[1];
      hasil[kini] = [];
      continue;
    }
    hasil[kini].push(b);
  }
  for (const k of Object.keys(hasil)) hasil[k] = hasil[k].join('\n').trim();
  return hasil;
}

/** Baris tabel markdown menjadi array sel (sel kosong dipertahankan). */
function sel(b) {
  return b
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((x) => x.trim());
}
function tabel(teks) {
  const baris = (teks || '').split('\n').filter((b) => /^\s*\|/.test(b));
  if (baris.length < 2) return { kepala: [], isi: [] };
  return { kepala: sel(baris[0]), isi: baris.slice(2).map(sel) };
}
const blokKode = (teks) => [...(teks || '').matchAll(/```[^\n]*\n([\s\S]*?)```/g)].map((m) => m[1].replace(/\n$/, ''));

/** Kolom Visual: sumber gambar latar, plus foto arsip opsional (` ++ Foto: ...`). */
export function uraiVisual(v) {
  const [latar, fotoMentah] = (v || '').split(/\s\+\+\s+Foto:\s*/);
  const tigaBagian = (t) => {
    const p = t.split(' · ').map((x) => x.trim());
    return { deskripsi: p[0] || '', koleksi: p[1] || '', lisensi: p[2] || '' };
  };
  let sumber = { jenis: 'lain', teks: latar.trim() };
  let m;
  if ((m = latar.match(/^Baru:\s*ilustrasi-(\d+)\.?\s*(.*)$/s))) sumber = { jenis: 'baru', ilustrasi: +m[1], deskripsi: m[2].trim() };
  else if ((m = latar.match(/^Pakai ulang:\s*(.*)$/s))) {
    const slide = m[1].match(/slide\s+(\d+)/i);
    const adegan = m[1].match(/^([a-z0-9-]+)\/adegan-(\d+)/);
    sumber = { jenis: 'pakai-ulang', teks: m[1].trim(), slide: slide ? +slide[1] : null, video: adegan ? { slug: adegan[1], adegan: +adegan[2] } : null };
  } else if ((m = latar.match(/^Pustaka:\s*([a-z]+)\/([a-z0-9-]+)\s*(.*)$/s))) sumber = { jenis: 'pustaka', pustaka: { jenis: m[1], id: m[2] }, deskripsi: m[3].trim() };
  else if ((m = latar.match(/^Arsip:\s*(.*)$/s))) sumber = { jenis: 'arsip', ...tigaBagian(m[1]) };
  else if (/^Tanpa gambar/i.test(latar.trim())) sumber = { jenis: 'tanpa' };
  return { sumber, foto: fotoMentah ? tigaBagian(fotoMentah) : null };
}

function uraiSlide(r) {
  const [nomor, jenis, judul, teks, visual, fokus] = r;
  const s = { nomor: +nomor, jenis, judul: judul === '-' ? '' : judul, teks: teks === '-' ? '' : teks, visual, fokus: fokus || '-' };
  s.blok = s.teks ? s.teks.split(/\s\/\/\s/).map((x) => x.trim()) : [];
  Object.assign(s, uraiVisual(visual));
  if (jenis === 'Entri') {
    const m = s.judul.match(/^(#?\d+)\s*·\s*(.+)$/);
    s.angka = m ? m[1] : '';
    s.nama = m ? m[2] : s.judul;
    s.keterangan = s.blok.length > 1 ? s.blok[0] : '';
    s.isi = s.blok.length > 1 ? s.blok.slice(1).join(' ') : s.blok[0] || '';
  } else if (jenis === 'Linimasa') {
    s.titik = s.blok.map((b) => {
      const i = b.indexOf(': ');
      return i > 0 ? { tahun: b.slice(0, i), kalimat: b.slice(i + 2) } : { tahun: '', kalimat: b };
    });
  } else if (jenis === 'Banding') {
    s.populer = s.blok[0] || '';
    s.sumberBanding = s.blok[1] || '';
  } else {
    s.isi = s.blok.join('\n\n');
  }
  return s;
}

function uraiPrompt(teks) {
  const lembar = [];
  const ilustrasi = [];
  const re = /\*\*(Lembar karakter · (.+?)|Ilustrasi (\d+) · Slide (\d+))\*\*\s*\n+```[^\n]*\n([\s\S]*?)```/g;
  let m;
  while ((m = re.exec(teks || ''))) {
    const isi = m[5].replace(/\n$/, '');
    if (m[2]) lembar.push({ nama: m[2].trim(), prompt: isi });
    else ilustrasi.push({ nomor: +m[3], slide: +m[4], prompt: isi });
  }
  return { lembar, ilustrasi };
}

function uraiCaption(teks) {
  const sb = subBagian(teks);
  const hasil = [];
  for (const platform of ['TikTok', 'Instagram']) {
    const t = sb[platform];
    if (t === undefined) continue;
    const baris = (k) => (t.match(new RegExp(`\\*\\*${k}:\\*\\*\\s*(.+)`)) || [])[1]?.trim() || '';
    const kode = blokKode(t);
    const alt = [...t.matchAll(/^- Slide (\d+):\s*(.+)$/gm)].map((x) => ({ slide: +x[1], teks: x[2].trim() }));
    hasil.push({ platform, judul: baris('Judul'), musik: baris('Musik'), caption: kode[0] || '', alt, jumlahBlok: kode.length });
  }
  return hasil;
}

/** Teks satu batch Flow (Nano Banana Pro) untuk ilustrasi baru, paling banyak 12 per batch. */
export function batchFlow(prompt, { judul = '', maks = MAKS_FLOW } = {}) {
  const daftar = [...prompt].sort((a, b) => a.slide - b.slide);
  // dibagi rata: 13 prompt menjadi 7 dan 6, bukan 12 dan 1
  const n = Math.ceil(daftar.length / maks) || 0;
  const ukuran = n ? Math.ceil(daftar.length / n) : 0;
  const batch = [];
  for (let i = 0; i < daftar.length; i += ukuran) batch.push(daftar.slice(i, i + ukuran));
  return batch.map((isi, k) => {
    const kepala = `Create one image for each of the ${isi.length} prompts below, using Nano Banana Pro at a 9:16 vertical aspect ratio, 2 results per prompt. Each prompt is independent: do not carry characters or objects from one prompt to another. Name the results "Slide XX" using the slide number in each heading${judul ? `, in a collection called "${judul} - Slide"` : ''}.`;
    const badan = isi.map((p) => `--- Slide ${dua(p.slide)} ---\n${p.prompt}`).join('\n\n');
    return { ke: k + 1, dari: isi[0].slide, sampai: isi[isi.length - 1].slide, jumlah: isi.length, teks: `${kepala}\n\n${badan}` };
  });
}

export function uraiCarousel(teks) {
  const b = bagian(teks);
  const masalah = [];
  const peringatan = [];

  if (!/^Konsep Carousel:/.test(b._judul)) masalah.push('Judul dokumen harus "# Konsep Carousel: <topik>".');
  const posisi = BAGIAN_WAJIB.map((j) => b._urutan.indexOf(j));
  BAGIAN_WAJIB.forEach((j, i) => posisi[i] < 0 && masalah.push(`Bagian "## ${j}" tidak ada.`));
  const ada = posisi.filter((p) => p >= 0);
  if (ada.some((p, i) => i && p < ada[i - 1])) peringatan.push('Urutan bagian ## tidak sesuai kontrak.');

  // Ringkasan
  const ringkasan = Object.fromEntries(tabel(b['Ringkasan']).isi.filter((r) => r[0]).map((r) => [r[0], r[1] || '']));
  const lapisan = (ringkasan.Lapisan || '').split(',').map((x) => x.trim()).filter(Boolean);
  for (const w of ['Judul', 'Slug', 'Jenis', 'Lapisan', 'Latar', 'Platform', 'Jumlah slide']) if (!ringkasan[w]) masalah.push(`Ringkasan: baris "${w}" kosong atau tidak ada.`);
  if (lapisan.some((l) => !LAPISAN.includes(l))) masalah.push(`Lapisan tidak sah: ${lapisan.join(', ')}.`);
  if (new Set(lapisan).size !== lapisan.length || lapisan.length > 2) masalah.push('Lapisan berisi satu atau dua nilai tanpa duplikat.');

  // Slide
  const slide = tabel(b['Slide']).isi.filter((r) => /^\d+$/.test(r[0])).map(uraiSlide);
  if (ringkasan['Jumlah slide'] && +ringkasan['Jumlah slide'] !== slide.length) masalah.push(`Jumlah slide di Ringkasan ${ringkasan['Jumlah slide']}, tabel berisi ${slide.length}.`);
  slide.forEach((s, i) => s.nomor !== i + 1 && masalah.push(`Nomor slide tidak berurutan di baris ${i + 1}.`));
  if (slide.length < 4 || slide.length > 15) peringatan.push(`Jumlah slide ${slide.length}; aturan 4 sampai 15.`);
  for (const s of slide) {
    const L = `Slide ${s.nomor}`;
    if (!JENIS_SLIDE.includes(s.jenis)) masalah.push(`${L}: jenis "${s.jenis}" tidak sah.`);
    if (!['atas', 'tengah', 'bawah', '-'].includes(s.fokus)) masalah.push(`${L}: Fokus "${s.fokus}" tidak sah.`);
    if (s.sumber.jenis === 'lain') peringatan.push(`${L}: kolom Visual tidak dikenali.`);
    for (const g of [s.sumber.jenis === 'arsip' ? s.sumber : null, s.foto].filter(Boolean)) {
      if (!g.koleksi || !g.lisensi) masalah.push(`${L}: arsip atau foto harus punya koleksi dan status lisensi.`);
      else if (!LISENSI.includes(g.lisensi)) peringatan.push(`${L}: status lisensi "${g.lisensi}" tidak dikenal.`);
    }
    if (s.jenis === 'Arsip' && !LABEL_ARSIP.includes(s.judul)) peringatan.push(`${L}: label arsip "${s.judul}" tidak baku.`);
    if (s.jenis === 'Linimasa' && (s.titik.length < 3 || s.titik.length > 4)) peringatan.push(`${L}: linimasa berisi ${s.titik.length} titik (3 sampai 4).`);
    if (s.jenis === 'Banding' && s.blok.length !== 2) masalah.push(`${L}: Banding harus tepat dua blok.`);
    // batas kata
    const batasJudul = s.jenis === 'Sampul' ? BATAS.judulSampul : BATAS.judulSlide;
    const kj = hitungKata(s.jenis === 'Entri' ? s.nama : s.judul);
    s.kata = { judul: kj, isi: 0 };
    if (s.jenis === 'Entri') s.kata.isi = hitungKata(s.isi);
    else if (s.jenis === 'Arsip') s.kata.isi = hitungKata(s.teks);
    else if (!['Ulikan', 'Penutup'].includes(s.jenis)) s.kata.isi = hitungKata(s.teks);
    const batasIsi = s.jenis === 'Sampul' ? BATAS.subjudul : s.jenis === 'Teks' ? BATAS.isiTeks : s.jenis === 'Arsip' ? BATAS.keteranganArsip : BATAS.isi;
    s.batas = { judul: batasJudul, isi: batasIsi };
    if (kj > batasJudul) peringatan.push(`${L}: judul ${kj} kata (batas ${batasJudul}).`);
    if (s.kata.isi > batasIsi) peringatan.push(`${L}: teks ${s.kata.isi} kata (batas ${batasIsi}).`);
  }
  if (slide.length) {
    if (slide[0].jenis !== 'Sampul') masalah.push('Slide 1 harus Sampul.');
    const n = slide.length;
    if (n >= 2 && (slide[n - 2].jenis !== 'Ulikan' || slide[n - 1].jenis !== 'Penutup')) masalah.push('Dua slide terakhir harus Ulikan lalu Penutup.');
    if (slide.filter((s) => s.jenis === 'Arsip').length > 3) masalah.push('Slide Arsip paling banyak 3.');
  }

  // Prompt
  const prompt = uraiPrompt(b['Prompt ilustrasi untuk Gemini']);
  const baru = slide.filter((s) => s.sumber.jenis === 'baru');
  for (const s of baru) if (!prompt.ilustrasi.some((p) => p.nomor === s.sumber.ilustrasi)) masalah.push(`Slide ${s.nomor}: ilustrasi-${dua(s.sumber.ilustrasi)} tidak punya blok prompt.`);
  for (const p of prompt.ilustrasi) if (!baru.some((s) => s.sumber.ilustrasi === p.nomor)) masalah.push(`Prompt ilustrasi ${dua(p.nomor)} tidak dipakai slide mana pun.`);
  for (const p of [...prompt.lembar, ...prompt.ilustrasi]) {
    p.kata = hitungKata(p.prompt.replace(PENUTUP_PROMPT, ''));
    if (!p.prompt.trimEnd().endsWith(PENUTUP_PROMPT)) masalah.push(`Prompt ${p.nama || `ilustrasi ${dua(p.nomor)}`} tidak diakhiri baris penutup.`);
    if (!/text, letters, labels, watermarks/.test(p.prompt)) peringatan.push(`Prompt ${p.nama || `ilustrasi ${dua(p.nomor)}`} tidak memuat larangan teks.`);
    if (/batik/i.test(p.prompt) && !/parang/i.test(p.prompt)) peringatan.push(`Prompt ${p.nama || `ilustrasi ${dua(p.nomor)}`} menyebut batik tanpa melarang motif parang.`);
  }
  if (new Set(prompt.lembar.map((l) => l.nama)).size !== prompt.lembar.length) masalah.push('Nama lembar karakter tidak unik.');

  // Kartu Ulikan
  const u = b['Kartu Ulikan'] || '';
  const ulikan = {
    teks: (u.match(/\*\*Teks:\*\*\s*(.+)/) || [])[1]?.trim() || '',
    sumber: (u.match(/\*\*Sumber:\*\*\s*(.+)/) || [])[1]?.trim() || '',
  };
  ulikan.kata = hitungKata(ulikan.teks);
  if (!ulikan.teks) masalah.push('Kartu Ulikan: baris Teks kosong.');
  if (!ulikan.sumber) masalah.push('Kartu Ulikan: baris Sumber kosong.');
  if (ulikan.kata > BATAS.ulikan + 2) peringatan.push(`Kartu Ulikan ${ulikan.kata} kata (±${BATAS.ulikan}).`);

  // Caption
  const caption = uraiCaption(b['Caption']);
  if (!caption.length) masalah.push('Caption: tidak ada subjudul ### TikTok atau ### Instagram.');
  for (const c of caption) {
    if (c.jumlahBlok !== 1) masalah.push(`Caption ${c.platform}: harus tepat satu blok kode (ada ${c.jumlahBlok}).`);
    const tag = (c.caption.trim().split('\n').pop() || '').match(/#\S+/g) || [];
    if (tag.length < 3 || tag.length > 5) peringatan.push(`Caption ${c.platform}: ${tag.length} hashtag (3 sampai 5).`);
    if (/\[diisi/.test(c.caption)) peringatan.push(`Caption ${c.platform}: masih ada isian [diisi ...].`);
  }
  const ig = caption.find((c) => c.platform === 'Instagram');
  if (ig) {
    const kurang = slide.filter((s) => !ig.alt.some((a) => a.slide === s.nomor)).map((s) => s.nomor);
    if (kurang.length) masalah.push(`Teks alternatif Instagram kurang untuk slide ${kurang.join(', ')}.`);
  }

  const cg = subBagian(b['Catatan genre']);
  for (const w of ['Verifikasi fakta', 'Pemeriksaan silang']) if (cg[w] === undefined) masalah.push(`Catatan genre: "### ${w}" tidak ada.`);
  if (baru.length && cg['Catatan akurasi visual'] === undefined) peringatan.push('Catatan genre: "### Catatan akurasi visual" belum ada padahal ada ilustrasi baru.');
  const verifikasi = tabel(cg['Verifikasi fakta']);
  const statusFakta = {};
  for (const r of verifikasi.isi) {
    const st = r[verifikasi.kepala.indexOf('Status')] || '';
    const k = st.split(/[ ,(]/)[0] || '-';
    statusFakta[k] = (statusFakta[k] || 0) + 1;
  }

  const sumber = (b['Sumber'] || '').split('\n').filter((x) => /^- /.test(x)).map((x) => x.slice(2).trim());
  // Sumber utama untuk slide Penutup: dari penanda caption ("Sumber utama: A; B."), atau dua sumber pertama.
  const dariCaption = caption.map((c) => (c.caption.match(/Sumber utama:\s*(.+?)\.(?:\s|$)/) || [])[1]).find(Boolean);
  const sumberUtama = dariCaption || sumber.slice(0, 2).map((x) => x.split(',')[0]).join('; ');

  return {
    judulDokumen: b._judul.replace(/^Konsep Carousel:\s*/, ''),
    judul: ringkasan.Judul || '',
    slug: ringkasan.Slug || '',
    jenis: ringkasan.Jenis || '',
    lapisan,
    latar: ringkasan.Latar || '',
    versi: ringkasan.Versi || 'v1',
    ringkasan,
    slide,
    gayaVisual: b['Gaya visual'] || '',
    prompt,
    flow: batchFlow(prompt.ilustrasi, { judul: ringkasan.Judul || '' }),
    ulikan,
    caption,
    catatanGenre: b['Catatan genre'] || '',
    sumber,
    sumberUtama,
    statistik: {
      jumlahSlide: slide.length,
      entri: slide.filter((s) => s.jenis === 'Entri').length,
      ilustrasiBaru: baru.length,
      foto: slide.filter((s) => s.foto).length,
      arsip: slide.filter((s) => s.jenis === 'Arsip').length,
      fakta: verifikasi.isi.length,
      statusFakta,
    },
    validasi: { masalah, peringatan },
  };
}
