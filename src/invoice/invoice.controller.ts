import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { InvoiceService } from './invoice.service';
import { accessTokenGuard } from 'src/auth/guard/access-token.guard';
import { UserId } from 'src/auth/decorators/userId.decorator';
import { CreateInvoiceDto } from './dto/create-invoice';
import { UpdateInvoiceDto } from './dto/update-invoice';
import { Response } from 'express';
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
    // @UserId() userId: number,
    @Param('invoiceId') invoiceId: number,
  ) {
    return await this.invoiceService.invoiceDetail(invoiceId);
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
  @Patch(':invoiceId')
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

  //   @ApiBearerAuth('accessToken')
  //   @Post('/:invoiceId')
  //   async addinvoice(
  //     @UserId() userId: number,
  //     @Param('invoiceId') invoiceId: number,
  //   ) {
  //     return await this.invoiceService.addinvoice(userId, invoiceId);
  //   }

  @ApiBearerAuth('accessToken')
  @UseGuards(accessTokenGuard)
  @Delete('/:invoiceId')
  async deleteinvoice(
    @UserId() userId: number,
    @Param('invoiceId') invoiceId: number,
  ) {
    return await this.invoiceService.deleteinvoice(userId, invoiceId);
  }

  // @ApiBearerAuth('accessToken')
  // @Put('invoice/:invoiceId')
  // async updateinvoice(
  //   @UserId() userId: number,
  //   @Param('invoiceId') invoiceId: number,
  // ) {
  //   return await this.invoiceService.updateinvoice(userId, invoiceId);
  // }

  // @ApiBearerAuth('accessToken')
  // @UseGuards(accessTokenGuard)
  @Post('pdf/:id')
  async generateAndSavePdf(@Param('id') id: string, @Res() res: Response) {
    try {
      const invoiceData = await this.invoiceService.invoiceDetail(+id);
      console.log(invoiceData);

      if (!invoiceData) {
        return res.status(404).json({ message: 'Invoice not found' }); // HttpStatus 대신 직접 상태 코드를 사용합니다.
      }
      const pdfBuffer = await this.invoiceService.generatePDF(invoiceData);
      // 파일로 저장
      const fileName = `invoice_${id}.pdf`;
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
      res.send(pdfBuffer);
    } catch (error) {
      return res.status(500).json({ message: 'Failed to generate PDF' }); // HttpStatus 대신 직접 상태 코드를 사용합니다.
    }
  }
}
