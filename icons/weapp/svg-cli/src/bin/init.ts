import path from 'path';
import fs from 'fs';
import { getConfigTemplate } from '../libs/getTemplate';

// @ts-ignore
import chalk from 'chalk';

const targetFile = path.resolve('./config.json');

if (fs.existsSync(targetFile)) {
  console.error(chalk.red(`config.json already exists.`));
} else {
  fs.writeFile(
    targetFile,
    getConfigTemplate(),
    (err: NodeJS.ErrnoException | null) => {
      if (err) throw err;

      console.clear();
      console.log(chalk.green(`config.json created successfully.`));
    }
  );
}

