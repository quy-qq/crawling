import { Module } from '@nestjs/common';
import { CrawlController } from './crawler.controller';
import { CrawlerService } from './crawler.service';
import { HttpModule } from '@nestjs/axios';
import RaceSchema, { Race } from 'src/common/database/races.schema';
import DriverSchema, { Driver } from 'src/common/database/drivers.schema';
import TeamSchema, { Team } from 'src/common/database/teams.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { RaceResult } from 'src/common/database';
import RaceResultSchema from 'src/common/database/race-result.schema';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: Race.name, schema: RaceSchema },
      { name: Driver.name, schema: DriverSchema },
      { name: Team.name, schema: TeamSchema },
      { name: RaceResult.name, schema: RaceResultSchema },
    ]),
  ],
  controllers: [CrawlController],
  providers: [CrawlerService],
})
export class CrawlerModule {}
