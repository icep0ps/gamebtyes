import Locals from '../locals';
import { user } from './schema';
import { newUser } from '../../types';

import mysql from 'mysql2/promise';
import { drizzle } from 'drizzle-orm/mysql2';

class Database {
  public static init() {
    const poolConnection = mysql.createPool({
      host: Locals.config().host,
      user: Locals.config().user,
      database: Locals.config().database,
      password: Locals.config().password,
      multipleStatements: true,
    });

    return drizzle(poolConnection);
  }

  public static create = {
    async user(newUser: newUser) {
      const data = await Database.init().insert(user).values(newUser);
      return data;
    },
  };
}
export default Database;
