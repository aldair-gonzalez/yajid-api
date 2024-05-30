import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateShoppingCartDto } from './dto/create-shopping-cart.dto';
import { UpdateShoppingCartDto } from './dto/update-shopping-cart.dto';
import { ShoppingCart } from './entities/shopping-cart.entity';

@Injectable()
export class ShoppingCartsService {
  constructor(
    @InjectRepository(ShoppingCart)
    private readonly shoppingCartRepository: Repository<ShoppingCart>,
  ) {}

  async create(createShoppingCartDto: CreateShoppingCartDto) {
    return await this.shoppingCartRepository.save(createShoppingCartDto);
  }

  async findAll() {
    return await this.shoppingCartRepository.find({
      relations: ['user_id'],
    });
  }

  async findOne(cart_id: number) {
    return await this.shoppingCartRepository.findOne({
      where: { cart_id },
      relations: ['user_id'],
    });
  }

  async update(cart_id: number, updateShoppingCartDto: UpdateShoppingCartDto) {
    return await this.shoppingCartRepository.update(
      cart_id,
      updateShoppingCartDto,
    );
  }

  async remove(cart_id: number) {
    return await this.shoppingCartRepository.delete(cart_id);
  }
}
