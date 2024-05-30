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

import { OrderStatusService } from './order-status.service';
import { CreateOrderStatusDto } from './dto/create-order-status.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { ParseTrimFromDto } from 'src/utils/trim';

@ApiTags('order status')
@Controller('order-status')
export class OrderStatusController {
  constructor(private readonly orderStatusService: OrderStatusService) {}

  @ApiOperation({ summary: 'create order status' })
  @Post()
  async create(@Body() createOrderStatusDto: CreateOrderStatusDto) {
    try {
      ParseTrimFromDto(createOrderStatusDto);
      return await this.orderStatusService.create(createOrderStatusDto);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'get all order status' })
  @Get()
  async findAll() {
    try {
      return await this.orderStatusService.findAll();
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'get order status by id' })
  @Get(':order_status_id')
  async findOne(@Param('order_status_id') order_status_id: number) {
    try {
      if (isNaN(order_status_id))
        throw new BadRequestException('order status id must be a number');
      const orderStatus =
        await this.orderStatusService.findOne(+order_status_id);
      if (!orderStatus) throw new BadRequestException('order status not found');
      return orderStatus;
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'update order status by id' })
  @Patch(':order_status_id')
  async update(
    @Param('order_status_id') order_status_id: number,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    try {
      if (isNaN(order_status_id))
        throw new BadRequestException('order status id must be a number');
      const orderStatus =
        await this.orderStatusService.findOne(+order_status_id);
      if (!orderStatus) throw new BadRequestException('order status not found');
      ParseTrimFromDto(updateOrderStatusDto);
      return await this.orderStatusService.update(
        +order_status_id,
        updateOrderStatusDto,
      );
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'delete order status by id' })
  @Delete(':order_status_id')
  @HttpCode(204)
  async remove(@Param('order_status_id') order_status_id: number) {
    try {
      if (isNaN(order_status_id))
        throw new BadRequestException('order status id must be a number');
      const orderStatus =
        await this.orderStatusService.findOne(+order_status_id);
      if (!orderStatus) throw new BadRequestException('order status not found');
      await this.orderStatusService.remove(+order_status_id);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }
}
