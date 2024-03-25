import { Test, TestingModule } from '@nestjs/testing';
import { ClassScheduleController } from './class-schedule.controller';

describe('ClassScheduleController', () => {
  let controller: ClassScheduleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClassScheduleController],
    }).compile();

    controller = module.get<ClassScheduleController>(ClassScheduleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
