import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return await this.categoryRepository.save(createCategoryDto);
  }

  async findAll() {
    return await this.categoryRepository.find();
  }

  async findOne(category_id: number) {
    return await this.categoryRepository.findOne({
      where: { category_id },
    });
  }

  async update(category_id: number, updateCategoryDto: UpdateCategoryDto) {
    return await this.categoryRepository.update(category_id, updateCategoryDto);
  }

  async remove(category_id: number) {
    return await this.categoryRepository.delete(category_id);
  }
}
