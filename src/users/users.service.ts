import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await this.usersRepository.save(createUserDto);
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(user_id: number) {
    return await this.usersRepository.findOne({
      where: { user_id },
    });
  }

  async findOneByEmail({
    email,
    getProfileForLogin,
  }: {
    email: string;
    getProfileForLogin?: boolean;
  }) {
    return await this.usersRepository.findOne({
      where: { email },
      select: getProfileForLogin && ['user_id', 'name', 'email', 'password'],
    });
  }

  async update(user_id: number, updateUserDto: UpdateUserDto) {
    return await this.usersRepository.update(user_id, updateUserDto);
  }

  async remove(user_id: number) {
    return await this.usersRepository.delete(user_id);
  }
}
