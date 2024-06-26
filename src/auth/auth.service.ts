import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { SignInDto } from './dto/sign-in.dto';
import { UserRolesService } from 'src/user-roles/user-roles.service';
import { RolesService } from 'src/roles/roles.service';
import { Role } from 'src/common/enums/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly userRolesService: UserRolesService,
    private readonly rolesService: RolesService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn({ email, password }: SignInDto) {
    const user = await this.usersService.findOneByEmail({
      email,
      getProfileForLogin: true,
    });
    if (!user)
      throw new NotFoundException('User with this email does not exist');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Password is incorrect');
    const roles = (
      await this.userRolesService.findRolesByUserId(user.user_id)
    ).map((role) => {
      return role.role_id.role_name;
    });
    const payload = { sub: user.user_id, roles };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(createUserDto: CreateUserDto) {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.usersService.create(createUserDto);
    const roleUser = await this.rolesService.findOneByName(Role.USER);
    await this.userRolesService.create({
      user_id: user.user_id,
      role_id: roleUser.role_id,
    });
    const roles = (
      await this.userRolesService.findRolesByUserId(user.user_id)
    ).map((role) => {
      return role.role_id.role_name;
    });
    const payload = { sub: user.user_id, roles };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async getProfile(user_id: number) {
    return await this.usersService.findOne(user_id);
  }
}
