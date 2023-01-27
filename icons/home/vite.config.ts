import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@pages': resolve(__dirname, './src/pages'),
      '@src': resolve(__dirname, './src'),
      '@layout': resolve(__dirname, './src/layout'),
      '@components': resolve(__dirname, './src/components'),
    },
  },
});
