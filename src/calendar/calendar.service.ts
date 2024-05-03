import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Calendar } from 'src/entity/calendar.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateCalendarDto } from './dto/create-calendar';
import { UpdateCalendarDto } from './dto/update-calendar';
import { In } from 'typeorm';
import { CalendarType } from './types/calendar-type';
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
    console.log(
      'createCalendarDto.calendartype',
      createCalendarDto.calendartype,
    );
    // let type;

    // if (createCalendarDto.calendartype === 'Bussiness') {
    //   type = CalendarType.Bussiness;
    // } else if (createCalendarDto.calendartype === 'Personal') {
    //   type = CalendarType.Personal;
    // } else if (createCalendarDto.calendartype === 'Holiday') {
    //   type = CalendarType.Holiday;
    // }
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
      select: ['title', 'content', 'extendedProps', 'start', 'end', 'allday'],
    });

    return result;
  }

  // 캘린더에 따라 조회
  async findCalendarsByList(userId: number, calendars: string[]) {
    const user = await this.userService.findUserById(userId);

    if (user.role !== 1) {
      throw new BadRequestException('관리자만 조회가 가능합니다.');
    }

    // calendarRepository의 find 메소드에 where 조건을 추가하여
    // extendedProps.calendar 값이 calendars 배열에 포함된 캘린더만 조회
    const result = await this.calendarRepository.find({
      where: {
        extendedProps: {
          calendar: In(calendars),
        },
      },
    });

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
