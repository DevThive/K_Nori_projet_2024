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

  @IsNumber()
  @ApiProperty({ description: '공개/비공개' })
  public: number;

  @IsString()
  @ApiProperty({ description: '비밀번호' })
  password: string;
}
