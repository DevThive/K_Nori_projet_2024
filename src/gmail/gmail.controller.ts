// gmail.controller.ts
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GmailService } from './gmail.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('지메일')
@Controller('gmail')
export class GmailController {
  constructor(private readonly gmailService: GmailService) {}

  @Get('list')
  async gmaillist() {
    return await this.gmailService.listLabels();
  }
}
