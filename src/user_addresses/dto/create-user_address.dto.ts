import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserAddressDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  address: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  city: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  state: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  country: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  postal_code: number;

  @IsOptional()
  @IsString()
  comment: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  user_id: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  address_type_id: number;
}
