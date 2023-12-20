import Scraper from './Scrapper';

class Platform extends Scraper {
  constructor(url: string) {
    super(url);
    this.selectors = {
      content: 'div#article-body',
      links: 'div.listingResults  > div.listingResult > a.article-link',
    };
  }
}

export default Platform;
