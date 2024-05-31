import { Test, TestingModule } from '@nestjs/testing';
import { ExpiryService } from './expiry.service';

describe('ExpiryService', () => {
  let service: ExpiryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExpiryService],
    }).compile();

    service = module.get<ExpiryService>(ExpiryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
