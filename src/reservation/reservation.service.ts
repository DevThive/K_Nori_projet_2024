import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from 'src/entity/reservation.entity';
import { Repository, In, Between } from 'typeorm';
import { CreateReservationDto } from './dto/create-reservation';
import { UsersService } from 'src/users/users.service';
import { CheckReservationDto } from './dto/check-reservation';
import { UpdateReservationDto } from './dto/update-reservation';
import { Class } from 'src/entity/class.entity';
import { ClientType } from './types/client-type';
import { Invoice } from 'src/entity/invoice.entity';
import { Calendar } from 'src/entity/calendar.entity';
import { InvoiceItem } from 'src/entity/invoice-item.entity';
import { ApproveReservationDto } from './dto/approve-reservation';
import { SmsService } from 'src/sms/sms.service';

@Injectable()
export class ReservationService {
  constructor(
    private readonly userService: UsersService,
    private readonly smsService: SmsService,

    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
    @InjectRepository(Class)
    private classRepository: Repository<Class>,
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
    @InjectRepository(InvoiceItem)
    private readonly invoiceItemRepository: Repository<InvoiceItem>,
    @InjectRepository(Calendar)
    private readonly calendarRepository: Repository<Calendar>,
  ) {}

  //클래스 예약
  async classreservation(
    createReservationDto: CreateReservationDto,
    classId: number,
  ) {
    const Class = await this.classRepository.findOne({
      where: { id: classId },
    });
    if (!Class) {
      throw new NotFoundException('해당 클래스가 없습니다.');
    }

    // totalPeople이 20을 넘으면 ClientType을 Group으로 설정
    const clientType =
      createReservationDto.totalPeople > 20
        ? ClientType.Group
        : ClientType.Individual;

    const reservation = await this.reservationRepository.save({
      ...createReservationDto,
      class: Class,
      client_type: clientType,
    });

    return reservation;
  }

  //유저 본인 클래스 예약 조회(유저)
  async findclassbyphonenumber(classId: string, userPhone: string) {
    const reservations = await this.reservationRepository.findOne({
      where: { client_phonenumber: userPhone },
    });
    if (!reservations) {
      throw new NotFoundException('예약내역이 없습니다.');
    }
    return reservations;
  }

  //예약 전체 조회(관리자)
  async findallreservation(userId: number) {
    console.log('userId', userId);
    const user = await this.userService.findUserById(userId);

    if (user.role !== 1) {
      throw new BadRequestException('관리자만 조회가 가능합니다.');
    }

    const result = await this.reservationRepository.find({
      where: {
        state: In([0, 1]),
      },
      select: [
        'id',
        'totalPeople',
        'client_email',
        'client_name',
        'client_phonenumber',
        'client_type',
        'etc',
        'date',
        'time',
        'state',
        'etc',
      ],
    });

    return result;
  }

  //예약 전체 조회(관리자)
  async findsuccessreservation(userId: number) {
    console.log('userId', userId);
    const user = await this.userService.findUserById(userId);

    if (user.role !== 1) {
      throw new BadRequestException('관리자만 조회가 가능합니다.');
    }

    const result = await this.reservationRepository.find({
      where: {
        state: In([2]),
      },
      select: [
        'id',
        'totalPeople',
        'client_email',
        'client_name',
        'client_phonenumber',
        'client_type',
        'etc',
        'date',
        'time',
        'state',
        'etc',
      ],
    });

    return result;
  }

  //핸드폰번호로 예약조회
  async findbyphonenumber(phonenumber: string) {
    const result = await this.reservationRepository.find({
      where: { client_phonenumber: phonenumber },
    });

    return result;
  }

  //클래스별 예약 전체 조회(관리자)
  async findreservationsbyclass(classId: number, userId: number) {
    const user = await this.userService.findUserById(userId);

    if (user.role !== 1) {
      throw new BadRequestException('관리자만 조회가 가능합니다.');
    }

    const result = await this.reservationRepository.find({
      where: { id: classId },
      select: [
        'totalPeople',
        'client_email',
        'client_name',
        'client_phonenumber',
        'client_type',
        'etc',
        'date',
        'time',
      ],
      // relations: { user: true },
    });

    return result;
  }

