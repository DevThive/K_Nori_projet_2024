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
import { SlackService } from 'src/slack/slack.service';

@ApiTags('클래스 예약')
@Controller('reservation')
export class ReservationController {
  constructor(
    private readonly reservationService: ReservationService,
    private readonly slackNotificationService: SlackService,
  ) {}

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
    const reservation = await this.reservationService.classreservation(
      createReservationDto,
      classId,
    );

    console.log(reservation);

    // 예약이 성공적으로 처리된 후 슬랙 알림 보내기
    const message = `새로운 예약이 들어왔습니다! \n예약 기관: ${reservation.agency} \n예약자 이름: ${createReservationDto.client_name} \n예약자 번호: ${reservation.client_phonenumber} \n클래스 ID: ${reservation.class.title}\n예약 시간: ${new Date().toLocaleString()}`;
    await this.slackNotificationService.sendNotification(message);

    return reservation;
  }

  //클래스 예약 전체 조회(관리자)
  @ApiBearerAuth('accessToken')
  @UseGuards(accessTokenGuard)
  @Get('adminFindAll')
  async findallreservation(@UserId() userId: number) {
    return await this.reservationService.findallreservation(userId);
  }

  //예약 완료 리스트 조회.....
  @ApiBearerAuth('accessToken')
  @UseGuards(accessTokenGuard)
  @Get('adminSuccess')
  async findsuccessreservation(@UserId() userId: number) {
    return await this.reservationService.findsuccessreservation(userId);
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

  //고객 예약수정
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

  //관리자 예약수정
  @Put('admin/:reservationId')
  async adminupdatereservation(
    @Body() updateReservationDto: UpdateReservationDto,
    @Param('reservationId') reservationId: number,
  ) {
    return await this.reservationService.adminupdatereservation(
      updateReservationDto,
      reservationId,
    );
  }

  //예약 승인처리(알림톡)
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

  // //예약 승인처리
  // @ApiBearerAuth('accessToken')
  // @Patch('success/approve/:reservationId')
  // @UseGuards(accessTokenGuard)
  // async approvesuccessreservation(
  //   @UserId() user_id: number,
  //   @Body() approveReservationDto: ApproveReservationDto,
  //   @Param('reservationId') reservationId: number,
  // ) {
  //   return await this.reservationService.approvesuccessreservation(
  //     user_id,
  //     approveReservationDto,
  //     reservationId,
  //   );
  // }

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
  @Delete('adminDelete/:reservationId')
  async admindelete(
    @UserId() userId: number,
    @Param('reservationId') reservationId: number,
  ) {
    return await this.reservationService.admindelete(userId, reservationId);
  }
}
