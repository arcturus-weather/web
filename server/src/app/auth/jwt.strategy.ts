import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

// 自定义配置
import authConfig from '@src/config/auth.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    // @ts-ignore
    @Inject(authConfig.KEY)
    authcfg: ConfigType<typeof authConfig>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: authcfg.secret,
    });
  }

  async validate(payload: IPayLoad) {
    return { email: payload.email, uid: payload.uid };
  }
}
