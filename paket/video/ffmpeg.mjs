// ffmpeg: pakai yang ada di PATH, atau ffmpeg bawaan Remotion (npx remotion ffmpeg) bila tidak ada.
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = path.dirname(fileURLToPath(import.meta.url));
let pakaiSistem = null;

export function ffmpeg(args) {
  if (pakaiSistem === null) pakaiSistem = spawnSync('ffmpeg', ['-version'], { encoding: 'utf8' }).status === 0;
  const r = pakaiSistem
    ? spawnSync('ffmpeg', args, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 })
    : spawnSync('npx', ['remotion', 'ffmpeg', ...args.map((a) => (/[\s"&]/.test(a) ? `"${a.replace(/"/g, '\\"')}"` : a))], { cwd: DIR, shell: true, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  return { kode: r.status, stdout: r.stdout || '', stderr: r.stderr || '' };
}
