import { IsOptional, IsString, IsNumberString } from 'class-validator';

export class FilterProductsDto {
  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsNumberString()
  minPrice?: number;

  @IsOptional()
  @IsNumberString()
  maxPrice?: number;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  brand?: string;
}