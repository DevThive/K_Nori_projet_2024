import { Test, TestingModule } from '@nestjs/testing';
import { ConteactController } from '../conteact.controller';

describe('ConteactController', () => {
  let controller: ConteactController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConteactController],
    }).compile();

    controller = module.get<ConteactController>(ConteactController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
