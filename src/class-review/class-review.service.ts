import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClassReview } from 'src/entity/class-review.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateClassReviewDto } from './dto/create-classreview';
import { Reservation } from 'src/entity/reservation.entity';
import { AwsService } from 'src/aws/aws.service';
import { v4 as uuidv4 } from 'uuid';
import { UpdateClassReviewDto } from './dto/update-classreview';
import { HideClassReviewDto } from './dto/hide-classreview';
import { Class } from 'src/entity/class.entity';

@Injectable()
export class ClassReviewService {
  constructor(
    private readonly userService: UsersService,
    private readonly awsService: AwsService,
    @InjectRepository(ClassReview)
    private classReviewRepository: Repository<ClassReview>,
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
    @InjectRepository(Class)
    private classRepository: Repository<Class>,
  ) {}

  //클래스리뷰 조회(관리자)
  async findallreviews(userId: number) {
    const user = await this.userService.findUserById(userId);
    if (user.role !== 1) {
      throw new BadRequestException('관리자만 조회가 가능합니다.');
    }

    return await this.classReviewRepository.find({
      select: ['title', 'photo', 'content'],
    });
  }

  //클래스리뷰 조회(유저)
  async findreviews() {
    const classReview = await this.classReviewRepository.find({
      where: { state: 0 },
      select: ['title', 'photo', 'content'],
    });

    return classReview;
  }

  //클래스 리뷰 등록
  async addclassreview(
    createClassReviewDto: CreateClassReviewDto,
    classId: number,
    url: string,
  ) {
    //클래스 예약을 핸드폰번호로 조회
    const bookedclass = await this.reservationRepository.findOne({
      where: { id: classId },
    });

    const isbooked = await this.reservationRepository.findOne({
      where: { client_phonenumber: createClassReviewDto.phonenumber },
    });
    if (!isbooked) {
      throw new NotFoundException('해당 번호로 예약한 내역이 없습니다.');
    }

    const Class = await this.classRepository.findOne({
      where: { id: classId },
    });

    if (!Class) {
      throw new NotFoundException('해당 클래스가 없습니다.');
    }

    const classreview = await this.classReviewRepository.save({
      ...createClassReviewDto,
      class: Class,
      photo: url,
    });
    return classreview;
  }

  //클래스 수정
  async updateclassreview(
    updateReviewClassDto: UpdateClassReviewDto,
    classReviewId: number,
    url: string,
  ) {
    //클래스 예약을 핸드폰번호로 조회
    const isbooked = await this.reservationRepository.findOne({
      where: { client_phonenumber: updateReviewClassDto.phonenumber },
    });
    if (!isbooked) {
      throw new NotFoundException('리뷰를 수정할 권한이 없습니다.');
    }

    const Classreview = this.findclassreviewbyid(classReviewId);
    if (!Classreview) {
      throw new BadRequestException('해당 클래스 리뷰가 존재하지 않습니다.');
    }

    const updatedclassreview = await this.classReviewRepository.update(
      { id: classReviewId },
      { ...updateReviewClassDto, photo: url },
    );
    return updatedclassreview;
  }

  //클래스 비공개 처리
  async hideclassreview(
    hideClassReviewDto: HideClassReviewDto,
    userId: number,
    classReviewId: number,
  ) {
    const user = await this.userService.findUserById(userId);
    if (user.role !== 1) {
      throw new BadRequestException('관리자만 비공개처리가 가능합니다.');
    }

    const result = await this.classReviewRepository.update(classReviewId, {
      ...hideClassReviewDto,
    });
    return result;
  }

  //클래스 삭제
  async deleteclassreview(classReviewId: number) {
    const result = await this.classReviewRepository.delete({
      id: classReviewId,
    });

    return result;
  }

  async findclassreviewbyid(id: number) {
    return await this.classReviewRepository.findOne({
      where: { id: id },
    });
  }

  async imageUpload(file: Express.Multer.File) {
    const imageName = uuidv4(); // UUID로 이미지 이름 생성
    const ext = file.originalname.split('.').pop();

    const imageUrl = await this.awsService.imageUploadToS3(
      `${imageName}.${ext}`,
      file,
      ext,
    );

    return imageUrl;
  }
}
