import fs from 'fs';
import { join } from 'path';
import { R } from './types';

// 删除某个目录下所有文件
export function deleteAllFiles(path: string /* 绝对路径 */) {
  if (fs.existsSync(path)) {
    const files = fs.readdirSync(path);

    files.forEach((file: string) => {
      const curPath = join(path, file);

      if (fs.statSync(curPath).isDirectory()) {
        deleteAllFiles(curPath); // 递归删除文件夹
      } else {
        fs.unlinkSync(curPath); // 删除文件
      }
    });
  }
}

// 读取目录下的全部 svg 文件
export function readAllFiles(path: string, prefix = '' /* 绝对路径 */) {
  const res: R[] = [];

  if (fs.existsSync(path)) {
    const files = fs.readdirSync(path);

    for (let i = 0; i < files.length; i++) {
      const curPath = join(path, files[i]);

      if (fs.statSync(curPath).isDirectory()) {
        // 当前是文件夹
        res.push(...readAllFiles(curPath, `${files[i]}-`));
      } else {
        // 当前是 svg 文件
        if (files[i].match(/.*\.svg/)) {
          res.push({
            id: `${prefix}${files[i].replace('.svg', '')}`, // 去掉文件后缀
            svg: fs.readFileSync(curPath, 'utf8'),
          });
        }
      }
    }
  }

  return res;
}

export function err(e: string) {
  console.error(e);
  process.exit(1);
}

