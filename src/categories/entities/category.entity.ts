import { Department } from 'src/departments/entities/department.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  category_id: number;

  @Column()
  category_name: string;

  @Column()
  description: string;

  @OneToOne(() => Department)
  @JoinColumn({ name: 'department_id' })
  department_id: number;
}
