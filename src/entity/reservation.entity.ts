import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Relation,
  ManyToOne,
  Column,
} from 'typeorm';
import { UpdateDateColumn } from 'typeorm';
import { Class } from './class.entity';

@Entity({
  name: 'reservation',
})
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  // @Column()
  // date: Date;

  // @Column()
  // time: string;

  @Column()
  totalPeople: number;

  @Column()
  client_name: string;

  @Column()
  client_email: string;

  @Column()
  client_phonenumber: string;

  @Column()
  etc: string;

  @Column()
  password: number;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Class, (data) => data.reservations_content)
  class: Relation<Class>;

  // @ManyToOne(() => User, (user) => user.reservations_content)
  // user: Relation<User>;
}
