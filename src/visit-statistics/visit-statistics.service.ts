import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateVisitStatisticDto } from './dto/create-visit-statistic.dto';
import { UpdateVisitStatisticDto } from './dto/update-visit-statistic.dto';
import { VisitStatistic } from './entities/visit-statistic.entity';

@Injectable()
export class VisitStatisticsService {
  constructor(
    @InjectRepository(VisitStatistic)
    private readonly visitStatisticRepository: Repository<VisitStatistic>,
  ) {}

  async create(createVisitStatisticDto: CreateVisitStatisticDto) {
    return await this.visitStatisticRepository.save(createVisitStatisticDto);
  }

  async findAll() {
    return await this.visitStatisticRepository.find();
  }

  async findOne(visit_statistics_id: number) {
    return await this.visitStatisticRepository.findOne({
      where: { visit_statistics_id },
    });
  }

  async update(
    visit_statistics_id: number,
    updateVisitStatisticDto: UpdateVisitStatisticDto,
  ) {
    return await this.visitStatisticRepository.update(
      visit_statistics_id,
      updateVisitStatisticDto,
    );
  }

  async remove(visit_statistics_id: number) {
    return await this.visitStatisticRepository.delete(visit_statistics_id);
  }
}
