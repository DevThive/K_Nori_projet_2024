import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation';
import { UserId } from 'src/auth/decorators/userId.decorator';
import { accessTokenGuard } from 'src/auth/guard/access-token.guard';
import { CheckReservationDto } from './dto/check-reservation';
import { UpdateReservationDto } from './dto/update-reservation';
import { ApproveReservationDto } from './dto/approve-reservation';

@ApiTags('클래스 예약')
@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  // 특정 날짜 예약 건수 조회(일일 예약건수 조회)
  @ApiBearerAuth('accessToken')
  @UseGuards(accessTokenGuard)
  @Get('reservationByDate/:date')
  async findCompletedReservationByDate(
    @UserId() userId: number,
    @Param('date') date: string,
  ) {
    return await this.reservationService.findCompletedReservationByDate(
      userId,
      date,
    );
  }

  // 이번 주 일주일간의 예약 건수 및 오늘의 예약 건수 조회
  @ApiBearerAuth('accessToken')
  @UseGuards(accessTokenGuard)
  @Get('completedreservation/week')
  async findCompletedReservationByWeek(@UserId() userId: number) {
    const weeklyRevenue =
      await this.reservationService.findCompletedReservationByWeek(userId);
    return { revenue: weeklyRevenue };
  }

  //이번해매출수익액
  @ApiBearerAuth('accessToken')
  @UseGuards(accessTokenGuard)
  @Get('yearly-cost/:year')
  async findyearlycost(@UserId() userId: number, @Param('year') year: number) {
    return await this.reservationService.findyearlycost(userId, year);
  }

  //한달예상매출액
  @ApiBearerAuth('accessToken')
  @UseGuards(accessTokenGuard)
  @Get('monthly-cost/:year/:month')
  async findmonthlycost(
    @UserId() userId: number,
    @Param('year') year: number,
    @Param('month') month: number,
  ) {
    return await this.reservationService.findmonthlycost(userId, year, month);
  }

  //연도별 예약 완료 건수 조회
  @ApiBearerAuth('accessToken')
  @UseGuards(accessTokenGuard)
  @Get('completedreservation:year')
  async findcompletedreservation(
    @UserId() userId: number,
    @Param('year') year: number,
  ) {
    return await this.reservationService.findcompletedreservation(userId, year);
  }

  //연도별 예약조회
  @ApiBearerAuth('accessToken')
  @UseGuards(accessTokenGuard)
  @Get(':year')
  async findreservationbyyear(
    @UserId() userId: number,
    @Param('year') year: number,
  ) {
    return await this.reservationService.findreservationbyyear(userId, year);
  }

  //핸드폰번호로만 예약조회
  @Get('findbyphonenumber/:phonenumber')
  async findbyphonenumber(@Param('phonenumber') phonenumber: string) {
    return await this.reservationService.findbyphonenumber(phonenumber);
  }

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

  //유저 클래스예약 상세조회
  @Get('finding/:classId')
  async findclassbyphonenumber(
    @Param('classId') classId: string,
    @Query('user_phone') userPhone: string,
  ) {
    return await this.reservationService.findclassbyphonenumber(
      classId,
      userPhone,
    );
  }

  //클래스 예약 전체 조회(관리자)
  @ApiBearerAuth('accessToken')
  @UseGuards(accessTokenGuard)
  @Get('admin')
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

  @ApiBearerAuth('accessToken')
  @UseGuards(accessTokenGuard)
  @Get('admin/success')
  async findsuccessreservation(@UserId() userId: number) {
    return await this.reservationService.findsuccessreservation(userId);
  }

  //클래스 예약수정
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

  //예약 승인처리
  @ApiBearerAuth('accessToken')
  @Patch('approve/:reservationId')
  @UseGuards(accessTokenGuard)
  async approvereservation(
    @UserId() user_id: number,
    @Body() approveReservationDto: ApproveReservationDto,
    @Param('reservationId') reservationId: number,
  ) {
    return await this.reservationService.approvereservation(
      user_id,
      approveReservationDto,
      reservationId,
    );
  }

  //예약 승인처리
  @ApiBearerAuth('accessToken')
  @Patch('success/approve/:reservationId')
  @UseGuards(accessTokenGuard)
  async approvesuccessreservation(
    @UserId() user_id: number,
    @Body() approveReservationDto: ApproveReservationDto,
    @Param('reservationId') reservationId: number,
  ) {
    return await this.reservationService.approvesuccessreservation(
      user_id,
      approveReservationDto,
      reservationId,
    );
  }

  //예약내역 삭제(유저)
  @Delete(':reservationId')
  async deletereservation(
    @Body() checkReservationDto: CheckReservationDto,
    @Param('reservationId') reservationId: number,
  ) {
    return await this.reservationService.deletereservation(
      checkReservationDto,
      reservationId,
    );
  }

  //예약내역 삭제(어드민)
  @ApiBearerAuth('accessToken')
  @UseGuards(accessTokenGuard)
  @Delete('admin/:reservationId')
  async admindelete(
    @UserId() userId: number,
    @Param('reservationId') reservationId: number,
  ) {
    return await this.reservationService.admindelete(userId, reservationId);
  }

  // //일주일 매출수익액
  // @ApiBearerAuth('accessToken')
  // @UseGuards(accessTokenGuard)
  // @Get(':year/week/:weekNumber')
  // async getWeeklyRevenue(
  //   @UserId() userId: number,
  //   @Param('year', ParseIntPipe) year: number,
  //   @Param('weekNumber', ParseIntPipe) weekNumber: number,
  // ) {
  //   return await this.reservationService.findWeeklyRevenue(
  //     userId,
  //     year,
  //     weekNumber,
  //   );
  // }
}
