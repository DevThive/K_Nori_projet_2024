import { Test, TestingModule } from '@nestjs/testing';
import { ClassReviewController } from './class-review.controller';

describe('ClassReviewController', () => {
  let controller: ClassReviewController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClassReviewController],
    }).compile();

    controller = module.get<ClassReviewController>(ClassReviewController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
