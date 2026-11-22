// Daftar skrip repo yang boleh dijalankan dari halaman Alat di katalog, dan penjalannya.
// Hanya skrip di daftar ini yang bisa dijalankan; setiap argumen diperiksa menurut jenisnya.
import fs from 'node:fs';
import { spawn, spawnSync } from 'node:child_process';

/**
 * Jenis isian:
 * - proyek: slug proyek yang ada (wajib kecuali `opsional`)
 * - pilihan: salah satu dari `pilihan`
 * - teks: teks bebas satu baris, dicocokkan dengan `pola`
 * - berkas / folder: path yang harus ada di komputer ini
 * Alat dengan `tulis: true` punya dua tombol: Pratinjau (tanpa --tulis) dan Jalankan (dengan --tulis).
 */
export const DAFTAR_ALAT = [
  {
    id: 'cek-aset',
    kelompok: 'Produksi',
    judul: 'Periksa aset proyek',
    keterangan: 'Daftar ilustrasi, narasi, musik, SFX, dan berkas peta yang belum ada, dengan nama berkas yang diharapkan.',
    isian: [{ nama: 'slug', label: 'Proyek', jenis: 'proyek' }],
    perintah: (v) => ['node', 'paket/video/render.mjs', v.slug, '--cek'],
  },
  {
    id: 'potong',
    kelompok: 'Produksi',
    judul: 'Potong narasi',
    keterangan:
      'Memotong rekaman per babak (narasi/babak-N) menjadi potongan per adegan. Titik potong dari narasi/babak-N.waktu.json bila ada, selain itu dari jeda terpanjang. Potongan yang ditandai MENYIMPANG perlu didengarkan.',
    isian: [
      { nama: 'slug', label: 'Proyek', jenis: 'proyek' },
      { nama: 'babak', label: 'Babak (kosong = semua)', jenis: 'teks', pola: '^(\\d+(\\s+\\d+)*)?$', opsional: true, contoh: '1 3' },
    ],
    perintah: (v) => ['node', 'paket/video/alat.mjs', 'potong', v.slug, ...(v.babak ? v.babak.split(/\s+/) : [])],
  },
  {
    id: 'peta-dasar',
    kelompok: 'Produksi',
    judul: 'Data peta dasar',
    keterangan: 'Menyiapkan data Natural Earth untuk adegan peta animasi.',
    isian: [{ nama: 'slug', label: 'Proyek', jenis: 'proyek' }],
    perintah: (v) => ['node', 'paket/video/alat.mjs', 'peta-dasar', v.slug],
  },
  {
    id: 'peta-warna',
    kelompok: 'Produksi',
    judul: 'Warna peta',
    keterangan: 'Menghitung palet peta dari ilustrasi adegan di sekitarnya. Jalankan setelah ilustrasi asli ada.',
    isian: [{ nama: 'slug', label: 'Proyek', jenis: 'proyek' }],
    perintah: (v) => ['node', 'paket/video/alat.mjs', 'peta-warna', v.slug],
  },
  {
    id: 'panen',
    kelompok: 'Pustaka',
    judul: 'Panen ke pustaka',
    keterangan:
      'Membuat kartu draf tokoh, musik, dan SFX dari proyek. Berkas yang disalin dari pustaka dicatat sebagai pakai ulang. Setujui kartunya di halaman Pustaka, lalu jalankan Salin berkas pustaka.',
    tulis: true,
    isian: [{ nama: 'slug', label: 'Proyek', jenis: 'proyek' }],
    perintah: (v) => ['python', 'scripts/panen-pustaka.py', v.slug, ...(v.tulis ? ['--tulis'] : [])],
  },
  {
    id: 'salin-pustaka',
    kelompok: 'Pustaka',
    judul: 'Salin berkas pustaka',
    keterangan: 'Menyalin berkas kartu pustaka dari folder aset proyek asalnya ke aset/pustaka/. Berkas yang sudah ada tidak ditimpa.',
    tulis: true,
    isian: [{ nama: 'status', label: 'Kartu', jenis: 'pilihan', pilihan: [['disetujui', 'Hanya yang disetujui'], ['', 'Semua kartu']] }],
    perintah: (v) => ['python', 'scripts/salin-pustaka.py', ...(v.status ? ['--status', v.status] : []), ...(v.tulis ? ['--tulis'] : [])],
  },
  {
    id: 'impor-metrik',
    kelompok: 'Data',
    judul: 'Impor metrik penonton',
    keterangan: 'Mencocokkan ekspor TikTok Studio dan YouTube Studio dengan proyek, lalu mengisi tayang, tautan, dan metrik di proyek.yaml.',
    tulis: true,
    isian: [
      { nama: 'youtube', label: 'YouTube: Table data.csv', jenis: 'berkas', opsional: true },
      { nama: 'tiktok', label: 'TikTok: Content.csv', jenis: 'berkas', opsional: true },
      { nama: 'tiktokStudio', label: 'TikTok Studio: daftar.tsv', jenis: 'berkas', opsional: true },
      { nama: 'periode', label: 'Periode YouTube', jenis: 'teks', pola: '^(\\d{4}-\\d{2}-\\d{2}\\.\\.\\d{4}-\\d{2}-\\d{2})?$', opsional: true, contoh: '2026-10-24..2026-11-21' },
    ],
    perintah: (v) => [
      'python',
      'scripts/impor-metrik.py',
      ...(v.youtube ? ['--youtube', v.youtube] : []),
      ...(v.tiktok ? ['--tiktok', v.tiktok] : []),
      ...(v.tiktokStudio ? ['--tiktok-studio', v.tiktokStudio] : []),
      ...(v.periode ? ['--periode-yt', v.periode] : []),
      ...(v.tulis ? ['--tulis'] : []),
    ],
    syarat: (v) => (v.youtube || v.tiktok || v.tiktokStudio ? null : 'Isi minimal satu berkas ekspor.'),
  },
  {
    id: 'impor-ide',
    kelompok: 'Data',
    judul: 'Impor bank ide',
    keterangan: 'Memasukkan KONSEP.md yang belum diproduksi dari sebuah folder ke proyek/<slug>/ dengan tahap Naskah terverifikasi. Proyek yang sudah ada dilewati; folder sumber tidak diubah.',
    tulis: true,
    isian: [
      { nama: 'folder', label: 'Folder ide', jenis: 'folder' },
      { nama: 'prioritas', label: 'Urutan prioritas (slug, dipisah koma)', jenis: 'teks', pola: '^[a-z0-9-]+(\\s*,\\s*[a-z0-9-]+)*$', opsional: true },
    ],
    perintah: (v) => ['python', 'scripts/impor-ide.py', v.folder, ...(v.prioritas ? ['--prioritas', v.prioritas.replace(/\s+/g, '')] : []), ...(v.tulis ? ['--tulis'] : [])],
  },
  {
    id: 'urai-semua',
    kelompok: 'Data',
    judul: 'Validasi semua KONSEP.md',
    keterangan: 'Mengurai setiap proyek/<slug>/KONSEP.md dan melaporkan masalah kontrak serta peringatan.',
    isian: [],
    perintah: () => ['node', 'paket/urai-konsep/cli.mjs', '--semua'],
  },
  {
    id: 'buat-status',
    kelompok: 'Data',
    judul: 'Perbarui STATUS.md',
    keterangan: 'Membuat ulang STATUS.md dari semua proyek.yaml. Biasanya otomatis setiap tahap diubah di Papan.',
    isian: [],
    perintah: () => ['python', 'scripts/buat-status.py'],
  },
];

