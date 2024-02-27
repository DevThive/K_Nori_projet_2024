import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from 'src/entity/reservation.entity';
import { Repository } from 'typeorm';
import { CreateReservationDto } from './dto/create-reservation';
import { UsersService } from 'src/users/users.service';
import { UpdateReservationDto } from './dto/update-reservation';

@Injectable()
export class ReservationService {
  constructor(
    private readonly userService: UsersService,
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
  ) {}

  //클래스 예약
  async classreservation(
    createReservationDto: CreateReservationDto,
    userId: number,
    classId: number,
  ) {
    const user = await this.userService.findUserById(userId);

    const reservation = await this.reservationRepository.save({
      ...createReservationDto,
      user: user,
      id: classId,
    });

    return reservation;
  }

  //유저 본인 클래스 예약 조회(유저)
  async findmyclass(userId: number) {
    const user = await this.userService.findUserById(userId);

    return await this.reservationRepository.findOne({
      where: { user },
    });
  }

  //클래스 예약 전체 조회(관리자)
  async findallclass(userId: number) {
    const user = await this.userService.findUserById(userId);

    if (user.role !== 1) {
      throw new BadRequestException('관리자만 조회가 가능합니다.');
    }

    const result = await this.reservationRepository.find({
      select: ['totalPeople', 'date', 'time'],
      relations: { user: true },
    });

    return result;
  }

  //클래스별 예약 전체 조회(관리자)
  async findclassreservation(userId: number, classId: number) {
    const user = await this.userService.findUserById(userId);

    if (user.role !== 1) {
      throw new BadRequestException('관리자만 조회가 가능합니다.');
    }

    const result = await this.reservationRepository.find({
      where: { id: classId },
      select: ['totalPeople', 'date', 'time'],
      relations: { user: true },
    });

    return result;
  }

  //클래스 예약수정
  async updatereservation(
    updateReservationDto: UpdateReservationDto,
    userId: number,
    reservationId: number,
  ) {
    const user = await this.userService.findUserById(userId);

    const reservation = this.findreservationbyid(reservationId);
    if (!reservation) {
      throw new BadRequestException('해당 예약내역이 존재하지 않습니다.');
    }

    const updatedreservation = await this.reservationRepository.update(
      { id: reservationId },
      { ...updateReservationDto },
    );

    return updatedreservation;
  }

  async findreservationbyid(id: number) {
    return await this.reservationRepository.findOne({
      where: { id: id },
    });
  }

  //예약내역 삭제
  async deletenotice(userId: number, reservationId: number) {
    const user = await this.userService.findUserById(userId);
    const reservation = await this.findreservationbyid(reservationId);

    if (reservation.user.id !== user.id) {
      throw new ForbiddenException('해당 예약자만 삭제할 수 있습니다.');
    }

    const result = await this.reservationRepository.delete({
      id: reservationId,
    });

    return result;
  }
}
