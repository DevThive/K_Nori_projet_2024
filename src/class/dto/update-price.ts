import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UpdateClassPriceDto {
  @IsNumber()
  @ApiProperty({ description: '가격' })
  price: number;

  @IsNumber()
  @ApiProperty({ description: '가격2' })
  price2: number; // price2 추가
}
