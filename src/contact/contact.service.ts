import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from 'src/entity/contact.entity';
import { UsersService } from 'src/users/users.service';
import { And, Repository } from 'typeorm';
import { CreateContactDto } from './dto/create-contact';
import { UpdateContactDto } from './dto/update-contact';
import { CheckContactDto } from './dto/check-contact';
import { ContactPasswordDto } from './dto/password-contact';

@Injectable()
export class ContactService {
  constructor(
    private readonly userService: UsersService,
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>,
  ) {}

  //상세조회
  async contactlist(userPhone: string, contactId: number) {
    const contact = await this.findcontactbyid(contactId);
    if (!contact) {
      throw new BadRequestException('해당 문의사항이 존재하지 않습니다.');
    }
    if (contact.public === 1 && userPhone !== contact.user_phone) {
      throw new NotFoundException(
        '본인의 문의만 조회 또는 수정할 수 있습니다.',
      );
    }

    const contactlist = await this.contactRepository.findOne({
      where: { id: contactId },
    });

    return contactlist;
  }

  //조회
  async contactlists() {
    const contactlists = await this.contactRepository.find();

    return contactlists;
  }

  //문의사항 생성
  async addcontact(createContactDto: CreateContactDto) {
    const contact = await this.contactRepository.save({
      ...createContactDto,
    });

    return contact;
  }

  //문의사항 수정
  async updatecontact(
    checkContactDto: CheckContactDto,
    updateContactDto: UpdateContactDto,
    contactId: number,
  ) {
    const contact = await this.findcontactbyid(contactId);
    if (!contact) {
      throw new BadRequestException('해당 문의사항이 존재하지 않습니다.');
    }

    if (
      contact.public === 1 &&
      checkContactDto.user_phone !== contact.user_phone
    ) {
      throw new NotFoundException(
        '본인의 문의만 조회 또는 수정할 수 있습니다.',
      );
    }
    console.log(
      'checkContactDto.user_phone, contact.user_phone',
      checkContactDto.user_phone,
      contact.user_phone,
    );
    const updatedcontact = await this.contactRepository.update(
      { id: contactId },
      { ...updateContactDto },
    );
    return updatedcontact;
  }

  //삭제
  async deletecontact(checkContactDto: CheckContactDto, contactId: number) {
    const contact = await this.findcontactbyid(contactId);
    if (!contact) {
      throw new BadRequestException('해당 문의사항이 존재하지 않습니다.');
    }

    if (checkContactDto.user_phone !== contact.user_phone) {
      throw new NotFoundException('본인의 문의만 삭제 할 수 있습니다.');
    }
    return await this.contactRepository.delete({
      id: contactId,
    });
  }

  async findcontactbyid(id: number) {
    return await this.contactRepository.findOne({
      where: { id: id },
    });
  }

  //문의 답변 비밀번호 확인 로직
  async contactanswer(contactpassword: ContactPasswordDto, id: number) {
    const contact = await this.findcontactbyid(id);

    if (!contact) {
      throw new BadRequestException('해당 문의사항이 존재하지 않습니다.');
    }

    if (contact.password !== contactpassword.password) {
      throw new BadRequestException('비밀번호가 올바르지 않습니다.');
    }

    return 200;
  }
}
