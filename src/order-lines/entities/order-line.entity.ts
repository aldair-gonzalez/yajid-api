import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Order } from 'src/orders/entities/order.entity';
import { Product } from 'src/products/entities/product.entity';

@Entity('order_lines')
export class OrderLine {
  @PrimaryGeneratedColumn()
  order_line_id: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  quantity: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  price: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  order_line_total: number;

  @OneToOne(() => Order)
  @JoinColumn({ name: 'order_id' })
  order_id: number;

  @OneToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product_id: number;
}
