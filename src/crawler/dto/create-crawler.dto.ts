import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsEnum, IsIn, IsNotEmpty, IsString } from 'class-validator';

export class CreateCrawlerDto {
  @ApiProperty({
    description: 'Year',
    example: '2023',
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
  @IsEnum(['races', 'drivers', 'team'])
  type: string;
}

export class NumberCountryDto {
  @ApiProperty({
    description: 'Year',
    example: '2023',
    type: String,
  })
  @Allow()
  @IsString()
  year: string;

  @ApiProperty({
    description: 'Country',
    enum: [
      'bahrain',
      'saudi-arabia',
      'australia',
      'azerbaijan',
      'miami',
      'monaco',
      'spain',
    ],
  })
  @Allow()
  @IsString()
  @IsNotEmpty()
  @IsEnum([
    'bahrain',
    'saudi-arabia',
    'australia',
    'azerbaijan',
    'miami',
    'monaco',
    'spain',
  ])
  valueCountry: string;

  @Allow()
  @IsNotEmpty()
  @IsString()
  type: string;
}

export type CrawlerDto = CreateCrawlerDto | NumberCountryDto;
