import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ContactService } from './contact.service';
import { CheckContactDto } from './dto/check-contact';
import { CreateContactDto } from './dto/create-contact';
import { UpdateContactDto } from './dto/update-contact';
import { ContactPasswordDto } from './dto/password-contact';

@ApiTags('문의하기')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  //문의사항 전체조회
  @Get('contactlists')
  async contactlists() {
    return await this.contactService.contactlists();
  }

  //문의사항 상세조회
  @Get(':contactId')
  async contactlist(
    @Query('user_phone') userPhone: string,
    @Param('contactId') contactId: number,
  ) {
    return await this.contactService.contactlist(userPhone, contactId);
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

  //문의사항 삭제
  @Delete(':contactId')
  async deletecontact(
    @Body() checkContactDto: CheckContactDto,
    @Param('contactId') contactId: number,
  ) {
    return await this.contactService.deletecontact(checkContactDto, contactId);
  }

  //문의사항 답변 조회
  @Get(':contactId')
  async contactanswer(
    @Body() contactpassword: ContactPasswordDto,
    @Param('contactId') contactId: number,
  ) {
    return await this.contactService.contactanswer(contactpassword, contactId);
  }
}
