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
  })
  old_price: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  new_price: number;

  @Column()
  change_date: Date;

  @OneToOne(() => Package)
  @JoinColumn({ name: 'package_id' })
  package_id: number;
}
