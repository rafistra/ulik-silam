// Siapkan data render carousel: CAROUSEL.md (urai-carousel) + berkas di $ASET_DIR/proyek/<slug>/.
// Jalur berkas dikembalikan relatif terhadap folder aset proyek (dipakai sebagai --public-dir Remotion).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { uraiCarousel } from '../urai-carousel/index.mjs';

export const AKAR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const GAMBAR = /\.(png|jpe?g|webp)$/i;
const dua = (n) => String(n).padStart(2, '0');

function env() {
  const hasil = {};
  const f = path.join(AKAR, '.env');
  if (fs.existsSync(f))
    for (const b of fs.readFileSync(f, 'utf8').split(/\r?\n/)) {
      const m = b.match(/^\s*([A-Z_]+)\s*=\s*(.*?)\s*$/);
      if (m) hasil[m[1]] = m[2].replace(/^"|"$/g, '');
    }
  return { ...hasil, ...process.env };
}
export function asetDir() {
  const a = env().ASET_DIR || 'aset';
  return path.isAbsolute(a) ? a : path.join(AKAR, a);
}
const daftar = (dir, re) => (fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => re.test(f)).sort() : []);
const cari = (akar, sub, nama) => {
  const f = daftar(path.join(akar, sub), new RegExp(`^${nama}\\.(png|jpe?g|webp)$`, 'i'))[0];
  return f ? `${sub}/${f}` : null;
};
const salin = (dari, ke) => {
  if (fs.existsSync(dari) && !fs.existsSync(ke)) {
    fs.mkdirSync(path.dirname(ke), { recursive: true });
    fs.copyFileSync(dari, ke);
  }
};

/**
 * @param {string} slug
 * @param {{ salinBerkas?: boolean }} opsi salinBerkas: salin font, logo, dan ilustrasi pakai ulang ke folder aset proyek (default true)
 */
export function siapkanCarousel(slug, { salinBerkas = true } = {}) {
  const file = path.join(AKAR, 'proyek', slug, 'CAROUSEL.md');
  if (!fs.existsSync(file)) throw new Error(`CAROUSEL.md tidak ada di proyek/${slug}/`);
  const c = uraiCarousel(fs.readFileSync(file, 'utf8'));
  const akar = path.join(asetDir(), 'proyek', slug);
  const lokasi = { aset: akar, render: path.join(akar, 'render'), cache: path.join(akar, '_cache') };

  if (salinBerkas) {
    const font = path.join(AKAR, 'merek', 'font');
    for (const f of daftar(font, /\.woff2$/)) salin(path.join(font, f), path.join(akar, 'font', f));
    for (const f of ['mata-nyala.svg', 'wordmark-krem.svg']) salin(path.join(AKAR, 'merek', 'logo', f), path.join(akar, 'merek', f));
  }

  const aset = {};
  const kurang = { ilustrasi: [], foto: [], merek: [] };
  for (const s of c.slide) {
    const src = s.sumber;
    const nn = dua(s.nomor);
    let ilustrasi = cari(akar, 'ilustrasi', `slide-${nn}`);
    let berkasIlustrasi = null;
    if (src.jenis === 'baru') berkasIlustrasi = `ilustrasi/slide-${nn}.png`;
    else if (src.jenis === 'pakai-ulang' && src.slide) ilustrasi ||= cari(akar, 'ilustrasi', `slide-${dua(src.slide)}`);
    else if (!ilustrasi && (src.jenis === 'pakai-ulang' || src.jenis === 'pustaka')) {
      // berkas dari proyek video atau pustaka disalin ke ilustrasi/slide-XX agar ikut --public-dir
      let asal = null;
      if (src.video) {
        const d = path.join(asetDir(), 'proyek', src.video.slug, 'ilustrasi');
        const f = daftar(d, new RegExp(`^adegan-${dua(src.video.adegan)}\\.(png|jpe?g|webp)$`, 'i'))[0];
        if (f) asal = path.join(d, f);
      } else if (src.pustaka) {
        const d = path.join(asetDir(), 'pustaka', src.pustaka.jenis, src.pustaka.id);
        const f = daftar(d, GAMBAR)[0];
        if (f) asal = path.join(d, f);
      }
      berkasIlustrasi = `ilustrasi/slide-${nn}.png`;
      if (asal && salinBerkas) {
        const ke = path.join(akar, 'ilustrasi', `slide-${nn}${path.extname(asal).toLowerCase()}`);
        salin(asal, ke);
        ilustrasi = `ilustrasi/${path.basename(ke)}`;
      }
    }
    const perluArsip = !!(s.foto || src.jenis === 'arsip');
    const arsip = perluArsip ? cari(akar, 'arsip', `slide-${nn}`) : null;
    aset[s.nomor] = { ilustrasi, berkasIlustrasi, arsip, berkasArsip: perluArsip ? `arsip/slide-${nn}.png` : null };
    if (berkasIlustrasi && !ilustrasi) kurang.ilustrasi.push(berkasIlustrasi);
    if (src.jenis === 'pakai-ulang' && src.slide && !ilustrasi) kurang.ilustrasi.push(`ilustrasi/slide-${dua(src.slide)} (dipakai ulang slide ${s.nomor})`);
    if (perluArsip && !arsip) kurang.foto.push(`arsip/slide-${nn}`);
  }
  for (const f of ['merek/mata-nyala.svg', 'merek/wordmark-krem.svg']) if (!fs.existsSync(path.join(akar, f)) && !fs.existsSync(path.join(AKAR, 'merek', 'logo', path.basename(f)))) kurang.merek.push(f);

  const lisensiBelum = c.slide.filter((s) => s.foto?.lisensi === 'Belum dicek' || (s.sumber.jenis === 'arsip' && s.sumber.lisensi === 'Belum dicek')).map((s) => s.nomor);
  const isianCaption = c.caption.filter((x) => /\[diisi/.test(x.caption)).map((x) => x.platform);
  return { data: { carousel: c, aset }, kurang, lisensiBelum, isianCaption, masalah: c.validasi.masalah, peringatan: c.validasi.peringatan, lokasi };
}
