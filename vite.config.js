import { createVuePlugin } from 'vite-plugin-vue2';

export default {
  base: './',
  plugins: [createVuePlugin()],

  server: {
    proxy: {
      '/qqmap': {
        target: 'https://apis.map.qq.com',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/qqmap/, ''),
      },
    },
  },
};
