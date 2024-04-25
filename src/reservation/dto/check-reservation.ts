import { PickType } from '@nestjs/swagger';
import { CreateReservationDto } from './create-reservation';

export class CheckReservationDto extends PickType(CreateReservationDto, [
  'client_phonenumber',
]) {}
