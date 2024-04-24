import { PickType } from '@nestjs/swagger';
import { CreateContactDto } from './create-contact';

export class CheckContactDto extends PickType(CreateContactDto, [
  'user_phone',
]) {}
