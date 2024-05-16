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

@Injectable()
export class UpdateContactService {
  constructor(
    private readonly userService: UsersService,

    @InjectRepository(UpdateContact)
    private updateContactRepository: Repository<UpdateContact>,
    @InjectRepository(UpdateContact)
    private reservationRepository: Repository<UpdateContact>,
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

    const result = await this.reservationRepository.find({
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
}
