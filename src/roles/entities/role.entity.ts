import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  role_id: number;

  @Column({
    type: 'varchar',
    length: 250,
    unique: true,
    nullable: false,
  })
  role_name: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;
}
