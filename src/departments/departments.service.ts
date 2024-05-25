import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from './entities/department.entity';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) {}

  async create(createDepartmentDto: CreateDepartmentDto) {
    return await this.departmentRepository.save(createDepartmentDto);
  }

  async findAll() {
    return await this.departmentRepository.find();
  }

  async findOne(department_id: number) {
    return await this.departmentRepository.findOne({
      where: { department_id },
    });
  }

  async update(
    department_id: number,
    updateDepartmentDto: UpdateDepartmentDto,
  ) {
    return await this.departmentRepository.update(
      department_id,
      updateDepartmentDto,
    );
  }

  async remove(department_id: number) {
    return await this.departmentRepository.delete(department_id);
  }
}
