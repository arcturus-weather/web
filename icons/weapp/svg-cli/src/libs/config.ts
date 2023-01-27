import path from 'path';
import fs from 'fs';

// @ts-ignore
import chalk from 'chalk';

export interface Config {
  assetsDir: string; // 资源目录
  outputDir: string; // 输出文件夹
  defaultSize: number; // 默认大小
}

let cacheConfig: Config;

export function getConfig() {
  if (cacheConfig) return cacheConfig;

  const targetFile = path.resolve('./config.json');

  // 配置文件不存在
  if (!fs.existsSync(targetFile)) {
    console.warn(
      chalk.red(
        `file config.json doesn't exist. Use 'ice--init' to generate a template.`
      )
    );

    process.exit(1);
  }

  const config = JSON.parse(fs.readFileSync(targetFile).toString()) as Config;

  if (!fs.existsSync(path.resolve(config.assetsDir))) {
    console.warn(chalk.red("😅 Folder doesn't exist."));
    process.exit(1);
  }

  config.defaultSize = config.defaultSize ?? 20;
  config.outputDir = config.outputDir ?? './icon';

  cacheConfig = config;

  return config;
}

