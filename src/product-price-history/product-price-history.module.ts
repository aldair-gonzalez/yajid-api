import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductPriceHistoryService } from './product-price-history.service';
import { ProductPriceHistoryController } from './product-price-history.controller';
import { ProductPriceHistory } from './entities/product-price-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductPriceHistory])],
  controllers: [ProductPriceHistoryController],
  providers: [ProductPriceHistoryService],
  exports: [TypeOrmModule, ProductPriceHistoryService],
})
export class ProductPriceHistoryModule {}
