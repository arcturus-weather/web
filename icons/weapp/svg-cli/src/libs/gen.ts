import fs from 'fs';
import path from 'path';
import { getSvgs } from './svg';
import { Config } from './config';
import { getJsTemplate, getJsonTemplate, getWxssTemplate } from './getTemplate';
import { deleteAllFiles, err } from './utils';
import { replaceSize } from './replace';

// @ts-ignore
import chalk from 'chalk';

// 生成小程序组件
export function generateComponent(config: Config) {
  if (typeof config.assetsDir === 'undefined') {
    err('assetsDir is Missing.');
  }

  const dir = path.resolve(config.assetsDir);
  const outputDir = path.resolve(config.outputDir);
  const fileName = 'index';

  // 创建文件夹
  fs.mkdir(
    outputDir,
    { recursive: true },
    (e: NodeJS.ErrnoException | null) => {
      if (e) {
        err(`Folder ${chalk.green(outputDir)} created failed.`);
      }
    }
  );

  // 删除目录下已经存在的文件
  deleteAllFiles(outputDir);

  const res = getSvgs(dir);

  // 创建文件
  fs.writeFileSync(path.join(outputDir, `${fileName}.wxss`), getWxssTemplate());

  fs.writeFileSync(
    path.join(outputDir, `${fileName}.wxml`),
    res.dom.join('\n').toString()
  );

  // 替换 js 模板中的 #size# 字段
  const jsFile = replaceSize(getJsTemplate(), config.defaultSize);

  fs.writeFileSync(path.join(outputDir, `${fileName}.js`), jsFile);

  fs.writeFileSync(path.join(outputDir, `${fileName}.json`), getJsonTemplate());

  console.log(
    [
      '',
      `${chalk.green('√')} All icons have been putted into dir: ${chalk.green(
        config.outputDir
      )}`,
      '',
    ].join('\n')
  );
}

