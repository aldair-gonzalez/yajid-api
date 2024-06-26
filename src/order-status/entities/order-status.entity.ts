import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('order_status')
export class OrderStatus {
  @PrimaryGeneratedColumn()
  order_status_id: number;

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
