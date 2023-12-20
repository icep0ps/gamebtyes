import Scraper from './Scrapper';

class Explore extends Scraper {
  constructor(url: string) {
    super(url);
    this.selectors = {
      content: 'article[itemid="post-content"]',
      links: 'div.b-river__inner > div.b-river-post > h3.b-river-post__title > a',
    };
  }
}

export default Explore;
