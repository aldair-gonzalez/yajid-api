import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product_attributes')
export class ProductAttribute {
  @PrimaryGeneratedColumn()
  attribute_id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  attribute_type: string;
}
