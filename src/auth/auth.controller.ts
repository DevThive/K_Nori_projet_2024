import {
  Body,
  Controller,
  Get,
  Post,
  Query,
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
import { UsersService } from 'src/users/users.service';
import { AuthGuard } from '@nestjs/passport';

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
  @Get('me')
  async authme(@Req() req, @UserId() userId: number, @Res() res) {
    const token = req.headers.authorization.split(' ')[1];
    try {
      const decodedToken = await this.authService.validateAccessToken(token);
      const user = await this.usersService.findUserById(decodedToken.userId);
      return res.json(user);
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        const refreshToken = req.headers['x-refresh-token'];
        const googleRefreshToken = req.headers['x-google-refresh-token'];
        if (!refreshToken && !googleRefreshToken) {
          throw new UnauthorizedException('Refresh token is missing');
        }
        let newAccessToken: string;
        let newRefreshToken: string;
        const expiresIn = 3600; // 1시간 * 60분 * 60초
        if (googleRefreshToken) {
          const newGoogleTokens =
            await this.authService.refresh(googleRefreshToken);
          const user = await this.usersService.findUserById(userId);
          user.googleAccessToken = newGoogleTokens.accessToken;
          user.googleAccessTokenExpires = new Date(
            Date.now() + expiresIn * 1000,
          );
          await this.usersService.update(user.id, user);
          newAccessToken = newGoogleTokens.accessToken;
          res.setHeader('x-google-access-token', newGoogleTokens.accessToken);
        }
        if (refreshToken) {
          const newTokens = await this.authService.refresh(refreshToken);
          newAccessToken = newTokens.accessToken;
          newRefreshToken = newTokens.refreshToken;
          res.setHeader('x-access-token', newAccessToken);
          res.setHeader('x-refresh-token', newRefreshToken);
        }
        const decodedToken =
          await this.authService.validateAccessToken(newAccessToken);
        const user = await this.usersService.findUserById(decodedToken.userId);
        return res.json({ accessToken: newAccessToken, user });
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
    // 여기에서 @Res()를 추가했습니다.
    // 사용자 정보와 토큰은 req.user에 저장됨.
    const user = req.user;

    // 사용자 정보를 UsersService를 통해 생성 또는 업데이트
    const createUserDto = {
      email: user.email,
      googleId: user.googleId,
      nickname: user.lastName + user.firstName,
      photo: user.photo,
      googleRefreshToken: user.refreshToken,
      googleAccessToken: user.accessToken,
      googleAccessTokenExpires: new Date(Date.now() + 3600 * 1000), // Assuming access token expires in 1 hour
    };

    const savedUser =
      await this.usersService.createOrUpdateGoogleUser(createUserDto);

    console.log(savedUser);

    const googleLogin = await this.authService.googlelogin(user.email);

    // 프론트엔드 URL을 ConfigService를 통해 가져옴.
    const frontendUrl = this.configService.get<string>('FRONTEND_URL');

    // 프론트엔드로 리다이렉트하면서 토큰을 쿼리 파라미터로 전달
    return res.redirect(
      `${frontendUrl}/login/AuthRedirect?token=${googleLogin.accessToken}`,
    );
  }
}
