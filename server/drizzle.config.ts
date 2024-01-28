import 'dotenv/config';
import type { Config } from 'drizzle-kit';
import Locals from './providers/locals';

export default {
  schema: './providers/database/schema.ts',
  out: './drizzle',
  driver: 'mysql2',
  dbCredentials: {
    host: Locals.config().host,
    user: Locals.config().user,
    database: Locals.config().database,
    password: Locals.config().password,
  },
} satisfies Config;
