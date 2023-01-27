import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from '@app/users/users.service';
import { BadReq, UnAuth } from '@src/utils/http';

// 判断 id 的记录是否属于 uid 用户
@Injectable()
export class UidGuard implements CanActivate {
  constructor(private readonly user: UsersService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const {
      user: { uid },
      body: { id },
    } = request;

    return this.requestHandle(uid, id);
  }

  async requestHandle(uid: string, id: string) {
    if (!id || id.length !== 24) {
      throw new BadReq();
    }

    const eq = await this.user.idIsBelongToUid(uid, id);

    if (!eq) {
      throw new UnAuth('权限不足');
    }

    return true;
  }
}
