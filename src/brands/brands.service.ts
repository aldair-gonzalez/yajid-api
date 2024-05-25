import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
  ) {}

  async create(createBrandDto: CreateBrandDto) {
    return await this.brandRepository.save(createBrandDto);
  }

  async findAll() {
    return await this.brandRepository.find();
  }

  async findOne(brand_id: number) {
    return await this.brandRepository.findOne({
      where: { brand_id },
    });
  }

  async update(brand_id: number, updateBrandDto: UpdateBrandDto) {
    return await this.brandRepository.update(brand_id, updateBrandDto);
  }

  async remove(brand_id: number) {
    return await this.brandRepository.delete(brand_id);
  }
}
