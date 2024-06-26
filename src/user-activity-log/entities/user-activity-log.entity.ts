import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ActivityType } from 'src/activity-types/entities/activity-type.entity';
import { User } from 'src/users/entities/user.entity';

@Entity('user_activity_log')
export class UserActivityLog {
  @PrimaryGeneratedColumn()
  user_activity_log_id: number;

  @Column({
    type: 'text',
    nullable: false,
  })
  activity_details: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    update: false,
  })
  activity_date: Date;

  @OneToOne(() => User, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user_id: number;

  @OneToOne(() => ActivityType, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'activity_type_id' })
  activity_type_id: number;
}
