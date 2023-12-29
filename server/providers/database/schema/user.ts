import { sql } from 'drizzle-orm';
import {
  int,
  time,
  mysqlTable,
  serial,
  char,
  text,
  primaryKey,
} from 'drizzle-orm/mysql-core';

const user = mysqlTable('user', {
  id: serial('id').primaryKey(),
  username: char('username', { length: 30 }).notNull().unique(),
  email: char('username', { length: 65 }).notNull().unique(),
  password: char('password').notNull(),
});


const userSavedPosts = mysqlTable("userSavedPosts",{




})

const savedPosts = mysqlTable(
  'savedPosts',
  {
    title: char('title'),
    author: char('author'),
    thumbnail: text('thumbnail'),
    description: text('thumbnail'),
    content: text('content'),
    url: text('url'),
    site_logo: char('site_logo'),
  },
  (table) => {
    return {
      id: primaryKey({ columns: [table.title, table.author] }),
    };
  }
);
