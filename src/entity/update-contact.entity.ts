import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Relation,
  ManyToOne,
  Column,
} from 'typeorm';
import { UpdateDateColumn } from 'typeorm';
import { Reservation } from './reservation.entity';

@Entity({
  name: 'update-contact',
})
export class UpdateContact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  contact_reply: string;

  @Column()
  state: number;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Reservation, (reservation) => reservation.updatedcontacts, {
    onDelete: 'CASCADE',
  })
  reservation: Relation<Reservation>;
}
