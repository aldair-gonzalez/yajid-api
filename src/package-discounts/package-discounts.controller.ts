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
import { PackageDiscountsService } from './package-discounts.service';
import { CreatePackageDiscountDto } from './dto/create-package-discount.dto';
import { UpdatePackageDiscountDto } from './dto/update-package-discount.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ParseTrimFromDto } from 'src/utils/trim';

@ApiTags('package discounts')
@Controller('package-discounts')
export class PackageDiscountsController {
  constructor(
    private readonly packageDiscountsService: PackageDiscountsService,
  ) {}

  @ApiOperation({ summary: 'create package discount' })
  @Post()
  async create(@Body() createPackageDiscountDto: CreatePackageDiscountDto) {
    try {
      ParseTrimFromDto(createPackageDiscountDto);
      return await this.packageDiscountsService.create(
        createPackageDiscountDto,
      );
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'get all package discounts' })
  @Get()
  async findAll() {
    try {
      return await this.packageDiscountsService.findAll();
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'get one package discount by id' })
  @Get(':package_discount_id')
  async findOne(@Param('package_discount_id') package_discount_id: number) {
    try {
      if (isNaN(+package_discount_id))
        throw new BadRequestException('package discount id must be a number');
      const packageDiscount =
        await this.packageDiscountsService.findOne(+package_discount_id);
      if (!packageDiscount)
        throw new BadRequestException('package discount not found');
      return packageDiscount;
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'update package discount by id' })
  @Patch(':package_discount_id')
  async update(
    @Param('package_discount_id') package_discount_id: number,
    @Body() updatePackageDiscountDto: UpdatePackageDiscountDto,
  ) {
    try {
      if (isNaN(+package_discount_id))
        throw new BadRequestException('package discount id must be a number');
      const packageDiscount =
        await this.packageDiscountsService.findOne(+package_discount_id);
      if (!packageDiscount)
        throw new BadRequestException('package discount not found');
      ParseTrimFromDto(updatePackageDiscountDto);
      return await this.packageDiscountsService.update(
        +package_discount_id,
        updatePackageDiscountDto,
      );
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'delete package discount by id' })
  @Delete(':package_discount_id')
  @HttpCode(204)
  async remove(@Param('package_discount_id') package_discount_id: number) {
    try {
      if (isNaN(+package_discount_id))
        throw new BadRequestException('package discount id must be a number');
      const packageDiscount =
        await this.packageDiscountsService.findOne(+package_discount_id);
      if (!packageDiscount)
        throw new BadRequestException('package discount not found');
      await this.packageDiscountsService.remove(+package_discount_id);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }
}
