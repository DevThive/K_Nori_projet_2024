import {
  BadRequestException,
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
import { Role } from './types/userRole.type';
import { format } from 'date-fns';
import { ApproveUserDto } from './dto/approve-user';
import axios from 'axios';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {}
  private async refreshGoogleAccessToken(refreshToken: string) {
    const clientId = this.configService.get<string>('GOOGLE_CLIENT_ID');
    const clientSecret = this.configService.get<string>('GOOGLE_CLIENT_SECRET');

    const params = new URLSearchParams();
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);
    params.append('refresh_token', refreshToken);
    params.append('grant_type', 'refresh_token');

    try {
      console.log('Sending request to Google OAuth token endpoint');
      const response = await axios.post(
        'https://oauth2.googleapis.com/token',
        params,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );
      console.log('Response received:', response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.response?.data);
      } else {
        console.error('Unexpected error:', error);
      }
      throw error;
    }
  }

  private isAccessTokenExpired(expiryDate: Date): boolean {
    return new Date() > new Date(expiryDate);
  }

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
    const { email, googleAccessTokenExpires, googleRefreshToken } = loginGoogle;

    let user = await this.userRepository.findOne({
      where: { email },
    });

    if (user) {
      if (this.isAccessTokenExpired(user.googleAccessTokenExpires)) {
        const tokenData =
          await this.refreshGoogleAccessToken(googleRefreshToken);
        loginGoogle.googleAccessToken = tokenData.access_token;
        loginGoogle.googleAccessTokenExpires = new Date(
          Date.now() + tokenData.expires_in * 1000,
        );
      }
      await this.userRepository.update(user.id, {
        ...loginGoogle,
      });
    } else {
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
        'googleRefreshToken',
        'googleAccessTokenExpires',
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

  // 유저정보 조회
  async userlist(userId: number) {
    const user = await this.findUserById(userId);

    if (user.role !== 1) {
      throw new BadRequestException('관리자만 수정이 가능합니다.');
    }

    const users = await this.userRepository.find();
    return users.map((user) => ({
      id: user.id,
      email: user.email,
      date: format(new Date(user.createdAt), 'yyyy-MM-dd'),
      role: user.role,
      name: user.nickname,
    }));
  }

  async approveUser(
    id: number,
    userId: number,
    approveUserDto: ApproveUserDto,
  ): Promise<User> {
    const adminuser = await this.findUserById(userId);

    if (adminuser.role !== 1) {
      throw new BadRequestException('관리자만 수정이 가능합니다.');
    }

    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error('유저를 찾을 수 없습니다.');
    }

    if (approveUserDto.state === 1) {
      user.role = Role.Admin;
    } else {
      user.role = Role.User;
    }
    return this.userRepository.save(user);
  }

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
}
