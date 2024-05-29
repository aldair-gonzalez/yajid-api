import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('discounts')
export class Discount {
  @PrimaryGeneratedColumn()
  discount_id: number;

  @Column()
  discount_name: string;

  @Column()
  discount_type: string;

  @Column()
  discount_value: number;

  @Column()
  code: string;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column()
  description: string;

  @Column()
  max_quantity: number;
}
