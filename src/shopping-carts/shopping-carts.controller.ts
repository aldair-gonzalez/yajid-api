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

import { ShoppingCartsService } from './shopping-carts.service';
import { CreateShoppingCartDto } from './dto/create-shopping-cart.dto';
import { UpdateShoppingCartDto } from './dto/update-shopping-cart.dto';
import { ParseTrimFromDto } from 'src/utils/trim';

@ApiTags('shopping carts')
@Controller('shopping-carts')
export class ShoppingCartsController {
  constructor(private readonly shoppingCartsService: ShoppingCartsService) {}

  @ApiOperation({ summary: 'Create shopping cart' })
  @Post()
  async create(@Body() createShoppingCartDto: CreateShoppingCartDto) {
    try {
      ParseTrimFromDto(createShoppingCartDto);
      return await this.shoppingCartsService.create(createShoppingCartDto);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.name);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Get all shopping carts' })
  @Get()
  async findAll() {
    try {
      return await this.shoppingCartsService.findAll();
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.name);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Get shopping cart by id' })
  @Get(':cart_id')
  async findOne(@Param('cart_id') cart_id: number) {
    try {
      if (isNaN(cart_id))
        throw new BadRequestException('cart id must be a number');
      const shoppingCart = await this.shoppingCartsService.findOne(+cart_id);
      if (!shoppingCart) throw new BadRequestException('cart not found');
      return shoppingCart;
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.name);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Update shopping cart by id' })
  @Patch(':cart_id')
  async update(
    @Param('cart_id') cart_id: number,
    @Body() updateShoppingCartDto: UpdateShoppingCartDto,
  ) {
    try {
      if (isNaN(cart_id))
        throw new BadRequestException('cart id must be a number');
      const shoppingCart = await this.shoppingCartsService.findOne(+cart_id);
      if (!shoppingCart) throw new BadRequestException('cart not found');
      ParseTrimFromDto(updateShoppingCartDto);
      return await this.shoppingCartsService.update(
        +cart_id,
        updateShoppingCartDto,
      );
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.name);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Delete shopping cart by id' })
  @Delete(':cart_id')
  @HttpCode(204)
  async remove(@Param('cart_id') cart_id: number) {
    try {
      if (isNaN(cart_id))
        throw new BadRequestException('cart id must be a number');
      const shoppingCart = await this.shoppingCartsService.findOne(+cart_id);
      if (!shoppingCart) throw new BadRequestException('cart not found');
      await this.shoppingCartsService.remove(+cart_id);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.name);
      throw error;
    }
  }
}
