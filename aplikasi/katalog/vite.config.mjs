import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import katalog from './server/plugin.mjs';

export default defineConfig({
  plugins: [react(), katalog()],
  // Satu salinan React dan Remotion untuk katalog dan paket/video.
  resolve: { dedupe: ['react', 'react-dom', 'remotion', '@remotion/player'] },
  server: { port: 4174, open: true, host: '127.0.0.1' },
});
