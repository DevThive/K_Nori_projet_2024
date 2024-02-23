import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import { SignupUserDto } from './dto/signup-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
// import { SignupAdminDto } from './dto/signup-admin.dto';

@ApiTags('로그인&회원가입')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('signup')
  signup(@Body() singupUserDto: SignupUserDto) {
    return this.authService.signup(singupUserDto);
  }

  //admin 로그인은 실질적으로 ui에서 구현될일은 없음
  //   @Post('signup/admin')
  //   adminsignup(@Body() signupadminDto: SignupAdminDto) {
  //     return this.authService.adminsignup(signupadminDto);
  //   }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }
}
