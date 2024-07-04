import { pgTable, serial, text } from 'drizzle-orm/pg-core';

export const articles = pgTable('articles', {
  id: serial('id').primaryKey().unique(),
  author: text('author').notNull(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  url: text('url').notNull(),
  description: text('description'),
  thumbnail: text('thumbnail').notNull(),
  siteLogo: text('site_logo'),
});
