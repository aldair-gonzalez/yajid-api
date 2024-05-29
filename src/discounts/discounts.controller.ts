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

import { DiscountsService } from './discounts.service';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { ParseTrimFromDto } from 'src/utils/trim';

@ApiTags('discounts')
@Controller('discounts')
export class DiscountsController {
  constructor(private readonly discountsService: DiscountsService) {}

  @ApiOperation({ summary: 'Create discount' })
  @Post()
  async create(@Body() createDiscountDto: CreateDiscountDto) {
    try {
      ParseTrimFromDto(createDiscountDto);
      return await this.discountsService.create(createDiscountDto);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Get all discounts' })
  @Get()
  async findAll() {
    try {
      return await this.discountsService.findAll();
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Get discount by id' })
  @Get(':discount_id')
  async findOne(@Param('discount_id') discount_id: string) {
    try {
      if (isNaN(+discount_id))
        throw new BadRequestException('Discount id must be a number');
      const discount = await this.discountsService.findOne(+discount_id);
      if (!discount) throw new BadRequestException('Discount not found');
      return discount;
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Update discount by id' })
  @Patch(':discount_id')
  async update(
    @Param('discount_id') discount_id: string,
    @Body() updateDiscountDto: UpdateDiscountDto,
  ) {
    try {
      if (isNaN(+discount_id))
        throw new BadRequestException('Discount id must be a number');
      const discount = await this.discountsService.findOne(+discount_id);
      if (!discount) throw new BadRequestException('Discount not found');
      ParseTrimFromDto(updateDiscountDto);
      return await this.discountsService.update(
        +discount_id,
        updateDiscountDto,
      );
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Delete discount by id' })
  @Delete(':discount_id')
  @HttpCode(204)
  async remove(@Param('discount_id') discount_id: string) {
    try {
      if (isNaN(+discount_id))
        throw new BadRequestException('Discount id must be a number');
      const discount = await this.discountsService.findOne(+discount_id);
      if (!discount) throw new BadRequestException('Discount not found');
      await this.discountsService.remove(+discount_id);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }
}
