import { Test, TestingModule } from '@nestjs/testing';
import { PackagePriceHistoryController } from './package-price-history.controller';
import { PackagePriceHistoryService } from './package-price-history.service';

describe('PackagePriceHistoryController', () => {
  let controller: PackagePriceHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PackagePriceHistoryController],
      providers: [PackagePriceHistoryService],
    }).compile();

    controller = module.get<PackagePriceHistoryController>(PackagePriceHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
