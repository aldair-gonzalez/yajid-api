import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('departments')
export class Department {
  @PrimaryGeneratedColumn()
  department_id: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  department_name: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;
}
