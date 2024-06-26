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

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  category_name: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @OneToOne(() => Department, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'department_id' })
  department_id: number;
}
