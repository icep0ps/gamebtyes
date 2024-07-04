import { type Request, type Response } from 'express';
import db from '../../db/client';
import { articles } from '../../db/schemas/articles';

export default {
  get: async function (request: Request, response: Response) {
    return await db.select().from(articles);
  },
};
