import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductAttributesService } from './product-attributes.service';
import { ProductAttributesController } from './product-attributes.controller';
import { ProductAttribute } from './entities/product-attribute.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductAttribute])],
  controllers: [ProductAttributesController],
  providers: [ProductAttributesService],
  exports: [TypeOrmModule, ProductAttributesService],
})
export class ProductAttributesModule {}
