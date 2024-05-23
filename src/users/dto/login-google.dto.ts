import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class loginGoogleDto {
  @IsString()
  @ApiProperty({ description: '이메일' })
  email: string;

  @IsString()
  @ApiProperty({ description: '구글 아이디' })
  googleId: string;

  @IsString()
  @ApiProperty({ description: '이름' })
  nickname: string;

  @IsString()
  @ApiProperty({ description: '사진' })
  photo: string;

  @IsString()
  @ApiProperty({ description: 'refreshToken' })
  currentRefreshToken: string;
}
