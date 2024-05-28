import { Test, TestingModule } from '@nestjs/testing';
import { PackageProductsService } from './package-products.service';

describe('PackageProductsService', () => {
  let service: PackageProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PackageProductsService],
    }).compile();

    service = module.get<PackageProductsService>(PackageProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
