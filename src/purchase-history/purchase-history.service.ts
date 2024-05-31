import { Injectable } from '@nestjs/common';
import { CreatePurchaseHistoryDto } from './dto/create-purchase-history.dto';
import { UpdatePurchaseHistoryDto } from './dto/update-purchase-history.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PurchaseHistory } from './entities/purchase-history.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PurchaseHistoryService {
  constructor(
    @InjectRepository(PurchaseHistory)
    private readonly purchaseHistoryRepository: Repository<PurchaseHistory>,
  ) {}

  async create(createPurchaseHistoryDto: CreatePurchaseHistoryDto) {
    return await this.purchaseHistoryRepository.save(createPurchaseHistoryDto);
  }

  async findAll() {
    return await this.purchaseHistoryRepository.find({
      relations: ['order_id', 'user_id', 'purchase_state_id'],
    });
  }

  async findOne(purchase_id: number) {
    return await this.purchaseHistoryRepository.findOne({
      where: { purchase_id },
      relations: ['order_id', 'user_id', 'purchase_state_id'],
    });
  }

  async update(
    purchase_id: number,
    updatePurchaseHistoryDto: UpdatePurchaseHistoryDto,
  ) {
    return await this.purchaseHistoryRepository.update(
      purchase_id,
      updatePurchaseHistoryDto,
    );
  }

  async remove(purchase_id: number) {
    return await this.purchaseHistoryRepository.delete(purchase_id);
  }
}
