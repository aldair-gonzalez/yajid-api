import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('suppliers')
export class Supplier {
  @PrimaryGeneratedColumn()
  supplier_id: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  supplier_name: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column({
    type: 'varchar',
    length: 200,
    unique: true,
    nullable: false,
  })
  phone_number: number;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
    nullable: true,
  })
  email: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
    nullable: true,
  })
  credit_limit: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  website: string;
}
