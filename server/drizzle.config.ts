import { defineConfig } from 'drizzle-kit';
import locals from './db/locals';

const variables = locals();

export default defineConfig({
  schema: './db/schemas/*',
  dialect: 'postgresql',
  out: './db/migrations',
  verbose: true,
  strict: true,
  dbCredentials: {
    user: variables.user,
    password: variables.password,
    host: variables.host,
    port: variables.port,
    database: variables.database,
    ssl: false,
  },
});
