import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from 'src/entity/invoice.entity';
import { Reservation } from 'src/entity/reservation.entity';
import { Repository, LessThan } from 'typeorm';

@Injectable()
export class ExpiryService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
    @InjectRepository(Invoice)
    private invoiceRepository: Repository<Invoice>,
  ) {}

  async removeExpiredReservations() {
    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() - 3);

    await this.reservationRepository.delete({
      createdAt: LessThan(expiryDate),
    });
  }

  async removeExpiredInvoices() {
    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() - 3);

    await this.invoiceRepository.delete({
      createdAt: LessThan(expiryDate),
    });
  }
}
