import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateClassScheduleDto {
  @ApiProperty({ description: '시간' })
  @IsString()
  time: string;
}
