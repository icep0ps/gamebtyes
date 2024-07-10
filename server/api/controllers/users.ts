import { eq } from 'drizzle-orm';
import { type Request, type Response } from 'express';

import db from '../../db/client';
import { users } from '../../db/schemas/users';

export default {
  getById: async function (request: Request, response: Response) {
    try {
      const user = await db.select().from(users).where(eq(users.id, 1));
      return response.json(user[0]);
    } catch (error) {
      // handle error pls
    }
  },
};
