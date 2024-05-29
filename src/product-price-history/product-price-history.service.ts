import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateProductPriceHistoryDto } from './dto/create-product-price-history.dto';
import { UpdateProductPriceHistoryDto } from './dto/update-product-price-history.dto';
import { ProductPriceHistory } from './entities/product-price-history.entity';

@Injectable()
export class ProductPriceHistoryService {
  constructor(
    @InjectRepository(ProductPriceHistory)
    private readonly productPriceHistoryRepository: Repository<ProductPriceHistory>,
  ) {}

  async create(createProductPriceHistoryDto: CreateProductPriceHistoryDto) {
    return await this.productPriceHistoryRepository.save(
      createProductPriceHistoryDto,
    );
  }

  async findAll() {
    return await this.productPriceHistoryRepository.find({
      relations: ['product_id'],
    });
  }

  async findOne(price_history_id: number) {
    return await this.productPriceHistoryRepository.findOne({
      where: { price_history_id },
      relations: ['product_id'],
    });
  }

  async update(
    price_history_id: number,
    updateProductPriceHistoryDto: UpdateProductPriceHistoryDto,
  ) {
    return await this.productPriceHistoryRepository.update(
      { price_history_id },
      updateProductPriceHistoryDto,
    );
  }

  async remove(price_history_id: number) {
    return await this.productPriceHistoryRepository.delete({
      price_history_id,
    });
  }
}
