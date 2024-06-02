import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Redirect,
  Req,
  Res,
  UnauthorizedException,
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
import { loginGoogleDto } from 'src/users/dto/login-google.dto';

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

  // @ApiBearerAuth('accessToken')
  // @UseGuards(accessTokenGuard)
  // // @UseGuards(AuthGuard('google'))
  // @Get('me')
  // async authme(@UserId() userId: number) {
  //   return await this.authService.authme(userId);
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
    const user = req.user;
    const googleLogin = await this.authService.googlelogin(user.email);

    // 사용자 정보를 UsersService를 통해 생성 또는 업데이트
    const createUserDto: loginGoogleDto = {
      email: user.email,
      googleId: user.googleId,
      nickname: user.lastName + user.firstName,
      photo: user.photo,
      googleRefreshToken: user.refreshToken,
      googleAccessToken: googleLogin.accessToken, // AccessToken 추가
      googleAccessTokenExpires: new Date(
        Date.now() + 3600 * 1000, // expires_in 대신 1시간 (3600초)으로 설정
      ), // AccessToken 만료 시간 추가
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

  @ApiBearerAuth('accessToken')
  @UseGuards(accessTokenGuard)
  @Get('me')
  async authme(@Req() req, @UserId() userId: number, @Res() res) {
    const token = req.headers.authorization.split(' ')[1];
    try {
      const user = await this.authService.validateAccessToken(token);
      return res.json(user);
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        const refreshToken = req.headers['x-refresh-token'];
        if (!refreshToken) {
          throw new UnauthorizedException('Refresh token is missing');
        }

        const newTokens = await this.authService.refreshToken(refreshToken);
        res.setHeader('x-access-token', newTokens.accessToken);
        res.setHeader('x-refresh-token', newTokens.refreshToken);
        return res.json({ accessToken: newTokens.accessToken });
      }
      throw error;
    }
  }

  // @Get('me')
  // @UseGuards(accessTokenGuard)
  // async getMe(@Req() req) {
  //   const user = await this.usersService.findUserById(req.user.id);

  //   if (
  //     user &&
  //     this.usersService.isAccessTokenExpired(user.googleAccessTokenExpires)
  //   ) {
  //     const tokenData = await this.usersService.refreshGoogleAccessToken(
  //       user.googleRefreshToken,
  //     );
  //     await this.usersService.updateAccessToken(user.id, {
  //       googleAccessToken: tokenData.access_token,
  //       googleAccessTokenExpires: new Date(
  //         Date.now() + tokenData.expires_in * 1000,
  //       ),
  //     });

  //     user.googleAccessToken = tokenData.access_token;
  //     user.googleAccessTokenExpires = new Date(
  //       Date.now() + tokenData.expires_in * 1000,
  //     );
  //   }

  //   return user;
  // }
}