let python = null;
function cariPython() {
  if (python) return python;
  for (const py of ['python3', 'python', 'py']) {
    const r = spawnSync(py, ['--version'], { encoding: 'utf8' });
    if (r.status === 0) return (python = py);
  }
  throw new Error('Python tidak ditemukan di komputer ini.');
}

/** Periksa isian dan susun argumen. Melempar galat berbahasa Indonesia bila ada yang tidak sah. */
export function susunPerintah(alat, masukan, { slugProyek }) {
  const v = { tulis: !!(alat.tulis && masukan.tulis) };
  for (const i of alat.isian) {
    if (i.jenis === 'pilihan') {
      const x = typeof masukan[i.nama] === 'string' ? masukan[i.nama] : i.pilihan[0][0];
      if (!i.pilihan.some(([nilai]) => nilai === x)) throw new Error(`Pilihan ${i.label} tidak dikenal.`);
      v[i.nama] = x;
      continue;
    }
    let x = typeof masukan[i.nama] === 'string' ? masukan[i.nama].trim() : '';
    if (!x) {
      if (!i.opsional) throw new Error(`${i.label} wajib diisi.`);
      v[i.nama] = '';
      continue;
    }
    if (/[\r\n\0]/.test(x)) throw new Error(`${i.label} tidak boleh berisi baris baru.`);
    if (i.jenis === 'proyek' && !slugProyek().includes(x)) throw new Error(`Proyek ${x} tidak ditemukan.`);
    if (i.jenis === 'teks' && i.pola && !new RegExp(i.pola).test(x)) throw new Error(`Format ${i.label} tidak sesuai${i.contoh ? ` (contoh: ${i.contoh})` : ''}.`);
    if (i.jenis === 'berkas' || i.jenis === 'folder') {
      x = x.replace(/^"(.*)"$/, '$1');
      if (!fs.existsSync(x)) throw new Error(`${i.label}: ${x} tidak ditemukan.`);
      if (i.jenis === 'berkas' && !fs.statSync(x).isFile()) throw new Error(`${i.label} harus berupa berkas.`);
      if (i.jenis === 'folder' && !fs.statSync(x).isDirectory()) throw new Error(`${i.label} harus berupa folder.`);
    }
    v[i.nama] = x;
  }
  const galat = alat.syarat?.(v);
  if (galat) throw new Error(galat);
  const [prog, ...args] = alat.perintah(v);
  return { prog: prog === 'python' ? cariPython() : prog === 'node' ? process.execPath : prog, args, tulis: v.tulis, nilai: v };
}

