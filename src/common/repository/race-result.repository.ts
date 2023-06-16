import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RaceResult, RaceResultDocument } from '../database';

@Injectable()
export class RaceResultRepository extends BaseService {
  constructor(
    @InjectModel(RaceResult.name)
    public model: Model<RaceResultDocument>,
  ) {
    super(model);
  }
}
