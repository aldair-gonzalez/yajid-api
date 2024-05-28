import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    return await this.productRepository.save(createProductDto);
  }

  async findAll() {
    return await this.productRepository.find({
      relations: ['brand_id', 'department_id', 'category_id', 'subcategory_id'],
    });
  }

  async findOne(product_id: number) {
    return await this.productRepository.findOne({
      where: { product_id },
      relations: ['brand_id', 'department_id', 'category_id', 'subcategory_id'],
    });
  }

  async update(product_id: number, updateProductDto: UpdateProductDto) {
    return await this.productRepository.update(product_id, updateProductDto);
  }

  async remove(product_id: number) {
    return await this.productRepository.delete(product_id);
  }
}
