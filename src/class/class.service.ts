import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Class } from 'src/entity/class.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateClassDto } from './dto/create-class';
import { UpdateClassDto } from './dto/update-class';
import { HideClassDto } from './dto/hide-class';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class ClassService {
  constructor(
    private readonly userService: UsersService,
    @InjectRepository(Class)
    private classRepository: Repository<Class>,
  ) {}

  //클래스 리스트 조회(관리자)
  async findallclasses(userId: number) {
    const user = await this.userService.findUserById(userId);
    if (user.role !== 1) {
      throw new BadRequestException('관리자만 조회가 가능합니다.');
    }

    const allClassList = await this.classRepository.find();

    return allClassList;
  }

  //클래스 리스트 조회(유저)
  async findclasses() {
    const classList = await this.classRepository.find({
      where: { state: 0 },
      select: ['id', 'title', 'photo',  'content', 'createdAt'],
    });

    return classList;
  }

  //클래스 등록
  async addclass(
    createClassDto: CreateClassDto,
    userId: number,
    url: string,
  ) {
    const user = await this.userService.findUserById(userId);
    if (user.role !== 1) {
      throw new BadRequestException('관리자만 등록이 가능합니다.');
    }
    

    const Class = await this.classRepository.save({
      ...createClassDto,
      photo: url,
      user: user,
    });
    return Class;
  }

  //클래스 수정
  async updateclass(
    updateClassDto: UpdateClassDto,
    userId: number,
    classId: number,
    url: string,
  ) {
    const user = await this.userService.findUserById(userId);
    console.log('user', user);
    console.log('user.role ', user.role);
    if (user.role !== 1) {
      throw new BadRequestException('관리자만 수정이 가능합니다.');
    }

    const Class = this.findclassbyid(classId);
    if (!Class) {
      throw new BadRequestException('해당 클래스가 존재하지 않습니다.');
    }

    const updatedClass = await this.classRepository.update(
      { id: classId },
      { ...updateClassDto, photo: url },
    );
    return updatedClass;
  }

  //클래스 비공개 처리
  async hideclass(hideClassDto: HideClassDto, userId: number, classId: number) {
    const user = await this.userService.findUserById(userId);
    if (user.role !== 1) {
      throw new BadRequestException('관리자만 비공개처리가 가능합니다.');
    }

    const result = await this.classRepository.update(classId, {
      ...hideClassDto,
    });
    return result;
  }

  //클래스 삭제
  async deleteclass(userId: number, classId: number) {
    const user = await this.userService.findUserById(userId);

    if (user.role !== 1) {
      throw new BadRequestException('관리자만 삭제가 가능합니다.');
    }

    const result = await this.classRepository.delete({ id: classId });

    return result;
  }

  async findclassbyid(id: number) {
    return await this.classRepository.findOne({
      where: { id: id },
    });
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

  //클래스 자세히보기
  async classinfo(classId: number) {
    const Class = await this.classRepository.findOne({
      where: { id: classId },
    });
    if (!Class) {
      throw new BadRequestException('해당 클래스가 존재하지 않습니다.');
    }
    const classinfo = await this.classRepository.findOne({
      where: { id: classId },
      select: ['title', 'photo', 'content', 'state', 'createdAt'],
    });

    return classinfo;
  }
}
