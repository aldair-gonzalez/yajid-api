import {
  BeforeInsert,
  BeforeUpdate,
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
    nullable: false,
    update: false,
  })
  quantity: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
    update: false,
  })
  price: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  order_line_total: number;

  @OneToOne(() => Order, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'order_id' })
  order_id: number;

  @OneToOne(() => Product, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product_id: number;

  @BeforeInsert()
  @BeforeUpdate()
  private calculateOrderLineTotal() {
    if (this.quantity && this.price) {
      this.order_line_total = this.quantity * this.price;
    } else {
      this.order_line_total = null;
    }
  }
}
