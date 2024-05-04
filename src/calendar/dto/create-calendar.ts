import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsString,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateCalendarDto {
  @IsString()
  @ApiProperty({ description: '제목' })
  title: string;

  @IsString()
  @ApiProperty({ description: '내용' })
  content: string;

  @IsDate()
  @ApiProperty({ description: '시작날짜' })
  start: Date;

  @IsDate()
  @ApiProperty({ description: '끝나는날짜' })
  end: Date;

  @IsBoolean()
  @ApiProperty({ description: '풀타임 여부' })
  allDay: boolean;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: '상태', required: false })
  state?: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: '분류', required: false })
  class?: string;

  // extendedProps는 JSON 객체이므로, DTO에서는 이를 직접 받아 처리할 수 있도록 합니다.
  // 실제 유효성 검증이 필요한 경우, 커스텀 데코레이터를 사용하거나 클래스를 따로 정의해야 합니다.
  @IsOptional()
  @ApiProperty({ description: '확장 속성', type: 'object', required: false })
  extendedProps?: {
    calendar: string;
  };
}
