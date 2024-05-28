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

import { ProductAttributesService } from './product-attributes.service';
import { CreateProductAttributeDto } from './dto/create-product-attribute.dto';
import { UpdateProductAttributeDto } from './dto/update-product-attribute.dto';
import { ParseTrimFromDto } from 'src/utils/trim';

@ApiTags('product-attributes')
@Controller('product-attributes')
export class ProductAttributesController {
  constructor(
    private readonly productAttributesService: ProductAttributesService,
  ) {}

  @ApiOperation({ summary: 'Create product attribute' })
  @Post()
  async create(@Body() createProductAttributeDto: CreateProductAttributeDto) {
    try {
      ParseTrimFromDto(createProductAttributeDto);
      return await this.productAttributesService.create(
        createProductAttributeDto,
      );
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Get all product attributes' })
  @Get()
  async findAll() {
    try {
      return await this.productAttributesService.findAll();
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Get product attribute by attribute_id' })
  @Get(':attribute_id')
  async findOne(@Param('attribute_id') attribute_id: number) {
    try {
      if (isNaN(attribute_id))
        throw new BadRequestException('attribute id must be a number');
      const attribute =
        await this.productAttributesService.findOne(+attribute_id);
      if (!attribute) throw new BadRequestException('attribute not found');
      return attribute;
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Update product attribute by id' })
  @Patch(':attribute_id')
  async update(
    @Param('attribute_id') attribute_id: number,
    @Body() updateProductAttributeDto: UpdateProductAttributeDto,
  ) {
    try {
      if (isNaN(attribute_id))
        throw new BadRequestException('attribute id must be a number');
      const attribute =
        await this.productAttributesService.findOne(+attribute_id);
      if (!attribute) throw new BadRequestException('attribute not found');
      ParseTrimFromDto(updateProductAttributeDto);
      return await this.productAttributesService.update(
        +attribute_id,
        updateProductAttributeDto,
      );
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Delete product attribute by id' })
  @Delete(':attribute_id')
  @HttpCode(204)
  async remove(@Param('attribute_id') attribute_id: number) {
    try {
      if (isNaN(attribute_id))
        throw new BadRequestException('attribute id must be a number');
      const attribute =
        await this.productAttributesService.findOne(+attribute_id);
      if (!attribute) throw new BadRequestException('attribute not found');
      await this.productAttributesService.remove(+attribute_id);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }
}
