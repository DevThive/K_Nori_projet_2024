import { IsArray, IsString } from 'class-validator';
import { CreateInvoiceItemDto } from './create-invoiceItem';
import { ApiProperty, PickType } from '@nestjs/swagger';

export class UpdateInvoiceItemDto extends PickType(CreateInvoiceItemDto, [
  'className',
  'content',
  'price',
  'people',
]) {}
