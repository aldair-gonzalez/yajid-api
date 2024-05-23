import { Injectable } from '@nestjs/common';
import { CreateUserAddressDto } from './dto/create-user-address.dto';
import { UpdateUserAddressDto } from './dto/update-user-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAddress } from './entities/user-address.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserAddressesService {
  constructor(
    @InjectRepository(UserAddress)
    private readonly userAddressRepository: Repository<UserAddress>,
  ) {}

  async create(createUserAddressDto: CreateUserAddressDto) {
    return await this.userAddressRepository.save(createUserAddressDto);
  }

  async findAll() {
    return await this.userAddressRepository.find({
      relations: ['user_id', 'address_type_id'],
    });
  }

  async findOne(user_address_id: number) {
    return await this.userAddressRepository.findOne({
      where: { user_address_id },
      relations: ['user_id', 'address_type_id'],
    });
  }

  async update(
    user_address_id: number,
    updateUserAddressDto: UpdateUserAddressDto,
  ) {
    return await this.userAddressRepository.update(
      user_address_id,
      updateUserAddressDto,
    );
  }

  async remove(user_address_id: number) {
    return await this.userAddressRepository.delete(user_address_id);
  }
}
