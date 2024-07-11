import { eq } from 'drizzle-orm';
import { type Request, type Response } from 'express';

import db from '../../db/client';
import { users } from '../../db/schemas/users';
import { usersSavedArticles } from '../../db/schemas/usersSavedArticles';
import { articles } from '../../db/schemas/articles';

export default {
  getById: async function (request: Request, response: Response) {
    try {
      const user = await db.select().from(users).where(eq(users.id, 1));
      return response.json(user[0]);
    } catch (error) {
      // handle error pls
    }
  },

  getUsersSavedArticles: async function (request: Request, response: Response) {
    try {
      const rows = await db
        .select({ articles })
        .from(usersSavedArticles)
        .innerJoin(articles, eq(usersSavedArticles.articleId, articles.id))
        .where(eq(usersSavedArticles.userId, 1));

      const savedArticles = rows.map((row) => row.articles);

      return response.json(savedArticles);
    } catch (error) {
      response.statusCode = 500;
      return response.json({ msg: 'Error getting saved article: ' + error });
    }
  },

  saveArticle: async function (request: Request, response: Response) {
    try {
      const data = await db
        .insert(usersSavedArticles)
        .values({ articleId: request.body.id, userId: 1 });

      return response.json({ msg: 'save successful' });
    } catch (error) {
      response.statusCode = 500;
      return response.json({ msg: 'Error saving article: ' + error });
    }
  },
};
