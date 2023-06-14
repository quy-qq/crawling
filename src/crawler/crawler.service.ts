import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { CreateCrawlerDto, NumberCountryDto } from './dto/create-crawler.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  Race,
  Team,
  Driver,
  RaceResult,
  TeamDocument,
} from 'src/common/database';
import { NumberCountry } from 'src/common/const/number-country';
import { TeamResponse } from 'src/common/interface/response/crawling.i.response';

@Injectable()
export class CrawlerService {
  constructor(
    @InjectModel(Team.name) private teamModel: Model<Team>,
    @InjectModel(Race.name) private raceModel: Model<Race>,
    @InjectModel(Driver.name) private driverModel: Model<Driver>,
    @InjectModel(RaceResult.name) private raceResultModel: Model<RaceResult>,
  ) {}

  async crawl(createCrawlerDto) {
    try {
      console.log(createCrawlerDto.type);
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      if (createCrawlerDto.type !== 'race-result') {
        await page.goto(
          `https://www.formula1.com/en/results.html/${createCrawlerDto.year}/${createCrawlerDto.type}.html`,
          { timeout: 600000 },
        );
      } else {
        const keyCountry = Object.keys(NumberCountry).find(
          (key) => NumberCountry[key] === createCrawlerDto.valueCountry,
        );
        await page.goto(
          `https://www.formula1.com/en/results.html/${createCrawlerDto.year}/races/${keyCountry}/${createCrawlerDto.valueCountry}/race-result.html`,
          { timeout: 600000 },
        );
      }
      await page.waitForSelector('table.resultsarchive-table tbody tr');
      if (createCrawlerDto.type === 'race-result') {
        const data = await this.raceResuts(page, createCrawlerDto.year);
        await browser.close();
        return data;
      }

      const data = await this.createCrawlStrategy(
        createCrawlerDto.type,
        createCrawlerDto.year,
        page,
      );
      await browser.close();
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  async team(page: puppeteer.Page, years: string) {
    const data = await page.evaluate((years) => {
      const tableRows = Array.from(
        document.querySelectorAll('table.resultsarchive-table tbody tr'),
      );
      const results = tableRows.map((row) => {
        const pos = row.querySelector('td:nth-child(2)').textContent.trim();
        const name = row.querySelector('td:nth-child(3)').textContent.trim();
        const pts = row.querySelector('td:nth-child(4)').textContent.trim();
        return {
          pos: Number(pos) || 0,
          name,
          pts: Number(pts) || 0,
          year: Number(years) || 0,
        };
      });
      return results;
    }, years);
    return await this.teamModel.create(data);
  }

  async drivers(page: puppeteer.Page, years: string): Promise<any> {
    const data = await page.evaluate((years) => {
      const tableRows = Array.from(
        document.querySelectorAll('table.resultsarchive-table tbody tr'),
      );
      const results = tableRows.map((row) => {
        const pos = row.querySelector('td:nth-child(2)').textContent.trim();
        const name = row
          .querySelector('td:nth-child(3)')
          .textContent.replace(/\s+/g, ' ')
          .trim();
        const nationality = row
          .querySelector('td:nth-child(4)')
          .textContent.trim();
        const carName = row.querySelector('td:nth-child(5)').textContent.trim();
        const pts = row.querySelector('td:nth-child(6)').textContent.trim();
        return {
          pos: Number(pos) || 0,
          name,
          nationality,
          carName,
          pts: Number(pts) || 0,
          year: Number(years) || 0,
        };
      });
      return results;
    }, years);
    return await this.driverModel.create(data);
  }

  async races(page: puppeteer.Page, years: string): Promise<any> {
    const data = await page.evaluate((years) => {
      const tableRows = Array.from(
        document.querySelectorAll('table.resultsarchive-table tbody tr'),
      );
      const results = tableRows.map((row) => {
        const grandPrix = row
          .querySelector('td:nth-child(2)')
          .textContent.trim();
        const date = row.querySelector('td:nth-child(3)').textContent.trim();
        const winner = row
          .querySelector('td:nth-child(4)')
          .textContent.replace(/\s+/g, ' ')
          .trim();
        const carName = row.querySelector('td:nth-child(5)').textContent.trim();
        const laps = row.querySelector('td:nth-child(6)').textContent.trim();
        const time = row.querySelector('td:nth-child(7)').textContent.trim();
        return {
          grandPrix,
          date,
          winner,
          carName,
          laps: Number(laps) || 0,
          time,
          year: Number(years) || 0,
        };
      });
      return results;
    }, years);
    return await this.raceModel.create(data);
  }

  async createCrawlStrategy(type: string, years: string, page: puppeteer.Page) {
    if (type === 'team') {
      return await this.team(page, years);
    } else if (type === 'drivers') {
      return await this.drivers(page, years);
    } else if (type === 'races') {
      return await this.races(page, years);
    } else {
      throw new Error('Invalid crawler type');
    }
  }

  async raceResuts(page: puppeteer.Page, years: string): Promise<any> {
    const data = await page.evaluate((years) => {
      const tableRows = Array.from(
        document.querySelectorAll('table.resultsarchive-table tbody tr'),
      );
      const results = tableRows.map((row) => {
        const pos = row.querySelector('td:nth-child(2)').textContent.trim();
        const no = row.querySelector('td:nth-child(3)').textContent.trim();
        const driver = row
          .querySelector('td:nth-child(4)')
          .textContent.replace(/\s+/g, ' ')
          .trim();
        const carName = row.querySelector('td:nth-child(5)').textContent.trim();
        const laps = row.querySelector('td:nth-child(6)').textContent.trim();
        const time = row.querySelector('td:nth-child(7)').textContent.trim();
        const pts = row.querySelector('td:nth-child(8)').textContent.trim();
        return {
          pos: Number(pos) || 0,
          no: Number(no) || 0,
          driver,
          carName,
          laps: Number(laps) || 0,
          time,
          pts: Number(pts) || 0,
          year: Number(years) || 0,
        };
      });
      return results;
    }, years);
    console.log(data);
    return await this.raceResultModel.create(data);
  }
}
