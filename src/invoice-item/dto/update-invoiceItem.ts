import { IsArray, IsString } from 'class-validator';
import { CreateInvoiceItemDto } from './create-invoiceItem';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateInvoiceItemDto extends CreateInvoiceItemDto {}
