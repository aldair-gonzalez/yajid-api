import { Column, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Category } from 'src/categories/entities/category.entity';
import { Department } from 'src/departments/entities/department.entity';
import { Subcategory } from 'src/subcategories/entities/subcategory.entity';

export class Package {
  @PrimaryGeneratedColumn()
  package_id: number;

  @Column()
  package_name: string;

  @Column()
  description: string;

  @Column()
  description_brief: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  price: number;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @Column()
  is_active: boolean;

  @OneToOne(() => Department)
  @JoinColumn({ name: 'department_id' })
  department_id: number;

  @OneToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category_id: number;

  @OneToOne(() => Subcategory)
  @JoinColumn({ name: 'subcategory_id' })
  subcategory_id: number;
}
