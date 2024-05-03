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
    productName: string,
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
          '#{상점명}': '케이놀이문화재단',
          '#{구매자명}': buyerName,
          '#{상품명}': productName,
        },
      },
    });
  }
}
