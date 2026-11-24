// Plugin Vite: API katalog, berkas media (dengan Range), dan kabar perubahan (SSE).
import fs from 'node:fs';
import path from 'node:path';
import { spawn, spawnSync } from 'node:child_process';
import * as data from './data.mjs';
import { buatPenjalan, skemaAlat } from './alat.mjs';
import { siapkan } from '../../../paket/video/siapkan.mjs';

const RENDER = path.join(data.AKAR, 'paket', 'video', 'render.mjs');
const RENDER_CAROUSEL = path.join(data.AKAR, 'paket', 'carousel', 'render.mjs');

/** Awalan URL /media untuk folder aset proyek yang dipakai komposisi. */
function basisMedia(slug, folder) {
  const rel = path.relative(data.asetDir(), folder);
  if (!rel.startsWith('..') && !path.isAbsolute(rel)) return '/media/aset/' + rel.split(path.sep).map(encodeURIComponent).join('/');
  return `/media/arsip/${encodeURIComponent(slug)}/public`;
}

const MIME = {
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml',
  '.mp3': 'audio/mpeg', '.wav': 'audio/wav', '.m4a': 'audio/mp4', '.aac': 'audio/aac', '.ogg': 'audio/ogg', '.flac': 'audio/flac', '.opus': 'audio/ogg',
  '.mp4': 'video/mp4', '.mov': 'video/quicktime', '.webm': 'video/webm', '.woff2': 'font/woff2', '.json': 'application/json',
};

function kirimJson(res, kode, isi) {
  res.statusCode = kode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(isi));
}

function bacaBody(req) {
  return new Promise((ok, gagal) => {
    let b = '';
    req.on('data', (c) => (b += c));
    req.on('end', () => {
      try {
        ok(b ? JSON.parse(b) : {});
      } catch (e) {
        gagal(e);
      }
    });
  });
}

function kirimBerkas(req, res, file) {
  if (!file || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
    res.statusCode = 404;
    return res.end('Tidak ditemukan');
  }
  const st = fs.statSync(file);
  const tipe = MIME[path.extname(file).toLowerCase()] || 'application/octet-stream';
  res.setHeader('Content-Type', tipe);
  res.setHeader('Accept-Ranges', 'bytes');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Last-Modified', new Date(st.mtimeMs).toUTCString());
  const range = req.headers.range && req.headers.range.match(/bytes=(\d*)-(\d*)/);
  if (range) {
    const awal = range[1] ? +range[1] : 0;
    const akhir = range[2] ? Math.min(+range[2], st.size - 1) : st.size - 1;
    if (awal >= st.size) {
      res.statusCode = 416;
      res.setHeader('Content-Range', `bytes */${st.size}`);
      return res.end();
    }
    res.statusCode = 206;
    res.setHeader('Content-Range', `bytes ${awal}-${akhir}/${st.size}`);
    res.setHeader('Content-Length', akhir - awal + 1);
    return fs.createReadStream(file, { start: awal, end: akhir }).pipe(res);
  }
  res.setHeader('Content-Length', st.size);
  fs.createReadStream(file).pipe(res);
}

/**
 * Hentikan semua Remotion Studio yang masih berjalan (dibuka dari katalog, terminal, atau sesi lain), agar port 3000
 * bebas untuk Studio proyek yang diminta. Hanya proses node yang baris perintahnya memuat `remotion ... studio` atau
 * `render.mjs ... --studio`; server katalog sendiri tidak tersentuh. Mengembalikan jumlah proses yang dihentikan.
 */
function hentikanStudio() {
  if (process.platform === 'win32') {
    const ps =
      "Get-CimInstance Win32_Process -Filter \"Name='node.exe'\" | " +
      "Where-Object { ($_.CommandLine -match 'remotion' -and $_.CommandLine -match '\\sstudio\\s') -or $_.CommandLine -match 'render\\.mjs\\s.*--studio' } | " +
      'ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue; $_.ProcessId }';
    const r = spawnSync('powershell', ['-NoProfile', '-Command', ps], { encoding: 'utf8' });
    return (r.stdout || '').split(/\s+/).filter(Boolean).length;
  }
  const r = spawnSync('pgrep', ['-f', 'remotion.* studio |render\\.mjs .*--studio'], { encoding: 'utf8' });
  const pid = (r.stdout || '').split(/\s+/).filter(Boolean);
  for (const p of pid) spawnSync('kill', ['-9', p]);
  return pid.length;
}

