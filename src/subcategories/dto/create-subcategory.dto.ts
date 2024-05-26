import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateSubcategoryDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  subcategory_name: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  category_id: number;
}
