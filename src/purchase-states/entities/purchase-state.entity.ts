import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('purchase_states')
export class PurchaseState {
  @PrimaryGeneratedColumn()
  purchase_state_id: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: true,
    update: false,
  })
  name: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;
}
