// Pengurai KONSEP.md (Kontrak v1 sampai v1.5) menjadi objek konsep.
// Dipakai bersama oleh katalog, skill, dan render. Asal: scripts/urai-konsep.mjs proyek Kayan part 2.
// Pemakaian modul: import { uraiKonsep } from 'urai-konsep'; const hasil = uraiKonsep(teks, { sumber: 'KONSEP.md' });

export function uraiKonsep(teksMentah, { sumber = 'KONSEP.md' } = {}) {
  // Ekspor Docs meloloskan tanda markdown (mis. \[calm\]); buang escape di luar blok kode.
  let diBlok = false;
  const teks = teksMentah
    .toString()
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((b) => {
      if (b.startsWith('```')) {
        diBlok = !diBlok;
        return b;
      }
      return diBlok ? b : b.replace(/\\([\[\]*_\-#.!()`])/g, '$1');
    })
    .join('\n');
  const baris = teks.split('\n');

  // ---------- bantuan ----------
  const bersihkanTag = (s) =>
    s.replace(/\[[a-z][a-z ]*\]/g, ' ').replace(/\s+/g, ' ').trim();
  const hitungKata = (s) => (bersihkanTag(s).match(/[\p{L}\p{N}][\p{L}\p{N}'’-]*/gu) || []).length;
  const selKolom = (b) =>
    b.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((x) => x.trim());

  function bagian(judul, level = 2) {
    const pref = '#'.repeat(level) + ' ';
    const i = baris.findIndex((b) => b.trim() === pref + judul);
    if (i < 0) return null;
    let j = i + 1;
    while (j < baris.length) {
      const m = baris[j].match(/^(#+) /);
      if (m && m[1].length <= level) break;
      j++;
    }
    return { mulai: i, akhir: j, isi: baris.slice(i + 1, j) };
  }

  function tabelSetelah(isi, kepalaRegex) {
    const i = isi.findIndex((b) => kepalaRegex.test(b));
    if (i < 0) return null;
    const kepala = selKolom(isi[i]);
    const rows = [];
    for (let j = i + 2; j < isi.length && isi[j].trim().startsWith('|'); j++) rows.push(selKolom(isi[j]));
    return { kepala, rows };
  }

  function blokKodeSetelah(isi, idx) {
    let j = idx + 1;
    while (j < isi.length && !isi[j].startsWith('```')) {
      if (/^\*\*/.test(isi[j]) || /^#+ /.test(isi[j])) return null;
      j++;
    }
    if (j >= isi.length) return null;
    const k = isi.indexOf('```', j + 1) >= 0 ? isi.findIndex((b, n) => n > j && b.startsWith('```')) : -1;
    if (k < 0) return null;
    return { isi: isi.slice(j + 1, k).join('\n'), akhir: k };
  }

  const masalah = [];
  const peringatan = [];
  const penyesuaian = [];

  // ---------- judul & bagian wajib ----------
  const judulDok = (baris.find((b) => b.startsWith('# Konsep Video POV:')) || '').replace('# Konsep Video POV:', '').trim();
  if (!judulDok) masalah.push('Judul "# Konsep Video POV: <topik>" tidak ada.');
  const WAJIB = [
    'Ringkasan konsep',
    'Gaya visual dan konsistensi tokoh',
    'Struktur alur',
    'Naskah adegan',
    'Prompt ilustrasi untuk Gemini',
    'Panduan narasi dan audio',
    'Kartu Ulikan',
    'Judul, caption, dan hashtag',
  ];
  const URUTAN = [...WAJIB.slice(0, 5), 'Peta animasi', ...WAJIB.slice(5, 7), 'Judul, caption, dan hashtag', 'Catatan genre', 'Alur produksi dan checklist', 'Sumber', 'Ide cadangan'];
  const posisiBagian = [];
  for (const j of URUTAN) {
    const b = bagian(j);
    if (b) posisiBagian.push([j, b.mulai]);
    else if (WAJIB.includes(j)) {
      if (j === 'Kartu Ulikan') penyesuaian.push('Bagian ## Kartu Ulikan tidak ada.');
      else masalah.push(`Bagian wajib "## ${j}" tidak ada.`);
    }
  }
  for (let i = 1; i < posisiBagian.length; i++)
    if (posisiBagian[i][1] < posisiBagian[i - 1][1]) masalah.push(`Urutan bagian salah: "${posisiBagian[i][0]}" sebelum "${posisiBagian[i - 1][0]}".`);

  // ---------- ringkasan ----------
  const ringkasan = {};
  {
    const b = bagian('Ringkasan konsep');
    const t = b && tabelSetelah(b.isi, /^\|\s*Keputusan\s*\|\s*Isi\s*\|/);
    if (!t) masalah.push('Tabel | Keputusan | Isi | tidak ada di Ringkasan konsep.');
    else for (const [k, v] of t.rows) ringkasan[k] = v;
  }
  for (const k of ['Judul', 'Slug', 'Durasi', 'Rasio', 'Platform', 'Posisi "kamu"', 'Jumlah ilustrasi'])
    if (!ringkasan[k]) masalah.push(`Baris ringkasan "${k}" kosong atau tidak ada.`);
  let slug = ringkasan.Slug || '';
  if (slug && !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) masalah.push(`Slug "${slug}" bukan kebab-case huruf kecil.`);
  const versi = ringkasan.Versi || 'v1';
  if (!ringkasan.Versi) penyesuaian.push('Versi tidak ada; dianggap v1.');
  const LAPISAN_SAH = ['Sejarah', 'Legenda', 'Mitos', 'Rekaan'];
  let lapisan = (ringkasan.Lapisan || '').split(',').map((s) => s.trim()).filter(Boolean);
  if (!lapisan.length) {
    if (bagian('Catatan genre')) {
      lapisan = ['Sejarah'];
      penyesuaian.push('Lapisan tidak ada; dianggap Sejarah (ada Catatan genre).');
    } else masalah.push('Lapisan tidak ada; perlu ditanyakan ke Rafi.');
  }
  if (lapisan.length > 2) masalah.push('Lapisan berisi lebih dari dua nilai.');
  if (new Set(lapisan).size !== lapisan.length) masalah.push('Lapisan berisi duplikat.');
  for (const l of lapisan) if (!LAPISAN_SAH.includes(l)) masalah.push(`Lapisan "${l}" tidak sah.`);
  const latar = ringkasan.Latar || '';
  const durasiM = (ringkasan.Durasi || '').match(/(\d+):(\d{2})\s*maksimum/);
  const targetM = (ringkasan.Durasi || '').match(/target\s*±?\s*(\d+):(\d{2})/);
  const durasiMaksDetik = durasiM ? +durasiM[1] * 60 + +durasiM[2] : null;
  const durasiTargetDetik = targetM ? +targetM[1] * 60 + +targetM[2] : null;
  if (durasiMaksDetik == null) masalah.push('Durasi maksimum tidak terbaca (format "m:ss maksimum").');

  // ---------- gaya visual ----------
  const palet = [];
  let penutupPrompt = '';
  {
    const b = bagian('Gaya visual dan konsistensi tokoh');
    if (b) {
      const t = tabelSetelah(b.isi, /^\|\s*Babak\s*\|\s*Suasana\s*\|\s*Palet\s*\|\s*Cahaya\s*\|/);
      if (!t) masalah.push('Tabel | Babak | Suasana | Palet | Cahaya | tidak ada.');
      else
        for (const [babak, suasana, p, cahaya] of t.rows) {
          const m = babak.match(/^(\d+)\s+(.*)$/);
          palet.push({ babak: m ? +m[1] : null, nama: m ? m[2] : babak, suasana, palet: p, cahaya });
        }
      const i = b.isi.findIndex((x) => x.trim() === '**Penutup prompt:**');
      const k = i >= 0 && blokKodeSetelah(b.isi, i);
      if (k) penutupPrompt = k.isi.trim();
      else masalah.push('Baris **Penutup prompt:** dengan blok kode tidak ada.');
    }
  }
  if (penutupPrompt && !(/vector art/i.test(penutupPrompt) && /9:16/.test(penutupPrompt)))
    peringatan.push('Penutup prompt tidak menyebut gaya vector art dan rasio 9:16.');

  // ---------- naskah ----------
  const adegan = [];
  const namaBabak = {};
  {
    const b = bagian('Naskah adegan');
    if (b) {
      let babakKini = null;
      for (let i = 0; i < b.isi.length; i++) {
        const m = b.isi[i].match(/^### Babak (\d+): (.+)$/);
        if (m) {
          babakKini = +m[1];
          namaBabak[babakKini] = m[2].trim();
          continue;
        }
        if (/^\|\s*#\s*\|/.test(b.isi[i])) {
          const kepala = selKolom(b.isi[i]);
          const harap = ['#', 'Waktu', 'Bidikan dan visual', 'Narasi', 'Teks layar', 'Suara'];
          if (kepala.join('|') !== harap.join('|')) {
            if (kepala.join('|') === ['#', 'Waktu', 'Bidikan dan visual', 'Narasi', 'Teks layar / suara'].join('|'))
              penyesuaian.push(`Babak ${babakKini}: kolom gabungan Teks layar / suara dipisah otomatis.`);
            else masalah.push(`Babak ${babakKini}: kolom naskah tidak persis (${kepala.join(' | ')}).`);
          }
          for (let j = i + 2; j < b.isi.length && b.isi[j].trim().startsWith('|'); j++) {
            const c = selKolom(b.isi[j]);
            let [no, waktu, visualMentah, narasiSuara, teksLayarMentah, suara] = c;
            if (c.length === 5) {
              const gab = c[4];
              const tm = gab.match(/Teks:\s*"([^"]*)"/);
              const sm = gab.match(/Suara:\s*(.*)$/);
              teksLayarMentah = tm ? tm[1] : '-';
              suara = sm ? sm[1].trim() : '-';
            }
            // Penanda boleh ditaruh sebelum A./B. (kontrak tidak menetapkan posisinya).
            const visualTanpaPenanda = visualMentah
              .replace(/\*\*(Momen hening|Epilog)\.?\*\*[.;]?\s*/g, '')
              .replace(/^([AB]\.)\s*\*\*Peta animasi\*\*[;.]?\s*/, '$1 ')
              .replace(/\*\*Peta animasi\*\*[;.]?\s*/g, '')
              .trim();
            const bid = (visualTanpaPenanda.match(/^([AB])\./) || [])[1] || null;
            if (!bid) masalah.push(`Adegan ${no}: kolom visual tidak diawali A. atau B.`);
            const wm = waktu.match(/^(\d+):(\d{2})[–-](\d+):(\d{2})$/);
            if (!wm) masalah.push(`Adegan ${no}: format Waktu "${waktu}" tidak sah.`);
            const teksLayar = teksLayarMentah === '-' || !teksLayarMentah ? [] : teksLayarMentah.split(' / ').map((s) => s.trim());
            for (const t of teksLayar) if (/\[[^\]]*\]/.test(t)) masalah.push(`Adegan ${no}: tag suara di Teks layar.`);
            adegan.push({
              nomor: +no,
              babak: babakKini,
              namaBabak: namaBabak[babakKini],
              waktu,
              durasiCadangan: wm ? (+wm[3] * 60 + +wm[4]) - (+wm[1] * 60 + +wm[2]) : null,
              bidikan: bid,
              visual: visualTanpaPenanda.replace(/^[AB]\.\s*/, '').trim(),
              narasiSuara,
              narasi: bersihkanTag(narasiSuara),
              teksLayar,
              suara,
              hening: /\*\*Momen hening\.?\*\*/.test(visualMentah),
              epilog: /\*\*Epilog\.?\*\*/.test(visualMentah),
              petaAnimasi: /\*\*Peta animasi\*\*/.test(visualMentah),
              kata: hitungKata(narasiSuara),
            });
          }
        }
      }
    }
  }
  adegan.forEach((a, i) => {
    if (a.nomor !== i + 1) masalah.push(`Nomor adegan tidak berurutan di posisi ${i + 1} (tertulis ${a.nomor}).`);
  });
  for (const a of adegan) {
    const tagSalah = (a.narasiSuara.match(/\[[^\]]*\]/g) || []).filter((t) => !/^\[[a-z][a-z ]*\]$/.test(t));
    if (tagSalah.length) masalah.push(`Adegan ${a.nomor}: tag tidak sah ${tagSalah.join(', ')}.`);
  }

  // ---------- prompt ----------
  const lembarKarakter = [];
  const promptAdegan = {};
  {
    const b = bagian('Prompt ilustrasi untuk Gemini');
    if (b) {
      for (let i = 0; i < b.isi.length; i++) {
        let m = b.isi[i].match(/^\*\*(?:Lembar karakter|0[A-Z]) · (.+?)\*\*\s*$/);
        if (m) {
          if (/^\*\*0[A-Z] · /.test(b.isi[i])) penyesuaian.push(`Label lama lembar karakter "${b.isi[i]}" dibaca sebagai nama tokoh.`);
          const k = blokKodeSetelah(b.isi, i);
          if (!k) masalah.push(`Lembar karakter ${m[1]} tanpa blok kode.`);
          else lembarKarakter.push({ nama: m[1].trim(), prompt: k.isi.trim() });
          continue;
        }
        m = b.isi[i].match(/^\*\*Adegan (\d+) · Narasi \(([^)]*)\):\*\*\s*(.*)$/);
        if (m) {
          const k = blokKodeSetelah(b.isi, i);
          if (!k) masalah.push(`Prompt adegan ${m[1]} tanpa blok kode.`);
          else {
            if (promptAdegan[m[1]]) masalah.push(`Prompt adegan ${m[1]} ganda.`);
            promptAdegan[+m[1]] = { waktu: m[2], narasi: m[3].trim(), prompt: k.isi.trim() };
          }
        }
      }
    }
  }
  const namaTokoh = lembarKarakter.map((l) => l.nama);
  if (new Set(namaTokoh).size !== namaTokoh.length) masalah.push('Nama tokoh di lembar karakter tidak unik.');
  const jmlPrompt = Object.keys(promptAdegan).length;
  const nomorMaks = Math.max(0, ...adegan.map((a) => a.nomor));
  if (!(adegan.length === jmlPrompt && jmlPrompt === nomorMaks))
    masalah.push(`Jumlah baris naskah (${adegan.length}), prompt adegan (${jmlPrompt}), dan nomor terbesar (${nomorMaks}) tidak sama.`);
  if (penutupPrompt) {
    const cekPenutup = (nama, p) => {
      if (!p.trimEnd().endsWith(penutupPrompt)) masalah.push(`Prompt ${nama} tidak diakhiri baris penutup.`);
    };
    lembarKarakter.forEach((l) => cekPenutup(`lembar karakter ${l.nama}`, l.prompt));
    Object.entries(promptAdegan).forEach(([n, p]) => cekPenutup(`adegan ${n}`, p.prompt));
  }
  for (const a of adegan) {
    const p = promptAdegan[a.nomor];
    if (p && bersihkanTag(p.narasi) !== a.narasi) peringatan.push(`Adegan ${a.nomor}: narasi di baris prompt berbeda dari kolom Narasi (kolom Narasi yang dipakai).`);
  }

  // ---------- peta animasi (v1.4/v1.5) ----------
  const IKON_UMUM = ['pohon', 'kelapa', 'bukit', 'gunung', 'gunung-api', 'pondok', 'rumah-panjang', 'kampung', 'masjid', 'gereja', 'candi', 'benteng', 'dermaga', 'perahu', 'kapal-layar', 'sawah', 'makam'];
  const peta = {};
  const kebutuhanGeojson = [];
  {
    const b = bagian('Peta animasi');
    if (b) {
      for (let i = 0; i < b.isi.length; i++) {
        const m = b.isi[i].match(/^### Adegan (\d+)\s*$/);
        if (!m) continue;
        const n = +m[1];
        let j = i + 1;
        const isi = [];
        while (j < b.isi.length && !/^### /.test(b.isi[j])) isi.push(b.isi[j++]);
        const ambil = (k) => {
          const l = isi.find((x) => x.startsWith(`**${k}:**`));
          return l == null ? null : l.replace(`**${k}:**`, '').trim();
        };
        const daftar = (v) => (!v || v === '-' ? [] : v.split(',').map((s) => s.trim()).filter(Boolean));
        const bingkaiTeks = ambil('Bingkai');
        const bm = bingkaiTeks && bingkaiTeks.match(/(-?[\d.]+)\s*[–-]\s*(-?[\d.]+)\s*BT,\s*(-?[\d.]+)\s*[–-]\s*(-?[\d.]+)\s*LU/);
        const bingkai = bm ? { barat: +bm[1], timur: +bm[2], selatan: +bm[3], utara: +bm[4] } : null;
        if (!bingkai) masalah.push(`Peta adegan ${n}: baris Bingkai tidak terbaca.`);
        // Batas: pisah per entri "nama (isi; isi; gaya; status)"
        const batasTeks = ambil('Batas');
        const batas = [];
        if (batasTeks && batasTeks !== '-') {
          const re = /([^,(][^(]*?)\s*\(([^()]*(?:\([^()]*\)[^()]*)*)\)/g;
          let bt;
          while ((bt = re.exec(batasTeks))) {
            const bagianB = bt[2].split(';').map((s) => s.trim());
            const gaya = bagianB.find((s) => /^(garis|arsiran|pancaran)\b/.test(s)) || '';
            const status = bagianB.find((s) => /^(terverifikasi|perkiraan)\b/.test(s)) || '';
            const pusatM = bt[2].match(/pusat\s*(-?[\d.]+),\s*(-?[\d.]+)/);
            const pemicuM = bt[2].match(/pemicu\s+([^;]+)/);
            const ent = {
              nama: bt[1].replace(/^,\s*/, '').trim(),
              tahun: bagianB[0] || '',
              sumber: bagianB[1] || '',
              gaya: gaya.split(/\s/)[0],
              status: status.split(/\s/)[0],
              pusat: pusatM ? [+pusatM[1], +pusatM[2]] : null,
              pemicu: pemicuM ? pemicuM[1].trim() : null,
            };
            if (!ent.tahun || !ent.sumber || !ent.gaya || !ent.status) masalah.push(`Peta adegan ${n}: batas "${ent.nama}" kurang tahun, sumber, gaya, atau status.`);
            if (ent.gaya === 'pancaran' && !ent.pusat) masalah.push(`Peta adegan ${n}: batas pancaran "${ent.nama}" tanpa pusat.`);
            batas.push(ent);
          }
          if (!batas.length) masalah.push(`Peta adegan ${n}: baris Batas tidak terbaca.`);
        }
        const jejakTeks = ambil('Jejak sebelumnya');
        const jejak = [];
        if (jejakTeks && jejakTeks !== '-') {
          const re = /([^,(]+?)\s*\((-?[\d.]+),\s*(-?[\d.]+)\)/g;
          let jt;
          while ((jt = re.exec(jejakTeks))) jejak.push({ nama: jt[1].replace(/^,\s*/, '').trim(), bujur: +jt[2], lintang: +jt[3] });
        }
        const t = tabelSetelah(isi, /^\|\s*Titik\s*\|\s*Nama di peta\s*\|/);
        const titik = [];
        if (!t) masalah.push(`Peta adegan ${n}: tabel titik tidak ada.`);
        else {
          const k = t.kepala;
          const idx = (nm) => k.indexOf(nm);
          for (const r of t.rows)
            titik.push({
              nomor: +r[idx('Titik')],
              nama: r[idx('Nama di peta')],
              bujur: +r[idx('Bujur')],
              lintang: +r[idx('Lintang')],
              ikon: idx('Ikon') >= 0 ? r[idx('Ikon')] : '-',
              pemicu: r[idx('Pemicu')],
              status: r[idx('Status')],
            });
        }
        // ikon khusus
        const ikonKhusus = [];
        const ik = isi.findIndex((x) => x.trim() === '**Ikon khusus:**');
        if (ik >= 0)
          for (let q = ik + 1; q < isi.length; q++) {
            const mm = isi[q].match(/^-\s+([a-z0-9-]+):\s*(.*)$/);
            if (!mm) continue;
            const kode = blokKodeSetelah(isi, q);
            ikonKhusus.push({ slug: mm[1], keterangan: mm[2].trim(), prompt: kode ? kode.isi.trim() : '' });
            if (!kode) masalah.push(`Peta adegan ${n}: ikon khusus ${mm[1]} tanpa blok prompt.`);
          }
        const catatan = (() => {
          const c = isi.findIndex((x) => x.trim() === 'Catatan:');
          return c < 0 ? [] : isi.slice(c + 1).filter((x) => /^-\s/.test(x)).map((x) => x.replace(/^-\s+/, ''));
        })();
        peta[n] = {
          bingkai,
          sungaiDanGaris: daftar(ambil('Sungai dan garis')),
          batas,
          geojson: daftar(ambil('GeoJSON')),
          jejakSebelumnya: jejak,
          titik,
          ikonKhusus,
          catatan,
        };
        i = j - 1;
      }
    }
  }
  const adeganPeta = adegan.filter((a) => a.petaAnimasi).map((a) => a.nomor);
  for (const n of adeganPeta) if (!peta[n]) peringatan.push(`Adegan ${n} bertanda Peta animasi tetapi datanya tidak ada; memakai ilustrasi dari prompt cadangan.`);
  for (const n of Object.keys(peta).map(Number)) {
    if (!adeganPeta.includes(n)) masalah.push(`## Peta animasi punya Adegan ${n}, tetapi adegan itu tidak bertanda **Peta animasi**.`);
    const p = peta[n];
    const a = adegan.find((x) => x.nomor === n);
    if (p.titik.length < 2) masalah.push(`Peta adegan ${n}: kurang dari dua titik.`);
    if (p.bingkai)
      for (const t of [...p.titik, ...p.jejakSebelumnya])
        if (t.bujur < p.bingkai.barat || t.bujur > p.bingkai.timur || t.lintang < p.bingkai.selatan || t.lintang > p.bingkai.utara)
          masalah.push(`Peta adegan ${n}: titik "${t.nama}" (${t.bujur}, ${t.lintang}) di luar bingkai.`);
    const norm = (s) => s.toLowerCase().replace(/[^\p{L}\p{N}' ]+/gu, ' ').replace(/\s+/g, ' ').trim();
    const narasiN = a ? norm(a.narasi) : '';
    for (const t of p.titik) {
      if (t.pemicu && t.pemicu !== 'awal' && t.pemicu !== '-' && !narasiN.includes(norm(t.pemicu)))
        masalah.push(`Peta adegan ${n}: pemicu "${t.pemicu}" (titik ${t.nomor}) tidak ada di narasi.`);
      const ik = t.ikon || '-';
      if (ik.startsWith('umum:') && !IKON_UMUM.includes(ik.slice(5))) masalah.push(`Peta adegan ${n}: ikon ${ik} tidak ada di pustaka.`);
      if (ik.startsWith('khusus:') && !p.ikonKhusus.some((k) => k.slug === ik.slice(7))) masalah.push(`Peta adegan ${n}: ikon ${ik} tanpa entri Ikon khusus.`);
      if (!['terverifikasi', 'perkiraan'].includes(t.status)) masalah.push(`Peta adegan ${n}: status titik ${t.nomor} "${t.status}" tidak sah.`);
    }
    for (const bt of p.batas) if (bt.pemicu && !narasiN.includes(norm(bt.pemicu))) masalah.push(`Peta adegan ${n}: pemicu batas "${bt.pemicu}" tidak ada di narasi.`);
    for (const g of p.geojson) kebutuhanGeojson.push({ adegan: n, berkas: g });
  }

  // ---------- audio ----------
  const suara = { model: '', voice: '', stability: '', arahan: '', arahanBabak: {} };
  const cueMusik = [];
  const sfx = [];
  let adeganHening = [];
  const narasiLengkap = {};
  {
    const b = bagian('Panduan narasi dan audio');
    if (b) {
      const sn = bagian('Suara narator', 3);
      if (sn) {
        const ambil = (k) => {
          const l = sn.isi.find((x) => x.startsWith(`**${k}:**`));
          return l ? l.replace(`**${k}:**`, '').trim() : '';
        };
        suara.model = ambil('Model');
        suara.voice = ambil('Voice');
        suara.stability = ambil('Stability');
        suara.arahan = sn.isi.filter((x) => !/^\*\*(Model|Voice|Stability):\*\*/.test(x)).join('\n').trim();
        for (const l of sn.isi) {
          const m = l.match(/^\s*-\s+(?:\*\*)?Babak (\d+)(?: \([^)]*\))?:(?:\*\*)?\s*(.*)$/);
          if (m) suara.arahanBabak[+m[1]] = m[2].trim();
        }
        if (!suara.model) penyesuaian.push('Model narator tidak ada; dianggap Eleven v3.');
      } else masalah.push('### Suara narator tidak ada.');
      const nl = bagian('Narasi lengkap (ElevenLabs)', 3);
      if (nl) {
        for (let i = 0; i < nl.isi.length; i++) {
          const m = nl.isi[i].match(/^\*\*Babak (\d+): (.+)\*\*$/);
          if (m) {
            const k = blokKodeSetelah(nl.isi, i);
            if (k) narasiLengkap[+m[1]] = k.isi;
          }
        }
      }
      const mu = bagian('Musik (Suno)', 3);
      if (mu) {
        const t = tabelSetelah(mu.isi, /^\|\s*Cue\s*\|\s*Babak\s*\|\s*Durasi target\s*\|\s*Suasana\s*\|/);
        if (!t) masalah.push('Tabel | Cue | Babak | Durasi target | Suasana | tidak ada.');
        else
          for (const [cue, bb, dur, sua] of t.rows) {
            const cm = cue.match(/^(\d+)\s*·\s*(.+)$/);
            const bm = bb.match(/^(\d+)(?:[–-](\d+))?$/);
            if (!cm || !bm) masalah.push(`Baris cue "${cue} | ${bb}" tidak sah.`);
            const nomor = cm ? +cm[1] : null;
            const i = mu.isi.findIndex((x) => x.trim() === `**Cue ${nomor}**`);
            const k = i >= 0 ? blokKodeSetelah(mu.isi, i) : null;
            let exclude = '';
            if (k) {
              const ex = mu.isi.slice(k.akhir + 1).find((x) => x.startsWith('Exclude Styles:'));
              exclude = ex ? ex.replace(/^Exclude Styles:\s*`?/, '').replace(/`\s*$/, '') : '';
            } else masalah.push(`Cue ${nomor} tanpa blok Style of Music.`);
            cueMusik.push({
              nomor,
              nama: cm ? cm[2].trim() : cue,
              babakAwal: bm ? +bm[1] : null,
              babakAkhir: bm ? +(bm[2] || bm[1]) : null,
              durasiTarget: dur,
              suasana: sua,
              style: k ? k.isi.trim() : '',
              exclude,
            });
          }
      } else masalah.push('### Musik (Suno) tidak ada.');
      const ef = bagian('Efek suara', 3);
      if (ef) {
        const t = tabelSetelah(ef.isi, /^\|\s*#\s*\|\s*Adegan\s*\|\s*Bunyi\s*\|\s*Kata kunci pustaka\s*\|\s*Prompt generator AI\s*\|/);
        if (!t) masalah.push('Tabel efek suara tidak memakai kolom persis.');
        else
          for (const [no, ad, bunyi, kunci, prompt] of t.rows) {
            if (!/^\d+$/.test(ad)) masalah.push(`SFX ${no}: kolom Adegan bukan satu nomor.`);
            sfx.push({ nomor: +no, adegan: +ad, bunyi, kataKunci: kunci, prompt });
          }
      } else masalah.push('### Efek suara tidak ada.');
      const h = b.isi.find((x) => x.startsWith('**Adegan hening:**'));
      if (h) {
        const v = h.replace('**Adegan hening:**', '').trim();
        adeganHening = v === '-' ? [] : v.split(',').map((s) => +s.trim());
      } else masalah.push('Baris **Adegan hening:** tidak ada.');
    }
  }
  const heningNaskah = adegan.filter((a) => a.hening).map((a) => a.nomor);
  if (heningNaskah.join(',') !== adeganHening.join(','))
    peringatan.push(`Adegan hening di naskah (${heningNaskah.join(', ') || '-'}) berbeda dari baris Adegan hening (${adeganHening.join(', ') || '-'}).`);
  const nomorBabak = [...new Set(adegan.map((a) => a.babak))];
  for (const n of nomorBabak) if (!cueMusik.some((c) => n >= c.babakAwal && n <= c.babakAkhir)) peringatan.push(`Babak ${n} tidak tercakup cue musik.`);

  // cocokkan Narasi lengkap
  const babakNarasi = {};
  for (const a of adegan) (babakNarasi[a.babak] ||= []).push(a);
  const normNL = (s) => s.replace(/\s+/g, ' ').trim();
  const hapusElipsisAkhir = (s) => s.replace(/\.\.\.$/, '').trim();
  if (Object.keys(narasiLengkap).length) {
    for (const n of nomorBabak) {
      const blok = narasiLengkap[n];
      if (blok == null) {
        peringatan.push(`Narasi lengkap: blok babak ${n} tidak ada.`);
        continue;
      }
      const par = blok.split(/\n\s*\n/).map((p) => hapusElipsisAkhir(normNL(p)));
      const harap = babakNarasi[n].map((a) => normNL(a.narasiSuara));
      if (par.length !== harap.length) peringatan.push(`Narasi lengkap babak ${n}: ${par.length} paragraf, naskah ${harap.length} adegan.`);
      harap.forEach((h, i) => {
        const p = par[i] ?? '';
        // paragraf ditambah "..." kecuali sudah berakhir elipsis; "kalimat." + "..." = "...." dianggap sama
        const sama = p === h || p === hapusElipsisAkhir(h) || p + '...' === h || p.replace(/\.$/, '') === h.replace(/\.$/, '');
        if (!sama) peringatan.push(`Narasi lengkap babak ${n}, adegan ${babakNarasi[n][i].nomor}: berbeda dari kolom Narasi.`);
      });
    }
  }
  const adaTag = adegan.some((a) => /\[[a-z][a-z ]*\]/.test(a.narasiSuara));
  if (adaTag && !/eleven v3/i.test(suara.model || 'Eleven v3')) peringatan.push('Ada tag suara tetapi model bukan Eleven v3; tag hanya bekerja di Eleven v3.');

  // ---------- kartu ulikan ----------
  let ulikan = null;
  {
    const b = bagian('Kartu Ulikan');
    if (b) {
      const t = b.isi.find((x) => x.startsWith('**Teks:**'));
      const s = b.isi.find((x) => x.startsWith('**Sumber:**'));
      if (!t || !s) masalah.push('Kartu Ulikan tidak memuat baris Teks dan Sumber.');
      else {
        ulikan = { teks: t.replace('**Teks:**', '').trim(), sumber: s.replace('**Sumber:**', '').trim() };
        ulikan.kata = hitungKata(ulikan.teks);
        ulikan.pertanyaan = /\?\s*$/.test(ulikan.teks);
        if (ulikan.kata > 17) masalah.push(`Teks kartu Ulikan ${ulikan.kata} kata (maks. ±15).`);
        else if (ulikan.kata > 15) peringatan.push(`Teks kartu Ulikan ${ulikan.kata} kata (sedikit di atas 15).`);
        if (!ulikan.pertanyaan && (!ulikan.sumber || ulikan.sumber === '-')) masalah.push('Kartu Ulikan berisi fakta tetapi Sumber kosong.');
        if (/\[[^\]]*\]/.test(ulikan.teks)) masalah.push('Tag suara di kartu Ulikan.');
      }
    }
  }

  // ---------- caption ----------
  const caption = [];
  {
    const b = bagian('Judul, caption, dan hashtag');
    if (b) {
      for (let i = 0; i < b.isi.length; i++) {
        const m = b.isi[i].match(/^### (.+)$/);
        if (!m) continue;
        let j = i + 1;
        const isi = [];
        while (j < b.isi.length && !/^### /.test(b.isi[j])) isi.push(b.isi[j++]);
        const blok = [];
        for (let k = 0; k < isi.length; k++)
          if (isi[k].startsWith('```')) {
            const e = isi.findIndex((x, n) => n > k && x.startsWith('```'));
            blok.push(isi.slice(k + 1, e).join('\n'));
            k = e;
          }
        if (blok.length !== 1) masalah.push(`Platform ${m[1]}: ${blok.length} blok kode caption (harus 1).`);
        const jl = isi.find((x) => x.startsWith('**Judul:**'));
        const judul = jl ? jl.replace('**Judul:**', '').trim() : ringkasan.Judul;
        if (!jl) penyesuaian.push(`Platform ${m[1]}: tanpa baris Judul; memakai Judul ringkasan.`);
        const bebas = isi.filter((x) => x.trim() && !x.startsWith('**Judul:**')).join('\n');
        const lainnya = bebas.split('```')[0].trim();
        if (/\[[a-z][a-z ]*\]/.test(judul + (blok[0] || ''))) masalah.push(`Platform ${m[1]}: tag suara di judul atau caption.`);
        caption.push({ platform: m[1].trim(), judul, catatan: lainnya, caption: blok[0] || '' });
      }
    }
  }
  if (lapisan.includes('Rekaan')) peringatan.push('Lapisan Rekaan: caption wajib menyebut bahwa kisahnya rekaan.');

  // ---------- pemetaan ----------
  let pemetaan = null;
  {
    const b = bagian('Pemetaan nomor adegan', 3);
    if (b) {
      const t = tabelSetelah(b.isi, /^\|\s*Lama\s*\|\s*Baru\s*\|/);
      if (t) pemetaan = t.rows.map(([l, br]) => ({ lama: l === '-' ? null : +l, baru: br === '-' ? null : +br }));
    }
  }

  // ---------- durasi ----------
  const totalKata = adegan.reduce((s, a) => s + a.kata, 0);
  const jedaBunyi = adegan.reduce(
    (s, a) => s + (a.narasiSuara.match(/\[(sighs|laughs|gasps|exhales|inhales|clears throat|pause|chuckles)\]/g) || []).length + (a.narasi.match(/\.\.\.|…/g) || []).length,
    0,
  );
  const perkiraan = (kpm) => {
    const narasi = (totalKata / kpm) * 60;
    const jeda = adegan.length * 0.9 + heningNaskah.length * 1.5 + jedaBunyi * 0.5;
    // merek = kartu Ulikan 3,5 dtk (pembuka dihapus Oktober 2026)
    return { narasi: +(narasi + jeda).toFixed(1), denganMerek: +(narasi + jeda + 3.5).toFixed(1) };
  };

  const hasil = {
    sumber,
    diurai: new Date().toISOString(),
    judulDokumen: judulDok,
    judul: ringkasan.Judul || '',
    slug,
    versi,
    lapisan,
    latar,
    durasiMaksDetik,
    durasiTargetDetik,
    rasio: ringkasan.Rasio || '',
    platform: ringkasan.Platform || '',
    posisiKamu: ringkasan['Posisi "kamu"'] || '',
    ringkasan,
    palet,
    penutupPrompt,
    namaBabak,
    adegan,
    lembarKarakter,
    promptAdegan,
    suara,
    narasiLengkap,
    cueMusik,
    sfx,
    adeganHening,
    ulikan,
    caption,
    pemetaan,
    peta,
    kebutuhanGeojson,
    statistik: {
      jumlahAdegan: adegan.length,
      jumlahBabak: nomorBabak.length,
      totalKata,
      kataPerBabak: Object.fromEntries(nomorBabak.map((n) => [n, babakNarasi[n].reduce((s, a) => s + a.kata, 0)])),
      karakterPerBabak: Object.fromEntries(
        nomorBabak.map((n) => [n, babakNarasi[n].map((a) => (/\.\.\.$/.test(a.narasiSuara) ? a.narasiSuara : a.narasiSuara + '...')).join('\n\n').length]),
      ),
      jedaBunyi,
      perkiraanDetik130: perkiraan(130),
      perkiraanDetik135: perkiraan(135),
    },
    validasi: { masalah, peringatan, penyesuaian },
  };
  return hasil;
}

const mmss = (d) => `${Math.floor(d / 60)}:${String(Math.round(d % 60)).padStart(2, '0')}`;

/** Ringkasan satu baris per hal, untuk CLI dan log. */
export function ringkas(hasil) {
  const { adegan, lembarKarakter, cueMusik, sfx, ulikan, statistik, validasi } = hasil;
  const p1 = statistik.perkiraanDetik135, p2 = statistik.perkiraanDetik130;
  return [
    `Slug ${hasil.slug} · ${hasil.versi} · lapisan ${hasil.lapisan.join(', ')}`,
    `${adegan.length} adegan, ${statistik.jumlahBabak} babak, ${statistik.totalKata} kata, ${lembarKarakter.length} lembar karakter, ${cueMusik.length} cue, ${sfx.length} SFX`,
    `Perkiraan narasi ${mmss(p1.narasi)}–${mmss(p2.narasi)}, dengan merek ${mmss(p1.denganMerek)}–${mmss(p2.denganMerek)} (maks. ${mmss(hasil.durasiMaksDetik)})`,
    `Kartu Ulikan: ${ulikan ? ulikan.kata + ' kata' : '-'}`,
    ...[['MASALAH', validasi.masalah], ['PERINGATAN', validasi.peringatan], ['PENYESUAIAN', validasi.penyesuaian]].flatMap(([j, d]) => [`${j}: ${d.length}`, ...d.map((x) => '  - ' + x)]),
  ];
}
