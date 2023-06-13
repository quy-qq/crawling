import { Module } from '@nestjs/common';
import { CrawlController } from './crawler.controller';
import { CrawlerService } from './crawler.service';
import { HttpModule } from '@nestjs/axios';
import RaceSchema, { Race } from 'src/common/database/races.schema';
import DriverSchema, { Driver } from 'src/common/database/drivers.schema';
import TeamSchema, { Team } from 'src/common/database/teams.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: Race.name, schema: RaceSchema },
      { name: Driver.name, schema: DriverSchema },
      { name: Team.name, schema: TeamSchema },
    ]),
  ],
  controllers: [CrawlController],
  providers: [CrawlerService],
})
export class CrawlerModule {}
