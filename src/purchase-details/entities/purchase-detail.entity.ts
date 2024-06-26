import {
  BeforeInsert,
  BeforeUpdate,
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
  unit_price: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  total_price: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
    default: 0,
    update: false,
  })
  discount_applied: number;

  @Column({
    type: 'enum',
    nullable: true,
    update: false,
    enum: ['percentage', 'fixed_amount'],
  })
  discount_type: string;

  @OneToOne(() => PurchaseHistory, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'purchase_id' })
  purchase_id: number;

  @OneToOne(() => Product, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product_id: number;

  @BeforeInsert()
  @BeforeUpdate()
  private calculateTotalPrice() {
    if (this.unit_price && this.quantity) {
      if (this.discount_type === 'percentage') {
        this.total_price =
          this.quantity * this.unit_price * (1 - this.discount_applied / 100);
        return;
      }
      this.total_price =
        this.quantity * this.unit_price - this.discount_applied;
    }
  }
}
