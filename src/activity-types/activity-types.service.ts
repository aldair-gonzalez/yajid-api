import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateActivityTypeDto } from './dto/create-activity-type.dto';
import { UpdateActivityTypeDto } from './dto/update-activity-type.dto';
import { ActivityType } from './entities/activity-type.entity';

@Injectable()
export class ActivityTypesService {
  constructor(
    @InjectRepository(ActivityType)
    private readonly activityTypeRepository: Repository<ActivityType>,
  ) {}

  async create(createActivityTypeDto: CreateActivityTypeDto) {
    return await this.activityTypeRepository.save(createActivityTypeDto);
  }

  async findAll() {
    return await this.activityTypeRepository.find();
  }

  async findOne(activity_type_id: number) {
    return await this.activityTypeRepository.findOne({
      where: { activity_type_id },
    });
  }

  async update(
    activity_type_id: number,
    updateActivityTypeDto: UpdateActivityTypeDto,
  ) {
    return await this.activityTypeRepository.update(
      activity_type_id,
      updateActivityTypeDto,
    );
  }

  async remove(activity_type_id: number) {
    return await this.activityTypeRepository.delete(activity_type_id);
  }
}
