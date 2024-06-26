import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('discounts')
export class Discount {
  @PrimaryGeneratedColumn()
  discount_id: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: true,
    update: false,
  })
  discount_name: string;

  @Column({
    type: 'enum',
    nullable: false,
    update: false,
    enum: ['percentage', 'fixed_amount'],
  })
  discount_type: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
    update: false,
  })
  discount_value: number;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
    update: false,
  })
  code: string;

  @Column({
    type: 'timestamp',
    nullable: false,
    update: false,
  })
  start_date: Date;

  @Column({
    type: 'timestamp',
    nullable: false,
    update: false,
  })
  end_date: Date;

  @Column({
    type: 'text',
    nullable: false,
    update: false,
  })
  description: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
    update: false,
  })
  max_quantity: number;
}
