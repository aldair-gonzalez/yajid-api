import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateProductDiscountDto } from './dto/create-product-discount.dto';
import { UpdateProductDiscountDto } from './dto/update-product-discount.dto';
import { ProductDiscount } from './entities/product-discount.entity';

@Injectable()
export class ProductDiscountsService {
  constructor(
    @InjectRepository(ProductDiscount)
    private readonly productDiscountRepository: Repository<ProductDiscount>,
  ) {}

  async create(createProductDiscountDto: CreateProductDiscountDto) {
    return await this.productDiscountRepository.save(createProductDiscountDto);
  }

  async findAll() {
    return await this.productDiscountRepository.find({
      relations: ['product_id', 'discount_id'],
    });
  }

  async findOne(product_discount_id: number) {
    return await this.productDiscountRepository.findOne({
      where: { product_discount_id },
      relations: ['product_id', 'discount_id'],
    });
  }

  async update(
    product_discount_id: number,
    updateProductDiscountDto: UpdateProductDiscountDto,
  ) {
    return await this.productDiscountRepository.update(
      product_discount_id,
      updateProductDiscountDto,
    );
  }

  async remove(product_discount_id: number) {
    return await this.productDiscountRepository.delete(product_discount_id);
  }
}
