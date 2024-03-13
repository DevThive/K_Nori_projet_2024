import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateClassReviewDto {
  @IsString()
  @ApiProperty({ description: '리뷰 제목' })
  title: string;

  @IsString()
  @ApiProperty({ description: '리뷰 내용' })
  content: string;

  @IsString()
  @ApiProperty({ description: '핸드폰 번호' })
  phonenumber: string;
}
