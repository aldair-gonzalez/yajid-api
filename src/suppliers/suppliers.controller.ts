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
import { SuppliersService } from './suppliers.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ParseTrimFromDto } from 'src/utils/trim';

@ApiTags('suppliers')
@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @ApiOperation({ summary: 'Create a supplier' })
  @Post()
  async create(@Body() createSupplierDto: CreateSupplierDto) {
    try {
      ParseTrimFromDto(createSupplierDto);
      return await this.suppliersService.create(createSupplierDto);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Get all suppliers' })
  @Get()
  async findAll() {
    try {
      return await this.suppliersService.findAll();
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Get supplier by id' })
  @Get(':supplier_id')
  async findOne(@Param('supplier_id') supplier_id: number) {
    try {
      if (isNaN(supplier_id))
        throw new BadRequestException('supplier id should be a number');
      const supplier = await this.suppliersService.findOne(+supplier_id);
      if (!supplier) throw new BadRequestException('supplier not found');
      return supplier;
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Update supplier by id' })
  @Patch(':supplier_id')
  async update(
    @Param('supplier_id') supplier_id: number,
    @Body() updateSupplierDto: UpdateSupplierDto,
  ) {
    try {
      if (isNaN(supplier_id))
        throw new BadRequestException('supplier id should be a number');
      const supplier = await this.suppliersService.findOne(+supplier_id);
      if (!supplier) throw new BadRequestException('supplier not found');
      ParseTrimFromDto(updateSupplierDto);
      return await this.suppliersService.update(
        +supplier_id,
        updateSupplierDto,
      );
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Delete supplier by id' })
  @Delete(':supplier_id')
  @HttpCode(204)
  async remove(@Param('supplier_id') supplier_id: number) {
    try {
      if (isNaN(supplier_id))
        throw new BadRequestException('supplier id should be a number');
      const supplier = await this.suppliersService.findOne(+supplier_id);
      if (!supplier) throw new BadRequestException('supplier not found');
      await this.suppliersService.remove(+supplier_id);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }
}
