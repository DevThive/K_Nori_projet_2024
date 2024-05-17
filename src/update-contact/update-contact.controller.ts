import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UpdateContactService } from './update-contact.service';
import { CreateUpdatedContactDto } from './dto/create-contact';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { accessTokenGuard } from 'src/auth/guard/access-token.guard';
import { UserId } from 'src/auth/decorators/userId.decorator';
import { UpdateContactAnswerDto } from './dto/contact-answer';

@ApiTags('수정문의')
@Controller('update-contact')
export class UpdateContactController {
  constructor(private readonly updateContactService: UpdateContactService) {}

  //수정문의 생성
  @Post(':reservationId')
  async createUpdatedContact(
    @Body() createUpdatedContactDto: CreateUpdatedContactDto,
    @Param('reservationId') reservationId: number,
  ) {
    return await this.updateContactService.createupdatedcontact(
      createUpdatedContactDto,
      reservationId,
    );
  }

  //수정문의 전체조회
  @ApiBearerAuth('accessToken')
  @UseGuards(accessTokenGuard)
  @Get()
  async findAllContacts(@UserId() userId: number) {
    return await this.updateContactService.findallcontacts(userId);
  }

  //수정문의 상세조회
  @ApiBearerAuth('accessToken')
  @UseGuards(accessTokenGuard)
  @Get(':updatedcontactId')
  async findUpdatedContact(
    @UserId() userId: number,
    @Param('updatedcontactId') updatedcontactId: number,
  ) {
    return await this.updateContactService.findupdatedcontact(
      userId,
      updatedcontactId,
    );
  }

  //수정문의 삭제
  @ApiBearerAuth('accessToken')
  @UseGuards(accessTokenGuard)
  @Delete(':updatedcontactId')
  async deleteContact(
    @UserId() userId: number,
    @Param('updatedcontactId') updatedcontactId: number,
  ) {
    return await this.updateContactService.deletecontact(
      userId,
      updatedcontactId,
    );
  }

  //문의 답글
  @ApiBearerAuth('accessToken')
  @UseGuards(accessTokenGuard)
  @Patch('/reservation/:contactId')
  async createanswer(
    @Body() updateContactAnswerDto: UpdateContactAnswerDto,
    @UserId() userId: number,
    @Param('updatecontactid') updatecontactid: number,
    // @Param('reservationId') reservationId: number,
  ) {
    return await this.updateContactService.admincontactanswer(
      updateContactAnswerDto,
      updatecontactid,
      userId,
    );
  }
}
