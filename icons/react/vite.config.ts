import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { join } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    createSvgIconsPlugin({
      iconDirs: [join(process.cwd(), '../assets')],
      symbolId: 'icon-[dir]-[name]',
      customDomId: '__svg__icons__',
    }),
  ],
  build: {
    minify: 'esbuild',
    lib: {
      entry: join(__dirname, 'packages/index.tsx'),
      name: 'lib',
      // formats: ['es'],
      fileName: (format) => `lib.${format}.js`,
    },
    rollupOptions: {
      external: ['react'],
      output: {
        globals: {
          react: 'React',
        },
      },
    },
  },
});
