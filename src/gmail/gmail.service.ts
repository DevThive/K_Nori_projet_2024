import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { google } from 'googleapis';

@Injectable()
export class GmailService {
  constructor(private readonly configService: ConfigService) {}
  private oauth2Client = new google.auth.OAuth2(
    this.configService.get<string>('GOOGLE_CLIENT_ID'),
    this.configService.get<string>('GOOGLE_CLIENT_SECRET'),
    this.configService.get<string>('GOOGLE_CALLBACK_URL'),
  );

  // 사용자 인증 URL 생성
  getAuthenticationUrl() {
    const scopes = ['https://www.googleapis.com/auth/gmail.readonly'];

    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
    });
  }

  // 인증 코드를 사용하여 토큰 교환
  async getOAuth2Client(code: string) {
    const { tokens } = await this.oauth2Client.getToken(code);
    this.oauth2Client.setCredentials(tokens);

    return this.oauth2Client;
  }
}
