import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  base: '/food-order-app/',   // ← must match your GitHub repo name exactly
  build: {
    outDir: 'dist'
  },
  server: {
    port: 3000,
    open: true
  }
});