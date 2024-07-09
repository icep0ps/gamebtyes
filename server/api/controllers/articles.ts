import { type Request, type Response } from 'express';

import db from '../../db/client';
import { articles } from '../../db/schemas/articles';
import { eq } from 'drizzle-orm';

export default {
  getById: async function (request: Request, response: Response) {
    try {
      const article = await db
        .select()
        .from(articles)
        .where(eq(articles.id, Number(request.params.id)));
      return response.json(article[0]);
    } catch (error) {
      // add error handling
    }
  },

  getAll: async function (request: Request, response: Response) {
    try {
      const data = await db.select().from(articles);
      return response.json(data);
    } catch (error) {
      // add error handling
    }
  },
};
