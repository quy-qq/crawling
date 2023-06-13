import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CrawlerService } from './crawler/crawler.service';
import { CrawlerModule } from './crawler/crawler.module';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [CrawlerModule, HttpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
