import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from 'src/entity/class.entity';
import { ClassController } from './class.controller';
import { ClassService } from './class.service';
import { Instructor } from 'src/entity/instructor.entity';
import { Reservation } from 'src/entity/reservation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Class, Instructor, Reservation])],
  controllers: [ClassController],
  providers: [ClassService],
})
export class ClassModule {}
