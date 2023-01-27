import { registerAs } from '@nestjs/config';

export default registerAs('database', (): IDataBaseConfig => {
  if (typeof process.env.MONGODB_URI === 'undefined') {
    throw 'mongodb url is missing.';
  }

  return {
    uri: process.env.MONGODB_URI,
  };
});
