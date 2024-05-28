import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Product } from 'src/products/entities/product.entity';
import { Package } from 'src/packages/entities/package.entity';

@Entity('package_products')
export class PackageProduct {
  @PrimaryGeneratedColumn()
  package_product_id: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  quantity: number;

  @OneToOne(() => Package)
  @JoinColumn({ name: 'package_id' })
  package_id: number;

  @OneToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product_id: number;
}
