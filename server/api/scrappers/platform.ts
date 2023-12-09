import 'dotenv/config';
import * as cheerio from 'cheerio';

export default async function scrapPlatfromNews(params: any) {
  const searchparams = new URLSearchParams(params);

  const response = await fetch(
    `${process.env.LATESET_NEWS_SITE_BASE_URL}/uk/search/?${searchparams}`
  );
  const html = await response.text();

  const $ = cheerio.load(html);
  const links = $('div.listingResults  > div.listingResult > a.article-link')
    .map(function () {
      return $(this).attr('href');
    })
    .get();

  return await Promise.all(
    links.map(async (link) => {
      const response = await fetch(link);
      const html = await response.text();
      const $ = cheerio.load(html);

      return {
        title: $("meta[property='og:title']").attr('content'),
        author: $("meta[name='parsely-author']").attr('content'),
        thumbnail: $("meta[property='og:image']").attr('content'),
        description: $("meta[property='og:description']").attr('content'),
        content: $('div#article-body').not("script[type='text/javascript']").text(),
        url: $("meta[property='og:url']").attr('content'),
        site_logo: $("link[rel='shortcut icon']").attr('href'),
      };
    })
  );
}
