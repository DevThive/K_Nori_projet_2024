import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ContactService } from './contact.service';

@ApiTags('문의하기')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  //   @Get('contactlist')
  //   async contactlist() {
  //     return await this.contactService.contactlist();
  //   }
}
