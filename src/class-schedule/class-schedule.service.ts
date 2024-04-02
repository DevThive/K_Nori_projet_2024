// import {
//   BadRequestException,
//   Injectable,
//   NotFoundException,
// } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { ClassSchedule } from 'src/entity/class-schedule.entity';
// import { Repository } from 'typeorm';
// import { CreateClassScheduleDto } from './dto/create-class-schedule';
// import { UsersService } from 'src/users/users.service';
// import { Class } from 'src/entity/class.entity';
// import { UpdateClassScheduleDto } from './dto/update-class-schedule';

// @Injectable()
// export class ClassScheduleService {
//   constructor(
//     private readonly userService: UsersService,
//     @InjectRepository(ClassSchedule)
//     private classScheduleRepository: Repository<ClassSchedule>,
//     @InjectRepository(Class)
//     private classRepository: Repository<Class>,
//   ) {}

//   //클래스 스케줄 조회
//   async findallschedules() {
//     const classSchedules = await this.classScheduleRepository.find({});

//     return classSchedules;
//   }

//   //클래스 스케줄 조회
//   async findschedules(classId: number) {
//     const Class = await this.classRepository.findOne({
//       where: { id: classId },
//     });

//     if (!Class) {
//       throw new NotFoundException('해당 클래스가 없습니다.');
//     }

//     const classSchedule = await this.classScheduleRepository.find({
//       where: { class: { id: classId } },
//     });

//     return classSchedule;
//   }

//   //클래스 스케줄 생성
//   async addschedule(
//     createClassScheduleDto: CreateClassScheduleDto,
//     userId: number,
//     classId: number,
//   ) {
//     const user = await this.userService.findUserById(userId);
//     if (user.role !== 1) {
//       throw new BadRequestException('관리자만 등록이 가능합니다.');
//     }
//     const Class = await this.classRepository.findOne({
//       where: { id: classId },
//     });

//     if (!Class) {
//       throw new NotFoundException('해당 클래스가 없습니다.');
//     }

//     const existingTime = await this.classScheduleRepository.findOne({
//       where: {
//         class: { id: classId },
//         time: createClassScheduleDto.time,
//       },
//     });
//     if (existingTime) {
//       throw new BadRequestException('이미 해당 시간에 스케줄이 존재합니다.');
//     }
//     return await this.classScheduleRepository.save({
//       ...createClassScheduleDto,
//       class: Class,
//     });
//   }

//   //클래스 스케줄 수정
//   async updateschedule(
//     updateClassScheduleDto: UpdateClassScheduleDto,
//     userId: number,
//     classScheduleId: number,
//   ) {
//     const user = await this.userService.findUserById(userId);
//     if (user.role !== 1) {
//       throw new BadRequestException('관리자만 등록이 가능합니다.');
//     }

//     const classSchedule = await this.classScheduleRepository.findOne({
//       where: { id: classScheduleId },
//     });

//     if (!classSchedule) {
//       throw new NotFoundException('해당 클래스 스케줄이 없습니다.');
//     }

//     return await this.classScheduleRepository.update(
//       { id: classScheduleId },
//       {
//         ...updateClassScheduleDto,
//       },
//     );
//   }

//   //클래스 스케줄 삭제
//   async deleteschedule(classScheduleId: number) {
//     const classSchedule = await this.classScheduleRepository.findOne({
//       where: { id: classScheduleId },
//     });

//     if (!classSchedule) {
//       throw new NotFoundException('해당 클래스 스케줄이 없습니다.');
//     }

//     return await this.classScheduleRepository.delete({
//       id: classScheduleId,
//     });
//   }
// }
