import { IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class SearchVehiclesDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  precoMin?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  precoMax?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  kmsMin?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  kmsMax?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  financeTypeId?: number;

  @IsOptional()
  @IsString()
  fuel?: string;

  @IsOptional()
  @IsString()
  segment?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  yearMin?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  yearMax?: number;

  @IsOptional()
  @IsString()
  vehicleType?: string;

  @IsOptional()
  @IsString()
  model?: string;

  @IsOptional()
  @Type(() => Boolean)
  isNew?: boolean;
}