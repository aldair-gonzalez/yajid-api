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
import { PackagesService } from './packages.service';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ParseTrimFromDto } from 'src/utils/trim';

@ApiTags('packages')
@Controller('packages')
export class PackagesController {
  constructor(private readonly packagesService: PackagesService) {}

  @ApiOperation({ summary: 'Create package' })
  @Post()
  async create(@Body() createPackageDto: CreatePackageDto) {
    try {
      ParseTrimFromDto(createPackageDto);
      return await this.packagesService.create(createPackageDto);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Get all packages' })
  @Get()
  async findAll() {
    try {
      return await this.packagesService.findAll();
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Get package by id' })
  @Get(':package_id')
  async findOne(@Param('package_id') package_id: string) {
    try {
      if (isNaN(Number(package_id)))
        throw new BadRequestException('package id must be a number');
      const Package = await this.packagesService.findOne(+package_id);
      if (!Package) throw new BadRequestException('package not found');
      return Package;
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Update package by id' })
  @Patch(':package_id')
  async update(
    @Param('package_id') package_id: string,
    @Body() updatePackageDto: UpdatePackageDto,
  ) {
    try {
      if (isNaN(Number(package_id)))
        throw new BadRequestException('package id must be a number');
      const Package = await this.packagesService.findOne(+package_id);
      if (!Package) throw new BadRequestException('package not found');
      ParseTrimFromDto(updatePackageDto);
      return await this.packagesService.update(+package_id, updatePackageDto);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Delete package by id' })
  @Delete(':package_id')
  @HttpCode(204)
  async remove(@Param('package_id') package_id: string) {
    try {
      if (isNaN(Number(package_id)))
        throw new BadRequestException('package id must be a number');
      const Package = await this.packagesService.findOne(+package_id);
      if (!Package) throw new BadRequestException('package not found');
      await this.packagesService.remove(+package_id);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }
}
