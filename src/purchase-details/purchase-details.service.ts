import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePurchaseDetailDto } from './dto/create-purchase-detail.dto';
import { UpdatePurchaseDetailDto } from './dto/update-purchase-detail.dto';
import { PurchaseDetail } from './entities/purchase-detail.entity';

@Injectable()
export class PurchaseDetailsService {
  constructor(
    @InjectRepository(PurchaseDetail)
    private readonly purchaseDetailRepository: Repository<PurchaseDetail>,
  ) {}

  async create(createPurchaseDetailDto: CreatePurchaseDetailDto) {
    return await this.purchaseDetailRepository.save(createPurchaseDetailDto);
  }

  async findAll() {
    return await this.purchaseDetailRepository.find({
      relations: ['purchase_id', 'product_id'],
    });
  }

  async findOne(purchase_detail_id: number) {
    return await this.purchaseDetailRepository.findOne({
      where: { purchase_detail_id },
      relations: ['purchase_id', 'product_id'],
    });
  }

  async update(
    purchase_detail_id: number,
    updatePurchaseDetailDto: UpdatePurchaseDetailDto,
  ) {
    return await this.purchaseDetailRepository.update(
      purchase_detail_id,
      updatePurchaseDetailDto,
    );
  }

  async remove(purchase_detail_id: number) {
    return await this.purchaseDetailRepository.delete(purchase_detail_id);
  }
}
