import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  HttpCode,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ParseTrimFromDto } from 'src/utils/trim';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({ summary: 'Create category' })
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    try {
      ParseTrimFromDto(createCategoryDto);
      return await this.categoriesService.create(createCategoryDto);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Get all categories' })
  @Get()
  async findAll() {
    try {
      return await this.categoriesService.findAll();
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Get category by id' })
  @Get(':category_id')
  async findOne(@Param('category_id') category_id: number) {
    try {
      if (isNaN(category_id))
        throw new BadRequestException('category id should be a number');
      const category = await this.categoriesService.findOne(+category_id);
      if (!category) throw new BadRequestException('category not found');
      return category;
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Update category by id' })
  @Patch(':category_id')
  async update(
    @Param('category_id') category_id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    try {
      if (isNaN(category_id))
        throw new BadRequestException('category id should be a number');
      const category = await this.categoriesService.update(
        +category_id,
        updateCategoryDto,
      );
      if (!category) throw new BadRequestException('category not found');
      ParseTrimFromDto(updateCategoryDto);
      return await this.categoriesService.update(
        +category_id,
        updateCategoryDto,
      );
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Delete category by id' })
  @Delete(':category_id')
  @HttpCode(204)
  async remove(@Param('category_id') category_id: number) {
    try {
      if (isNaN(category_id))
        throw new BadRequestException('category id should be a number');
      const category = await this.categoriesService.findOne(+category_id);
      if (!category) throw new BadRequestException('category not found');
      await this.categoriesService.remove(+category_id);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }
}
