export type Article = {
  id: string;
  authors: string;
  title: string;
  deck: string;
  lede: string;
  body: string;

  image: {
    square_tiny: string;
    screen_tiny: string;
    square_small: string;
    original: string;
  };

  categories: {
    id: number;
    name: string;
  }[];

  associations: {
    id: number;
    name: string;
    guid: string;
    api_detail_url: string;
  }[];

  publish_date: Date;
  update_date: Date;
  videos_api_url: string;
  site_detail_url: string;
};
