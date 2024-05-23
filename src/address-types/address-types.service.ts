import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateAddressTypeDto } from './dto/create-address-type.dto';
import { UpdateAddressTypeDto } from './dto/update-address-type.dto';
import { AddressType } from './entities/address-type.entity';

@Injectable()
export class AddressTypesService {
  constructor(
    @InjectRepository(AddressType)
    private readonly addressTypeRepository: Repository<AddressType>,
  ) {}

  async create(createAddressTypeDto: CreateAddressTypeDto) {
    return await this.addressTypeRepository.save(createAddressTypeDto);
  }

  async findAll() {
    return await this.addressTypeRepository.find();
  }

  async findOne(address_type_id: number) {
    return await this.addressTypeRepository.findOne({
      where: { address_type_id },
    });
  }

  async update(
    address_type_id: number,
    updateAddressTypeDto: UpdateAddressTypeDto,
  ) {
    return await this.addressTypeRepository.update(
      address_type_id,
      updateAddressTypeDto,
    );
  }

  async remove(address_type_id: number) {
    return await this.addressTypeRepository.delete(address_type_id);
  }
}
