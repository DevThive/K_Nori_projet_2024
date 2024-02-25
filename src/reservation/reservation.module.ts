import { Module } from '@nestjs/common';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from 'src/entity/reservation.entity';
import { User } from 'src/entity/user.entity';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Reservation])],
  controllers: [ReservationController],
  providers: [ReservationService, UsersService],
})
export class ReservationModule {}
