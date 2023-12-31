import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { BaseService as BaseServiceDeclare } from '../declares/base.service';

@Injectable()
export class BaseService {
  constructor(protected model) {}
  /**
   *
   * @param query
   * @param page
   * @param limit
   * @param sort
   * @param select
   * @param populate
   */
  async pagination(
    query: object = {},
    page = 1,
    limit = 10,
    sort: object | undefined = {},
    select: string[] | undefined = undefined,
    populate: any[] | object | string | undefined = undefined,
  ) {
    if (Object.keys(query).length) {
      for (const i in query) {
        if (query[i] === undefined) {
          delete query[i];
        }
      }
    }
    if (sort && Object.keys(sort).length) {
      for (const i in sort) {
        if (sort[i] === 'DESC') {
          sort[i] = -1;
        } else if (sort[i] === 'ASC') {
          sort[i] = 1;
        } else {
          delete sort[i];
        }
      }
    }

    const offset = (page - 1) * limit;

    const customLabels = {
      docs: 'nodes',
      page: 'currentPage',
      totalPages: 'pageCount',
      limit: 'perPage',
      totalDocs: 'itemCount',
    };
    return await this.model.paginate(query, {
      customLabels,
      offset,
      limit,
      sort,
      select: select ? select : undefined,
      populate: populate ?? undefined,
    });
  }

  /**
   *
   * @param field
   * @param keyword
   */
  searchField(field: string[], keyword: string) {
    if (!keyword || !field.length) return undefined;
    const queryOr: object[] | undefined = [];
    field.map((item) => {
      const object = {};
      object[item] = { $regex: '.*' + keyword + '.*', $options: 'i' };
      queryOr.push(object);
    });
    return queryOr;
  }
}
