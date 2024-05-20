import { Controller, Get, Query, Redirect, Req, Res } from '@nestjs/common';
import { GmailService } from './gmail.service';
import { ApiTags } from '@nestjs/swagger';

ApiTags('지메일');
@Controller('gmail')
export class GmailController {
  constructor(private readonly gmailService: GmailService) {}

  // 사용자를 Google OAuth2 인증 페이지로 리디렉션
  @Get('/auth')
  @Redirect()
  getAuth(@Res() res) {
    const authUrl = this.gmailService.getAuthenticationUrl();
    return { url: authUrl };
  }

  // Google로부터 리디렉션 받아 인증 코드를 처리
}
