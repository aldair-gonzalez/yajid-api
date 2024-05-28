import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { Inventory } from './entities/inventory.entity';

@Injectable()
export class InventoriesService {
  constructor(
    @InjectRepository(Inventory)
    private readonly inventoryRepository: Repository<Inventory>,
  ) {}

  async create(createInventoryDto: CreateInventoryDto) {
    return await this.inventoryRepository.save(createInventoryDto);
  }

  async findAll() {
    return await this.inventoryRepository.find();
  }

  async findOne(inventory_id: number) {
    return await this.inventoryRepository.findOne({
      where: { inventory_id },
    });
  }

  async update(inventory_id: number, updateInventoryDto: UpdateInventoryDto) {
    return await this.inventoryRepository.update(
      inventory_id,
      updateInventoryDto,
    );
  }

  async remove(inventory_id: number) {
    return await this.inventoryRepository.delete(inventory_id);
  }
}
