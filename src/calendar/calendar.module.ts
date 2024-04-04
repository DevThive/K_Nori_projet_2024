import { Module } from '@nestjs/common';
import { CalendarController } from './calendar.controller';
import { CalendarService } from './calendar.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from 'src/entity/reservation.entity';
import { User } from 'src/entity/user.entity';
import { Calendar } from 'src/entity/calendar.entity';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, User, Calendar])],
  controllers: [CalendarController],
  providers: [CalendarService, UsersService],
})
export class CalendarModule {}
