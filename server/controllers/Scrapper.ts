import * as cheerio from 'cheerio';
import { FetchOptions, ScrapResult } from '../types';
import { type Request, type Response } from 'express';

class Scraper {
  protected BASE_URL: string;

  protected selectors: {
    links: string;
    content: string;
  };

  constructor(protected SITE_URL: string) {
    this.selectors = {
      content: '',
      links: '',
    };
    this.BASE_URL = this.getBaseUrl(SITE_URL);
  }

  public extractMultipleLinks(loader: cheerio.CheerioAPI): string[] {
    return loader(this.selectors.links)
      .map(function () {
        return loader(this).attr('href');
      })
      .get();
  }

  public async fetchHTML(url?: string): Promise<cheerio.CheerioAPI> {
    const URL = url ? url : this.SITE_URL;
    try {
      const response = await fetch(URL);
      const content = await response.text();
      return cheerio.load(content);
    } catch (error) {
      throw new Error(`Failed to fetch content: ${error}`);
    }
  }

  public async fetchContent(options: FetchOptions): Promise<ScrapResult> {
    const { link, requiresBaseURL } = options;
    try {
      const url = requiresBaseURL ? this.BASE_URL + link : link;
      const $ = await this.fetchHTML(url);

      return {
        title: $("meta[property='og:title']").attr('content'),
        author: $("meta[name='parsely-author']").attr('content'),
        thumbnail: $("meta[property='og:image']").attr('content'),
        description: $("meta[property='og:description']").attr('content'),
        content: $(this.selectors.content).find('*:not(script)').text(),
        url: $("meta[property='og:url']").attr('content'),
        site_logo: $("link[rel='shortcut icon']").attr('href'),
      };
    } catch (error) {
      throw new Error(`Failed to fetch content for ${link}: ${error}`);
    }
  }

  protected getBaseUrl(link: string) {
    const matcher = new RegExp(/^.+?[^\/:](?=[?\/]|$)/);
    const BASE_URL = matcher.exec(link);

    if (BASE_URL) return BASE_URL[0];
    else throw new Error('Could not get base URL');
  }

  public async fetch(request: Request, response: Response, next: any) {
    try {
      const html = await this.fetchHTML();

      const links = this.extractMultipleLinks(html);
      const articles = await Promise.all(
        links.map((link) => this.fetchContent({ link }))
      );

      response.set({
        'Cache-Control': 'private, max-age=604800',
      });

      response.json(articles);
    } catch (error: any) {
      response.status(500).json({ msg: error.message });
    }
  }
}

export default Scraper;
