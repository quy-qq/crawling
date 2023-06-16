import { IsEnum, IsOptional } from 'class-validator';
import { SORT } from '../constrains/filter-order.const';
import { Expose } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class OrderIdI {
  @IsEnum(SORT)
  @IsOptional()
  @Expose()
  @ApiPropertyOptional({
    enum: SORT,
    name: 'orderBy[_id]',
    description: 'order id field',
  })
  _id?: string;
}
