import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePackageProductDto } from './dto/create-package-product.dto';
import { UpdatePackageProductDto } from './dto/update-package-product.dto';
import { PackageProduct } from './entities/package-product.entity';

@Injectable()
export class PackageProductsService {
  constructor(
    @InjectRepository(PackageProduct)
    private readonly packageProductRepository: Repository<PackageProduct>,
  ) {}

  async create(createPackageProductDto: CreatePackageProductDto) {
    return await this.packageProductRepository.save(createPackageProductDto);
  }

  async findAll() {
    return await this.packageProductRepository.find();
  }

  async findOne(package_product_id: number) {
    return await this.packageProductRepository.findOne({
      where: { package_product_id },
    });
  }

  async update(
    package_product_id: number,
    updatePackageProductDto: UpdatePackageProductDto,
  ) {
    return await this.packageProductRepository.update(
      package_product_id,
      updatePackageProductDto,
    );
  }

  async remove(package_product_id: number) {
    return await this.packageProductRepository.delete(package_product_id);
  }
}
