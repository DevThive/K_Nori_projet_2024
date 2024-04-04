import { Controller, Get, UseGuards } from '@nestjs/common';
import { InvoiceItemService } from './invoice-item.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { accessTokenGuard } from 'src/auth/guard/access-token.guard';
import { UserId } from 'src/auth/decorators/userId.decorator';

@Controller('invoice-item')
export class InvoiceItemController {
  constructor(private readonly invoiceitemService: InvoiceItemService) {}

  //   @ApiBearerAuth('accessToken')
  //   @UseGuards(accessTokenGuard)
  //   @Get('')
  //   async invoiceItemList(@UserId() userId: number) {
  //     return await this.invoiceitemService.invoiceItemlist(userId);
  //   }
}
