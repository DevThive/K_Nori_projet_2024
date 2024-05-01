import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigProjectModule } from './config/config.module';
import { TypeormModule } from './typeorm/typeorm.module';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

import { NoticeModule } from './notice/notice.module';
import { ReservationModule } from './reservation/reservation.module';
import { GalleryModule } from './gallery/gallery.module';
import { ClassModule } from './class/class.module';
// import { InstructorModule } from './instructor/instructor.module';
import { AwsService } from './aws/aws.service';
import { AwsModule } from './aws/aws.module';
import { ClassReviewModule } from './class-review/class-review.module';
import { ContactService } from './contact/contact.service';
import { ContactModule } from './contact/contact.module';
import { ClassScheduleModule } from './class-schedule/class-schedule.module';
import { InvoiceModule } from './invoice/invoice.module';

import { CalendarModule } from './calendar/calendar.module';

import { InvoiceItemModule } from './invoice-item/invoice-item.module';
import { SmsService } from './sms/sms.service';
import { SmsModule } from './sms/sms.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ConfigProjectModule,
    TypeormModule.forRoot(),
    UsersModule,
    AuthModule,
    NoticeModule,
    ReservationModule,
    GalleryModule,
    ClassModule,
    // InstructorModule,
    AwsModule,
    ClassReviewModule,
    ContactModule,
    InvoiceModule,

    CalendarModule,

    InvoiceItemModule,

    ClassScheduleModule,

    SmsModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService, AwsService, SmsService],
  exports: [ConfigService],
})
export class AppModule {}
