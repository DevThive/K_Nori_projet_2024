import { Injectable } from '@nestjs/common';
import { SolapiMessageService } from 'solapi';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SmsService {
  private messageService: SolapiMessageService;
  private fromPhoneNumber: string;
  private pfId: string;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('SOLAPI_API_KEY');
    const apiSecretKey = this.configService.get<string>(
      'SOLAPI_API_SECRET_KEY',
    );

    this.messageService = new SolapiMessageService(apiKey, apiSecretKey);
    this.pfId = this.configService.get<string>('PF_ID');

    // 발신 번호 설정
    this.fromPhoneNumber = this.configService.get<string>('FROM_PHONE_NUMBER');
  }

  getFromPhoneNumber(): string {
    return this.fromPhoneNumber;
  }

  async sendMMS(
    to: string,
    from: string,
    buyerName: string,
    url: string,
    classTitle: string,
    totalPeople: string,
    date: string,
    time: string,
    templateId: string,
  ) {
    // 발신 번호 설정
    // const from = this.getFromPhoneNumber();

    await this.messageService.send({
      to,
      from,
      kakaoOptions: {
        pfId: this.pfId,
        templateId: templateId,
        variables: {
          '#{홍길동}': buyerName,
          '#{url}': url,
          '#{클래스명}': classTitle,
          '#{총인원수}': totalPeople,
          '#{예약날짜}': date,
          '#{예약시간}': time,
        },
      },
    });
  }

  async sendContactAlarm(
    to: string,
    from: string,
    buyerName: string,
    url: string,
    contentTitle: string,
    content: string,
    templateId: string,
  ) {
    // 발신 번호 설정
    // const from = this.getFromPhoneNumber();

    await this.messageService.send({
      to,
      from,
      kakaoOptions: {
        pfId: this.pfId,
        templateId: templateId,
        variables: {
          '#{홍길동}': buyerName,
          '#{url}': url,
          '#{문의제목}': contentTitle,
          '#{문의내용}': content,
        },
      },
    });
  }
}
