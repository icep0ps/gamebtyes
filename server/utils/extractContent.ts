import { type CheerioAPI } from 'cheerio';

export default async function extractContent(content: CheerioAPI, selector: string) {
  try {
    return {
      title: content("meta[property='og:title']").attr('content'),
      author: content("meta[name='parsely-author']").attr('content'),
      thumbnail: content("meta[property='og:image']").attr('content'),
      description: content("meta[property='og:description']").attr('content'),
      content: content(selector).find('*:not(script)').text(),
      url: content("meta[property='og:url']").attr('content'),
      site_logo: content("link[rel='shortcut icon']").attr('href'),
    };
  } catch (error) {
    //handel errors please
  }
}
