import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as path from 'path';
import { UsersModule } from '@app/users/users.module';

@Module({
  imports: [
    UsersModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('mail.host'),
          port: configService.get<number>('mail.port'),
          auth: {
            user: configService.get<number>('mail.account'),
            pass: configService.get<number>('mail.password'),
          },
        },
        preview: false, // 发送成功后不需要本地预览
        defaults: {
          from: `小冰天气 <${configService.get<string>('mail.account')}>`,
        },
        template: {
          dir: path.join(process.cwd(), './src/app/mail'),
          adapter: new EjsAdapter(),
          options: {
            strict: true, // 严格模式
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MailService],
  controllers: [MailController],
  exports: [MailService],
})
export class MailModule {}
