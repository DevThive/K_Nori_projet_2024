import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';

export class CreateClassDto {
  // @IsString()
  // @ApiProperty({ description: '사진', type: 'string', format: 'binary' })
  // photo: string;

  @IsString()
  @ApiProperty({ description: '클래스 제목' })
  title: string;

  @IsString()
  @ApiProperty({ description: '내용' })
  content: string;

  @IsString()
  @ApiProperty({ description: '소요시간' })
  time: string;

  // @IsString()
  // @ApiProperty({
  //   description: '시간',
  //   format: 'time',
  //   type: 'string',
  // })
  // time: string;

  // @IsString()
  // @ApiProperty({
  //   description: '날짜',
  //   format: 'date',
  //   type: 'string',
  // })
  // date: string;
}
