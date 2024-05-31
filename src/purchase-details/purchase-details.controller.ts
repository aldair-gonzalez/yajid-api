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

import { PurchaseDetailsService } from './purchase-details.service';
import { CreatePurchaseDetailDto } from './dto/create-purchase-detail.dto';
import { UpdatePurchaseDetailDto } from './dto/update-purchase-detail.dto';
import { ParseTrimFromDto } from 'src/utils/trim';

@ApiTags('purchase details')
@Controller('purchase-details')
export class PurchaseDetailsController {
  constructor(
    private readonly purchaseDetailsService: PurchaseDetailsService,
  ) {}

  @ApiOperation({ summary: 'Create purchase detail' })
  @Post()
  async create(@Body() createPurchaseDetailDto: CreatePurchaseDetailDto) {
    try {
      ParseTrimFromDto(createPurchaseDetailDto);
      return await this.purchaseDetailsService.create(createPurchaseDetailDto);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Get all purchase details' })
  @Get()
  async findAll() {
    try {
      return await this.purchaseDetailsService.findAll();
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Get purchase detail by id' })
  @Get(':purchase_detail_id')
  async findOne(@Param('purchase_detail_id') purchase_detail_id: number) {
    try {
      if (isNaN(purchase_detail_id))
        throw new BadRequestException('purchase detail id must be a number');
      const purchaseDetail =
        await this.purchaseDetailsService.findOne(+purchase_detail_id);
      if (!purchaseDetail)
        throw new BadRequestException('purchase detail not found');
      return purchaseDetail;
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Update purchase detail by id' })
  @Patch(':purchase_detail_id')
  async update(
    @Param('purchase_detail_id') purchase_detail_id: number,
    @Body() updatePurchaseDetailDto: UpdatePurchaseDetailDto,
  ) {
    try {
      if (isNaN(purchase_detail_id))
        throw new BadRequestException('purchase detail id must be a number');
      const purchaseDetail =
        await this.purchaseDetailsService.findOne(+purchase_detail_id);
      if (!purchaseDetail)
        throw new BadRequestException('purchase detail not found');
      ParseTrimFromDto(updatePurchaseDetailDto);
      return await this.purchaseDetailsService.update(
        +purchase_detail_id,
        updatePurchaseDetailDto,
      );
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Delete purchase detail by id' })
  @Delete(':purchase_detail_id')
  @HttpCode(204)
  async remove(@Param('purchase_detail_id') purchase_detail_id: number) {
    try {
      if (isNaN(purchase_detail_id))
        throw new BadRequestException('purchase detail id must be a number');
      const purchaseDetail =
        await this.purchaseDetailsService.findOne(+purchase_detail_id);
      if (!purchaseDetail)
        throw new BadRequestException('purchase detail not found');
      await this.purchaseDetailsService.remove(+purchase_detail_id);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }
}
