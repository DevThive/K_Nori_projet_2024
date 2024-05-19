import { Controller, Get, Redirect, Req, Res } from '@nestjs/common';
import { GoogleAuthService } from './google-auth.service';
import { OAuth2Client } from 'google-auth-library';
import { Request, Response } from 'express';

@Controller('')
export class AuthController {
  constructor(private readonly googleAuthService: GoogleAuthService) {}

  @Get('/google')
  async googleAuth(@Req() req: Request, @Res() res: Response): Promise<void> {
    const oAuth2Client: OAuth2Client = await this.googleAuthService.authorize();
    // 인증 URL 생성
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: this.googleAuthService.getScopes(), // 수정된 부분
    });
    // 클라이언트를 인증 URL로 리다이렉트
    res.redirect(authUrl);
  }
  @Get('/oauth2callback')
  @Redirect('/')
  async googleAuthCallback(@Req() req: Request): Promise<{ url: string }> {
    // 인증 후 콜백 처리 로직
    // 여기서는 단순히 홈페이지로 리다이렉트하지만, 실제로는 토큰을 저장하거나
    // 추가적인 사용자 정보를 처리할 수 있습니다.
    return { url: 'http://localhost:3000' };
  }
}
