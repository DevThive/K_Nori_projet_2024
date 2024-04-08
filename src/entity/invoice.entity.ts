import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Relation,
  OneToMany,
  OneToOne,
} from 'typeorm';
// import { Instructor } from './instructor.entity';
import { Reservation } from './reservation.entity';
import { PayMethod } from 'src/invoice/types/pay-method.type';

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
    // onDelete: 'CASCADE',
  })
  reservation: Relation<Reservation>;
}
