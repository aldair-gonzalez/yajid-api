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
import { UserActivityLogService } from './user-activity-log.service';
import { CreateUserActivityLogDto } from './dto/create-user-activity-log.dto';
import { UpdateUserActivityLogDto } from './dto/update-user-activity-log.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ParseTrimFromDto } from 'src/utils/trim';

@ApiTags('user activity log')
@Controller('user-activity-log')
export class UserActivityLogController {
  constructor(
    private readonly userActivityLogService: UserActivityLogService,
  ) {}

  @ApiOperation({ summary: 'Create user activity log' })
  @Post()
  async create(@Body() createUserActivityLogDto: CreateUserActivityLogDto) {
    try {
      ParseTrimFromDto(createUserActivityLogDto);
      return await this.userActivityLogService.create(createUserActivityLogDto);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Get all user activity logs' })
  @Get()
  async findAll() {
    try {
      return await this.userActivityLogService.findAll();
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Get user activity log by id' })
  @Get(':user_activity_log_id')
  async findOne(@Param('user_activity_log_id') user_activity_log_id: number) {
    try {
      if (isNaN(user_activity_log_id))
        throw new BadRequestException(
          'user activity log id should be a number',
        );
      const userActivityLog =
        await this.userActivityLogService.findOne(+user_activity_log_id);
      if (!userActivityLog)
        throw new BadRequestException('user activity log not found');
      return userActivityLog;
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Update user activity log by id' })
  @Patch(':user_activity_log_id')
  async update(
    @Param('user_activity_log_id') user_activity_log_id: number,
    @Body() updateUserActivityLogDto: UpdateUserActivityLogDto,
  ) {
    try {
      if (isNaN(user_activity_log_id))
        throw new BadRequestException(
          'user activity log id should be a number',
        );
      const userActivityLog =
        await this.userActivityLogService.findOne(+user_activity_log_id);
      if (!userActivityLog)
        throw new BadRequestException('user activity log not found');
      ParseTrimFromDto(updateUserActivityLogDto);
      return await this.userActivityLogService.update(
        +user_activity_log_id,
        updateUserActivityLogDto,
      );
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Delete user activity log by id' })
  @Delete(':user_activity_log_id')
  @HttpCode(204)
  async remove(@Param('user_activity_log_id') user_activity_log_id: number) {
    try {
      if (isNaN(user_activity_log_id))
        throw new BadRequestException(
          'user activity log id should be a number',
        );
      const userActivityLog =
        await this.userActivityLogService.findOne(+user_activity_log_id);
      if (!userActivityLog)
        throw new BadRequestException('user activity log not found');
      await this.userActivityLogService.remove(+user_activity_log_id);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }
}
