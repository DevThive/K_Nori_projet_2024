import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateInvoiceItemDto {
  @IsString()
  @ApiProperty({ description: '클래스 제목' })
  className: string;

  @IsString()
  @ApiProperty({ description: '내용' })
  content: string;

  @IsString()
  @ApiProperty({ description: '금액' })
  price: string;

  @IsNumber()
  @ApiProperty({ description: '인원수' })
  people: number;

  @IsString()
  @ApiProperty({ description: '총 금액' })
  total: string;

  @IsString()
  @ApiProperty({ description: '소요시간' })
  time: string;
}
