import 'dotenv/config';
import * as cheerio from 'cheerio';

export default async function scrapPopularArticles() {
  const response = await fetch(
    `${process.env.POPULAR_NEWS_SITE_BASE_URL}/pc?filter=articles`
  );
  const html = await response.text();

  const $ = cheerio.load(html);
  const links = $('div.jsx-2784258483 > div.content-block-wrapper > a.block-text')
    .map(function () {
      return $(this).attr('href');
    })
    .get();
  return await Promise.all(
    links.map(async (link) => {
      const response = await fetch(process.env.POPULAR_NEWS_SITE_BASE_URL + link);
      const html = await response.text();
      const $ = cheerio.load(html);

      return {
        title: $("meta[property='og:title']").attr('content'),
        author: $("meta[property='article:author']").attr('content'),
        thumbnail: $("meta[name='thumbnail']").attr('content'),
        content:
          $('section.article-page')?.text() || $('div[itemprop="description"]')?.text(),
        url: $("meta[property='og:url']").attr('content'),
      };
    })
  );
}
