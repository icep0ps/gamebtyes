import { articles } from './articles';
import { categories } from './categories';

import { integer, pgTable, primaryKey, text } from 'drizzle-orm/pg-core';

export const articlesWithCategories = pgTable(
  'articlesWithCategories',
  {
    articleId: integer('article_id')
      .notNull()
      .references(() => articles.id),
    categoryId: text('category_id')
      .notNull()
      .references(() => categories.name),
  },
  (table) => ({ pk: primaryKey({ columns: [table.articleId, table.categoryId] }) })
);
