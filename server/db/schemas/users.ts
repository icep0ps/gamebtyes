import { sql } from 'drizzle-orm';
import { pgTable, varchar, text } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: text('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  username: varchar('username').notNull(),
  email: text('email').notNull(),
});
