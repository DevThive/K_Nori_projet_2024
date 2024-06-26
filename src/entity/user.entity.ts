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
import { Contact } from './contact.entity';
import { Gallery } from './gallery.entity';

@Entity({
  name: 'users', // 데이터베이스 테이블의 이름
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  currentRefreshToken?: string;

  @Column({ nullable: true })
  googleRefreshToken?: string;

  @Column({ nullable: true })
  googleAccessToken: string;

  @Column({ nullable: true, type: 'timestamp' })
  googleAccessTokenExpires: Date;

  @Column()
  photo: string;

  @Column()
  nickname: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  googleId: string;

  @Column({ type: 'enum', enum: Role, default: Role.User })
  role: Role;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Notice, (notice) => notice.user)
  notices_content: Relation<Notice>;

  @OneToMany(() => Contact, (contacts) => contacts.user)
  contacts: Relation<Contact>;

  @OneToMany(() => Gallery, (galleries) => galleries.user)
  galleries: Relation<Gallery>;

  // 기타 필요한 OneToMany 관계
}
