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
    userid: number,
    queryParams: {
      q: string;
      status: string;
      dates: string[];
    },
  ): Promise<Invoice[]> {
    const { q = '', status = '', dates = [] } = queryParams;
    const queryLowered = q.toLowerCase();

    const queryBuilder = this.InvoiceRepository.createQueryBuilder('invoice');

    const user = await this.userService.findUserById(userid);

    if (user.role !== 1) {
      throw new BadRequestException('관리자만 작성이 가능합니다.');
    }

    if (dates.length) {
      const [start, end] = dates;
      queryBuilder.andWhere('invoice.issuedDate BETWEEN :start AND :end', {
        start,
        end,
      });
    }

    if (q) {
      queryBuilder.andWhere(
        '(LOWER(invoice.companyEmail) LIKE :queryLowered OR LOWER(invoice.name) LIKE :queryLowered OR CAST(invoice.id AS TEXT) LIKE :queryLowered OR CAST(invoice.total AS TEXT) LIKE :queryLowered OR CAST(invoice.balance AS TEXT) LIKE :queryLowered OR LOWER(invoice.dueDate) LIKE :queryLowered)',
        { queryLowered: `%${queryLowered}%` },
      );
    }

    if (status) {
      queryBuilder.andWhere('LOWER(invoice.invoiceStatus) = LOWER(:status)', {
        status,
      });
    }

    return queryBuilder.getMany();
  }
}
