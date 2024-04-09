import {
  Body,
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
import { CreateInvoiceDto } from './dto/create-invoice';
import { UpdateInvoiceDto } from './dto/update-invoice';

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

  @ApiBearerAuth('accessToken')
  @UseGuards(accessTokenGuard)
  @Get('/:invoiceId')
  async detailinvoice(
    @UserId() userId: number,
    @Param('invoiceId') invoiceId: number,
  ) {
    return await this.invoiceService.invoiceDetail(userId, invoiceId);
  }

  @ApiBearerAuth('accessToken')
  @UseGuards(accessTokenGuard)
  @Post('')
  async addinvoice(
    @Body() createInvoiceDto: CreateInvoiceDto,
    @UserId() userId: number,
  ) {
    return await this.invoiceService.addinvoice(createInvoiceDto, userId);
  }

  @ApiBearerAuth('accessToken')
  @UseGuards(accessTokenGuard)
  @Put(':invoiceId')
  async updateinvoice(
    @Body() updateInvoiceDto: UpdateInvoiceDto,
    @UserId() userId: number,
    @Param('invoiceId') invoiceId: number,
  ) {
    return await this.invoiceService.updateinvoice(
      updateInvoiceDto,
      userId,
      invoiceId,
    );
  }

  @ApiBearerAuth('accessToken')
  @UseGuards(accessTokenGuard)
  @Delete(':invoiceId')
  async deleteinvoice(
    @UserId() userId: number,
    @Param('invoiceId') invoiceId: number,
  ) {
    return await this.invoiceService.deleteinvoice(userId, invoiceId);
  }
}
