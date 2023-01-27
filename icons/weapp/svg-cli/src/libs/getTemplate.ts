import fs from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

export function getJsTemplate() {
  return fs.readFileSync(join(__dirname, '../templates/_JS_TEMP_')).toString();
}

export function getWxssTemplate() {
  return fs
    .readFileSync(join(__dirname, '../templates/_WXSS_TEMP_'))
    .toString();
}

export function getJsonTemplate() {
  return fs
    .readFileSync(join(__dirname, '../templates/_JSON_TEMP_'))
    .toString();
}

export function getConfigTemplate() {
  return fs
    .readFileSync(join(__dirname, '../templates/_CONFIG_TEMP_'))
    .toString();
}

