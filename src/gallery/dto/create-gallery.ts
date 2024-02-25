import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';

export class CreateGalleryDto {
  @IsString()
  @ApiProperty({ description: '사진' })
  photo: string;

  @IsString()
  @ApiProperty({ description: '내용' })
  content: string;

  @IsDate()
  @ApiProperty({
    description: '날짜',
    // format: 'date',
  })
  date: Date;
}
