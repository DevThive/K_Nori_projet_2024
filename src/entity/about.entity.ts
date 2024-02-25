import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'about', // 데이터베이스 테이블의 이름
})
export class Notice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  content_name: string;

  @Column()
  content: string;

  @Column()
  photo: string;

  @Column()
  state: number;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
