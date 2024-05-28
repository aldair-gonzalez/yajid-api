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
import { PackageProductsService } from './package-products.service';
import { CreatePackageProductDto } from './dto/create-package-product.dto';
import { UpdatePackageProductDto } from './dto/update-package-product.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ParseTrimFromDto } from 'src/utils/trim';

@ApiTags('package-products')
@Controller('package-products')
export class PackageProductsController {
  constructor(
    private readonly packageProductsService: PackageProductsService,
  ) {}

  @ApiOperation({ summary: 'Create package product' })
  @Post()
  async create(@Body() createPackageProductDto: CreatePackageProductDto) {
    try {
      ParseTrimFromDto(createPackageProductDto);
      return await this.packageProductsService.create(createPackageProductDto);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Get all package products' })
  @Get()
  async findAll() {
    try {
      return await this.packageProductsService.findAll();
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Get package product by id' })
  @Get(':package_product_id')
  async findOne(@Param('package_product_id') package_product_id: number) {
    try {
      if (isNaN(package_product_id))
        throw new BadRequestException('package product id must be a number');
      const packageProduct =
        await this.packageProductsService.findOne(+package_product_id);
      if (!packageProduct)
        throw new BadRequestException('package product not found');
      return packageProduct;
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Update package product by id' })
  @Patch(':package_product_id')
  async update(
    @Param('package_product_id') package_product_id: number,
    @Body() updatePackageProductDto: UpdatePackageProductDto,
  ) {
    try {
      if (isNaN(package_product_id))
        throw new BadRequestException('package product id must be a number');
      const packageProduct =
        await this.packageProductsService.findOne(+package_product_id);
      if (!packageProduct)
        throw new BadRequestException('package product not found');
      ParseTrimFromDto(updatePackageProductDto);
      return await this.packageProductsService.update(
        +package_product_id,
        updatePackageProductDto,
      );
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Delete package product by id' })
  @Delete(':package_product_id')
  @HttpCode(204)
  async remove(@Param('package_product_id') package_product_id: number) {
    try {
      if (isNaN(package_product_id))
        throw new BadRequestException('package product id must be a number');
      const packageProduct =
        await this.packageProductsService.findOne(+package_product_id);
      if (!packageProduct)
        throw new BadRequestException('package product not found');
      await this.packageProductsService.remove(+package_product_id);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }
}
