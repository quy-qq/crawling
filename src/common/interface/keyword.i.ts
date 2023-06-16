import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { Optional } from '@nestjs/common';
import { IsOptional, IsString } from 'class-validator';

export class KeywordI {
  @ApiModelProperty({
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly keyword?: string;
}
