import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';

@Entity('subcategories')
export class Subcategory {
  @PrimaryGeneratedColumn()
  subcategory_id: number;

  @Column()
  subcategory_name: string;

  @Column()
  description: string;

  @OneToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category_id: number;
}
