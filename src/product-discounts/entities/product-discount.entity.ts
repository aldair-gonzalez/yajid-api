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

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @OneToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product_id: number;

  @OneToOne(() => Discount)
  @JoinColumn({ name: 'discount_id' })
  discount_id: number;
}
