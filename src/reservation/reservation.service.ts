import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from 'src/entity/reservation.entity';
import { Repository, In } from 'typeorm';
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
import { CalendarService } from 'src/calendar/calendar.service';
import { InvoiceService } from 'src/invoice/invoice.service';

@Injectable()
export class ReservationService {
  constructor(
    private readonly userService: UsersService,

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

    const result = await this.reservationRepository.update(reservationId, {
      ...approveReservationDto,
    });
    if (approveReservationDto.state === 1) {
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
        allday: Class.time === '풀타임' ? true : false,
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
    } else if (approveReservationDto.state === 0) {
      if (reservation.invoice) {
        await this.invoiceRepository.remove(reservation.invoice);
      }
      if (reservation.calendar) {
        await this.calendarRepository.remove(reservation.calendar);
      }

      await this.reservationRepository.save(reservation);
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
}
