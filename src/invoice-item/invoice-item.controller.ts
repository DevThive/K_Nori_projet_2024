import { Controller, UseGuards } from '@nestjs/common';
import { InvoiceItemService } from './invoice-item.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { accessTokenGuard } from 'src/auth/guard/access-token.guard';

@Controller('invoice-item')
export class InvoiceItemController {
  constructor(private readonly invoiceitemService: InvoiceItemService) {}

  @ApiBearerAuth('accessToken')
  @UseGuards(accessTokenGuard)
}
