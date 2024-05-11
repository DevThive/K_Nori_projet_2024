import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from 'src/entity/reservation.entity';
import { UsersService } from 'src/users/users.service';
import { ClassService } from 'src/class/class.service';
import { User } from 'src/entity/user.entity';
import { Class } from 'src/entity/class.entity';
import { ClassSchedule } from 'src/entity/class-schedule.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation, User, Class, ClassSchedule]),
  ],
  controllers: [DashboardController],
  providers: [UsersService, DashboardService, ClassService],
})
export class DashboardModule {}
