import { Module } from '@nestjs/common';
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

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Reservation,
      Class,
      User,
      Invoice,
      Calendar,
      InvoiceItem,
    ]),
  ],
  controllers: [ReservationController],
  providers: [ReservationService, UsersService],
})
export class ReservationModule {}
