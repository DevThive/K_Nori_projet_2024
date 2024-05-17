import { Module } from '@nestjs/common';
import { UpdateContactController } from './update-contact.controller';
import { UpdateContactService } from './update-contact.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from 'src/entity/reservation.entity';
import { User } from 'src/entity/user.entity';
import { UsersService } from 'src/users/users.service';
import { UpdateContact } from 'src/entity/update-contact.entity';
import { SmsService } from 'src/sms/sms.service';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, User, UpdateContact])],
  controllers: [UpdateContactController],
  providers: [UpdateContactService, UsersService, SmsService],
})
export class UpdateContactModule {}
