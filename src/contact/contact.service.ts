import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from 'src/entity/contact.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateContactDto } from './dto/create-contact';
import { UpdateContactDto } from './dto/update-contact';
import { CheckContactDto } from './dto/check-contact';

@Injectable()
export class ContactService {
  constructor(
    // private readonly userService: UsersService,
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>,
  ) {}

  //생성
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

    if (checkContactDto.user_phone !== contact.user_phone) {
      throw new NotFoundException(
        '본인의 문의만 조회 또는 수정할 수 있습니다.',
      );
    }

    const updatedcontact = await this.contactRepository.update(
      { id: contactId },
      { ...updateContactDto },
    );
    return updatedcontact;
  }

  async findcontactbyid(id: number) {
    return await this.contactRepository.findOne({
      where: { id: id },
    });
  }
}
