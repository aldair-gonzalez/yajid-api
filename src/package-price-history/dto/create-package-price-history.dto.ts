import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePackagePriceHistoryDto {
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
  change_date: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  package_id: number;
}
