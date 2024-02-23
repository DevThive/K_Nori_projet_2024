import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CreateUserDto } from './../../users/dto/create-user.dto';

export class SignupUserDto extends CreateUserDto {
  @IsString()
  @ApiProperty({ description: '비밀번호 확인' })
  checkPassword: string;
}
