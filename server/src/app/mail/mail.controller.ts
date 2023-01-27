import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller()
export class MailController {
  constructor(private readonly emailService: MailService) {}

  @Post('sendCode')
  async sendEmailCode(@Body() data: IMailBody) {
    return this.emailService.sendEmailCode(data);
  }
}
