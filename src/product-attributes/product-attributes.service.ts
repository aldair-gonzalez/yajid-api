import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateProductAttributeDto } from './dto/create-product-attribute.dto';
import { UpdateProductAttributeDto } from './dto/update-product-attribute.dto';
import { ProductAttribute } from './entities/product-attribute.entity';

@Injectable()
export class ProductAttributesService {
  constructor(
    @InjectRepository(ProductAttribute)
    private readonly productAttributeRepository: Repository<ProductAttribute>,
  ) {}

  async create(createProductAttributeDto: CreateProductAttributeDto) {
    return await this.productAttributeRepository.save(
      createProductAttributeDto,
    );
  }

  async findAll() {
    return await this.productAttributeRepository.find();
  }

  async findOne(attribute_id: number) {
    return await this.productAttributeRepository.findOne({
      where: { attribute_id },
    });
  }

  async update(
    attribute_id: number,
    updateProductAttributeDto: UpdateProductAttributeDto,
  ) {
    return await this.productAttributeRepository.update(
      attribute_id,
      updateProductAttributeDto,
    );
  }

  async remove(attribute_id: number) {
    return await this.productAttributeRepository.delete(attribute_id);
  }
}
