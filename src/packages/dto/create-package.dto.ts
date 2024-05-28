import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePackageDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  package_name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  description: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  description_brief: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  price: number;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  is_active: boolean;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  department_id: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  category_id: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  subcategory_id: number;
}
