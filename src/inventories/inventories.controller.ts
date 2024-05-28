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

import { InventoriesService } from './inventories.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { ParseTrimFromDto } from 'src/utils/trim';

@ApiTags('inventories')
@Controller('inventories')
export class InventoriesController {
  constructor(private readonly inventoriesService: InventoriesService) {}

  @ApiOperation({ summary: 'Create inventory' })
  @Post()
  async create(@Body() createInventoryDto: CreateInventoryDto) {
    try {
      ParseTrimFromDto(createInventoryDto);
      return await this.inventoriesService.create(createInventoryDto);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Get all inventories' })
  @Get()
  async findAll() {
    try {
      return await this.inventoriesService.findAll();
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Get inventory by id' })
  @Get(':inventory_id')
  async findOne(@Param('inventory_id') inventory_id: number) {
    try {
      if (isNaN(inventory_id))
        throw new BadRequestException('Inventory id must be a number');
      const inventory = await this.inventoriesService.findOne(+inventory_id);
      if (!inventory) throw new BadRequestException('Inventory not found');
      return inventory;
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Update inventory by id' })
  @Patch(':inventory_id')
  async update(
    @Param('inventory_id') inventory_id: number,
    @Body() updateInventoryDto: UpdateInventoryDto,
  ) {
    try {
      if (isNaN(inventory_id))
        throw new BadRequestException('Inventory id must be a number');
      const inventory = await this.inventoriesService.findOne(+inventory_id);
      if (!inventory) throw new BadRequestException('Inventory not found');
      ParseTrimFromDto(updateInventoryDto);
      return await this.inventoriesService.update(
        +inventory_id,
        updateInventoryDto,
      );
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Delete inventory by id' })
  @Delete(':inventory_id')
  @HttpCode(204)
  async remove(@Param('inventory_id') inventory_id: number) {
    try {
      if (isNaN(inventory_id))
        throw new BadRequestException('Inventory id must be a number');
      const inventory = await this.inventoriesService.findOne(+inventory_id);
      if (!inventory) throw new BadRequestException('Inventory not found');
      await this.inventoriesService.remove(+inventory_id);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }
}
