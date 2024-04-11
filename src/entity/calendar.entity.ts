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

  @Column()
  title: string;

  @Column()
  calendartype: CalendarType;

  @Column()
  start: Date;

  @Column()
  end: Date;

  @Column()
  content: string;

  @Column()
  allday: boolean;

  @Column()
  state: number;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @OneToOne(() => Reservation, (reservation) => reservation.calendar, {
    // onDelete: 'CASCADE',
  })
  reservation: Relation<Reservation>;
}
