import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { GmailService } from './gmail/gmail.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly gmailService: GmailService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/oauth2callback')
  async oauth2callback(@Query('code') code: string) {
    console.log(code);

    const oauth2Client = await this.gmailService.getOAuth2Client(code);
    // 인증 후 처리 로직 (예: 토큰 저장)
    console.log(oauth2Client);
    return oauth2Client;
  }
}
