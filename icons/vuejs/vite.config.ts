import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), '../assets')],
      symbolId: 'icon-[dir]-[name]',
      customDomId: '__svg__icons__',
    }),
    dts({
      outputDir: '.',
      skipDiagnostics: true,
      copyDtsFiles: false,
      cleanVueFileName: true,
      entryRoot: './packages'
    }),
  ],
  resolve: {
    alias: {
      '@packages': resolve(__dirname, './packages'),
      '@': resolve(__dirname, '.'),
    },
  },
  // https://cn.vitejs.dev/guide/build.html#library-mode
  build: {
    lib: {
      entry: resolve(__dirname, 'packages/index.ts'),
      name: 'lib',
      fileName: (format) => `lib.${format}.js`,
    },
    outDir: 'dist',
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
        exports: 'named',
      },
    },
  },
});
