import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from 'src/entity/class.entity';
import { ClassController } from './class.controller';
import { ClassService } from './class.service';
import { Instructor } from 'src/entity/instructor.entity';
import { Reservation } from 'src/entity/reservation.entity';
import { UsersService } from 'src/users/users.service';
import { AwsService } from 'src/aws/aws.service';
import { User } from 'src/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Class, Instructor, Reservation, User])],
  controllers: [ClassController],
  providers: [ClassService, UsersService, AwsService],
})
export class ClassModule {}
