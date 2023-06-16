import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  Query,
  HttpStatus,
} from '@nestjs/common';
import { CrawlerService } from './crawler.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  CrawlerDto,
  CreateCrawlerDto,
  NumberCountryDto,
} from './dto/create-crawler.dto';
import { CrawlFilterDto } from './dto/crawler.filter.dto';

@ApiTags('Type Crawl')
@Controller('crawl')
export class CrawlController {
  constructor(private readonly crawlerService: CrawlerService) {}

  @Post('crawling-type')
  async crawl(@Query() createCrawlerDto: CreateCrawlerDto) {
    const titles = await this.crawlerService.crawl(createCrawlerDto);
    return titles;
  }
  @Post('race-result')
  async crawlRaceResult(@Query() createCrawlerDto: NumberCountryDto) {
    createCrawlerDto.type = 'race-result';
    const titles = await this.crawlerService.crawl(createCrawlerDto);
    return titles;
  }

  @ApiOperation({ summary: 'Get list post' })
  @Get()
  async findAll(@Query() filters: CrawlFilterDto, @Res() response) {
    const data = await this.crawlerService.findAll(filters);
    return response.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      description: 'SUCCESS',
      data,
    });
  }
}
