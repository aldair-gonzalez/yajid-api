import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product_attributes')
export class ProductAttribute {
  @PrimaryGeneratedColumn()
  attribute_id: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: true,
  })
  name: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  attribute_type: string;
}
