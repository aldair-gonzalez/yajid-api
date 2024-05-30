import { Test, TestingModule } from '@nestjs/testing';
import { PackagePriceHistoryService } from './package-price-history.service';

describe('PackagePriceHistoryService', () => {
  let service: PackagePriceHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PackagePriceHistoryService],
    }).compile();

    service = module.get<PackagePriceHistoryService>(PackagePriceHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
