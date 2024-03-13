import { Test, TestingModule } from '@nestjs/testing';
import { ClassReviewService } from './class-review.service';

describe('ClassReviewService', () => {
  let service: ClassReviewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClassReviewService],
    }).compile();

    service = module.get<ClassReviewService>(ClassReviewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