/** Penjalan tugas alat: satu tugas berjalan per alat, keluaran disiarkan baris per baris. */
export function buatPenjalan({ akar, siarkan, slugProyek, sesudah }) {
  const tugas = new Map(); // id alat -> tugas terakhir
  let nomor = 0;
  const jalankan = (id, masukan) => {
    const alat = DAFTAR_ALAT.find((a) => a.id === id);
    if (!alat) throw new Error('Alat tidak dikenal.');
    const ada = tugas.get(id);
    if (ada && ada.status === 'jalan') throw new Error('Alat ini masih berjalan.');
    const { prog, args, tulis, nilai } = susunPerintah(alat, masukan || {}, { slugProyek });
    const t = {
      no: ++nomor,
      id,
      judul: alat.judul,
      tulis,
      nilai,
      perintah: [prog === process.execPath ? 'node' : prog, ...args].map((a) => (/\s/.test(a) ? `"${a}"` : a)).join(' '),
      status: 'jalan',
      mulai: Date.now(),
      selesai: null,
      kode: null,
      keluaran: [],
    };
    tugas.set(id, t);
    const tambah = (teks) => {
      for (const b of teks.replace(/\r(?!\n)/g, '\n').split(/\r?\n/)) {
        if (!b && !t.keluaran.length) continue;
        t.keluaran.push(b);
      }
      if (t.keluaran.length > 3000) t.keluaran.splice(0, t.keluaran.length - 3000);
      siarkan('alat', { id, no: t.no, status: t.status, keluaran: t.keluaran.slice(-400) });
    };
    let p;
    try {
      p = spawn(prog, args, { cwd: akar, env: { ...process.env, PYTHONIOENCODING: 'utf-8', PYTHONUNBUFFERED: '1', FORCE_COLOR: '0' } });
    } catch (e) {
      t.status = 'gagal';
      tambah(e.message);
      return t;
    }
    p.stdout.on('data', (b) => tambah(b.toString()));
    p.stderr.on('data', (b) => tambah(b.toString()));
    p.on('error', (e) => tambah(`Galat: ${e.message}`));
    p.on('close', (kode) => {
      t.kode = kode;
      t.status = kode === 0 ? 'selesai' : 'gagal';
      t.selesai = Date.now();
      sesudah?.(t);
      siarkan('alat', { id, no: t.no, status: t.status, kode, keluaran: t.keluaran.slice(-400) });
    });
    return t;
  };
  return { tugas, jalankan };
}

/** Skema alat untuk halaman (tanpa fungsi). */
export function skemaAlat() {
  return DAFTAR_ALAT.map(({ perintah, syarat, ...a }) => a);
}

