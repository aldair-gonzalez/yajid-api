import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VisitStatisticsService } from './visit-statistics.service';
import { VisitStatisticsController } from './visit-statistics.controller';
import { VisitStatistic } from './entities/visit-statistic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VisitStatistic])],
  controllers: [VisitStatisticsController],
  providers: [VisitStatisticsService],
  exports: [TypeOrmModule, VisitStatisticsService],
})
export class VisitStatisticsModule {}