  //클래스 예약수정
  async updatereservation(
    checkReservationDto: CheckReservationDto,
    updateReservationDto: UpdateReservationDto,
    reservationId: number,
  ) {
    const reservation = await this.findreservationbyid(reservationId);
    if (!reservation) {
      throw new BadRequestException('해당 예약내역이 존재하지 않습니다.');
    }

    //사용자 핸드폰번호가 일치하는지 확인
    if (
      reservation.client_phonenumber !== checkReservationDto.client_phonenumber
    ) {
      throw new ForbiddenException('핸드폰번호가 일치하지 않습니다.');
    }

    // totalPeople이 20을 넘으면 ClientType을 Group으로 설정
    const clientType =
      updateReservationDto.totalPeople > 20
        ? ClientType.Group
        : ClientType.Individual;

    const updatedreservation = await this.reservationRepository.update(
      { id: reservationId },
      { ...updateReservationDto, client_type: clientType },
    );

    return updatedreservation;
  }

  async findreservationbyid(id: number) {
    return await this.reservationRepository.findOne({
      where: { id: id },
      relations: ['class', 'invoice', 'calendar'],
    });
  }

  //이전 예약 상태 변경
  async approvesuccessreservation(
    userId: number,
    approveReservationDto: ApproveReservationDto,
    reservationId: number,
  ) {
    const user = await this.userService.findUserById(userId);

    if (user.role !== 1) {
      throw new BadRequestException('관리자만 수정 및 삭제가 가능합니다.');
    }
    const reservation = await this.findreservationbyid(reservationId);
    if (!reservation) {
      throw new BadRequestException('해당 예약내역이 존재하지 않습니다.');
    }

    const classId = reservation.class.id;

    const Class = await this.classRepository.findOne({
      where: { id: classId },
    });
    if (!Class) {
      throw new NotFoundException('해당 클래스가 없습니다.');
    }

    if (approveReservationDto.state === reservation.state) {
      throw new BadRequestException('바뀐 내용이 없습니다.');
    }

    const result = await this.reservationRepository.update(reservationId, {
      ...approveReservationDto,
    });

    return result;
  }

  //예약 승인처리
  async approvereservation(
    userId: number,
    approveReservationDto: ApproveReservationDto,
    reservationId: number,
  ) {
    const user = await this.userService.findUserById(userId);

    if (user.role !== 1) {
      throw new BadRequestException('관리자만 수정 및 삭제가 가능합니다.');
    }
    const reservation = await this.findreservationbyid(reservationId);
    if (!reservation) {
      throw new BadRequestException('해당 예약내역이 존재하지 않습니다.');
    }

    const classId = reservation.class.id;

    const Class = await this.classRepository.findOne({
      where: { id: classId },
    });
    if (!Class) {
      throw new NotFoundException('해당 클래스가 없습니다.');
    }

    if (approveReservationDto.state === reservation.state) {
      throw new BadRequestException('바뀐 내용이 없습니다.');
    }

    const result = await this.reservationRepository.update(reservationId, {
      ...approveReservationDto,
    });

    // 알림톡 구매자명과 상품명 설정
    const buyerName = reservation.client_name;
    const classTitle = Class.title;
    const from = this.smsService.getFromPhoneNumber();
    const to = reservation.client_phonenumber;
    const url = 'www.knori.or.kr/';
    const totalPeople = reservation.totalPeople.toString();
    const date = reservation.date.toLocaleString();
    const time = reservation.time.toLocaleString();

    if (approveReservationDto.state === 0) {
      // 예약 취소

      if (reservation.invoice) {
        await this.invoiceRepository.remove(reservation.invoice);
      }
      if (reservation.calendar) {
        await this.calendarRepository.remove(reservation.calendar);
      }
      await this.reservationRepository.save(reservation);
      await this.reservationRepository.update(reservationId, { state: 0 });

      const templateId = 'KA01TP2405030940220466fA6dv2lF6x';
      // await this.smsService.sendMMS(
      //   to,
      //   from,
      //   buyerName,
      //   url,
      //   classTitle,
      //   totalPeople,
      //   date,
      //   time,
      //   templateId,
      // );
    } else if (approveReservationDto.state === 1) {
      // 예약 승인

      const invoiceData = {
        issuedDate: new Date(),
        companyEmail: reservation.client_email,
        contact: reservation.client_phonenumber,
        name: reservation.client_name,
        service: Class.title,
        totalPeople: reservation.totalPeople,
        company: reservation.agency,
      };

      const invoice = this.invoiceRepository.create(invoiceData);
      invoice.reservation = reservation; // Reservation과의 관계 설정

      await this.invoiceRepository.save(invoice);

      const calendarData = {
        title: reservation.client_name,
        class: Class.title,
        caledartype: 0,
        start: reservation.date,
        end: reservation.date,
        allDay: Class.time === '풀타임' ? true : false,
      };
      const calendar = await this.calendarRepository.create(calendarData);
      calendar.reservation = reservation;

      await this.calendarRepository.save(calendar);

      const invoiceItemData = {
        className: Class.title,
        service: Class.title,
        people: reservation.totalPeople,
        time: Class.time,
      };
      const invoiceItem =
        await this.invoiceItemRepository.create(invoiceItemData);
      invoiceItem.invoice = invoice;

      await this.invoiceItemRepository.save(invoiceItem);

      const templateId = 'KA01TP2405030935577648jHHuySDCMv';
      // await this.smsService.sendMMS(
      //   to,
      //   from,
      //   buyerName,
      //   url,
      //   classTitle,
      //   totalPeople,
      //   date,
      //   time,
      //   templateId,
      // );
    }
    return result;
  }

