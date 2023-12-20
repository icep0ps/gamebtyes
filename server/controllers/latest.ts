import Scraper from './Scrapper';

class Latest extends Scraper {
  constructor(url: string) {
    super(url);
    this.selectors = {
      content: 'div#article-body',
      links: 'div.news > div.listingResult > a.article-link',
    };
  }
}

export default Latest;
