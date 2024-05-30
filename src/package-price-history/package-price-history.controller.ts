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

import { PackagePriceHistoryService } from './package-price-history.service';
import { CreatePackagePriceHistoryDto } from './dto/create-package-price-history.dto';
import { UpdatePackagePriceHistoryDto } from './dto/update-package-price-history.dto';
import { ParseTrimFromDto } from 'src/utils/trim';

@ApiTags('package price history')
@Controller('package-price-history')
export class PackagePriceHistoryController {
  constructor(
    private readonly packagePriceHistoryService: PackagePriceHistoryService,
  ) {}

  @ApiOperation({ summary: 'create package price history' })
  @Post()
  async create(
    @Body() createPackagePriceHistoryDto: CreatePackagePriceHistoryDto,
  ) {
    try {
      ParseTrimFromDto(createPackagePriceHistoryDto);
      return await this.packagePriceHistoryService.create(
        createPackagePriceHistoryDto,
      );
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Get all package price history' })
  @Get()
  async findAll() {
    try {
      return await this.packagePriceHistoryService.findAll();
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Get package price history by id' })
  @Get(':package_history_id')
  async findOne(@Param('package_history_id') package_history_id: number) {
    try {
      if (isNaN(package_history_id))
        throw new BadRequestException('package history id must be a number');
      const packagePriceHistory =
        await this.packagePriceHistoryService.findOne(+package_history_id);
      if (!packagePriceHistory)
        throw new BadRequestException('package history not found');
      return packagePriceHistory;
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Update package price history' })
  @Patch(':package_history_id')
  async update(
    @Param('package_history_id') package_history_id: number,
    @Body() updatePackagePriceHistoryDto: UpdatePackagePriceHistoryDto,
  ) {
    try {
      if (isNaN(package_history_id))
        throw new BadRequestException('package history id must be a number');
      const packagePriceHistory =
        await this.packagePriceHistoryService.findOne(+package_history_id);
      if (!packagePriceHistory)
        throw new BadRequestException('package history not found');
      ParseTrimFromDto(updatePackagePriceHistoryDto);
      return await this.packagePriceHistoryService.update(
        +package_history_id,
        updatePackagePriceHistoryDto,
      );
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Delete package price history' })
  @Delete(':package_history_id')
  @HttpCode(204)
  async remove(@Param('package_history_id') package_history_id: number) {
    try {
      if (isNaN(package_history_id))
        throw new BadRequestException('package history id must be a number');
      const packagePriceHistory =
        await this.packagePriceHistoryService.findOne(+package_history_id);
      if (!packagePriceHistory)
        throw new BadRequestException('package history not found');
      await this.packagePriceHistoryService.remove(+package_history_id);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }
}
