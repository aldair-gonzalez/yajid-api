import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Product } from 'src/products/entities/product.entity';

@Entity('product_images')
export class ProductImage {
  @PrimaryGeneratedColumn()
  product_image_id: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  image_name: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  url: string;

  @OneToOne(() => Product, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product_id: number;
}
