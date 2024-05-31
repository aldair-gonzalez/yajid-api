import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Product } from 'src/products/entities/product.entity';
import { PurchaseHistory } from 'src/purchase-history/entities/purchase-history.entity';

@Entity('purchase_details')
export class PurchaseDetail {
  @PrimaryGeneratedColumn()
  purchase_detail_id: number;

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
  unit_price: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  total_price: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  discount_applied: number;

  @Column()
  discount_type: string;

  @OneToOne(() => PurchaseHistory)
  @JoinColumn({ name: 'purchase_id' })
  purchase_id: number;

  @OneToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product_id: number;
}
