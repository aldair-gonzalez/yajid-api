import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  name: string;

  @Column()
  last_name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phone_number: number;

  @Column()
  password: string;

  @Column()
  provider: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
