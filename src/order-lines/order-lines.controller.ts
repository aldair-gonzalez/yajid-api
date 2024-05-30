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

import { OrderLinesService } from './order-lines.service';
import { CreateOrderLineDto } from './dto/create-order-line.dto';
import { UpdateOrderLineDto } from './dto/update-order-line.dto';
import { ParseTrimFromDto } from 'src/utils/trim';

@ApiTags('order lines')
@Controller('order-lines')
export class OrderLinesController {
  constructor(private readonly orderLinesService: OrderLinesService) {}

  @ApiOperation({ summary: 'create order line' })
  @Post()
  async create(@Body() createOrderLineDto: CreateOrderLineDto) {
    try {
      ParseTrimFromDto(createOrderLineDto);
      return await this.orderLinesService.create(createOrderLineDto);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'get all order lines' })
  @Get()
  async findAll() {
    try {
      return await this.orderLinesService.findAll();
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'get order line by id' })
  @Get(':order_line_id')
  async findOne(@Param('order_line_id') order_line_id: number) {
    try {
      if (isNaN(order_line_id))
        throw new BadRequestException('order line id must be a number');
      const orderLine = await this.orderLinesService.findOne(+order_line_id);
      if (!orderLine) throw new BadRequestException('order line not found');
      return orderLine;
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'update order line by id' })
  @Patch(':order_line_id')
  async update(
    @Param('order_line_id') order_line_id: number,
    @Body() updateOrderLineDto: UpdateOrderLineDto,
  ) {
    try {
      if (isNaN(order_line_id))
        throw new BadRequestException('order line id must be a number');
      const orderLine = await this.orderLinesService.findOne(+order_line_id);
      if (!orderLine) throw new BadRequestException('order line not found');
      ParseTrimFromDto(updateOrderLineDto);
      return await this.orderLinesService.update(
        +order_line_id,
        updateOrderLineDto,
      );
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'delete order line by id' })
  @Delete(':order_line_id')
  @HttpCode(204)
  async remove(@Param('order_line_id') order_line_id: number) {
    try {
      if (isNaN(order_line_id))
        throw new BadRequestException('order line id must be a number');
      const orderLine = await this.orderLinesService.findOne(+order_line_id);
      if (!orderLine) throw new BadRequestException('order line not found');
      await this.orderLinesService.remove(+order_line_id);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }
}
