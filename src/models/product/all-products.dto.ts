import { Entity } from 'typeorm';
import { IsInt, IsOptional, Min, Max } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

@Entity()

export class AllProductsDto {
    @ApiProperty({ required: false, default: 1 })
    @IsOptional()
    @IsInt()
    @Min(1)
    page?: number;
  
    @ApiProperty({ required: false, default: 10 })
    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(100)
    limit?: number;
  }