import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePurchaseStateDto } from './dto/create-purchase-state.dto';
import { UpdatePurchaseStateDto } from './dto/update-purchase-state.dto';
import { PurchaseState } from './entities/purchase-state.entity';

@Injectable()
export class PurchaseStatesService {
  constructor(
    @InjectRepository(PurchaseState)
    private readonly purchaseStateRepository: Repository<PurchaseState>,
  ) {}

  async create(createPurchaseStateDto: CreatePurchaseStateDto) {
    return await this.purchaseStateRepository.save(createPurchaseStateDto);
  }

  async findAll() {
    return await this.purchaseStateRepository.find();
  }

  async findOne(purchase_state_id: number) {
    return `This action returns a #${purchase_state_id} purchaseState`;
  }

  async update(
    purchase_state_id: number,
    updatePurchaseStateDto: UpdatePurchaseStateDto,
  ) {
    return await this.purchaseStateRepository.update(
      purchase_state_id,
      updatePurchaseStateDto,
    );
  }

  async remove(purchase_state_id: number) {
    return await this.purchaseStateRepository.delete(purchase_state_id);
  }
}
