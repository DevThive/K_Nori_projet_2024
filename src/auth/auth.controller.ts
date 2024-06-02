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

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
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

        const newTokens = await this.authService.refresh(refreshToken);
        res.setHeader('x-access-token', newTokens.access_token);
        res.setHeader('x-refresh-token', newTokens.refresh_token);
        return res.json({ accessToken: newTokens.access_token });
      }
      throw error;
    }
  }

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

    const createUserDto: loginGoogleDto = {
      email: user.email,
      googleId: user.googleId,
      nickname: user.lastName + user.firstName,
      photo: user.photo,
      googleRefreshToken: user.refreshToken,
      googleAccessToken: googleLogin.access_token,
      googleAccessTokenExpires: new Date(Date.now() + 3600 * 1000),
    };

    const savedUser =
      await this.usersService.createOrUpdateGoogleUser(createUserDto);

    console.log(savedUser);

    const frontendUrl = this.configService.get<string>('FRONTEND_URL');

    return res.redirect(
      `${frontendUrl}/login/AuthRedirect?token=${googleLogin.access_token}`,
    );
  }
}
