import 'dotenv/config';
import { migrate } from 'drizzle-orm/mysql2/migrator';
import { db, connection } from './db_connect';

// This will run migrations on the database, skipping the ones already applied
(async () => await migrate(db, { migrationsFolder: './drizzle' }))();

// Don't forget to close the connection, otherwise the script will hang
(async () => await connection.end())();
