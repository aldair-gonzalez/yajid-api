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

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  country: string;

  @Column()
  postal_code: number;

  @Column()
  comment: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user_id: number;

  @OneToOne(() => AddressType)
  @JoinColumn({ name: 'address_type_id' })
  address_type_id: number;
}
