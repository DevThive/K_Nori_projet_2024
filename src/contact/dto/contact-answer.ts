import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ContactAnswerDto {
  @IsString()
  @ApiProperty({ description: '문의 답변' })
  contact_answer: string;
}
