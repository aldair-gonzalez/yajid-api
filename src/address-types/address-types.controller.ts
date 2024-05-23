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

import { AddressTypesService } from './address-types.service';
import { CreateAddressTypeDto } from './dto/create-address-type.dto';
import { UpdateAddressTypeDto } from './dto/update-address-type.dto';
import { ParseTrimFromDto } from 'src/utils/trim';

@ApiTags('address types')
@Controller('address-types')
export class AddressTypesController {
  constructor(private readonly addressTypesService: AddressTypesService) {}

  @ApiOperation({ summary: 'Create address type' })
  @Post()
  async create(@Body() createAddressTypeDto: CreateAddressTypeDto) {
    try {
      ParseTrimFromDto(createAddressTypeDto);
      return await this.addressTypesService.create(createAddressTypeDto);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Get all address types' })
  @Get()
  async findAll() {
    try {
      return await this.addressTypesService.findAll();
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Get address type by id' })
  @Get(':address_type_id')
  async findOne(@Param('address_type_id') address_type_id: number) {
    try {
      if (isNaN(address_type_id))
        throw new BadRequestException('Address type id should be a number');
      const addressType =
        await this.addressTypesService.findOne(address_type_id);
      if (!addressType) throw new BadRequestException('Address type not found');
      return addressType;
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Update address type by id' })
  @Patch(':adress_type_id')
  async update(
    @Param('adress_type_id') adress_type_id: number,
    @Body() updateAddressTypeDto: UpdateAddressTypeDto,
  ) {
    try {
      if (isNaN(adress_type_id))
        throw new BadRequestException('Address type id should be a number');
      const addressType =
        await this.addressTypesService.findOne(adress_type_id);
      if (!addressType) throw new BadRequestException('Address type not found');
      ParseTrimFromDto(updateAddressTypeDto);
      return await this.addressTypesService.update(
        adress_type_id,
        updateAddressTypeDto,
      );
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Delete address type by id' })
  @Delete(':address_type_id')
  @HttpCode(204)
  async remove(@Param('address_type_id') address_type_id: number) {
    try {
      if (isNaN(address_type_id))
        throw new BadRequestException('Address type id should be a number');
      const addressType =
        await this.addressTypesService.findOne(address_type_id);
      if (!addressType) throw new BadRequestException('Address type not found');
      await this.addressTypesService.remove(address_type_id);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }
}
