import { IsArray, IsString } from 'class-validator';
import { CreateClassDto } from './create-class';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateClassDto extends CreateClassDto {
  @IsArray()
  @IsString({ each: true }) // 배열 각각 요소가 문자열인지 확인
  @ApiProperty({ type: [String], description: '클래스 스케줄' })
  schedules: string[];
}
