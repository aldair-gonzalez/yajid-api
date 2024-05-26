import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsHash,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  last_name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  phone_number: number;

  @IsOptional()
  @IsString()
  @IsHash('sha256')
  @ApiProperty()
  password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  provider: string;
}
