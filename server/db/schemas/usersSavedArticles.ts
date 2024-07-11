import { primaryKey } from 'drizzle-orm/pg-core';
import { integer, pgTable } from 'drizzle-orm/pg-core';

import { users } from './users';
import { articles } from './articles';

export const usersSavedArticles = pgTable(
  'usersSavedArticles',
  {
    userId: integer('user_id').references(() => users.id),
    articleId: integer('article_id').references(() => articles.id),
  },
  (table) => ({ pk: primaryKey({ columns: [table.articleId, table.userId] }) })
);
