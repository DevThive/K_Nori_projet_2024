import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateReservationDto {
  @IsDate()
  @ApiProperty({ description: '날짜' })
  date: Date;

  @IsString()
  @ApiProperty({ description: '시간' })
  time: string;

  @IsNumber()
  @ApiProperty({ description: '총인원' })
  totalPeople: number;
}
