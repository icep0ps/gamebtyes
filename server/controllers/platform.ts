import Scraper from './Scrapper';
import { FiltersSearchParams } from '../types';
import { type Request, type Response } from 'express';

class Platform extends Scraper {
  constructor(url: string) {
    super(url);
    this.selectors = {
      content: 'div#article-body',
      links: 'div.listingResults  > div.listingResult > a.article-link',
    };
  }
}

export default async function (
  request: Request<{}, {}, {}, FiltersSearchParams>,
  response: Response,
  next: any
) {
  const params = request.query;
  if (params) {
    const searchparams = new URLSearchParams(params);
    return new Platform(
      `${process.env.LATESET_NEWS_SITE_BASE_URL}/uk/search/?${searchparams}`
    ).fetch(request, response, next);
  } else throw new Error('No search params provided for latest news');
}
