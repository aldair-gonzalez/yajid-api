import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateProductAttributeValueDto } from './dto/create-product-attribute-value.dto';
import { UpdateProductAttributeValueDto } from './dto/update-product-attribute-value.dto';
import { ProductAttributeValue } from './entities/product-attribute-value.entity';

@Injectable()
export class ProductAttributeValuesService {
  constructor(
    @InjectRepository(ProductAttributeValue)
    private readonly productAttributeValueRepository: Repository<ProductAttributeValue>,
  ) {}

  async create(createProductAttributeValueDto: CreateProductAttributeValueDto) {
    return await this.productAttributeValueRepository.save(
      createProductAttributeValueDto,
    );
  }

  async findAll() {
    return await this.productAttributeValueRepository.find({
      relations: ['attribute_id', 'product_id'],
    });
  }

  async findOne(attribute_value_id: number) {
    return await this.productAttributeValueRepository.findOne({
      where: { attribute_value_id },
      relations: ['attribute_id', 'product_id'],
    });
  }

  async update(
    attribute_value_id: number,
    updateProductAttributeValueDto: UpdateProductAttributeValueDto,
  ) {
    return await this.productAttributeValueRepository.update(
      attribute_value_id,
      updateProductAttributeValueDto,
    );
  }

  async remove(attribute_value_id: number) {
    return await this.productAttributeValueRepository.delete(
      attribute_value_id,
    );
  }
}
