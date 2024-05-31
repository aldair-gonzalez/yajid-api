import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PurchaseDetailsService } from './purchase-details.service';
import { PurchaseDetailsController } from './purchase-details.controller';
import { PurchaseDetail } from './entities/purchase-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PurchaseDetail])],
  controllers: [PurchaseDetailsController],
  providers: [PurchaseDetailsService],
  exports: [TypeOrmModule, PurchaseDetailsService],
})
export class PurchaseDetailsModule {}
