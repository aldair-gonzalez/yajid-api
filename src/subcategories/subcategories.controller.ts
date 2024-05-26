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
import { SubcategoriesService } from './subcategories.service';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { ParseTrimFromDto } from 'src/utils/trim';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('subcategories')
@Controller('subcategories')
export class SubcategoriesController {
  constructor(private readonly subcategoriesService: SubcategoriesService) {}

  @ApiOperation({ summary: 'Create subcategory' })
  @Post()
  async create(@Body() createSubcategoryDto: CreateSubcategoryDto) {
    try {
      ParseTrimFromDto(createSubcategoryDto);
      return await this.subcategoriesService.create(createSubcategoryDto);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Get all subcategories' })
  @Get()
  async findAll() {
    try {
      return await this.subcategoriesService.findAll();
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Get subcategory by id' })
  @Get(':category_id')
  async findOne(@Param('category_id') category_id: number) {
    try {
      if (isNaN(category_id))
        throw new BadRequestException('Category id must be a number');
      const subcategory = await this.subcategoriesService.findOne(+category_id);
      if (!subcategory) throw new BadRequestException('Subcategory not found');
      return subcategory;
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Update subcategory by id' })
  @Patch(':category_id')
  async update(
    @Param('category_id') category_id: number,
    @Body() updateSubcategoryDto: UpdateSubcategoryDto,
  ) {
    try {
      if (isNaN(category_id))
        throw new BadRequestException('Category id must be a number');
      const subcategory = await this.subcategoriesService.findOne(+category_id);
      if (!subcategory) throw new BadRequestException('Subcategory not found');
      ParseTrimFromDto(updateSubcategoryDto);
      return await this.subcategoriesService.update(
        +category_id,
        updateSubcategoryDto,
      );
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Delete subcategory by id' })
  @Delete(':category_id')
  @HttpCode(204)
  async remove(@Param('category_id') category_id: number) {
    try {
      if (isNaN(category_id))
        throw new BadRequestException('Category id must be a number');
      const subcategory = await this.subcategoriesService.findOne(+category_id);
      if (!subcategory) throw new BadRequestException('Subcategory not found');
      await this.subcategoriesService.remove(+category_id);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }
}
