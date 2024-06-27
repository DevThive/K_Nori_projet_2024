import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
//
@Injectable()
export class SlackService {
  private readonly slackWebhookUrl: string;

  constructor(private configService: ConfigService) {
    this.slackWebhookUrl = this.configService.get<string>('SLACK_WEBHOOK_URL');
  }

  async sendNotification(message: string): Promise<void> {
    try {
      const response = await axios.post(this.slackWebhookUrl, {
        text: message,
      });
      console.log('전송 성공', response.data);
    } catch (error) {
      console.error(
        'Error sending Slack notification:',
        error.response?.data || error.message,
      );
    }
  }
}
