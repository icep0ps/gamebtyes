import { type CheerioAPI } from 'cheerio';

import { articles } from '../../db/schemas/articles';
import { categories } from '../../db/schemas/categories';

type RequiredNotNull<T> = {
  [P in keyof T]: NonNullable<T[P]>;
};

type Article = typeof articles.$inferInsert;
type Category = { categories: (typeof categories.$inferInsert)[] };
type Contents = Article & Category;

export default async function extractContent(
  content: CheerioAPI,
  selector: string
): Promise<Contents> {
  const contents = {
    title: content("meta[property='og:title']").attr('content'),
    author: content("meta[name='parsely-author']").attr('content'),
    thumbnail: content("meta[property='og:image']").attr('content'),
    description: content("meta[property='og:description']").attr('content'),
    content: content(selector).find('*:not(script)').text(),
    url: content("meta[property='og:url']").attr('content'),
    site_logo: content("link[rel='shortcut icon']").attr('href'),
    categories: content('div.tag >')
      .map(function (i, el) {
        return { name: content(this).text() };
      })
      .toArray(),
  };

  // check for undefined values
  for (const [key, value] of Object.entries(contents)) {
    if (!value && key !== 'site_logo') throw new Error(`No value set for ${key}`);
  }

  return contents as RequiredNotNull<typeof contents>;
}
