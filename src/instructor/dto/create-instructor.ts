import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';

export class CreateInstructorDto {
  // @IsString()
  // @ApiProperty({ description: '사진', type: 'string', format: 'binary' })
  // photo: string;
  @IsString()
  @ApiProperty({ description: '강사이름' })
  name: string;

  @IsString()
  @ApiProperty({ description: '소개' })
  introduction: string;
}
