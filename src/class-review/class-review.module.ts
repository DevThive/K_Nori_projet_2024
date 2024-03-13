import { Module } from '@nestjs/common';
import { ClassReviewService } from './class-review.service';
import { ClassReviewController } from './class-review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassReview } from 'src/entity/class-review.entity';
import { Class } from 'src/entity/class.entity';
import { User } from 'src/entity/user.entity';
import { AwsService } from 'src/aws/aws.service';
import { UsersService } from 'src/users/users.service';
import { Reservation } from 'src/entity/reservation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClassReview, Class, User, Reservation])],
  controllers: [ClassReviewController],
  providers: [ClassReviewService, AwsService, UsersService],
})
export class ClassReviewModule {}
