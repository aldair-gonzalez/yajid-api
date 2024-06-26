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

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  subcategory_name: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @OneToOne(() => Category, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  category_id: number;
}
