import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation';
import { UserId } from 'src/auth/decorators/userId.decorator';
import { accessTokenGuard } from 'src/auth/guard/access-token.guard';
import { CheckReservationDto } from './dto/check-reservation';
import { UpdateReservationDto } from './dto/update-reservation';

@ApiTags('클래스 예약')
@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  //클래스 예약
  @Post(':classId')
  async classreservation(
    @Body() createReservationDto: CreateReservationDto,
    @Param('classId') classId: number,
  ) {
    return await this.reservationService.classreservation(
      createReservationDto,
      classId,
    );
  }

  //유저 본인 클래스 예약 조회(유저)
  @Get('/search/:phonenumber')
  async findclassbyphonenumber(@Param('phonenumber') phonenumber: string) {
    return await this.reservationService.findclassbyphonenumber(phonenumber);
  }
  //클래스 예약 전체 조회(관리자)

  @ApiBearerAuth('accessToken')
  @UseGuards(accessTokenGuard)
  @Get('')
  async findallreservation(@UserId() userId: number) {
    return await this.reservationService.findallreservation(userId);
  }

  //클래스별 예약 전체 조회(관리자)
  @ApiBearerAuth('accessToken')
  @UseGuards(accessTokenGuard)
  @Get(':classId')
  async findreservationsbyclass(
    @Param('classId') classId: number,
    @UserId() userId: number,
  ) {
    return await this.reservationService.findreservationsbyclass(
      classId,
      userId,
    );
  }

  //클래스 예약수정

  @ApiBearerAuth('accessToken')
  @Put(':reservationId')
  async updatereservation(
    @Body() checkReservationDto: CheckReservationDto,
    @Body() updateReservationDto: UpdateReservationDto,
    @Param('reservationId') reservationId: number,
  ) {
    return await this.reservationService.updatereservation(
      checkReservationDto,
      updateReservationDto,
      reservationId,
    );
  }

  //예약내역 삭제

  @UseGuards(accessTokenGuard)
  @Delete(':reservationId')
  async deletereservation(
    @Body() checkReservationDto: CheckReservationDto,
    @UserId() userId: number,
    @Param('reservationId') reservationId: number,
  ) {
    return await this.reservationService.deletereservation(
      checkReservationDto,
      userId,
      reservationId,
    );
  }
}
