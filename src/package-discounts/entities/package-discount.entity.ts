import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Discount } from 'src/discounts/entities/discount.entity';
import { Package } from 'src/packages/entities/package.entity';

@Entity('package_discounts')
export class PackageDiscount {
  @PrimaryGeneratedColumn()
  package_discount_id: number;

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

  @OneToOne(() => Package, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'package_id' })
  package_id: number;

  @OneToOne(() => Discount, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'discount_id' })
  discount_id: number;
}
