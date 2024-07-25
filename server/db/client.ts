import { Client } from 'pg';
import locals from './locals';
import { drizzle } from 'drizzle-orm/node-postgres';

const variables = locals();

const db = new Client({
  host: variables.host,
  port: variables.port,
  user: variables.user,
  password: variables.password,
  database: variables.database,
});

db.connect();

export default drizzle(db);
