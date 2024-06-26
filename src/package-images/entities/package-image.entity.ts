import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Package } from 'src/packages/entities/package.entity';

@Entity('package_images')
export class PackageImage {
  @PrimaryGeneratedColumn()
  package_image_id: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  image_name: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  url: string;

  @OneToOne(() => Package, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'package_id' })
  package_id: number;
}
