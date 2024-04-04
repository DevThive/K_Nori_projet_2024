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

@Entity({
  name: 'invoices',
})
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  issuedDate: Date;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  company: string;

  @Column({ nullable: true })
  companyEmail: string;

  @Column({ nullable: true })
  contact: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  service: string;

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
