import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { InvoiceService } from './invoice.service';
import { accessTokenGuard } from 'src/auth/guard/access-token.guard';
import { UserId } from 'src/auth/decorators/userId.decorator';

@ApiTags('송장')
@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  // @ApiBearerAuth('accessToken')
  // @UseGuards(accessTokenGuard)
  // @Get('invoicelist')
  // async invoicelist(@UserId() userId: number) {
  //   return await this.invoiceService.invoicelist(userId);
  // }
  @ApiBearerAuth('accessToken')
  @UseGuards(accessTokenGuard)
  @Get('')
  async invoicelist(@UserId() userId: number) {
    return await this.invoiceService.invoicelist(userId);
  }

  // @ApiBearerAuth('accessToken')
  // @Post('invoice/:invoiceId')
  // async addinvoice(
  //   @UserId() userId: number,
  //   @Param('invoiceId') invoiceId: number,
  // ) {
  //   return await this.invoiceService.addinvoice(userId, invoiceId);
  // }

  // @ApiBearerAuth('accessToken')
  // @Delete('delete/:invoiceId')
  // async deleteinvoice(
  //   @UserId() userId: number,
  //   @Param('invoiceId') invoiceId: number,
  // ) {
  //   return await this.invoiceService.deleteinvoice(userId, invoiceId);
  // }

  // @ApiBearerAuth('accessToken')
  // @Put('invoice/:invoiceId')
  // async updateinvoice(
  //   @UserId() userId: number,
  //   @Param('invoiceId') invoiceId: number,
  // ) {
  //   return await this.invoiceService.updateinvoice(userId, invoiceId);
  // }
}
