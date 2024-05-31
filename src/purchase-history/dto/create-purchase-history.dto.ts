import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePurchaseHistoryDto {
  @IsNotEmpty()
  @IsDate()
  @ApiProperty()
  purchase_date: Date;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  total_price: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  user_id: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  order_id: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  purchase_state_id: number;
}
