import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsEnum, IsIn, IsNotEmpty, IsString } from 'class-validator';

export class CreateCrawlerDto {
  @ApiProperty({
    description: 'Year',
    example: '2022',
    type: String,
  })
  @Allow()
  @IsString()
  year: string;

  @ApiProperty({
    description: 'Type',
    enum: ['races', 'drivers', 'team'],
  })
  @Allow()
  @IsString()
  @IsNotEmpty()
  @IsEnum(['races', 'drives', 'team'])
  type: string;
}
