import { PickType } from '@nestjs/swagger';
import { CreateReservationDto } from './create-reservation';

export class DeleteReservationDto extends PickType(CreateReservationDto, [
  'password',
]) {}
