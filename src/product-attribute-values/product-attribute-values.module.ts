import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductAttributeValuesService } from './product-attribute-values.service';
import { ProductAttributeValuesController } from './product-attribute-values.controller';
import { ProductAttributeValue } from './entities/product-attribute-value.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductAttributeValue])],
  controllers: [ProductAttributeValuesController],
  providers: [ProductAttributeValuesService],
  exports: [TypeOrmModule, ProductAttributeValuesService],
})
export class ProductAttributeValuesModule {}
