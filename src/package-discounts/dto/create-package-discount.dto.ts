import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePackageDiscountDto {
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
  package_id: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  discount_id: number;
}
