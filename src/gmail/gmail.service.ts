// src/gmail/gmail.service.ts
import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { GoogleAuthService } from '../google-auth/google-auth.service';

@Injectable()
export class GmailService {
  constructor(private readonly googleAuthService: GoogleAuthService) {}

  async listLabels() {
    const auth = await this.googleAuthService.authorize();
    const gmail = google.gmail({ version: 'v1', auth });
    const res = await gmail.users.labels.list({
      userId: 'me',
    });
    const labels = res.data.labels;
    if (!labels || labels.length === 0) {
      console.log('No labels found.');
      return;
    }
    console.log('Labels:');
    labels.forEach((label) => {
      console.log(`- ${label.name}`);
    });
  }
}
