import { type Request, type Response } from 'express';

import db from '../../db/client';
import { articles } from '../../db/schemas/articles';

export default {
  get: async function (request: Request, response: Response) {
    try {
      const data = await db.select().from(articles);
      return response.json(data);
    } catch (error) {
      // add error handling
    }
  },
};
