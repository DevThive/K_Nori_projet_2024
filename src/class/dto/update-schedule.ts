import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDate, IsNumber, IsString } from 'class-validator';

export class UpdateClassScheduleDto {
  @IsString({ each: true })
  @IsArray()
  @ApiProperty({ description: '스케줄', type: [String] })
  class_schedules: string[];
}
