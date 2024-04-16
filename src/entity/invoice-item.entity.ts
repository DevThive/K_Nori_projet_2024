import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Invoice } from './invoice.entity';

@Entity({
  name: 'invoice-item',
})
export class InvoiceItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  className: string;

  @Column()
  content: string;

  @Column()
  price: number;

  @Column()
  people: number;

  @Column({ nullable: true })
  total: string;

  @Column()
  time: string;

  @ManyToOne(() => Invoice, (invoice) => invoice.invoiceItems, {
    onDelete: 'CASCADE',
  })
  invoice: Relation<Invoice>;
}
