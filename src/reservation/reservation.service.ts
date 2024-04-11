import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from 'src/entity/reservation.entity';
import { Repository } from 'typeorm';
import { CreateReservationDto } from './dto/create-reservation';
import { UsersService } from 'src/users/users.service';
import { DeleteReservationDto } from './dto/delete-reservation';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UpdateReservationDto } from './dto/update-reservation';
import { Class } from 'src/entity/class.entity';
import { ClientType } from './types/client-type';
import { Invoice } from 'src/entity/invoice.entity';
import { Calendar } from 'src/entity/calendar.entity';

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

    const invoiceData = {
      issuedDate: new Date(),
      companyEmail: createReservationDto.client_email,
      contact: createReservationDto.client_phonenumber,
      name: createReservationDto.client_name,
      service: Class.title,
    };

    const invoice = this.invoiceRepository.create(invoiceData);
    invoice.reservation = reservation; // Reservation과의 관계 설정

    await this.invoiceRepository.save(invoice);

    const calendarData = {
      title: Class.title,
      caledartype: 0,
      start: createReservationDto.date,
      end: createReservationDto.date,
      allday: Class.time === '풀타임' ? true : false,
    };
    const calendar = await this.calendarRepository.create(calendarData);
    calendar.reservation = reservation;
    await this.calendarRepository.save(calendar);

    return reservation;
  }

  //유저 본인 클래스 예약 조회(유저)
  async findclassbyphonenumber(phonenumber: string) {
    const reservations = await this.reservationRepository.findOne({
      where: { client_phonenumber: phonenumber },
    });
    if (!reservations) {
      throw new NotFoundException('예약내역이 없습니다.');
    }
    return reservations;
  }

  //클래스 예약 전체 조회(관리자)
  async findallreservation(userId: number) {
    console.log('userId', userId);
    const user = await this.userService.findUserById(userId);

    if (user.role !== 1) {
      throw new BadRequestException('관리자만 조회가 가능합니다.');
    }

    const result = await this.reservationRepository.find({
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
      ],
      // relations: { user: true },
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
    updateReservationDto: UpdateReservationDto,
    reservationId: number,
  ) {
    const reservation = this.findreservationbyid(reservationId);
    if (!reservation) {
      throw new BadRequestException('해당 예약내역이 존재하지 않습니다.');
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
    });
  }

  //예약 취소
  async deletereservation(
    deleteReservationDto: DeleteReservationDto,
    userId: number,
    reservationId: number,
  ) {
    const user = await this.userService.findUserById(userId);

    if (user.role !== 1) {
      throw new BadRequestException('관리자만 예약취소가 가능합니다.');
    }
    const reservation = await this.findreservationbyid(reservationId);

    if (reservation.password !== deleteReservationDto.password) {
      throw new ForbiddenException('비밀번호가 일치하지 않습니다.');
    }

    const result = await this.reservationRepository.delete({
      id: reservationId,
    });

    return result;
  }
}
