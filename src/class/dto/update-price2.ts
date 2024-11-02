import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UpdeteClassSecondPriceDto {
  @IsNumber()
  @ApiProperty({ description: '가격' })
  price2: number;
}
