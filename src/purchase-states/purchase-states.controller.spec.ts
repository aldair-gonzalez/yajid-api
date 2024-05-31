import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseStatesController } from './purchase-states.controller';
import { PurchaseStatesService } from './purchase-states.service';

describe('PurchaseStatesController', () => {
  let controller: PurchaseStatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PurchaseStatesController],
      providers: [PurchaseStatesService],
    }).compile();

    controller = module.get<PurchaseStatesController>(PurchaseStatesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
