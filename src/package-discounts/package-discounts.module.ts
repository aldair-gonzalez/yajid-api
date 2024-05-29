import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PackageDiscountsService } from './package-discounts.service';
import { PackageDiscountsController } from './package-discounts.controller';
import { PackageDiscount } from './entities/package-discount.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PackageDiscount])],
  controllers: [PackageDiscountsController],
  providers: [PackageDiscountsService],
  exports: [TypeOrmModule, PackageDiscountsService],
})
export class PackageDiscountsModule {}
