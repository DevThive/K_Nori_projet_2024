import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Relation,
  OneToMany,
} from 'typeorm';
// import { Instructor } from './instructor.entity';
import { Reservation } from './reservation.entity';
import { ClassReview } from './class-review.entity';
import { ClassSchedule } from './class-schedule.entity';
// import { ClassSchedule } from './class-schedule.entity';

@Entity({
  name: 'classes',
})
export class Class {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ default: 18000 })
  price: number;

  @Column()
  photo: string;

  @Column()
  state: number;

  // @Column('json', { default: '' })
  // class_schedules: string[];

  @Column()
  time: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Reservation, (reservations) => reservations.class, {
    cascade: true,
  })
  reservations_content: Relation<Reservation>;

  @OneToMany(() => ClassReview, (classreviews) => classreviews.class, {
    cascade: true,
  })
  classreview_content: Relation<ClassReview>;

  @OneToMany(() => ClassSchedule, (classschedules) => classschedules.class, {
    cascade: true,
  })
  classschedules_content: Relation<ClassSchedule>;

  // @ManyToOne(() => Instructor, (instructor) => instructor.class_content)
  // instructor: Relation<Instructor>;
}
