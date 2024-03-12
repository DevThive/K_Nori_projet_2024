import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from 'src/entity/class.entity';
import { Instructor } from 'src/entity/instructor.entity';
import { InstructorController } from './instructor.controller';
import { InstructorService } from './instructor.service';
import { AwsModule } from 'src/aws/aws.module';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Class, Instructor, User]), AwsModule],
  controllers: [InstructorController],
  providers: [InstructorService, UsersService],
})
export class InstructorModule {}
