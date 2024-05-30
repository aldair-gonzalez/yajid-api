import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePackagePriceHistoryDto } from './dto/create-package-price-history.dto';
import { UpdatePackagePriceHistoryDto } from './dto/update-package-price-history.dto';
import { PackagePriceHistory } from './entities/package-price-history.entity';

@Injectable()
export class PackagePriceHistoryService {
  constructor(
    @InjectRepository(PackagePriceHistory)
    private readonly packagePriceHistoryRepository: Repository<PackagePriceHistory>,
  ) {}

  async create(createPackagePriceHistoryDto: CreatePackagePriceHistoryDto) {
    return await this.packagePriceHistoryRepository.save(
      createPackagePriceHistoryDto,
    );
  }

  async findAll() {
    return await this.packagePriceHistoryRepository.find({
      relations: ['package_id'],
    });
  }

  async findOne(package_history_id: number) {
    return await this.packagePriceHistoryRepository.findOne({
      where: { package_history_id },
      relations: ['package_id'],
    });
  }

  async update(
    package_history_id: number,
    updatePackagePriceHistoryDto: UpdatePackagePriceHistoryDto,
  ) {
    return await this.packagePriceHistoryRepository.update(
      package_history_id,
      updatePackagePriceHistoryDto,
    );
  }

  async remove(package_history_id: number) {
    return await this.packagePriceHistoryRepository.delete(package_history_id);
  }
}
