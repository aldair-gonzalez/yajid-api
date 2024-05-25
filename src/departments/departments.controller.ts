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

import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { ParseTrimFromDto } from 'src/utils/trim';

@ApiTags('departments')
@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @ApiOperation({ summary: 'Create department' })
  @Post()
  async create(@Body() createDepartmentDto: CreateDepartmentDto) {
    try {
      ParseTrimFromDto(createDepartmentDto);
      return await this.departmentsService.create(createDepartmentDto);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Get all departments' })
  @Get()
  async findAll() {
    try {
      return await this.departmentsService.findAll();
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Get department by id' })
  @Get(':department_id')
  async findOne(@Param('department_id') department_id: number) {
    try {
      if (isNaN(department_id))
        throw new BadRequestException('department id should be a number');
      const department = await this.departmentsService.findOne(+department_id);
      if (!department) throw new BadRequestException('department not found');
      return department;
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Update department by id' })
  @Patch(':department_id')
  async update(
    @Param('department_id') department_id: number,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ) {
    try {
      if (isNaN(department_id))
        throw new BadRequestException('department id should be a number');
      const department = await this.departmentsService.findOne(+department_id);
      if (!department) throw new BadRequestException('department not found');
      ParseTrimFromDto(updateDepartmentDto);
      return await this.departmentsService.update(
        +department_id,
        updateDepartmentDto,
      );
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Delete department by id' })
  @Delete(':department_id')
  @HttpCode(204)
  async remove(@Param('department_id') department_id: number) {
    try {
      if (isNaN(department_id))
        throw new BadRequestException('department id should be a number');
      const department = await this.departmentsService.findOne(+department_id);
      if (!department) throw new BadRequestException('department not found');
      await this.departmentsService.remove(+department_id);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }
}
