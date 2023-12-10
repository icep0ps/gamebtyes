import 'dotenv/config';
import * as cheerio from 'cheerio';

export default async function scrapExploreArticles() {
  const response = await fetch(`${process.env.EXPLORE_NEWS_BASE_URL}/gaming`);
  const html = await response.text();

  const $ = cheerio.load(html);
  const links = $('div.b-river__inner > div.b-river-post > h3.b-river-post__title > a')
    .map(function () {
      return $(this).attr('href');
    })
    .get();

  console.log(links);

  return await Promise.all(
    links.map(async (link) => {
      const response = await fetch(link);
      const html = await response.text();
      const $ = cheerio.load(html);

      return {
        title: $("meta[property='og:title']").attr('content'),
        author: $('a.b-personality__hot').attr('content'),
        thumbnail: $("meta[property='og:image']").attr('content'),
        description: $("meta[property='og:description']").text(),
        content: $('article[itemid="post-content"]')
          .not('div.dt-primis.dt-primis--related')
          .text(),
        url: $("meta[property='og:url']").attr('content'),
        site_logo: $("link[rel='shortcut icon']").attr('href'),
      };
    })
  );
}
