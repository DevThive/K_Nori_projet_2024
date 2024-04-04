import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceItemController } from '../invoice-item.controller';

describe('InvoiceItemController', () => {
  let controller: InvoiceItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvoiceItemController],
    }).compile();

    controller = module.get<InvoiceItemController>(InvoiceItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
