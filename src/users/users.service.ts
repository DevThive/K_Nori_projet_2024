import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { loginGoogleDto } from './dto/login-google.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {}

  // async updateUserTokens(
  //   userId: number,
  //   tokenData: {
  //     googleAccessToken: string;
  //     googleRefreshToken: string;
  //     googleAccessTokenExpires: Date;
  //   },
  // ): Promise<void> {
  //   await this.userRepository.update(userId, {
  //     googleAccessToken: tokenData.googleAccessToken,
  //     googleRefreshToken: tokenData.googleRefreshToken,
  //     googleAccessTokenExpires: tokenData.googleAccessTokenExpires,
  //   });
  // }

  // async updateAccessToken(
  //   userId: number,
  //   tokenData: { googleAccessToken: string; googleAccessTokenExpires: Date },
  // ): Promise<void> {
  //   await this.userRepository.update(userId, {
  //     googleAccessToken: tokenData.googleAccessToken,
  //     googleAccessTokenExpires: tokenData.googleAccessTokenExpires,
  //   });
  // }

  //구글 로그인
  // Google 사용자 정보로 유저 생성 또는 업데이트
  async createOrUpdateGoogleUser(loginGoogle: loginGoogleDto) {
    const { email } = loginGoogle;

    let user = await this.userRepository.findOne({
      where: { email },
    });

    if (user) {
      // 이미 존재하는 이메일이면 Google ID와 사용자 정보 업데이트
      await this.userRepository.update(user.id, {
        ...loginGoogle,
      });
    } else {
      // 새 사용자 생성
      user = await this.userRepository.save({
        ...loginGoogle,
      });
    }

    return user;
  }

  //유저 회원가입
  async create(createUserDto: CreateUserDto) {
    const { email } = createUserDto;

    const isUser = await this.findUserByEmail(email);

    if (isUser) {
      throw new ConflictException('이미 존재하는 이메일입니다.');
    }

    const user = await this.userRepository.save(createUserDto);

    return user.id;
  }

  async findUserByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const isUser = await this.findUserById(id);

    if (!isUser) {
      throw new NotFoundException('존재하지 않는 사용자입니다.');
    }

    const result = await this.userRepository.update(
      {
        id,
      },
      {
        ...updateUserDto,
      },
    );

    return result;
  }

  async findUserById(id: number) {
    return await this.userRepository.findOne({
      where: { id },
      select: [
        'id',
        'email',
        'photo',
        'nickname',
        'createdAt',
        'updatedAt',
        'role',
      ],
    });
  }

  async findUserByEmailT(email: string) {
    return await this.userRepository.findOne({
      where: { email: email },
      select: [
        'id',
        'email',
        'photo',
        'nickname',
        'createdAt',
        'updatedAt',
        'role',
      ],
    });
  }
}
