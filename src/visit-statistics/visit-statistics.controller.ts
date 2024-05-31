import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  HttpCode,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { VisitStatisticsService } from './visit-statistics.service';
import { CreateVisitStatisticDto } from './dto/create-visit-statistic.dto';
import { UpdateVisitStatisticDto } from './dto/update-visit-statistic.dto';
import { ParseTrimFromDto } from 'src/utils/trim';

@ApiTags('visit statistics')
@Controller('visit-statistics')
export class VisitStatisticsController {
  constructor(
    private readonly visitStatisticsService: VisitStatisticsService,
  ) {}

  @ApiOperation({ summary: 'Create visit statistic' })
  @Post()
  async create(@Body() createVisitStatisticDto: CreateVisitStatisticDto) {
    try {
      ParseTrimFromDto(createVisitStatisticDto);
      return await this.visitStatisticsService.create(createVisitStatisticDto);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Get all visit statistics' })
  @Get()
  async findAll() {
    try {
      return await this.visitStatisticsService.findAll();
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Get visit statistic by id' })
  @Get(':visit_statistics_id')
  async findOne(@Param('visit_statistics_id') visit_statistics_id: number) {
    try {
      if (isNaN(visit_statistics_id))
        throw new BadRequestException('visit statistics id must be a number');
      const visitStatistics =
        await this.visitStatisticsService.findOne(+visit_statistics_id);
      if (!visitStatistics)
        throw new BadRequestException('visit statistics not found');
      return visitStatistics;
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Update visit statistic by id' })
  @Patch(':visit_statistics_id')
  async update(
    @Param('visit_statistics_id') visit_statistics_id: number,
    @Body() updateVisitStatisticDto: UpdateVisitStatisticDto,
  ) {
    try {
      if (isNaN(visit_statistics_id))
        throw new BadRequestException('visit statistics id must be a number');
      const visitStatistics =
        await this.visitStatisticsService.findOne(+visit_statistics_id);
      if (!visitStatistics)
        throw new BadRequestException('visit statistics not found');
      ParseTrimFromDto(updateVisitStatisticDto);
      return await this.visitStatisticsService.update(
        +visit_statistics_id,
        updateVisitStatisticDto,
      );
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Delete visit statistic by id' })
  @Delete(':visit_statistics_id')
  @HttpCode(204)
  async remove(@Param('visit_statistics_id') visit_statistics_id: number) {
    try {
      if (isNaN(visit_statistics_id))
        throw new BadRequestException('visit statistics id must be a number');
      const visitStatistics =
        await this.visitStatisticsService.findOne(+visit_statistics_id);
      if (!visitStatistics)
        throw new BadRequestException('visit statistics not found');
      await this.visitStatisticsService.remove(+visit_statistics_id);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }
}
