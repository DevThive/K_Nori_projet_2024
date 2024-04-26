import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { NoticeService } from './notice.service';
import { CreateNoticeDto } from './dto/create-notice';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { accessTokenGuard } from 'src/auth/guard/access-token.guard';
import { UserId } from 'src/auth/decorators/userId.decorator';
import { UpdateNoticeDto } from './dto/update-notice';
import { HideNoticeDto } from './dto/hide-notice';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { AwsService } from 'src/aws/aws.service';

@ApiTags('게시글&공지사항')
@Controller('notices')
export class NoticeController {
  constructor(
    private readonly noticeService: NoticeService,
    private readonly awsService: AwsService,
  ) {}

  //공지사항 등록
  @ApiBearerAuth('accessToken')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload notice with image.',
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'The image file to upload..',
        },
        content_name: {
          type: 'string',
          description: 'The content_name of the notice.',
        },
        content: {
          type: 'string',
          description: 'The content of the notice.',
        },
      },
    },
  })
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(accessTokenGuard)
  async writenotice(
    @Body() createNoticedto: CreateNoticeDto,
    @UserId() user_id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const url = await this.awsService.imageUpload(file);
    return await this.noticeService.writennotice(createNoticedto, user_id, url);
  }

  //공지사항 전체 조회(관리자)
  @ApiBearerAuth('accessToken')
  @Get('/admin')
  @UseGuards(accessTokenGuard)
  async findallnotice(@UserId() user_id: number) {
    return await this.noticeService.findall(user_id);
  }

  //공지사항 리스트
  @Get()
  async noticelist() {
    return await this.noticeService.noticelist();
  }

  //공지사항 자세히보기
  @Get('/:noticeid')
  async noticedetail(@Param('noticeid') noticeid: number) {
    return await this.noticeService.noticedetail(noticeid);
  }

  //공지사항 비공개 처리
  @ApiBearerAuth('accessToken')
  @Patch('hide/:noticeid')
  @UseGuards(accessTokenGuard)
  async noticehide(
    @UserId() user_id: number,
    @Body() hidenoticeDto: HideNoticeDto,
    @Param('noticeid') noticeid: number,
  ) {
    return await this.noticeService.noticehide(
      user_id,
      noticeid,
      hidenoticeDto,
    );
  }

  //공지사항 삭제
  @ApiBearerAuth('accessToken')
  @Delete('/:noticeid')
  @UseGuards(accessTokenGuard)
  async deletenotice(
    @UserId() user_id: number,
    @Param('noticeid') noticeid: number,
  ) {
    return await this.noticeService.deletenotice(user_id, noticeid);
  }

  //공지사항 수정
  @ApiBearerAuth('accessToken')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload notice with image.',
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
            description: 'The image files to upload.',
          },
        },
        content_name: {
          type: 'string',
          description: 'The content_name of the notice.',
        },
        content: {
          type: 'string',
          description: 'The content of the notice.',
        },
      },
    },
  })
  @Patch('/:noticeid')
  @UseInterceptors(FilesInterceptor('files', 5))
  @UseGuards(accessTokenGuard)
  async updatenotice(
    @UserId() user_id: number,
    @Param('noticeid') noticeid: number,
    @Body() updatenoticedto: UpdateNoticeDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const urls = await Promise.all(
      files.map(async (file) => await this.awsService.imageUpload(file)),
    );
    return await this.noticeService.updatenotice(
      user_id,
      noticeid,
      updatenoticedto,
      urls,
    );
  }
}
