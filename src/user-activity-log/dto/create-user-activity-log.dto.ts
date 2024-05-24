import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserActivityLogDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  activity_details: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  user_id: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  activity_type_id: number;
}
