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
    nullable: false,
  })
  stock: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  unit_cost: number;

  @Column({
    type: 'timestamp',
    nullable: false,
  })
  purchase_date: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  updated_at: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  expiration_date: Date;

  @Column({
    type: 'text',
    nullable: true,
  })
  comments: string;

  @OneToOne(() => Product, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product_id: number;

  @OneToOne(() => Supplier, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'supplier_id' })
  supplier_id: number;
}
