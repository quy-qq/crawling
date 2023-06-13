import { Module } from '@nestjs/common';
import { CrawlController } from './crawler.controller';
import { CrawlerService } from './crawler.service';
import { HttpService } from '@nestjs/axios';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [CrawlController],
  providers: [CrawlerService],
})
export class CrawlerModule {}
