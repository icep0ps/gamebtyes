import { sql } from 'drizzle-orm/sql';
import { pgTable, text } from 'drizzle-orm/pg-core';

export const articles = pgTable('articles', {
  id: text('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  author: text('author').notNull(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  url: text('url').notNull(),
  description: text('description'),
  thumbnail: text('thumbnail').notNull(),
  siteLogo: text('site_logo'),
});
