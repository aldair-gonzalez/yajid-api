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
import { ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ParseTrimFromDto } from 'src/utils/trim';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      ParseTrimFromDto(createUserDto);
      return await this.usersService.create(createUserDto);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.usersService.findAll();
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @Get(':user_id')
  async findOne(@Param('user_id') user_id: number) {
    try {
      if (isNaN(user_id))
        throw new BadRequestException('user_id should be a number');
      const user = await this.usersService.findOne(user_id);
      if (!user) throw new NotFoundException('user not found');
      return user;
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @Patch(':user_id')
  async update(
    @Param('user_id') user_id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      if (isNaN(user_id))
        throw new BadRequestException('user_id should be a number');
      const user = await this.usersService.findOne(user_id);
      if (!user) throw new NotFoundException('user not found');
      ParseTrimFromDto(updateUserDto);
      return await this.usersService.update(user_id, updateUserDto);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @Delete(':user_id')
  @HttpCode(204)
  async remove(@Param('user_id') user_id: number) {
    try {
      if (isNaN(user_id))
        throw new BadRequestException('user_id should be a number');
      const user = await this.usersService.findOne(user_id);
      if (!user) throw new NotFoundException('user not found');
      await this.usersService.remove(user_id);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }
}
