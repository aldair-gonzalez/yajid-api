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

import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ParseTrimFromDto } from 'src/utils/trim';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @ApiOperation({ summary: 'Create role' })
  @Post()
  async create(@Body() createRoleDto: CreateRoleDto) {
    try {
      ParseTrimFromDto(createRoleDto);
      return await this.rolesService.create(createRoleDto);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Get all roles' })
  @Get()
  async findAll() {
    try {
      return await this.rolesService.findAll();
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Get role by id' })
  @Get(':role_id')
  async findOne(@Param('role_id') role_id: number) {
    try {
      if (isNaN(+role_id))
        throw new BadRequestException('role_id should be a number');
      const role = await this.rolesService.findOne(+role_id);
      if (!role) throw new BadRequestException('Role not found');
      return role;
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Update role by id' })
  @Patch(':role_id')
  async update(
    @Param('role_id') role_id: number,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    try {
      if (isNaN(role_id))
        throw new BadRequestException('role_id should be a number');
      const role = await this.rolesService.findOne(role_id);
      if (!role) throw new BadRequestException('Role not found');
      ParseTrimFromDto(updateRoleDto);
      return await this.rolesService.update(role_id, updateRoleDto);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Delete role by id' })
  @Delete(':role_id')
  @HttpCode(204)
  async remove(@Param('role_id') role_id: number) {
    try {
      if (isNaN(+role_id))
        throw new BadRequestException('role_id should be a number');
      const role = await this.rolesService.findOne(+role_id);
      if (!role) throw new BadRequestException('Role not found');
      await this.rolesService.remove(role_id);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }
}
