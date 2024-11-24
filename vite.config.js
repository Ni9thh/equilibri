import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/equilibri/',
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true
  }
});