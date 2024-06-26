import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Package } from 'src/packages/entities/package.entity';

@Entity('package_price_history')
export class PackagePriceHistory {
  @PrimaryGeneratedColumn()
  package_history_id: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
    update: false,
  })
  old_price: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
    update: false,
  })
  new_price: number;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
    update: false,
  })
  change_date: Date;

  @OneToOne(() => Package, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'package_id' })
  package_id: number;
}
