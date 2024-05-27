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
import { UsersService } from 'src/users/users.service';
// import { SignupAdminDto } from './dto/signup-admin.dto';

@ApiTags('로그인&회원가입')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
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
  // @UseGuards(AuthGuard('google'))
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

  @Get('profile')
  @UseGuards(AuthGuard('google'))
  async getProfile(@Req() req) {
    return req.user; // Passport는 사용자 정보를 req.user에 저장합니다.
  }

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
    // GoogleStrategy에 의해 처리
  }

  @Get('google/oauth2callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    // 여기에서 @Res()를 추가했습니다.
    // 사용자 정보와 토큰은 req.user에 저장됨.
    const user = req.user;
    const googleLogin = await this.authService.googlelogin(user.email);

    // 사용자 정보를 UsersService를 통해 생성 또는 업데이트
    const createUserDto = {
      email: user.email,
      googleId: user.googleId,
      nickname: user.lastName + user.firstName,
      photo: user.photo,
      googleRefreshToken: user.refreshToken,
      currentRefreshToken: googleLogin.refreshToken,
    };

    const savedUser =
      await this.usersService.createOrUpdateGoogleUser(createUserDto);

    console.log(savedUser);

    // 프론트엔드 URL을 ConfigService를 통해 가져옴.
    const frontendUrl = this.configService.get<string>('FRONTEND_URL');

    // 프론트엔드로 리다이렉트하면서 토큰을 쿼리 파라미터로 전달
    return res.redirect(
      `${frontendUrl}/login/AuthRedirect?token=${googleLogin.accessToken}`,
    );
  }
}
