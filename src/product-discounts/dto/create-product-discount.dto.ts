import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProductDiscountDto {
  @IsNotEmpty()
  @IsDate()
  @ApiProperty()
  start_date: Date;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty()
  end_date: Date;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  product_id: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  discount_id: number;
}
