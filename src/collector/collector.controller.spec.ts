import { Test, TestingModule } from '@nestjs/testing';
import { CollectorController } from './collector.controller';
import { CollectorService } from './collector.service';

describe('CollectorController', () => {
  let controller: CollectorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CollectorController],
      providers: [CollectorService],
    }).compile();

    controller = module.get<CollectorController>(CollectorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
