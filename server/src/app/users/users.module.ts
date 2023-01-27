import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersSchema } from '@mongo/users.schema';
import { FavoritesSchema } from '@mongo/favorites.schema';
import { CalendarSchema } from '@mongo/calendar.schema';
import { AuthModule } from '@app/auth/auth.module';
import { AppInfoSchema } from '@mongo/app.schema';

// 查询用户信息相关模块
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'users', schema: UsersSchema },
      { name: 'favorites', schema: FavoritesSchema },
      { name: 'calendar', schema: CalendarSchema },
      { name: 'appInfo', schema: AppInfoSchema },
    ]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
