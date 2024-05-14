import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import { accessTokenGuard } from 'src/auth/guard/access-token.guard';
import { UserId } from 'src/auth/decorators/userId.decorator';

@ApiTags('대시보드')
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  //예약 미승인건수 조회
  @ApiBearerAuth('accessToken')
  @UseGuards(accessTokenGuard)
  @Get('unapprovedReservationCount')
  async unapprovedReservationCount(@UserId() userId: number) {
    return await this.dashboardService.unapprovedReservationCount(userId);
  }

  //클래스별 예약건수(누적)
  @ApiBearerAuth('accessToken')
  @UseGuards(accessTokenGuard)
  @Get('countsByClass')
  async findReservationCountsByClass(@UserId() userId: number) {
    return await this.dashboardService.findReservationCountsByClass(userId);
  }

  // 특정 날짜 예약 건수 조회(일일 예약건수 조회)
  @ApiBearerAuth('accessToken')
  @UseGuards(accessTokenGuard)
  @Get('reservationByDate/:date')
  async findCompletedReservationByDate(
    @UserId() userId: number,
    @Param('date') date: string,
  ) {
    return await this.dashboardService.findCompletedReservationByDate(
      userId,
      date,
    );
  }

  // 이번 주 일주일간의 예약 건수 및 오늘의 예약 건수 조회
  @ApiBearerAuth('accessToken')
  @UseGuards(accessTokenGuard)
  @Get('completedreservation/week/:weekday')
  async findCompletedReservationByWeek(
    @UserId() userId: number,
    @Param('weekday') weekday: number,
  ) {
    const weeklyRevenue =
      await this.dashboardService.findCompletedReservationByWeek(
        userId,
        weekday,
      );
    return { revenue: weeklyRevenue };
  }

  //이번해매출수익액
  @ApiBearerAuth('accessToken')
  @UseGuards(accessTokenGuard)
  @Get('yearly-cost/:year')
  async findyearlycost(@UserId() userId: number, @Param('year') year: number) {
    return await this.dashboardService.findyearlycost(userId, year);
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
    return await this.dashboardService.findmonthlycost(userId, year, month);
  }

  //연도별 예약 완료 건수 조회
  @ApiBearerAuth('accessToken')
  @UseGuards(accessTokenGuard)
  @Get('completedreservation/:year')
  async findcompletedreservation(
    @UserId() userId: number,
    @Param('year') year: number,
  ) {
    return await this.dashboardService.findcompletedreservation(userId, year);
  }

  //연도별 예약조회
  @ApiBearerAuth('accessToken')
  @UseGuards(accessTokenGuard)
  @Get('findreservation/:year')
  async findreservationbyyear(
    @UserId() userId: number,
    @Param('year') year: number,
  ) {
    return await this.dashboardService.findreservationbyyear(userId, year);
  }

  //한달 예약건수
  @ApiBearerAuth('accessToken')
  @UseGuards(accessTokenGuard)
  @Get('monthly-reservation/:year/:month')
  async findmonthlyreservation(
    @UserId() userId: number,
    @Param('year') year: number,
    @Param('month') month: number,
  ) {
    return await this.dashboardService.findmonthlyreservation(
      userId,
      year,
      month,
    );
  }

  //6개월 예약 건수 월별 조회
  @ApiBearerAuth('accessToken')
  @UseGuards(accessTokenGuard)
  @Get('halfmonthreservation')
  async findhalfmonthreservation(@UserId() userId: number) {
    return await this.dashboardService.findhalfmonthreservation(userId);
  }

  //6개월 방문 건수 월별 조회
  @ApiBearerAuth('accessToken')
  @UseGuards(accessTokenGuard)
  @Get('findhalfmonthvisiting')
  async findhalfmonthvisiting(@UserId() userId: number) {
    return await this.dashboardService.findhalfmonthvisiting(userId);
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
