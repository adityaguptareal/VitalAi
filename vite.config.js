import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['pdfjs-dist/build/pdf'],
    exclude: ['pdfjs-dist/build/pdf.worker.mjs'],
  },
  build: {
    rollupOptions: {
    
      output: {
        manualChunks: {
          pdfjs: ['pdfjs-dist/build/pdf'],
          'pdfjs-worker': ['pdfjs-dist/build/pdf.worker.mjs']
        }
      }
    }
  }
});
