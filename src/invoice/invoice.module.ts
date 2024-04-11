import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from 'src/entity/invoice.entity';
import { User } from 'src/entity/user.entity';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice, User])],
  controllers: [InvoiceController],
  providers: [InvoiceService, UsersService],
})
export class InvoiceModule {}
