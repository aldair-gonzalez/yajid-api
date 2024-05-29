import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDiscountDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  discount_name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  discount_type: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  discount_value: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  code: string;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty()
  start_date: Date;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty()
  end_date: Date;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  max_quantity: number;
}
