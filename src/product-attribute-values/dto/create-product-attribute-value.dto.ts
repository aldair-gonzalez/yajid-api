import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductAttributeValueDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  value: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  attribute_id: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  product_id: number;
}
