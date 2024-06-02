import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';

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
  googleRefreshToken: string;

  @IsString()
  @ApiProperty({ description: 'accessToken' })
  googleAccessToken: string; // 추가된 부분

  @IsDate()
  @ApiProperty({ description: 'googleAccessTokenExpires' })
  googleAccessTokenExpires: Date;
}
