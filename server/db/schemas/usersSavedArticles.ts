import { primaryKey, pgTable, varchar, text } from 'drizzle-orm/pg-core';

import { users } from './users';
import { articles } from './articles';

export const usersSavedArticles = pgTable(
  'usersSavedArticles',
  {
    userId: text('user_id')
      .references(() => users.id)
      .notNull(),
    articleId: text('article_id')
      .references(() => articles.id)
      .notNull(),
  },
  (table) => ({ pk: primaryKey({ columns: [table.articleId, table.userId] }) })
);
