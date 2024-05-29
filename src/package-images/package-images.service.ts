import { Injectable } from '@nestjs/common';
import { CreatePackageImageDto } from './dto/create-package-image.dto';
import { UpdatePackageImageDto } from './dto/update-package-image.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PackageImage } from './entities/package-image.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PackageImagesService {
  constructor(
    @InjectRepository(PackageImage)
    private readonly packageImageRepository: Repository<PackageImage>,
  ) {}

  async create(createPackageImageDto: CreatePackageImageDto) {
    return await this.packageImageRepository.save(createPackageImageDto);
  }

  async findAll() {
    return await this.packageImageRepository.find({
      relations: ['package_id'],
    });
  }

  async findOne(package_image_id: number) {
    return await this.packageImageRepository.findOne({
      where: { package_image_id },
      relations: ['package_id'],
    });
  }

  async update(
    package_image_id: number,
    updatePackageImageDto: UpdatePackageImageDto,
  ) {
    return await this.packageImageRepository.update(
      package_image_id,
      updatePackageImageDto,
    );
  }

  async remove(package_image_id: number) {
    return await this.packageImageRepository.delete(package_image_id);
  }
}
