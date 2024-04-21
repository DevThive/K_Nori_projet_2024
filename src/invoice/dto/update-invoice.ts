import { IsArray, IsString } from 'class-validator';
import { CreateInvoiceDto } from './create-invoice';
import { ApiProperty, PickType } from '@nestjs/swagger';

export class UpdateInvoiceDto extends PickType(CreateInvoiceDto, [
  'name',
  'contact',
  'address',
  'note',
]) {}
