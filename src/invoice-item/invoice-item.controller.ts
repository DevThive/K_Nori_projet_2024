import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { InvoiceItemService } from './invoice-item.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { accessTokenGuard } from 'src/auth/guard/access-token.guard';
import { UserId } from 'src/auth/decorators/userId.decorator';
import { CreateInvoiceItemDto } from './dto/create-invoiceItem';
import { UpdateInvoiceItemDto } from './dto/update-invoiceItem';

@ApiTags('송장아이템')
@Controller('invoice-item')
export class InvoiceItemController {
  constructor(private readonly invoiceitemService: InvoiceItemService) {}

  //인보이스 아이템 생성
  @ApiBearerAuth('accessToken')
  @UseGuards(accessTokenGuard)
  @Post(':invoiceId')
  async createinvoiceitem(
    @Body() createInvoiceItemDto: CreateInvoiceItemDto,
    @UserId() userId: number,
    @Param('invoiceId') invoiceId: number,
  ) {
    return await this.invoiceitemService.createinvoiceitem(
      createInvoiceItemDto,
      userId,
      invoiceId,
    );
  }

  //인보이스 아이템 상세조회
  @ApiBearerAuth('accessToken')
  @UseGuards(accessTokenGuard)
  @Get(':invoiceitemId')
  async invoiceiteminfo(
    @Param('invoiceitemId') invoiceitemId: number,
    @UserId() userId: number,
  ) {
    return await this.invoiceitemService.invoiceiteminfo(invoiceitemId, userId);
  }

  //인보이스 아이템 전체조회
  @ApiBearerAuth('accessToken')
  @UseGuards(accessTokenGuard)
  @Get('')
  async getallinvoiceitem(@UserId() userId: number) {
    return await this.invoiceitemService.getallinvoiceitem(userId);
  }

  //인보이스 조회
  @ApiBearerAuth('accessToken')
  @UseGuards(accessTokenGuard)
  @Get(':invoiceId')
  async invoiceinfo(
    @Param('invoiceId') invoiceId: number,
    @UserId() userId: number,
  ) {
    return await this.invoiceitemService.invoiceinfo(invoiceId, userId);
  }

  //인보이스 아이템 수정

  @ApiBearerAuth('accessToken')
  @UseGuards(accessTokenGuard)
  @Put(':invoiceitemId')
  async updatinvoiceitem(
    @Body() updateInvoiceItemDto: UpdateInvoiceItemDto,
    @UserId() userId: number,
    @Param('invoiceitemId') invoiceitemId: number,
  ) {
    return await this.invoiceitemService.updatinvoiceitem(
      updateInvoiceItemDto,
      userId,
      invoiceitemId,
    );
  }

  //인보이스 아이템 삭제

  @ApiBearerAuth('accessToken')
  @UseGuards(accessTokenGuard)
  @Delete(':invoiceitemId')
  async deleteinvoiceitem(
    @UserId() userId: number,
    @Param('invoiceitemId') invoiceitemId: number,
  ) {
    return await this.invoiceitemService.deleteinvoiceitem(
      userId,
      invoiceitemId,
    );
  }
}
