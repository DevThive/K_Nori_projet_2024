import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

// import { noticeRole } from 'src/notice/types/Notice.type';

@Entity({
  name: 'contacts', // 데이터베이스 테이블의 이름
})
export class Notice {
  //아이디
  @PrimaryGeneratedColumn()
  id: number;

  // 문의 제목
  @Column({ unique: true })
  content_name: string;

  // 문의 내용
  @Column()
  content: string;

  //문의자 이름
  @Column()
  user_name: string;

  //문의자 핸드폰 번호
  @Column()
  user_phone: string;

  //문의자 이메일
  @Column()
  user_email: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
