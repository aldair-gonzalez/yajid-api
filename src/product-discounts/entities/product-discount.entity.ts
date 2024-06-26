import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Discount } from 'src/discounts/entities/discount.entity';
import { Product } from 'src/products/entities/product.entity';

@Entity('product_discounts')
export class ProductDiscount {
  @PrimaryGeneratedColumn()
  product_discount_id: number;

  @Column({
    type: 'timestamp',
    nullable: false,
    update: false,
  })
  start_date: Date;

  @Column({
    type: 'timestamp',
    nullable: false,
    update: false,
  })
  end_date: Date;

  @OneToOne(() => Product, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product_id: number;

  @OneToOne(() => Discount, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'discount_id' })
  discount_id: number;
}
