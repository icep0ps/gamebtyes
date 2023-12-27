import Scraper from './Scrapper';
import { ExploreSearchParams } from '../types';
import { type Request, type Response } from 'express';

class Explore extends Scraper {
  constructor(url: string) {
    super(url);
    this.selectors = {
      content: 'article[itemid="post-content"]',
      links: 'div.b-river__inner > div.b-river-post > h3.b-river-post__title > a',
    };
  }
}

export async function fetchExplore(
  request: Request<{}, {}, {}, ExploreSearchParams>,
  response: Response,
  next: any
) {
  const params = request.query;
  if (params) {
    const searchparams = new URLSearchParams(params);
    return new Explore(
      `${process.env.EXPLORE_NEWS_BASE_URL}/gaming/?${searchparams}`
    ).fetch(request, response, next);
  } else throw new Error('No search params provided for latest news');
}

export async function fetchPost(
  request: Request<{}, {}, {}, ExploreSearchParams>,
  response: Response,
  next: any
) {
  const sitelink = request.query.sitelink;
  const data = await new Explore(
    `${process.env.EXPLORE_NEWS_BASE_URL}/gaming/`
  ).fetchContent({ link: sitelink });
}
