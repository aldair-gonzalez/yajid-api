import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('visit_statistics')
export class VisitStatistic {
  @PrimaryGeneratedColumn()
  visit_statistics_id: number;

  @Column()
  date_time: Date;

  @Column()
  ip_address: string;

  @Column()
  visited_page: string;

  @Column()
  time_on_page: number;

  @Column()
  visit_reference: string;
}
