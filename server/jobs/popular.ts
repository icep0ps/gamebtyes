import Scraper from './scrapper';

class Popular extends Scraper {
  constructor(url: string) {
    super(url);
    this.selectors = {
      content: 'section.article-page',
      links: 'div.jsx-2784258483 > div.content-block-wrapper > a.block-text',
    };
  }

  public async fetch() {
    const html = await this.fetchHTML();

    const links = this.extractMultipleLinks(html);
    const articles = await Promise.all(
      links.map((link) => this.fetchContent({ link, requiresBaseURL: true }))
    );
    return articles;
  }
}
export default Popular;
