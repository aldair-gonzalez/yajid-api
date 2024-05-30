import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    return await this.orderRepository.save(createOrderDto);
  }

  async findAll() {
    return await this.orderRepository.find({
      relations: ['user_id', 'cart_id', 'order_status_id'],
    });
  }

  async findOne(order_id: number) {
    return await this.orderRepository.findOne({
      where: { order_id },
      relations: ['user_id', 'cart_id', 'order_status_id'],
    });
  }

  async update(order_id: number, updateOrderDto: UpdateOrderDto) {
    return await this.orderRepository.update(order_id, updateOrderDto);
  }

  async remove(order_id: number) {
    return await this.orderRepository.delete(order_id);
  }
}
