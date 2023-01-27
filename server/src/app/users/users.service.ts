// @ts-nocheck
import {
  EmailNotExists,
  httpSuccess,
  Forbidden,
  PasswardError,
  NotFound,
  codeError,
} from '@src/utils/http';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { makeSalt, encryptPassword } from 'src/utils/crypto';
import { UsersDocument } from '@mongo/users.schema';
import { FavoritesDocument } from '@mongo/favorites.schema';

import { CalendarDocument } from '@mongo/calendar.schema';
import { AuthService } from '@app/auth/auth.service';
import { AppInfoDocument } from '@mongo/app.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('users') private userModel: Model<UsersDocument>,
    @InjectModel('favorites') private favModel: Model<FavoritesDocument>,
    @InjectModel('calendar') private cldModel: Model<CalendarDocument>,
    @InjectModel('appInfo') private appModel: Model<AppInfoDocument>,
    @Inject(forwardRef(() => AuthService)) private readonly auth: AuthService
  ) {}

  // 查找邮箱是否已经存在
  async findOne(email: string): Promise<UsersDocument | null> {
    return await this.userModel.findOne({ email }).exec();
  }

  async visit() {
    const app = await this.appModel.findOne({
      createdAt: {
        $gte: new Date(new Date().setHours(0, 0, 0, 0)),
        $lt: new Date(new Date().setHours(23, 59, 59, 1000)),
      },
    });

    if (app) {
      // 如果今天有人访问过
      app.visitor++;
      app.save();

      // 返回访问人数
      return httpSuccess({
        visitor: app.visitor,
      });
    } else {
      // 没人访问过, 就创造一条记录
      const app_ = await this.appModel.create({ visitor: 1 });

      return httpSuccess({
        visitor: app_.visitor,
      });
    }
  }

  // 注册新用户
  async register(body: IAuth) {
    const { password, email } = body;
    const user = await this.findOne(email);

    if (user) throw new Forbidden('邮箱已被注册');

    const salt = makeSalt();
    const hashPwd = encryptPassword(password, salt);

    await this.userModel.create({ email, password: hashPwd, salt });

    return httpSuccess('注册成功');
  }

  // 登录
  async login(body: IAuth) {
    const { email, password } = body;
    const { code, user } = await this.auth.validateUser(email, password);

    switch (code) {
      case 1:
        return httpSuccess({
          token: this.auth.certificate(user!),
          message: '登录成功',
        });
      case 2:
        throw new PasswardError();
      case 3:
        throw new EmailNotExists();
    }
  }

  // 获取用户收藏
  async favorite(uid: string) {
    const res = await this.favModel.findOne({ _id: uid }).exec();

    return httpSuccess({
      favorites: res !== null ? res.list : [],
    });
  }

  // 添加收藏
  async addFavorite(body: IAddFavoritesBody) {
    const { uid, item } = body;

    const res = await this.favModel.findByIdAndUpdate(
      uid,
      { $addToSet: { list: item } }, // 元素不存在时添加
      {
        new: true, // res 是添加新值后的
        upsert: true, // id 不存在就加入
      }
    );

    // 添加成功后返回新的收藏列表
    return httpSuccess({
      favorites: res.list,
    });
  }

  // 删除收藏
  async deleteFavorites(body: IDeleteFavoritesBody) {
    const { uid, item } = body;

    const res = await this.favModel.findByIdAndUpdate(
      uid,
      { $pullAll: { list: item } },
      {
        new: true,
      }
    );

    return httpSuccess({
      favorites: res === null ? [] : res.list,
    });
  }

  // 打卡
  async checkin(body: ICheckInBody) {
    const { uid, item } = body;

    const ci = (await this.cldModel.create({ uid, ...item })) as any;

    return httpSuccess({
      message: '打卡成功',
      item: {
        id: ci._id, // 便于打卡成功后写点东西
        location: ci.location,
        weather: ci.weather,
        date: ci.createdAt,
      },
    });
  }

  // 每日日记
  async daily(body: IDailyBody) {
    const { id /* 这是记录 id */, daily } = body;

    await this.cldModel.findByIdAndUpdate(id, { daily });

    return httpSuccess('添加日记成功');
  }

  // 获取打卡表
  async calendar(uid: string) {
    const res = await this.cldModel.find({ uid }).exec();

    return httpSuccess({
      list: res.map(
        (e: any): ICalendarItem => ({
          location: e.location,
          weather: e.weather,
          date: e.createdAt,
          daily: e.daily,
          id: e._id,
        })
      ),
    });
  }

  // 判断记录是否属于某用户
  async idIsBelongToUid(uid: string, id: string): Promise<boolean> {
    const res = await this.cldModel.findById(id).exec();

    if (!res) throw new NotFound();

    if (res.uid === uid) return true;
    else return false;
  }

  // 保存验证码
  async saveCode(code: string, email: string) {
    await this.userModel.findOneAndUpdate(
      { email },
      { validateCode: code, codeCreateAt: new Date() }
    );
  }

  // 验证验证码, 并修改密码
  async validateAndChangePwd({ code, email, password }: IChangePasswordBody) {
    if (!password) throw new PasswardError('无效密码');

    const user = await this.userModel.findOne({ email });

    if (user) {
      // 该用户存在
      const { validateCode, codeCreateAt } = user;

      const now = new Date();
      if (
        // 存在验证码初始时间
        !(
          codeCreateAt !== null &&
          now.getTime() - codeCreateAt.getTime() <= 1800000
        ) ||
        // 要求数据库中存在 code 并且与请求的相等
        (!code && validateCode !== code)
      ) {
        // 大于 30 分钟无效
        throw new codeError();
      } else {
        user.password = encryptPassword(password, user.salt);
        user.validateCode = ''; // 修改完成后清空验证码
        user.codeCreateAt = null;
        await user.save();

        return httpSuccess('密码修改成功');
      }
    } else throw new NotFound('账号不存在');
  }
}
