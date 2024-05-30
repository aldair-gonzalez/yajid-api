import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('order_status')
export class OrderStatus {
  @PrimaryGeneratedColumn()
  order_status_id: number;

  @Column()
  name: string;

  @Column()
  description: string;
}
