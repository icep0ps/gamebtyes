import Scraper from './Scrapper';
import { type Request, type Response } from 'express';

class Popular extends Scraper {
  constructor(url: string) {
    super(url);
    this.selectors = {
      content: 'section.article-page',
      links: 'div.jsx-2784258483 > div.content-block-wrapper > a.block-text',
    };
  }

  public async fetch(request: Request, response: Response, next: any) {
    const html = await this.fetchHTML();

    const links = this.extractMultipleLinks(html);
    const articles = await Promise.all(
      links.map((link) => this.fetchContent({ link, requiresBaseURL: true }))
    );

    response.set({
      'Cache-Control': 'private, max-age=604800',
    });

    response.json(articles);
  }
}
export default new Popular(
  `${process.env.POPULAR_NEWS_SITE_BASE_URL}/pc?filter=articles`
);
