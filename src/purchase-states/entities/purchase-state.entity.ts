import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('purchase_states')
export class PurchaseState {
  @PrimaryGeneratedColumn()
  purchase_state_id: number;

  @Column()
  name: string;

  @Column()
  description: string;
}
