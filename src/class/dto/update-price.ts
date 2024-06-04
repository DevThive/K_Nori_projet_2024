import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UpdateClassPriceDto {
  @IsNumber()
  @ApiProperty({ description: '가격' })
  price: number;
}
