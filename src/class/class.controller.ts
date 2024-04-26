import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ClassService } from './class.service';
import { accessTokenGuard } from 'src/auth/guard/access-token.guard';
import { UserId } from 'src/auth/decorators/userId.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateClassDto } from './dto/create-class';
import { UpdateClassDto } from './dto/update-class';
import { HideClassDto } from './dto/hide-class';
import { AwsService } from 'src/aws/aws.service';
// import { UpdateClassScheduleDto } from './dto/update-schedule';

@ApiTags('클래스')
@Controller('class')
export class ClassController {
  constructor(
    private readonly awsService: AwsService,
    private readonly classService: ClassService,
  ) {}

  //클래스 리스트 조회(유저)
  @ApiBearerAuth('accessToken')
  @Get('')
  async findclasses() {
    return await this.classService.findclasses();
  }

  //클래스 리스트 조회(관리자).
  @ApiBearerAuth('accessToken')
  @UseGuards(accessTokenGuard)
  @Get('/admin')
  async adminclasses(@UserId() userId: number) {
    return await this.classService.findallclasses(userId);
  }

  //클래스 등록
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
          description: 'The title of the class.',
        },
        content: {
          type: 'string',
          description: 'The content of the class.',
        },
        time: {
          type: 'string',
          description: 'The time of the class.',
        },
        // time: {
        //   type: 'string',
        //   format: 'time',
        //   description: 'Time of the class.',
        // },
        // date: {
        //   type: 'string',
        //   format: 'date',
        //   description: 'Date of the class.',
        // },
      },
    },
  })
  @Post('')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(accessTokenGuard)
  async addclass(
    @Body() createClassDto: CreateClassDto,
    @UserId() userId: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const url = await this.awsService.imageUpload(file);
    return await this.classService.addclass(createClassDto, userId, url);
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
          description: 'The title of the class.',
        },
        content: {
          type: 'string',
          description: 'The content of the class.',
        },
        time: {
          type: 'string',
          description: 'The time of the class.',
        },
        schedules: {
          type: 'string',
          description: 'The schedules of the class.',
        },
      },
    },
  })
  @Put(':classId')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(accessTokenGuard)
  async updateclass(
    @Body() updateClassDto: UpdateClassDto,
    @UserId() userId: number,
    @Param('classId') classId: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const url = await this.awsService.imageUpload(file);
    return await this.classService.updateclass(
      updateClassDto,
      userId,
      classId,
      url,
    );
  }

  // //클래스 스케줄 수정
  // @ApiBearerAuth('accessToken')
  // @Patch(':classId')
  // @UseGuards(accessTokenGuard)
  // async updateclassschedules(
  //   @Body() updateClassScheduleDto: UpdateClassScheduleDto,
  //   @UserId() userId: number,
  //   @Param('classId') classId: number,
  // ) {
  //   return await this.classService.updateclassschedules(
  //     updateClassScheduleDto,
  //     userId,
  //     classId,
  //   );
  // }

  //클래스 비공개 처리
  @ApiBearerAuth('accessToken')
  @Put('hide/:classId')
  @UseGuards(accessTokenGuard)
  async hideclass(
    @Body() hideClassDto: HideClassDto,
    @UserId() userId: number,
    @Param('classId') classId: number,
  ) {
    return await this.classService.hideclass(hideClassDto, userId, classId);
  }

  //클래스 삭제
  @ApiBearerAuth('accessToken')
  @UseGuards(accessTokenGuard)
  @Delete(':classId')
  async classdelete(
    @UserId() userId: number,
    @Param('classId') classId: number,
  ) {
    return await this.classService.deleteclass(userId, classId);
  }
  //클래스 자세히보기

  @ApiBearerAuth('accessToken')
  @Get(':classId')
  async classinfo(@Param('classId') classId: number) {
    return await this.classService.classinfo(classId);
  }
}
