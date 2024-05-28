import { Product } from 'src/products/entities/product.entity';
import { Supplier } from 'src/suppliers/entities/supplier.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('inventory')
export class Inventory {
  @PrimaryGeneratedColumn()
  inventory_id: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  stock: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  unit_cost: number;

  @Column()
  purchase_date: Date;

  @Column()
  updated_at: Date;

  @Column()
  expiration_date: Date;

  @Column()
  comments: string;

  @OneToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product_id: number;

  @OneToOne(() => Supplier)
  @JoinColumn({ name: 'supplier_id' })
  supplier_id: number;
}
