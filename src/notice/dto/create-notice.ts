import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateNoticeDto {
  @IsString()
  @ApiProperty({ description: '제목' })
  content_name: string;

  @IsString()
  @ApiProperty({ description: '내용' })
  content: string;

  //   @IsString()
  //   @ApiProperty({ description: '사진' })
  //   photo: string;

  //   @IsString()
  //   @ApiProperty({ description: '핸드폰 번호' })
  //   phone: string;
}
