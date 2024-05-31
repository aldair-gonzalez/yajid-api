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

import { PurchaseHistoryService } from './purchase-history.service';
import { CreatePurchaseHistoryDto } from './dto/create-purchase-history.dto';
import { UpdatePurchaseHistoryDto } from './dto/update-purchase-history.dto';
import { ParseTrimFromDto } from 'src/utils/trim';

@ApiTags('purchase history')
@Controller('purchase-history')
export class PurchaseHistoryController {
  constructor(
    private readonly purchaseHistoryService: PurchaseHistoryService,
  ) {}

  @ApiOperation({ summary: 'Create purchase history' })
  @Post()
  async create(@Body() createPurchaseHistoryDto: CreatePurchaseHistoryDto) {
    try {
      ParseTrimFromDto(createPurchaseHistoryDto);
      return await this.purchaseHistoryService.create(createPurchaseHistoryDto);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Get all purchase history' })
  @Get()
  async findAll() {
    try {
      return await this.purchaseHistoryService.findAll();
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Get purchase history by id' })
  @Get(':purchase_id')
  async findOne(@Param('purchase_id') purchase_id: number) {
    try {
      if (isNaN(purchase_id))
        throw new BadRequestException('purchase id must be a number');
      const purchaseHistory =
        await this.purchaseHistoryService.findOne(purchase_id);
      if (!purchaseHistory)
        throw new BadRequestException('purchase history not found');
      return purchaseHistory;
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Update purchase history by id' })
  @Patch(':purchase_id')
  async update(
    @Param('purchase_id') purchase_id: number,
    @Body() updatePurchaseHistoryDto: UpdatePurchaseHistoryDto,
  ) {
    try {
      if (isNaN(purchase_id))
        throw new BadRequestException('purchase id must be a number');
      const purchaseHistory =
        await this.purchaseHistoryService.findOne(purchase_id);
      if (!purchaseHistory)
        throw new BadRequestException('purchase history not found');
      ParseTrimFromDto(updatePurchaseHistoryDto);
      return await this.purchaseHistoryService.update(
        purchase_id,
        updatePurchaseHistoryDto,
      );
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Delete purchase history by id' })
  @Delete(':purchase_id')
  @HttpCode(204)
  async remove(@Param('purchase_id') purchase_id: number) {
    try {
      if (isNaN(purchase_id))
        throw new BadRequestException('purchase id must be a number');
      const purchaseHistory =
        await this.purchaseHistoryService.findOne(purchase_id);
      if (!purchaseHistory)
        throw new BadRequestException('purchase history not found');
      await this.purchaseHistoryService.remove(purchase_id);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }
}
