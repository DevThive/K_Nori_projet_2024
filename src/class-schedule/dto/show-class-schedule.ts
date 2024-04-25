import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class ShowClassScheduleDto {
  @IsNumber()
  @ApiProperty({ description: '공개&비공개', default: 0 })
  state: number;
}
