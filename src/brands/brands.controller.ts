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

import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { ParseTrimFromDto } from 'src/utils/trim';

@ApiTags('Brands')
@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @ApiOperation({ summary: 'Create brand' })
  @Post()
  async create(@Body() createBrandDto: CreateBrandDto) {
    try {
      ParseTrimFromDto(createBrandDto);
      return await this.brandsService.create(createBrandDto);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Get all brands' })
  @Get()
  async findAll() {
    try {
      return await this.brandsService.findAll();
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Get brand by id' })
  @Get(':brand_id')
  async findOne(@Param('brand_id') brand_id: number) {
    try {
      if (isNaN(+brand_id))
        throw new BadRequestException('brand id should be a number');
      const brand = await this.brandsService.findOne(+brand_id);
      if (!brand) throw new BadRequestException('brand not found');
      return brand;
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Update brand by id' })
  @Patch(':brand_id')
  async update(
    @Param('brand_id') brand_id: number,
    @Body() updateBrandDto: UpdateBrandDto,
  ) {
    try {
      if (isNaN(+brand_id))
        throw new BadRequestException('brand id should be a number');
      const brand = await this.brandsService.findOne(+brand_id);
      if (!brand) throw new BadRequestException('brand not found');
      ParseTrimFromDto(updateBrandDto);
      return await this.brandsService.update(+brand_id, updateBrandDto);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Delete brand by id' })
  @Delete(':brand_id')
  @HttpCode(204)
  async remove(@Param('brand_id') brand_id: string) {
    try {
      if (isNaN(+brand_id))
        throw new BadRequestException('brand id should be a number');
      const brand = await this.brandsService.findOne(+brand_id);
      if (!brand) throw new BadRequestException('brand not found');
      await this.brandsService.remove(+brand_id);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }
}
