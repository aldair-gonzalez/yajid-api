import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCartProductDto } from './dto/create-cart-product.dto';
import { UpdateCartProductDto } from './dto/update-cart-product.dto';
import { CartProduct } from './entities/cart-product.entity';

@Injectable()
export class CartProductsService {
  constructor(
    @InjectRepository(CartProduct)
    private readonly cartProductRepository: Repository<CartProduct>,
  ) {}

  async create(createCartProductDto: CreateCartProductDto) {
    return await this.cartProductRepository.save(createCartProductDto);
  }

  async findAll() {
    return await this.cartProductRepository.find({
      relations: ['product_id', 'cart_id'],
    });
  }

  async findOne(cart_product_id: number) {
    return await this.cartProductRepository.findOne({
      where: { cart_product_id },
      relations: ['product_id', 'cart_id'],
    });
  }

  async update(
    cart_product_id: number,
    updateCartProductDto: UpdateCartProductDto,
  ) {
    return await this.cartProductRepository.update(
      cart_product_id,
      updateCartProductDto,
    );
  }

  async remove(cart_product_id: number) {
    return await this.cartProductRepository.delete(cart_product_id);
  }
}
