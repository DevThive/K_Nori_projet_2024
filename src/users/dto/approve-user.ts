import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class ApproveUserDto {
  @IsNumber()
  @ApiProperty({ description: '승인/미승인' })
  state: number;
}
