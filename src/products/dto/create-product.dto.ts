import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  product_name: string;

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

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  sale_unit_type: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  stock: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  low_stock_threshold: number;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  is_active: boolean;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  brand_id: number;

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
