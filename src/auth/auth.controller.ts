import {
  Body,
  Controller,
  Get,
  Post,
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
        res.setHeader('x-access-token', newTokens.accessToken);
        res.setHeader('x-refresh-token', newTokens.refreshToken);
        return res.json({ accessToken: newTokens.accessToken });
      }
      throw error;
    }
  }
}
