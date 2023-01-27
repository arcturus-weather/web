import { defineConfig } from 'rollup';

// 代码压缩
import { terser } from 'rollup-plugin-terser';

// 去除无效代码
import cleanup from 'rollup-plugin-cleanup';

// 定位 node_modules 中的模块
import resolve from '@rollup/plugin-node-resolve';

// 解析及编译 TS
import typescript from '@rollup/plugin-typescript';

// 转换 CommonJS 模块成 ES6
import commonjs from '@rollup/plugin-commonjs';

// 复制静态资源
import copy from 'rollup-plugin-copy';

const plugins = [typescript(), resolve(), commonjs(), terser(), cleanup()];

export default defineConfig([
  {
    plugins: plugins,
    input: ['src/bin/help.ts', 'src/bin/init.ts', 'src/bin/gen.ts'],
    output: {
      dir: 'dist/bin',
      format: 'es',
      entryFileNames: '[name].js',
      banner: '#!/usr/bin/env node',
    },
  },
  {
    plugins: [
      ...plugins,
      copy({
        targets: [{ src: 'src/templates/*', dest: 'dist/templates' }],
      }),
    ],
    input: [
      'src/libs/gen.ts',
      'src/libs/config.ts',
      'src/libs/svg.ts',
      'src/libs/replace.ts',
      'src/libs/utils.ts',
      'src/libs/getTemplate.ts',
    ],
    output: {
      dir: 'dist/libs',
      format: 'es',
      entryFileNames: '[name].js',
    },
  },
]);

