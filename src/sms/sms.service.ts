import { Injectable } from '@nestjs/common';
import { SolapiMessageService } from 'solapi';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SmsService {
  private messageService: SolapiMessageService;
  private fromPhoneNumber: string;

  constructor(private configService: ConfigService) {
    this.messageService = new SolapiMessageService(
      'SOLAPI_API_KEY',
      'SOLAPI_API_SECRET_KEY',
    );
    this.fromPhoneNumber = this.configService.get<string>('FROM_PHONE_NUMBER');
  }
  getFromPhoneNumber(): string {
    return this.fromPhoneNumber;
  }

  async sendMMS(to: string, from: string, text: string, imageFilePath: string) {
    const imageId = await this.messageService
      .uploadFile(path.join(__dirname, imageFilePath), 'MMS')
      .then((res) => res.fileId);

    await this.messageService.send({
      imageId,
      to,
      from: this.fromPhoneNumber,
      text,
      // subject: '문자 제목' // LMS, MMS 전용 옵션, SMS에서 해당 파라미터 추가될 경우 자동으로 LMS로 변환됩니다!
    });
  }
}
