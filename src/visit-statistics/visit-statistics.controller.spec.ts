import { Test, TestingModule } from '@nestjs/testing';
import { VisitStatisticsController } from './visit-statistics.controller';
import { VisitStatisticsService } from './visit-statistics.service';

describe('VisitStatisticsController', () => {
  let controller: VisitStatisticsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VisitStatisticsController],
      providers: [VisitStatisticsService],
    }).compile();

    controller = module.get<VisitStatisticsController>(VisitStatisticsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
