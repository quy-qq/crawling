import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { Allow, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';

export class QueryPaginationI {
  @Allow()
  @IsOptional()
  @Expose()
  @ApiModelProperty({
    type: Number,
    default: 1,
    required: false,
  })
  readonly page?: number;

  @Allow()
  @IsOptional()
  @Expose()
  @ApiModelProperty({
    type: Number,
    default: 20,
    required: false,
  })
  readonly limit?: number;
}
