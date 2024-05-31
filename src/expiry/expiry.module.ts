import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpiryService } from './expiry.service';
import { Reservation } from 'src/entity/reservation.entity';
import { Invoice } from 'src/entity/invoice.entity';
import { CleanupService } from './cleanup.service';
import { ReservationModule } from 'src/reservation/reservation.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation, Invoice]),
    forwardRef(() => ReservationModule), // forwardRef를 사용하여 순환 종속성을 처리합니다.
  ],
  providers: [ExpiryService, CleanupService],
  exports: [ExpiryService],
})
export class ExpiryModule {}
