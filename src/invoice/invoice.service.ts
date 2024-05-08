import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from 'src/entity/invoice.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateInvoiceDto } from './dto/create-invoice';
import { UpdateInvoiceDto } from './dto/update-invoice';
import { InvoiceItem } from 'src/entity/invoice-item.entity';
import PDFDocument from 'pdfkit';

@Injectable()
export class InvoiceService {
  constructor(
    private readonly userService: UsersService,
    @InjectRepository(Invoice)
    private InvoiceRepository: Repository<Invoice>,
    @InjectRepository(InvoiceItem)
    private readonly invoiceItemRepository: Repository<InvoiceItem>,
  ) {}
  //생성
  async addinvoice(createInvoiceDto: CreateInvoiceDto, userId: number) {
    const user = await this.userService.findUserById(userId);

    if (user.role !== 1) {
      throw new BadRequestException('관리자만 작성이 가능합니다.');
    }

    const invoice = await this.InvoiceRepository.save({
      ...createInvoiceDto,
    });

    //invoice-items 생성
    const invoiceItemData = await this.invoiceItemRepository.save({
      name: createInvoiceDto.name,
      className: createInvoiceDto.service,
      content: createInvoiceDto.note,
      price: createInvoiceDto.price,
      people: createInvoiceDto.totalPeople,
      invoice: invoice,
    });

    return invoice;
  }

  async getInvoices(
    userId: number,
    queryParams: {
      q: string;

      dates: string[];
    },
  ): Promise<{ filteredData: Invoice[]; total: number }> {
    const { q = '', dates = [] } = queryParams;
    const queryLowered = q.toLowerCase();

    // const user = await this.userService.findUserById(userId);

    // if (user.role !== 1) {
    //   throw new BadRequestException('관리자만 작성이 가능합니다.');
    // }

    const queryBuilder = this.InvoiceRepository.createQueryBuilder('invoice');

    if (dates.length) {
      const [start, end] = dates;
      queryBuilder.andWhere('invoice.issuedDate BETWEEN :start AND :end', {
        start,
        end,
      });
    }

    if (q) {
      queryBuilder.andWhere(
        '(LOWER(invoice.companyEmail) LIKE :queryLowered OR LOWER(invoice.name) LIKE :queryLowered OR CAST(invoice.id AS CHAR) LIKE :queryLowered OR LOWER(invoice.dueDate) LIKE :queryLowered)',

        { queryLowered: `%${queryLowered}%` },
      );
    }

    const filteredData = await queryBuilder.getMany();
    const total = await queryBuilder.getCount();

    return { filteredData, total };
  }

  async invoiceDetail(invoiceId: number) {
    const data = this.InvoiceRepository.findOne({
      where: { id: invoiceId },
      relations: { invoiceItems: true },
    });

    return data;
  }

  //인보이스 수정
  async updateinvoice(
    updateInvoiceDto: UpdateInvoiceDto,
    userId: number,
    invoiceId: number,
  ) {
    const user = await this.userService.findUserById(userId);

    if (user.role !== 1) {
      throw new BadRequestException('관리자만 수정이 가능합니다.');
    }

    const invoice = this.findinvoicebyid(invoiceId);
    if (!invoice) {
      throw new BadRequestException('해당 인보이스가 존재하지 않습니다.');
    }

    const updatedinvoice = await this.InvoiceRepository.update(
      { id: invoiceId },
      { ...updateInvoiceDto },
    );
    return updatedinvoice;
  }

  //인보이스 아이템 삭제
  async deleteinvoice(userId: number, invoiceId: number) {
    const user = await this.userService.findUserById(userId);

    if (user.role !== 1) {
      throw new BadRequestException('관리자만 캘린더 삭제가 가능합니다.');
    }

    const invoice = this.findinvoicebyid(invoiceId);
    if (!invoice) {
      throw new BadRequestException('해당 인보이스가 존재하지 않습니다.');
    }

    const result = await this.InvoiceRepository.delete({
      id: invoiceId,
    });

    return result;
  }

  async findinvoicebyid(id: number) {
    return await this.InvoiceRepository.findOne({
      where: { id: id },
    });
  }

  //pdf 변환
  async generatePDF(data: any): Promise<Buffer> {
    const doc = new PDFDocument({
      size: 'A4',
      // font:  'font/NotoSansKR-Bold.ttf',
    });
    const { id, name, price } = data;

    doc.fontSize(18).text(`청구서 #${id}`, 100, 100);
    doc.fontSize(12).text(`Customer: ${name}`, 100, 150);
    console.log('invoiceId', id);
    doc.moveDown();
    doc.fontSize(14).text('Items:', 100, 200);
    doc.moveDown();

    doc.moveDown();
    doc.fontSize(14).text(`Total: $${price.toFixed(2)}`, 100, doc.y);

    return this.savePDF(doc);
  }

  private async savePDF(doc: PDFDocument): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = [];
      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', (err) => reject(err));
      doc.end();
    });
  }

  // async deleteinvoice(userid: number, invoicid: number) {
  //   const user = await this.userService.findUserById(userid);

  //   console.log(user);

  //   if (user.role !== 1) {
  //     throw new BadRequestException('관리자만 삭제 가능합니다.');
  //   }

  //   const result = await this.InvoiceRepository.delete({ id: invoicid });

  //   return result;
  // }
  // async deleteinvoice(userid: number, invoicid: number) {
  //   const user = await this.userService.findUserById(userid);

  //   console.log(user);

  //   if (user.role !== 1) {
  //     throw new BadRequestException('관리자만 삭제 가능합니다.');
  //   }

  //   const result = await this.InvoiceRepository.delete({ id: invoicid });

  //   return result;
  // }
}
