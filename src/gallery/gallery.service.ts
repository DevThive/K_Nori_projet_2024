import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Gallery } from 'src/entity/gallery.entity';
import { Repository } from 'typeorm';
import { CreateGalleryDto } from './dto/create-gallery';
import { UsersService } from 'src/users/users.service';
import { UpdateGalleryDto } from './dto/update-gallery';
import { HideGalleryDto } from './dto/hide-gallery';
import { AwsService } from 'src/aws/aws.service';
import { v4 as uuidv4 } from 'uuid'; // uuid 패키지에서 v4 함수를 사용

@Injectable()
export class GalleryService {
  constructor(
    private readonly userService: UsersService,
    private readonly awsService: AwsService,
    @InjectRepository(Gallery)
    private galleryRepository: Repository<Gallery>,
  ) {}

  //갤러리 리스트 조회(관리자)
  async findallgalleries(userId: number) {
    const user = await this.userService.findUserById(userId);
    if (user.role !== 1) {
      throw new BadRequestException('관리자만 조회가 가능합니다.');
    }

    return await this.galleryRepository.find({
      select: ['photos', 'content', 'date'],
    });
  }
  //갤러리 리스트 조회(유저)
  async findgalleries() {
    const notices = await this.galleryRepository.find({
      where: { state: 0 },
      select: ['photos', 'content', 'date'],
    });

    return notices;
  }

  //갤러리 등록
  async addgallery(
    createGalleryDto: CreateGalleryDto,
    userId: number,
    urls: string[],
  ) {
    const user = await this.userService.findUserById(userId);
    if (user.role !== 1) {
      throw new BadRequestException('관리자만 등록이 가능합니다.');
    }

    const gallery = await this.galleryRepository.save({
      ...createGalleryDto,
      photos: JSON.stringify(urls),
      user: user,
    });
    return gallery;
  }

  //갤러리 수정
  async updategallery(
    updateGalleryDto: UpdateGalleryDto,
    userId: number,
    galleryId: number,
    urls: string[],
  ) {
    const user = await this.userService.findUserById(userId);
    console.log('user', user);
    console.log('user.role ', user.role);
    if (user.role !== 1) {
      throw new BadRequestException('관리자만 수정이 가능합니다.');
    }

    const gallery = this.findgallerybyid(galleryId);
    if (!gallery) {
      throw new BadRequestException('해당 갤러리가 존재하지 않습니다.');
    }

    const updatedgallery = await this.galleryRepository.update(
      { id: galleryId },
      { ...updateGalleryDto, photos: JSON.stringify(urls) },
    );
    return updatedgallery;
  }
  //갤러리 비공개 처리
  async hidegallery(
    hideGalleryDto: HideGalleryDto,
    userId: number,
    galleryId: number,
  ) {
    const user = await this.userService.findUserById(userId);
    if (user.role !== 1) {
      throw new BadRequestException('관리자만 비공개처리가 가능합니다.');
    }

    const result = await this.galleryRepository.update(galleryId, {
      ...hideGalleryDto,
    });
    return result;
  }
  //갤러리 삭제
  async deletegallery(userId: number, galleryId: number) {
    const user = await this.userService.findUserById(userId);

    if (user.role !== 1) {
      throw new BadRequestException('관리자만 삭제가 가능합니다.');
    }

    const result = await this.galleryRepository.delete({ id: galleryId });

    return result;
  }

  async findgallerybyid(id: number) {
    return await this.galleryRepository.findOne({
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
}
