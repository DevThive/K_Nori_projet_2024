import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString, isNumber } from 'class-validator';

export class CreateReservationDto {
  // @IsDate()
  // @ApiProperty({ description: '날짜' })
  // date: Date;

  // @IsString()
  // @ApiProperty({ description: '시간' })
  // time: string;

  @IsNumber()
  @ApiProperty({ description: '총인원' })
  totalPeople: number;

  @IsString()
  @ApiProperty({ description: '예약자 이름' })
  client_name: string;

  @IsString()
  @ApiProperty({ description: '예약자 이메일' })
  client_email: string;

  @IsString()
  @ApiProperty({ description: '예약자 휴대폰번호' })
  client_phonenumber: string;

  @IsString()
  @ApiProperty({ description: '기타사항' })
  etc: string;

  @IsNumber()
  @ApiProperty({ description: '비밀번호' })
  password: number;

  @IsString()
  @ApiProperty({
    description: '시간',
    format: 'time',
    type: 'string',
  })
  time: string;

  @IsString()
  @ApiProperty({
    description: '날짜',
    format: 'date',
    type: 'string',
  })
  date: string;
}
