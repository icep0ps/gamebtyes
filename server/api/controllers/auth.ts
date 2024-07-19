import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";
import { type Request, type Response } from "express";

import db from "../../db/client";
import { users } from "../../db/schemas/users";
import oAuth2Client from "../../utils/auth/googleAuth";
import getUserData from "../../utils/auth/getUserData";
import { GoogleInfo } from "../../../types";

export default {
  authPrompt: async function (request: Request, response: Response) {
    try {
      const authorizeUrl = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: [
          "https://www.googleapis.com/auth/userinfo.email",
          "https://www.googleapis.com/auth/userinfo.profile",
        ],
        prompt: "consent",
      });

      return response.json({ url: authorizeUrl });
    } catch (error) {
      response.statusCode = 500;
      return response.json({ msg: "Error generating Auth URL: " + error });
    }
  },

  async googleAuth(request: Request, response: Response) {
    const code = request.query.code;

    try {
      if (typeof code === "string") {
        const r = await oAuth2Client.getToken(code);
        await oAuth2Client.setCredentials(r.tokens);
        console.info("Tokens acquired.");

        const userCredentials = oAuth2Client.credentials;

        if (userCredentials.access_token) {
          const userData = await getUserData(userCredentials.access_token);

          if (userData) await getUserDataFromDB(userData);

          // please create an acutal secret
          const refreshToken = jwt.sign(
            userData,
            process.env.REFRESH_TOKEN_SECRET as string,
            {
              expiresIn: "30d",
            },
          );

          response.cookie("token", refreshToken, { httpOnly: true });
          return response.redirect("http://localhost:3000/");
        }
      }
    } catch (error) {
      console.log("Error occurred while trying to auth user: " + error);
      // please handle error lol
    }
  },
};

async function getUserDataFromDB(profile: GoogleInfo) {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, profile.email));

  if (!user.length) {
    const user = await db
      .insert(users)
      .values({ email: profile.email, username: profile.name })
      .returning();

    return user;
  }

  return user;
}
