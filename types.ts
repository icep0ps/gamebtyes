import { users } from "./server/db/schemas/users";
import { articles } from "./server/db/schemas/articles";

export type ScrapResult = {
  title: string | undefined;
  author: string | undefined;
  thumbnail: string | undefined;
  description: string | undefined;
  content: string | undefined;
  url: string | undefined;
  site_logo: string | undefined;
};

export type GoogleInfo = {
  sub: string;
  name: string;
  given_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
};

export type ErrorMessageResponse = {
  msg: string;
};

export type userProfile = {
  user: IUser;
  savedArticles: IArticle[];
};

export type RedirectResponse = {
  msg: string;
  redirectURL: string;
};

export type IArticle = typeof articles.$inferInsert;

export type IUser = typeof users.$inferSelect;
