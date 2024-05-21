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
import { DashboardModule } from './dashboard/dashboard.module';
import { UpdateContactModule } from './update-contact/update-contact.module';
import { GmailController } from './gmail/gmail.controller';
import { GmailService } from './gmail/gmail.service';
import { GmailModule } from './gmail/gmail.module';

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

    DashboardModule,

    UpdateContactModule,

    GmailModule,
  ],
  controllers: [AppController, GmailController],
  providers: [AppService, ConfigService, AwsService, SmsService, GmailService],
  exports: [ConfigService],
})
export class AppModule {}
