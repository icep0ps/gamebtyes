import 'dotenv/config';

class Locals {
  public static config() {
    /* databse connections  */
    const host = process.env.HOST as string;
    const user = process.env.USER as string;
    const port = process.env.PORT as string;
    const password = process.env.PASSWORD as string;
    const database = process.env.DATABASE_NAME as string;

    /* scrapping websites urls  */
    const exploreURL = process.env.EXPLORE_NEWS_BASE_URL;
    const lastestURL = process.env.LATESET_NEWS_SITE_BASE_URL;
    const platformURL = process.env.LATESET_NEWS_SITE_BASE_URL;
    const popularURL = process.env.POPULAR_NEWS_SITE_BASE_URL;

    return {
      host,
      user,
      port,
      database,
      password,
      exploreURL,
      lastestURL,
      popularURL,
      platformURL,
    };
  }
}

export default Locals;
