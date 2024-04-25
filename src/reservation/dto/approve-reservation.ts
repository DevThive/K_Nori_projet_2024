import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString, Min, isNumber } from 'class-validator';

export class ApproveReservationDto {
  @IsNumber()
  @ApiProperty({ description: '승인/미승인' })
  state: number;
}
