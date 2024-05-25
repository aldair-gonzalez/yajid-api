import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('departments')
export class Department {
  @PrimaryGeneratedColumn()
  department_id: number;

  @Column()
  department_name: string;

  @Column()
  description: string;
}
