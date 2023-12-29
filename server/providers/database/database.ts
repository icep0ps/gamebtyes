import Locals from '../locals';

import mysql from 'mysql2/promise';
import { drizzle } from 'drizzle-orm/mysql2';

class Database {
  public static init() {
    const poolConnection = mysql.createPool({
      host: Locals.config().host,
      user: Locals.config().user,
      database: Locals.config().database,
    });

    return drizzle(poolConnection);
  }
}
export default Database;
