import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { Discount } from './entities/discount.entity';

@Injectable()
export class DiscountsService {
  constructor(
    @InjectRepository(Discount)
    private readonly discountRepository: Repository<Discount>,
  ) {}

  async create(createDiscountDto: CreateDiscountDto) {
    return await this.discountRepository.save(createDiscountDto);
  }

  async findAll() {
    return await this.discountRepository.find();
  }

  async findOne(discount_id: number) {
    return await this.discountRepository.findOne({
      where: {
        discount_id,
      },
    });
  }

  async update(discount_id: number, updateDiscountDto: UpdateDiscountDto) {
    return await this.discountRepository.update(discount_id, updateDiscountDto);
  }

  async remove(discount_id: number) {
    return await this.discountRepository.delete(discount_id);
  }
}
