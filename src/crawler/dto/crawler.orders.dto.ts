import { ApiPropertyOptional, IntersectionType } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { SORT } from 'src/common/constrains/filter-order.const';

export class OrderDto {
  @IsOptional()
  @Expose()
  @IsEnum(SORT)
  @ApiPropertyOptional({ enum: SORT, name: 'orderBy[id]' })
  id?: string;

  @IsOptional()
  @Expose()
  @IsEnum(SORT)
  @ApiPropertyOptional({ enum: SORT, name: 'orderBy[pos]' })
  pos?: string;

  @IsOptional()
  @Expose()
  @IsEnum(SORT)
  @ApiPropertyOptional({ enum: SORT, name: 'orderBy[no]' })
  no?: string;

  @IsOptional()
  @Expose()
  @IsEnum(SORT)
  @ApiPropertyOptional({ enum: SORT, name: 'orderBy[driver]' })
  driver?: string;

  @IsOptional()
  @Expose()
  @IsEnum(SORT)
  @ApiPropertyOptional({ enum: SORT, name: 'orderBy[carName]' })
  carName?: string;

  @IsOptional()
  @Expose()
  @IsEnum(SORT)
  @ApiPropertyOptional({ enum: SORT, name: 'orderBy[laps]' })
  laps?: string;

  @IsOptional()
  @Expose()
  @IsEnum(SORT)
  @ApiPropertyOptional({ enum: SORT, name: 'orderBy[pts]' })
  pts?: string;

  @IsOptional()
  @Expose()
  @IsEnum(SORT)
  @ApiPropertyOptional({ enum: SORT, name: 'orderBy[year]' })
  year?: string;

  @IsOptional()
  @Expose()
  @IsEnum(SORT)
  @ApiPropertyOptional({ enum: SORT, name: 'orderBy[createdAt]' })
  createdAt?: string;
}
