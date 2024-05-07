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
import * as bcrypt from 'bcrypt';

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
    // 해싱할 때 사용할 salt의 라운드 수를 정합니다.
    // 라운드 수가 높을수록 해싱은 더 안전해지지만, 처리 시간도 더 오래 걸립니다.
    const saltOrRounds = 10;

    // 비밀번호를 해싱합니다.
    const hashedPassword = await bcrypt.hash(
      createContactDto.password,
      saltOrRounds,
    );

    // 해싱된 비밀번호를 사용하여 contact 객체를 생성합니다.
    const contact = await this.contactRepository.save({
      ...createContactDto,
      // 원본 비밀번호 대신 해싱된 비밀번호를 저장합니다.
      password: hashedPassword,
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

    // bcrypt.compare() 함수를 사용하여 입력된 비밀번호와 저장된 해시를 비교합니다.
    // 여기서는 사용자가 입력한 평문 비밀번호와 데이터베이스에 저장된 해시된 비밀번호를 직접 비교합니다.
    const isMatch = await bcrypt.compare(
      contactpassword.password,
      contact.password,
    );

    // console.log(isMatch);

    if (!isMatch) {
      throw new BadRequestException('비밀번호가 올바르지 않습니다.');
    }

    return true;
  }
}
