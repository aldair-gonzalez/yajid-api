import { Test, TestingModule } from '@nestjs/testing';
import { AddressTypesController } from './address-types.controller';
import { AddressTypesService } from './address-types.service';

describe('AddressTypesController', () => {
  let controller: AddressTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddressTypesController],
      providers: [AddressTypesService],
    }).compile();

    controller = module.get<AddressTypesController>(AddressTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
