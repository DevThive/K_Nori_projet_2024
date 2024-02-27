import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation';
import { UserId } from 'src/auth/decorators/userId.decorator';
import { accessTokenGuard } from 'src/auth/guard/access-token.guard';

@ApiTags('클래스 예약')
@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  //클래스 예약
  @ApiBearerAuth('accessToken')
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

  //클래스별 예약 전체 조회(관리자)

  //클래스 예약수정

  //예약내역 삭제
}
