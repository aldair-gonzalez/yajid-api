import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProductPriceHistoryDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  old_price: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  new_price: number;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty()
  change_date: Date;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  product_id: number;
}
