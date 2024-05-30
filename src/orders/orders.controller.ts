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

import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ParseTrimFromDto } from 'src/utils/trim';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiOperation({ summary: 'Create order' })
  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    try {
      ParseTrimFromDto(createOrderDto);
      return await this.ordersService.create(createOrderDto);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Get all orders' })
  @Get()
  async findAll() {
    try {
      return await this.ordersService.findAll();
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Get order by id' })
  @Get(':order_id')
  async findOne(@Param('order_id') order_id: number) {
    try {
      if (isNaN(order_id))
        throw new BadRequestException('Order id must be a number');
      const order = await this.ordersService.findOne(+order_id);
      if (!order) throw new BadRequestException('Order not found');
      return order;
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Update order by id' })
  @Patch(':order_id')
  async update(
    @Param('order_id') order_id: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    try {
      if (isNaN(order_id))
        throw new BadRequestException('Order id must be a number');
      const order = await this.ordersService.findOne(+order_id);
      if (!order) throw new BadRequestException('Order not found');
      ParseTrimFromDto(updateOrderDto);
      return await this.ordersService.update(+order_id, updateOrderDto);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Delete order by id' })
  @Delete(':order_id')
  @HttpCode(204)
  async remove(@Param('order_id') order_id: number) {
    try {
      if (isNaN(order_id))
        throw new BadRequestException('Order id must be a number');
      const order = await this.ordersService.findOne(+order_id);
      if (!order) throw new BadRequestException('Order not found');
      await this.ordersService.remove(+order_id);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }
}
