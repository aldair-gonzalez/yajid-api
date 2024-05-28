import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Brand } from 'src/brands/entities/brand.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Department } from 'src/departments/entities/department.entity';
import { Subcategory } from 'src/subcategories/entities/subcategory.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  product_id: number;

  @Column()
  product_name: string;

  @Column()
  description: string;

  @Column()
  description_brief: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
  })
  price: number;

  @Column()
  sale_unit_type: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
  })
  stock: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
  })
  low_stock_threshold: number;

  @Column({
    default: true,
  })
  is_active: boolean;

  @OneToOne(() => Brand)
  @JoinColumn({ name: 'brand_id' })
  brand_id: number;

  @OneToOne(() => Department)
  @JoinColumn({ name: 'department_id' })
  department_id: number;

  @OneToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category_id: number;

  @OneToOne(() => Subcategory)
  @JoinColumn({ name: 'subcategory_id' })
  subcategory_id: number;
}
