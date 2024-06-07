import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RefreshTokenDto {
  @IsString()
  @ApiProperty({ description: '리프레쉬 토큰' })
  refreshToken: string;
}
