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

  @Column()
  purchase_date: Date;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  total_price: number;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user_id: number;

  @OneToOne(() => Order)
  @JoinColumn({ name: 'order_id' })
  order_id: number;

  @OneToOne(() => PurchaseState)
  @JoinColumn({ name: 'purchase_state_id' })
  purchase_state_id: number;
}
