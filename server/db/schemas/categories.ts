import { pgTable, text } from 'drizzle-orm/pg-core';

export const categories = pgTable('categories', {
  name: text('name').primaryKey(),
});
