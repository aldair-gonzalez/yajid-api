import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { Package } from './entities/package.entity';

@Injectable()
export class PackagesService {
  constructor(
    @InjectRepository(Package)
    private readonly packageRepository: Repository<Package>,
  ) {}

  async create(createPackageDto: CreatePackageDto) {
    return await this.packageRepository.save(createPackageDto);
  }

  async findAll() {
    return await this.packageRepository.find();
  }

  async findOne(package_id: number) {
    return await this.packageRepository.findOne({
      where: { package_id },
    });
  }

  async update(package_id: number, updatePackageDto: UpdatePackageDto) {
    return await this.packageRepository.update(package_id, updatePackageDto);
  }

  async remove(package_id: number) {
    return await this.packageRepository.delete(package_id);
  }
}
