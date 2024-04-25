import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ClassScheduleService } from './class-schedule.service';
import { UserId } from 'src/auth/decorators/userId.decorator';
import { accessTokenGuard } from 'src/auth/guard/access-token.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateClassScheduleDto } from './dto/update-class-schedule';
import { CreateClassScheduleDto } from './dto/create-class-schedule';
import { ShowClassScheduleDto } from './dto/show-class-schedule';

@ApiTags('클래스 시간')
@Controller('class-schedule')
export class ClassScheduleController {
  constructor(private readonly classScheduleService: ClassScheduleService) {}

  //클래스 스케줄 전체조회
  @Get('')
  async findallschedules() {
    return await this.classScheduleService.findallschedules();
  }
  //클래스 스케줄 상세조회(state 1인것만 조회)
  @Get(':classId')
  async findschedules(@Param('classId') classId: number) {
    return await this.classScheduleService.findschedules(classId);
  }

  //클래스 스케줄 상세조회(state 0,1 전부 조회)
  @ApiBearerAuth('accessToken')
  @Get('admin/:classId')
  @UseGuards(accessTokenGuard)
  async findallschedule(
    @Param('classId') classId: number,
    @UserId() userId: number,
  ) {
    return await this.classScheduleService.findallschedule(classId, userId);
  }

  //클래스 스케줄 추가
  @ApiBearerAuth('accessToken')
  @Post(':classId')
  @UseGuards(accessTokenGuard)
  async addschedule(
    @Body() createClassScheduleDto: CreateClassScheduleDto,
    @UserId() userId: number,
    @Param('classId') classId: number,
  ) {
    return await this.classScheduleService.addschedule(
      createClassScheduleDto,
      userId,
      classId,
    );
  }

  //클래스 스케줄 수정
  @ApiBearerAuth('accessToken')
  @Put(':classScheduleId')
  @UseGuards(accessTokenGuard)
  async updateschedule(
    @Body() updateClassScheduleDto: UpdateClassScheduleDto,
    @UserId() userId: number,
    @Param('classScheduleId') classScheduleId: number,
  ) {
    return await this.classScheduleService.updateschedule(
      updateClassScheduleDto,
      userId,
      classScheduleId,
    );
  }

  //스케줄 비공개 처리
  @ApiBearerAuth('accessToken')
  @Patch('show/:classscheduleId')
  @UseGuards(accessTokenGuard)
  async showclassschedule(
    @UserId() user_id: number,
    @Param('classscheduleId') classscheduleId: number,
    @Body() showClassScheduleDto: ShowClassScheduleDto,
  ) {
    return await this.classScheduleService.showclassschedule(
      user_id,
      classscheduleId,
      showClassScheduleDto,
    );
  }

  //   //클래스 스케줄 삭제
  //   @ApiBearerAuth('accessToken')
  //   @UseGuards(accessTokenGuard)
  //   @Delete(':classScheduleId')
  //   async deleteschedule(@Param('classScheduleId') classScheduleId: number) {
  //     return await this.classScheduleService.deleteschedule(classScheduleId);
  //   }
}
