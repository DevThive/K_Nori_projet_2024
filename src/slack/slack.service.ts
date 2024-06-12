import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class SlackService {
  private readonly slackWebhookUrl =
    'https://hooks.slack.com/services/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';

  async sendNotification(message: string): Promise<void> {
    try {
      await axios.post(this.slackWebhookUrl, {
        text: message,
      });
      console.log('전송 성공');
    } catch (error) {
      console.error('Error sending Slack notification:', error);
    }
  }
}
