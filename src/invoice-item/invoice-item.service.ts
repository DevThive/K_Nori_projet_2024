import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InvoiceItem } from 'src/entity/invoice-item.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateInvoiceItemDto } from './dto/create-invoiceItem';
import { Invoice } from 'src/entity/invoice.entity';
import { UpdateInvoiceItemDto } from './dto/update-invoiceItem';
import { InvoiceService } from 'src/invoice/invoice.service';

@Injectable()
export class InvoiceItemService {
  constructor(
    private readonly invoiceService: InvoiceService,
    private readonly userService: UsersService,
    @InjectRepository(InvoiceItem)
    private invoiceItemRepository: Repository<InvoiceItem>,
    @InjectRepository(Invoice)
    private invoiceRepository: Repository<Invoice>,
  ) {}

  //인보이스 아이템 생성
  async createinvoiceitem(
    createInvoiceItemDto: CreateInvoiceItemDto,
    userId: number,
    invoiceId: number,
  ) {
    const user = await this.userService.findUserById(userId);

    if (user.role !== 1) {
      throw new BadRequestException('관리자만 생성이 가능합니다.');
    }

    const invoice = await this.invoiceRepository.findOne({
      where: { id: invoiceId },
    });
    if (!invoice) {
      throw new NotFoundException('해당 송장이 없습니다.');
    }

    const invoiceItem = await this.invoiceItemRepository.save({
      ...createInvoiceItemDto,
      invoice: invoice,
    });

    return invoiceItem;
  }
  //인보이스 아이템 상세조회
  async invoiceiteminfo(invoiceitemId: number, userId: number) {
    const user = await this.userService.findUserById(userId);

    if (user.role !== 1) {
      throw new BadRequestException('관리자만 수정이 가능합니다.');
    }

    const invoiceitem = this.findinvoiceitembyid(invoiceitemId);
    if (!invoiceitem) {
      throw new BadRequestException(
        '해당 인보이스 아이템이 존재하지 않습니다.',
      );
    }

    const invoiceiteminfo = await this.invoiceItemRepository.findOne({
      where: { id: invoiceitemId },
    });

    return invoiceiteminfo;
  }

  //인보이스 전체조회
  async getallinvoiceitem(userId: number) {
    const user = await this.userService.findUserById(userId);
    if (user.role !== 1) {
      throw new BadRequestException('관리자만 수정이 가능합니다.');
    }

    const invoiceiteminfo = await this.invoiceItemRepository.find();
    return invoiceiteminfo;
  }

  //인보이스 조회
  async invoiceinfo(invoiceId: number, userId: number) {
    const user = await this.userService.findUserById(userId);
    if (user.role !== 1) {
      throw new BadRequestException('관리자만 수정이 가능합니다.');
    }

    const invoices = this.invoiceService.findinvoicebyid(invoiceId);
    if (!invoices) {
      throw new BadRequestException(
        '해당 인보이스 아이템이 존재하지 않습니다.',
      );
    }
    console.log('invoices', invoices);
    const invoiceiteminfo = await this.invoiceItemRepository.findOne({
      where: { invoice: { id: invoiceId } },
    });
    console.log('invoiceiteminfo', invoiceiteminfo);
    return invoiceiteminfo;
  }

  //인보이스 아이템 수정
  async updatinvoiceitem(
    updateInvoiceItemDto: UpdateInvoiceItemDto,
    userId: number,
    invoiceitemId: number,
  ) {
    const user = await this.userService.findUserById(userId);

    if (user.role !== 1) {
      throw new BadRequestException('관리자만 수정이 가능합니다.');
    }

    const invoiceitem = this.findinvoiceitembyid(invoiceitemId);
    if (!invoiceitem) {
      throw new BadRequestException(
        '해당 인보이스 아이템이 존재하지 않습니다.',
      );
    }

    const updatedinvoiceItem = await this.invoiceItemRepository.update(
      { id: invoiceitemId },
      { ...updateInvoiceItemDto },
    );
    return updatedinvoiceItem;
  }

  //인보이스 아이템 삭제
  async deleteinvoiceitem(userId: number, invoiceitemId: number) {
    const user = await this.userService.findUserById(userId);

    if (user.role !== 1) {
      throw new BadRequestException('관리자만 캘린더 삭제가 가능합니다.');
    }

    const invoiceItem = this.findinvoiceitembyid(invoiceitemId);
    if (!invoiceItem) {
      throw new BadRequestException('해당 일정이 존재하지 않습니다.');
    }

    const result = await this.invoiceItemRepository.delete({
      id: invoiceitemId,
    });

    return result;
  }

  async findinvoiceitembyid(id: number) {
    return await this.invoiceItemRepository.findOne({
      where: { id: id },
    });
  }
}
