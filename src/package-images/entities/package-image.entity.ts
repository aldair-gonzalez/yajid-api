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

  @Column()
  image_name: string;

  @Column()
  description: string;

  @Column()
  url: string;

  @OneToOne(() => Package)
  @JoinColumn({ name: 'package_id' })
  package_id: number;
}
