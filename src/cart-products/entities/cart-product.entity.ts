import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Product } from 'src/products/entities/product.entity';
import { ShoppingCart } from 'src/shopping-carts/entities/shopping-cart.entity';

@Entity('cart_products')
export class CartProduct {
  @PrimaryGeneratedColumn()
  cart_product_id: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  quantity: number;

  @Column()
  added_at: Date;

  @OneToOne(() => ShoppingCart)
  @JoinColumn({ name: 'cart_id' })
  cart_id: number;

  @OneToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product_id: number;
}
