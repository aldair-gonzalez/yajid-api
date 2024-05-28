import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateInventoryDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  stock: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  unit_cost: number;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty({
    default: new Date(),
  })
  purchase_date: Date;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty({
    default: new Date(),
  })
  expiration_date: Date;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  comments: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  product_id: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  supplier_id: number;
}
