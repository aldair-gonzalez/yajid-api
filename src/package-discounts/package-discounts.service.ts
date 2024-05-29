import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePackageDiscountDto } from './dto/create-package-discount.dto';
import { UpdatePackageDiscountDto } from './dto/update-package-discount.dto';
import { PackageDiscount } from './entities/package-discount.entity';

@Injectable()
export class PackageDiscountsService {
  constructor(
    @InjectRepository(PackageDiscount)
    private readonly packageDiscountRepository: Repository<PackageDiscount>,
  ) {}

  async create(createPackageDiscountDto: CreatePackageDiscountDto) {
    return await this.packageDiscountRepository.save(createPackageDiscountDto);
  }

  async findAll() {
    return await this.packageDiscountRepository.find();
  }

  async findOne(package_discount_id: number) {
    return await this.packageDiscountRepository.findOne({
      where: { package_discount_id },
    });
  }

  async update(
    package_discount_id: number,
    updatePackageDiscountDto: UpdatePackageDiscountDto,
  ) {
    return await this.packageDiscountRepository.update(
      { package_discount_id },
      updatePackageDiscountDto,
    );
  }

  async remove(package_discount_id: number) {
    return await this.packageDiscountRepository.delete({
      package_discount_id,
    });
  }
}
