// <TableCell>클래스명</TableCell>
// <TableCell>설명</TableCell>
// <TableCell>가격</TableCell>
// <TableCell>인원수</TableCell>
// <TableCell>총액</TableCell>

import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  //   CreateDateColumn,
  //   UpdateDateColumn,
  //   ManyToOne,
  //   Relation,
  //   OneToMany,
} from 'typeorm';
// import { Instructor } from './instructor.entity';
// import { Reservation } from './reservation.entity';
// import { ClassReview } from './class-review.entity';
// import { ClassSchedule } from './class-schedule.entity';

@Entity({
  name: 'invoice-item',
})
export class InvoiceItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  className: string;

  @Column()
  content: string;

  @Column()
  price: string;

  @Column()
  people: number;

  @Column({ nullable: true })
  total: string;

  @Column()
  time: string;
}
