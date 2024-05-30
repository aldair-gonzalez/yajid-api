import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateOrderLineDto } from './dto/create-order-line.dto';
import { UpdateOrderLineDto } from './dto/update-order-line.dto';
import { OrderLine } from './entities/order-line.entity';

@Injectable()
export class OrderLinesService {
  constructor(
    @InjectRepository(OrderLine)
    private readonly orderLineRepository: Repository<OrderLine>,
  ) {}

  async create(createOrderLineDto: CreateOrderLineDto) {
    return await this.orderLineRepository.save(createOrderLineDto);
  }

  async findAll() {
    return await this.orderLineRepository.find({
      relations: ['order_id', 'product_id'],
    });
  }

  async findOne(order_line_id: number) {
    return await this.orderLineRepository.findOne({
      where: { order_line_id },
      relations: ['order_id', 'product_id'],
    });
  }

  async update(order_line_id: number, updateOrderLineDto: UpdateOrderLineDto) {
    return await this.orderLineRepository.update(
      order_line_id,
      updateOrderLineDto,
    );
  }

  async remove(order_line_id: number) {
    return await this.orderLineRepository.delete(order_line_id);
  }
}
