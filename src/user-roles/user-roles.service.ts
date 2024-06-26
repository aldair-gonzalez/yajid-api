import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { UserRole } from './entities/user-role.entity';

@Injectable()
export class UserRolesService {
  constructor(
    @InjectRepository(UserRole)
    private readonly userRoleRepository: Repository<UserRole>,
  ) {}

  async create(createUserRoleDto: CreateUserRoleDto) {
    return await this.userRoleRepository.save(createUserRoleDto);
  }

  async findAll() {
    return await this.userRoleRepository.find({
      relations: ['user_id', 'role_id'],
    });
  }

  async findOne(user_role_id: number) {
    return await this.userRoleRepository.findOne({
      where: { user_role_id },
      relations: ['user_id', 'role_id'],
    });
  }

  async findRolesByUserId(user_id: number) {
    return await this.userRoleRepository.find({
      where: { user_id },
      relations: ['role_id'],
    });
  }

  async update(user_role_id: number, updateUserRoleDto: UpdateUserRoleDto) {
    return await this.userRoleRepository.update(
      user_role_id,
      updateUserRoleDto,
    );
  }

  async remove(user_role_id: number) {
    return await this.userRoleRepository.delete(user_role_id);
  }
}
