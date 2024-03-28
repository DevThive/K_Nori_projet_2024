import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Instructor } from 'src/entity/instructor.entity';
import { GalleryService } from 'src/gallery/gallery.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateInstructorDto } from './dto/create-instructor';
import { UpdateInstructorDto } from './dto/update-instructor';
import { HideInstructorDto } from './dto/hide-instructor';
import { v4 as uuidv4 } from 'uuid';
import { AwsService } from 'src/aws/aws.service';
@Injectable()
export class InstructorService {
  constructor(
    private readonly userService: UsersService,
    private readonly awsService: AwsService,
    @InjectRepository(Instructor)
    private instructorRepository: Repository<Instructor>,
  ) {}

  //강사 리스트 조회(관리자)
  async findallinstructors(userId: number) {
    const user = await this.userService.findUserById(userId);
    if (user.role !== 1) {
      throw new BadRequestException('관리자만 조회가 가능합니다.');
    }

    return await this.instructorRepository.find({
      select: ['name', 'photo', 'introduction'],
    });
  }
  //강사 리스트 조회(유저)
  async findinstructors() {
    const instructors = await this.instructorRepository.find({
      where: { state: 0 },
      select: ['name', 'photo', 'introduction'],
    });

    return instructors;
  }

  //강사 등록
  async addinstructor(
    createInstructorDto: CreateInstructorDto,
    userId: number,
    url: string,
  ) {
    const user = await this.userService.findUserById(userId);
    if (user.role !== 1) {
      throw new BadRequestException('관리자만 등록이 가능합니다.');
    }

    const instructor = await this.instructorRepository.save({
      ...createInstructorDto,
      photo: url,
      user: user,
    });
    return instructor;
  }

  //강사 수정
  async updateinstructor(
    updateInstructorDto: UpdateInstructorDto,
    userId: number,
    instructorId: number,
    url: string,
  ) {
    const user = await this.userService.findUserById(userId);
    console.log('user', user);
    console.log('user.role ', user.role);
    if (user.role !== 1) {
      throw new BadRequestException('관리자만 수정이 가능합니다.');
    }

    const instructor = this.findinstructorbyid(instructorId);
    if (!instructor) {
      throw new BadRequestException('해당 갤러리가 존재하지 않습니다.');
    }

    const updatedinstructor = await this.instructorRepository.update(
      { id: instructorId },
      { ...updateInstructorDto, photo: url },
    );
    return updatedinstructor;
  }

  //갤러리 비공개 처리
  async hideinstructor(
    hideinstructorDto: HideInstructorDto,
    userId: number,
    instructorId: number,
  ) {
    const user = await this.userService.findUserById(userId);
    if (user.role !== 1) {
      throw new BadRequestException('관리자만 비공개처리가 가능합니다.');
    }

    const result = await this.instructorRepository.update(instructorId, {
      ...hideinstructorDto,
    });
    return result;
  }

  //강사 삭제
  async deleteinstructor(userId: number, instructorId: number) {
    const user = await this.userService.findUserById(userId);

    if (user.role !== 1) {
      throw new BadRequestException('관리자만 삭제가 가능합니다.');
    }

    const result = await this.instructorRepository.delete({ id: instructorId });

    return result;
  }

  async findinstructorbyid(id: number) {
    return await this.instructorRepository.findOne({
      where: { id: id },
    });
  }

  //강사 자세히보기
  async instructorinfo(instructorId: number) {
    const instructor = await this.instructorRepository.findOne({
      where: { id: instructorId },
    });
    if (!instructor) {
      throw new BadRequestException('해당 강사가 존재하지 않습니다.');
    }
    const instructorinfo = await this.instructorRepository.findOne({
      where: { id: instructorId },
      select: [
        'name',
        'photo',
        'introduction',
        'state',
        'class_content',
        'createdAt',
      ],
    });

    return instructorinfo;
  }

  // async imageUpload(file: Express.Multer.File) {
  //   const imageName = uuidv4(); // UUID로 이미지 이름 생성
  //   const ext = file.originalname.split('.').pop();

  //   const imageUrl = await this.awsService.imageUploadToS3(
  //     `${imageName}.${ext}`,
  //     file,
  //     ext,
  //   );

  //   return imageUrl;
  // }
}
