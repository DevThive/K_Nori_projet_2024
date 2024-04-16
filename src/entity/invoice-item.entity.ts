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
  content: string; //설명

  @Column({ default: 18000 })
  price: number;

  @Column()
  people: number;

  @Column()
  time: string;

  @ManyToOne(() => Invoice, (invoice) => invoice.invoiceItems, {
    onDelete: 'CASCADE',
  })
  invoice: Relation<Invoice>;
}
