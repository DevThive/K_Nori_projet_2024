import { Module } from '@nestjs/common';
import { InvoiceItemController } from './invoice-item.controller';
import { InvoiceItemService } from './invoice-item.service';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/entity/user.entity';
import { Invoice } from 'src/entity/invoice.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceItem } from 'src/entity/invoice-item.entity';
import { InvoiceService } from 'src/invoice/invoice.service';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice, InvoiceItem, User])],
  controllers: [InvoiceItemController],
  providers: [InvoiceItemService, UsersService, InvoiceService],
})
export class InvoiceItemModule {}
