import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  NotFoundException,
  HttpCode,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { UserRolesService } from './user-roles.service';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { ParseTrimFromDto } from 'src/utils/trim';

@ApiTags('user roles')
@Controller('user-roles')
export class UserRolesController {
  constructor(private readonly userRolesService: UserRolesService) {}

  @ApiOperation({ summary: 'Create user role' })
  @Post()
  async create(@Body() createUserRoleDto: CreateUserRoleDto) {
    try {
      ParseTrimFromDto(createUserRoleDto);
      return await this.userRolesService.create(createUserRoleDto);
    } catch (error) {
      if (error.message || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Get all user roles' })
  @Get()
  async findAll() {
    try {
      return await this.userRolesService.findAll();
    } catch (error) {
      if (error.message || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Get one user role' })
  @Get(':user_role_id')
  async findOne(@Param('user_role_id') user_role_id: number) {
    try {
      if (isNaN(user_role_id))
        throw new BadRequestException('user_role_id should be a number');
      const userRole = await this.userRolesService.findOne(user_role_id);
      if (!userRole) throw new NotFoundException('user role not found');
      return userRole;
    } catch (error) {
      if (error.message || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Update user role' })
  @Patch(':user_role_id')
  async update(
    @Param('user_role_id') user_role_id: number,
    @Body() updateUserRoleDto: UpdateUserRoleDto,
  ) {
    try {
      if (isNaN(user_role_id))
        throw new BadRequestException('user_role_id should be a number');
      const userRole = await this.userRolesService.findOne(user_role_id);
      if (!userRole) throw new NotFoundException('user role not found');
      ParseTrimFromDto(updateUserRoleDto);
      return await this.userRolesService.update(
        user_role_id,
        updateUserRoleDto,
      );
    } catch (error) {
      if (error.message || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Delete user role' })
  @Delete(':user_role_id')
  @HttpCode(204)
  async remove(@Param('user_role_id') user_role_id: number) {
    try {
      if (isNaN(user_role_id))
        throw new BadRequestException('user_role_id should be a number');
      const userRole = this.userRolesService.findOne(user_role_id);
      if (!userRole) throw new NotFoundException('user role not found');
      await this.userRolesService.remove(user_role_id);
    } catch (error) {
      if (error.message || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }
}
