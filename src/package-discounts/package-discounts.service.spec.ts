import { Test, TestingModule } from '@nestjs/testing';
import { PackageDiscountsService } from './package-discounts.service';

describe('PackageDiscountsService', () => {
  let service: PackageDiscountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PackageDiscountsService],
    }).compile();

    service = module.get<PackageDiscountsService>(PackageDiscountsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
