import { articles } from './server/db/schemas/articles';

export type ScrapResult = {
  title: string | undefined;
  author: string | undefined;
  thumbnail: string | undefined;
  description: string | undefined;
  content: string | undefined;
  url: string | undefined;
  site_logo: string | undefined;
};

export type FetchOptions = {
  link: string;
  requiresBaseURL?: boolean;
};

export type FiltersSearchParams = {
  searchTerm: string;
  articleType: string;
  sortBy: string;
};
export type ExploreSearchParams = {
  sitelink: string;
};

export type Filter = 'PC Gaming' | 'Mobile Gaming' | 'Console Gaming';

export type Article = typeof articles.$inferInsert;
