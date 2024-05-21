import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  role_name: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  description: string;
}
