import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Relation,
  ManyToOne,
  Column,
} from 'typeorm';
import { User } from './user.entity';
import { UpdateDateColumn } from 'typeorm';

@Entity({
  name: 'gallery',
})
export class Gallery {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  photos: string;

  @Column()
  content: string;

  @Column()
  state: number;

  @Column()
  date: Date;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.galleries)
  user: Relation<User>;
}
