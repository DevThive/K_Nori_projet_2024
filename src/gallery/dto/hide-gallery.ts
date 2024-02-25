import { ApiProperty } from '@nestjs/swagger';

import { IsNumber } from 'class-validator';

export class HideGalleryDto {
  @IsNumber()
  @ApiProperty({ description: '공개&비공개', default: 0 })
  state: number;
}
