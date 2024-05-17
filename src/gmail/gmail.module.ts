import { Module } from '@nestjs/common';
import { GmailService } from './gmail.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [GmailService],
  exports: [GmailService],
})
export class GmailModule {}
