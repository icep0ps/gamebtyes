import {
  int,
  mysqlTable,
  text,
  primaryKey,
  varchar,
  mysqlSchema,
} from 'drizzle-orm/mysql-core';

export const mySchema = mysqlSchema('my_schema');

export const user = mysqlTable('user', {
  id: int('id').autoincrement().primaryKey(),
  username: varchar('username', { length: 30 }).notNull().unique(),
  email: varchar('username', { length: 65 }).notNull(),
  password: text('password').notNull(),
});

export const post = mysqlTable(
  'post',
  {
    title: varchar('title', { length: 60 }),
    author: varchar('author', { length: 60 }),
    thumbnail: text('thumbnail'),
    description: text('description'),
    content: text('content'),
    url: text('url'),
    site_logo: text('site_logo'),
  },
  (table) => {
    return {
      id: primaryKey({ columns: [table.title, table.author], name: 'id' }),
    };
  }
);

export const savedPost = mysqlTable(
  'userSavedPosts',
  {
    user_id: int('id'),
    post_id: text('post_id'),
  },
  (table) => {
    return {
      id: primaryKey({ columns: [table.user_id, table.post_id] }),
    };
  }
);
