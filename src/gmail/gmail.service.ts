import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { google } from 'googleapis';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class GmailService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
  ) {}
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
  async getOAuth2Client(userid: number, code: string) {
    const { tokens } = await this.oauth2Client.getToken(code);
    this.oauth2Client.setCredentials(tokens);

    // Retrieve the user based on the provided userid

    // Assuming you have methods to update the user's token information in your userService
    // Here we store the access token, refresh token, and optionally the access token's expiration time
    if (tokens.refresh_token) {
      // Only update refresh token if present
      await this.userService.updateUserTokens(userid, {
        googleAccessToken: tokens.access_token,
        googleRefreshToken: tokens.refresh_token,
        googleAccessTokenExpires: new Date(
          Date.now() + (tokens.expiry_date || 0),
        ), // Adjust according to actual token structure
      });
    } else {
      // If there's no new refresh token, just update the access token and its expiration
      await this.userService.updateAccessToken(userid, {
        googleAccessToken: tokens.access_token,
        googleAccessTokenExpires: new Date(
          Date.now() + (tokens.expiry_date || 0),
        ), // Adjust according to actual token structure
      });
    }
    return this.oauth2Client;
  }
}
