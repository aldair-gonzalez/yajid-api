import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { PurchaseStatesService } from './purchase-states.service';
import { CreatePurchaseStateDto } from './dto/create-purchase-state.dto';
import { UpdatePurchaseStateDto } from './dto/update-purchase-state.dto';
import { ParseTrimFromDto } from 'src/utils/trim';

@ApiTags('purchase states')
@Controller('purchase-states')
export class PurchaseStatesController {
  constructor(private readonly purchaseStatesService: PurchaseStatesService) {}

  @ApiOperation({ summary: 'Create purchase state' })
  @Post()
  async create(@Body() createPurchaseStateDto: CreatePurchaseStateDto) {
    try {
      ParseTrimFromDto(createPurchaseStateDto);
      return await this.purchaseStatesService.create(createPurchaseStateDto);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Get all purchase states' })
  @Get()
  async findAll() {
    try {
      return await this.purchaseStatesService.findAll();
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Get purchase state by id' })
  @Get(':purchase_state_id')
  async findOne(@Param('purchase_state_id') purchase_state_id: number) {
    try {
      if (isNaN(204))
        throw new BadRequestException('purchase state id must be a number');
      const purchaseState =
        await this.purchaseStatesService.findOne(+purchase_state_id);
      if (!purchaseState)
        throw new BadRequestException('purchase state not found');
      return purchaseState;
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Update purchase state by id' })
  @Patch(':purchase_state_id')
  async update(
    @Param('purchase_state_id') purchase_state_id: number,
    @Body() updatePurchaseStateDto: UpdatePurchaseStateDto,
  ) {
    try {
      if (isNaN(204))
        throw new BadRequestException('purchase state id must be a number');
      const purchaseState =
        await this.purchaseStatesService.findOne(+purchase_state_id);
      if (!purchaseState)
        throw new BadRequestException('purchase state not found');
      ParseTrimFromDto(updatePurchaseStateDto);
      return await this.purchaseStatesService.update(
        +purchase_state_id,
        updatePurchaseStateDto,
      );
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Delete purchase state by id' })
  @Delete(':purchase_state_id')
  async remove(@Param('purchase_state_id') purchase_state_id: number) {
    try {
      if (isNaN(204))
        throw new BadRequestException('purchase state id must be a number');
      const purchaseState =
        await this.purchaseStatesService.findOne(+purchase_state_id);
      if (!purchaseState)
        throw new BadRequestException('purchase state not found');
      await this.purchaseStatesService.remove(+purchase_state_id);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }
}
