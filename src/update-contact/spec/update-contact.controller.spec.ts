import { Test, TestingModule } from '@nestjs/testing';
import { UpdateContactController } from './update-contact.controller';

describe('UpdateContactController', () => {
  let controller: UpdateContactController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpdateContactController],
    }).compile();

    controller = module.get<UpdateContactController>(UpdateContactController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
