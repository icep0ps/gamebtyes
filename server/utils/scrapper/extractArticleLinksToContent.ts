import { CheerioAPI } from 'cheerio';

export default function extractArticleLinksToContent(DOM: CheerioAPI, selectors: string) {
  return DOM(selectors)
    .map(function () {
      return DOM(this).attr('href');
    })
    .get();
}
