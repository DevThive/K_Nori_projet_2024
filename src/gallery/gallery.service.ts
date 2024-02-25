import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Gallery } from 'src/entity/gallery.entity';
import { Repository } from 'typeorm';
import { CreateGalleryDto } from './dto/create-gallery';
import { UsersService } from 'src/users/users.service';
import { UpdateGalleryDto } from './dto/update-gallery';
import { HideGalleryDto } from './dto/hide-gallery';

@Injectable()
export class GalleryService {
  constructor(
    private readonly userService: UsersService,
    @InjectRepository(Gallery)
    private galleryRepository: Repository<Gallery>,
  ) {}

  //갤러리 리스트 조회(유저)
  async findallgalleries() {
    return await this.galleryRepository.find({
      select: ['photo', 'content'],
    });
  }
  //갤러리 리스트 조회(관리자)

  //갤러리 등록
  async addgallery(createGalleryDto: CreateGalleryDto, userId: number) {
    const user = await this.userService.findUserById(userId);
    if (user.role !== 1) {
      throw new BadRequestException('관리자만 등록이 가능합니다.');
    }
    const gallery = await this.galleryRepository.save({
      ...createGalleryDto,
      user: user,
    });
    return gallery;
  }
  //갤러리 수정
  async updategallery(
    updateGalleryDto: UpdateGalleryDto,
    userId: number,
    galleryId: number,
  ) {
    const user = await this.userService.findUserById(userId);
    if (user.role !== 1) {
      throw new BadRequestException('관리자만 수정이 가능합니다.');
    }

    const gallery = this.findgallerybyid(galleryId);
    if (!gallery) {
      throw new BadRequestException('해당 갤러리가 존재하지 않습니다.');
    }

    const updatedgallery = await this.galleryRepository.update(
      { id: galleryId },
      { ...updateGalleryDto },
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
}
