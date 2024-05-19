import { Module } from '@nestjs/common';
import { GmailService } from './gmail.service';
import { GoogleAuthModule } from '../google-auth/google-auth.module';
import { GmailController } from './gmail.controller';

@Module({
  imports: [GoogleAuthModule],
  controllers: [GmailController],
  providers: [GmailService],
})
export class GmailModule {}
