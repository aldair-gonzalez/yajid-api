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

import { ProductAttributeValuesService } from './product-attribute-values.service';
import { CreateProductAttributeValueDto } from './dto/create-product-attribute-value.dto';
import { UpdateProductAttributeValueDto } from './dto/update-product-attribute-value.dto';
import { ParseTrimFromDto } from 'src/utils/trim';

@ApiTags('product attribute values')
@Controller('product-attribute-values')
export class ProductAttributeValuesController {
  constructor(
    private readonly productAttributeValuesService: ProductAttributeValuesService,
  ) {}

  @ApiOperation({ summary: 'create product attribute value' })
  @Post()
  async create(
    @Body() createProductAttributeValueDto: CreateProductAttributeValueDto,
  ) {
    try {
      ParseTrimFromDto(createProductAttributeValueDto);
      return await this.productAttributeValuesService.create(
        createProductAttributeValueDto,
      );
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'get all product attribute values' })
  @Get()
  async findAll() {
    try {
      return await this.productAttributeValuesService.findAll();
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'get product attribute value by id' })
  @Get(':attribute_value_id')
  async findOne(@Param('attribute_value_id') attribute_value_id: number) {
    try {
      if (isNaN(attribute_value_id))
        throw new BadRequestException('attribute value id must be a number');
      const attributeValue =
        await this.productAttributeValuesService.findOne(attribute_value_id);
      if (!attributeValue)
        throw new BadRequestException('attribute value not found');
      return attributeValue;
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'update product attribute value by id' })
  @Patch(':attribute_value_id')
  async update(
    @Param('attribute_value_id') attribute_value_id: number,
    @Body() updateProductAttributeValueDto: UpdateProductAttributeValueDto,
  ) {
    try {
      if (isNaN(attribute_value_id))
        throw new BadRequestException('attribute value id must be a number');
      const attributeValue =
        await this.productAttributeValuesService.findOne(attribute_value_id);
      if (!attributeValue)
        throw new BadRequestException('attribute value not found');
      ParseTrimFromDto(updateProductAttributeValueDto);
      return await this.productAttributeValuesService.update(
        attribute_value_id,
        updateProductAttributeValueDto,
      );
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'delete product attribute value by id' })
  @Delete(':attribute_value_id')
  @HttpCode(204)
  async remove(@Param('attribute_value_id') attribute_value_id: number) {
    try {
      if (isNaN(attribute_value_id))
        throw new BadRequestException('attribute value id must be a number');
      const attributeValue =
        await this.productAttributeValuesService.findOne(attribute_value_id);
      if (!attributeValue)
        throw new BadRequestException('attribute value not found');
      await this.productAttributeValuesService.remove(attribute_value_id);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }
}
