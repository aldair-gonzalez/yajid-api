import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PurchaseStatesService } from './purchase-states.service';
import { PurchaseStatesController } from './purchase-states.controller';
import { PurchaseState } from './entities/purchase-state.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PurchaseState])],
  controllers: [PurchaseStatesController],
  providers: [PurchaseStatesService],
  exports: [TypeOrmModule, PurchaseStatesService],
})
export class PurchaseStatesModule {}
