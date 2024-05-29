import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductDiscountsService } from './product-discounts.service';
import { ProductDiscountsController } from './product-discounts.controller';
import { ProductDiscount } from './entities/product-discount.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductDiscount])],
  controllers: [ProductDiscountsController],
  providers: [ProductDiscountsService],
  exports: [TypeOrmModule, ProductDiscountsService],
})
export class ProductDiscountsModule {}
