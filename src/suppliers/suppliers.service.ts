import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { Supplier } from './entities/supplier.entity';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(Supplier)
    private readonly supplierRepository: Repository<Supplier>,
  ) {}

  async create(createSupplierDto: CreateSupplierDto) {
    return await this.supplierRepository.save(createSupplierDto);
  }

  async findAll() {
    return await this.supplierRepository.find();
  }

  async findOne(supplier_id: number) {
    return await this.supplierRepository.findOne({
      where: { supplier_id },
    });
  }

  async update(supplier_id: number, updateSupplierDto: UpdateSupplierDto) {
    return await this.supplierRepository.update(supplier_id, updateSupplierDto);
  }

  async remove(supplier_id: number) {
    return await this.supplierRepository.delete(supplier_id);
  }
}
