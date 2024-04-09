import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from 'src/entity/invoice.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class InvoiceService {
  constructor(
    private readonly userService: UsersService,
    @InjectRepository(Invoice)
    private InvoiceRepository: Repository<Invoice>,
  ) {}
  //생성
  async addinvoice(userId: number) {
    const user = await this.userService.findUserById(userId);

    if (user.role !== 1) {
      throw new BadRequestException('관리자만 작성이 가능합니다.');
    }
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

  async invoiceDetail(userId: number, invoiceId: number) {
    // const user = await this.userService.findUserById(userId);

    // if (user.role !== 1) {
    //   throw new BadRequestException('관리자만 작성이 가능합니다.');
    // }

    const data = this.InvoiceRepository.find({ where: { id: invoiceId } });

    return data;
  }
}
