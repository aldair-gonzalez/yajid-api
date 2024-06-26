import { AddressType } from 'src/address-types/entities/address-type.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user_addresses')
export class UserAddress {
  @PrimaryGeneratedColumn()
  user_address_id: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  address: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  city: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  state: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  country: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  postal_code: number;

  @Column({
    type: 'text',
    nullable: true,
  })
  comment: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    update: false,
  })
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  @OneToOne(() => User, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user_id: number;

  @OneToOne(() => AddressType, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'address_type_id' })
  address_type_id: number;
}
