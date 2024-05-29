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

import { ProductDiscountsService } from './product-discounts.service';
import { CreateProductDiscountDto } from './dto/create-product-discount.dto';
import { UpdateProductDiscountDto } from './dto/update-product-discount.dto';
import { ParseTrimFromDto } from 'src/utils/trim';

@ApiTags('product discounts')
@Controller('product-discounts')
export class ProductDiscountsController {
  constructor(
    private readonly productDiscountsService: ProductDiscountsService,
  ) {}

  @ApiOperation({ summary: 'Create product discount' })
  @Post()
  async create(@Body() createProductDiscountDto: CreateProductDiscountDto) {
    try {
      ParseTrimFromDto(createProductDiscountDto);
      return await this.productDiscountsService.create(
        createProductDiscountDto,
      );
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Get all product discounts' })
  @Get()
  async findAll() {
    try {
      return await this.productDiscountsService.findAll();
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Get product discount by id' })
  @Get(':product_discount_id')
  async findOne(@Param('product_discount_id') product_discount_id: number) {
    try {
      if (isNaN(product_discount_id))
        throw new BadRequestException('product discount id shoul be a number');
      const productDiscount =
        await this.productDiscountsService.findOne(+product_discount_id);
      if (!productDiscount)
        throw new BadRequestException('product discount not found');
      return productDiscount;
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Update product discount by id' })
  @Patch(':product_discount_id')
  async update(
    @Param('product_discount_id') product_discount_id: number,
    @Body() updateProductDiscountDto: UpdateProductDiscountDto,
  ) {
    try {
      if (isNaN(product_discount_id))
        throw new BadRequestException('product discount id shoul be a number');
      const productDiscount =
        await this.productDiscountsService.findOne(+product_discount_id);
      if (!productDiscount)
        throw new BadRequestException('product discount not found');
      ParseTrimFromDto(updateProductDiscountDto);
      return await this.productDiscountsService.update(
        +product_discount_id,
        updateProductDiscountDto,
      );
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Delete product discount by id' })
  @Delete(':product_discount_id')
  @HttpCode(204)
  async remove(@Param('product_discount_id') product_discount_id: number) {
    try {
      if (isNaN(product_discount_id))
        throw new BadRequestException('product discount id shoul be a number');
      const productDiscount =
        await this.productDiscountsService.findOne(+product_discount_id);
      if (!productDiscount)
        throw new BadRequestException('product discount not found');
      await this.productDiscountsService.remove(+product_discount_id);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }
}
