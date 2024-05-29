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

import { PackageImagesService } from './package-images.service';
import { CreatePackageImageDto } from './dto/create-package-image.dto';
import { UpdatePackageImageDto } from './dto/update-package-image.dto';
import { ParseTrimFromDto } from 'src/utils/trim';

@ApiTags('package images')
@Controller('package-images')
export class PackageImagesController {
  constructor(private readonly packageImagesService: PackageImagesService) {}

  @ApiOperation({ summary: 'create package image' })
  @Post()
  async create(@Body() createPackageImageDto: CreatePackageImageDto) {
    try {
      ParseTrimFromDto(createPackageImageDto);
      return await this.packageImagesService.create(createPackageImageDto);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'get all package images' })
  @Get()
  async findAll() {
    try {
      return await this.packageImagesService.findAll();
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'get package image by id' })
  @Get(':package_image_id')
  async findOne(@Param('package_image_id') package_image_id: number) {
    try {
      if (isNaN(package_image_id))
        throw new BadRequestException('package_image_id must be a number');
      const packageImage =
        await this.packageImagesService.findOne(+package_image_id);
      if (!packageImage)
        throw new BadRequestException('package image not found');
      return packageImage;
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'update package image by id' })
  @Patch(':package_image_id')
  async update(
    @Param('package_image_id') package_image_id: number,
    @Body() updatePackageImageDto: UpdatePackageImageDto,
  ) {
    try {
      if (isNaN(package_image_id))
        throw new BadRequestException('package_image_id must be a number');
      const packageImage =
        await this.packageImagesService.findOne(+package_image_id);
      if (!packageImage)
        throw new BadRequestException('package image not found');
      ParseTrimFromDto(updatePackageImageDto);
      return await this.packageImagesService.update(
        +package_image_id,
        updatePackageImageDto,
      );
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }

  @ApiOperation({ summary: 'delete package image by id' })
  @Delete(':package_image_id')
  @HttpCode(204)
  async remove(@Param('package_image_id') package_image_id: number) {
    try {
      if (isNaN(package_image_id))
        throw new BadRequestException('package_image_id must be a number');
      const packageImage =
        await this.packageImagesService.findOne(+package_image_id);
      if (!packageImage)
        throw new BadRequestException('package image not found');
      await this.packageImagesService.remove(+package_image_id);
    } catch (error) {
      if (error.name || error.sqlState)
        throw new BadRequestException(error.message);
      throw error;
    }
  }
}
