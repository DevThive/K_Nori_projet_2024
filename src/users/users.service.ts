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

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {}

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
}
