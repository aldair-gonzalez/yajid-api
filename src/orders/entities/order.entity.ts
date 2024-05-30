import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { OrderStatus } from 'src/order-status/entities/order-status.entity';
import { ShoppingCart } from 'src/shopping-carts/entities/shopping-cart.entity';
import { User } from 'src/users/entities/user.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  order_id: number;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @Column()
  shipping_details: string;

  @Column()
  payment_details: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user_id: number;

  @OneToOne(() => ShoppingCart)
  @JoinColumn({ name: 'cart_id' })
  cart_id: number;

  @OneToOne(() => OrderStatus)
  @JoinColumn({ name: 'order_status_id' })
  order_status_id: number;
}
