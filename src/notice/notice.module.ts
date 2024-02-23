import { Module } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { NoticeController } from './notice.controller';
import { Notice } from 'src/entity/notice.entity';
import { User } from 'src/entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Notice, User])],
  controllers: [NoticeController],
  providers: [NoticeService, UsersService],
})
export class NoticeModule {}