export default function katalogPlugin() {
  const pendengar = new Set();
  const tugas = new Map(); // slug -> { jenis, status, selesai, total, pesan, keluar, log }
  const siarkan = (peristiwa, isi) => {
    for (const res of pendengar) res.write(`event: ${peristiwa}\ndata: ${JSON.stringify(isi)}\n\n`);
  };
  const mulaiRender = (slug, jenis) => {
    const ada = tugas.get(slug);
    if (ada && ada.status === 'jalan') throw new Error('Render proyek ini masih berjalan.');
    const t = { slug, jenis, status: 'jalan', selesai: 0, total: 0, pesan: 'Menyiapkan...', keluar: null, log: [], mulai: Date.now() };
    tugas.set(slug, t);
    const args = jenis.startsWith('carousel')
      ? [RENDER_CAROUSEL, slug, '--json', ...(jenis === 'carousel-draf' ? ['--draf'] : [])]
      : [RENDER, slug, '--json', ...(jenis === 'sampul' ? ['--sampul'] : jenis.startsWith('sampul-') ? [`--sampul=${jenis.slice(7)}`] : [])];
    const p = spawn(process.execPath, args, { cwd: data.AKAR });
    let sisa = '';
    p.stdout.on('data', (b) => {
      sisa += b.toString();
      const baris = sisa.split(/\r?\n/);
      sisa = baris.pop();
      for (const l of baris) {
        let x;
        try {
          x = JSON.parse(l);
        } catch {
          continue;
        }
        if (x.jenis === 'progres') Object.assign(t, { selesai: x.selesai, total: x.total, pesan: `Render ${x.selesai}/${x.total} ${jenis.startsWith('carousel') ? 'gambar' : 'frame'}` });
        else if (x.pesan) {
          t.pesan = x.pesan;
          t.log.push(x.pesan);
        }
        if (x.keluar) t.keluar = x.keluar;
        siarkan('render', t);
      }
    });
    p.stderr.on('data', (b) => t.log.push(b.toString().slice(0, 500)));
    p.on('close', (kode) => {
      t.status = kode === 0 ? 'selesai' : 'gagal';
      if (kode !== 0 && !/gagal/i.test(t.pesan)) t.pesan = `Render gagal (kode ${kode}). ${t.log.slice(-2).join(' ')}`;
      siarkan('render', t);
    });
    return t;
  };
  const alat = buatPenjalan({ akar: data.AKAR, siarkan, slugProyek: data.slugProyek, sesudah: () => data.bersihkanSimpanan() });
  let tunda = null;
  const kabari = (berkas) => {
    // Berkas simpanan dan render yang sedang ditulis tidak perlu memuat ulang halaman; kabar render dikirim terpisah.
    if (/_cache/.test(berkas) || (/[\\/]render[\\/]/.test(berkas) && [...tugas.values()].some((t) => t.status === 'jalan'))) return;
    data.bersihkanSimpanan();
    clearTimeout(tunda);
    tunda = setTimeout(() => {
      for (const res of pendengar) res.write(`event: ubah\ndata: ${JSON.stringify({ berkas })}\n\n`);
    }, 400);
  };
  const pengamat = [];

  return {
    name: 'katalog-ulik-silam',
    configureServer(server) {
      for (const dir of data.folderPantau()) {
        try {
          pengamat.push(fs.watch(dir, { recursive: true }, (_, f) => kabari(f ? path.join(path.basename(dir), String(f)) : dir)));
        } catch (e) {
          console.warn(`Tidak bisa memantau ${dir}: ${e.message}`);
        }
      }
      server.httpServer?.on('close', () => pengamat.forEach((w) => w.close()));

      server.middlewares.use(async (req, res, lanjut) => {
        const url = new URL(req.url, 'http://lokal');
        const p = url.pathname;
        try {
          if (p.startsWith('/media/')) return kirimBerkas(req, res, data.pathMedia(p));
          if (!p.startsWith('/api/')) return lanjut();

          if (p === '/api/peristiwa') {
            res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive' });
            res.write('retry: 2000\n\n');
            pendengar.add(res);
            const detak = setInterval(() => res.write(': detak\n\n'), 25000);
            req.on('close', () => {
              clearInterval(detak);
              pendengar.delete(res);
            });
            return;
          }
          if (p === '/api/info' && req.method === 'GET') {
            return kirimJson(res, 200, { tahap: data.TAHAP, batas: data.BATAS, asetDir: data.asetDir(), akar: data.AKAR });
          }
          if (p === '/api/proyek' && req.method === 'GET') return kirimJson(res, 200, data.daftarProyek());
          if (p === '/api/pustaka' && req.method === 'GET') return kirimJson(res, 200, data.pustaka());
          if (p === '/api/merek' && req.method === 'GET') return kirimJson(res, 200, data.merek());

          if (p === '/api/render' && req.method === 'GET') return kirimJson(res, 200, [...tugas.values()]);
          if (p === '/api/alat' && req.method === 'GET') return kirimJson(res, 200, { daftar: skemaAlat(), tugas: Object.fromEntries(alat.tugas) });
          const ma = p.match(/^\/api\/alat\/([a-z0-9-]+)$/);
          if (ma && req.method === 'POST') {
            try {
              const t = alat.jalankan(ma[1], await bacaBody(req));
              return kirimJson(res, 200, t);
            } catch (e) {
              return kirimJson(res, 400, { galat: e.message });
            }
          }
          let m = p.match(/^\/api\/proyek\/([a-z0-9-]+)\/(video|render|studio)$/);
          if (m && m[2] === 'video' && req.method === 'GET') {
            const r = siapkan(m[1], { basisFont: '/media/merek/font' });
            r.data.basis = basisMedia(m[1], r.lokasi.aset);
            return kirimJson(res, 200, { data: r.data, kurang: r.kurang, peringatan: r.peringatan });
          }
          if (m && m[2] === 'render' && req.method === 'POST') {
            const body = await bacaBody(req);
            const jenis = ['sampul', 'sampul-tiktok', 'sampul-youtube', 'carousel', 'carousel-draf'].includes(body.jenis) ? body.jenis : 'video';
            return kirimJson(res, 200, mulaiRender(m[1], jenis));
          }
          if (m && m[2] === 'studio' && req.method === 'POST') {
            // Studio lama (proyek lain, terminal, atau sesi lain) menahan port 3000; tanpa dihentikan, Studio baru gagal diam-diam.
            const lama = hentikanStudio();
            // Keluaran Studio disimpan agar galatnya bisa dibaca bila Studio tidak terbuka.
            const log = path.join(data.asetDir(), '_cache', m[1], 'studio.log');
            fs.mkdirSync(path.dirname(log), { recursive: true });
            const fd = fs.openSync(log, 'w');
            const s = spawn(process.execPath, [RENDER, m[1], '--studio'], { cwd: data.AKAR, detached: true, stdio: ['ignore', fd, fd] });
            s.unref();
            fs.closeSync(fd);
            return kirimJson(res, 200, {
              ok: true,
              pesan: `Remotion Studio dibuka di jendela browser baru (port 3000)${lama ? `; ${lama} proses Studio lama dihentikan` : ''}. Log: ${path.relative(data.AKAR, log)}`,
            });
          }
          m = p.match(/^\/api\/proyek\/([a-z0-9-]+)$/);
          if (m && req.method === 'GET') {
            const d = data.detailProyek(m[1]);
            return d ? kirimJson(res, 200, d) : kirimJson(res, 404, { galat: 'Proyek tidak ditemukan' });
          }
          if (m && req.method === 'PATCH') {
            const body = await bacaBody(req);
            const boleh = {
              tahap: (v) => data.TAHAP.includes(v),
              prioritas: (v) => v === null || Number.isInteger(v),
              catatan: (v) => typeof v === 'string',
              // pilihan sampul: adegan (nomor atau "khusus" untuk ilustrasi/sampul.*), judul di layar sampul, dan posisi gambar
              // per platform (tiktok/youtube: {x, y, skala} angka; dijepit saat dibaca); null = bawaan
              sampul: (v) =>
                v === null ||
                (typeof v === 'object' &&
                  Object.keys(v).every((k) => ['adegan', 'judul', 'tiktok', 'youtube'].includes(k)) &&
                  ['tiktok', 'youtube'].every((pl) => v[pl] == null || (typeof v[pl] === 'object' && ['x', 'y', 'skala'].every((k) => Number.isFinite(v[pl][k])))) &&
                  (v.adegan == null || v.adegan === 'khusus' || Number.isInteger(v.adegan)) &&
                  (v.judul == null || (typeof v.judul === 'string' && v.judul.length <= 160))),
            };
            const kunci = Object.keys(body);
            if (!kunci.length || kunci.some((k) => !boleh[k] || !boleh[k](body[k]))) return kirimJson(res, 400, { galat: 'Hanya tahap, prioritas, catatan, dan pilihan sampul yang boleh diubah dari katalog.' });
            for (const k of kunci) data.tulisKunci(m[1], k, body[k]);
            const status = data.perbaruiStatus();
            return kirimJson(res, 200, { ok: true, status });
          }
          if (p === '/api/pustaka' && req.method === 'PATCH') {
            // Banyak kartu sekaligus: { kartu: [{jenis, id}], status }
            const body = await bacaBody(req);
            for (const k of body.kartu || []) data.ubahStatusPustaka(k.jenis, k.id, body.status);
            return kirimJson(res, 200, { ok: true, jumlah: (body.kartu || []).length });
          }
          m = p.match(/^\/api\/pustaka\/([a-z0-9-]+)\/([a-z0-9-]+)$/);
          if (m && req.method === 'PATCH') {
            const body = await bacaBody(req);
            data.ubahStatusPustaka(m[1], m[2], body.status);
            return kirimJson(res, 200, { ok: true });
          }
          return kirimJson(res, 404, { galat: 'Rute tidak dikenal' });
        } catch (e) {
          console.error(e);
          return kirimJson(res, 500, { galat: e.message });
        }
      });
    },
  };
}
