// Prompt Google Flow (Nano Banana) dari hasil uraiKonsep. Turunan murni dari KONSEP.md: tidak disimpan.
// Rujukan "the <Tokoh> reference image" di prompt Gemini diganti aset Flow "@<NamaAset>".

/** Nama aset Flow untuk satu tokoh: huruf dan angka saja, tiap kata diawali kapital ("Penebang Tebu" → "PenebangTebu"). */
export function namaAsetFlow(nama) {
  return nama
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean)
    .map((k) => k[0].toUpperCase() + k.slice(1))
    .join('');
}

const lolos = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Ganti rujukan lembar karakter di satu prompt; kembalikan teks baru dan aset yang dipakai (urut kemunculan). */
export function ubahKeFlow(prompt, namaTokoh) {
  const urut = [...namaTokoh].sort((a, b) => b.length - a.length);
  const dipakai = [];
  let teks = prompt;
  for (const nama of urut) {
    const aset = '@' + namaAsetFlow(nama);
    const pola = new RegExp(`\\bthe (?:uploaded )?${lolos(nama)} reference (?:image|sheet)\\b`, 'gi');
    if (pola.test(teks)) {
      teks = teks.replace(pola, aset);
      dipakai.push(aset);
    }
  }
  // urutkan menurut kemunculan pertama di teks
  dipakai.sort((a, b) => teks.indexOf(a) - teks.indexOf(b));
  return { teks, aset: dipakai };
}

const dua = (n) => String(n).padStart(2, '0');

/** Batas adegan per batch di Google Flow. */
export const MAKS_ADEGAN_FLOW = 12;

/**
 * Bagi adegan menjadi batch berisi paling banyak `maks` adegan, sama rata, dan bila bisa dipotong di batas babak.
 * @param {{nomor:number}[]} adegan  urut menurut nomor
 * @param {Record<number, number|string>} babakDari  nomor adegan → babak
 */
export function bagiBatch(adegan, babakDari = {}, maks = MAKS_ADEGAN_FLOW) {
  const n = adegan.length;
  const k = Math.max(1, Math.ceil(n / maks));
  const hasil = [];
  let mulai = 0;
  for (let i = 1; i < k; i++) {
    const sisaBatch = k - i + 1;
    const target = mulai + Math.round((n - mulai) / sisaBatch);
    // calon potongan: indeks j (batch berakhir sebelum j) yang menjaga batch ini dan sisanya ≤ maks
    const sah = (j) => j - mulai >= 1 && j - mulai <= maks && n - j <= maks * (k - i);
    let pilih = target;
    for (let d = 0; d <= 3; d++) {
      const cocok = [target - d, target + d].find((j) => sah(j) && j < n && babakDari[adegan[j].nomor] !== babakDari[adegan[j - 1].nomor]);
      if (cocok != null) {
        pilih = cocok;
        break;
      }
    }
    if (!sah(pilih)) pilih = Math.min(mulai + maks, n);
    hasil.push(adegan.slice(mulai, pilih));
    mulai = pilih;
  }
  hasil.push(adegan.slice(mulai));
  return hasil;
}

/**
 * Prompt Flow per adegan dan teks batch siap tempel (paling banyak 12 adegan per batch).
 * rujukanLain = prompt masih merujuk gambar acuan yang bukan lembar karakter konsep ini (misalnya tokoh dari part lain); pasang gambarnya manual.
 * @returns {{ aset: {nama:string, aset:string}[], adegan: {nomor:number, aset:string[], teks:string, rujukanLain:boolean}[], batch: {ke:number, dari:number, sampai:number, jumlah:number, teks:string}[] }}
 */
export function promptFlow(hasil, { judul, maks = MAKS_ADEGAN_FLOW } = {}) {
  const namaTokoh = (hasil.lembarKarakter || []).map((l) => l.nama);
  const aset = namaTokoh.map((nama) => ({ nama, aset: namaAsetFlow(nama) }));
  const adegan = Object.entries(hasil.promptAdegan || {})
    .map(([n, p]) => ({ nomor: +n, ...ubahKeFlow(p.prompt, namaTokoh) }))
    .sort((a, b) => a.nomor - b.nomor)
    .map(({ nomor, teks, aset: a }) => ({ nomor, aset: a, teks, rujukanLain: /reference (?:image|sheet)/i.test(teks) }));
  const babakDari = Object.fromEntries((hasil.adegan || []).map((a) => [a.nomor, a.babak]));
  const nama = judul || hasil.judul || hasil.slug;
  const bagian = bagiBatch(adegan, babakDari, maks);
  const batch = bagian.map((isi, i) => {
    const asetBatch = [...new Set(isi.flatMap((a) => a.aset))];
    const dari = isi[0].nomor;
    const sampai = isi[isi.length - 1].nomor;
    const kepala = [
      bagian.length > 1 ? `Batch ${i + 1} of ${bagian.length} (scenes ${dari} to ${sampai}).` : null,
      `Create one image for each of the ${isi.length} scene prompts below, in order, with Nano Banana Pro at a 9:16 vertical aspect ratio, 2 results per scene.`,
      asetBatch.length
        ? `Use the project assets named in each prompt (${asetBatch.join(', ')}) as character references exactly as each prompt describes; a scene that names no asset uses none.`
        : 'No character assets are needed.',
      'Do not shorten, merge or rewrite the prompts, and do not skip any scene.',
      `Name the results "Adegan ${dua(dari)}" to "Adegan ${dua(sampai)}" using the scene numbers below, and put them in a collection named "${nama} - Adegan".`,
      '',
      'Scene prompts:',
    ]
      .filter((b) => b != null)
      .join('\n');
    const badan = isi.map((a) => `Adegan ${dua(a.nomor)}${a.aset.length ? ` (assets: ${a.aset.join(', ')})` : ''}\n"""\n${a.teks}\n"""`).join('\n\n');
    return { ke: i + 1, dari, sampai, jumlah: isi.length, teks: `${kepala}\n\n${badan}\n` };
  });
  return { aset, adegan, batch };
}
