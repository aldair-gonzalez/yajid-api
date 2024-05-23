import { Role } from 'src/roles/entities/role.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_roles')
export class UserRole {
  @PrimaryGeneratedColumn()
  user_role_id: number;

  @OneToOne(() => Role)
  @JoinColumn({ name: 'role_id' })
  role_id: number;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user_id: number;
}