  //예약 취소(유저)
  async deletereservation(
    checkReservationDto: CheckReservationDto,
    reservationId: number,
  ) {
    const reservation = await this.findreservationbyid(reservationId);
    if (!reservation) {
      throw new BadRequestException('해당 예약내역이 존재하지 않습니다.');
    }

    //사용자 핸드폰번호가 일치하는지 확인
    if (
      reservation.client_phonenumber !== checkReservationDto.client_phonenumber
    ) {
      throw new ForbiddenException('핸드폰번호가 일치하지 않습니다.');
    }

    const result = await this.reservationRepository.delete({
      id: reservationId,
    });

    return result;
  }

  //예약 취소(어드민)
  async admindelete(userId: number, reservationId: number) {
    const user = await this.userService.findUserById(userId);

    if (user.role !== 1) {
      throw new BadRequestException('관리자만 예약취소가 가능합니다.');
    }
    const reservation = await this.findreservationbyid(reservationId);
    if (!reservation) {
      throw new BadRequestException('해당 예약내역이 존재하지 않습니다.');
    }

    const result = await this.reservationRepository.delete({
      id: reservationId,
    });

    return result;
  }

  //연도별 예약조회
  async findreservationbyyear(userId: number, year: number) {
    const user = await this.userService.findUserById(userId);

    if (user.role !== 1) {
      throw new BadRequestException('관리자만 조회가 가능합니다.');
    }
    const formattedYear = year.toString(); // 연도를 문자열로 변환
    const startDate = new Date(`${formattedYear}-01-01`); // 해당 연도의 시작일
    const endDate = new Date(`${formattedYear}-12-31`); // 해당 연도의 종료일

    const result = await this.reservationRepository.count({
      where: {
        date: Between(startDate, endDate), // startDate부터 endDate까지의 범위에 해당하는 데이터만 검색
      },
    });

    return result;
  }

  //연도별 예약 완료 건수 조회
  async findcompletedreservation(userId: number, year: number) {
    const user = await this.userService.findUserById(userId);

    if (user.role !== 1) {
      throw new BadRequestException('관리자만 조회가 가능합니다.');
    }
    const formattedYear = year.toString(); // 연도를 문자열로 변환
    const startDate = new Date(`${formattedYear}-01-01`); // 해당 연도의 시작일
    const endDate = new Date(`${formattedYear}-12-31`); // 해당 연도의 종료일

    const result = await this.reservationRepository.count({
      where: {
        state: 2,
        date: Between(startDate, endDate),
      },
    });

    return result;
  }

  //한달예상매출액(한달매출조회)
  async findmonthlycost(userId: number, year: number, month: number) {
    const user = await this.userService.findUserById(userId);

    if (user.role !== 1) {
      throw new BadRequestException('관리자만 조회가 가능합니다.');
    }

    // 연도와 월을 문자열로 변환
    const formattedYear = year.toString();
    const formattedMonth = month.toString().padStart(2, '0'); // 월이 한 자리 수인 경우 앞에 0을 추가하여 두 자리로 만듦

    // 시작일과 종료일 생성
    const startDate = new Date(`${formattedYear}-${formattedMonth}-01`);
    const endDate = new Date(
      new Date(startDate).setMonth(startDate.getMonth() + 1),
    ); // 다음 달의 시작일

    // 해당 월의 예약 완료 건수 조회
    const reservations = await this.reservationRepository.find({
      where: {
        state: 2,
        date: Between(startDate, endDate),
      },
      select: ['totalPeople'],
    });

    // 예약된 총 인원 계산
    const totalPeople = reservations.reduce(
      (acc, cur) => acc + cur.totalPeople,
      0,
    );

    // 총 매출액 계산
    const totalRevenue = totalPeople * 18000;

    return totalRevenue;
  }

