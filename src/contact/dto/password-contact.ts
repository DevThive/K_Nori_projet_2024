import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class ContactPasswordDto {
  @IsNumber()
  @ApiProperty({ description: '비밀번호' })
  password: number;
}
