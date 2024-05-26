import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('suppliers')
export class Supplier {
  @PrimaryGeneratedColumn()
  supplier_id: number;

  @Column()
  supplier_name: string;

  @Column()
  description: string;

  @Column()
  phone_number: number;

  @Column()
  email: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
  })
  credit_limit: number;

  @Column()
  website: string;
}
