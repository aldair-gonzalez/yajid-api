import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

export class CreatePackageImageDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  image_name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  description: string;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  @ApiProperty()
  url: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  package_id: number;
}
