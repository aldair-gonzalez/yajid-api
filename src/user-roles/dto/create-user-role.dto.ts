import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserRoleDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  role_id: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  user_id: number;
}
