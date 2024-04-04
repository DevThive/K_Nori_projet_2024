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
import { CalendarType } from 'src/calendar/types/calendar-type';

@Entity({
  name: 'calendars',
})
export class Calendar {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  caledartype: CalendarType;

  @Column({ nullable: true })
  startdate: string;

  @Column({ nullable: true })
  enddate: string;

  @Column({ nullable: true })
  content: string;

  @Column({ nullable: true })
  allday: boolean;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @OneToOne(() => Reservation, (reservation) => reservation.calendar, {
    // onDelete: 'CASCADE',
  })
  reservation: Relation<Reservation>;
}
