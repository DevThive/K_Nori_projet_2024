import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateClassEtcPriceDto {
  @IsString()
  @ApiProperty({ description: '단체가격' })
  etcprice: string;
}
