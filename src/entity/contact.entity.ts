import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Relation,
} from 'typeorm';
import { User } from './user.entity';

// import { noticeRole } from 'src/notice/types/Notice.type';

@Entity({
  name: 'contacts', // 데이터베이스 테이블의 이름
})
export class Contact {
  //아이디
  @PrimaryGeneratedColumn()
  id: number;

  // 문의 제목
  @Column()
  content_title: string;

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

  //관리자 공개,비공개 처리
  @Column()
  state: number;

  //비공개 시 유저 비밀번호 입력 후 내용 확인
  @Column({ nullable: true })
  password: string;

  //답변
  @Column({ type: 'text', default: '' })
  contact_answer: string;

  //유저 선택사항(공개,비공개)
  @Column()
  public: number;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.contacts, {})
  user: Relation<User>;
}
