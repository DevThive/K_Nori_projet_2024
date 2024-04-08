import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsEnum, IsString } from 'class-validator';
import { CalendarType } from '../types/calendar-type';

export class CreateCalendarDto {
  @IsString()
  @ApiProperty({ description: '제목' })
  title: string;

  @IsString()
  @ApiProperty({ description: '내용' })
  content: string;

  @IsDate()
  @ApiProperty({ description: '시작날짜' })
  startdate: Date;

  @IsDate()
  @ApiProperty({ description: '끝나는날짜' })
  enddate: Date;

  @IsBoolean()
  @ApiProperty({ description: '풀타임 여부' })
  allday: boolean;

  @IsEnum(CalendarType)
  @ApiProperty({ description: '캘린더 타입' })
  calendartype: CalendarType;
}

// @IsDate()
// @ApiProperty({
//   description: '날짜',
// })
// date: Date;
