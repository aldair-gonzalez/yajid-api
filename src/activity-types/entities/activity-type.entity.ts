import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('activity_types')
export class ActivityType {
  @PrimaryGeneratedColumn()
  activity_type_id: number;

  @Column()
  name: string;

  @Column()
  description: string;
}
