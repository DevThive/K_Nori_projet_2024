import {
  Controller,
  Get,
  Query,
  Redirect,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { GmailService } from './gmail.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { accessTokenGuard } from 'src/auth/guard/access-token.guard';
import { UserId } from 'src/auth/decorators/userId.decorator';

ApiTags('지메일');
@Controller('gmail')
export class GmailController {
  constructor(private readonly gmailService: GmailService) {}

  // 사용자를 Google OAuth2 인증 페이지로 리디렉션
  @Get('/google/auth')
  @Redirect()
  getAuth(@Res() res) {
    console.log(res);
    const authUrl = this.gmailService.getAuthenticationUrl();
    return { url: authUrl };
  }

  // Google로부터 리디렉션 받아 인증 코드를 처리
  // @ApiBearerAuth('accessToken')
  @Get('/oauth2callback')
  // @UseGuards(accessTokenGuard)
  async oauth2callback(@Query('code') code: string) {
    console.log(code);

    const oauth2Client = await this.gmailService.getOAuth2Client(code);
    // 인증 후 처리 로직 (예: 토큰 저장)
    // console.log(oauth2Client);
    return oauth2Client;
  }
}
