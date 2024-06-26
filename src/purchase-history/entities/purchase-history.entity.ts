import { Order } from 'src/orders/entities/order.entity';
import { PurchaseState } from 'src/purchase-states/entities/purchase-state.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('purchase_history')
export class PurchaseHistory {
  @PrimaryGeneratedColumn()
  purchase_id: number;

  @Column({
    type: 'timestamp',
    nullable: false,
    update: false,
  })
  purchase_date: Date;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
    update: false,
  })
  total_price: number;

  @OneToOne(() => User, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user_id: number;

  @OneToOne(() => Order, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'order_id' })
  order_id: number;

  @OneToOne(() => PurchaseState, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'purchase_state_id' })
  purchase_state_id: number;
}
