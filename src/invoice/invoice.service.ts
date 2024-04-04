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
    private noticesRepository: Repository<Invoice>,
  ) {}
  //생성
  async addinvoice(userId: number) {
    const user = await this.userService.findUserById(userId);

    if (user.role !== 1) {
      throw new BadRequestException('관리자만 작성이 가능합니다.');
    }
  }
}
