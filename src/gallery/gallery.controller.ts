import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { UserId } from 'src/auth/decorators/userId.decorator';
import { CreateGalleryDto } from './dto/create-gallery';
import { accessTokenGuard } from 'src/auth/guard/access-token.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateGalleryDto } from './dto/update-gallery';
import { HideGalleryDto } from './dto/hide-gallery';

@ApiTags('갤러리')
@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}
  //갤러리 리스트 조회(관리자)
  @ApiBearerAuth('accessToken')
  @Get('findallgalleries')
  async findallgalleries(@UserId() userId: number) {
    return await this.galleryService.findallgalleries(userId);
  }

  //갤러리 리스트 조회(유저)
  @ApiBearerAuth('accessToken')
  @Get('')
  async findgalleries() {
    return await this.galleryService.findgalleries();
  }

  //공지사항 등록
  @ApiBearerAuth('accessToken')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload menu with image.',
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'The image file to upload..',
        },
        content: {
          type: 'string',
          description: 'The name of the menu.',
        },
        date: {
          type: 'date',
          description: 'The description of the menu.',
        },
      },
    },
  })
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(accessTokenGuard)
  async addgallery(
    @Body() createGalleryDto: CreateGalleryDto,
    @UserId() userId: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const url = await this.galleryService.imageUpload(file);
    return await this.galleryService.addgallery(createGalleryDto, userId, url);
  }

  //갤러리 수정
  @ApiBearerAuth('accessToken')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload menu with image.',
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'The image file to upload..',
        },
        content: {
          type: 'string',
          description: 'The name of the menu.',
        },
        date: {
          type: 'date',
          description: 'The description of the menu.',
        },
      },
    },
  })
  @Put(':galleryId')
  @UseInterceptors(FileInterceptor('file'))
  async updatereservation(
    @Body() updateGalleryDto: UpdateGalleryDto,
    @UserId() userId: number,
    @Param('galleryId') galleryId: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const url = await this.galleryService.imageUpload(file);
    return await this.galleryService.updategallery(
      updateGalleryDto,
      userId,
      galleryId,
      url,
    );
  }

  //갤러리 비공개 처리
  @ApiBearerAuth('accessToken')
  @Put('hide/:galleryId')
  @UseGuards(accessTokenGuard)
  async hidegallery(
    @Body() hideGalleryDto: HideGalleryDto,
    @UserId() userId: number,
    @Param('galleryId') galleryId: number,
  ) {
    return await this.galleryService.hidegallery(
      hideGalleryDto,
      userId,
      galleryId,
    );
  }

  //갤러리 삭제
  @ApiBearerAuth('accessToken')
  @Delete(':galleryId')
  async deletegallery(
    @UserId() userId: number,
    @Param('galleryId') galleryId: number,
  ) {
    return await this.galleryService.deletegallery(userId, galleryId);
  }
}
