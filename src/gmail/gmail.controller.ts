import {
  Controller,
  Get,
  Query,
  Redirect,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { GmailService } from './gmail.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { accessTokenGuard } from 'src/auth/guard/access-token.guard';
import { UserId } from 'src/auth/decorators/userId.decorator';

ApiTags('Gmail');
@Controller('gmail')
export class GmailController {
  constructor(private readonly gmailService: GmailService) {}

  @ApiBearerAuth('accessToken')
  @UseGuards(accessTokenGuard)
  @Get('/token')
  async gmailtoken(@UserId() userid: number) {
    return await this.gmailService.googletoken(userid);
  }
}
