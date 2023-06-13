import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CrawlerService } from './crawler.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateCrawlerDto } from './dto/create-crawler.dto';

@ApiTags('Type Crawl')
@Controller('crawl')
export class CrawlController {
  constructor(private readonly crawlerService: CrawlerService) {}

  @Get()
  async crawl(@Query() createCrawlerDto: CreateCrawlerDto) {
    const titles = await this.crawlerService.crawl(createCrawlerDto);
    return titles;
  }
}
