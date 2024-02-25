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
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
  exports: [ConfigService],
})
export class AppModule {}
