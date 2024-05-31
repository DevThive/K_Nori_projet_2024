import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ReservationService } from 'src/reservation/reservation.service';

@Injectable()
export class CleanupService {
  constructor(private readonly reservationService: ReservationService) {}

  @Cron('0 0 * * *') // 매일 자정에 실행
  async handleCron() {
    await this.reservationService.removeExpiredReservations();
  }
}
