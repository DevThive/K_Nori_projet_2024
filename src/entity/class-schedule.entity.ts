import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Relation,
  ManyToOne,
} from 'typeorm';
import { Class } from './class.entity';

@Entity({
  name: 'class-schedule',
})
export class ClassSchedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  time: string;

  @Column()
  state: number;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Class, (classes) => classes.classschedules_content, {
    onDelete: 'CASCADE',
  })
  class: Relation<Class>;
}
