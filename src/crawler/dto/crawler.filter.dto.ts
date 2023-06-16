import {
  ApiProperty,
  ApiPropertyOptional,
  IntersectionType,
} from '@nestjs/swagger';
import { OrderDto } from './crawler.orders.dto';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { QueryPaginationI } from 'src/common/interface/queryPagination.i';

export class CrawlFilterDto extends QueryPaginationI {
  @ApiModelProperty({
    type: String,
    required: false,
    description: 'search year, Team, Driver, Grand_prix',
    example: 'RED BULL RACING HONDA RBPT',
  })
  @IsOptional()
  @IsString()
  readonly keyword?: string;

  @ValidateNested()
  @IsOptional()
  @ApiPropertyOptional({ type: () => OrderDto })
  @Type(() => OrderDto)
  @Expose()
  orderBy: OrderDto;
}
