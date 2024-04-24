import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateContactDto {
  @IsString()
  @ApiProperty({ description: '문의 제목' })
  content_title: string;

  @IsString()
  @ApiProperty({ description: '문의 내용' })
  content: string;

  @IsString()
  @ApiProperty({ description: '문의자 이름' })
  user_name: string;

  @IsString()
  @ApiProperty({ description: '문의자 핸드폰 번호' })
  user_phone: string;

  @IsString()
  @ApiProperty({ description: '문의자 이메일' })
  user_email: string;

  @IsNumber()
  @ApiProperty({ description: '문의자 이메일' })
  public: number;
}
