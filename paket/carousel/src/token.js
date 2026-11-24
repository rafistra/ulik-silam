// Warna dan keluarga huruf carousel diambil dari merek/tokens.json (tema Malam), bukan ditulis ulang di sini.
import tokens from '../../../merek/tokens.json';

const daftar = tokens.color.tokens;
const nilai = (nama) => {
  const t = daftar.find((x) => x.name === nama);
  if (!t) return undefined;
  const v = typeof t.value === 'object' ? t.value.malam : t.value;
  const ref = typeof v === 'string' && v.match(/^\{(.+)\}$/);
  return ref ? nilai(ref[1]) : v;
};

/** Variabel CSS untuk akar slide (--c-latar, --c-pelita, ...). */
export const VAR_WARNA = Object.fromEntries(daftar.map((t) => [`--c-${t.name}`, nilai(t.name)]));
export const HURUF = { serif: tokens.type.families.serif, sans: tokens.type.families.sans };
export const WARNA_LAPISAN = { Sejarah: 'var(--c-lapis-sejarah)', Legenda: 'var(--c-lapis-legenda)', Mitos: 'var(--c-lapis-mitos)', Rekaan: 'var(--c-lapis-rekaan)' };
