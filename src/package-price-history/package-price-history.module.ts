import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PackagePriceHistoryService } from './package-price-history.service';
import { PackagePriceHistoryController } from './package-price-history.controller';
import { PackagePriceHistory } from './entities/package-price-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PackagePriceHistory])],
  controllers: [PackagePriceHistoryController],
  providers: [PackagePriceHistoryService],
  exports: [TypeOrmModule, PackagePriceHistoryService],
})
export class PackagePriceHistoryModule {}
