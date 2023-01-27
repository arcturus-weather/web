import { Injectable } from '@nestjs/common';
import { UsersService } from '@app/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { encryptPassword } from '@src/utils/crypto';
import { UsersDocument } from '@mongo/users.schema';

interface IValidate {
  code: number;
  user?: UsersDocument;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly user: UsersService
  ) {}

  // 验证账号密码
  async validateUser(email: string, pwd: string): Promise<IValidate> {
    const user = await this.user.findOne(email);

    if (user) {
      const { password, salt } = user;

      const hashPwd = encryptPassword(pwd, salt);

      if (password === hashPwd) {
        return {
          code: 1,
          user,
        };
      } else {
        // 密码错误
        return {
          code: 2,
        };
      }
    } else {
      // 账号不存在
      return {
        code: 3,
      };
    }
  }

  // 颁发令牌
  // docs: http://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html
  certificate(user: UsersDocument) {
    const payload = {
      email: user.email,
      uid: user._id,
    };

    return this.jwtService.sign(payload); // token
  }
}
