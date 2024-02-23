import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateNoticeDto } from './dto/create-notice';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Notice } from 'src/entity/notice.entity';
import { UpdateNoticeDto } from './dto/update-notice';
import { HideNoticeDto } from './dto/hide-notice';

@Injectable()
export class NoticeService {
  constructor(
    private readonly userService: UsersService,
    @InjectRepository(Notice)
    private noticesRepository: Repository<Notice>,
  ) {}

  //공지사항 등록
  async writennotice(createNoticedto: CreateNoticeDto, userId: number) {
    const user = await this.userService.findUserById(userId);

    if (user.role !== 1) {
      throw new BadRequestException('관리자만 작성이 가능합니다.');
    }

    const createnotice = await this.noticesRepository.save({
      ...createNoticedto,
      user: user,
    });

    return createnotice;
  }

  //공지사항 리스트
  async noticelist() {
    const notices = await this.noticesRepository.find({
      where: { state: 0 },
      select: ['content_name', 'content', 'createdAt'],
    });

    return notices;
  }

  //공지사항 비공개 처리
  async noticehide(
    userId: number,
    noticeid: number,
    hidenoticeDto: HideNoticeDto,
  ) {
    const user = await this.userService.findUserById(userId);

    if (user.role !== 1) {
      throw new BadRequestException('관리자만 수정 및 삭제가 가능합니다.');
    }

    const result = await this.noticesRepository.update(noticeid, {
      ...hidenoticeDto,
    });

    return result;
  }

  //공지사항 삭제
  async deletenotice(userId: number, noticeid: number) {
    const user = await this.userService.findUserById(userId);

    if (user.role !== 1) {
      throw new BadRequestException('관리자만 작성이 가능합니다.');
    }

    const result = await this.noticesRepository.delete({ id: noticeid });

    return result;
  }

  //공지사항 수정
  async updatenotice(
    userId: number,
    noticeid: number,
    updatenoticedto: UpdateNoticeDto,
  ) {
    const user = await this.userService.findUserById(userId);

    if (user.role !== 1) {
      throw new BadRequestException('관리자만 수정 및 삭제가 가능합니다.');
    }

    const notice = this.findnoticebyid(noticeid);

    if (!notice) {
      throw new BadRequestException('공지글을 확인해주세요');
    }

    await this.noticesRepository.update(
      {
        id: noticeid,
      },
      {
        ...updatenoticedto,
      },
    );
  }

  //공지사항 전체 조회(관리자)
  async findall(userId: number) {
    const user = await this.userService.findUserById(userId);

    if (user.role !== 1) {
      throw new BadRequestException('관리자만 수정 및 삭제가 가능합니다.');
    }
    const result = await this.noticesRepository.find({
      select: ['content_name', 'content', 'createdAt'],
      relations: { user: true },
    });

    return result;
  }

  async findnoticebyid(id: number) {
    return await this.noticesRepository.findOne({
      where: { id: id },
    });
  }
}
