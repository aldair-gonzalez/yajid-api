import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Product } from 'src/products/entities/product.entity';

@Entity('product_price_history')
export class ProductPriceHistory {
  @PrimaryGeneratedColumn()
  price_history_id: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  old_price: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  new_price: number;

  @Column()
  change_date: Date;

  @OneToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product_id: number;
}
