import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateOrderDto {
  @IsNumber({ maxDecimalPlaces: 2 })
  @Type(() => Number)
  total: number;

  @IsBoolean()
  state: boolean;

  @IsString()
  ubication: string;

  @IsDateString()
  estimated_delivery: string;

  @IsNumber()
  latitude: number;

  @IsNumber()
  length: number;

  @IsUUID()
  client: string;
}
