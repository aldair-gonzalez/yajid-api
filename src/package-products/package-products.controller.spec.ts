import { Test, TestingModule } from '@nestjs/testing';
import { PackageProductsController } from './package-products.controller';
import { PackageProductsService } from './package-products.service';

describe('PackageProductsController', () => {
  let controller: PackageProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PackageProductsController],
      providers: [PackageProductsService],
    }).compile();

    controller = module.get<PackageProductsController>(
      PackageProductsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
