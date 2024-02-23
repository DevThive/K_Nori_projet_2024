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
import { NoticeService } from './notice.service';
import { CreateNoticeDto } from './dto/create-notice';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { accessTokenGuard } from 'src/auth/guard/access-token.guard';
import { UserId } from 'src/auth/decorators/userId.decorator';
import { UpdateNoticeDto } from './dto/update-notice';
import { HideNoticeDto } from './dto/hide-notice';

@ApiTags('게시글&공지사항')
@Controller('notice')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

  //공지사항 등록
  @ApiBearerAuth('accessToken')
  @Post()
  @UseGuards(accessTokenGuard)
  async writenotice(
    @Body() createNoticedto: CreateNoticeDto,
    @UserId() user_id: number,
  ) {
    return await this.noticeService.writennotice(createNoticedto, user_id);
  }

  //공지사항 리스트
  @Get()
  async noticelist() {
    return await this.noticeService.noticelist();
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
  @Patch('/:noticeid')
  @UseGuards(accessTokenGuard)
  async updatenotice(
    @UserId() user_id: number,
    @Param('noticeid') noticeid: number,
    @Body() updatenoticedto: UpdateNoticeDto,
  ) {
    return await this.noticeService.updatenotice(
      user_id,
      noticeid,
      updatenoticedto,
    );
  }

  //공지사항 전체 조회(관리자)
  @ApiBearerAuth('accessToken')
  @Get('all')
  @UseGuards(accessTokenGuard)
  async findallnotice(@UserId() user_id: number) {
    return await this.noticeService.findall(user_id);
  }
}
