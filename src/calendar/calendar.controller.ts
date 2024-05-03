import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { accessTokenGuard } from 'src/auth/guard/access-token.guard';
import { UserId } from 'src/auth/decorators/userId.decorator';
import { CreateCalendarDto } from './dto/create-calendar';
import { UpdateCalendarDto } from './dto/update-calendar';
import { HideCalendarDto } from './dto/hide-calendar';

@ApiTags('캘린더')
@Controller('calendar')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  //캘린더 생성
  @ApiBearerAuth('accessToken')
  @Post()
  @UseGuards(accessTokenGuard)
  async createcalendar(
    @Body() createCalendarDto: CreateCalendarDto,
    @UserId() userId: number,
  ) {
    return await this.calendarService.createcalendar(createCalendarDto, userId);
  }

  //캘린더 상세조회
  @ApiBearerAuth('accessToken')
  @UseGuards(accessTokenGuard)
  @Get(':calendarId')
  async findcalendar(
    @UserId() userId: number,
    @Param('calendarId') calendarId: number,
  ) {
    return await this.calendarService.findcalendar(userId, calendarId);
  }

  // 캘린더 전체 조회
  @ApiBearerAuth('accessToken')
  @UseGuards(accessTokenGuard)
  @Get('')
  async findCalendars(
    @UserId() userId: number,
    @Query('calendars') calendars: string[],
  ) {
    // `calendars`는 이미 배열이므로, 직접 `findCalendarsByList` 함수에 전달합니다.
    return await this.calendarService.findCalendarsByList(userId, calendars);
  }
  //캘린더 수정
  @ApiBearerAuth('accessToken')
  @Put(':calendarId')
  @UseGuards(accessTokenGuard)
  async updatecalendar(
    @Body() updateCalendarDto: UpdateCalendarDto,
    @UserId() userId: number,
    @Param('calendarId') calendarId: number,
  ) {
    return await this.calendarService.updatecalendar(
      updateCalendarDto,
      userId,
      calendarId,
    );
  }

  //캘린더 비공개 처리
  @ApiBearerAuth('accessToken')
  @Put('hide/:calendarId')
  @UseGuards(accessTokenGuard)
  async hidecalendar(
    @Body() hideCalendarDto: HideCalendarDto,
    @UserId() userId: number,
    @Param('calendarId') calendarId: number,
  ) {
    return await this.calendarService.hidecalendar(
      hideCalendarDto,
      userId,
      calendarId,
    );
  }

  //캘린더 삭제
  @ApiBearerAuth('accessToken')
  @UseGuards(accessTokenGuard)
  @Delete(':calendarId')
  async deletecalendar(
    @UserId() userId: number,
    @Param('calendarId') calendarId: number,
  ) {
    return await this.calendarService.deletecalendar(userId, calendarId);
  }
}
