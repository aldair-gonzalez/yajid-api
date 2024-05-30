import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateShoppingCartDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  user_id: number;
}
