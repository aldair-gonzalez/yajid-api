import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseDetailsController } from './purchase-details.controller';
import { PurchaseDetailsService } from './purchase-details.service';

describe('PurchaseDetailsController', () => {
  let controller: PurchaseDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PurchaseDetailsController],
      providers: [PurchaseDetailsService],
    }).compile();

    controller = module.get<PurchaseDetailsController>(PurchaseDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
