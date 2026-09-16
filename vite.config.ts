import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

// Dev'de index.html'deki ?v=BUILDTIME canli zaman damgasiyla cevrilir;
// tarayici eski script.js/styles.css ozbellegini asla yeniden kullanmaz.
// (Prod ayni damgayi scripts/vercel-static-build.cjs icerisinde alir.)
const cacheBustPlugIn = (): Plugin => ({
  name: 'cache-bust-builddtime',
  apply: 'serve',
  transformIndexHtml(html) {
    const stamp = `v=dev${Date.now().toString(36)}`;
    return html.split('?v=BUILDTIME').join(`?${stamp}`);
  },
});

export default defineConfig({
  plugins: [react(), cacheBustPlugIn()],
  server: {
    port: 5173,
    strictPort: true,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
