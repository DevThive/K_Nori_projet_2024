import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from 'src/entity/invoice.entity';
import { User } from 'src/entity/user.entity';
import { UsersService } from 'src/users/users.service';
import { InvoiceItem } from 'src/entity/invoice-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice, User, InvoiceItem])],
  controllers: [InvoiceController],
  providers: [InvoiceService, UsersService],
})
export class InvoiceModule {}
