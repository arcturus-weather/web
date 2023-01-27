// @ts-ignore
import chalk from 'chalk';

console.clear();

console.log(
  [
    '============================================',
    '',
    chalk.blue('  ( •̀ ω •́ )✧ Welcome to ice-weapp-svg-cli.  '),
    '',
    '============================================',
  ].join('\n')
);

console.log(
  [
    'Usage: ',
    `1.${chalk.green('ice-init ')}: Generate configuration file`,
    `2.${chalk.green('ice-gen  ')}: Generate weapp component`,
    '',
  ].join('\n')
);

