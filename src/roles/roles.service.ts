import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    return await this.roleRepository.save(createRoleDto);
  }

  async findAll() {
    return await this.roleRepository.find();
  }

  async findOne(role_id: any) {
    return await this.roleRepository.findOne({
      where: { role_id },
    });
  }

  async update(role_id: number, updateRoleDto: UpdateRoleDto) {
    return await this.roleRepository.update(role_id, updateRoleDto);
  }

  async remove(role_id: number) {
    return await this.roleRepository.delete(role_id);
  }
}
