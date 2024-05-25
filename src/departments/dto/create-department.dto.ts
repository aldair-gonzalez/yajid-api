import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDepartmentDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  department_name: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  description: string;
}
