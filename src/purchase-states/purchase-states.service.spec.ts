import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseStatesService } from './purchase-states.service';

describe('PurchaseStatesService', () => {
  let service: PurchaseStatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PurchaseStatesService],
    }).compile();

    service = module.get<PurchaseStatesService>(PurchaseStatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
