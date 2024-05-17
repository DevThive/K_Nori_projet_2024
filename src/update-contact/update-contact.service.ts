import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateContact } from 'src/entity/update-contact.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateUpdatedContactDto } from './dto/create-contact';
import { UpdateContactAnswerDto } from './dto/contact-answer';
import { SmsService } from 'src/sms/sms.service';
import { Reservation } from 'src/entity/reservation.entity';

@Injectable()
export class UpdateContactService {
  constructor(
    private readonly userService: UsersService,
    private readonly smsService: SmsService,

    @InjectRepository(UpdateContact)
    private updateContactRepository: Repository<UpdateContact>,
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
  ) {}

  //수정문의 생성
  async createupdatedcontact(
    createUpdatedContactDto: CreateUpdatedContactDto,
    reservationId: number,
  ) {
    const reservation = await this.reservationRepository.find({
      where: { id: reservationId },
    });
    if (!reservation) {
      throw new NotFoundException('해당 예약이 없습니다.');
    }
    await this.updateContactRepository.save({
      ...createUpdatedContactDto,
      reservation: { id: reservationId },
    });
  }
  //수정문의 전체조회
  async findallcontacts(userId: number) {
    const user = await this.userService.findUserById(userId);

    if (user.role !== 1) {
      throw new BadRequestException('관리자만 조회가 가능합니다.');
    }

    const result = await this.updateContactRepository.find({
      where: {
        state: 0,
      },
      select: ['id', 'content', 'state', 'contact_reply', 'createdAt'],
      relations: { reservation: true },
    });

    return result;
  }
  //수정문의 상세조회
  async findupdatedcontact(userId: number, updatedcontactId: number) {
    const user = await this.userService.findUserById(userId);

    if (user.role !== 1) {
      throw new BadRequestException('관리자만 조회가 가능합니다.');
    }

    const updatedcontact = await this.updateContactRepository.findOne({
      where: { id: updatedcontactId },
    });
    if (!updatedcontact) {
      throw new NotFoundException('해당 예약수정문의가 없습니다.');
    }

    const result = await this.updateContactRepository.find({
      where: {
        id: updatedcontactId,
      },
      select: ['id', 'content', 'state', 'contact_reply'],
    });

    return result;
  }

  //수정문의 삭제
  async deletecontact(userId: number, updatedcontactId: number) {
    const user = await this.userService.findUserById(userId);

    if (user.role !== 1) {
      throw new BadRequestException('관리자만 삭제가 가능합니다.');
    }

    const result = await this.updateContactRepository.delete({
      id: updatedcontactId,
    });

    return result;
  }

  async findcontactbyid(id: number) {
    return await this.updateContactRepository.find({
      where: { id: id },
    });
  }

  //관리자 수정문의답변
  async admincontactanswer(
    updateContactAnswerDto: UpdateContactAnswerDto,
    updatecontactid: number,
    userid: number,
  ) {
    const user = await this.userService.findUserById(userid);

    if (user.role !== 1) {
      throw new BadRequestException('관리자만 수정이 가능합니다.');
    }

    const contact = await this.updateContactRepository.find({
      where: { id: updatecontactid },
    });
    console.log(contact);

    if (!contact) {
      throw new BadRequestException('해당 문의사항이 존재하지 않습니다.');
    }
    // console.log('ddsdsd');

    // const resid = contact.reservation;

    // const reservation = await this.reservationRepository.find({
    //   where: { id: reservationId },
    // });
    // if (!reservation) {
    //   throw new NotFoundException('해당 예약이 없습니다.');
    // }
    // console.log(reservation);

    const updatedcontact = await this.updateContactRepository.update(
      { id: updatecontactid },
      { ...updateContactAnswerDto },
    );

    // if (updatedcontact) {
    //   // 알림톡 구매자명과 상품명 설정
    //   const buyerName = this.smsService.getFromPhoneNumber();
    //   const from = this.smsService.getFromPhoneNumber();
    //   const to = this.smsService.getFromPhoneNumber();
    //   const url = contact.id.toString();
    //   const contentTitle = contact.contact_title;
    //   const content = contact.content;
    //   const content_reply = contact.contact_reply;
    //   const templateId = 'KA01TP240516154956064XxKInyMSBSZ';

    //   await this.smsService.sendContactAlarm(
    //     to,
    //     from,
    //     buyerName,
    //     url,
    //     contentTitle,
    //     content,
    //     templateId,
    //     content_reply,
    //   );
    // }
    return updatedcontact;
  }
}
