import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserRoleDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  role_id: any;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  user_id: any;
}
