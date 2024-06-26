import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('activity_types')
export class ActivityType {
  @PrimaryGeneratedColumn()
  activity_type_id: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;
}
