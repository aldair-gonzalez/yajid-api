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

import { ProductPriceHistoryService } from './product-price-history.service';
import { CreateProductPriceHistoryDto } from './dto/create-product-price-history.dto';
import { UpdateProductPriceHistoryDto } from './dto/update-product-price-history.dto';
import { ParseTrimFromDto } from 'src/utils/trim';

@ApiTags('product price history')
@Controller('product-price-history')
export class ProductPriceHistoryController {
  constructor(
    private readonly productPriceHistoryService: ProductPriceHistoryService,
  ) {}

  @ApiOperation({ summary: 'Create product price history' })
  @Post()
  async create(
    @Body() createProductPriceHistoryDto: CreateProductPriceHistoryDto,
  ) {
    try {
      ParseTrimFromDto(createProductPriceHistoryDto);
      return await this.productPriceHistoryService.create(
        createProductPriceHistoryDto,
      );
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Get all product price history' })
  @Get()
  async findAll() {
    try {
      return await this.productPriceHistoryService.findAll();
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @Get(':history_price_id')
  async findOne(@Param('history_price_id') history_price_id: number) {
    try {
      if (isNaN(history_price_id))
        throw new BadRequestException('history price id must be a number');
      const historyPrice =
        await this.productPriceHistoryService.findOne(+history_price_id);
      if (!historyPrice)
        throw new BadRequestException('history price not found');
      return historyPrice;
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Update product price history' })
  @Patch(':history_price_id')
  async update(
    @Param('history_price_id') history_price_id: number,
    @Body() updateProductPriceHistoryDto: UpdateProductPriceHistoryDto,
  ) {
    try {
      if (isNaN(history_price_id))
        throw new BadRequestException('history price id must be a number');
      const historyPrice =
        await this.productPriceHistoryService.findOne(+history_price_id);
      if (!historyPrice)
        throw new BadRequestException('history price not found');
      ParseTrimFromDto(updateProductPriceHistoryDto);
      return await this.productPriceHistoryService.update(
        +history_price_id,
        updateProductPriceHistoryDto,
      );
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Delete product price history' })
  @Delete(':history_price_id')
  @HttpCode(204)
  async remove(@Param('history_price_id') history_price_id: number) {
    try {
      if (isNaN(history_price_id))
        throw new BadRequestException('history price id must be a number');
      const historyPrice =
        await this.productPriceHistoryService.findOne(+history_price_id);
      if (!historyPrice)
        throw new BadRequestException('history price not found');
      await this.productPriceHistoryService.remove(+history_price_id);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }
}
