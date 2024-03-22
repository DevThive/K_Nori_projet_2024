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
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { UserId } from 'src/auth/decorators/userId.decorator';
import { accessTokenGuard } from 'src/auth/guard/access-token.guard';
import { ClassReviewService } from './class-review.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateClassReviewDto } from './dto/create-classreview';
import { UpdateClassReviewDto } from './dto/update-classreview';
import { HideClassReviewDto } from './dto/hide-classreview';
import { DeleteClassReviewDto } from './dto/delete-classreview';

@ApiTags('클래스 리뷰')
@Controller('class-review')
export class ClassReviewController {
  constructor(private readonly classReviewService: ClassReviewService) {}

  //클래스 리뷰 조회(관리자)
  @ApiBearerAuth('accessToken')
  @UseGuards(accessTokenGuard)
  @Get('findallreviews')
  async findallreviews(@UserId() userId: number) {
    return await this.classReviewService.findallreviews(userId);
  }

  //클래스 리뷰 조회(유저)
  @ApiBearerAuth('accessToken')
  @Get('')
  async findclasses() {
    return await this.classReviewService.findreviews();
  }

  //클래스 리뷰 등록
  @ApiBearerAuth('accessToken')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload classreview with image.',
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'The image file to upload..',
        },
        title: {
          type: 'string',
          description: 'The title of the classreview.',
        },
        content: {
          type: 'string',
          description: 'The content of the classreview.',
        },
        phonenumber: {
          type: 'string',
          description: 'The phonenumeber of the user.',
        },
      },
    },
  })
  @Post(':classId')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(accessTokenGuard)
  async addclass(
    @Body() createClassReviewDto: CreateClassReviewDto,
    @Param('classId') classId: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const url = await this.classReviewService.imageUpload(file);
    return await this.classReviewService.addclassreview(
      createClassReviewDto,
      classId,
      url,
    );
  }

  //클래스 수정
  @ApiBearerAuth('accessToken')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload class with image.',
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'The image file to upload..',
        },
        title: {
          type: 'string',
          description: 'The title of the classreview.',
        },
        content: {
          type: 'string',
          description: 'The content of the classreview.',
        },
        phonenumber: {
          type: 'string',
          description: 'The phonenumber of the user.',
        },
      },
    },
  })
  @Put(':classReviewId')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(accessTokenGuard)
  async updatereservation(
    @Body() updateClassReviewDto: UpdateClassReviewDto,
    @Param('classReviewId') classReviewId: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const url = await this.classReviewService.imageUpload(file);
    return await this.classReviewService.updateclassreview(
      updateClassReviewDto,
      classReviewId,
      url,
    );
  }

  //클래스 리뷰 비공개 처리
  @ApiBearerAuth('accessToken')
  @Put('hide/:classReviewId')
  @UseGuards(accessTokenGuard)
  async hideclassreview(
    @Body() hideClassReviewDto: HideClassReviewDto,
    @UserId() userId: number,
    @Param('classReviewId') classReviewId: number,
  ) {
    return await this.classReviewService.hideclassreview(
      hideClassReviewDto,
      userId,
      classReviewId,
    );
  }

  //클래스 삭제
  @ApiBearerAuth('accessToken')
  @UseGuards(accessTokenGuard)
  @Delete(':classReviewId')
  async deleteclassreview(
    @Param('classReviewId') classReviewId: number,
    @Body() deleteClassReviewDto: DeleteClassReviewDto,
  ) {
    return await this.classReviewService.deleteclassreview(
      classReviewId,
      deleteClassReviewDto,
    );
  }
}
