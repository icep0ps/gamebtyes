import 'dotenv/config';

class Locals {
  public static config() {
    /* databse connections  */
    const host = process.env.HOST;
    const user = process.env.USER;
    const port = process.env.PORT;
    const database = process.env.DATABASE_NAME;

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
      exploreURL,
      lastestURL,
      platformURL,
      popularURL,
    };
  }
}

export default Locals;