  //이번해매출수익액
  async findyearlycost(userId: number, year: number) {
    const user = await this.userService.findUserById(userId);

    if (user.role !== 1) {
      throw new BadRequestException('관리자만 조회가 가능합니다.');
    }
    const formattedYear = year.toString(); // 연도를 문자열로 변환
    const startDate = new Date(`${formattedYear}-01-01`); // 해당 연도의 시작일
    const endDate = new Date(`${formattedYear}-12-31`); // 해당 연도의 종료일

    const result = await this.reservationRepository.find({
      where: {
        state: 2,
        date: Between(startDate, endDate),
      },
    });

    let totalPeople = 0;
    result.forEach((reservation) => {
      totalPeople += reservation.totalPeople;
    });

    const totalRevenue = totalPeople * 18000;

    return totalRevenue;
  }

  // 특정 날짜 예약 건수 조회(일일 예약건수 조회)
  async findCompletedReservationByDate(userId: number, date: string) {
    const user = await this.userService.findUserById(userId);

    if (user.role !== 1) {
      throw new BadRequestException('관리자만 조회가 가능합니다.');
    }

    const selectedDate = new Date(date);
    const startDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      0,
      0,
      0,
    );
    const endDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      23,
      59,
      59,
    );

    const reservationCount = await this.reservationRepository.count({
      where: {
        state: 2,
        date: Between(startDate, endDate),
      },
    });

    return { date, reservationCount };
  }

  // 이번 주 일주일간의 예약 건수 및 오늘의 예약 건수 조회
  //한국시간대 변경 전
  async findCompletedReservationByWeek(userId: number) {
    const user = await this.userService.findUserById(userId);

    if (user.role !== 1) {
      throw new BadRequestException('관리자만 조회가 가능합니다.');
    }

    // 이번 주의 시작일과 종료일 계산 (월요일부터 시작)
    const currentDate = new Date();
    const currentDay = currentDate.getDay(); // 오늘의 요일 (0: 일요일, 1: 월요일, ..., 6: 토요일)
    const startOfWeek = new Date(currentDate); // 이번 주의 시작일
    const mondayOffset = currentDay === 0 ? 6 : currentDay - 1; // 월요일이 아니면 이전 주의 월요일까지의 날짜 수 계산
    startOfWeek.setDate(currentDate.getDate() - mondayOffset); // 이번 주의 첫 번째 날(월요일)
    const endOfWeek = new Date(startOfWeek); // 이번 주의 마지막 날(일요일)
    endOfWeek.setDate(startOfWeek.getDate() + 6); // 이번 주의 마지막 날(일요일)

    console.log(`오늘 날짜: ${currentDate.toLocaleDateString()}`);
    console.log(
      `이번 주 일주일간의 기간: ${startOfWeek.toLocaleDateString()} ~ ${endOfWeek.toLocaleDateString()}`,
    );

    const weeklyBookings = [];
    let todayBookings = 0;
    // 이번 주 일주일간 각 날짜별 예약 건수 조회
    for (let i = 0; i < 7; i++) {
      const startDate = new Date(startOfWeek);
      startDate.setDate(startOfWeek.getDate() + i);
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 1); // 해당 날짜의 다음 날까지

      const reservationCount = await this.reservationRepository.count({
        where: {
          state: 2,
          date: Between(startDate, endDate),
        },
      });

      if (i === currentDay) {
        todayBookings = reservationCount;
      } else {
        weeklyBookings.push(reservationCount);
      }
    }

    return { weeklyBookings, todayBookings };
  }

  // //일주일 매출수익액
  // async findWeeklyRevenue(userId: number, year: number, weekNumber: number) {
  //   const user = await this.userService.findUserById(userId);

  //   if (user.role !== 1) {
  //     throw new BadRequestException('관리자만 조회가 가능합니다.');
  //   }

  //   const startDate = new Date(year, 0, 1 + (weekNumber - 1) * 7);
  //   const endDate = new Date(year, 0, 1 + weekNumber * 7);
  //   const reservations = await this.reservationRepository.find({
  //     where: {
  //       date: Between(startDate, endDate),
  //       state: 2, // 예약 완료 상태일 경우에만 계산
  //     },
  //   });

  //   let totalRevenue = 0;
  //   reservations.forEach((reservation) => {
  //     totalRevenue += reservation.totalPeople * 18000;
  //   });

  //   return totalRevenue;
  // }
}
