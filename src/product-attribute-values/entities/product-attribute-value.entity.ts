import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ProductAttribute } from 'src/product-attributes/entities/product-attribute.entity';
import { Product } from 'src/products/entities/product.entity';

@Entity('product_attribute_values')
export class ProductAttributeValue {
  @PrimaryGeneratedColumn()
  attribute_value_id: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  value: string;

  @OneToOne(() => ProductAttribute, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'attribute_id' })
  attribute_id: number;

  @OneToOne(() => Product, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product_id: number;
}
