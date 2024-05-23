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

import { UserAddressesService } from './user-addresses.service';
import { CreateUserAddressDto } from './dto/create-user-address.dto';
import { UpdateUserAddressDto } from './dto/update-user-address.dto';
import { ParseTrimFromDto } from 'src/utils/trim';

@ApiTags('user addresses')
@Controller('user-addresses')
export class UserAddressesController {
  constructor(private readonly userAddressesService: UserAddressesService) {}

  @ApiOperation({ summary: 'Create user address' })
  @Post()
  async create(@Body() createUserAddressDto: CreateUserAddressDto) {
    try {
      ParseTrimFromDto(createUserAddressDto);
      return await this.userAddressesService.create(createUserAddressDto);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Get all user addresses' })
  @Get()
  async findAll() {
    try {
      return await this.userAddressesService.findAll();
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Get user address by id' })
  @Get(':user_address_id')
  async findOne(@Param('user_address_id') user_address_id: number) {
    try {
      if (isNaN(user_address_id))
        throw new BadRequestException('user address id should be a number');
      const userAddress =
        await this.userAddressesService.findOne(user_address_id);
      if (!userAddress) throw new BadRequestException('user address not found');
      return userAddress;
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Update user address by id' })
  @Patch(':user_address_id')
  async update(
    @Param('user_address_id') user_address_id: number,
    @Body() updateUserAddressDto: UpdateUserAddressDto,
  ) {
    try {
      if (isNaN(user_address_id))
        throw new BadRequestException('user address id should be a number');
      const userAddress =
        await this.userAddressesService.findOne(user_address_id);
      if (!userAddress) throw new BadRequestException('user address not found');
      ParseTrimFromDto(updateUserAddressDto);
      return await this.userAddressesService.update(
        user_address_id,
        updateUserAddressDto,
      );
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Delete user address by id' })
  @Delete(':user_address_id')
  @HttpCode(204)
  async remove(@Param('user_address_id') user_address_id: number) {
    try {
      if (isNaN(user_address_id))
        throw new BadRequestException('user address id should be a number');
      const userAddress =
        await this.userAddressesService.findOne(user_address_id);
      if (!userAddress) throw new BadRequestException('user address not found');
      await this.userAddressesService.remove(user_address_id);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }
}
