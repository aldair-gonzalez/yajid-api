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

import { ProductImagesService } from './product-images.service';
import { CreateProductImageDto } from './dto/create-product-image.dto';
import { UpdateProductImageDto } from './dto/update-product-image.dto';
import { ParseTrimFromDto } from 'src/utils/trim';

@ApiTags('product images')
@Controller('product-images')
export class ProductImagesController {
  constructor(private readonly productImagesService: ProductImagesService) {}

  @ApiOperation({ summary: 'create product image' })
  @Post()
  async create(@Body() createProductImageDto: CreateProductImageDto) {
    try {
      ParseTrimFromDto(createProductImageDto);
      return await this.productImagesService.create(createProductImageDto);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'get all products images' })
  @Get()
  async findAll() {
    try {
      return await this.productImagesService.findAll();
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'get product image by id' })
  @Get(':product_image_id')
  async findOne(@Param('product_image_id') product_image_id: number) {
    try {
      if (isNaN(product_image_id))
        throw new BadRequestException('product image id must be a number');
      const productImage =
        await this.productImagesService.findOne(+product_image_id);
      if (!productImage)
        throw new BadRequestException('product image not found');
      return productImage;
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'update product image by id' })
  @Patch(':product_image_id')
  async update(
    @Param('product_image_id') product_image_id: number,
    @Body() updateProductImageDto: UpdateProductImageDto,
  ) {
    try {
      if (isNaN(product_image_id))
        throw new BadRequestException('product image id must be a number');
      const productImage =
        await this.productImagesService.findOne(+product_image_id);
      if (!productImage)
        throw new BadRequestException('product image not found');
      ParseTrimFromDto(updateProductImageDto);
      return await this.productImagesService.update(
        +product_image_id,
        updateProductImageDto,
      );
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'delete product image by id' })
  @Delete(':product_image_id')
  @HttpCode(204)
  async remove(@Param('product_image_id') product_image_id: number) {
    try {
      if (isNaN(product_image_id))
        throw new BadRequestException('product image id must be a number');
      const productImage =
        await this.productImagesService.findOne(+product_image_id);
      if (!productImage)
        throw new BadRequestException('product image not found');
      await this.productImagesService.remove(+product_image_id);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }
}
