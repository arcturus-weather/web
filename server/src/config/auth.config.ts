import { registerAs } from '@nestjs/config';

export default registerAs(
  'auth',
  (): IAuthConfig => ({
    secret: process.env.SECRET ?? 'ice-weather',
    expires: process.env.EXPIRES ?? '356d', // 过期时间
  })
);
