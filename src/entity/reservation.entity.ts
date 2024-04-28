import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Relation,
  ManyToOne,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UpdateDateColumn } from 'typeorm';
import { Class } from './class.entity';
import { ClientType } from 'src/reservation/types/client-type';
import { Invoice } from './invoice.entity';
import { Calendar } from './calendar.entity';

@Entity({
  name: 'reservation',
})
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  agency: string;

  @Column()
  client_type: ClientType;

  @Column()
  totalPeople: number;

  @Column()
  client_name: string;

  @Column()
  client_email: string;

  @Column()
  state: number;

  // @Column()
  // is_completed: number;

  @Column()
  client_phonenumber: string;

  @Column()
  etc: string;

  @Column({ type: 'time' })
  time: Date;

  @Column({ type: 'date' })
  date: Date;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Class, (data) => data.reservations_content, {
    onDelete: 'CASCADE',
  })
  class: Relation<Class>;

  @OneToOne(() => Invoice, (invoice) => invoice.reservation, {
    cascade: true,
  })
  @JoinColumn()
  invoice: Relation<Invoice>;

  @OneToOne(() => Calendar, (calendar) => calendar.reservation, {
    cascade: true,
  })
  @JoinColumn()
  calendar: Relation<Calendar>;

  // @ManyToOne(() => User, (user) => user.reservations_content)
  // user: Relation<User>;
}
