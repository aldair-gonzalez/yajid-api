import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadGatewayException,
  HttpCode,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ActivityTypesService } from './activity-types.service';
import { CreateActivityTypeDto } from './dto/create-activity-type.dto';
import { UpdateActivityTypeDto } from './dto/update-activity-type.dto';
import { ParseTrimFromDto } from 'src/utils/trim';

@ApiTags('activity types')
@Controller('activity-types')
export class ActivityTypesController {
  constructor(private readonly activityTypesService: ActivityTypesService) {}

  @ApiOperation({ summary: 'Create activity type' })
  @Post()
  async create(@Body() createActivityTypeDto: CreateActivityTypeDto) {
    try {
      ParseTrimFromDto(createActivityTypeDto);
      return await this.activityTypesService.create(createActivityTypeDto);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadGatewayException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Get all activity types' })
  @Get()
  async findAll() {
    try {
      return await this.activityTypesService.findAll();
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadGatewayException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Get activity type by id' })
  @Get(':activity_type_id')
  async findOne(@Param('activity_type_id') activity_type_id: number) {
    try {
      if (isNaN(activity_type_id))
        throw new BadGatewayException('activity type id should be a number');
      const activityType =
        await this.activityTypesService.findOne(activity_type_id);
      if (!activityType)
        throw new BadGatewayException('activity type not found');
      return activityType;
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadGatewayException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Update activity type by id' })
  @Patch(':activity_type_id')
  async update(
    @Param('activity_type_id') activity_type_id: number,
    @Body() updateActivityTypeDto: UpdateActivityTypeDto,
  ) {
    try {
      if (isNaN(activity_type_id))
        throw new BadGatewayException('activity type id should be a number');
      const activityType =
        await this.activityTypesService.findOne(activity_type_id);
      if (!activityType)
        throw new BadGatewayException('activity type not found');
      ParseTrimFromDto(updateActivityTypeDto);
      return await this.activityTypesService.update(
        activity_type_id,
        updateActivityTypeDto,
      );
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadGatewayException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Delete activity type by id' })
  @Delete(':activity_type_id')
  @HttpCode(204)
  async remove(@Param('activity_type_id') activity_type_id: number) {
    try {
      if (isNaN(activity_type_id))
        throw new BadGatewayException('activity type id should be a number');
      const activityType =
        await this.activityTypesService.findOne(activity_type_id);
      if (!activityType)
        throw new BadGatewayException('activity type not found');
      await this.activityTypesService.remove(activity_type_id);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadGatewayException(error.message);
      throw error;
    }
  }
}
