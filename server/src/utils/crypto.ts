import { randomBytes, pbkdf2Sync } from 'crypto';

// 生成随机盐值
export function makeSalt(size = 3) {
  return randomBytes(size).toString('base64');
}

// 密码加密
export function encryptPassword(password: string, salt: string) {
  const tempSalt = Buffer.from(salt, 'base64');
  return pbkdf2Sync(password, tempSalt, 10000, 16, 'sha1').toString('base64');
}
