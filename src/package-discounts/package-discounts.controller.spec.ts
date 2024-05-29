import { Test, TestingModule } from '@nestjs/testing';
import { PackageDiscountsController } from './package-discounts.controller';
import { PackageDiscountsService } from './package-discounts.service';

describe('PackageDiscountsController', () => {
  let controller: PackageDiscountsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PackageDiscountsController],
      providers: [PackageDiscountsService],
    }).compile();

    controller = module.get<PackageDiscountsController>(PackageDiscountsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
