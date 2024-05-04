import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Relation,
  OneToMany,
  OneToOne,
  BeforeInsert,
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

  @Column({ type: 'json', nullable: true })
  extendedProps: {
    calendar: string;
  };

  @BeforeInsert()
  setDefaultExtendedProps() {
    if (!this.extendedProps) {
      this.extendedProps = { calendar: 'Business' };
    }
  }

  @Column()
  start: Date;

  @Column()
  end: Date;

  @Column()
  description: string;

  @Column({ nullable: true })
  class: string;

  @Column()
  allDay: boolean;

  @Column()
  state: number;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @OneToOne(() => Reservation, (reservation) => reservation.calendar, {
    onDelete: 'CASCADE',
  })
  reservation: Relation<Reservation>;
}
