import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import * as puppeteer from 'puppeteer';
import { CreateCrawlerDto } from './dto/create-crawler.dto';
import TeamSchema, { Team } from 'src/common/database/teams.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CrawlerService {
  constructor(@InjectModel(Team.name) private teamModel: Model<Team>) {}

  async crawl(createCrawlerDto: CreateCrawlerDto) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(
      `https://www.formula1.com/en/results.html/${createCrawlerDto.year}/${createCrawlerDto.type}.html`,
    );
    await page.waitForSelector('table.resultsarchive-table tbody tr');

    const data = await page.evaluate(() => {
      const tableRows = Array.from(
        document.querySelectorAll('table.resultsarchive-table tbody tr'),
      );
      tableRows.forEach((row) => {
        const position = row
          .querySelector('td:nth-child(2)')
          .textContent.trim();
        const driver = row.querySelector('td:nth-child(4)').textContent.trim();
        const team = row.querySelector('td:nth-child(5)').textContent.trim();
        const laps = row.querySelector('td:nth-child(6)').textContent.trim();
        const time = row.querySelector('td:nth-child(7)').textContent.trim();
        const points = row.querySelector('td:nth-child(8)').textContent.trim();

        return {
          position,
          driver,
          team,
          laps,
          time,
          points,
        };
      });
    });
    await browser.close();
    return data;
  }
}
