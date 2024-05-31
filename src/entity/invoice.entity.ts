import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Relation,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
// import { Instructor } from './instructor.entity';
import { Reservation } from './reservation.entity';
import { PayMethod } from 'src/invoice/types/pay-method.type';
import { InvoiceItem } from './invoice-item.entity';

@Entity({
  name: 'invoices',
})
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  issuedDate: Date;

  @Column()
  address: string;

  @Column()
  company: string;

  @Column()
  companyEmail: string;

  @Column()
  contact: string;

  @Column()
  name: string;

  @Column()
  service: string;

  @Column({ default: 18000 })
  price: number;

  @Column()
  note: string;

  @Column()
  totalPeople: number;

  @Column({ default: 0 })
  payMethod: PayMethod;

  @Column({ nullable: true })
  dueDate: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @OneToOne(() => Reservation, (reservation) => reservation.invoice, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  reservation: Relation<Reservation>;

  @OneToMany(() => InvoiceItem, (invoiceItems) => invoiceItems.invoice, {
    cascade: true,
  })
  invoiceItems: Relation<InvoiceItem>;
}
