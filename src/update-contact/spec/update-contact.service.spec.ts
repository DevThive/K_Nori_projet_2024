import { Test, TestingModule } from '@nestjs/testing';
import { UpdateContactService } from './update-contact.service';

describe('UpdateContactService', () => {
  let service: UpdateContactService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateContactService],
    }).compile();

    service = module.get<UpdateContactService>(UpdateContactService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
