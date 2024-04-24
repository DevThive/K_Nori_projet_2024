import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ContactService } from './contact.service';
import { CheckContactDto } from './dto/check-contact';
import { CreateContactDto } from './dto/create-contact';
import { UpdateContactDto } from './dto/update-contact';

@ApiTags('문의하기')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get('contactlists')
  async contactlists() {
    return await this.contactService.contactlists();
  }

  //상세조회
  @Get(':contactId')
  async contactlist(
    @Body() checkContactDto: CheckContactDto,
    @Param('contactId') contactId: number,
  ) {
    return await this.contactService.contactlist(checkContactDto, contactId);
  }

  //문의사항 생성
  @Post('addcontact')
  async addcontact(@Body() createContactDto: CreateContactDto) {
    return await this.contactService.addcontact(createContactDto);
  }

  //문의사항 수정
  @Put(':contactId')
  async updatecontact(
    @Body() updateContactDto: UpdateContactDto,
    @Body() checkContactDto: CheckContactDto,
    @Param('contactId') contactId: number,
  ) {
    return await this.contactService.updatecontact(
      checkContactDto,
      updateContactDto,
      contactId,
    );
  }

  //삭제
  @Delete(':contactId')
  async deletecontact(
    @Body() checkContactDto: CheckContactDto,
    @Param('contactId') contactId: number,
  ) {
    return await this.contactService.deletecontact(checkContactDto, contactId);
  }
}
