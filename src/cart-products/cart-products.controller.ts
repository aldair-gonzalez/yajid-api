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

import { CartProductsService } from './cart-products.service';
import { CreateCartProductDto } from './dto/create-cart-product.dto';
import { UpdateCartProductDto } from './dto/update-cart-product.dto';
import { ParseTrimFromDto } from 'src/utils/trim';

@ApiTags('cart products')
@Controller('cart-products')
export class CartProductsController {
  constructor(private readonly cartProductsService: CartProductsService) {}

  @ApiOperation({ summary: 'create cart product' })
  @Post()
  async create(@Body() createCartProductDto: CreateCartProductDto) {
    try {
      ParseTrimFromDto(createCartProductDto);
      return await this.cartProductsService.create(createCartProductDto);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'get all cart products' })
  @Get()
  async findAll() {
    try {
      return await this.cartProductsService.findAll();
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'get cart product by id' })
  @Get(':cart_product_id')
  async findOne(@Param('cart_product_id') cart_product_id: number) {
    try {
      if (isNaN(cart_product_id))
        throw new BadRequestException('cart product id must be a number');
      const cartProduct =
        await this.cartProductsService.findOne(+cart_product_id);
      if (!cartProduct) throw new BadRequestException('cart product not found');
      return cartProduct;
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'update cart product by id' })
  @Patch(':cart_product_id')
  async update(
    @Param('cart_product_id') cart_product_id: number,
    @Body() updateCartProductDto: UpdateCartProductDto,
  ) {
    try {
      if (isNaN(cart_product_id))
        throw new BadRequestException('cart product id must be a number');
      const cartProduct =
        await this.cartProductsService.findOne(+cart_product_id);
      if (!cartProduct) throw new BadRequestException('cart product not found');
      ParseTrimFromDto(updateCartProductDto);
      return await this.cartProductsService.update(
        +cart_product_id,
        updateCartProductDto,
      );
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'delete cart product by id' })
  @Delete(':cart_product_id')
  @HttpCode(204)
  async remove(@Param('cart_product_id') cart_product_id: number) {
    try {
      if (isNaN(cart_product_id))
        throw new BadRequestException('cart product id must be a number');
      const cartProduct =
        await this.cartProductsService.findOne(+cart_product_id);
      if (!cartProduct) throw new BadRequestException('cart product not found');
      return await this.cartProductsService.remove(+cart_product_id);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }
}
