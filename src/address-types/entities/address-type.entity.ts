import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('address_types')
export class AddressType {
  @PrimaryGeneratedColumn()
  address_type_id: number;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;
}
