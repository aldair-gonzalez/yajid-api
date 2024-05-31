import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePurchaseDetailDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  unit_price: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  discount_applied: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  discount_type: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  purchase_id: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  product_id: number;
}
