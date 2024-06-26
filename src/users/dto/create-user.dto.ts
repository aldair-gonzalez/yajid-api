import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    default: 'John',
  })
  name: string;

  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    default: 'Doe',
  })
  last_name: string;

  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({
    default: 'john@gmail.com',
  })
  email: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    default: 1111111111,
  })
  phone_number: number;

  @Transform(({ value }) => value.trim())
  @IsOptional()
  @IsString()
  @MinLength(6)
  @ApiProperty({
    default: '123123',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    default: 'email',
  })
  provider: string;
}
