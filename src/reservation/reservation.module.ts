import { Module, forwardRef } from '@nestjs/common';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from 'src/entity/reservation.entity';
import { UsersService } from 'src/users/users.service';
import { Class } from 'src/entity/class.entity';
import { User } from 'src/entity/user.entity';
import { Invoice } from 'src/entity/invoice.entity';
import { Calendar } from 'src/entity/calendar.entity';
import { InvoiceItem } from 'src/entity/invoice-item.entity';
import { SmsService } from 'src/sms/sms.service';
import { ClassService } from 'src/class/class.service';
import { ClassSchedule } from 'src/entity/class-schedule.entity';
import { ExpiryModule } from 'src/expiry/expiry.module';
import { SlackService } from 'src/slack/slack.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Reservation,
      Class,
      User,
      Invoice,
      Calendar,
      InvoiceItem,
      ClassSchedule,
    ]),
    forwardRef(() => ExpiryModule), // forwardRef를 사용하여 순환 종속성을 처리합니다.
  ],
  controllers: [ReservationController],
  providers: [
    ReservationService,
    UsersService,
    SmsService,
    ClassService,
    SlackService,
  ],
  exports: [ReservationService], // ReservationService를 export합니다.
})
export class ReservationModule {}
