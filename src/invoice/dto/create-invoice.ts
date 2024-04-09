import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString, isNumber } from 'class-validator';

export class CreateInvoiceDto {
  @IsDate()
  @ApiProperty({ description: '발행일' })
  issuedDate: Date;

  @IsString()
  @ApiProperty({ description: '주소' })
  address: string;

  @IsString()
  @ApiProperty({ description: '회사' })
  company: string;

  @IsString()
  @ApiProperty({ description: '이메일주소' })
  companyEmail: string;

  @IsString()
  @ApiProperty({ description: '휴대폰 번호' })
  contact: string;

  @IsString()
  @ApiProperty({ description: '성함' })
  name: string;

  @IsString()
  @ApiProperty({ description: '서비스' })
  service: string;

  @IsNumber()
  @ApiProperty({ description: '가격' })
  price: number;

  @IsString()
  @ApiProperty({ description: '메모' })
  note: string;

  @IsNumber()
  @ApiProperty({ description: '총인원' })
  totalPeople: number;
}
