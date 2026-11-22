// Plugin Vite: API katalog, berkas media (dengan Range), dan kabar perubahan (SSE).
import fs from 'node:fs';
import path from 'node:path';
import * as data from './data.mjs';

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

export default function katalogPlugin() {
  const pendengar = new Set();
  let tunda = null;
  const kabari = (berkas) => {
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

          let m = p.match(/^\/api\/proyek\/([a-z0-9-]+)$/);
          if (m && req.method === 'GET') {
            const d = data.detailProyek(m[1]);
            return d ? kirimJson(res, 200, d) : kirimJson(res, 404, { galat: 'Proyek tidak ditemukan' });
          }
          if (m && req.method === 'PATCH') {
            const body = await bacaBody(req);
            const boleh = { tahap: (v) => data.TAHAP.includes(v), prioritas: (v) => v === null || Number.isInteger(v), catatan: (v) => typeof v === 'string' };
            const kunci = Object.keys(body);
            if (!kunci.length || kunci.some((k) => !boleh[k] || !boleh[k](body[k]))) return kirimJson(res, 400, { galat: 'Hanya tahap, prioritas, dan catatan yang boleh diubah dari katalog.' });
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
