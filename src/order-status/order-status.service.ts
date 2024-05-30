import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateOrderStatusDto } from './dto/create-order-status.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { OrderStatus } from './entities/order-status.entity';

@Injectable()
export class OrderStatusService {
  constructor(
    @InjectRepository(OrderStatus)
    private readonly orderStatusRepository: Repository<OrderStatus>,
  ) {}

  async create(createOrderStatusDto: CreateOrderStatusDto) {
    return await this.orderStatusRepository.save(createOrderStatusDto);
  }

  async findAll() {
    return await this.orderStatusRepository.find();
  }

  async findOne(order_status_id: number) {
    return await this.orderStatusRepository.findOne({
      where: { order_status_id },
    });
  }

  async update(
    order_status_id: number,
    updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    return await this.orderStatusRepository.update(
      { order_status_id },
      updateOrderStatusDto,
    );
  }

  async remove(order_status_id: number) {
    return await this.orderStatusRepository.delete({ order_status_id });
  }
}
