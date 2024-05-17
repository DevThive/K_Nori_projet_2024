import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUpdatedContactDto {
  @IsString()
  @ApiProperty({ description: '수정문의 제목' })
  content_title: string;

  @IsString()
  @ApiProperty({ description: '수정문의 내용' })
  content: string;
}
