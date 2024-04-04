import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDate, IsNumber, IsString } from 'class-validator';

export class UpdateClassScheduleDto {
  @IsString({ each: true })
  @IsArray()
  @ApiProperty({ description: '스케줄', type: [String] })
  class_schedules: string[];

  @IsNumber()
  @ApiProperty({ description: '클래스 ID' })
  classId: number;
}
