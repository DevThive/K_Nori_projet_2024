import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Calendar } from 'src/entity/calendar.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateCalendarDto } from './dto/create-calendar';
import { UpdateCalendarDto } from './dto/update-calendar';

import { HideCalendarDto } from './dto/hide-calendar';

@Injectable()
export class CalendarService {
  constructor(
    private readonly userService: UsersService,
    @InjectRepository(Calendar)
    private readonly calendarRepository: Repository<Calendar>,
  ) {}

  //캘린더 생성
  async createcalendar(createCalendarDto: CreateCalendarDto, userId: number) {
    const user = await this.userService.findUserById(userId);

    if (user.role !== 1) {
      throw new BadRequestException('관리자만 생성이 가능합니다.');
    }

    const calendar = await this.calendarRepository.save({
      ...createCalendarDto,
    });

    return calendar;
  }
  //캘린더 상세조회
  async findcalendar(userId: number, calendarId: number) {
    const user = await this.userService.findUserById(userId);

    if (user.role !== 1) {
      throw new BadRequestException('관리자만 조회가 가능합니다.');
    }

    const result = await this.calendarRepository.find({
      where: { id: calendarId },
      select: [
        'title',
        'description',
        'extendedProps',
        'start',
        'end',
        'allDay',
      ],
    });

    return result;
  }

  // 캘린더에 따라 조회
  async findCalendarsByList(userId: number, calendars: string[] = []) {
    const user = await this.userService.findUserById(userId);

    if (user.role !== 1) {
      throw new BadRequestException('관리자만 조회가 가능합니다.');
    }

    // calendars가 undefined이거나 빈 배열일 경우 빈 배열을 반환
    if (!calendars || calendars.length === 0) {
      return [];
    }

    const result = await this.calendarRepository
      .createQueryBuilder('calendar')
      .where(
        "JSON_EXTRACT(calendar.extendedProps, '$.calendar') IN (:...calendars)",
        { calendars },
      )
      .getMany();

    return result;
  }

  //캘린더 전체조회
  // async findallcalendars(userId: number) {
  //   const user = await this.userService.findUserById(userId);

  //   if (user.role !== 1) {
  //     throw new BadRequestException('관리자만 조회가 가능합니다.');
  //   }

  //   const result = await this.calendarRepository.find();

  //   return result;
  // }

  //캘린더 자세히보기
  async calendarinfo(calendarId: number) {
    const calendar = this.findcalendarbyid(calendarId);
    if (!calendar) {
      throw new BadRequestException('해당 일정이 존재하지 않습니다.');
    }

    const calendarinfo = await this.calendarRepository.findOne({
      where: { id: calendarId },
    });

    return calendarinfo;
  }

  //캘린더 수정
  async updatecalendar(
    updateCalendarDto: UpdateCalendarDto,
    userId: number,
    calendarId: number,
  ) {
    const user = await this.userService.findUserById(userId);

    if (user.role !== 1) {
      throw new BadRequestException('관리자만 수정이 가능합니다.');
    }

    const calendar = this.findcalendarbyid(calendarId);
    if (!calendar) {
      throw new BadRequestException('해당 일정이 존재하지 않습니다.');
    }

    const updatedCalendar = await this.calendarRepository.update(
      { id: calendarId },
      { ...updateCalendarDto },
    );
    return updatedCalendar;
  }

  //켈린더 비공개
  async hidecalendar(
    hideCalendarDto: HideCalendarDto,
    userId: number,
    calendarId: number,
  ) {
    const user = await this.userService.findUserById(userId);
    if (user.role !== 1) {
      throw new BadRequestException('관리자만 비공개처리가 가능합니다.');
    }

    const result = await this.calendarRepository.update(calendarId, {
      ...hideCalendarDto,
    });
    return result;
  }

  //캘린더 삭제
  async deletecalendar(userId: number, calendarId: number) {
    const user = await this.userService.findUserById(userId);

    if (user.role !== 1) {
      throw new BadRequestException('관리자만 캘린더 삭제가 가능합니다.');
    }
    const calendar = this.findcalendarbyid(calendarId);
    if (!calendar) {
      throw new BadRequestException('해당 일정이 존재하지 않습니다.');
    }

    const result = await this.calendarRepository.delete({
      id: calendarId,
    });

    return result;
  }

  async findcalendarbyid(id: number) {
    return await this.calendarRepository.findOne({
      where: { id: id },
    });
  }
}
