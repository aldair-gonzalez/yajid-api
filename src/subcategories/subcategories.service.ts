import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { Subcategory } from './entities/subcategory.entity';

@Injectable()
export class SubcategoriesService {
  constructor(
    @InjectRepository(Subcategory)
    private readonly subcategoryRepository: Repository<Subcategory>,
  ) {}

  async create(createSubcategoryDto: CreateSubcategoryDto) {
    return await this.subcategoryRepository.save(createSubcategoryDto);
  }

  async findAll() {
    return await this.subcategoryRepository.find({
      relations: ['category_id'],
    });
  }

  async findOne(category_id: number) {
    return await this.subcategoryRepository.findOne({
      where: { category_id },
      relations: ['category_id'],
    });
  }

  async update(
    category_id: number,
    updateSubcategoryDto: UpdateSubcategoryDto,
  ) {
    return await this.subcategoryRepository.update(
      category_id,
      updateSubcategoryDto,
    );
  }

  async remove(category_id: number) {
    return await this.subcategoryRepository.delete(category_id);
  }
}
