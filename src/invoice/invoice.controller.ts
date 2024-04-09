import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
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
  @Get('invoicelist')
  async invoicelist(@UserId() userId: number, @Query() query) {
    const invoicesData = await this.invoiceService.getInvoices(userId, {
      q: query.q || '',
      dates: query.dates || [],
    });

    return {
      success: true,
      allData: invoicesData.filteredData,
      invoices: invoicesData.filteredData,
      total: invoicesData.total,
    };
  }

  // @ApiBearerAuth('accessToken')
  // @UseGuards(accessTokenGuard)
  @Get('/:invoiceId')
  async detailinvoice(
    @UserId() userId: number,
    @Param('invoiceId') invoiceId: number,
  ) {
    return await this.invoiceService.invoiceDetail(userId, invoiceId);
  }

  //   @ApiBearerAuth('accessToken')
  //   @Post('/:invoiceId')
  //   async addinvoice(
  //     @UserId() userId: number,
  //     @Param('invoiceId') invoiceId: number,
  //   ) {
  //     return await this.invoiceService.addinvoice(userId, invoiceId);
  //   }

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
