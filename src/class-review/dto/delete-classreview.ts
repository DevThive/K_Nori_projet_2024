import { PickType } from '@nestjs/swagger';
import { CreateClassReviewDto } from './create-classreview';

export class DeleteClassReviewDto extends PickType(CreateClassReviewDto, [
  'phonenumber',
]) {}
