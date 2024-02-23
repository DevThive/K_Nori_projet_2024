import { Role } from '../users/types/userRole.type';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Relation,
} from 'typeorm';
import { Notice } from './notice.entity';

@Entity({
  name: 'users', // 데이터베이스 테이블의 이름
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  currentRefreshToken?: string;

  @Column()
  photo: string;

  @Column()
  nickname: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ type: 'enum', enum: Role, default: Role.User })
  role: Role;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Notice, (notice) => notice.user)
  notices_content: Relation<Notice>;
}
