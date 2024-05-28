import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { google } from 'googleapis';
import { UsersService } from 'src/users/users.service';
import axios from 'axios';
import * as qs from 'qs'; // qs 라이브러리 설치 필요

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
    const scopes = ['https://mail.google.com/'];

    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
    });
  }

  // 인증 코드를 사용하여 토큰 교환
  async getOAuth2Client(code: string) {
    const { tokens } = await this.oauth2Client.getToken(code);
    this.oauth2Client.setCredentials(tokens);

    // Retrieve the user based on the provided userid

    // Assuming you have methods to update the user's token information in your userService
    // Here we store the access token, refresh token, and optionally the access token's expiration time
    // if (tokens.refresh_token) {
    //   // Only update refresh token if present
    //   await this.userService.updateUserTokens(userid, {
    //     googleAccessToken: tokens.access_token,
    //     googleRefreshToken: tokens.refresh_token,
    //     googleAccessTokenExpires: new Date(
    //       Date.now() + (tokens.expiry_date || 0),
    //     ), // Adjust according to actual token structure
    //   });
    // } else {
    //   // If there's no new refresh token, just update the access token and its expiration
    //   await this.userService.updateAccessToken(userid, {
    //     googleAccessToken: tokens.access_token,
    //     googleAccessTokenExpires: new Date(
    //       Date.now() + (tokens.expiry_date || 0),
    //     ), // Adjust according to actual token structure
    //   });
    // }
    return this.oauth2Client;
  }
  async googletoken(userid: number) {
    const user = await this.userService.findUserById(userid);
    if (!user) throw new Error('User not found'); // 사용자를 찾을 수 없는 경우 예외 처리

    console.log(user);
    try {
      const accessToken = await this.refreshAccessToken(
        user.googleRefreshToken,
      );
      const response = {
        email: user.email,
        accessToken: accessToken,
      };
      return response;
    } catch (error) {
      throw new Error('Failed to refresh access token'); // 토큰 새로고침 실패 처리
    }
  }

  async refreshAccessToken(refreshToken: string) {
    const clientID = this.configService.get<string>('GOOGLE_CLIENT_ID');
    const clientSecret = this.configService.get<string>('GOOGLE_CLIENT_SECRET');

    console.log(refreshToken);
    if (!clientID || !clientSecret)
      throw new Error('Google client ID or secret is not configured'); // 환경 변수 확인

    try {
      const response = await axios.post(
        'https://oauth2.googleapis.com/token',
        qs.stringify({
          client_id: clientID,
          client_secret: clientSecret,
          refresh_token: refreshToken,
          grant_type: 'refresh_token',
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      const accessToken = response.data.access_token; // 새로 발급받은 액세스 토큰
      return accessToken;
    } catch (error) {
      console.error(
        'Error refreshing access token:',
        error.response?.data || error.message,
      );
      throw error; // 오류를 다시 던져 호출자가 처리하도록 함
    }
  }
}
