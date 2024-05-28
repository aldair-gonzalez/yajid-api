import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PackageProductsService } from './package-products.service';
import { PackageProductsController } from './package-products.controller';
import { PackageProduct } from './entities/package-product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PackageProduct])],
  controllers: [PackageProductsController],
  providers: [PackageProductsService],
  exports: [TypeOrmModule, PackageProductsService],
})
export class PackageProductsModule {}
