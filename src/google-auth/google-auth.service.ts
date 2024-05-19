import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import * as path from 'path';
import { authenticate } from '@google-cloud/local-auth';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class GoogleAuthService {
  private readonly SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
  private readonly TOKEN_PATH = path.join(process.cwd(), 'token.json');
  private readonly CREDENTIALS_PATH = path.join(
    process.cwd(),
    'credentials.json',
  );

  public getScopes(): string[] {
    return this.SCOPES;
  }

  async loadSavedCredentialsIfExist(): Promise<{
    client_id: string;
    client_secret: string;
    refresh_token: string;
  } | null> {
    try {
      const content = await fs.readFile(this.TOKEN_PATH);
      const credentials = JSON.parse(content.toString());
      // JSONClient 대신 필요한 속성을 직접 반환합니다.
      if (
        'client_id' in credentials &&
        'client_secret' in credentials &&
        'refresh_token' in credentials
      ) {
        return {
          client_id: credentials.client_id,
          client_secret: credentials.client_secret,
          refresh_token: credentials.refresh_token,
        };
      }
      return null;
    } catch (err) {
      return null;
    }
  }

  async saveCredentials(client) {
    const content = await fs.readFile(this.CREDENTIALS_PATH);
    const keys = JSON.parse(content.toString());
    const key = keys.installed || keys.web;
    const payload = JSON.stringify({
      type: 'authorized_user',
      client_id: key.client_id,
      client_secret: key.client_secret,
      refresh_token: client.credentials.refresh_token,
    });
    await fs.writeFile(this.TOKEN_PATH, payload);
  }

  async authorize(): Promise<OAuth2Client> {
    let credentials = await this.loadSavedCredentialsIfExist();
    if (credentials) {
      const { client_secret, client_id, refresh_token } = credentials;
      const oAuth2Client = new OAuth2Client(client_id, client_secret);
      oAuth2Client.setCredentials({ refresh_token });
      return oAuth2Client;
    }
    const auth = (await authenticate({
      scopes: this.SCOPES,
      keyfilePath: this.CREDENTIALS_PATH,
    })) as OAuth2Client;
    if (auth.credentials) {
      await this.saveCredentials(auth);
    }
    return auth;
  }
}
