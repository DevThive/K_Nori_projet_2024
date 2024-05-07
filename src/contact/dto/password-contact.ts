import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ContactPasswordDto {
  @IsString()
  @ApiProperty({ description: '비밀번호' })
  password: string;
}
