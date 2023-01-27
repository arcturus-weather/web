import { registerAs } from '@nestjs/config';

export default registerAs('mail', (): IMailConfig => {
  if (typeof process.env.MAIL_ACCOUNT === 'undefined') {
    throw 'mail account is missing.';
  }

  if (typeof process.env.MAIL_PASSWORD === 'undefined') {
    throw 'mail password is missing.';
  }

  return {
    host: process.env.MAIL_HOST ?? 'smtp.exmail.qq.com',
    port: parseInt(process.env.MAIL_PORT ?? '465'),
    account: process.env.MAIL_ACCOUNT,
    password: process.env.MAIL_PASSWORD,
  };
});
