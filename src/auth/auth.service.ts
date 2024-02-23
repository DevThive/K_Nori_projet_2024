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
  /// 유저 회원가입
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

  /// 로그인
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

    //TODO: 함수로 따로 빼기
    const accessToken = this.generateAccessToken(user.id, user.nickname);
    const refreshToken = this.generateRefreshToken(user.id);

    await this.userService.update(user.id, {
      currentRefreshToken: refreshToken,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  /// 토큰 재발급
  async refresh(id: number) {
    const user = await this.userService.findUserById(id);

    const accessToken = this.generateAccessToken(id, user.nickname);

    return accessToken;
  }

  /// 로그아웃
  async logout(id: number) {
    await this.userService.update(id, {
      currentRefreshToken: null,
    });

    return true;
  }

  /// access 토큰 발급 (private)
  private generateAccessToken(id: number, name: string) {
    const payload = { userId: id, userName: name };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: this.configService.get<string>('JWT_ACCESS_TOKEN_EXP'),
    });

    return accessToken;
  }

  /// refresh 토큰 발급 (private)
  private generateRefreshToken(id: number) {
    const payload = { userId: id };

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_TOKEN_EXP'),
    });

    return refreshToken;
  }
}
