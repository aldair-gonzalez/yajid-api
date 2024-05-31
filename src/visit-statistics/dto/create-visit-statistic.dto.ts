import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateVisitStatisticDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  ip_address: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  visited_page: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  time_on_page: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  visit_reference: string;
}
