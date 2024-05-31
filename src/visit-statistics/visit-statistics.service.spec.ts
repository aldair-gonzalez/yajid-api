import { Test, TestingModule } from '@nestjs/testing';
import { VisitStatisticsService } from './visit-statistics.service';

describe('VisitStatisticsService', () => {
  let service: VisitStatisticsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VisitStatisticsService],
    }).compile();

    service = module.get<VisitStatisticsService>(VisitStatisticsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
