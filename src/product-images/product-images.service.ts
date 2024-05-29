import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateProductImageDto } from './dto/create-product-image.dto';
import { UpdateProductImageDto } from './dto/update-product-image.dto';
import { ProductImage } from './entities/product-image.entity';

@Injectable()
export class ProductImagesService {
  constructor(
    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,
  ) {}

  async create(createProductImageDto: CreateProductImageDto) {
    return await this.productImageRepository.save(createProductImageDto);
  }

  async findAll() {
    return await this.productImageRepository.find({
      relations: ['product_id'],
    });
  }

  async findOne(product_image_id: number) {
    return await this.productImageRepository.findOne({
      where: { product_image_id },
      relations: ['product_id'],
    });
  }

  async update(
    product_image_id: number,
    updateProductImageDto: UpdateProductImageDto,
  ) {
    return await this.productImageRepository.update(
      product_image_id,
      updateProductImageDto,
    );
  }

  async remove(product_image_id: number) {
    return await this.productImageRepository.delete(product_image_id);
  }
}
