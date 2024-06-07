import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { SignupUserDto } from './dto/signup-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signup(singupUserDto: SignupUserDto) {
    const { checkPassword, ...createUserDto } = singupUserDto;

    if (createUserDto.password !== checkPassword) {
      throw new BadRequestException(
        '비밀번호와 확인 비밀번호가 일치하지 않습니다.',
      );
    }

    const saltRounds = +this.configService.get<number>('SALT_ROUNDS');
    const salt = await bcrypt.genSalt(saltRounds);

    const hashPassword = await bcrypt.hash(createUserDto.password, salt);

    const userId = await this.userService.create({
      ...createUserDto,
      password: hashPassword,
    });

    return userId;
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.userService.findUserByEmail(email);
    if (!user) {
      throw new NotFoundException('회원가입되지 않은 이메일입니다.');
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    }

    const accessToken = this.generateAccessToken(
      user.id,
      user.nickname,
      user.email,
    );
    const refreshToken = this.generateRefreshToken(user.id);

    await this.userService.update(user.id, {
      currentRefreshToken: refreshToken,
    });

    const response = {
      accessToken,
      // refreshToken,
      userData: { ...user, password: undefined },
    };
    return response;
  }

  async refresh(refreshToken: string) {
    try {
      const decoded = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      });

      const user = await this.userService.findUserById(decoded.userId);
      if (!user || user.currentRefreshToken !== refreshToken) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const newAccessToken = this.generateAccessToken(
        user.id,
        user.nickname,
        user.email,
      );
      const newRefreshToken = this.generateRefreshToken(user.id);

      await this.userService.update(user.id, {
        currentRefreshToken: newRefreshToken,
      });

      return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(id: number) {
    await this.userService.update(id, {
      currentRefreshToken: null,
    });

    return true;
  }

  async validateAccessToken(token: string): Promise<any> {
    try {
      return this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
      });
    } catch (e) {
      throw new UnauthorizedException('Invalid access token');
    }
  }

  private generateAccessToken(id: number, name: string, email: string) {
    const payload = { userId: id, userName: name, email: email };

    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: this.configService.get<string>('JWT_ACCESS_TOKEN_EXP'),
    });
  }

  private generateRefreshToken(id: number) {
    const payload = { userId: id };

    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_TOKEN_EXP'),
    });
  }

  async authme(userid: number) {
    const user = await this.userService.findUserById(userid);
    return user;
  }

  //구글 로그인
  async googlelogin(email: string) {
    const user = await this.userService.findUserByEmail(email);
    if (!user) {
      throw new NotFoundException('회원가입되지 않은 이메일입니다.');
    }
    const accessToken = this.generateAccessToken(
      user.id,
      user.nickname,
      user.email,
    );
    const refreshToken = this.generateRefreshToken(user.id);

    const response = {
      accessToken,
      refreshToken,
      // userData: { ...user, password: undefined },
    };

    return response;
  }
}
