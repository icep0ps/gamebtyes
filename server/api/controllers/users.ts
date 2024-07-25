import { eq } from "drizzle-orm";
import { type Request, type Response } from "express";

import db from "../../db/client";
import { users } from "../../db/schemas/users";
import { articles } from "../../db/schemas/articles";
import { usersSavedArticles } from "../../db/schemas/usersSavedArticles";
import { ErrorMessageResponse, userProfile } from "../../../types";

export default {
  getById: async function (
    request: Request,
    response: Response<userProfile | ErrorMessageResponse>,
  ) {
    try {
      const user = await db
        .select()
        .from(users)
        .where(eq(users.id, "b2c7ccf6-24fd-4305-998b-0da081b8a241"));

      if (!users) throw new Error("Could not find users inforation");

      const savedArticles = await getUsersSavedArticles(
        "b2c7ccf6-24fd-4305-998b-0da081b8a241",
      );

      return response.json({ user: user[0], savedArticles });
    } catch (error) {
      response.statusCode = 500;
      return response.json({ msg: `${error}` });
    }
  },

  saveArticle: async function (request: Request, response: Response) {
    try {
      const articleIsSaved = await db
        .select()
        .from(usersSavedArticles)
        .where(eq(request.body.id, usersSavedArticles.articleId));

      if (articleIsSaved.length > 0) {
        await db
          .delete(usersSavedArticles)
          .where(eq(request.body.id, usersSavedArticles.articleId));
        return response.json({ msg: "Artilce removed from saves" });
      }

      await db.insert(usersSavedArticles).values({
        articleId: request.body.id,
        userId: "b2c7ccf6-24fd-4305-998b-0da081b8a241",
      });

      return response.json({ msg: "Article saved successful" });
    } catch (error) {
      response.statusCode = 500;
      return response.json({ msg: "Error saving article: " + error });
    }
  },
};

async function getUsersSavedArticles(usersId: string) {
  try {
    const rows = await db
      .select({ articles })
      .from(usersSavedArticles)
      .innerJoin(articles, eq(usersSavedArticles.articleId, articles.id))
      .where(eq(usersSavedArticles.userId, usersId));

    const savedArticles = rows.map((row) => row.articles);

    return savedArticles;
  } catch (error) {
    throw new Error("Error getting saved article: " + error);
  }
}
