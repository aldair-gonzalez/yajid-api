import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserActivityLogDto } from './dto/create-user-activity-log.dto';
import { UpdateUserActivityLogDto } from './dto/update-user-activity-log.dto';
import { UserActivityLog } from './entities/user-activity-log.entity';

@Injectable()
export class UserActivityLogService {
  constructor(
    @InjectRepository(UserActivityLog)
    private readonly activityTypeRepository: Repository<UserActivityLog>,
  ) {}

  async create(createUserActivityLogDto: CreateUserActivityLogDto) {
    return await this.activityTypeRepository.save(createUserActivityLogDto);
  }

  async findAll() {
    return await this.activityTypeRepository.find({
      relations: ['user_id', 'activity_type_id'],
    });
  }

  async findOne(user_activity_log_id: number) {
    return await this.activityTypeRepository.findOne({
      where: { user_activity_log_id },
      relations: ['user_id', 'activity_type_id'],
    });
  }

  async update(
    user_activity_log_id: number,
    updateUserActivityLogDto: UpdateUserActivityLogDto,
  ) {
    return await this.activityTypeRepository.update(
      user_activity_log_id,
      updateUserActivityLogDto,
    );
  }

  async remove(user_activity_log_id: number) {
    return await this.activityTypeRepository.delete(user_activity_log_id);
  }
}
