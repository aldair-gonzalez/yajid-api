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

  @Column()
  value: string;

  @OneToOne(() => ProductAttribute)
  @JoinColumn({ name: 'attribute_id' })
  attribute_id: number;

  @OneToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product_id: number;
}
