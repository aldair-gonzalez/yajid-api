import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  shipping_details: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  payment_details: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  user_id: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  cart_id: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  order_status_id: number;
}
