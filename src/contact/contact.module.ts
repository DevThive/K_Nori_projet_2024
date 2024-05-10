import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from 'src/entity/contact.entity';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/entity/user.entity';
import { SmsService } from 'src/sms/sms.service';

@Module({
  imports: [TypeOrmModule.forFeature([Contact, User])],
  controllers: [ContactController],
  providers: [ContactService, UsersService, SmsService],
})
export class ContactModule {}
