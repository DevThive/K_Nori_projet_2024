// import {
//   Body,
//   Controller,
//   Delete,
//   Get,
//   Param,
//   Post,
//   Put,
//   UploadedFile,
//   UseGuards,
//   UseInterceptors,
// } from '@nestjs/common';
// import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
// import { InstructorService } from './instructor.service';
// import { accessTokenGuard } from 'src/auth/guard/access-token.guard';
// import { UserId } from 'src/auth/decorators/userId.decorator';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { CreateInstructorDto } from './dto/create-instructor';
// import { UpdateInstructorDto } from './dto/update-instructor';
// import { HideInstructorDto } from './dto/hide-instructor';
// import { AwsService } from 'src/aws/aws.service';

// @ApiTags('강사')
// @Controller('instructor')
// export class InstructorController {
//   constructor(
//     private readonly instructorService: InstructorService,
//     private readonly awsService: AwsService,
//   ) {}
//   //강사 리스트 조회(관리자)
//   @ApiBearerAuth('accessToken')
//   @UseGuards(accessTokenGuard)
//   @Get('findallinstructors')
//   async findallinstructors(@UserId() userId: number) {
//     return await this.instructorService.findallinstructors(userId);
//   }

//   //강사 리스트 조회(유저)
//   @ApiBearerAuth('accessToken')
//   @Get('')
//   async findinstructors() {
//     return await this.instructorService.findinstructors();
//   }

//   //강사 등록
//   @ApiBearerAuth('accessToken')
//   @ApiConsumes('multipart/form-data')
//   @ApiBody({
//     description: 'Upload instructor with image.',
//     type: 'multipart/form-data',
//     schema: {
//       type: 'object',
//       properties: {
//         file: {
//           type: 'string',
//           format: 'binary',
//           description: 'The image file to upload..',
//         },
//         name: {
//           type: 'string',
//           description: 'The name of the instructor.',
//         },
//         introduction: {
//           type: 'string',
//           description: 'The introduction of the instructor.',
//         },
//       },
//     },
//   })
//   @Post()
//   @UseInterceptors(FileInterceptor('file'))
//   @UseGuards(accessTokenGuard)
//   async addinstructor(
//     @Body() createInstructorDto: CreateInstructorDto,
//     @UserId() userId: number,
//     @UploadedFile() file: Express.Multer.File,
//   ) {
//     const url = await this.awsService.imageUpload(file);
//     return await this.instructorService.addinstructor(
//       createInstructorDto,
//       userId,
//       url,
//     );
//   }

//   //강사 수정
//   @ApiBearerAuth('accessToken')
//   @ApiConsumes('multipart/form-data')
//   @ApiBody({
//     description: 'Upload instructor with image.',
//     type: 'multipart/form-data',
//     schema: {
//       type: 'object',
//       properties: {
//         file: {
//           type: 'string',
//           format: 'binary',
//           description: 'The image file to upload..',
//         },
//         name: {
//           type: 'string',
//           description: 'The name of the instructor.',
//         },
//         introduction: {
//           type: 'string',
//           description: 'The introduction of the instructor.',
//         },
//       },
//     },
//   })
//   @Put(':instructorId')
//   @UseInterceptors(FileInterceptor('file'))
//   @UseGuards(accessTokenGuard)
//   async updatereservation(
//     @Body() updateInstructorDto: UpdateInstructorDto,
//     @UserId() userId: number,
//     @Param('instructorId') instructorId: number,
//     @UploadedFile() file: Express.Multer.File,
//   ) {
//     const url = await this.awsService.imageUpload(file);
//     return await this.instructorService.updateinstructor(
//       updateInstructorDto,
//       userId,
//       instructorId,
//       url,
//     );
//   }

//   //강사 비공개 처리
//   @ApiBearerAuth('accessToken')
//   @Put('hide/:instructorId')
//   @UseGuards(accessTokenGuard)
//   async hideinstructor(
//     @Body() hideInstructorDto: HideInstructorDto,
//     @UserId() userId: number,
//     @Param('instructorId') instructorId: number,
//   ) {
//     return await this.instructorService.hideinstructor(
//       hideInstructorDto,
//       userId,
//       instructorId,
//     );
//   }

//   //강사 삭제
//   @ApiBearerAuth('accessToken')
//   @UseGuards(accessTokenGuard)
//   @Delete(':instructorId')
//   async deleteinstructor(
//     @UserId() userId: number,
//     @Param('instructorId') instructorId: number,
//   ) {
//     return await this.instructorService.deleteinstructor(userId, instructorId);
//   }

//   //강사 자세히보기

//   @Get(':instructorId')
//   async classinfo(@Param('instructorId') instructorId: number) {
//     return await this.instructorService.instructorinfo(instructorId);
//   }
// }
