import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import {
  authSchema,
  favoriteSchema,
  checkinSchema,
  dailySchema,
  resetSchema,
  favoritesSchema,
} from '@app/pipe/joi.schema ';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '@app/auth/jwt.guard';
import { Request } from 'express';
import { UidGuard } from '@app/auth/uid.guard';
import { JoiValidationPipe } from '@app/pipe/joi.pipe';
import { ParseIntPipe } from '@app/pipe/num.pipe';

interface Request_ extends Request {
  user: IPayLoad;
}

@Controller()
export class UsersController {
  constructor(private readonly user: UsersService) {}

  @Get()
  hello() {
    return 'Hi! there is ice-weather server.';
  }

  @Get('visit')
  async visit() {
    return await this.user.visit();
  }

  @Post('signin')
  @UsePipes(new JoiValidationPipe(authSchema))
  async register(@Body() body: IAuth) {
    return await this.user.register(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('favorites')
  async favorites(@Req() req: Request_) {
    const {
      user: { uid },
    } = req;
    return await this.user.favorite(uid);
  }

  @UseGuards(JwtAuthGuard)
  @Post('addFavorites')
  async addFavorites(
    @Req() req: Request_,
    @Body(new JoiValidationPipe(favoriteSchema), new ParseIntPipe())
    body: IFavorite
  ) {
    const {
      user: { uid },
    } = req;
    return await this.user.addFavorite({ uid, item: body });
  }

  @UseGuards(JwtAuthGuard)
  @Post('deleteFavorites')
  async deleteFavorites(
    @Req() req: Request_,
    @Body(new JoiValidationPipe(favoritesSchema), new ParseIntPipe())
    body: { list: IFavorite[] }
  ) {
    const {
      user: { uid },
    } = req;
    return await this.user.deleteFavorites({ uid, item: body.list });
  }

  @UseGuards(JwtAuthGuard)
  @Post('checkin')
  async checkin(
    @Req() req: Request_,
    @Body(new JoiValidationPipe(checkinSchema), new ParseIntPipe())
    body: ICheckIn
  ) {
    const {
      user: { uid },
    } = req;
    return await this.user.checkin({ uid, item: body });
  }

  @UseGuards(JwtAuthGuard)
  @Get('calendar')
  async calendar(@Req() req: Request_) {
    const {
      user: { uid },
    } = req;
    return await this.user.calendar(uid);
  }

  @UseGuards(UidGuard) // 这个守卫需要在 jwt 上面面, 否则获取不到 user
  @UseGuards(JwtAuthGuard)
  @Post('daily')
  async daily(@Body(new JoiValidationPipe(dailySchema)) body: IDailyBody) {
    return await this.user.daily(body);
  }

  @Post('login')
  @UsePipes(new JoiValidationPipe(authSchema))
  async login(@Body() body: IAuth) {
    return await this.user.login(body);
  }

  // 修改密码
  @Post('reset')
  @UsePipes(new JoiValidationPipe(resetSchema))
  async changePassword(@Body() body: IChangePasswordBody) {
    return await this.user.validateAndChangePwd(body);
  }
}
