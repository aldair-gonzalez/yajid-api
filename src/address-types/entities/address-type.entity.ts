import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('address_types')
export class AddressType {
  @PrimaryGeneratedColumn()
  address_type_id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;
}
