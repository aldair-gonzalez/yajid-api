import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('visit_statistics')
export class VisitStatistic {
  @PrimaryGeneratedColumn()
  visit_statistics_id: number;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    update: false,
  })
  date_time: Date;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    update: false,
  })
  ip_address: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    update: false,
  })
  visited_page: string;

  @Column({
    type: 'int',
    nullable: false,
    update: false,
  })
  time_on_page: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    update: false,
  })
  visit_reference: string;
}
