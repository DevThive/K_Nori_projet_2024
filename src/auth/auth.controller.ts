import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Redirect,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SignupUserDto } from './dto/signup-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { accessTokenGuard } from './guard/access-token.guard';
import { UserId } from './decorators/userId.decorator';
import { AuthGuard } from '@nestjs/passport';
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

  @ApiBearerAuth('accessToken')
  @UseGuards(accessTokenGuard)
  @Get('me')
  async authme(@UserId() userId: number) {
    return await this.authService.authme(userId);
  }

  // 사용자를 Google OAuth2 인증 페이지로 리디렉션
  // @Get('/google')
  // @Redirect()
  // async googleAuth(@Res() res) {
  //   const authUrl = this.authService.getAuthenticationUrl();
  //   // Google 로그인 페이지로 리다이렉트 됩니다.
  //   return { url: authUrl };
  // }

  // @Get('google/oauth2callback')
  // // @UseGuards(AuthGuard('google'))
  // async googleAuthRedirect(@Query('code') code: string) {
  //   // This method will be called when the Google login is successfully completed.
  //   // The user information is stored in req.user.
  //   const user = await this.authService.getOAuth2Client(code);

  //   // console.log(req);
  //   return user; // Return the user information or process it as desired.
  // }

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
    // GoogleStrategy에 의해 처리
  }

  @Get('google/oauth2callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req) {
    // 사용자 정보와 토큰은 req.user에 저장됨
    console.log(req);
    return req.user;
  }
}
