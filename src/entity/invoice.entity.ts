import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Relation,
  OneToMany,
} from 'typeorm';
// import { Instructor } from './instructor.entity';
import { Reservation } from './reservation.entity';

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
  dueDate: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
