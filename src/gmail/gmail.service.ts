import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as process from 'process';
import { google } from 'googleapis';
import { authenticate } from '@google-cloud/local-auth';

@Injectable()
export class GmailService {
  private readonly SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
  private readonly TOKEN_PATH = path.join(process.cwd(), 'token.json');
  private readonly CREDENTIALS_PATH = path.join(
    process.cwd(),
    'credentials.json',
  );

  private async loadSavedCredentialsIfExist() {
    try {
      const content = await fs.promises.readFile(this.TOKEN_PATH);
      const credentials = JSON.parse(content.toString());
      const { client_id, client_secret, refresh_token } = credentials;
      const oAuth2Client = new google.auth.OAuth2(client_id, client_secret);
      oAuth2Client.setCredentials({ refresh_token });
      return oAuth2Client;
    } catch (err) {
      return null;
    }
  }

  private async authorize() {
    let client = await this.loadSavedCredentialsIfExist();
    if (client) {
      return client;
    }
    client = await authenticate({
      scopes: this.SCOPES,
      keyfilePath: this.CREDENTIALS_PATH,
    });
    return client;
  }

  async listLabels() {
    const auth = await this.authorize();
    const gmail = google.gmail({ version: 'v1', auth });
    const res = await gmail.users.labels.list({
      userId: 'me',
    });
    const labels = res.data.labels;
    if (!labels || labels.length === 0) {
      console.log('No labels found.');
      return [];
    }
    return labels.map((label) => label.name);
  }
}
